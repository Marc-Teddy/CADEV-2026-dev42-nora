(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/hintsWidget/inlineCompletionsHintsWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomizedMenuWorkbenchToolBar",
    ()=>CustomizedMenuWorkbenchToolBar,
    "InlineCompletionsHintsWidget",
    ()=>InlineCompletionsHintsWidget,
    "InlineSuggestionHintsContentWidget",
    ()=>InlineSuggestionHintsContentWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$markdownRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/markdownRenderer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$actionbar$2f$actionViewItems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionViewItems.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/actions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hotReloadHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hotReloadHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/themables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$browser$2f$menuEntryActionViewItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/actions/browser/menuEntryActionViewItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$browser$2f$toolbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/actions/browser/toolbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/actions/common/actions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/commands/common/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextview$2f$browser$2f$contextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$telemetry$2f$common$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/telemetry/common/telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$iconRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/iconRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = undefined && undefined.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};
var InlineSuggestionHintsContentWidget_1;
let InlineCompletionsHintsWidget = class InlineCompletionsHintsWidget extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(editor, model, instantiationService){
        super();
        this.editor = editor;
        this.model = model;
        this.instantiationService = instantiationService;
        this.alwaysShowToolbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this, this.editor.onDidChangeConfiguration, ()=>this.editor.getOption(71 /* EditorOption.inlineSuggest */ ).showToolbar === 'always');
        this.sessionPosition = undefined;
        this.position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const ghostText = this.model.read(reader)?.primaryGhostText.read(reader);
            if (!this.alwaysShowToolbar.read(reader) || !ghostText || ghostText.parts.length === 0) {
                this.sessionPosition = undefined;
                return null;
            }
            const firstColumn = ghostText.parts[0].column;
            if (this.sessionPosition && this.sessionPosition.lineNumber !== ghostText.lineNumber) {
                this.sessionPosition = undefined;
            }
            const position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](ghostText.lineNumber, Math.min(firstColumn, this.sessionPosition?.column ?? Number.MAX_SAFE_INTEGER));
            this.sessionPosition = position;
            return position;
        });
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorunWithStore"])((reader, store)=>{
            /** @description setup content widget */ const model = this.model.read(reader);
            if (!model || !this.alwaysShowToolbar.read(reader)) {
                return;
            }
            const contentWidgetValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
                const contentWidget = reader.store.add(this.instantiationService.createInstance(InlineSuggestionHintsContentWidget.hot.read(reader), this.editor, true, this.position, model.selectedInlineCompletionIndex, model.inlineCompletionsCount, model.activeCommands, model.warning, ()=>{}));
                editor.addContentWidget(contentWidget);
                reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>editor.removeContentWidget(contentWidget)));
                reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
                    /** @description request explicit */ const position = this.position.read(reader);
                    if (!position) {
                        return;
                    }
                    if (model.lastTriggerKind.read(reader) !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit) {
                        model.triggerExplicitly();
                    }
                }));
                return contentWidget;
            });
            const hadPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(this, (reader, lastValue)=>!!this.position.read(reader) || !!lastValue);
            store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
                if (hadPosition.read(reader)) {
                    contentWidgetValue.read(reader);
                }
            }));
        }));
    }
};
InlineCompletionsHintsWidget = __decorate([
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"])
], InlineCompletionsHintsWidget);
const inlineSuggestionHintsNextIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$iconRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerIcon"])('inline-suggestion-hints-next', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].chevronRight, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1270, 'Icon for show next parameter hint.'));
const inlineSuggestionHintsPreviousIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$iconRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerIcon"])('inline-suggestion-hints-previous', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].chevronLeft, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1271, 'Icon for show previous parameter hint.'));
let InlineSuggestionHintsContentWidget = class InlineSuggestionHintsContentWidget extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        InlineSuggestionHintsContentWidget_1 = this;
    }
    static{
        this.hot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hotReloadHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHotClass"])(this);
    }
    static{
        this._dropDownVisible = false;
    }
    static get dropDownVisible() {
        return this._dropDownVisible;
    }
    static{
        this.id = 0;
    }
    createCommandAction(commandId, label, iconClassName) {
        const action = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"](commandId, label, iconClassName, true, ()=>this._commandService.executeCommand(commandId));
        action.tooltip = this.keybindingService.appendKeybinding(label, commandId, this._contextKeyService);
        return action;
    }
    constructor(editor, withBorder, _position, _currentSuggestionIdx, _suggestionCount, _extraCommands, _warning, _relayout, _commandService, instantiationService, keybindingService, _contextKeyService, _menuService){
        super();
        this.editor = editor;
        this.withBorder = withBorder;
        this._position = _position;
        this._currentSuggestionIdx = _currentSuggestionIdx;
        this._suggestionCount = _suggestionCount;
        this._extraCommands = _extraCommands;
        this._warning = _warning;
        this._relayout = _relayout;
        this._commandService = _commandService;
        this.keybindingService = keybindingService;
        this._contextKeyService = _contextKeyService;
        this._menuService = _menuService;
        this.id = `InlineSuggestionHintsContentWidget${InlineSuggestionHintsContentWidget_1.id++}`;
        this.allowEditorOverflow = true;
        this.suppressMouseDown = false;
        this._warningMessageContentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const warning = this._warning.read(reader);
            if (!warning) {
                return undefined;
            }
            if (typeof warning.message === 'string') {
                return warning.message;
            }
            const markdownElement = reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$markdownRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderMarkdown"])(warning.message));
            return markdownElement.element;
        });
        this._warningMessageNode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'warningMessage',
            style: {
                maxWidth: 400,
                margin: 4,
                marginBottom: 4,
                display: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>this._warning.read(reader) ? 'block' : 'none')
            }
        }, [
            this._warningMessageContentNode
        ]).keepUpdated(this._store);
        this.nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["h"])('div.inlineSuggestionsHints', {
            className: this.withBorder ? 'monaco-hover monaco-hover-content' : ''
        }, [
            this._warningMessageNode.element,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["h"])('div@toolBar')
        ]);
        this.previousAction = this._register(this.createCommandAction(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showPreviousInlineSuggestionActionId"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1272, 'Previous'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeIcon"].asClassName(inlineSuggestionHintsPreviousIcon)));
        this.availableSuggestionCountAction = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"]('inlineSuggestionHints.availableSuggestionCount', '', undefined, false));
        this.nextAction = this._register(this.createCommandAction(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showNextInlineSuggestionActionId"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1273, 'Next'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeIcon"].asClassName(inlineSuggestionHintsNextIcon)));
        this.inlineCompletionsActionsMenus = this._register(this._menuService.createMenu(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuId"].InlineCompletionsActions, this._contextKeyService));
        this.clearAvailableSuggestionCountLabelDebounced = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RunOnceScheduler"](()=>{
            this.availableSuggestionCountAction.label = '';
        }, 100));
        this.disableButtonsDebounced = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RunOnceScheduler"](()=>{
            this.previousAction.enabled = this.nextAction.enabled = false;
        }, 100));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            this._warningMessageContentNode.read(reader);
            this._warningMessageNode.readEffect(reader);
            // Only update after the warning message node has been rendered
            this._relayout();
        }));
        this.toolBar = this._register(instantiationService.createInstance(CustomizedMenuWorkbenchToolBar, this.nodes.toolBar, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuId"].InlineSuggestionToolbar, {
            menuOptions: {
                renderShortTitle: true
            },
            toolbarOptions: {
                primaryGroup: (g)=>g.startsWith('primary')
            },
            actionViewItemProvider: (action, options)=>{
                if (action instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItemAction"]) {
                    return instantiationService.createInstance(StatusBarViewItem, action, undefined);
                }
                if (action === this.availableSuggestionCountAction) {
                    const a = new ActionViewItemWithClassName(undefined, action, {
                        label: true,
                        icon: false
                    });
                    a.setClass('availableSuggestionCount');
                    return a;
                }
                return undefined;
            },
            telemetrySource: 'InlineSuggestionToolbar'
        }));
        this.toolBar.setPrependedPrimaryActions([
            this.previousAction,
            this.availableSuggestionCountAction,
            this.nextAction
        ]);
        this._register(this.toolBar.onDidChangeDropdownVisibility((e)=>{
            InlineSuggestionHintsContentWidget_1._dropDownVisible = e;
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            /** @description update position */ this._position.read(reader);
            this.editor.layoutContentWidget(this);
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            /** @description counts */ const suggestionCount = this._suggestionCount.read(reader);
            const currentSuggestionIdx = this._currentSuggestionIdx.read(reader);
            if (suggestionCount !== undefined) {
                this.clearAvailableSuggestionCountLabelDebounced.cancel();
                this.availableSuggestionCountAction.label = `${currentSuggestionIdx + 1}/${suggestionCount}`;
            } else {
                this.clearAvailableSuggestionCountLabelDebounced.schedule();
            }
            if (suggestionCount !== undefined && suggestionCount > 1) {
                this.disableButtonsDebounced.cancel();
                this.previousAction.enabled = this.nextAction.enabled = true;
            } else {
                this.disableButtonsDebounced.schedule();
            }
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            /** @description extra commands */ const extraCommands = this._extraCommands.read(reader);
            const extraActions = extraCommands.map((c)=>({
                    class: undefined,
                    id: c.command.id,
                    enabled: true,
                    tooltip: c.command.tooltip || '',
                    label: c.command.title,
                    run: ()=>this._commandService.executeCommand(c.command.id, ...c.command.arguments ?? [])
                }));
            for (const [_, group] of this.inlineCompletionsActionsMenus.getActions()){
                for (const action of group){
                    if (action instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItemAction"]) {
                        extraActions.push(action);
                    }
                }
            }
            if (extraActions.length > 0) {
                extraActions.unshift(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"]());
            }
            this.toolBar.setAdditionalSecondaryActions(extraActions);
        }));
    }
    getId() {
        return this.id;
    }
    getDomNode() {
        return this.nodes.root;
    }
    getPosition() {
        return {
            position: this._position.get(),
            preference: [
                1 /* ContentWidgetPositionPreference.ABOVE */ ,
                2 /* ContentWidgetPositionPreference.BELOW */ 
            ],
            positionAffinity: 3 /* PositionAffinity.LeftOfInjectedText */ 
        };
    }
};
InlineSuggestionHintsContentWidget = InlineSuggestionHintsContentWidget_1 = __decorate([
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(11, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(12, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMenuService"])
], InlineSuggestionHintsContentWidget);
class ActionViewItemWithClassName extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$actionbar$2f$actionViewItems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionViewItem"] {
    constructor(){
        super(...arguments);
        this._className = undefined;
    }
    setClass(className) {
        this._className = className;
    }
    render(container) {
        super.render(container);
        if (this._className) {
            container.classList.add(this._className);
        }
    }
    updateTooltip() {
    // NOOP, disable tooltip
    }
}
class StatusBarViewItem extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$browser$2f$menuEntryActionViewItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuEntryActionViewItem"] {
    updateLabel() {
        const kb = this._keybindingService.lookupKeybinding(this._action.id, this._contextKeyService, true);
        if (!kb) {
            return super.updateLabel();
        }
        if (this.label) {
            const div = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["h"])('div.keybinding').root;
            const k = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeybindingLabel"](div, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OS"], {
                disableTitle: true,
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unthemedKeybindingLabelOptions"]
            }));
            k.set(kb);
            this.label.textContent = this._action.label;
            this.label.appendChild(div);
            this.label.classList.add('inlineSuggestionStatusBarItemLabel');
        }
    }
    updateTooltip() {
    // NOOP, disable tooltip
    }
}
let CustomizedMenuWorkbenchToolBar = class CustomizedMenuWorkbenchToolBar extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$browser$2f$toolbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkbenchToolBar"] {
    constructor(container, menuId, options2, menuService, contextKeyService, contextMenuService, keybindingService, commandService, telemetryService){
        super(container, {
            resetMenu: menuId,
            ...options2
        }, menuService, contextKeyService, contextMenuService, keybindingService, commandService, telemetryService);
        this.menuId = menuId;
        this.options2 = options2;
        this.menuService = menuService;
        this.contextKeyService = contextKeyService;
        this.menu = this._store.add(this.menuService.createMenu(this.menuId, this.contextKeyService, {
            emitEventsForSubmenuChanges: true
        }));
        this.additionalActions = [];
        this.prependedPrimaryActions = [];
        this.additionalPrimaryActions = [];
        this._store.add(this.menu.onDidChange(()=>this.updateToolbar()));
        this.updateToolbar();
    }
    updateToolbar() {
        const { primary, secondary } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$browser$2f$menuEntryActionViewItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActionBarActions"])(this.menu.getActions(this.options2?.menuOptions), this.options2?.toolbarOptions?.primaryGroup, this.options2?.toolbarOptions?.shouldInlineSubmenu, this.options2?.toolbarOptions?.useSeparatorsInPrimaryActions);
        secondary.push(...this.additionalActions);
        primary.unshift(...this.prependedPrimaryActions);
        primary.push(...this.additionalPrimaryActions);
        this.setActions(primary, secondary);
    }
    setPrependedPrimaryActions(actions) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(this.prependedPrimaryActions, actions, (a, b)=>a === b)) {
            return;
        }
        this.prependedPrimaryActions = actions;
        this.updateToolbar();
    }
    setAdditionalSecondaryActions(actions) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(this.additionalActions, actions, (a, b)=>a === b)) {
            return;
        }
        this.additionalActions = actions;
        this.updateToolbar();
    }
};
CustomizedMenuWorkbenchToolBar = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMenuService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextview$2f$browser$2f$contextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextMenuService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"]),
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$telemetry$2f$common$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITelemetryService"])
], CustomizedMenuWorkbenchToolBar);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/hintsWidget/hoverParticipant.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionsHover",
    ()=>InlineCompletionsHover,
    "InlineCompletionsHoverParticipant",
    ()=>InlineCompletionsHoverParticipant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$htmlContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/htmlContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/hover/browser/hoverTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/inlineCompletionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$inlineCompletionsHintsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/hintsWidget/inlineCompletionsHintsWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$markdown$2f$browser$2f$markdownRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/markdown/browser/markdownRenderer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/accessibility/common/accessibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$telemetry$2f$common$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/telemetry/common/telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/ghostText/ghostTextView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = undefined && undefined.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};
class InlineCompletionsHover {
    constructor(owner, range, controller){
        this.owner = owner;
        this.range = range;
        this.controller = controller;
    }
    isValidForHoverAnchor(anchor) {
        return anchor.type === 1 /* HoverAnchorType.Range */  && this.range.startColumn <= anchor.range.startColumn && this.range.endColumn >= anchor.range.endColumn;
    }
}
let InlineCompletionsHoverParticipant = class InlineCompletionsHoverParticipant {
    constructor(_editor, accessibilityService, _instantiationService, _telemetryService, _markdownRendererService){
        this._editor = _editor;
        this.accessibilityService = accessibilityService;
        this._instantiationService = _instantiationService;
        this._telemetryService = _telemetryService;
        this._markdownRendererService = _markdownRendererService;
        this.hoverOrdinal = 4;
        this.hideCopyButton = true;
    }
    suggestHoverAnchor(mouseEvent) {
        const controller = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsController"].get(this._editor);
        if (!controller) {
            return null;
        }
        const target = mouseEvent.target;
        if (target.type === 8 /* MouseTargetType.CONTENT_VIEW_ZONE */ ) {
            // handle the case where the mouse is over the view zone
            const viewZoneData = target.detail;
            if (controller.shouldShowHoverAtViewZone(viewZoneData.viewZoneId)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverForeignElementAnchor"](1000, this, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(this._editor.getModel().validatePosition(viewZoneData.positionBefore || viewZoneData.position)), mouseEvent.event.posx, mouseEvent.event.posy, false);
            }
        }
        if (target.type === 7 /* MouseTargetType.CONTENT_EMPTY */ ) {
            // handle the case where the mouse is over the empty portion of a line following ghost text
            if (controller.shouldShowHoverAt(target.range)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverForeignElementAnchor"](1000, this, target.range, mouseEvent.event.posx, mouseEvent.event.posy, false);
            }
        }
        if (target.type === 6 /* MouseTargetType.CONTENT_TEXT */ ) {
            // handle the case where the mouse is directly over ghost text
            const mightBeForeignElement = target.detail.mightBeForeignElement;
            if (mightBeForeignElement && controller.shouldShowHoverAt(target.range)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverForeignElementAnchor"](1000, this, target.range, mouseEvent.event.posx, mouseEvent.event.posy, false);
            }
        }
        if (target.type === 9 /* MouseTargetType.CONTENT_WIDGET */  && target.element) {
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextView"].getWarningWidgetContext(target.element);
            if (ctx && controller.shouldShowHoverAt(ctx.range)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverForeignElementAnchor"](1000, this, ctx.range, mouseEvent.event.posx, mouseEvent.event.posy, false);
            }
        }
        return null;
    }
    computeSync(anchor, lineDecorations) {
        if (this._editor.getOption(71 /* EditorOption.inlineSuggest */ ).showToolbar !== 'onHover') {
            return [];
        }
        const controller = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsController"].get(this._editor);
        if (controller && controller.shouldShowHoverAt(anchor.range)) {
            return [
                new InlineCompletionsHover(this, anchor.range, controller)
            ];
        }
        return [];
    }
    renderHoverParts(context, hoverParts) {
        const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        const part = hoverParts[0];
        this._telemetryService.publicLog2('inlineCompletionHover.shown');
        if (this.accessibilityService.isScreenReaderOptimized() && !this._editor.getOption(12 /* EditorOption.screenReaderAnnounceInlineSuggestion */ )) {
            disposables.add(this.renderScreenReaderText(context, part));
        }
        const model = part.controller.model.get();
        const widgetNode = document.createElement('div');
        context.fragment.appendChild(widgetNode);
        disposables.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorunWithStore"])((reader, store)=>{
            const w = store.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$inlineCompletionsHintsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestionHintsContentWidget"].hot.read(reader), this._editor, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null), model.selectedInlineCompletionIndex, model.inlineCompletionsCount, model.activeCommands, model.warning, ()=>{
                context.onContentsChanged();
            }));
            widgetNode.replaceChildren(w.getDomNode());
        }));
        model.triggerExplicitly();
        const renderedHoverPart = {
            hoverPart: part,
            hoverElement: widgetNode,
            dispose () {
                disposables.dispose();
            }
        };
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderedHoverParts"]([
            renderedHoverPart
        ]);
    }
    getAccessibleContent(hoverPart) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1268, 'There are inline completions here');
    }
    renderScreenReaderText(context, part) {
        const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        const $$1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"];
        const markdownHoverElement = $$1('div.hover-row.markdown-hover');
        const hoverContentsElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["append"])(markdownHoverElement, $$1('div.hover-contents', {
            ['aria-live']: 'assertive'
        }));
        const render = (code)=>{
            const inlineSuggestionAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1269, "Suggestion:");
            const renderedContents = disposables.add(this._markdownRendererService.render(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$htmlContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkdownString"]().appendText(inlineSuggestionAvailable).appendCodeblock('text', code), {
                context: this._editor,
                asyncRenderCallback: ()=>{
                    hoverContentsElement.className = 'hover-contents code-hover-contents';
                    context.onContentsChanged();
                }
            }));
            hoverContentsElement.replaceChildren(renderedContents.element);
        };
        disposables.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            /** @description update hover */ const ghostText = part.controller.model.read(reader)?.primaryGhostText.read(reader);
            if (ghostText) {
                const lineText = this._editor.getModel().getLineContent(ghostText.lineNumber);
                render(ghostText.renderForScreenReader(lineText));
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reset"])(hoverContentsElement);
            }
        }));
        context.fragment.appendChild(markdownHoverElement);
        return disposables;
    }
};
InlineCompletionsHoverParticipant = __decorate([
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAccessibilityService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$telemetry$2f$common$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITelemetryService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$markdown$2f$browser$2f$markdownRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMarkdownRendererService"])
], InlineCompletionsHoverParticipant);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/structuredLogger.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StructuredLogger",
    ()=>StructuredLogger,
    "formatRecordableLogEntry",
    ()=>formatRecordableLogEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$common$2f$dataChannel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/dataChannel/common/dataChannel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = undefined && undefined.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};
/**
 * The sourceLabel must not contain '@'!
*/ function formatRecordableLogEntry(entry) {
    // eslint-disable-next-line local/code-no-any-casts
    return entry.sourceId + ' @@ ' + JSON.stringify({
        ...entry,
        modelUri: entry.modelUri?.toString(),
        sourceId: undefined
    });
}
let StructuredLogger = class StructuredLogger extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static cast() {
        return this;
    }
    constructor(_key, _contextKeyService, _dataChannelService){
        super();
        this._key = _key;
        this._contextKeyService = _contextKeyService;
        this._dataChannelService = _dataChannelService;
        this._isEnabledContextKeyValue = observableContextKey('structuredLogger.enabled:' + this._key, this._contextKeyService).recomputeInitiallyAndOnChange(this._store);
        this.isEnabled = this._isEnabledContextKeyValue.map((v)=>v !== undefined);
    }
    log(data) {
        const enabled = this._isEnabledContextKeyValue.get();
        if (!enabled) {
            return false;
        }
        this._dataChannelService.getDataChannel('structuredLogger:' + this._key).sendData(data);
        return true;
    }
};
StructuredLogger = __decorate([
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$common$2f$dataChannel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IDataChannelService"])
], StructuredLogger);
function observableContextKey(key, contextKeyService) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(contextKeyService.onDidChangeContext, ()=>contextKeyService.getContextKeyValue(key));
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorResult",
    ()=>ErrorResult,
    "ObservableContextKeyService",
    ()=>ObservableContextKeyService,
    "convertItemsToStableObservables",
    ()=>convertItemsToStableObservables,
    "getEndPositionsAfterApplying",
    ()=>getEndPositionsAfterApplying,
    "getModifiedRangesAfterApplying",
    ()=>getModifiedRangesAfterApplying,
    "getReadonlyEmptyArray",
    ()=>getReadonlyEmptyArray,
    "removeTextReplacementCommonSuffixPrefix",
    ()=>removeTextReplacementCommonSuffixPrefix,
    "wait",
    ()=>wait
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$platformObservableUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/observable/common/platformObservableUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/getPositionOffsetTransformerFromTextModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/transaction.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const array = [];
function getReadonlyEmptyArray() {
    return array;
}
function getEndPositionsAfterApplying(edits) {
    const newRanges = getModifiedRangesAfterApplying(edits);
    return newRanges.map((range)=>range.getEndPosition());
}
function getModifiedRangesAfterApplying(edits) {
    const sortPerm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Permutation"].createSortPermutation(edits, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareBy"])((e)=>e.range, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].compareRangesUsingStarts));
    const edit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"](sortPerm.apply(edits));
    const sortedNewRanges = edit.getNewRanges();
    return sortPerm.inverse().apply(sortedNewRanges);
}
function removeTextReplacementCommonSuffixPrefix(edits, textModel) {
    const transformer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPositionOffsetTransformerFromTextModel"])(textModel);
    const text = textModel.getValue();
    const stringReplacements = edits.map((edit)=>transformer.getStringReplacement(edit));
    const minimalStringReplacements = stringReplacements.map((replacement)=>replacement.removeCommonSuffixPrefix(text));
    return minimalStringReplacements.map((replacement)=>transformer.getTextReplacement(replacement));
}
function convertItemsToStableObservables(items, store) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])('result', []);
    const innerObservables = [];
    store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
        const itemsValue = items.read(reader);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
            if (itemsValue.length !== innerObservables.length) {
                innerObservables.length = itemsValue.length;
                for(let i = 0; i < innerObservables.length; i++){
                    if (!innerObservables[i]) {
                        innerObservables[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])('item', itemsValue[i]);
                    }
                }
                result.set([
                    ...innerObservables
                ], tx);
            }
            innerObservables.forEach((o, i)=>o.set(itemsValue[i], tx));
        });
    }));
    return result;
}
class ObservableContextKeyService {
    constructor(_contextKeyService){
        this._contextKeyService = _contextKeyService;
    }
    bind(key, obs) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$platformObservableUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bindContextKey"])(key, this._contextKeyService, obs instanceof Function ? obs : (reader)=>obs.read(reader));
    }
}
function wait(ms, cancellationToken) {
    return new Promise((resolve)=>{
        let d = undefined;
        const handle = setTimeout(()=>{
            if (d) {
                d.dispose();
            }
            resolve();
        }, ms);
        if (cancellationToken) {
            d = cancellationToken.onCancellationRequested(()=>{
                clearTimeout(handle);
                if (d) {
                    d.dispose();
                }
                resolve();
            });
        }
    });
}
class ErrorResult {
    static message(message) {
        return new ErrorResult(undefined, message);
    }
    constructor(error, message = undefined){
        this.error = error;
        this.message = message;
    }
    static is(obj) {
        return obj instanceof ErrorResult;
    }
    logError() {
        if (this.message) {
            console.error(`ErrorResult: ${this.message}`, this.error);
        } else {
            console.error(`ErrorResult: An unexpected error-case occurred, usually caused by invalid input.`, this.error);
        }
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/telemetry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendInlineCompletionsEndOfLifeTelemetry",
    ()=>sendInlineCompletionsEndOfLifeTelemetry
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function sendInlineCompletionsEndOfLifeTelemetry(dataChannel, endOfLifeSummary) {
    dataChannel.publicLog2('inlineCompletion.endOfLife', endOfLifeSummary);
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/inlineCompletionsAccessibleView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionsAccessibleView",
    ()=>InlineCompletionsAccessibleView
]);
class InlineCompletionsAccessibleView {
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/inlineCompletions.contribution.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$browser$2f$accessibleViewRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/accessibility/browser/accessibleViewRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/actions/common/actions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$wrapInHotClass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/observable/common/wrapInHotClass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/editorExtensions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/hover/browser/hoverTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/inlineCompletionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$hoverParticipant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/hintsWidget/hoverParticipant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$inlineCompletionsAccessibleView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/inlineCompletionsAccessibleView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$inlineCompletionsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/inlineCompletionsService.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorContribution"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsController"].ID, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$wrapInHotClass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapInHotClass1"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsController"].hot), 3 /* EditorContributionInstantiation.Eventually */ );
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriggerInlineSuggestionAction"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShowNextInlineSuggestionAction"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShowPreviousInlineSuggestionAction"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptNextWordOfInlineCompletion"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptNextLineOfInlineCompletion"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptInlineCompletion"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptInlineCompletionAlternativeAction"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleInlineCompletionShowCollapsed"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HideInlineCompletion"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JumpToNextInlineEdit"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction2"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleAlwaysShowInlineSuggestionToolbar"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DevExtractReproSample"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction2"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$inlineCompletionsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnoozeInlineCompletion"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actions$2f$common$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction2"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$inlineCompletionsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancelSnoozeInlineCompletion"]);
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$hover$2f$browser$2f$hoverTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverParticipantRegistry"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$hoverParticipant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsHoverParticipant"]);
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$browser$2f$accessibleViewRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccessibleViewRegistry"].register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$inlineCompletionsAccessibleView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsAccessibleView"]());
}),
]);

//# sourceMappingURL=d4b1c_modules_monaco-editor_esm_vs_editor_contrib_inlineCompletions_browser_de6fa687._.js.map