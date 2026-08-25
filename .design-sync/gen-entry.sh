#!/bin/sh
# Regenerates .design-sync/entry.ts — the barrel the design-sync converter
# bundles into window.Mandrock0. Run from the repo root after adding or
# removing a component under src/components/.
set -e
cd "$(git rev-parse --show-toplevel)"
{
  echo "// design-sync bundle entry for claude.ai/design."
  echo "// This repo is a Vite app with no library build, so the converter needs an"
  echo "// explicit barrel to bundle into window.Mandrock0. It re-exports the real"
  echo "// component sources verbatim — nothing is reimplemented here."
  echo "// Regenerate with: .design-sync/gen-entry.sh"
  echo
  for f in src/components/ui/*.tsx src/components/debris/*.tsx; do
    case "$f" in *.stories.tsx) continue ;; esac
    echo "export * from '../$f';"
  done
} > .design-sync/entry.ts
