#!/usr/bin/env swift

import EventKit
import Foundation

struct ReminderItem: Encodable {
    let source: String
    let list: String
    let container: String
    let title: String
    let status: String
    let due_date: String?
}

enum Scope: String {
    case all
    case today
    case overdue
    case undated
}

enum ScriptError: Error, LocalizedError {
    case missingValue(String)
    case invalidOption(String)
    case invalidScope(String)
    case listsNotFound([String])
    case remindersAccessDenied
    case remindersFetchFailed

    var errorDescription: String? {
        switch self {
        case .missingValue(let option):
            return "Falta valor para \(option)."
        case .invalidOption(let option):
            return "Opcion desconocida: \(option)."
        case .invalidScope(let scope):
            return "Scope invalido: \(scope). Usa all, today, overdue o undated."
        case .listsNotFound(let names):
            return "No se encontraron estas listas de Recordatorios: \(names.joined(separator: ", "))."
        case .remindersAccessDenied:
            return "No se pudo acceder a Recordatorios. Revisa permisos de Recordatorios para Terminal."
        case .remindersFetchFailed:
            return "No se pudieron leer los recordatorios desde EventKit."
        }
    }
}

struct Config {
    var scope: Scope = .all
    var lists: [String] = []
    var showHelp = false
}

func usage() -> String {
    """
    Uso:
      scripts/bitacora/read-reminders.sh [--scope all|today|overdue|undated] [--list NOMBRE]

    Opciones:
      --scope VALOR   Filtra por tipo de vencimiento. Default: all
      --today         Alias de --scope today
      --list NOMBRE   Incluye solo una lista. Se puede repetir.
      --help          Muestra esta ayuda.

    Ejemplos:
      scripts/bitacora/read-reminders.sh
      scripts/bitacora/read-reminders.sh --today
      scripts/bitacora/read-reminders.sh --scope overdue
      scripts/bitacora/read-reminders.sh --list "Inbox"
    """
}

func parseArguments() throws -> Config {
    var config = Config()
    var index = 1

    while index < CommandLine.arguments.count {
        let argument = CommandLine.arguments[index]

        switch argument {
        case "--scope":
            index += 1
            guard index < CommandLine.arguments.count else {
                throw ScriptError.missingValue("--scope")
            }
            let rawScope = CommandLine.arguments[index]
            guard let scope = Scope(rawValue: rawScope) else {
                throw ScriptError.invalidScope(rawScope)
            }
            config.scope = scope
        case "--today":
            config.scope = .today
        case "--list":
            index += 1
            guard index < CommandLine.arguments.count else {
                throw ScriptError.missingValue("--list")
            }
            config.lists.append(CommandLine.arguments[index])
        case "--help", "-h":
            config.showHelp = true
        default:
            throw ScriptError.invalidOption(argument)
        }

        index += 1
    }

    return config
}

func requestAccess(store: EKEventStore) throws {
    let semaphore = DispatchSemaphore(value: 0)
    var granted = false

    if #available(macOS 14.0, *) {
        store.requestFullAccessToReminders { accessGranted, _ in
            granted = accessGranted
            semaphore.signal()
        }
    } else {
        store.requestAccess(to: .reminder) { accessGranted, _ in
            granted = accessGranted
            semaphore.signal()
        }
    }

    semaphore.wait()

    if !granted {
        throw ScriptError.remindersAccessDenied
    }
}

func selectedCalendars(store: EKEventStore, names: [String]) throws -> [EKCalendar] {
    let calendars = store.calendars(for: .reminder)
    guard !names.isEmpty else {
        return calendars
    }

    let requestedNames = Set(names)
    let selected = calendars.filter { requestedNames.contains($0.title) }
    let selectedNames = Set(selected.map(\.title))
    let missing = names.filter { !selectedNames.contains($0) }

    if !missing.isEmpty {
        throw ScriptError.listsNotFound(missing)
    }

    return selected
}

func fetchIncompleteReminders(store: EKEventStore, calendars: [EKCalendar]) throws -> [EKReminder] {
    let semaphore = DispatchSemaphore(value: 0)
    var reminders: [EKReminder]?

    let predicate = store.predicateForIncompleteReminders(withDueDateStarting: nil, ending: nil, calendars: calendars)
    store.fetchReminders(matching: predicate) { fetchedReminders in
        reminders = fetchedReminders
        semaphore.signal()
    }

    semaphore.wait()

    guard let reminders else {
        throw ScriptError.remindersFetchFailed
    }

    return reminders
}

func localDate(from components: DateComponents?) -> Date? {
    guard let components else {
        return nil
    }

    let calendar = Calendar.current
    return calendar.date(from: components)
}

func formatDate(_ date: Date) -> String {
    let formatter = DateFormatter()
    formatter.calendar = Calendar.current
    formatter.locale = Locale(identifier: "en_US_POSIX")
    formatter.timeZone = TimeZone.current
    formatter.dateFormat = "yyyy-MM-dd"
    return formatter.string(from: date)
}

func startOfDay(_ date: Date) -> Date {
    Calendar.current.startOfDay(for: date)
}

func matchesScope(_ scope: Scope, dueDate: Date?) -> Bool {
    switch scope {
    case .all:
        return true
    case .undated:
        return dueDate == nil
    case .today:
        guard let dueDate else { return false }
        return startOfDay(dueDate) == startOfDay(Date())
    case .overdue:
        guard let dueDate else { return false }
        return startOfDay(dueDate) < startOfDay(Date())
    }
}

func buildItems(from reminders: [EKReminder], scope: Scope) -> [ReminderItem] {
    reminders.compactMap { reminder in
        let dueDate = localDate(from: reminder.dueDateComponents)
        guard matchesScope(scope, dueDate: dueDate) else {
            return nil
        }

        let listName = reminder.calendar.title
        return ReminderItem(
            source: "reminders",
            list: listName,
            container: listName,
            title: reminder.title,
            status: "open",
            due_date: dueDate.map(formatDate)
        )
    }
    .sorted { left, right in
        if left.due_date == right.due_date {
            return left.title.localizedCaseInsensitiveCompare(right.title) == .orderedAscending
        }
        return (left.due_date ?? "9999-12-31") < (right.due_date ?? "9999-12-31")
    }
}

do {
    let config = try parseArguments()

    if config.showHelp {
        print(usage())
        exit(0)
    }

    let store = EKEventStore()
    try requestAccess(store: store)
    let calendars = try selectedCalendars(store: store, names: config.lists)
    let reminders = try fetchIncompleteReminders(store: store, calendars: calendars)
    let items = buildItems(from: reminders, scope: config.scope)

    let encoder = JSONEncoder()
    encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
    let data = try encoder.encode(items)
    FileHandle.standardOutput.write(data)
    FileHandle.standardOutput.write(Data("\n".utf8))
} catch {
    let message = error.localizedDescription
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}
