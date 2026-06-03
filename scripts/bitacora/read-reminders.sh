#!/usr/bin/env bash
set -euo pipefail

script_dir=$(dirname "$0")
exec swift "$script_dir/read-reminders.swift" "$@"
