"use client";

/* ============================================================
   NORA Studio — moteur Monaco (le vrai éditeur de VS Code),
   chargé en dynamic import (chunk séparé) quand on ouvre l'IDE.
   Workers fournis via MonacoEnvironment (Turbopack workers),
   thème « nora-dark » accordé à la charte.
   ============================================================ */

import { useEffect } from "react";
import * as monaco from "monaco-editor";
import Editor, { loader, type OnMount } from "@monaco-editor/react";

/* --- workers (base, TS/JS, JSON) : autocomplétion et diagnostics réels --- */
let envReady = false;
function ensureMonacoEnvironment() {
  if (envReady || typeof window === "undefined") return;
  envReady = true;
  self.MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === "json") return new JsonWorker();
      if (label === "javascript" || label === "typescript") return new TsWorker();
      return new BaseWorker();
    },
  };
}
function BaseWorker() {
  return new Worker(new URL("../../../monaco-workers/editor.worker.ts", import.meta.url), { type: "module", name: "monaco-base" });
}
function TsWorker() {
  return new Worker(new URL("../../../monaco-workers/ts.worker.ts", import.meta.url), { type: "module", name: "monaco-ts" });
}
function JsonWorker() {
  return new Worker(new URL("../../../monaco-workers/json.worker.ts", import.meta.url), { type: "module", name: "monaco-json" });
}

/* --- thème NORA (fond de la charte, accents violet/teal) --- */
const THEME = "nora-dark";
function defineTheme() {
  monaco.editor.defineTheme(THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6b6584", fontStyle: "italic" },
      { token: "keyword", foreground: "b794ff" },
      { token: "string", foreground: "7ee0c2" },
      { token: "number", foreground: "f5b56a" },
      { token: "type", foreground: "7fb3ff" },
      { token: "function", foreground: "a78bfa" },
      { token: "variable", foreground: "e8e5f4" },
    ],
    colors: {
      "editor.background": "#0d0a18",
      "editor.foreground": "#e8e5f4",
      "editorLineNumber.foreground": "#4a4464",
      "editorLineNumber.activeForeground": "#a78bfa",
      "editor.selectionBackground": "#7c4df044",
      "editor.lineHighlightBackground": "#171230",
      "editorCursor.foreground": "#00e0b0",
      "editorIndentGuide.background1": "#241d3f",
      "editorWidget.background": "#141021",
      "editorWidget.border": "#2c2450",
      "editorSuggestWidget.background": "#141021",
      "editorSuggestWidget.selectedBackground": "#7c4df033",
      "minimap.background": "#0b0912",
      "scrollbarSlider.background": "#7c4df033",
      "scrollbarSlider.hoverBackground": "#7c4df055",
    },
  });
}

let configured = false;
function configure() {
  if (configured) return;
  configured = true;
  ensureMonacoEnvironment();
  defineTheme();
  loader.config({ monaco });
}
configure();

export type StudioEditorHandle = {
  editor: monaco.editor.IStandaloneCodeEditor;
  monaco: typeof monaco;
};

export type StudioEditorProps = {
  value: string;
  language: string;
  onChange?: (v: string) => void;
  onMount?: (h: StudioEditorHandle) => void;
  onCursor?: (pos: { lineNumber: number; column: number }) => void;
  onRunShortcut?: () => void;
  onSaveShortcut?: () => void;
};

export default function StudioEditor({
  value, language, onChange, onMount, onCursor, onRunShortcut, onSaveShortcut,
}: StudioEditorProps) {
  /* re-configurer au remontage (dynamic import → mount à chaud) */
  useEffect(() => { configure(); }, []);

  const handleMount: OnMount = (editor, m) => {
    m.editor.setTheme(THEME);
    /* raccourcis VS Code : Ctrl/Cmd+S = sauver, Ctrl/Cmd+Entrée = exécuter */
    editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.KeyS, () => onSaveShortcut?.());
    editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.Enter, () => onRunShortcut?.());
    editor.onDidChangeCursorPosition((e) => onCursor?.({ lineNumber: e.position.lineNumber, column: e.position.column }));
    onMount?.({ editor, monaco: m });
  };

  return (
    <Editor
      value={value}
      language={language}
      theme={THEME}
      onChange={(v) => onChange?.(v ?? "")}
      onMount={handleMount}
      options={{
        fontFamily: "ui-monospace, 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace",
        fontSize: 13,
        minimap: { enabled: true, size: "proportional", scale: 1 },
        smoothScrolling: true,
        cursorBlinking: "phase",
        cursorSmoothCaretAnimation: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 14, bottom: 24 },
        tabSize: 2,
        renderLineHighlight: "all",
        lineNumbersMinChars: 3,
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true },
        suggestOnTriggerCharacters: true,
        quickSuggestions: { other: true, comments: false, strings: false },
        scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
      }}
      loading={
        <div className="grid h-full place-items-center bg-[#0d0a18] font-mono text-[11px] text-[#6b6584]">
          <span className="flex items-center gap-2">
            <span className="size-3.5 animate-spin rounded-full border-2 border-[#7c4df033] border-t-[#7c4df0]" />
            chargement de l&apos;éditeur…
          </span>
        </div>
      }
    />
  );
}
