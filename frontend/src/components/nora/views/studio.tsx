"use client";

/* ============================================================
   NORA Studio — l'IDE de la plateforme (façon VS Code).
   · Explorateur de fichiers (persistés côté backend, par dev)
   · Onglets + éditeur Monaco (thème nora-dark, minimap, suggests)
   · Console d'exécution : le fichier JS tourne dans un worker
     isolé (logs capturés, timeout 5 s)
   · Panneau NORA IA : génère du code, insérable en un clic
   Raccourcis : Ctrl/Cmd+S (sauver), Ctrl/Cmd+Entrée (exécuter).
   ============================================================ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check, ChevronRight, Eraser, FileCode2, FileText, FilePlus2, Folder,
  FolderOpen, Loader2, MessageSquareText, Play, Save, Sparkles, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { StudioEditorHandle } from "../studio/editor";
import { toast } from "sonner";

const StudioEditor = dynamic(() => import("../studio/editor"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-[#0d0a18] font-mono text-[11px] text-[#6b6584]">
      <span className="flex items-center gap-2">
        <span className="size-3.5 animate-spin rounded-full border-2 border-[#7c4df033] border-t-[#7c4df0]" />
        chargement de l&apos;éditeur…
      </span>
    </div>
  ),
});

type LogRow = { kind: "log" | "warn" | "err" | "ret" | "info"; text: string; time: string };

const langIcon = (path: string) =>
  /\.(md|markdown)$/i.test(path) ? FileText : FileCode2;

const langLabel: Record<string, string> = {
  javascript: "JavaScript", typescript: "TypeScript", json: "JSON",
  css: "CSS", html: "HTML", markdown: "Markdown", go: "Go",
  python: "Python", shell: "Shell", sql: "SQL", yaml: "YAML", plaintext: "Texte",
};

function guessLanguage(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    js: "javascript", mjs: "javascript", jsx: "javascript",
    ts: "typescript", tsx: "typescript", json: "json", css: "css",
    html: "html", md: "markdown", go: "go", py: "python", sh: "shell",
    sql: "sql", yml: "yaml", yaml: "yaml",
  };
  return map[ext] ?? "plaintext";
}

export function StudioView() {
  const { t, lang } = useLang();
  const {
    me, workspaceFiles, workspaceLoaded, loadWorkspace,
    saveWorkspaceFile, createWorkspaceFile, deleteWorkspaceFile,
  } = useNora();

  const [openPaths, setOpenPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [newFile, setNewFile] = useState(false);
  const [newPath, setNewPath] = useState("");
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [running, setRunning] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiMsgs, setAiMsgs] = useState<{ role: "user" | "nora"; text: string; code?: { lang: string; snippet: string } }[]>([]);
  const [cursor, setCursor] = useState({ lineNumber: 1, column: 1 });
  const [explorerOpen, setExplorerOpen] = useState(true);

  const editorRef = useRef<StudioEditorHandle | null>(null);
  const runStopRef = useRef<(() => void) | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workspaceLoaded) loadWorkspace();
  }, [workspaceLoaded, loadWorkspace]);

  /* ouvrir le premier fichier une fois chargé */
  useEffect(() => {
    if (workspaceLoaded && workspaceFiles.length > 0 && !activePath) {
      const first = workspaceFiles.find((f) => f.path.endsWith(".js")) ?? workspaceFiles[0];
      openFile(first.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceLoaded, workspaceFiles]);

  /* contenu affiché : brouillon local sinon contenu servi par l'API */
  const fileOf = (path: string) => workspaceFiles.find((f) => f.path === path);
  const activeContent = activePath ? (drafts[activePath] ?? fileOf(activePath)?.content ?? "") : "";
  const activeLang = activePath ? (fileOf(activePath)?.language ?? guessLanguage(activePath)) : "plaintext";

  const openFile = (path: string) => {
    setOpenPaths((p) => (p.includes(path) ? p : [...p, path]));
    setActivePath(path);
  };

  const closeFile = (path: string) => {
    setOpenPaths((p) => {
      const next = p.filter((x) => x !== path);
      if (activePath === path) setActivePath(next[next.length - 1] ?? null);
      return next;
    });
    setDrafts((d) => { const n = { ...d }; delete n[path]; return n; });
    setDirty((d) => { const n = { ...d }; delete n[path]; return n; });
  };

  const onChange = (v: string) => {
    if (!activePath) return;
    setDrafts((d) => ({ ...d, [activePath]: v }));
    setDirty((d) => ({ ...d, [activePath]: v !== (fileOf(activePath)?.content ?? "") }));
  };

  const save = useCallback(async () => {
    const path = activePath;
    if (!path) return;
    const content = drafts[path] ?? fileOf(path)?.content ?? "";
    if (dirty[path] === false) return;
    setSaving(true);
    try {
      await saveWorkspaceFile({ path, content, language: fileOf(path)?.language ?? guessLanguage(path) });
      setDirty((d) => ({ ...d, [path]: false }));
      toast.success(t("studio.saved"), { description: path });
    } catch {
      toast.error(t("studio.saveError"));
    } finally {
      setSaving(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath, drafts, dirty, saveWorkspaceFile, t]);

  /* Ctrl/Cmd+S global (hors éditeur) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  /* ---------- exécution JS en bac à sable ---------- */
  const pushLog = useCallback((kind: LogRow["kind"], texts: unknown[]) => {
    const time = new Date().toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((l) => [...l.slice(-200), {
      kind,
      text: texts.map((x) => (typeof x === "object" && x !== null ? JSON.stringify(x) : String(x))).join(" "),
      time,
    }]);
  }, [lang]);

  const run = useCallback(() => {
    if (!activePath || !/\.m?js$/i.test(activePath)) {
      toast.info(t("studio.runJsOnly"));
      return;
    }
    runStopRef.current?.();
    const code = drafts[activePath] ?? fileOf(activePath)?.content ?? "";
    setConsoleOpen(true);
    setLogs([{ kind: "info", text: `▸ ${t("studio.running")} ${activePath}`, time: new Date().toLocaleTimeString() }]);
    setRunning(true);

    const src = `
const send = (t, a) => postMessage({ t, a });
const fmt = (x) => typeof x === "string" ? x : (() => { try { return JSON.stringify(x, null, 2); } catch { return String(x); } })();
console.log = (...a) => send("log", a);
console.info = (...a) => send("log", a);
console.warn = (...a) => send("warn", a);
console.error = (...a) => send("err", a);
console.table = (v) => send("log", [fmt(v)]);
self.onerror = (m) => send("err", [String(m)]);
try {
  const r = (function(){ ${code} })();
  if (r !== undefined) send("ret", [typeof r === "object" ? fmt(r) : String(r)]);
  send("done", []);
} catch (e) { send("err", [e && e.stack ? e.stack.split("\\n").slice(0,3).join("\\n") : String(e)]); send("done", []); }
`;
    const blob = new Blob([src], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    const timeout = window.setTimeout(() => {
      pushLog("err", [t("studio.timeout")]);
      stop();
    }, 5000);
    const stop = () => {
      window.clearTimeout(timeout);
      URL.revokeObjectURL(url);
      worker.terminate();
      runStopRef.current = null;
      setRunning(false);
      pushLog("info", [`✓ ${t("studio.done")}`]);
    };
    runStopRef.current = stop;
    worker.onmessage = (e: MessageEvent<{ t: string; a: unknown[] }>) => {
      const { t: kind, a } = e.data;
      if (kind === "done") { stop(); return; }
      pushLog(kind as LogRow["kind"], a);
    };
    worker.onerror = (e) => {
      pushLog("err", [e.message || "Erreur"]);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath, drafts, pushLog, t]);

  /* ---------- NORA IA ---------- */
  const askAi = async () => {
    const prompt = aiPrompt.trim();
    if (!prompt || aiBusy) return;
    setAiMsgs((m) => [...m, { role: "user", text: prompt }]);
    setAiPrompt("");
    setAiBusy(true);
    try {
      const { answer } = await api.askNora(prompt);
      setAiMsgs((m) => [...m, { role: "nora", text: answer.content, code: answer.code }]);
    } catch {
      setAiMsgs((m) => [...m, { role: "nora", text: t("studio.aiError") }]);
    } finally {
      setAiBusy(false);
    }
  };

  const insertCode = (code: string) => {
    const h = editorRef.current;
    if (!h || !activePath) return;
    const pos = h.editor.getPosition();
    if (pos) {
      h.editor.executeEdits("nora-ai", [{
        range: new h.monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
        text: code + "\n",
      }]);
      h.editor.focus();
      if (activePath) setDirty((d) => ({ ...d, [activePath]: true }));
      toast.success(t("studio.inserted"));
    }
  };

  /* ---------- explorateur : dossiers groupés ---------- */
  const tree = useMemo(() => {
    const dirs = new Map<string, { path: string; language: string }[]>();
    const sorted = [...workspaceFiles].sort((a, b) => a.path.localeCompare(b.path));
    for (const f of sorted) {
      const i = f.path.lastIndexOf("/");
      const dir = i === -1 ? "" : f.path.slice(0, i);
      if (!dirs.has(dir)) dirs.set(dir, []);
      dirs.get(dir)!.push({ path: f.path, language: f.language });
    }
    return [...dirs.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [workspaceFiles]);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight });
  }, [logs]);

  if (!me) return null;

  const createFile = async () => {
    const path = newPath.trim().replace(/^\/+/, "");
    if (!path) return;
    try {
      await createWorkspaceFile(path);
      openFile(path);
      setNewFile(false);
      setNewPath("");
      toast.success(t("studio.fileCreated"), { description: path });
    } catch {
      toast.error(t("studio.fileError"));
    }
  };

  const removeFile = async (path: string) => {
    if (confirmDel !== path) {
      setConfirmDel(path);
      window.setTimeout(() => setConfirmDel((c) => (c === path ? null : c)), 2600);
      return;
    }
    await deleteWorkspaceFile(path);
    closeFile(path);
    setConfirmDel(null);
    toast.success(t("studio.fileDeleted"), { description: path });
  };

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* barre d'actions */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="mr-auto">
          <p className="font-mono text-[11px] tracking-[0.2em] text-signal">
            <span className="mr-2 text-flare">{"//"}</span>{t("studio.kicker")}
          </p>
          <h1 className="mt-1 flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight">
            {t("studio.title")}
            <span className="rounded-md border border-flare/30 bg-flare/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-flare">IDE</span>
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => setExplorerOpen((v) => !v)}
          className="h-9 gap-2 rounded-lg border-line bg-surface font-mono text-[11px]"
        >
          <FolderOpen className="size-3.5" /> {t("studio.explorer")}
        </Button>
        <Button
          variant="outline"
          onClick={() => setAiOpen((v) => !v)}
          className={cn(
            "h-9 gap-2 rounded-lg border font-mono text-[11px]",
            aiOpen ? "border-flare/50 bg-flare/10 text-flare" : "border-line bg-surface",
          )}
        >
          <Sparkles className="size-3.5" /> NORA IA
        </Button>
        <Button
          onClick={save}
          disabled={saving || !activePath || !dirty[activePath]}
          variant="outline"
          className="h-9 gap-2 rounded-lg border-line bg-surface font-mono text-[11px]"
        >
          {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
          {t("studio.save")} <kbd className="rounded bg-surface-2 px-1 text-[9px]">⌘S</kbd>
        </Button>
        <Button
          onClick={run}
          className="h-9 gap-2 rounded-lg bg-signal px-4 font-mono text-[11.5px] font-semibold text-white hover:bg-signal/90"
        >
          <Play className="size-3.5 fill-current" /> {t("studio.run")}
        </Button>
      </div>

      {/* corps IDE */}
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0912] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
        <div className={cn("flex", explorerOpen && "max-md:hidden")}>
          {/* ----- explorateur ----- */}
          <div className="flex w-[236px] shrink-0 flex-col border-r border-[#1d1733] bg-[#0d0a18] max-md:w-[190px]">
            <div className="flex h-9 items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d87a8]">
              {explorerOpen ? <FolderOpen className="size-3.5 text-flare" /> : <Folder className="size-3.5" />}
              {t("studio.explorer")}
              <button
                onClick={() => setNewFile(true)}
                className="ml-auto grid size-6 cursor-pointer place-items-center rounded text-[#8d87a8] transition-colors hover:bg-[#1d1733] hover:text-white"
                aria-label={t("studio.newFile")}
              >
                <FilePlus2 className="size-3.5" />
              </button>
            </div>

            {newFile && (
              <div className="px-2 pb-2">
                <Input
                  autoFocus
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") createFile(); if (e.key === "Escape") setNewFile(false); }}
                  onBlur={() => { if (!newPath.trim()) setNewFile(false); }}
                  placeholder="src/utils.js"
                  className="h-8 rounded-md border-[#2c2450] bg-[#141021] font-mono text-[11px] text-white placeholder:text-[#5a5478]"
                />
              </div>
            )}

            <div className="flex-1 overflow-y-auto pb-3">
              {tree.map(([dir, files]) => (
                <div key={dir || "root"} className="mt-1">
                  {dir && (
                    <p className="flex items-center gap-1.5 px-3 py-1 font-mono text-[10.5px] text-[#8d87a8]">
                      <ChevronRight className="size-3 text-[#5a5478]" /> {dir}
                    </p>
                  )}
                  {files.map((f) => {
                    const Icon = langIcon(f.path);
                    const on = activePath === f.path;
                    const isDirty = dirty[f.path];
                    return (
                      <div
                        key={f.path}
                        className={cn(
                          "group flex cursor-pointer items-center gap-1.5 py-[5px] pl-6 pr-2 font-mono text-[11.5px] transition-colors",
                          on ? "bg-[#7c4df026] text-white" : "text-[#b3adc9] hover:bg-[#171230]",
                        )}
                        onClick={() => openFile(f.path)}
                      >
                        <Icon className={cn("size-3.5 shrink-0", on ? "text-flare-bright" : "text-[#5a5478]")} />
                        <span className="min-w-0 flex-1 truncate">{f.path.split("/").pop()}</span>
                        {isDirty && <span className="size-1.5 shrink-0 rounded-full bg-gold" />}
                        <button
                          onClick={(e) => { e.stopPropagation(); removeFile(f.path); }}
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded transition-colors",
                            confirmDel === f.path
                              ? "bg-destructive/20 text-destructive"
                              : "text-[#5a5478] opacity-0 hover:text-destructive group-hover:opacity-100",
                          )}
                          aria-label={t("studio.deleteFile")}
                        >
                          {confirmDel === f.path ? <Check className="size-3" /> : <Trash2 className="size-3" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
              {workspaceFiles.length === 0 && (
                <p className="px-3 py-6 text-center font-mono text-[10.5px] text-[#5a5478]">{t("studio.noFiles")}</p>
              )}
            </div>

            <div className="border-t border-[#1d1733] px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#5a5478]">
              {workspaceFiles.length} {t("studio.filesCount")} · {me.username}
            </div>
          </div>

          {/* ----- éditeur + console ----- */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* onglets */}
            <div className="flex h-9 items-stretch overflow-x-auto border-b border-[#1d1733] bg-[#0b0912]">
              {openPaths.map((path) => {
                const on = activePath === path;
                const Icon = langIcon(path);
                return (
                  <div
                    key={path}
                    onClick={() => openFile(path)}
                    className={cn(
                      "flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-[#1d1733] px-3 font-mono text-[11px] transition-colors",
                      on ? "bg-[#0d0a18] text-white" : "bg-[#0b0912] text-[#8d87a8] hover:text-[#b3adc9]",
                      on && "border-t-2 border-t-flare",
                    )}
                  >
                    <Icon className={cn("size-3.5", on && "text-flare-bright")} />
                    {path.split("/").pop()}
                    {dirty[path] && <span className="size-1.5 rounded-full bg-gold" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); closeFile(path); }}
                      className="ml-1 grid size-4 place-items-center rounded text-[#5a5478] hover:bg-[#1d1733] hover:text-white"
                      aria-label="Fermer"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                );
              })}
              {openPaths.length === 0 && (
                <p className="flex items-center px-3 font-mono text-[10.5px] text-[#5a5478]">{t("studio.noOpenFile")}</p>
              )}
            </div>

            {/* éditeur */}
            <div className="h-[440px] min-h-[360px] flex-1">
              {activePath ? (
                <StudioEditor
                  value={activeContent}
                  language={activeLang}
                  onChange={onChange}
                  onMount={(h) => { editorRef.current = h; }}
                  onCursor={setCursor}
                  onRunShortcut={run}
                  onSaveShortcut={save}
                />
              ) : (
                <div className="grid h-full place-items-center bg-[#0d0a18]">
                  <div className="text-center">
                    <p className="font-display text-[15px] font-semibold text-[#8d87a8]">{t("studio.pick")}</p>
                    <p className="mt-1.5 font-mono text-[11px] text-[#5a5478]">{t("studio.pickHint")}</p>
                  </div>
                </div>
              )}
            </div>

            {/* console */}
            <div className="border-t border-[#1d1733] bg-[#0b0912]">
              <button
                onClick={() => setConsoleOpen((v) => !v)}
                className="flex h-8 w-full cursor-pointer items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d87a8] hover:text-white"
              >
                <ChevronRight className={cn("size-3 transition-transform", consoleOpen && "rotate-90")} />
                {t("studio.console")}
                {running && <Loader2 className="size-3 animate-spin text-signal" />}
                <span className="ml-auto flex items-center gap-2 normal-case tracking-normal">
                  <button
                    onClick={(e) => { e.stopPropagation(); setLogs([]); }}
                    className="grid size-5 cursor-pointer place-items-center rounded hover:bg-[#1d1733]"
                    aria-label={t("studio.clear")}
                  >
                    <Eraser className="size-3" />
                  </button>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {consoleOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 168 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div ref={consoleRef} className="h-[168px] overflow-y-auto px-3 pb-3 font-mono text-[11.5px] leading-relaxed">
                      {logs.length === 0 ? (
                        <p className="pt-2 text-[#5a5478]">{t("studio.consoleHint")}</p>
                      ) : (
                        logs.map((l, i) => (
                          <p key={i} className="whitespace-pre-wrap break-words">
                            <span className="mr-2 text-[9px] text-[#5a5478]">{l.time}</span>
                            <span className={cn(
                              l.kind === "err" && "text-[#ff7d9c]",
                              l.kind === "warn" && "text-[#f5b56a]",
                              l.kind === "ret" && "text-[#00e0b0]",
                              l.kind === "info" && "text-[#8d87a8]",
                              l.kind === "log" && "text-[#d9d4ee]",
                            )}>
                              {l.text}
                            </span>
                          </p>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* barre d'état */}
            <div className="flex h-7 items-center gap-3 border-t border-[#1d1733] bg-[#0d0a18] px-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#8d87a8]">
              <span className="flex items-center gap-1.5 text-[#00e0b0]">
                <span className="size-1.5 rounded-full bg-[#00e0b0]" /> API connectée
              </span>
              <span>{activePath ?? "—"}</span>
              <span className="ml-auto normal-case">{langLabel[activeLang] ?? activeLang}</span>
              <span className="normal-case">Ln {cursor.lineNumber}, Col {cursor.column}</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* ----- panneau NORA IA ----- */}
          <AnimatePresence initial={false}>
            {aiOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex shrink-0 flex-col border-l border-[#1d1733] bg-[#0d0a18]"
              >
                <div className="flex h-9 items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d87a8]">
                  <Sparkles className="size-3.5 text-flare" /> {t("studio.ai.title")}
                  <button onClick={() => setAiOpen(false)} className="ml-auto grid size-5 cursor-pointer place-items-center rounded hover:bg-[#1d1733]" aria-label="Fermer">
                    <X className="size-3" />
                  </button>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
                  <p className="font-mono text-[10.5px] leading-relaxed text-[#5a5478]">{t("studio.ai.hint")}</p>
                  {aiMsgs.map((m, i) => (
                    <div key={i} className={cn("rounded-lg px-3 py-2 text-[12px] leading-relaxed", m.role === "user" ? "bg-[#171230] text-[#d9d4ee]" : "border border-[#2c2450] bg-[#141021] text-[#e8e5f4]")}>
                      <p className="mb-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#8d87a8]">
                        {m.role === "user" ? me.name.split(" ")[0] : "NORA"}
                      </p>
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      {m.code && (
                        <div className="mt-2 overflow-hidden rounded-md border border-[#2c2450]">
                          <div className="flex items-center justify-between bg-[#171230] px-2.5 py-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8d87a8]">{m.code.lang}</span>
                            <button
                              onClick={() => insertCode(m.code!.snippet)}
                              className="cursor-pointer rounded bg-flare/20 px-2 py-0.5 font-mono text-[9px] text-flare-bright transition-colors hover:bg-flare/35"
                            >
                              {t("studio.ai.insert")}
                            </button>
                          </div>
                          <pre className="max-h-[180px] overflow-auto bg-[#0b0912] px-2.5 py-2 font-mono text-[10px] leading-[1.6] text-[#b3adc9]"><code>{m.code.snippet}</code></pre>
                        </div>
                      )}
                    </div>
                  ))}
                  {aiBusy && (
                    <p className="flex items-center gap-2 font-mono text-[10.5px] text-[#8d87a8]">
                      <Loader2 className="size-3 animate-spin" /> NORA {t("studio.ai.thinking")}
                    </p>
                  )}
                </div>
                <div className="border-t border-[#1d1733] p-2.5">
                  <div className="flex gap-1.5">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && askAi()}
                      placeholder={t("studio.ai.placeholder")}
                      className="h-9 rounded-lg border-[#2c2450] bg-[#141021] font-mono text-[11.5px] text-white placeholder:text-[#5a5478]"
                    />
                    <Button onClick={askAi} disabled={aiBusy} size="icon" className="size-9 shrink-0 rounded-lg bg-flare text-white hover:bg-flare/90">
                      <MessageSquareText className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* explorateur replié (mobile) */}
        {!explorerOpen && (
          <button
            onClick={() => setExplorerOpen(true)}
            className="flex h-10 w-full items-center justify-center gap-2 font-mono text-[11px] text-[#8d87a8] hover:text-white"
          >
            <Folder className="size-3.5" /> {t("studio.explorer")}
          </button>
        )}
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
        <span>⌘S — {t("studio.save")}</span>
        <span>⌘⏎ — {t("studio.run")}</span>
        <span>{t("studio.sandboxNote")}</span>
      </p>
    </div>
  );
}
