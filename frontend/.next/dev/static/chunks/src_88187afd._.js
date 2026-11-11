(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/monaco-workers/editor.worker.ts (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/editor.worker.62e060e5.ts");}),
"[project]/src/monaco-workers/editor.worker.ts [app-client] (ecmascript, worker loader)", ((__turbopack_context__) => {

__turbopack_context__.v(__turbopack_context__.b([
  "static/chunks/node_modules_monaco-editor_esm_vs_base_common_367c39cf._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_editor_0c216e8f._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_4b1115d6._.js",
  "static/chunks/node_modules_next_dist_2eee2ac4._.js",
  "static/chunks/src_monaco-workers_editor_worker_ts_7ab8459b._.js",
  "static/chunks/src_monaco-workers_editor_worker_ts_b3f8fcd6._.js",
  "static/chunks/turbopack-src_monaco-workers_editor_worker_ts_7ed1bd9d._.js"
]));
}),
"[project]/src/monaco-workers/ts.worker.ts (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ts.worker.7c63633d.ts");}),
"[project]/src/monaco-workers/ts.worker.ts [app-client] (ecmascript, worker loader)", ((__turbopack_context__) => {

__turbopack_context__.v(__turbopack_context__.b([
  "static/chunks/node_modules_monaco-editor_esm_vs_base_common_367c39cf._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_editor_16e7a98a._.js",
  "static/chunks/4e583_esm_vs_languages_features_typescript_lib_typescriptServices_22b7b97a.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_languages_features_typescript_lib_lib_b9c50e00.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_languages_features_typescript_d8ea0878._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_5aba1b6d._.js",
  "static/chunks/node_modules_next_dist_2eee2ac4._.js",
  "static/chunks/src_monaco-workers_ts_worker_ts_42c87e7d._.js",
  "static/chunks/src_monaco-workers_ts_worker_ts_b3f8fcd6._.js",
  "static/chunks/turbopack-src_monaco-workers_ts_worker_ts_98210679._.js"
]));
}),
"[project]/src/monaco-workers/json.worker.ts (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/json.worker.6763ffcf.ts");}),
"[project]/src/monaco-workers/json.worker.ts [app-client] (ecmascript, worker loader)", ((__turbopack_context__) => {

__turbopack_context__.v(__turbopack_context__.b([
  "static/chunks/node_modules_monaco-editor_esm_vs_base_common_367c39cf._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_editor_16e7a98a._.js",
  "static/chunks/node_modules_monaco-editor_esm_vs_fb62986f._.js",
  "static/chunks/node_modules_monaco-editor_esm_external_90a96c3d._.js",
  "static/chunks/node_modules_next_dist_2eee2ac4._.js",
  "static/chunks/src_monaco-workers_json_worker_ts_c132177e._.js",
  "static/chunks/src_monaco-workers_json_worker_ts_b3f8fcd6._.js",
  "static/chunks/turbopack-src_monaco-workers_json_worker_ts_c17a5a93._.js"
]));
}),
"[project]/src/components/nora/studio/editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/* ============================================================
   NORA Studio — moteur Monaco (le vrai éditeur de VS Code),
   chargé en dynamic import (chunk séparé) quand on ouvre l'IDE.
   Workers fournis via MonacoEnvironment (Turbopack workers),
   thème « nora-dark » accordé à la charte.
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$editor$2e$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/editor.api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$loader$2f$lib$2f$es$2f$loader$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__loader$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/loader/lib/es/loader/index.js [app-client] (ecmascript) <export default as loader>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/components/nora/studio/editor.tsx")}`;
    }
};
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/* --- workers (base, TS/JS, JSON) : autocomplétion et diagnostics réels --- */ let envReady = false;
function ensureMonacoEnvironment() {
    if (envReady || ("TURBOPACK compile-time value", "object") === "undefined") return;
    envReady = true;
    self.MonacoEnvironment = {
        getWorker (_workerId, label) {
            if (label === "json") return new JsonWorker();
            if (label === "javascript" || label === "typescript") return new TsWorker();
            return new BaseWorker();
        }
    };
}
function BaseWorker() {
    return new Worker(__turbopack_context__.r("[project]/src/monaco-workers/editor.worker.ts [app-client] (ecmascript, worker loader)"), {
        ...{
            type: "module",
            name: "monaco-base"
        },
        type: undefined
    });
}
_c = BaseWorker;
function TsWorker() {
    return new Worker(__turbopack_context__.r("[project]/src/monaco-workers/ts.worker.ts [app-client] (ecmascript, worker loader)"), {
        ...{
            type: "module",
            name: "monaco-ts"
        },
        type: undefined
    });
}
_c1 = TsWorker;
function JsonWorker() {
    return new Worker(__turbopack_context__.r("[project]/src/monaco-workers/json.worker.ts [app-client] (ecmascript, worker loader)"), {
        ...{
            type: "module",
            name: "monaco-json"
        },
        type: undefined
    });
}
_c2 = JsonWorker;
/* --- thème NORA (fond de la charte, accents violet/teal) --- */ const THEME = "nora-dark";
function defineTheme() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$editor$2e$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editor"].defineTheme(THEME, {
        base: "vs-dark",
        inherit: true,
        rules: [
            {
                token: "comment",
                foreground: "6b6584",
                fontStyle: "italic"
            },
            {
                token: "keyword",
                foreground: "b794ff"
            },
            {
                token: "string",
                foreground: "7ee0c2"
            },
            {
                token: "number",
                foreground: "f5b56a"
            },
            {
                token: "type",
                foreground: "7fb3ff"
            },
            {
                token: "function",
                foreground: "a78bfa"
            },
            {
                token: "variable",
                foreground: "e8e5f4"
            }
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
            "scrollbarSlider.hoverBackground": "#7c4df055"
        }
    });
}
let configured = false;
function configure() {
    if (configured) return;
    configured = true;
    ensureMonacoEnvironment();
    defineTheme();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$loader$2f$lib$2f$es$2f$loader$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__loader$3e$__["loader"].config({
        monaco: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
    });
}
configure();
function StudioEditor({ value, language, onChange, onMount, onCursor, onRunShortcut, onSaveShortcut }) {
    _s();
    /* re-configurer au remontage (dynamic import → mount à chaud) */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudioEditor.useEffect": ()=>{
            configure();
        }
    }["StudioEditor.useEffect"], []);
    const handleMount = (editor, m)=>{
        m.editor.setTheme(THEME);
        /* raccourcis VS Code : Ctrl/Cmd+S = sauver, Ctrl/Cmd+Entrée = exécuter */ editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.KeyS, ()=>onSaveShortcut?.());
        editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.Enter, ()=>onRunShortcut?.());
        editor.onDidChangeCursorPosition((e)=>onCursor?.({
                lineNumber: e.position.lineNumber,
                column: e.position.column
            }));
        onMount?.({
            editor,
            monaco: m
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
        value: value,
        language: language,
        theme: THEME,
        onChange: (v)=>onChange?.(v ?? ""),
        onMount: handleMount,
        options: {
            fontFamily: "ui-monospace, 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace",
            fontSize: 13,
            minimap: {
                enabled: true,
                size: "proportional",
                scale: 1
            },
            smoothScrolling: true,
            cursorBlinking: "phase",
            cursorSmoothCaretAnimation: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: {
                top: 14,
                bottom: 24
            },
            tabSize: 2,
            renderLineHighlight: "all",
            lineNumbersMinChars: 3,
            bracketPairColorization: {
                enabled: true
            },
            guides: {
                bracketPairs: true
            },
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
                other: true,
                comments: false,
                strings: false
            },
            scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            }
        },
        loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-full place-items-center bg-[#0d0a18] font-mono text-[11px] text-[#6b6584]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "size-3.5 animate-spin rounded-full border-2 border-[#7c4df033] border-t-[#7c4df0]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/nora/studio/editor.tsx",
                        lineNumber: 141,
                        columnNumber: 13
                    }, void 0),
                    "chargement de l'éditeur…"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/nora/studio/editor.tsx",
                lineNumber: 140,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/components/nora/studio/editor.tsx",
            lineNumber: 139,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/src/components/nora/studio/editor.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(StudioEditor, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c3 = StudioEditor;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "BaseWorker");
__turbopack_context__.k.register(_c1, "TsWorker");
__turbopack_context__.k.register(_c2, "JsonWorker");
__turbopack_context__.k.register(_c3, "StudioEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/nora/studio/editor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/nora/studio/editor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_88187afd._.js.map