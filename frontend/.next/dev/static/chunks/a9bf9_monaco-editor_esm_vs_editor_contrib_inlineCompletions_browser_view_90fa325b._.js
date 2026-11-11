(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionViewData",
    ()=>InlineCompletionViewData,
    "InlineCompletionViewKind",
    ()=>InlineCompletionViewKind,
    "InlineEditClickEvent",
    ()=>InlineEditClickEvent,
    "InlineEditTabAction",
    ()=>InlineEditTabAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$mouseEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/mouseEvent.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var InlineEditTabAction;
(function(InlineEditTabAction) {
    InlineEditTabAction["Jump"] = "jump";
    InlineEditTabAction["Accept"] = "accept";
    InlineEditTabAction["Inactive"] = "inactive";
})(InlineEditTabAction || (InlineEditTabAction = {}));
class InlineEditClickEvent {
    static create(event, alternativeAction = false) {
        return new InlineEditClickEvent(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$mouseEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMouseEvent"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(event), event), alternativeAction);
    }
    constructor(event, alternativeAction = false){
        this.event = event;
        this.alternativeAction = alternativeAction;
    }
}
// TODO: Move this out of here as it is also includes ghosttext
var InlineCompletionViewKind;
(function(InlineCompletionViewKind) {
    InlineCompletionViewKind["GhostText"] = "ghostText";
    InlineCompletionViewKind["Custom"] = "custom";
    InlineCompletionViewKind["SideBySide"] = "sideBySide";
    InlineCompletionViewKind["Deletion"] = "deletion";
    InlineCompletionViewKind["InsertionInline"] = "insertionInline";
    InlineCompletionViewKind["InsertionMultiLine"] = "insertionMultiLine";
    InlineCompletionViewKind["WordReplacements"] = "wordReplacements";
    InlineCompletionViewKind["LineReplacement"] = "lineReplacement";
    InlineCompletionViewKind["Collapsed"] = "collapsed";
    InlineCompletionViewKind["JumpTo"] = "jumpTo";
})(InlineCompletionViewKind || (InlineCompletionViewKind = {}));
class InlineCompletionViewData {
    constructor(cursorColumnDistance, cursorLineDistance, lineCountOriginal, lineCountModified, characterCountOriginal, characterCountModified, disjointReplacements, sameShapeReplacements){
        this.cursorColumnDistance = cursorColumnDistance;
        this.cursorLineDistance = cursorLineDistance;
        this.lineCountOriginal = lineCountOriginal;
        this.lineCountModified = lineCountModified;
        this.characterCountOriginal = characterCountOriginal;
        this.characterCountModified = characterCountModified;
        this.disjointReplacements = disjointReplacements;
        this.sameShapeReplacements = sameShapeReplacements;
        this.longDistanceHintVisible = undefined;
        this.longDistanceHintDistance = undefined;
        /**
         * Whether the suggestion targets a different text model (URI) than the active editor's,
         * i.e. a cross-document Next Edit Suggestion. `undefined` for inline completions / ghost text.
         */ this.isForAnotherDocument = undefined;
    }
    setLongDistanceViewData(lineNumber, inlineEditLineNumber) {
        this.longDistanceHintVisible = true;
        this.longDistanceHintDistance = Math.abs(inlineEditLineNumber - lineNumber);
    }
    getData() {
        return {
            cursorColumnDistance: this.cursorColumnDistance,
            cursorLineDistance: this.cursorLineDistance,
            lineCountOriginal: this.lineCountOriginal,
            lineCountModified: this.lineCountModified,
            characterCountOriginal: this.characterCountOriginal,
            characterCountModified: this.characterCountModified,
            disjointReplacements: this.disjointReplacements,
            sameShapeReplacements: this.sameShapeReplacements,
            longDistanceHintVisible: this.longDistanceHintVisible,
            longDistanceHintDistance: this.longDistanceHintDistance,
            isForAnotherDocument: this.isForAnotherDocument
        };
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/ghostText/ghostTextView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdditionalLinesWidget",
    ()=>AdditionalLinesWidget,
    "GhostTextView",
    ()=>GhostTextView,
    "GhostTextWidgetWarning",
    ()=>GhostTextWidgetWarning,
    "LineData",
    ()=>LineData,
    "ttPolicy",
    ()=>ttPolicy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$trustedTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/trustedTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconLabels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$config$2f$domFontInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/config/domFontInfo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$config$2f$editorOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/config/editorOptions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$stringBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/stringBuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/lineTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/viewLayout/lineDecorations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$viewLineRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/viewLayout/viewLineRenderer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/ghostText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$rangeSingleLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/rangeSingleLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$columnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/columnRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$mouseEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/mouseEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$codeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/codeEditor/codeEditorWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$tokenWithTextArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/tokenWithTextArray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/equals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignalFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableSignalFromEvent.js [app-client] (ecmascript)");
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
class GhostTextWidgetWarning {
    static from(warning) {
        if (!warning) {
            return undefined;
        }
        return new GhostTextWidgetWarning(warning.icon);
    }
    constructor(icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].warning){
        this.icon = icon;
    }
}
const GHOST_TEXT_CLASS_NAME = 'ghost-text';
let GhostTextView = class GhostTextView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _data, options, _languageService){
        super();
        this._editor = _editor;
        this._data = _data;
        this._languageService = _languageService;
        this._isDisposed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this._warningState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const model = this._data.read(reader);
            const warning = model?.warning;
            if (!model || !warning) {
                return undefined;
            }
            const gt = model.ghostText;
            return {
                lineNumber: gt.lineNumber,
                position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](gt.lineNumber, gt.parts[0].column),
                icon: warning.icon
            };
        });
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._nonWhitespaceCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const data = this._data.read(reader);
            if (!data) {
                return undefined;
            }
            const ghostText = data.ghostText;
            const allText = ghostText.parts.map((p)=>p.lines.map((l)=>l.line).join('')).join('');
            return allText.replace(/\s/g, '').length;
        });
        this._extraClassNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const extraClasses = this._extraClasses.slice();
            if (this._warningState.read(reader)) {
                extraClasses.push('warning');
            }
            const nonWhitespaceCount = this._nonWhitespaceCount.read(reader);
            if (this._highlightShortText && nonWhitespaceCount && nonWhitespaceCount < 3) {
                extraClasses.push('short-text');
            } else if (this._useSyntaxHighlighting.read(reader)) {
                extraClasses.push('syntax-highlighted');
            }
            const extraClassNames = extraClasses.map((c)=>` ${c}`).join('');
            return extraClassNames;
        });
        this._state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._isDisposed.read(reader)) {
                return undefined;
            }
            const props = this._data.read(reader);
            if (!props) {
                return undefined;
            }
            const textModel = this._editorObs.model.read(reader);
            if (!textModel) {
                return undefined;
            }
            const ghostText = props.ghostText;
            const replacedRange = ghostText instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextReplacement"] ? ghostText.columnRange : undefined;
            const syntaxHighlightingEnabled = this._useSyntaxHighlighting.read(reader);
            const extraClassNames = this._extraClassNames.read(reader);
            const { inlineTexts, additionalLines, hiddenRange, additionalLinesOriginalSuffix } = computeGhostTextViewData(ghostText, textModel, GHOST_TEXT_CLASS_NAME + extraClassNames);
            const currentLine = textModel.getLineContent(ghostText.lineNumber);
            const edit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"](inlineTexts.map((t)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"].insert(t.column - 1, t.text)));
            const tokens = syntaxHighlightingEnabled ? textModel.tokenization.tokenizeLinesAt(ghostText.lineNumber, [
                edit.apply(currentLine),
                ...additionalLines.map((l)=>l.content)
            ]) : undefined;
            const newRanges = edit.getNewRanges();
            const inlineTextsWithTokens = inlineTexts.map((t, idx)=>({
                    ...t,
                    tokens: tokens?.[0]?.getTokensInRange(newRanges[idx])
                }));
            const tokenizedAdditionalLines = additionalLines.map((l, idx)=>{
                let content = tokens?.[idx + 1] ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineTokens"].createEmpty(l.content, this._languageService.languageIdCodec);
                if (idx === additionalLines.length - 1 && additionalLinesOriginalSuffix) {
                    const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$tokenWithTextArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenWithTextArray"].fromLineTokens(textModel.tokenization.getLineTokens(additionalLinesOriginalSuffix.lineNumber));
                    const existingContent = t.slice(additionalLinesOriginalSuffix.columnRange.toZeroBasedOffsetRange());
                    content = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$tokenWithTextArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenWithTextArray"].fromLineTokens(content).append(existingContent).toLineTokens(content.languageIdCodec);
                }
                return new LineData(content, l.decorations);
            });
            const cursorColumn = this._editor.getSelection()?.getStartPosition().column;
            const disjointInlineTexts = inlineTextsWithTokens.filter((inline)=>inline.text !== '');
            const hasInsertionOnCurrentLine = disjointInlineTexts.length !== 0;
            const telemetryViewData = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewData"]((hasInsertionOnCurrentLine ? disjointInlineTexts[0].column : 1) - cursorColumn, hasInsertionOnCurrentLine ? 0 : additionalLines.findIndex((line)=>line.content !== '') + 1, hasInsertionOnCurrentLine ? 1 : 0, additionalLines.length + (hasInsertionOnCurrentLine ? 1 : 0), 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sum"])(disjointInlineTexts.map((inline)=>inline.text.length)) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sum"])(tokenizedAdditionalLines.map((line)=>line.content.getTextLength())), disjointInlineTexts.length + (additionalLines.length > 0 ? 1 : 0), disjointInlineTexts.length > 1 && tokenizedAdditionalLines.length === 0 ? disjointInlineTexts.every((inline)=>inline.text === disjointInlineTexts[0].text) : undefined);
            return {
                replacedRange,
                inlineTexts: inlineTextsWithTokens,
                additionalLines: tokenizedAdditionalLines,
                hiddenRange,
                lineNumber: ghostText.lineNumber,
                additionalReservedLineCount: this._minReservedLineCount.read(reader),
                targetTextModel: textModel,
                syntaxHighlightingEnabled,
                telemetryViewData,
                handleInlineCompletionShown: props.handleInlineCompletionShown
            };
        });
        this._decorations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const uiState = this._state.read(reader);
            if (!uiState) {
                return [];
            }
            const decorations = [];
            const extraClassNames = this._extraClassNames.read(reader);
            if (uiState.replacedRange) {
                decorations.push({
                    range: uiState.replacedRange.toRange(uiState.lineNumber),
                    options: {
                        inlineClassName: 'inline-completion-text-to-replace' + extraClassNames,
                        description: 'GhostTextReplacement'
                    }
                });
            }
            if (uiState.hiddenRange) {
                decorations.push({
                    range: uiState.hiddenRange.toRange(uiState.lineNumber),
                    options: {
                        inlineClassName: 'ghost-text-hidden',
                        description: 'ghost-text-hidden'
                    }
                });
            }
            for (const p of uiState.inlineTexts){
                let inlineExtraClassNames = '';
                if (this._highlightShortText && p.text.length < 5) {
                    inlineExtraClassNames += ' short-text';
                }
                decorations.push({
                    range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](uiState.lineNumber, p.column)),
                    options: {
                        description: 'ghost-text-decoration',
                        after: {
                            content: p.text,
                            tokens: p.tokens,
                            inlineClassName: (p.preview ? 'ghost-text-decoration-preview' : 'ghost-text-decoration') + (this._isClickable ? ' clickable' : '') + extraClassNames + inlineExtraClassNames + p.lineDecorations.map((d)=>' ' + d.className).join(' '),
                            cursorStops: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InjectedTextCursorStops"].Left,
                            attachedData: new GhostTextAttachedData(this)
                        },
                        showIfCollapsed: true
                    }
                });
            }
            return decorations;
        });
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._isDisposed.read(reader)) {
                return false;
            }
            return this._isInlineTextHovered.read(reader) || this._additionalLinesWidget.isHovered.read(reader);
        });
        this._extraClasses = options.extraClasses ?? [];
        this._isClickable = options.isClickable ?? false;
        this._shouldKeepCursorStable = options.shouldKeepCursorStable ?? false;
        this._minReservedLineCount = options.minReservedLineCount ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0);
        this._useSyntaxHighlighting = options.useSyntaxHighlighting ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(true);
        this._highlightShortText = options.highlightShortSuggestions ?? false;
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._additionalLinesWidget = this._register(new AdditionalLinesWidget(this._editor, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalsIfDefinedC"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thisEqualsC"])())
        }, (reader)=>{
            /** @description lines */ const uiState = this._state.read(reader);
            return uiState ? new AdditionalLinesData(uiState.lineNumber, uiState.additionalLines, uiState.additionalReservedLineCount) : undefined;
        }), this._shouldKeepCursorStable, this._isClickable));
        this._isInlineTextHovered = this._editorObs.isTargetHovered((p)=>p.target.type === 6 /* MouseTargetType.CONTENT_TEXT */  && p.target.detail.injectedText?.options.attachedData instanceof GhostTextAttachedData && p.target.detail.injectedText.options.attachedData.owner === this, this._store);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>{
            this._isDisposed.set(true, undefined);
        }));
        this._register(this._editorObs.setDecorations(this._decorations));
        if (this._isClickable) {
            this._register(this._additionalLinesWidget.onDidClick((e)=>this._onDidClick.fire(e)));
            this._register(this._editor.onMouseUp((e)=>{
                if (e.target.type !== 6 /* MouseTargetType.CONTENT_TEXT */ ) {
                    return;
                }
                const a = e.target.detail.injectedText?.options.attachedData;
                if (a instanceof GhostTextAttachedData && a.owner === this) {
                    this._onDidClick.fire(e.event);
                }
            }));
        }
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const state = this._state.read(reader);
            state?.handleInlineCompletionShown(state.telemetryViewData);
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorunWithStore"])((reader, store)=>{
            {
                return;
            }
        }));
    }
    static getWarningWidgetContext(domNode) {
        // eslint-disable-next-line local/code-no-any-casts
        const data = domNode.ghostTextViewWarningWidgetData;
        if (data) {
            return data;
        } else if (domNode.parentElement) {
            return this.getWarningWidgetContext(domNode.parentElement);
        }
        return undefined;
    }
    ownsViewZone(viewZoneId) {
        return this._additionalLinesWidget.viewZoneId === viewZoneId;
    }
};
GhostTextView = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"])
], GhostTextView);
class GhostTextAttachedData {
    constructor(owner){
        this.owner = owner;
    }
}
function computeGhostTextViewData(ghostText, textModel, ghostTextClassName) {
    const inlineTexts = [];
    const additionalLines = [];
    function addToAdditionalLines(ghLines, className) {
        if (additionalLines.length > 0) {
            const lastLine = additionalLines[additionalLines.length - 1];
            if (className) {
                lastLine.decorations.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineDecoration"](lastLine.content.length + 1, lastLine.content.length + 1 + ghLines[0].line.length, className, 0 /* InlineDecorationType.Regular */ ));
            }
            lastLine.content += ghLines[0].line;
            ghLines = ghLines.slice(1);
        }
        for (const ghLine of ghLines){
            additionalLines.push({
                content: ghLine.line,
                decorations: className ? [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineDecoration"](1, ghLine.line.length + 1, className, 0 /* InlineDecorationType.Regular */ ),
                    ...ghLine.lineDecorations
                ] : [
                    ...ghLine.lineDecorations
                ]
            });
        }
    }
    const textBufferLine = textModel.getLineContent(ghostText.lineNumber);
    let hiddenTextStartColumn = undefined;
    let lastIdx = 0;
    for (const part of ghostText.parts){
        let ghLines = part.lines;
        if (hiddenTextStartColumn === undefined) {
            inlineTexts.push({
                column: part.column,
                text: ghLines[0].line,
                preview: part.preview,
                lineDecorations: ghLines[0].lineDecorations
            });
            ghLines = ghLines.slice(1);
        } else {
            addToAdditionalLines([
                {
                    line: textBufferLine.substring(lastIdx, part.column - 1),
                    lineDecorations: []
                }
            ], undefined);
        }
        if (ghLines.length > 0) {
            addToAdditionalLines(ghLines, ghostTextClassName);
            if (hiddenTextStartColumn === undefined && part.column <= textBufferLine.length) {
                hiddenTextStartColumn = part.column;
            }
        }
        lastIdx = part.column - 1;
    }
    let additionalLinesOriginalSuffix = undefined;
    if (hiddenTextStartColumn !== undefined) {
        additionalLinesOriginalSuffix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$rangeSingleLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RangeSingleLine"](ghostText.lineNumber, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$columnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColumnRange"](lastIdx + 1, textBufferLine.length + 1));
    }
    const hiddenRange = hiddenTextStartColumn !== undefined ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$columnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColumnRange"](hiddenTextStartColumn, textBufferLine.length + 1) : undefined;
    return {
        inlineTexts,
        additionalLines,
        hiddenRange,
        additionalLinesOriginalSuffix
    };
}
class AdditionalLinesData {
    constructor(lineNumber, additionalLines, minReservedLineCount){
        this.lineNumber = lineNumber;
        this.additionalLines = additionalLines;
        this.minReservedLineCount = minReservedLineCount;
    }
    equals(other) {
        if (this.lineNumber !== other.lineNumber) {
            return false;
        }
        if (this.minReservedLineCount !== other.minReservedLineCount) {
            return false;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(this.additionalLines, other.additionalLines, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thisEqualsC"])());
    }
}
class AdditionalLinesWidget extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    get viewZoneId() {
        return this._viewZoneInfo?.viewZoneId;
    }
    constructor(_editor, _lines, _shouldKeepCursorStable, _isClickable){
        super();
        this._editor = _editor;
        this._lines = _lines;
        this._shouldKeepCursorStable = _shouldKeepCursorStable;
        this._isClickable = _isClickable;
        this._viewZoneHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])('viewZoneHeight', undefined);
        this.editorOptionsChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignalFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignalFromEvent"])('editorOptionChanged', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].filter(this._editor.onDidChangeConfiguration, (e)=>e.hasChanged(40 /* EditorOption.disableMonospaceOptimizations */ ) || e.hasChanged(133 /* EditorOption.stopRenderingLineAfter */ ) || e.hasChanged(113 /* EditorOption.renderWhitespace */ ) || e.hasChanged(108 /* EditorOption.renderControlCharacters */ ) || e.hasChanged(60 /* EditorOption.fontLigatures */ ) || e.hasChanged(59 /* EditorOption.fontInfo */ ) || e.hasChanged(75 /* EditorOption.lineHeight */ ) || e.hasChanged(176 /* EditorOption.effectiveFullwidthCharacterWidth */ )));
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._viewZoneListener = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutableDisposable"]());
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor).isTargetHovered((p)=>isTargetGhostText(p.target.element), this._store);
        this.hasBeenAccepted = false;
        if (this._editor instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$codeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeEditorWidget"] && this._shouldKeepCursorStable) {
            this._register(this._editor.onBeforeExecuteEdit((e)=>this.hasBeenAccepted = e.source === 'inlineCompletionAccept'));
        }
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            /** @description update view zone */ const lines = this._lines.read(reader);
            this.editorOptionsChanged.read(reader);
            if (lines) {
                this.hasBeenAccepted = false;
                this.updateLines(lines.lineNumber, lines.additionalLines, lines.minReservedLineCount);
            } else {
                this.clear();
            }
        }));
    }
    dispose() {
        super.dispose();
        this.clear();
    }
    clear() {
        this._viewZoneListener.clear();
        this._editor.changeViewZones((changeAccessor)=>{
            this.removeActiveViewZone(changeAccessor);
        });
    }
    updateLines(lineNumber, additionalLines, minReservedLineCount) {
        const textModel = this._editor.getModel();
        if (!textModel) {
            return;
        }
        const { tabSize } = textModel.getOptions();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor).transaction((_)=>{
            this._editor.changeViewZones((changeAccessor)=>{
                const store = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
                this.removeActiveViewZone(changeAccessor);
                const heightInLines = Math.max(additionalLines.length, minReservedLineCount);
                if (heightInLines > 0) {
                    const domNode = document.createElement('div');
                    renderLines(domNode, tabSize, additionalLines, this._editor.getOptions(), this._isClickable);
                    if (this._isClickable) {
                        store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDisposableListener"])(domNode, 'mousedown', (e)=>{
                            e.preventDefault(); // This prevents that the editor loses focus
                        }));
                        store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDisposableListener"])(domNode, 'click', (e)=>{
                            if (isTargetGhostText(e.target)) {
                                this._onDidClick.fire(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$mouseEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMouseEvent"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(e), e));
                            }
                        }));
                    }
                    this.addViewZone(changeAccessor, lineNumber, heightInLines, domNode);
                }
                this._viewZoneListener.value = store;
            });
        });
    }
    addViewZone(changeAccessor, afterLineNumber, heightInLines, domNode) {
        const id = changeAccessor.addZone({
            afterLineNumber: afterLineNumber,
            heightInLines: heightInLines,
            domNode,
            afterColumnAffinity: 1 /* PositionAffinity.Right */ ,
            onComputedHeight: (height)=>{
                this._viewZoneHeight.set(height, undefined); // TODO: can a transaction be used to avoid flickering?
            }
        });
        this.keepCursorStable(afterLineNumber, heightInLines);
        this._viewZoneInfo = {
            viewZoneId: id,
            heightInLines,
            lineNumber: afterLineNumber
        };
    }
    removeActiveViewZone(changeAccessor) {
        if (this._viewZoneInfo) {
            changeAccessor.removeZone(this._viewZoneInfo.viewZoneId);
            if (!this.hasBeenAccepted) {
                this.keepCursorStable(this._viewZoneInfo.lineNumber, -this._viewZoneInfo.heightInLines);
            }
            this._viewZoneInfo = undefined;
            this._viewZoneHeight.set(undefined, undefined);
        }
    }
    keepCursorStable(lineNumber, heightInLines) {
        if (!this._shouldKeepCursorStable) {
            return;
        }
        const cursorLineNumber = this._editor.getSelection()?.getStartPosition()?.lineNumber;
        if (cursorLineNumber !== undefined && lineNumber < cursorLineNumber) {
            this._editor.setScrollTop(this._editor.getScrollTop() + heightInLines * this._editor.getOption(75 /* EditorOption.lineHeight */ ));
        }
    }
}
function isTargetGhostText(target) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(target) && target.classList.contains(GHOST_TEXT_CLASS_NAME);
}
class LineData {
    constructor(content, decorations){
        this.content = content;
        this.decorations = decorations;
    }
    equals(other) {
        if (!this.content.equals(other.content)) {
            return false;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineDecoration"].equalsArr(this.decorations, other.decorations);
    }
}
function renderLines(domNode, tabSize, lines, opts, isClickable) {
    const disableMonospaceOptimizations = opts.get(40 /* EditorOption.disableMonospaceOptimizations */ );
    const stopRenderingLineAfter = opts.get(133 /* EditorOption.stopRenderingLineAfter */ );
    // To avoid visual confusion, we don't want to render visible whitespace
    const renderWhitespace = 'none';
    const renderControlCharacters = opts.get(108 /* EditorOption.renderControlCharacters */ );
    const fontLigatures = opts.get(60 /* EditorOption.fontLigatures */ );
    const fontInfo = opts.get(59 /* EditorOption.fontInfo */ );
    const lineHeight = opts.get(75 /* EditorOption.lineHeight */ );
    const useTwoCellFullwidthCharacters = opts.get(176 /* EditorOption.effectiveFullwidthCharacterWidth */ ) === 'twoCells';
    let classNames = 'suggest-preview-text';
    if (isClickable) {
        classNames += ' clickable';
    }
    const sb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$stringBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringBuilder"](10000);
    sb.appendString(`<div class="${classNames}">`);
    for(let i = 0, len = lines.length; i < len; i++){
        const lineData = lines[i];
        const lineTokens = lineData.content;
        sb.appendString('<div class="view-line');
        sb.appendString('" style="top:');
        sb.appendString(String(i * lineHeight));
        sb.appendString('px;width:1000000px;">');
        const line = lineTokens.getLineContent();
        const isBasicASCII$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBasicASCII"])(line);
        const containsRTL$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containsRTL"])(line);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$viewLineRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderViewLine"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$viewLineRenderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderLineInput"](fontInfo.isMonospace && !disableMonospaceOptimizations, fontInfo.canUseHalfwidthRightwardsArrow, line, false, isBasicASCII$1, containsRTL$1, 0, lineTokens, lineData.decorations.slice(), tabSize, 0, fontInfo.spaceWidth, fontInfo.middotWidth, fontInfo.wsmiddotWidth, stopRenderingLineAfter, renderWhitespace, renderControlCharacters, fontLigatures !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$config$2f$editorOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorFontLigatures"].OFF, null, null, 0, false, useTwoCellFullwidthCharacters), sb);
        sb.appendString('</div>');
    }
    sb.appendString('</div>');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$config$2f$domFontInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyFontInfo"])(domNode, fontInfo);
    const html = sb.build();
    const trustedhtml = ttPolicy ? ttPolicy.createHTML(html) : html;
    domNode.innerHTML = trustedhtml;
}
const ttPolicy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$trustedTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTrustedTypesPolicy"])('editorGhostText', {
    createHTML: (value)=>value
});
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INLINE_EDITS_BORDER_RADIUS",
    ()=>INLINE_EDITS_BORDER_RADIUS,
    "getEditorBackgroundColor",
    ()=>getEditorBackgroundColor,
    "getEditorBlendedColor",
    ()=>getEditorBlendedColor,
    "getModifiedBorderColor",
    ()=>getModifiedBorderColor,
    "getOriginalBorderColor",
    ()=>getOriginalBorderColor,
    "inlineEditIndicatorBackground",
    ()=>inlineEditIndicatorBackground,
    "inlineEditIndicatorPrimaryBackground",
    ()=>inlineEditIndicatorPrimaryBackground,
    "inlineEditIndicatorPrimaryBorder",
    ()=>inlineEditIndicatorPrimaryBorder,
    "inlineEditIndicatorPrimaryForeground",
    ()=>inlineEditIndicatorPrimaryForeground,
    "inlineEditIndicatorSecondaryBackground",
    ()=>inlineEditIndicatorSecondaryBackground,
    "inlineEditIndicatorSecondaryBorder",
    ()=>inlineEditIndicatorSecondaryBorder,
    "inlineEditIndicatorSecondaryForeground",
    ()=>inlineEditIndicatorSecondaryForeground,
    "inlineEditIndicatorSuccessfulBackground",
    ()=>inlineEditIndicatorSuccessfulBackground,
    "inlineEditIndicatorSuccessfulBorder",
    ()=>inlineEditIndicatorSuccessfulBorder,
    "inlineEditIndicatorSuccessfulForeground",
    ()=>inlineEditIndicatorSuccessfulForeground,
    "modifiedBackgroundColor",
    ()=>modifiedBackgroundColor,
    "modifiedChangedLineBackgroundColor",
    ()=>modifiedChangedLineBackgroundColor,
    "modifiedChangedTextOverlayColor",
    ()=>modifiedChangedTextOverlayColor,
    "observeColor",
    ()=>observeColor,
    "originalBackgroundColor",
    ()=>originalBackgroundColor,
    "originalChangedTextOverlayColor",
    ()=>originalChangedTextOverlayColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/baseColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$chartsColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/chartsColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/editorColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/inputColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/listColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$menuColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/menuColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$minimapColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/minimapColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/miscColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$quickpickColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/quickpickColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$searchColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/searchColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ const originalBackgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.originalBackground', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"], 0.2), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1286, 'Background color for the original text in inline edits.'), true);
const modifiedBackgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.modifiedBackground', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"], 0.3), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1287, 'Background color for the modified text in inline edits.'), true);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.originalChangedLineBackground', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"], 0.8), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1288, 'Background color for the changed lines in the original text of inline edits.'), true);
const originalChangedTextOverlayColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.originalChangedTextBackground', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"], 0.8), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1289, 'Overlay color for the changed text in the original text of inline edits.'), true);
const modifiedChangedLineBackgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.modifiedChangedLineBackground', {
    light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInsertedLine"], 0.7),
    dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInsertedLine"], 0.7),
    hcDark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInsertedLine"],
    hcLight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInsertedLine"]
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1290, 'Background color for the changed lines in the modified text of inline edits.'), true);
const modifiedChangedTextOverlayColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.modifiedChangedTextBackground', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"], 0.7), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1291, 'Overlay color for the changed text in the modified text of inline edits.'), true);
// ------- GUTTER INDICATOR -------
const inlineEditIndicatorPrimaryForeground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.primaryForeground', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonForeground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1292, 'Foreground color for the primary inline edit gutter indicator.'));
const inlineEditIndicatorPrimaryBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.primaryBorder', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonBackground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1293, 'Border color for the primary inline edit gutter indicator.'));
const inlineEditIndicatorPrimaryBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.primaryBackground', {
    light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(inlineEditIndicatorPrimaryBorder, 0.5),
    dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(inlineEditIndicatorPrimaryBorder, 0.4),
    hcDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(inlineEditIndicatorPrimaryBorder, 0.4),
    hcLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])(inlineEditIndicatorPrimaryBorder, 0.5)
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1294, 'Background color for the primary inline edit gutter indicator.'));
const inlineEditIndicatorSecondaryForeground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.secondaryForeground', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverForeground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1295, 'Foreground color for the secondary inline edit gutter indicator.'));
const inlineEditIndicatorSecondaryBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.secondaryBorder', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverBorder"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1296, 'Border color for the secondary inline edit gutter indicator.'));
const inlineEditIndicatorSecondaryBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.secondaryBackground', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverBackground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1297, 'Background color for the secondary inline edit gutter indicator.'));
const inlineEditIndicatorSuccessfulForeground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.successfulForeground', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonForeground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1298, 'Foreground color for the successful inline edit gutter indicator.'));
const inlineEditIndicatorSuccessfulBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.successfulBorder', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonBackground"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1299, 'Border color for the successful inline edit gutter indicator.'));
const inlineEditIndicatorSuccessfulBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.successfulBackground', inlineEditIndicatorSuccessfulBorder, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1300, 'Background color for the successful inline edit gutter indicator.'));
const inlineEditIndicatorBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.gutterIndicator.background', {
    hcDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])('tab.inactiveBackground', 0.5),
    hcLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])('tab.inactiveBackground', 0.5),
    dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transparent"])('tab.inactiveBackground', 0.5),
    light: '#5f5f5f18'
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1301, 'Background color for the inline edit gutter indicator.'));
// ------- BORDER COLORS -------
const originalBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.originalBorder', {
    light: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"],
    dark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"],
    hcDark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"],
    hcLight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffRemoved"]
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1302, 'Border color for the original text in inline edits.'));
const modifiedBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.modifiedBorder', {
    light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"], 0.6),
    dark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"],
    hcDark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"],
    hcLight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffInserted"]
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1303, 'Border color for the modified text in inline edits.'));
const tabWillAcceptModifiedBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.tabWillAcceptModifiedBorder', {
    light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(modifiedBorder, 0),
    dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(modifiedBorder, 0),
    hcDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(modifiedBorder, 0),
    hcLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(modifiedBorder, 0)
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1304, 'Modified border color for the inline edits widget when tab will accept it.'));
const tabWillAcceptOriginalBorder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerColor"])('inlineEdit.tabWillAcceptOriginalBorder', {
    light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(originalBorder, 0),
    dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(originalBorder, 0),
    hcDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(originalBorder, 0),
    hcLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darken"])(originalBorder, 0)
}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1305, 'Original border color for the inline edits widget over the original text when tab will accept it.'));
function getModifiedBorderColor(tabAction) {
    return tabAction.map((a)=>a === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept ? tabWillAcceptModifiedBorder : modifiedBorder);
}
function getOriginalBorderColor(tabAction) {
    return tabAction.map((a)=>a === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept ? tabWillAcceptOriginalBorder : originalBorder);
}
function getEditorBlendedColor(colorIdentifier, themeService) {
    let color;
    if (typeof colorIdentifier === 'string') {
        color = observeColor(colorIdentifier, themeService);
    } else {
        color = colorIdentifier.map((identifier, reader)=>observeColor(identifier, themeService).read(reader));
    }
    const backgroundColor = observeColor(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorBackground"], themeService);
    return color.map((c, reader)=>/** @description makeOpaque */ c.makeOpaque(backgroundColor.read(reader)));
}
function getEditorBackgroundColor(editorType) {
    let color;
    switch(editorType){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor:
            color = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorBackground"];
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor:
            color = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorBackground"];
            break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].Notebook:
            color = 'notebook.cellEditorBackground';
            break;
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertNever"])(editorType, 'Not supported editor type yet');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(color);
}
function observeColor(colorIdentifier, themeService) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEventOpts"])({
        owner: {
            observeColor: colorIdentifier
        },
        equalsFn: (a, b)=>a.equals(b),
        debugName: ()=>`observeColor(${colorIdentifier})`
    }, themeService.onDidColorThemeChange, ()=>{
        const color = themeService.getColorTheme().getColor(colorIdentifier);
        if (!color) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"](`Missing color: ${colorIdentifier}`);
        }
        return color;
    });
}
// Styles
const INLINE_EDITS_BORDER_RADIUS = 3; // also used in CSS file
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PathBuilder",
    ()=>PathBuilder,
    "applyEditToModifiedRangeMappings",
    ()=>applyEditToModifiedRangeMappings,
    "classNames",
    ()=>classNames,
    "createReindentEdit",
    ()=>createReindentEdit,
    "getContentRenderWidth",
    ()=>getContentRenderWidth,
    "getContentSizeOfLines",
    ()=>getContentSizeOfLines,
    "getEditorValidOverlayRect",
    ()=>getEditorValidOverlayRect,
    "getOffsetForPos",
    ()=>getOffsetForPos,
    "getPrefixTrim",
    ()=>getPrefixTrim,
    "mapOutFalsy",
    ()=>mapOutFalsy,
    "maxContentWidthInRange",
    ()=>maxContentWidthInRange,
    "observeEditorBoundingClientRect",
    ()=>observeEditorBoundingClientRect,
    "rectToProps",
    ()=>rectToProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arraysFind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/diff/rangeMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$debugLocation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/debugLocation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignalFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableSignalFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
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
/**
 * Warning: might return 0.
*/ function maxContentWidthInRange(editor, range, reader) {
    const model = editor.model.read(reader);
    if (!model) {
        return 0;
    }
    let maxContentWidth = 0;
    for(let i = range.startLineNumber; i < range.endLineNumberExclusive; i++){
        const lineContentWidth = editor.getWidthOfLine(i, reader);
        maxContentWidth = Math.max(maxContentWidth, lineContentWidth);
    }
    const lines = range.mapToLineArray((l)=>model.getLineContent(l));
    if (maxContentWidth < 5 && lines.some((l)=>l.length > 0) && model.uri.scheme !== 'file') {
        console.log('unexpected width');
    }
    return maxContentWidth;
}
function getContentSizeOfLines(editor, range, reader) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignalFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignalFromEvent"])(editor, editor.editor.onDidChangeLineHeight).read(reader);
    const model = editor.model.read(reader);
    if (!model) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Model is required');
    }
    const sizes = [];
    for(let i = range.startLineNumber; i < range.endLineNumberExclusive; i++){
        let lineContentWidth = editor.getWidthOfLine(i, reader);
        if (lineContentWidth === -1) {
            // approximation
            const column = model.getLineMaxColumn(i);
            const typicalHalfwidthCharacterWidth = editor.editor.getOption(59 /* EditorOption.fontInfo */ ).typicalHalfwidthCharacterWidth;
            const approximation = column * typicalHalfwidthCharacterWidth;
            lineContentWidth = approximation;
        }
        const height = editor.editor.getLineHeightForPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](i, 1));
        sizes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size2D"](lineContentWidth, height));
    }
    return sizes;
}
function getOffsetForPos(editor, pos, reader) {
    editor.layoutInfo.read(reader);
    editor.value.read(reader);
    const model = editor.model.read(reader);
    if (!model) {
        return 0;
    }
    editor.scrollTop.read(reader);
    const lineContentWidth = editor.editor.getOffsetForColumn(pos.lineNumber, pos.column);
    return lineContentWidth;
}
function getPrefixTrim(diffRanges, originalLinesRange, modifiedLines, editor, reader = undefined) {
    const textModel = editor.getModel();
    if (!textModel) {
        return {
            prefixTrim: 0,
            prefixLeftOffset: 0
        };
    }
    const replacementStart = diffRanges.map((r)=>r.isSingleLine() ? r.startColumn - 1 : 0);
    const originalIndents = originalLinesRange.mapToLineArray((line)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["indentOfLine"])(textModel.getLineContent(line)));
    const modifiedIndents = modifiedLines.filter((line)=>line !== '').map((line)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["indentOfLine"])(line));
    const prefixTrim = Math.min(...replacementStart, ...originalIndents, ...modifiedIndents);
    let prefixLeftOffset;
    const startLineIndent = textModel.getLineIndentColumn(originalLinesRange.startLineNumber);
    if (startLineIndent >= prefixTrim + 1) {
        // We can use the editor to get the offset
        // TODO go through other usages of getOffsetForColumn and come up with a robust reactive solution to read it
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(editor).scrollTop.read(reader); // getOffsetForColumn requires the line number to be visible. This might change on scroll top.
        prefixLeftOffset = editor.getOffsetForColumn(originalLinesRange.startLineNumber, prefixTrim + 1);
    } else if (modifiedLines.length > 0) {
        // Content is not in the editor, we can use the content width to calculate the offset
        prefixLeftOffset = getContentRenderWidth(modifiedLines[0].slice(0, prefixTrim), editor, textModel);
    } else {
        // unable to approximate the offset
        return {
            prefixTrim: 0,
            prefixLeftOffset: 0
        };
    }
    return {
        prefixTrim,
        prefixLeftOffset
    };
}
function getContentRenderWidth(content, editor, textModel) {
    const w = editor.getOption(59 /* EditorOption.fontInfo */ ).typicalHalfwidthCharacterWidth;
    const tabSize = textModel.getOptions().tabSize * w;
    const numTabs = content.split('\t').length - 1;
    const numNoneTabs = content.length - numTabs;
    return numNoneTabs * w + numTabs * tabSize;
}
function getEditorValidOverlayRect(editor) {
    const contentLeft = editor.layoutInfoContentLeft;
    const width = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        name: 'editor.validOverlay.width'
    }, (r)=>{
        const hasMinimapOnTheRight = editor.layoutInfoMinimap.read(r).minimapLeft !== 0;
        const editorWidth = Math.max(0, editor.layoutInfoWidth.read(r) - contentLeft.read(r));
        if (hasMinimapOnTheRight) {
            const minimapAndScrollbarWidth = editor.layoutInfoMinimap.read(r).minimapWidth + editor.layoutInfoVerticalScrollbarWidth.read(r);
            return Math.max(0, editorWidth - minimapAndScrollbarWidth);
        }
        return editorWidth;
    });
    const height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        name: 'editor.validOverlay.height'
    }, (r)=>editor.layoutInfoHeight.read(r) + editor.contentHeight.read(r));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        name: 'editor.validOverlay'
    }, (r)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(contentLeft.read(r), 0, width.read(r), height.read(r)));
}
function applyEditToModifiedRangeMappings(rangeMapping, edit) {
    const updatedMappings = [];
    for (const m of rangeMapping){
        const updatedRange = edit.mapRange(m.modifiedRange);
        updatedMappings.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RangeMapping"](m.originalRange, updatedRange));
    }
    return updatedMappings;
}
function classNames(...classes) {
    return classes.filter((c)=>typeof c === 'string').join(' ');
}
function offsetRangeToRange(columnOffsetRange, startPos) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](startPos.lineNumber, startPos.column + columnOffsetRange.start, startPos.lineNumber, startPos.column + columnOffsetRange.endExclusive);
}
/**
 * Calculates the indentation size (in spaces) of a given line,
 * interpreting tabs as the specified tab size.
 */ function getIndentationSize(line, tabSize) {
    let currentSize = 0;
    loop: for(let i = 0, len = line.length; i < len; i++){
        switch(line.charCodeAt(i)){
            case 9 /* CharCode.Tab */ :
                currentSize += tabSize;
                break;
            case 32 /* CharCode.Space */ :
                currentSize++;
                break;
            default:
                break loop;
        }
    }
    // if currentSize % tabSize !== 0,
    // then there are spaces which are not part of the indentation
    return currentSize - currentSize % tabSize;
}
/**
 * Calculates the number of characters at the start of a line that correspond to a given indentation size,
 * taking into account both tabs and spaces.
 */ function indentSizeToIndentLength(line, indentSize, tabSize) {
    let remainingSize = indentSize - indentSize % tabSize;
    let i = 0;
    for(; i < line.length; i++){
        if (remainingSize === 0) {
            break;
        }
        switch(line.charCodeAt(i)){
            case 9 /* CharCode.Tab */ :
                remainingSize -= tabSize;
                break;
            case 32 /* CharCode.Space */ :
                remainingSize--;
                break;
            default:
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Unexpected character found while calculating indent length');
        }
    }
    return i;
}
function createReindentEdit(text, range, tabSize) {
    const newLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitLines"])(text);
    const edits = [];
    const minIndentSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findFirstMin"])(range.mapToLineArray((l)=>getIndentationSize(newLines[l - 1], tabSize)), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberComparator"]);
    range.forEach((lineNumber)=>{
        const indentLength = indentSizeToIndentLength(newLines[lineNumber - 1], minIndentSize, tabSize);
        edits.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](offsetRangeToRange(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](0, indentLength), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](lineNumber, 1)), ''));
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"](edits);
}
class PathBuilder {
    constructor(){
        this._data = '';
    }
    moveTo(point) {
        this._data += `M ${point.x} ${point.y} `;
        return this;
    }
    lineTo(point) {
        this._data += `L ${point.x} ${point.y} `;
        return this;
    }
    build() {
        return this._data;
    }
}
function mapOutFalsy(obs) {
    const nonUndefinedObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(undefined, (reader, lastValue)=>obs.read(reader) || lastValue);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
        debugName: ()=>`${obs.debugName}.mapOutFalsy`
    }, (reader)=>{
        nonUndefinedObs.read(reader);
        const val = obs.read(reader);
        if (!val) {
            return undefined;
        }
        return nonUndefinedObs;
    });
}
function rectToProps(fn, debugLocation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$debugLocation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebugLocation"].ofCaller()) {
    return {
        left: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
            name: 'editor.validOverlay.left'
        }, (reader)=>/** @description left */ fn(reader)?.left, debugLocation),
        top: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
            name: 'editor.validOverlay.top'
        }, (reader)=>/** @description top */ fn(reader)?.top, debugLocation),
        width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
            name: 'editor.validOverlay.width'
        }, (reader)=>{
            /** @description width */ const val = fn(reader);
            if (!val) {
                return undefined;
            }
            return val.width;
        }, debugLocation),
        height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
            name: 'editor.validOverlay.height'
        }, (reader)=>{
            /** @description height */ const val = fn(reader);
            if (!val) {
                return undefined;
            }
            return val.height;
        }, debugLocation)
    };
}
function observeEditorBoundingClientRect(editor, store) {
    const dom = editor.getContainerDomNode();
    const initialDomRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])('domRect', dom.getBoundingClientRect());
    store.add(editor.onDidLayoutChange((e)=>{
        initialDomRect.set(dom.getBoundingClientRect(), undefined);
    }));
    return initialDomRect;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorMenu.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GutterIndicatorMenuContent",
    ()=>GutterIndicatorMenuContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$actionbar$2f$actionbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconLabels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/themables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/commands/common/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/hover/browser/hover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$browser$2f$defaultStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/browser/defaultStyles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/baseColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$chartsColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/chartsColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/editorColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/inputColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/listColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$menuColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/menuColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$minimapColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/minimapColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/miscColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$quickpickColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/quickpickColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$searchColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/searchColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
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
let GutterIndicatorMenuContent = class GutterIndicatorMenuContent {
    constructor(_editorObs, _data, _close, _contextKeyService, _keybindingService, _commandService){
        this._editorObs = _editorObs;
        this._data = _data;
        this._close = _close;
        this._contextKeyService = _contextKeyService;
        this._keybindingService = _keybindingService;
        this._commandService = _commandService;
        this._inlineEditsShowCollapsed = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map((s)=>s.edits.showCollapsed);
    }
    toDisposableLiveElement() {
        return this._createHoverContent().toDisposableLiveElement();
    }
    _createHoverContent() {
        const activeElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])('active', undefined);
        const createOptionArgs = (options)=>{
            return {
                title: options.title,
                icon: options.icon,
                keybinding: typeof options.commandId === 'string' ? this._getKeybinding(options.commandArgs ? undefined : options.commandId) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>typeof options.commandId === 'string' ? undefined : this._getKeybinding(options.commandArgs ? undefined : options.commandId.read(reader)).read(reader)),
                isActive: activeElement.map((v)=>v === options.id),
                onHoverChange: (v)=>activeElement.set(v ? options.id : undefined, undefined),
                onAction: ()=>{
                    const commandId = typeof options.commandId === 'string' ? options.commandId : options.commandId.get();
                    this._close(true, commandId);
                    return this._commandService.executeCommand(commandId, ...options.commandArgs ?? []);
                }
            };
        };
        const extensionCommandGroups = this._data.extensionCommands.map((group)=>group.map((c, idx)=>option(createOptionArgs({
                    id: c.command.id + '_' + idx,
                    title: c.command.title,
                    icon: c.icon ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].symbolEvent,
                    commandId: c.command.id,
                    commandArgs: c.command.arguments
                }))));
        const extensionCommandNodes = [];
        for (const group of extensionCommandGroups){
            if (group.length > 0) {
                extensionCommandNodes.push(separator());
                extensionCommandNodes.push(...group);
            }
        }
        if (this._data.extensionCommandsOnly) {
            // drop leading separator
            return hoverContent(extensionCommandNodes.slice(1));
        }
        const title = header(this._data.displayName);
        const gotoAndAccept = option(createOptionArgs({
            id: 'gotoAndAccept',
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1276, "Go To / Accept"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].check,
            commandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineSuggestCommitId"]
        }));
        const reject = option(createOptionArgs({
            id: 'reject',
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1277, "Reject"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].close,
            commandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hideInlineCompletionId"]
        }));
        const alternativeCommand = this._data.alternativeAction ? option(createOptionArgs({
            id: 'alternativeCommand',
            title: this._data.alternativeAction.command.title,
            icon: this._data.alternativeAction.icon,
            commandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineSuggestCommitAlternativeActionId"]
        })) : undefined;
        const modelOptions = [];
        const toggleCollapsedMode = this._inlineEditsShowCollapsed.map((showCollapsed)=>showCollapsed ? option(createOptionArgs({
                id: 'showExpanded',
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1278, "Show Expanded"),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].expandAll,
                commandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleShowCollapsedId"]
            })) : option(createOptionArgs({
                id: 'showCollapsed',
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1279, "Show Collapsed"),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].collapseAll,
                commandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleShowCollapsedId"]
            })));
        const snooze = option(createOptionArgs({
            id: 'snooze',
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1280, "Snooze"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].bellSlash,
            commandId: 'editor.action.inlineSuggest.snooze'
        }));
        const settings = option(createOptionArgs({
            id: 'settings',
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1281, "Settings"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].gear,
            commandId: 'workbench.action.openSettings',
            commandArgs: [
                '@tag:nextEditSuggestions'
            ]
        }));
        const actions = this._data.action ? [
            this._data.action
        ] : [];
        const actionBarFooter = actions.length > 0 ? actionBar(actions.map((action)=>({
                id: action.id,
                label: action.title + '...',
                enabled: true,
                run: ()=>this._commandService.executeCommand(action.id, ...action.arguments ?? []),
                class: undefined,
                tooltip: action.tooltip ?? action.title
            })), {
            hoverDelegate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nativeHoverDelegate"] /* unable to show hover inside another hover */ 
        }) : undefined;
        return hoverContent([
            title,
            gotoAndAccept,
            alternativeCommand,
            reject,
            toggleCollapsedMode,
            modelOptions.length ? separator() : undefined,
            ...modelOptions,
            snooze,
            settings,
            ...extensionCommandNodes,
            actionBarFooter ? separator() : undefined,
            actionBarFooter
        ]);
    }
    _getKeybinding(commandId) {
        if (!commandId) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(undefined);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._contextKeyService.onDidChangeContext, ()=>this._keybindingService.lookupKeybinding(commandId)); // TODO: use contextkeyservice to use different renderings
    }
};
GutterIndicatorMenuContent = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"])
], GutterIndicatorMenuContent);
function hoverContent(content) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
        class: 'content',
        style: {
            margin: 4,
            minWidth: 180
        }
    }, content);
}
function header(title) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
        class: 'header',
        style: {
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["descriptionForeground"]),
            fontSize: '13px',
            fontWeight: '600',
            padding: '0 4px',
            lineHeight: 28
        }
    }, [
        title
    ]);
}
function option(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        name: 'inlineEdits.option'
    }, (_reader)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: [
                'monaco-menu-option',
                props.isActive?.map((v)=>v && 'active')
            ],
            onmouseenter: ()=>props.onHoverChange?.(true),
            onmouseleave: ()=>props.onHoverChange?.(false),
            onclick: props.onAction,
            onkeydown: (e)=>{
                if (e.key === 'Enter') {
                    props.onAction?.();
                }
            },
            tabIndex: 0,
            style: {
                borderRadius: 3
            }
        }, [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('span', {
                style: {
                    fontSize: 16,
                    display: 'flex'
                }
            }, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeIcon"].isThemeIcon(props.icon) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(props.icon) : props.icon.map((icon)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(icon))
            ]),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('span', {}, [
                props.title
            ]),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                style: {
                    marginLeft: 'auto'
                },
                ref: (elem)=>{
                    const keybindingLabel = _reader.store.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeybindingLabel"](elem, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OS"], {
                        disableTitle: true,
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$browser$2f$defaultStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultKeybindingLabelStyles"],
                        keybindingLabelShadow: undefined,
                        keybindingLabelForeground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["descriptionForeground"]),
                        keybindingLabelBackground: 'transparent',
                        keybindingLabelBorder: 'transparent',
                        keybindingLabelBottomBorder: undefined
                    }));
                    _reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
                        keybindingLabel.set(props.keybinding.read(reader));
                    }));
                }
            })
        ]));
}
// TODO: make this observable
function actionBar(actions, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        name: 'inlineEdits.actionBar'
    }, (_reader)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: [
                'action-widget-action-bar'
            ],
            style: {
                padding: '3px 24px'
            }
        }, [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                ref: (elem)=>{
                    const actionBar = _reader.store.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$actionbar$2f$actionbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionBar"](elem, options));
                    actionBar.push(actions, {
                        icon: false,
                        label: true
                    });
                }
            })
        ]));
}
function separator() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
        id: 'inline-edit-gutter-indicator-menu-separator',
        class: 'menu-separator',
        style: {
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorActionListForeground"]),
            padding: '2px 0'
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
        style: {
            borderBottom: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverBorder"])}`
        }
    }));
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsGutterIndicator",
    ()=>InlineEditsGutterIndicator,
    "InlineEditsGutterIndicatorData",
    ()=>InlineEditsGutterIndicatorData,
    "InlineSuggestionGutterMenuData",
    ()=>InlineSuggestionGutterMenuData,
    "SimpleInlineSuggestModel",
    ()=>SimpleInlineSuggestModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconLabels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/accessibility/common/accessibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/hover/browser/hover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$stickyScroll$2f$browser$2f$stickyScrollController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/stickyScroll/browser/stickyScrollController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorMenu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/userInteraction/browser/userInteractionService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/runOnChange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
class InlineEditsGutterIndicatorData {
    constructor(gutterMenuData, originalRange, model, altAction, customization){
        this.gutterMenuData = gutterMenuData;
        this.originalRange = originalRange;
        this.model = model;
        this.altAction = altAction;
        this.customization = customization;
    }
}
class InlineSuggestionGutterMenuData {
    static fromInlineSuggestion(suggestion) {
        const alternativeAction = suggestion.action?.kind === 'edit' ? suggestion.action.alternativeAction : undefined;
        const commands = suggestion.source.inlineSuggestions.commands ?? [];
        return new InlineSuggestionGutterMenuData(suggestion.gutterMenuLinkAction, suggestion.source.provider.displayName ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1282, "Inline Suggestion"), commands.length > 0 ? [
            commands
        ] : [], alternativeAction, suggestion.source.provider.modelInfo, suggestion.source.provider.setModelId?.bind(suggestion.source.provider));
    }
    constructor(action, displayName, extensionCommands, alternativeAction, modelInfo, setModelId, extensionCommandsOnly = false){
        this.action = action;
        this.displayName = displayName;
        this.extensionCommands = extensionCommands;
        this.alternativeAction = alternativeAction;
        this.modelInfo = modelInfo;
        this.setModelId = setModelId;
        this.extensionCommandsOnly = extensionCommandsOnly;
    }
}
// TODO this class does not make that much sense yet.
class SimpleInlineSuggestModel {
    static fromInlineCompletionModel(model) {
        return new SimpleInlineSuggestModel(()=>model.accept(), ()=>model.jump());
    }
    constructor(accept, jump){
        this.accept = accept;
        this.jump = jump;
    }
}
const CODICON_SIZE_PX = 16;
const CODICON_PADDING_PX = 2;
let InlineEditsGutterIndicator = class InlineEditsGutterIndicator extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editorObs, _data, _tabAction, _verticalOffset, _isHoveringOverInlineEdit, _focusIsInMenu, _hoverService, _instantiationService, _accessibilityService, _themeService, _userInteractionService){
        super();
        this._editorObs = _editorObs;
        this._data = _data;
        this._tabAction = _tabAction;
        this._verticalOffset = _verticalOffset;
        this._isHoveringOverInlineEdit = _isHoveringOverInlineEdit;
        this._focusIsInMenu = _focusIsInMenu;
        this._hoverService = _hoverService;
        this._instantiationService = _instantiationService;
        this._accessibilityService = _accessibilityService;
        this._themeService = _themeService;
        this._userInteractionService = _userInteractionService;
        this._onDidCloseWithCommand = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this._modifierPressed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._userInteractionService.readModifierKeyStatus(this._editorObs.editor.getDomNode(), reader).shiftKey);
        this._gutterIndicatorStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            let v = this._tabAction.read(reader);
            // TODO: add source of truth for alt action active and key pressed
            const altAction = this._data.read(reader)?.altAction;
            const modifiedPressed = this._modifierPressed.read(reader);
            if (altAction && modifiedPressed) {
                v = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive;
            }
            switch(v){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive:
                    return {
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSecondaryBackground"], this._themeService).read(reader).toString(),
                        foreground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSecondaryForeground"], this._themeService).read(reader).toString(),
                        border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSecondaryBorder"], this._themeService).read(reader).toString()
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Jump:
                    return {
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBackground"], this._themeService).read(reader).toString(),
                        foreground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryForeground"], this._themeService).read(reader).toString(),
                        border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBorder"], this._themeService).read(reader).toString()
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept:
                    return {
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSuccessfulBackground"], this._themeService).read(reader).toString(),
                        foreground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSuccessfulForeground"], this._themeService).read(reader).toString(),
                        border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSuccessfulBorder"], this._themeService).read(reader).toString()
                    };
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertNever"])();
            }
        });
        this._state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const range = this._originalRangeObs.read(reader);
            if (!range) {
                return undefined;
            }
            return {
                range,
                lineOffsetRange: this._editorObs.observeLineOffsetRange(range, reader.store)
            };
        });
        this._lineNumberToRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._verticalOffset.read(reader) !== 0) {
                return '';
            }
            const lineNumber = this._data.read(reader)?.originalRange.startLineNumber;
            const lineNumberOptions = this._editorObs.getOption(76 /* EditorOption.lineNumbers */ ).read(reader);
            if (lineNumber === undefined || lineNumberOptions.renderType === 0 /* RenderLineNumbersType.Off */ ) {
                return '';
            }
            if (lineNumberOptions.renderType === 3 /* RenderLineNumbersType.Interval */ ) {
                const cursorPosition = this._editorObs.cursorPosition.read(reader);
                if (lineNumber % 10 === 0 || cursorPosition && cursorPosition.lineNumber === lineNumber) {
                    return lineNumber.toString();
                }
                return '';
            }
            if (lineNumberOptions.renderType === 2 /* RenderLineNumbersType.Relative */ ) {
                const cursorPosition = this._editorObs.cursorPosition.read(reader);
                if (!cursorPosition) {
                    return '';
                }
                const relativeLineNumber = Math.abs(lineNumber - cursorPosition.lineNumber);
                if (relativeLineNumber === 0) {
                    return lineNumber.toString();
                }
                return relativeLineNumber.toString();
            }
            if (lineNumberOptions.renderType === 4 /* RenderLineNumbersType.Custom */ ) {
                if (lineNumberOptions.renderFn) {
                    return lineNumberOptions.renderFn(lineNumber);
                }
                return '';
            }
            return lineNumber.toString();
        });
        this._availableWidthForIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const textModel = this._editorObs.editor.getModel();
            const editor = this._editorObs.editor;
            const layout = this._editorObs.layoutInfo.read(reader);
            const gutterWidth = layout.decorationsLeft + layout.decorationsWidth - layout.glyphMarginLeft;
            if (!textModel || gutterWidth <= 0) {
                return ()=>0;
            }
            // no glyph margin => the entire gutter width is available as there is no optimal place to put the icon
            if (layout.lineNumbersLeft === 0) {
                return ()=>gutterWidth;
            }
            const lineNumberOptions = this._editorObs.getOption(76 /* EditorOption.lineNumbers */ ).read(reader);
            if (lineNumberOptions.renderType === 2 /* RenderLineNumbersType.Relative */  || /* likely to flicker */ lineNumberOptions.renderType === 0 /* RenderLineNumbersType.Off */ ) {
                return ()=>gutterWidth;
            }
            const w = editor.getOption(59 /* EditorOption.fontInfo */ ).typicalHalfwidthCharacterWidth;
            const rightOfLineNumber = layout.lineNumbersLeft + layout.lineNumbersWidth;
            const totalLines = textModel.getLineCount();
            const totalLinesDigits = (totalLines + 1 /* 0 based to 1 based*/ ).toString().length;
            const offsetDigits = [];
            // We only need to pre compute the usable width left of the line number for the first line number with a given digit count
            for(let digits = 1; digits <= totalLinesDigits; digits++){
                const firstLineNumberWithDigitCount = 10 ** (digits - 1);
                const topOfLineNumber = editor.getTopForLineNumber(firstLineNumberWithDigitCount);
                const digitsWidth = digits * w;
                const usableWidthLeftOfLineNumber = Math.min(gutterWidth, Math.max(0, rightOfLineNumber - digitsWidth - layout.glyphMarginLeft));
                offsetDigits.push({
                    firstLineNumberWithDigitCount,
                    topOfLineNumber,
                    usableWidthLeftOfLineNumber
                });
            }
            return (topOffset)=>{
                for(let i = offsetDigits.length - 1; i >= 0; i--){
                    if (topOffset >= offsetDigits[i].topOfLineNumber) {
                        return offsetDigits[i].usableWidthLeftOfLineNumber;
                    }
                }
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Could not find avilable width for icon');
            };
        });
        this._layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this._state.read(reader);
            if (!s) {
                return undefined;
            }
            const layout = this._editorObs.layoutInfo.read(reader);
            const lineHeight = this._editorObs.observeLineHeightForLine(s.range.map((r)=>r.startLineNumber)).read(reader);
            const gutterViewPortPaddingLeft = 1;
            const gutterViewPortPaddingTop = 2;
            // Entire gutter view from top left to bottom right
            const gutterWidthWithoutPadding = layout.decorationsLeft + layout.decorationsWidth - layout.glyphMarginLeft - 2 * gutterViewPortPaddingLeft;
            const gutterHeightWithoutPadding = layout.height - 2 * gutterViewPortPaddingTop;
            const gutterViewPortWithStickyScroll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(gutterViewPortPaddingLeft, gutterViewPortPaddingTop, gutterWidthWithoutPadding, gutterHeightWithoutPadding);
            const gutterViewPortWithoutStickyScrollWithoutPaddingTop = gutterViewPortWithStickyScroll.withTop(this._stickyScrollHeight.read(reader));
            const gutterViewPortWithoutStickyScroll = gutterViewPortWithStickyScroll.withTop(gutterViewPortWithoutStickyScrollWithoutPaddingTop.top + gutterViewPortPaddingTop);
            // The glyph margin area across all relevant lines
            const verticalEditRange = s.lineOffsetRange.read(reader);
            const gutterEditArea = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromRanges(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].fromTo(gutterViewPortWithoutStickyScroll.left, gutterViewPortWithoutStickyScroll.right), verticalEditRange);
            // The gutter view container (pill)
            const pillHeight = lineHeight;
            const pillOffset = this._verticalOffset.read(reader);
            const pillFullyDockedRect = gutterEditArea.withHeight(pillHeight).translateY(pillOffset);
            const pillIsFullyDocked = gutterViewPortWithoutStickyScrollWithoutPaddingTop.containsRect(pillFullyDockedRect);
            // The icon which will be rendered in the pill
            const customIcon = this._data.read(reader)?.customization?.icon;
            const iconNoneDocked = customIcon ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(customIcon) : this._tabAction.map((action)=>action === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].keyboardTab : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].arrowRight);
            const iconDocked = customIcon ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(customIcon) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                if (this._isHoveredOverIconDebounced.read(reader) || this._isHoveredOverInlineEditDebounced.read(reader)) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].check;
                }
                if (this._tabAction.read(reader) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].keyboardTab;
                }
                const cursorLineNumber = this._editorObs.cursorLineNumber.read(reader) ?? 0;
                const editStartLineNumber = s.range.read(reader).startLineNumber;
                return cursorLineNumber <= editStartLineNumber ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].keyboardTabAbove : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].keyboardTabBelow;
            });
            const idealIconAreaWidth = 22;
            const iconWidth = (pillRect)=>{
                const availableIconAreaWidth = this._availableWidthForIcon.read(undefined)(pillRect.bottom + this._editorObs.editor.getScrollTop()) - gutterViewPortPaddingLeft;
                return Math.max(Math.min(availableIconAreaWidth, idealIconAreaWidth), CODICON_SIZE_PX);
            };
            if (pillIsFullyDocked) {
                const pillRect = pillFullyDockedRect;
                let widthUntilLineNumberEnd;
                if (layout.lineNumbersWidth === 0) {
                    widthUntilLineNumberEnd = Math.max(0, Math.min(Math.max(layout.lineNumbersLeft - gutterViewPortWithStickyScroll.left, 0), pillRect.width - idealIconAreaWidth));
                } else {
                    widthUntilLineNumberEnd = Math.max(layout.lineNumbersLeft + layout.lineNumbersWidth - gutterViewPortWithStickyScroll.left, 0);
                }
                const lineNumberRect = pillRect.withWidth(widthUntilLineNumberEnd);
                const minimalIconWidthWithPadding = CODICON_SIZE_PX + CODICON_PADDING_PX;
                const iconWidth = Math.min(pillRect.width - widthUntilLineNumberEnd, idealIconAreaWidth);
                const iconRect = pillRect.withWidth(Math.max(iconWidth, minimalIconWidthWithPadding)).translateX(widthUntilLineNumberEnd);
                const iconVisible = iconWidth >= minimalIconWidthWithPadding;
                return {
                    gutterEditArea,
                    icon: iconDocked,
                    iconDirection: 'right',
                    iconRect,
                    iconVisible,
                    pillRect,
                    lineNumberRect
                };
            }
            const pillPartiallyDockedPossibleArea = gutterViewPortWithStickyScroll.intersect(gutterEditArea); // The area in which the pill could be partially docked
            const pillIsPartiallyDocked = pillPartiallyDockedPossibleArea && pillPartiallyDockedPossibleArea.height >= pillHeight;
            if (pillIsPartiallyDocked) {
                // pillFullyDockedRect is outside viewport, move it into the viewport under sticky scroll as we prefer the pill to not be on top of the sticky scroll
                // then move it into the possible area which will only cause it to move if it has to be rendered on top of the sticky scroll
                const pillRectMoved = pillFullyDockedRect.moveToBeContainedIn(gutterViewPortWithoutStickyScroll).moveToBeContainedIn(pillPartiallyDockedPossibleArea);
                const pillRect = pillRectMoved.withWidth(iconWidth(pillRectMoved));
                const iconRect = pillRect;
                return {
                    gutterEditArea,
                    icon: iconDocked,
                    iconDirection: 'right',
                    iconRect,
                    pillRect,
                    iconVisible: true
                };
            }
            // pillFullyDockedRect is outside viewport, so move it into viewport
            const pillRectMoved = pillFullyDockedRect.moveToBeContainedIn(gutterViewPortWithStickyScroll);
            const pillRect = pillRectMoved.withWidth(iconWidth(pillRectMoved));
            const iconRect = pillRect;
            // docked = pill was already in the viewport
            const iconDirection = pillRect.top < pillFullyDockedRect.top ? 'top' : 'bottom';
            return {
                gutterEditArea,
                icon: iconNoneDocked,
                iconDirection,
                iconRect,
                pillRect,
                iconVisible: true
            };
        });
        this._iconRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].ref();
        this.isVisible = this._layout.map((l)=>!!l);
        this._hoverVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this.isHoverVisible = this._hoverVisible;
        this._isHoveredOverIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this._isHoveredOverIconDebounced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debouncedObservable"])(this._isHoveredOverIcon, 100);
        this.isHoveredOverIcon = this._isHoveredOverIconDebounced;
        this._indicator = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-view-gutter-indicator',
            style: {
                position: 'absolute',
                overflow: 'visible'
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._layout).map((layout)=>!layout ? [] : [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    style: {
                        position: 'absolute',
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorBackground"]),
                        borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).gutterEditArea)
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'icon',
                    ref: this._iconRef,
                    tabIndex: 0,
                    onclick: ()=>{
                        const layout = this._layout.get();
                        const acceptOnClick = layout?.icon.get() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].check;
                        const data = this._data.get();
                        if (!data) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Gutter indicator data not available');
                        }
                        this._editorObs.editor.focus();
                        if (acceptOnClick) {
                            data.model.accept();
                        } else {
                            data.model.jump();
                        }
                    },
                    onmouseenter: ()=>{
                        this._isHoveredOverIcon.set(true, undefined);
                        // TODO show hover when hovering ghost text etc.
                        this._showHover();
                    },
                    onmouseleave: ()=>this._isHoveredOverIcon.set(false, undefined),
                    style: {
                        cursor: 'pointer',
                        zIndex: '20',
                        position: 'absolute',
                        backgroundColor: this._gutterIndicatorStyles.map((v)=>v.background),
                        // eslint-disable-next-line local/code-no-any-casts
                        ['--vscodeIconForeground']: this._gutterIndicatorStyles.map((v)=>v.foreground),
                        border: this._gutterIndicatorStyles.map((v)=>`1px solid ${v.border}`),
                        boxSizing: 'border-box',
                        borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                        display: 'flex',
                        justifyContent: layout.map((l)=>l.iconDirection === 'bottom' ? 'flex-start' : 'flex-end'),
                        transition: this._modifierPressed.map((m)=>m ? '' : 'background-color 0.2s ease-in-out, width 0.2s ease-in-out'),
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).pillRect)
                    }
                }, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        className: 'line-number',
                        style: {
                            lineHeight: layout.map((l)=>l.lineNumberRect ? l.lineNumberRect.height : 0),
                            display: layout.map((l)=>l.lineNumberRect ? 'flex' : 'none'),
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: layout.map((l)=>l.lineNumberRect ? l.lineNumberRect.width : 0),
                            height: '100%',
                            color: this._gutterIndicatorStyles.map((v)=>v.foreground)
                        }
                    }, this._lineNumberToRender),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        style: {
                            transform: layout.map((l)=>`rotate(${getRotationFromDirection(l.iconDirection)}deg)`),
                            transition: 'rotate 0.2s ease-in-out, opacity 0.2s ease-in-out',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            opacity: layout.map((l)=>l.iconVisible ? '1' : '0'),
                            marginRight: layout.map((l)=>l.pillRect.width - l.iconRect.width - (l.lineNumberRect?.width ?? 0)),
                            width: layout.map((l)=>l.iconRect.width),
                            position: 'relative',
                            right: layout.map((l)=>l.iconDirection === 'top' ? '1px' : '0'),
                            color: this._data.map((d)=>d?.customization?.icon?.color ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(d.customization.icon.color.id) : undefined)
                        }
                    }, [
                        layout.map((l, reader)=>withStyles((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(l.icon.read(reader)), {
                                fontSize: toPx(Math.min(l.iconRect.width - CODICON_PADDING_PX, CODICON_SIZE_PX))
                            }))
                    ])
                ])
            ]));
        this._originalRangeObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._data.map((d)=>d?.originalRange));
        this._stickyScrollController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$stickyScroll$2f$browser$2f$stickyScrollController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickyScrollController"].get(this._editorObs.editor);
        this._stickyScrollHeight = this._stickyScrollController ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._stickyScrollController.onDidChangeStickyScrollHeight, ()=>this._stickyScrollController.stickyScrollWidgetHeight) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0);
        this._isHoveredOverInlineEditDebounced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debouncedObservable"])(this._isHoveringOverInlineEdit, 100);
        const indicator = this._indicator.keepUpdated(this._store);
        this._register(this._editorObs.createOverlayWidget({
            domNode: indicator.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0)
        }));
        this._register(this._editorObs.editor.onDidScrollChange(()=>{
            this._isHoveredOverIcon.set(false, undefined);
        }));
        // pulse animation when hovering inline edit
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runOnChange"])(this._isHoveredOverInlineEditDebounced, (isHovering)=>{
            if (isHovering) {
                this.triggerAnimation();
            }
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            indicator.readEffect(reader);
            if (indicator.element) {
                // For the line number
                this._editorObs.editor.applyFontInfo(indicator.element);
            }
        }));
    }
    triggerAnimation() {
        if (this._accessibilityService.isMotionReduced()) {
            return new Animation(null, null).finished;
        }
        // PULSE ANIMATION:
        const animation = this._iconRef.element.animate([
            {
                outline: `2px solid ${this._gutterIndicatorStyles.map((v)=>v.border).get()}`,
                outlineOffset: '-1px',
                offset: 0
            },
            {
                outline: `2px solid transparent`,
                outlineOffset: '10px',
                offset: 1
            }
        ], {
            duration: 500
        });
        return animation.finished;
    }
    _showHover() {
        if (this._hoverVisible.get()) {
            return;
        }
        const data = this._data.get();
        if (!data) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Gutter indicator data not available');
        }
        const disposableStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        const content = disposableStore.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GutterIndicatorMenuContent"], this._editorObs, data.gutterMenuData, (focusEditor, commandId)=>{
            if (focusEditor) {
                this._editorObs.editor.focus();
            }
            if (commandId) {
                this._onDidCloseWithCommand.fire(commandId);
            }
            h?.dispose();
        }).toDisposableLiveElement());
        const isFocused = this._userInteractionService.createFocusTracker(content.element, disposableStore); // TODO@benibenj should this be removed?
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            this._focusIsInMenu.set(isFocused.read(reader), undefined);
        }));
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>this._focusIsInMenu.set(false, undefined)));
        const h = this._hoverService.showInstantHover({
            target: this._iconRef.element,
            content: content.element
        });
        if (h) {
            this._hoverVisible.set(true, undefined);
            disposableStore.add(this._editorObs.editor.onDidScrollChange(()=>h.dispose()));
            disposableStore.add(h.onDispose(()=>{
                this._hoverVisible.set(false, undefined);
                disposableStore.dispose();
            }));
        } else {
            disposableStore.dispose();
        }
    }
};
InlineEditsGutterIndicator = __decorate([
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IHoverService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAccessibilityService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IUserInteractionService"])
], InlineEditsGutterIndicator);
function getRotationFromDirection(direction) {
    switch(direction){
        case 'top':
            return 90;
        case 'bottom':
            return -90;
        case 'right':
            return 0;
    }
}
function withStyles(element, styles) {
    for(const key in styles){
        // eslint-disable-next-line local/code-no-any-casts
        element.style[key] = styles[key];
    }
    return element;
}
function toPx(n) {
    return `${n}px`;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsNewUsers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsOnboardingExperience",
    ()=>InlineEditsOnboardingExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/configuration/common/configuration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$storage$2f$common$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/storage/common/storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/runOnChange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
var UserKind;
(function(UserKind) {
    UserKind["FirstTime"] = "firstTime";
    UserKind["SecondTime"] = "secondTime";
    UserKind["Active"] = "active";
})(UserKind || (UserKind = {}));
let InlineEditsOnboardingExperience = class InlineEditsOnboardingExperience extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_model, _indicator, _collapsedView, _storageService, _configurationService){
        super();
        this._model = _model;
        this._indicator = _indicator;
        this._collapsedView = _collapsedView;
        this._storageService = _storageService;
        this._configurationService = _configurationService;
        this._disposables = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutableDisposable"]());
        this._setupDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])({
            name: 'setupDone'
        }, false);
        this._activeCompletionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return undefined;
            }
            if (!this._setupDone.read(reader)) {
                return undefined;
            }
            const indicator = this._indicator.read(reader);
            if (!indicator || !indicator.isVisible.read(reader)) {
                return undefined;
            }
            return model.inlineEdit.inlineCompletion.identity.id;
        });
        this._register(this._initializeDebugSetting());
        // Setup the onboarding experience for new users
        this._disposables.value = this.setupNewUserExperience();
        this._setupDone.set(true, undefined);
    }
    setupNewUserExperience() {
        if (this.getNewUserType() === UserKind.Active) {
            return undefined;
        }
        const disposableStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        let userHasHoveredOverIcon = false;
        let inlineEditHasBeenAccepted = false;
        let firstTimeUserAnimationCount = 0;
        let secondTimeUserAnimationCount = 0;
        // pulse animation for new users
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runOnChangeWithCancellationToken"])(this._activeCompletionId, async (id, _, __, token)=>{
            if (id === undefined) {
                return;
            }
            let userType = this.getNewUserType();
            // User Kind Transition
            switch(userType){
                case UserKind.FirstTime:
                    {
                        if (firstTimeUserAnimationCount++ >= 5 || userHasHoveredOverIcon) {
                            userType = UserKind.SecondTime;
                            this.setNewUserType(userType);
                        }
                        break;
                    }
                case UserKind.SecondTime:
                    {
                        if (secondTimeUserAnimationCount++ >= 3 && inlineEditHasBeenAccepted) {
                            userType = UserKind.Active;
                            this.setNewUserType(userType);
                        }
                        break;
                    }
            }
            // Animation
            switch(userType){
                case UserKind.FirstTime:
                    {
                        for(let i = 0; i < 3 && !token.isCancellationRequested; i++){
                            await this._indicator.get()?.triggerAnimation();
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeout"])(500);
                        }
                        break;
                    }
                case UserKind.SecondTime:
                    {
                        this._indicator.get()?.triggerAnimation();
                        break;
                    }
            }
        }));
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            if (this._collapsedView.isVisible.read(reader)) {
                if (this.getNewUserType() !== UserKind.Active) {
                    this._collapsedView.triggerAnimation();
                }
            }
        }));
        // Remember when the user has hovered over the icon
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const indicator = this._indicator.read(reader);
            if (!indicator) {
                return;
            }
            reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runOnChange"])(indicator.isHoveredOverIcon, async (isHovered)=>{
                if (isHovered) {
                    userHasHoveredOverIcon = true;
                }
            }));
        }));
        // Remember when the user has accepted an inline edit
        disposableStore.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return;
            }
            reader.store.add(model.onDidAccept(()=>{
                inlineEditHasBeenAccepted = true;
            }));
        }));
        return disposableStore;
    }
    getNewUserType() {
        return this._storageService.get('inlineEditsGutterIndicatorUserKind', -1 /* StorageScope.APPLICATION */ , UserKind.FirstTime);
    }
    setNewUserType(value) {
        switch(value){
            case UserKind.FirstTime:
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('UserKind should not be set to first time');
            case UserKind.SecondTime:
                break;
            case UserKind.Active:
                this._disposables.clear();
                break;
        }
        this._storageService.store('inlineEditsGutterIndicatorUserKind', value, -1 /* StorageScope.APPLICATION */ , 0 /* StorageTarget.USER */ );
    }
    _initializeDebugSetting() {
        // Debug setting to reset the new user experience
        const hiddenDebugSetting = 'editor.inlineSuggest.edits.resetNewUserExperience';
        if (this._configurationService.getValue(hiddenDebugSetting)) {
            this._storageService.remove('inlineEditsGutterIndicatorUserKind', -1 /* StorageScope.APPLICATION */ );
        }
        const disposable = this._configurationService.onDidChangeConfiguration((e)=>{
            if (e.affectsConfiguration(hiddenDebugSetting) && this._configurationService.getValue(hiddenDebugSetting)) {
                this._storageService.remove('inlineEditsGutterIndicatorUserKind', -1 /* StorageScope.APPLICATION */ );
                this._disposables.value = this.setupNewUserExperience();
            }
        });
        return disposable;
    }
};
InlineEditsOnboardingExperience = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$storage$2f$common$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IStorageService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IConfigurationService"])
], InlineEditsOnboardingExperience);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditWithChanges.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditWithChanges",
    ()=>InlineEditWithChanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$lineEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/lineEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class InlineEditWithChanges {
    // TODO@hediet: Move the next 3 fields into the action
    get lineEdit() {
        if (this.action?.kind === 'jumpTo') {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$lineEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineReplacement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(this.action.position.lineNumber, 0), []);
        } else if (this.action?.kind === 'edit') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$lineEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineReplacement"].fromSingleTextEdit(this.edit.toReplacement(this.originalText), this.originalText);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$lineEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineReplacement"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](1, 1), []);
    }
    get originalLineRange() {
        return this.lineEdit.lineRange;
    }
    get modifiedLineRange() {
        return this.lineEdit.toLineEdit().getNewLineRanges()[0];
    }
    get displayRange() {
        return this.originalText.lineRange.intersect(this.originalLineRange.join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(this.originalLineRange.startLineNumber, this.lineEdit.newLines.length)));
    }
    constructor(originalText, action, edit, cursorPosition, multiCursorPositions, commands, inlineCompletion){
        this.originalText = originalText;
        this.action = action;
        this.edit = edit;
        this.cursorPosition = cursorPosition;
        this.multiCursorPositions = multiCursorPositions;
        this.commands = commands;
        this.inlineCompletion = inlineCompletion;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsModel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModelPerInlineEdit",
    ()=>ModelPerInlineEdit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionsModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Warning: This is not per inline edit id and gets created often.
 * @deprecated TODO@hediet remove
*/ class ModelPerInlineEdit {
    constructor(_model, inlineEdit, tabAction){
        this._model = _model;
        this.inlineEdit = inlineEdit;
        this.tabAction = tabAction;
        this.editorType = this._model.editorType;
        this.displayLocation = this.inlineEdit.inlineCompletion.hint;
        this.inViewPort = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionsModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSuggestionInViewport"])(this._model.editor, this.inlineEdit.inlineCompletion, reader));
        this.onDidAccept = this._model.onDidAccept;
    }
    accept(alternativeAction) {
        this._model.accept(undefined, alternativeAction);
    }
    handleInlineEditShownNextFrame(viewKind, viewData) {
        const item = this.inlineEdit.inlineCompletion;
        const timeWhenShown = Date.now();
        item.addRef();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTimeout0"])(()=>{
            this._model.handleInlineSuggestionShown(item, viewKind, viewData, timeWhenShown);
            item.removeRef();
        });
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsCollapsedView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsCollapsedView",
    ()=>InlineEditsCollapsedView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/accessibility/common/accessibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/point.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
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
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
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
let InlineEditsCollapsedView = class InlineEditsCollapsedView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _edit, _accessibilityService){
        super();
        this._editor = _editor;
        this._edit = _edit;
        this._accessibilityService = _accessibilityService;
        this.onDidClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].None;
        this._iconRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].ref();
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(false);
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        const firstEdit = this._edit.map((inlineEdit)=>inlineEdit?.edit?.replacements[0] ?? null);
        const startPosition = firstEdit.map((edit)=>edit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(edit, this._editor.getModel()).range.getStartPosition() : null);
        const observedStartPoint = this._editorObs.observePosition(startPosition, this._store);
        const startPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const point = observedStartPoint.read(reader);
            if (!point) {
                return null;
            }
            const contentLeft = this._editorObs.layoutInfoContentLeft.read(reader);
            const scrollLeft = this._editorObs.scrollLeft.read(reader);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Point"](contentLeft + point.x - scrollLeft, point.y);
        });
        const overlayElement = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-collapsed-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: 'block'
            }
        }, [
            [
                this.getCollapsedIndicator(startPoint)
            ]
        ]).keepUpdated(this._store).element;
        this._register(this._editorObs.createOverlayWidget({
            domNode: overlayElement,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0)
        }));
        this.isVisible = this._edit.map((inlineEdit, reader)=>!!inlineEdit && startPoint.read(reader) !== null);
    }
    triggerAnimation() {
        if (this._accessibilityService.isMotionReduced()) {
            return new Animation(null, null).finished;
        }
        // PULSE ANIMATION:
        const animation = this._iconRef.element.animate([
            {
                offset: 0.00,
                transform: 'translateY(-3px)'
            },
            {
                offset: 0.20,
                transform: 'translateY(1px)'
            },
            {
                offset: 0.36,
                transform: 'translateY(-1px)'
            },
            {
                offset: 0.52,
                transform: 'translateY(1px)'
            },
            {
                offset: 0.68,
                transform: 'translateY(-1px)'
            },
            {
                offset: 0.84,
                transform: 'translateY(1px)'
            },
            {
                offset: 1.00,
                transform: 'translateY(0px)'
            }
        ], {
            duration: 2000
        });
        return animation.finished;
    }
    getCollapsedIndicator(startPoint) {
        const contentLeft = this._editorObs.layoutInfoContentLeft;
        const startPointTranslated = startPoint.map((p, reader)=>p ? p.deltaX(-contentLeft.read(reader)) : null);
        const iconPath = this.createIconPath(startPointTranslated);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svg({
            class: 'collapsedView',
            ref: this._iconRef,
            style: {
                position: 'absolute',
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorValidOverlayRect"])(this._editorObs).read(r)),
                overflow: 'hidden',
                pointerEvents: 'none'
            }
        }, [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svgElem('path', {
                class: 'collapsedViewPath',
                d: iconPath,
                fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBorder"])
            })
        ]);
    }
    createIconPath(indicatorPoint) {
        const width = 6;
        const triangleHeight = 3;
        const baseHeight = 1;
        return indicatorPoint.map((point)=>{
            if (!point) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().build();
            }
            const baseTopLeft = point.deltaX(-width / 2).deltaY(-baseHeight);
            const baseTopRight = baseTopLeft.deltaX(width);
            const baseBottomLeft = baseTopLeft.deltaY(baseHeight);
            const baseBottomRight = baseTopRight.deltaY(baseHeight);
            const triangleBottomCenter = baseBottomLeft.deltaX(width / 2).deltaY(triangleHeight);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(baseTopLeft).lineTo(baseTopRight).lineTo(baseBottomRight).lineTo(triangleBottomCenter).lineTo(baseBottomLeft).lineTo(baseTopLeft).build();
        });
    }
};
InlineEditsCollapsedView = __decorate([
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAccessibilityService"])
], InlineEditsCollapsedView);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsCustomView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsCustomView",
    ()=>InlineEditsCustomView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/lineTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
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
const MIN_END_OF_LINE_PADDING = 14;
const PADDING_VERTICALLY = 0;
const PADDING_HORIZONTALLY = 4;
const HORIZONTAL_OFFSET_WHEN_ABOVE_BELOW = 4;
const VERTICAL_OFFSET_WHEN_ABOVE_BELOW = 2;
// !! minEndOfLinePadding should always be larger than paddingHorizontally + horizontalOffsetWhenAboveBelow
let InlineEditsCustomView = class InlineEditsCustomView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, displayLocation, tabAction, editorType, themeService, _languageService){
        super();
        this._editor = _editor;
        this._languageService = _languageService;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this.isHovered = this._isHovered;
        this._viewRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].ref();
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        const styles = tabAction.map((v, reader)=>{
            let border;
            switch(v){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive:
                    border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSecondaryBackground"];
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Jump:
                    border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBackground"];
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept:
                    border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSuccessfulBackground"];
                    break;
            }
            return {
                border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(border, themeService).read(reader).toString(),
                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(editorType.read(reader))
            };
        });
        const state = displayLocation.map((dl)=>dl ? this.getState(dl) : undefined);
        const view = state.map((s)=>s ? this.getRendering(s, styles) : undefined);
        this.minEditorScrollHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = state.read(reader);
            if (!s) {
                return 0;
            }
            return s.rect.read(reader).bottom + this._editor.getScrollTop();
        });
        const overlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-custom-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: 'block'
            }
        }, [
            view
        ]).keepUpdated(this._store);
        this._register(this._editorObs.createOverlayWidget({
            domNode: overlay.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(this, (reader, prev)=>{
                const s = state.read(reader);
                if (!s) {
                    return prev ?? 0;
                }
                const current = s.rect.map((rect)=>rect.right).read(reader) + this._editorObs.layoutInfoVerticalScrollbarWidth.read(reader) + PADDING_HORIZONTALLY - this._editorObs.layoutInfoContentLeft.read(reader);
                return Math.max(prev ?? 0, current); // will run into infinite loop otherwise TODO: fix this
            }).recomputeInitiallyAndOnChange(this._store)
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const v = view.read(reader);
            if (!v) {
                this._isHovered.set(false, undefined);
                return;
            }
            this._isHovered.set(overlay.isHovered.read(reader), undefined);
        }));
    }
    // TODO: this is very similar to side by side `fitsInsideViewport`, try to use the same function
    fitsInsideViewport(range, displayLabel, reader) {
        const editorWidth = this._editorObs.layoutInfoWidth.read(reader);
        const editorContentLeft = this._editorObs.layoutInfoContentLeft.read(reader);
        const editorVerticalScrollbar = this._editor.getLayoutInfo().verticalScrollbarWidth;
        const minimapWidth = this._editorObs.layoutInfoMinimap.read(reader).minimapLeft !== 0 ? this._editorObs.layoutInfoMinimap.read(reader).minimapWidth : 0;
        const maxOriginalContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, range, undefined);
        const maxModifiedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContentRenderWidth"])(displayLabel, this._editor, this._editor.getModel());
        const padding = PADDING_HORIZONTALLY + MIN_END_OF_LINE_PADDING;
        return maxOriginalContent + maxModifiedContent + padding < editorWidth - editorContentLeft - editorVerticalScrollbar - minimapWidth;
    }
    getState(displayLocation) {
        const contentState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const startLineNumber = displayLocation.range.startLineNumber;
            const endLineNumber = displayLocation.range.endLineNumber;
            const startColumn = displayLocation.range.startColumn;
            const endColumn = displayLocation.range.endColumn;
            const lineCount = this._editor.getModel()?.getLineCount() ?? 0;
            const lineWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](startLineNumber, startLineNumber + 1), reader);
            const lineWidthBelow = startLineNumber + 1 <= lineCount ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](startLineNumber + 1, startLineNumber + 2), reader) : undefined;
            const lineWidthAbove = startLineNumber - 1 >= 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](startLineNumber - 1, startLineNumber), reader) : undefined;
            const startContentLeftOffset = this._editor.getOffsetForColumn(startLineNumber, startColumn);
            const endContentLeftOffset = this._editor.getOffsetForColumn(endLineNumber, endColumn);
            return {
                lineWidth,
                lineWidthBelow,
                lineWidthAbove,
                startContentLeftOffset,
                endContentLeftOffset
            };
        });
        const startLineNumber = displayLocation.range.startLineNumber;
        const endLineNumber = displayLocation.range.endLineNumber;
        // only check viewport once in the beginning when rendering the view
        const fitsInsideViewport = this.fitsInsideViewport(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](startLineNumber, endLineNumber + 1), displayLocation.content, undefined);
        const rect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const w = this._editorObs.getOption(59 /* EditorOption.fontInfo */ ).read(reader).typicalHalfwidthCharacterWidth;
            const { lineWidth, lineWidthBelow, lineWidthAbove, startContentLeftOffset, endContentLeftOffset } = contentState.read(reader);
            const contentLeft = this._editorObs.layoutInfoContentLeft.read(reader);
            const lineHeight = this._editorObs.observeLineHeightForLine(startLineNumber).recomputeInitiallyAndOnChange(reader.store).read(reader);
            const scrollTop = this._editorObs.scrollTop.read(reader);
            const scrollLeft = this._editorObs.scrollLeft.read(reader);
            let position;
            if (startLineNumber === endLineNumber && endContentLeftOffset + 5 * w >= lineWidth && fitsInsideViewport) {
                position = 'end'; // Render at the end of the line if the range ends almost at the end of the line
            } else if (lineWidthBelow !== undefined && lineWidthBelow + MIN_END_OF_LINE_PADDING - HORIZONTAL_OFFSET_WHEN_ABOVE_BELOW - PADDING_HORIZONTALLY < startContentLeftOffset) {
                position = 'below'; // Render Below if possible
            } else if (lineWidthAbove !== undefined && lineWidthAbove + MIN_END_OF_LINE_PADDING - HORIZONTAL_OFFSET_WHEN_ABOVE_BELOW - PADDING_HORIZONTALLY < startContentLeftOffset) {
                position = 'above'; // Render Above if possible
            } else {
                position = 'end'; // Render at the end of the line otherwise
            }
            let topOfLine;
            let contentStartOffset;
            let deltaX = 0;
            let deltaY = 0;
            switch(position){
                case 'end':
                    {
                        topOfLine = this._editorObs.editor.getTopForLineNumber(startLineNumber);
                        contentStartOffset = lineWidth;
                        deltaX = PADDING_HORIZONTALLY + MIN_END_OF_LINE_PADDING;
                        break;
                    }
                case 'below':
                    {
                        topOfLine = this._editorObs.editor.getTopForLineNumber(startLineNumber + 1);
                        contentStartOffset = startContentLeftOffset;
                        deltaX = PADDING_HORIZONTALLY + HORIZONTAL_OFFSET_WHEN_ABOVE_BELOW;
                        deltaY = PADDING_VERTICALLY + VERTICAL_OFFSET_WHEN_ABOVE_BELOW;
                        break;
                    }
                case 'above':
                    {
                        topOfLine = this._editorObs.editor.getTopForLineNumber(startLineNumber - 1);
                        contentStartOffset = startContentLeftOffset;
                        deltaX = PADDING_HORIZONTALLY + HORIZONTAL_OFFSET_WHEN_ABOVE_BELOW;
                        deltaY = -PADDING_VERTICALLY + VERTICAL_OFFSET_WHEN_ABOVE_BELOW;
                        break;
                    }
            }
            const textRect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(contentLeft + contentStartOffset - scrollLeft, topOfLine - scrollTop, w * displayLocation.content.length, lineHeight);
            return textRect.withMargin(PADDING_VERTICALLY, PADDING_HORIZONTALLY).translateX(deltaX).translateY(deltaY);
        });
        return {
            rect,
            label: displayLocation.content,
            kind: displayLocation.style
        };
    }
    getRendering(state, styles) {
        const line = document.createElement('div');
        const t = this._editor.getModel().tokenization.tokenizeLinesAt(1, [
            state.label
        ])?.[0];
        let tokens;
        if (t && state.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionHintStyle"].Code) {
            tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenArray"].fromLineTokens(t).toLineTokens(state.label, this._languageService.languageIdCodec);
        } else {
            tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineTokens"].createEmpty(state.label, this._languageService.languageIdCodec);
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderLines"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSource"]([
            tokens
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderOptions"].fromEditor(this._editor).withSetWidth(false).withScrollBeyondLastColumn(0), [], line, true);
        line.style.width = `${result.minWidthInPx}px`;
        const rect = state.rect.map((r)=>r.withMargin(0, PADDING_HORIZONTALLY));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'collapsedView',
            ref: this._viewRef,
            style: {
                position: 'absolute',
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>rect.read(reader)),
                overflow: 'hidden',
                boxSizing: 'border-box',
                cursor: 'pointer',
                border: styles.map((s)=>`1px solid ${s.border}`),
                borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                backgroundColor: styles.map((s)=>s.background),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
            },
            onmousedown: (e)=>{
                e.preventDefault(); // This prevents that the editor loses focus
            },
            onclick: (e)=>{
                this._onDidClick.fire(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"].create(e));
            }
        }, [
            line
        ]);
    }
};
InlineEditsCustomView = __decorate([
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"])
], InlineEditsCustomView);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsDeletionView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsDeletionView",
    ()=>InlineEditsDeletionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ const HORIZONTAL_PADDING = 0;
const VERTICAL_PADDING = 0;
const BORDER_WIDTH = 1;
const WIDGET_SEPARATOR_WIDTH = 1;
const WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH = 3;
const BORDER_RADIUS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"];
class InlineEditsDeletionView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _edit, _uiState, _tabAction){
        super();
        this._editor = _editor;
        this._edit = _edit;
        this._uiState = _uiState;
        this._tabAction = _tabAction;
        this.onDidClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].None;
        this._display = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>!!this._uiState.read(reader) ? 'block' : 'none');
        this._editorMaxContentWidthInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const originalDisplayRange = this._originalDisplayRange.read(reader);
            if (!originalDisplayRange) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0);
            }
            this._editorObs.versionId.read(reader);
            // Take the max value that we observed.
            // Reset when either the edit changes or the editor text version.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(this, (reader, lastValue)=>{
                const maxWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, originalDisplayRange, reader);
                return Math.max(maxWidth, lastValue ?? 0);
            });
        }).map((v, r)=>v.read(r));
        this._maxPrefixTrim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._uiState.read(reader);
            if (!state) {
                return {
                    prefixTrim: 0,
                    prefixLeftOffset: 0
                };
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrefixTrim"])(state.deletions, state.originalRange, [], this._editor);
        });
        this._editorLayoutInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            if (!inlineEdit) {
                return null;
            }
            const state = this._uiState.read(reader);
            if (!state) {
                return null;
            }
            const editorLayout = this._editorObs.layoutInfo.read(reader);
            const horizontalScrollOffset = this._editorObs.scrollLeft.read(reader);
            const w = this._editorObs.getOption(59 /* EditorOption.fontInfo */ ).map((f)=>f.typicalHalfwidthCharacterWidth).read(reader);
            const right = editorLayout.contentLeft + Math.max(this._editorMaxContentWidthInRange.read(reader), w) - horizontalScrollOffset;
            const range = inlineEdit.originalLineRange;
            const selectionTop = this._originalVerticalStartPosition.read(reader) ?? this._editor.getTopForLineNumber(range.startLineNumber) - this._editorObs.scrollTop.read(reader);
            const selectionBottom = this._originalVerticalEndPosition.read(reader) ?? this._editor.getTopForLineNumber(range.endLineNumberExclusive) - this._editorObs.scrollTop.read(reader);
            const left = editorLayout.contentLeft + this._maxPrefixTrim.read(reader).prefixLeftOffset - horizontalScrollOffset;
            if (right <= left) {
                return null;
            }
            const codeRect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopRightBottom(left, selectionTop, right, selectionBottom).withMargin(VERTICAL_PADDING, HORIZONTAL_PADDING);
            return {
                codeRect,
                contentLeft: editorLayout.contentLeft
            };
        }).recomputeInitiallyAndOnChange(this._store);
        this._originalOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            style: {
                pointerEvents: 'none'
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const layoutInfoObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._editorLayoutInfo).read(reader);
            if (!layoutInfoObs) {
                return undefined;
            }
            // Create an overlay which hides the left hand side of the original overlay when it overflows to the left
            // such that there is a smooth transition at the edge of content left
            const overlayhider = layoutInfoObs.map((layoutInfo)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopRightBottom(layoutInfo.contentLeft - BORDER_RADIUS - BORDER_WIDTH, layoutInfo.codeRect.top, layoutInfo.contentLeft, layoutInfo.codeRect.bottom));
            const overlayRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const rect = layoutInfoObs.read(reader).codeRect;
                const overlayHider = overlayhider.read(reader);
                return rect.intersectHorizontal(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](overlayHider.left, Number.MAX_SAFE_INTEGER));
            });
            const separatorWidth = this._uiState.map((s)=>s?.editorType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor ? WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH : WIDGET_SEPARATOR_WIDTH).read(reader);
            const separatorRect = overlayRect.map((rect)=>rect.withMargin(separatorWidth, separatorWidth));
            const editorBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._uiState.map((s)=>s?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor).read(reader));
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalSeparatorDeletion',
                    style: {
                        ...separatorRect.read(reader).toStyles(),
                        borderRadius: `${BORDER_RADIUS}px`,
                        border: `${BORDER_WIDTH + separatorWidth}px solid ${editorBackground}`,
                        boxSizing: 'border-box'
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlayDeletion',
                    style: {
                        ...overlayRect.read(reader).toStyles(),
                        borderRadius: `${BORDER_RADIUS}px`,
                        border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalBorderColor"])(this._tabAction).map((bc)=>`${BORDER_WIDTH}px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(bc)}`),
                        boxSizing: 'border-box',
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalBackgroundColor"])
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlayHiderDeletion',
                    style: {
                        ...overlayhider.read(reader).toStyles(),
                        backgroundColor: editorBackground
                    }
                })
            ];
        })).keepUpdated(this._store);
        this._nonOverflowView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: this._display
            }
        }, [
            [
                this._originalOverlay
            ]
        ]).keepUpdated(this._store);
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(false);
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        const originalStartPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            return inlineEdit ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](inlineEdit.originalLineRange.startLineNumber, 1) : null;
        });
        const originalEndPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            return inlineEdit ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](inlineEdit.originalLineRange.endLineNumberExclusive, 1) : null;
        });
        this._originalDisplayRange = this._uiState.map((s)=>s?.originalRange);
        this._originalVerticalStartPosition = this._editorObs.observePosition(originalStartPosition, this._store).map((p)=>p?.y);
        this._originalVerticalEndPosition = this._editorObs.observePosition(originalEndPosition, this._store).map((p)=>p?.y);
        this._register(this._editorObs.createOverlayWidget({
            domNode: this._nonOverflowView.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const info = this._editorLayoutInfo.read(reader);
                if (info === null) {
                    return 0;
                }
                return info.codeRect.width;
            })
        }));
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsInsertionView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsInsertionView",
    ()=>InlineEditsInsertionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/lineTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewModel$2f$inlineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/viewModel/inlineDecorations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/ghostText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/ghostText/ghostTextView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
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
const BORDER_WIDTH = 1;
const WIDGET_SEPARATOR_WIDTH = 1;
const WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH = 3;
const BORDER_RADIUS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"];
let InlineEditsInsertionView = class InlineEditsInsertionView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _input, _tabAction, instantiationService, _languageService){
        super();
        this._editor = _editor;
        this._input = _input;
        this._tabAction = _tabAction;
        this._languageService = _languageService;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._input.read(reader);
            if (!state) {
                return undefined;
            }
            const textModel = this._editor.getModel();
            const eol = textModel.getEOL();
            if (state.startColumn === 1 && state.lineNumber > 1 && textModel.getLineLength(state.lineNumber) !== 0 && state.text.endsWith(eol) && !state.text.startsWith(eol)) {
                const endOfLineColumn = textModel.getLineLength(state.lineNumber - 1) + 1;
                return {
                    lineNumber: state.lineNumber - 1,
                    column: endOfLineColumn,
                    text: eol + state.text.slice(0, -eol.length)
                };
            }
            return {
                lineNumber: state.lineNumber,
                column: state.startColumn,
                text: state.text
            };
        });
        this._trimVertically = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return {
                    topOffset: 0,
                    contentHeight: 0,
                    linesTop: 0,
                    linesBottom: 0
                };
            }
            const text = state.text;
            const lineHeight = this._editor.getLineHeightForPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](state.lineNumber, 1));
            const eol = this._editor.getModel().getEOL();
            const lineCount = text.split(eol).length;
            // Count leading/trailing blank lines so the overlay can be trimmed to the actual inserted content.
            let linesTop = 0;
            let linesBottom = 0;
            if (text.trim() !== '') {
                let i = 0;
                for(; i < text.length && text.startsWith(eol, i); i += eol.length){
                    linesTop += 1;
                }
                for(let j = text.length; j > i && text.endsWith(eol, j); j -= eol.length){
                    linesBottom += 1;
                }
            }
            return {
                topOffset: linesTop * lineHeight,
                contentHeight: (lineCount - linesTop - linesBottom) * lineHeight,
                linesTop,
                linesBottom
            };
        });
        this._maxPrefixTrim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return {
                    prefixLeftOffset: 0,
                    prefixTrim: 0
                };
            }
            const textModel = this._editor.getModel();
            const eol = textModel.getEOL();
            const trimVertically = this._trimVertically.read(reader);
            const lines = state.text.split(eol);
            const modifiedLines = lines.slice(trimVertically.linesTop, lines.length - trimVertically.linesBottom);
            if (trimVertically.linesTop === 0) {
                modifiedLines[0] = textModel.getLineContent(state.lineNumber) + modifiedLines[0];
            }
            const originalRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](state.lineNumber, state.lineNumber + (trimVertically.linesTop > 0 ? 0 : 1));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrefixTrim"])([], originalRange, modifiedLines, this._editor);
        });
        this._ghostText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const state = this._state.read(reader);
            const prefixTrim = this._maxPrefixTrim.read(reader);
            if (!state) {
                return undefined;
            }
            const textModel = this._editor.getModel();
            const eol = textModel.getEOL();
            const modifiedLines = state.text.split(eol);
            const inlineDecorations = modifiedLines.map((line, i)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewModel$2f$inlineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDecoration"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](i + 1, i === 0 ? 1 : prefixTrim.prefixTrim + 1, i + 1, line.length + 1), 'modified-background', 0 /* InlineDecorationType.Regular */ ));
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostText"](state.lineNumber, [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextPart"](state.column, state.text, false, inlineDecorations)
            ]);
        });
        this._display = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>!!this._state.read(reader) ? 'block' : 'none');
        this._editorMaxContentWidthInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return 0;
            }
            this._editorObs.versionId.read(reader);
            const textModel = this._editor.getModel();
            const eol = textModel.getEOL();
            const textBeforeInsertion = state.text.startsWith(eol) ? '' : textModel.getValueInRange(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](state.lineNumber, 1, state.lineNumber, state.column));
            const textAfterInsertion = textModel.getValueInRange(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](state.lineNumber, state.column, state.lineNumber, textModel.getLineLength(state.lineNumber) + 1));
            const text = textBeforeInsertion + state.text + textAfterInsertion;
            const lines = text.split(eol);
            const renderOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderOptions"].fromEditor(this._editor).withSetWidth(false).withScrollBeyondLastColumn(0);
            const lineWidths = lines.map((line)=>{
                const t = textModel.tokenization.tokenizeLinesAt(state.lineNumber, [
                    line
                ])?.[0];
                let tokens;
                if (t) {
                    tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenArray"].fromLineTokens(t).toLineTokens(line, this._languageService.languageIdCodec);
                } else {
                    tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineTokens"].createEmpty(line, this._languageService.languageIdCodec);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderLines"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSource"]([
                    tokens
                ]), renderOptions, [], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('div'), true).minWidthInPx;
            });
            // Take the max value that we observed.
            // Reset when either the edit changes or the editor text version.
            return Math.max(...lineWidths);
        });
        this.startLineOffset = this._trimVertically.map((v)=>v.topOffset);
        this.originalLines = this._state.map((s)=>s ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](s.lineNumber, Math.min(s.lineNumber + 2, this._editor.getModel().getLineCount() + 1)) : undefined);
        this._overlayLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            this._ghostText.read(reader);
            const state = this._state.read(reader);
            if (!state) {
                return null;
            }
            // Update the overlay when the position changes
            this._editorObs.observePosition((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](state.lineNumber, state.column)), reader.store).read(reader);
            const editorLayout = this._editorObs.layoutInfo.read(reader);
            const horizontalScrollOffset = this._editorObs.scrollLeft.read(reader);
            const verticalScrollbarWidth = this._editorObs.layoutInfoVerticalScrollbarWidth.read(reader);
            const right = editorLayout.contentLeft + this._editorMaxContentWidthInRange.read(reader) - horizontalScrollOffset;
            const prefixLeftOffset = this._maxPrefixTrim.read(reader).prefixLeftOffset ?? 0 /* fix due to observable bug? */ ;
            const left = editorLayout.contentLeft + prefixLeftOffset - horizontalScrollOffset;
            if (right <= left) {
                return null;
            }
            const { topOffset: topTrim, contentHeight: height } = this._trimVertically.read(reader);
            const scrollTop = this._editorObs.scrollTop.read(reader);
            // Derive the overlay height synchronously from the model (via _trimVertically) rather than the
            // asynchronously measured ghost text view zone height, which is transiently just a single line while
            // the view zone is (re)created. Because it uses the same line height and line accounting as the trims,
            // top/height/bottom stay consistent and height is always positive: leading and trailing blank lines
            // can never cover every inserted line.
            const top = this._editor.getTopForLineNumber(state.lineNumber) - scrollTop + topTrim;
            const bottom = top + height;
            const overlay = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"](left, top, right, bottom);
            return {
                overlay,
                startsAtContentLeft: prefixLeftOffset === 0,
                contentLeft: editorLayout.contentLeft,
                minContentWidthRequired: prefixLeftOffset + overlay.width + verticalScrollbarWidth
            };
        }).recomputeInitiallyAndOnChange(this._store);
        this._modifiedOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            style: {
                pointerEvents: 'none'
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const overlayLayoutObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._overlayLayout).read(reader);
            if (!overlayLayoutObs) {
                return undefined;
            }
            // Create an overlay which hides the left hand side of the original overlay when it overflows to the left
            // such that there is a smooth transition at the edge of content left
            const overlayHider = overlayLayoutObs.map((layoutInfo)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopRightBottom(layoutInfo.contentLeft - BORDER_RADIUS - BORDER_WIDTH, layoutInfo.overlay.top, layoutInfo.contentLeft, layoutInfo.overlay.bottom)).read(reader);
            const separatorWidth = this._input.map((i)=>i?.editorType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor ? WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH : WIDGET_SEPARATOR_WIDTH).read(reader);
            const overlayRect = overlayLayoutObs.map((l)=>l.overlay.withMargin(0, BORDER_WIDTH, BORDER_WIDTH, l.startsAtContentLeft ? 0 : BORDER_WIDTH).intersectHorizontal(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](overlayHider.left, Number.MAX_SAFE_INTEGER)));
            const underlayRect = overlayRect.map((rect)=>rect.withMargin(separatorWidth, separatorWidth));
            const editorBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._input.read(undefined)?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor);
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalUnderlayInsertion',
                    style: {
                        ...underlayRect.read(reader).toStyles(),
                        borderRadius: BORDER_RADIUS,
                        border: `${BORDER_WIDTH + separatorWidth}px solid ${editorBackground}`,
                        boxSizing: 'border-box'
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlayInsertion',
                    style: {
                        ...overlayRect.read(reader).toStyles(),
                        borderRadius: BORDER_RADIUS,
                        border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModifiedBorderColor"])(this._tabAction).map((bc)=>`${BORDER_WIDTH}px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(bc)}`),
                        boxSizing: 'border-box',
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiedBackgroundColor"])
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlayHiderInsertion',
                    style: {
                        ...overlayHider.toStyles(),
                        backgroundColor: editorBackground
                    }
                })
            ];
        })).keepUpdated(this._store);
        this._view = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: this._display
            }
        }, [
            [
                this._modifiedOverlay
            ]
        ]).keepUpdated(this._store);
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._ghostTextView = this._register(instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextView"], this._editor, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const ghostText = this._ghostText.read(reader);
            if (!ghostText) {
                return undefined;
            }
            return {
                ghostText: ghostText,
                handleInlineCompletionShown: (data)=>{
                // This is a no-op for the insertion view, as it is handled by the InlineEditsView.
                },
                warning: undefined
            };
        }), {
            extraClasses: [
                'inline-edit'
            ],
            isClickable: true,
            shouldKeepCursorStable: true
        }));
        this.isHovered = this._ghostTextView.isHovered;
        this._register(this._ghostTextView.onDidClick((e)=>{
            this._onDidClick.fire(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"](e));
        }));
        this._register(this._editorObs.createOverlayWidget({
            domNode: this._view.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const info = this._overlayLayout.read(reader);
                if (info === null) {
                    return 0;
                }
                return info.minContentWidthRequired;
            })
        }));
    }
};
InlineEditsInsertionView = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"])
], InlineEditsInsertionView);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsLineReplacementView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsLineReplacementView",
    ()=>InlineEditsLineReplacementView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/baseColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$chartsColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/chartsColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/editorColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/inputColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/listColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$menuColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/menuColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$minimapColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/minimapColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/miscColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$quickpickColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/quickpickColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$searchColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/searchColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorDom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/editorDom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/point.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/lineTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewModel$2f$inlineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/viewModel/inlineDecorations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
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
let InlineEditsLineReplacementView = class InlineEditsLineReplacementView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _edit, _editorType, _tabAction, _languageService, _themeService){
        super();
        this._editor = _editor;
        this._edit = _edit;
        this._editorType = _editorType;
        this._tabAction = _tabAction;
        this._languageService = _languageService;
        this._themeService = _themeService;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._maxPrefixTrim = this._edit.map((e, reader)=>e ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrefixTrim"])(e.replacements.flatMap((r)=>[
                    r.originalRange,
                    r.modifiedRange
                ]), e.originalRange, e.modifiedLines, this._editor.editor, reader) : undefined);
        this._modifiedLineElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const lines = [];
            let requiredWidth = 0;
            const prefixTrim = this._maxPrefixTrim.read(reader);
            const edit = this._edit.read(reader);
            if (!edit || !prefixTrim) {
                return undefined;
            }
            const maxPrefixTrim = prefixTrim.prefixTrim;
            const modifiedBubbles = rangesToBubbleRanges(edit.replacements.map((r)=>r.modifiedRange)).map((r)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](r.startLineNumber, r.startColumn - maxPrefixTrim, r.endLineNumber, r.endColumn - maxPrefixTrim));
            const textModel = this._editor.model.get();
            const startLineNumber = edit.modifiedRange.startLineNumber;
            for(let i = 0; i < edit.modifiedRange.length; i++){
                const line = document.createElement('div');
                const lineNumber = startLineNumber + i;
                const modLine = edit.modifiedLines[i].slice(maxPrefixTrim);
                const t = textModel.tokenization.tokenizeLinesAt(lineNumber, [
                    modLine
                ])?.[0];
                let tokens;
                if (t) {
                    tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenArray"].fromLineTokens(t).toLineTokens(modLine, this._languageService.languageIdCodec);
                } else {
                    tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineTokens"].createEmpty(modLine, this._languageService.languageIdCodec);
                }
                const decorations = [];
                for (const modified of modifiedBubbles.filter((b)=>b.startLineNumber === lineNumber)){
                    const validatedEndColumn = Math.min(modified.endColumn, modLine.length + 1);
                    decorations.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewModel$2f$inlineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDecoration"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](1, modified.startColumn, 1, validatedEndColumn), 'inlineCompletions-modified-bubble', 0 /* InlineDecorationType.Regular */ ));
                }
                // TODO: All lines should be rendered at once for one dom element
                const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderLines"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSource"]([
                    tokens
                ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderOptions"].fromEditor(this._editor.editor).withSetWidth(false).withScrollBeyondLastColumn(0), decorations, line, true);
                this._editor.getOption(59 /* EditorOption.fontInfo */ ).read(reader); // update when font info changes
                requiredWidth = Math.max(requiredWidth, result.minWidthInPx);
                lines.push(line);
            }
            return {
                lines,
                requiredWidth: requiredWidth
            };
        });
        this._layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const modifiedLines = this._modifiedLineElements.read(reader);
            const maxPrefixTrim = this._maxPrefixTrim.read(reader);
            const edit = this._edit.read(reader);
            if (!modifiedLines || !maxPrefixTrim || !edit) {
                return undefined;
            }
            const { prefixLeftOffset } = maxPrefixTrim;
            const { requiredWidth } = modifiedLines;
            const originalLineHeights = this._editor.observeLineHeightsForLineRange(edit.originalRange).read(reader);
            const modifiedLineHeights = (()=>{
                const lineHeights = originalLineHeights.slice(0, edit.modifiedRange.length);
                while(lineHeights.length < edit.modifiedRange.length){
                    lineHeights.push(originalLineHeights[originalLineHeights.length - 1]);
                }
                return lineHeights;
            })();
            const contentLeft = this._editor.layoutInfoContentLeft.read(reader);
            const verticalScrollbarWidth = this._editor.layoutInfoVerticalScrollbarWidth.read(reader);
            const scrollLeft = this._editor.scrollLeft.read(reader);
            const scrollTop = this._editor.scrollTop.read(reader);
            const editorLeftOffset = contentLeft - scrollLeft;
            const textModel = this._editor.editor.getModel();
            const originalLineWidths = edit.originalRange.mapToLineArray((line)=>this._editor.editor.getOffsetForColumn(line, textModel.getLineMaxColumn(line)) - prefixLeftOffset);
            const maxLineWidth = Math.max(...originalLineWidths, requiredWidth);
            const startLineNumber = edit.originalRange.startLineNumber;
            const endLineNumber = edit.originalRange.endLineNumberExclusive - 1;
            const topOfOriginalLines = this._editor.editor.getTopForLineNumber(startLineNumber) - scrollTop;
            const bottomOfOriginalLines = this._editor.editor.getBottomForLineNumber(endLineNumber) - scrollTop;
            // Box Widget positioning
            const originalLinesOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(editorLeftOffset + prefixLeftOffset, topOfOriginalLines, maxLineWidth, bottomOfOriginalLines - topOfOriginalLines);
            const modifiedLinesOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(originalLinesOverlay.left, originalLinesOverlay.bottom, originalLinesOverlay.width, modifiedLineHeights.reduce((sum, h)=>sum + h, 0));
            const background = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].hull([
                originalLinesOverlay,
                modifiedLinesOverlay
            ]);
            const lowerBackground = background.intersectVertical(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](originalLinesOverlay.bottom, Number.MAX_SAFE_INTEGER));
            const lowerText = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"](lowerBackground.left, lowerBackground.top, lowerBackground.right, lowerBackground.bottom);
            return {
                originalLinesOverlay,
                modifiedLinesOverlay,
                background,
                lowerBackground,
                lowerText,
                modifiedLineHeights,
                minContentWidthRequired: prefixLeftOffset + maxLineWidth + verticalScrollbarWidth
            };
        });
        this._viewZoneInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const shouldShowViewZone = this._editor.getOption(71 /* EditorOption.inlineSuggest */ ).map((o)=>o.edits.allowCodeShifting === 'always').read(reader);
            if (!shouldShowViewZone) {
                return undefined;
            }
            const layout = this._layout.read(reader);
            const edit = this._edit.read(reader);
            if (!layout || !edit) {
                return undefined;
            }
            const viewZoneHeight = layout.lowerBackground.height;
            const viewZoneLineNumber = edit.originalRange.endLineNumberExclusive;
            return {
                height: viewZoneHeight,
                lineNumber: viewZoneLineNumber
            };
        });
        this.minEditorScrollHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._layout).read(reader);
            if (!layout || this._viewZoneInfo.read(reader) !== undefined) {
                return 0;
            }
            return layout.read(reader).lowerText.bottom + this._editor.editor.getScrollTop();
        });
        this._div = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'line-replacement'
        }, [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._layout).read(reader);
                const modifiedLineElements = this._modifiedLineElements.read(reader);
                if (!layout || !modifiedLineElements) {
                    return [];
                }
                const layoutProps = layout.read(reader);
                const contentLeft = this._editor.layoutInfoContentLeft.read(reader);
                const separatorWidth = this._editorType.read(reader) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor ? 3 : 1;
                modifiedLineElements.lines.forEach((l, i)=>{
                    l.style.width = `${layoutProps.lowerText.width}px`;
                    l.style.height = `${layoutProps.modifiedLineHeights[i]}px`;
                    l.style.position = 'relative';
                });
                const modifiedBorderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModifiedBorderColor"])(this._tabAction).read(reader);
                const originalBorderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalBorderColor"])(this._tabAction).read(reader);
                const editorBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._editorType.read(reader));
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        style: {
                            position: 'absolute',
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorValidOverlayRect"])(this._editor).read(r)),
                            overflow: 'hidden',
                            pointerEvents: 'none'
                        }
                    }, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            class: 'borderAroundLineReplacement',
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).background.translateX(-contentLeft).withMargin(separatorWidth)),
                                borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                border: `${separatorWidth + 1}px solid ${editorBackground}`,
                                boxSizing: 'border-box',
                                pointerEvents: 'none'
                            }
                        }),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            class: 'originalOverlayLineReplacement',
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).background.translateX(-contentLeft)),
                                borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(originalBorderColor, this._themeService).map((c)=>`1px solid ${c.toString()}`),
                                pointerEvents: 'none',
                                boxSizing: 'border-box',
                                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalBackgroundColor"])
                            }
                        }),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            class: 'modifiedOverlayLineReplacement',
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).lowerBackground.translateX(-contentLeft)),
                                borderRadius: `0 0 ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                background: editorBackground,
                                boxShadow: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrollbarShadow"])} 0 6px 6px -6px`,
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(modifiedBorderColor)}`,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                pointerEvents: 'auto'
                            },
                            onmousedown: (e)=>{
                                e.preventDefault(); // This prevents that the editor loses focus
                            },
                            onclick: (e)=>this._onDidClick.fire(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"].create(e))
                        }, [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiedChangedLineBackgroundColor"])
                                }
                            })
                        ]),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            class: 'modifiedLinesLineReplacement',
                            style: {
                                position: 'absolute',
                                boxSizing: 'border-box',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).lowerText.translateX(-contentLeft)),
                                fontFamily: this._editor.getOption(58 /* EditorOption.fontFamily */ ),
                                fontSize: this._editor.getOption(61 /* EditorOption.fontSize */ ),
                                fontWeight: this._editor.getOption(62 /* EditorOption.fontWeight */ ),
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap',
                                borderRadius: `0 0 ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                overflow: 'hidden'
                            }
                        }, [
                            ...modifiedLineElements.lines
                        ])
                    ])
                ];
            })
        ]).keepUpdated(this._store);
        this.isHovered = this._editor.isTargetHovered((e)=>this._isMouseOverWidget(e), this._store);
        this._previousViewZoneInfo = undefined;
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>this._editor.editor.changeViewZones((accessor)=>this.removePreviousViewZone(accessor))));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorunDelta"])(this._viewZoneInfo, ({ lastValue, newValue })=>{
            if (lastValue === newValue || lastValue?.height === newValue?.height && lastValue?.lineNumber === newValue?.lineNumber) {
                return;
            }
            this._editor.editor.changeViewZones((changeAccessor)=>{
                this.removePreviousViewZone(changeAccessor);
                if (!newValue) {
                    return;
                }
                this.addViewZone(newValue, changeAccessor);
            });
        }));
        this._register(this._editor.createOverlayWidget({
            domNode: this._div.element,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                return this._layout.read(reader)?.minContentWidthRequired ?? 0;
            }),
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])({
                preference: {
                    top: 0,
                    left: 0
                }
            }),
            allowEditorOverflow: false
        }));
    }
    _isMouseOverWidget(e) {
        const layout = this._layout.get();
        if (!layout || !(e.event instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorDom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorMouseEvent"])) {
            return false;
        }
        return layout.lowerBackground.containsPoint(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Point"](e.event.relativePos.x, e.event.relativePos.y));
    }
    removePreviousViewZone(changeAccessor) {
        if (!this._previousViewZoneInfo) {
            return;
        }
        changeAccessor.removeZone(this._previousViewZoneInfo.id);
        const cursorLineNumber = this._editor.cursorLineNumber.get();
        if (cursorLineNumber !== null && cursorLineNumber >= this._previousViewZoneInfo.lineNumber) {
            this._editor.editor.setScrollTop(this._editor.scrollTop.get() - this._previousViewZoneInfo.height);
        }
        this._previousViewZoneInfo = undefined;
    }
    addViewZone(viewZoneInfo, changeAccessor) {
        const activeViewZone = changeAccessor.addZone({
            afterLineNumber: viewZoneInfo.lineNumber - 1,
            heightInPx: viewZoneInfo.height,
            domNode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('div')
        });
        this._previousViewZoneInfo = {
            height: viewZoneInfo.height,
            lineNumber: viewZoneInfo.lineNumber,
            id: activeViewZone
        };
        const cursorLineNumber = this._editor.cursorLineNumber.get();
        if (cursorLineNumber !== null && cursorLineNumber >= viewZoneInfo.lineNumber) {
            this._editor.editor.setScrollTop(this._editor.scrollTop.get() + viewZoneInfo.height);
        }
    }
};
InlineEditsLineReplacementView = __decorate([
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"])
], InlineEditsLineReplacementView);
function rangesToBubbleRanges(ranges) {
    const result = [];
    while(ranges.length){
        let range = ranges.shift();
        if (range.startLineNumber !== range.endLineNumber) {
            ranges.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.startLineNumber + 1, 1, range.endLineNumber, range.endColumn));
            range = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.startLineNumber, range.startColumn, range.startLineNumber, Number.MAX_SAFE_INTEGER); // TODO: this is not correct
        }
        result.push(range);
    }
    return result;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/flexBoxLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "distributeFlexBoxLayout",
    ()=>distributeFlexBoxLayout
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Distributes a total size into parts that each have a list of growth rules.
 * Returns `null` if the layout is not possible.
 * The sum of all returned sizes will be equal to `totalSize`.
 *
 * First, each part gets its minimum size.
 * Then, remaining space is distributed to the rules with the highest priority, as long as the max constraint allows it (considering share).
 * This continues with next lower priority rules until no space is left.
*/ function distributeFlexBoxLayout(totalSize, parts) {
    // Normalize parts to always have array of rules
    const normalizedParts = {};
    for (const [key, part] of Object.entries(parts)){
        if (Array.isArray(part)) {
            normalizedParts[key] = {
                min: 0,
                rules: part
            };
        } else {
            normalizedParts[key] = {
                min: part.min ?? 0,
                rules: part.rules ?? [
                    {
                        max: part.max,
                        priority: part.priority,
                        share: part.share
                    }
                ]
            };
        }
    }
    // Initialize result with minimum sizes
    const result = {};
    let usedSize = 0;
    for (const [key, part] of Object.entries(normalizedParts)){
        result[key] = part.min;
        usedSize += part.min;
    }
    // Check if we can satisfy minimum constraints
    if (usedSize > totalSize) {
        return null;
    }
    let remainingSize = totalSize - usedSize;
    // Distribute remaining space by priority levels
    while(remainingSize > 0){
        // Find all rules at current highest priority that can still grow
        const candidateRules = [];
        for (const [key, part] of Object.entries(normalizedParts)){
            for(let i = 0; i < part.rules.length; i++){
                const rule = part.rules[i];
                const currentUsage = result[key];
                const maxSize = rule.max ?? Infinity;
                if (currentUsage < maxSize) {
                    candidateRules.push({
                        partKey: key,
                        ruleIndex: i,
                        rule,
                        priority: rule.priority ?? 0,
                        share: rule.share ?? 1
                    });
                }
            }
        }
        if (candidateRules.length === 0) {
            break;
        }
        // Find the highest priority among candidates
        const maxPriority = Math.max(...candidateRules.map((c)=>c.priority));
        const highestPriorityCandidates = candidateRules.filter((c)=>c.priority === maxPriority);
        // Calculate total share
        const totalShare = highestPriorityCandidates.reduce((sum, c)=>sum + c.share, 0);
        // Distribute space proportionally by share
        let distributedThisRound = 0;
        const distributions = [];
        for (const candidate of highestPriorityCandidates){
            const rule = candidate.rule;
            const currentUsage = result[candidate.partKey];
            const maxSize = rule.max ?? Infinity;
            const availableForThisRule = maxSize - currentUsage;
            // Calculate ideal share
            const idealShare = remainingSize * candidate.share / totalShare;
            const actualAmount = Math.min(idealShare, availableForThisRule);
            distributions.push({
                partKey: candidate.partKey,
                ruleIndex: candidate.ruleIndex,
                amount: actualAmount
            });
            distributedThisRound += actualAmount;
        }
        if (distributedThisRound === 0) {
            break;
        }
        // Apply distributions
        for (const dist of distributions){
            result[dist.partKey] += dist.amount;
        }
        remainingSize -= distributedThisRound;
        // Break if remaining is negligible (floating point precision)
        if (remainingSize < 0.0001) {
            break;
        }
    }
    return result;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/jumpToView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JumpToView",
    ()=>JumpToView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$browser$2f$defaultStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/browser/defaultStyles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$debugLocation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/debugLocation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
let JumpToView = class JumpToView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, options, _data, _themeService, _keybindingService, _contextKeyService){
        super();
        this._editor = _editor;
        this._data = _data;
        this._themeService = _themeService;
        this._keybindingService = _keybindingService;
        this._contextKeyService = _contextKeyService;
        this._styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>({
                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBackground"], this._themeService).read(reader).toString(),
                foreground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryForeground"], this._themeService).read(reader).toString(),
                border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBorder"], this._themeService).read(reader).toString()
            }));
        this._pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            return this._editor.observePosition((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>this._data.read(reader)?.jumpToPosition || null), reader.store);
        }).flatten();
        this._layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const data = this._data.read(reader);
            if (!data) {
                return undefined;
            }
            const position = data.jumpToPosition;
            const lineHeight = this._editor.observeLineHeightForLine((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(position.lineNumber)).read(reader);
            const scrollLeft = this._editor.scrollLeft.read(reader);
            const point = this._pos.read(reader);
            if (!point) {
                return undefined;
            }
            const layout = this._editor.layoutInfo.read(reader);
            const widgetRect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(point.x + layout.contentLeft + 2 - scrollLeft, point.y, 100, lineHeight);
            return {
                widgetRect
            };
        });
        this._blink = animateFixedValues([
            {
                value: true,
                durationMs: 600
            },
            {
                value: false,
                durationMs: 600
            }
        ]);
        this._widget = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edit-jump-to-widget',
            style: {
                position: 'absolute',
                display: this._layout.map((l)=>l ? 'flex' : 'none'),
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>this._layout.read(reader)?.widgetRect)
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            if (this._data.read(reader) === undefined) {
                return [];
            }
            // Main content container with rounded border
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0 4px',
                    height: '100%',
                    backgroundColor: this._styles.map((s)=>s.background),
                    ['--vscodeIconForeground']: this._styles.map((s)=>s.foreground),
                    border: this._styles.map((s)=>`1px solid ${s.border}`),
                    borderRadius: '3px',
                    boxSizing: 'border-box',
                    fontSize: '11px',
                    color: this._styles.map((s)=>s.foreground)
                }
            }, [
                this._style === 'cursor' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('div', {
                    style: {
                        borderLeft: '2px solid',
                        height: 14,
                        opacity: this._blink.map((b)=>b ? '0' : '1')
                    }
                }) : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('div', {}, keybindingLabel(this._keybinding))),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('div', {
                        style: {
                            lineHeight: this._layout.map((l)=>l?.widgetRect.height),
                            marginTop: '-2px'
                        }
                    }, [
                        'to jump'
                    ])
                ]
            ]);
        }));
        this._style = options.style;
        this._keybinding = this._getKeybinding(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineSuggestCommitId"]);
        const widget = this._widget.keepUpdated(this._store);
        this._register(this._editor.createOverlayWidget({
            domNode: widget.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0)
        }));
        this._register(this._editor.setDecorations((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const data = this._data.read(reader);
            if (!data) {
                return [];
            }
            // use injected text at position
            return [
                {
                    range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(data.jumpToPosition, data.jumpToPosition),
                    options: {
                        description: 'inline-edit-jump-to-decoration',
                        inlineClassNameAffectsLetterSpacing: true,
                        showIfCollapsed: true,
                        after: {
                            content: this._style === 'label' ? '          ' : '  '
                        }
                    }
                }
            ];
        })));
    }
    _getKeybinding(commandId, debugLocation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$debugLocation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebugLocation"].ofCaller()) {
        if (!commandId) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(undefined);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this, this._contextKeyService.onDidChangeContext, ()=>this._keybindingService.lookupKeybinding(commandId), debugLocation);
    // TODO: use contextkeyservice to use different renderings
    }
};
JumpToView = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"])
], JumpToView);
function animateFixedValues(values, debugLocation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$debugLocation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebugLocation"].ofCaller()) {
    let idx = 0;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(undefined, (l)=>{
        idx = 0;
        const timer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RunOnceScheduler"](()=>{
            idx = (idx + 1) % values.length;
            l(null);
            timer.schedule(values[idx].durationMs);
        }, 0);
        timer.schedule(0);
        return timer;
    }, ()=>{
        return values[idx].value;
    }, debugLocation);
}
function keybindingLabel(keybinding) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((_reader)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            style: {},
            ref: (elem)=>{
                const keybindingLabel = _reader.store.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeybindingLabel"](elem, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OS"], {
                    disableTitle: true,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$browser$2f$defaultStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultKeybindingLabelStyles"],
                    keybindingLabelShadow: undefined,
                    keybindingLabelForeground: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryForeground"]),
                    keybindingLabelBackground: 'transparent',
                    keybindingLabelBorder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryForeground"]),
                    keybindingLabelBottomBorder: undefined
                }));
                _reader.store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
                    keybindingLabel.set(keybinding.read(reader));
                }));
            }
        }));
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/longDistancePreviewEditor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LongDistancePreviewEditor",
    ()=>LongDistancePreviewEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$numbers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/numbers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$embeddedCodeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/codeEditor/embeddedCodeEditorWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/inlineCompletionContextKeys.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$jumpToView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/jumpToView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/textModelValueReference.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
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
/**
 * Widens the previewed range around `targetLineNumber` by `contextLineCount` lines on each side,
 * clamped to the model bounds. With `contextLineCount === 0` this returns just the target line.
 */ function expandLineRangeWithContext(targetLineNumber, contextLineCount, lineCount) {
    const clampedTarget = Math.max(1, Math.min(lineCount, targetLineNumber));
    const startLineNumber = Math.max(1, clampedTarget - contextLineCount);
    const endLineNumberExclusive = Math.min(lineCount + 1, clampedTarget + contextLineCount + 1);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](startLineNumber, endLineNumberExclusive);
}
let LongDistancePreviewEditor = class LongDistancePreviewEditor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_previewTextModel, _properties, _parentEditor, _tabAction, _instantiationService){
        super();
        this._previewTextModel = _previewTextModel;
        this._properties = _properties;
        this._parentEditor = _parentEditor;
        this._tabAction = _tabAction;
        this._instantiationService = _instantiationService;
        this._previewRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].ref();
        this.element = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'preview',
            style: {},
            ref: this._previewRef
        });
        this._state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const props = this._properties.read(reader);
            if (!props) {
                return undefined;
            }
            let mode;
            let targetLineNumber;
            if (props.nextCursorPosition !== null) {
                mode = 'original';
                targetLineNumber = props.nextCursorPosition.lineNumber;
            } else {
                if (props.diff[0].innerChanges?.every((c)=>c.modifiedRange.isEmpty())) {
                    mode = 'original';
                    targetLineNumber = props.diff[0].original.startLineNumber;
                } else {
                    mode = 'modified';
                    targetLineNumber = props.diff[0].modified.startLineNumber;
                }
            }
            const textModel = mode === 'modified' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelValueReference"].snapshot(this._previewTextModel) : props.target;
            // Optionally widen the previewed range with surrounding context lines (e.g. when the target line is empty).
            const contextLineCount = this._parentEditorObs.getOption(71 /* EditorOption.inlineSuggest */ ).read(reader).edits.longDistanceHintContextLineCount;
            const displayModel = mode === 'modified' ? this._previewTextModel : props.target.dangerouslyGetUnderlyingModel();
            const visibleLineRange = expandLineRangeWithContext(targetLineNumber, contextLineCount, displayModel.getLineCount());
            return {
                mode,
                targetLineNumber,
                visibleLineRange,
                textModel,
                diff: props.diff
            };
        });
        this.updatePreviewEditorEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            // this._widgetContent.readEffect(reader);
            this._previewEditorObs.model.read(reader); // update when the model is set
            const range = this._state.read(reader)?.visibleLineRange;
            if (!range) {
                return;
            }
            const hiddenAreas = [];
            if (range.startLineNumber > 1) {
                hiddenAreas.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](1, 1, range.startLineNumber - 1, 1));
            }
            if (range.endLineNumberExclusive < this._previewTextModel.getLineCount() + 1) {
                hiddenAreas.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.endLineNumberExclusive, 1, this._previewTextModel.getLineCount() + 1, 1));
            }
            this.previewEditor.setHiddenAreas(hiddenAreas, undefined, true);
        });
        this.horizontalContentRangeInPreviewEditorToShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            return this._getHorizontalContentRangeInPreviewEditorToShow(this.previewEditor, reader);
        });
        this.contentHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const viewState = this._state.read(reader);
            if (!viewState) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null);
            }
            return this._previewEditorObs.observeLineHeightsForLineRange(viewState.visibleLineRange).map((heights)=>heights.reduce((sum, height)=>sum + height, 0));
        }).flatten();
        this._editorDecorations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return undefined;
            }
            const diff = {
                diff: state.diff
            };
            const originalDecorations = [];
            const modifiedDecorations = [];
            const diffWholeLineDeleteDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-delete',
                description: 'char-delete',
                isWholeLine: false,
                zIndex: 1
            });
            const diffWholeLineAddDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-insert',
                description: 'char-insert',
                isWholeLine: true
            });
            const diffAddDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-insert',
                description: 'char-insert',
                shouldFillLineOnLineBreak: true
            });
            for (const m of diff.diff){
                if (m.modified.isEmpty || m.original.isEmpty) {
                    if (!m.original.isEmpty) {
                        originalDecorations.push({
                            range: m.original.toInclusiveRange(),
                            options: diffWholeLineDeleteDecoration
                        });
                    }
                    if (!m.modified.isEmpty) {
                        modifiedDecorations.push({
                            range: m.modified.toInclusiveRange(),
                            options: diffWholeLineAddDecoration
                        });
                    }
                } else {
                    for (const i of m.innerChanges || []){
                        // Don't show empty markers outside the line range
                        if (m.original.contains(i.originalRange.startLineNumber) && !i.originalRange.isEmpty()) {
                            originalDecorations.push({
                                range: i.originalRange,
                                options: {
                                    description: 'char-delete',
                                    shouldFillLineOnLineBreak: false,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classNames"])('inlineCompletions-char-delete', // i.originalRange.isSingleLine() && diff.mode === 'insertionInline' && 'single-line-inline',
                                    i.originalRange.isEmpty() && 'empty'),
                                    zIndex: 1
                                }
                            });
                        }
                        if (m.modified.contains(i.modifiedRange.startLineNumber)) {
                            modifiedDecorations.push({
                                range: i.modifiedRange,
                                options: diffAddDecoration
                            });
                        }
                    }
                }
            }
            return {
                originalDecorations,
                modifiedDecorations
            };
        });
        this.previewEditor = this._register(this._createPreviewEditor());
        this._parentEditorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._parentEditor);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const tm = this._state.read(reader)?.textModel || null;
            if (tm) {
                // Avoid transitions from tm -> null -> tm, where tm -> tm would be a no-op.
                this.previewEditor.setModel(tm.dangerouslyGetUnderlyingModel());
            }
        }));
        this._previewEditorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this.previewEditor);
        this._register(this._previewEditorObs.setDecorations((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const state = this._state.read(reader);
            const decorations = this._editorDecorations.read(reader);
            return (state?.mode === 'original' ? decorations?.originalDecorations : decorations?.modifiedDecorations) ?? [];
        })));
        // Mirror the cursor position. Allows the gutter arrow to point in the correct direction.
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            if (!this._properties.read(reader)) {
                return;
            }
            const cursorPosition = this._parentEditorObs.cursorPosition.read(reader);
            if (cursorPosition) {
                this.previewEditor.setPosition(this._previewTextModel.validatePosition(cursorPosition), 'longDistanceHintPreview');
            }
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return;
            }
            // Ensure there is enough space to the left of the line number for the gutter indicator to fits.
            const lineNumberDigets = (state.visibleLineRange.endLineNumberExclusive - 1).toString().length;
            this.previewEditor.updateOptions({
                lineNumbersMinChars: lineNumberDigets + 1
            });
        }));
        this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsGutterIndicator"], this._previewEditorObs, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const state = this._state.read(reader);
            if (!state) {
                return undefined;
            }
            const props = this._properties.read(reader);
            if (!props) {
                return undefined;
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsGutterIndicatorData"](props.inlineSuggestInfo, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(state.targetLineNumber, 1), props.model, undefined);
        }), this._tabAction, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(false), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false)));
        this.updatePreviewEditorEffect.recomputeInitiallyAndOnChange(this._store);
    }
    _createPreviewEditor() {
        return this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$embeddedCodeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedCodeEditorWidget"], this._previewRef.element, {
            glyphMargin: false,
            lineNumbers: 'on',
            minimap: {
                enabled: false
            },
            guides: {
                indentation: false,
                bracketPairs: false,
                bracketPairsHorizontal: false,
                highlightActiveIndentation: false
            },
            editContext: false,
            rulers: [],
            padding: {
                top: 0,
                bottom: 0
            },
            //folding: false,
            selectOnLineNumbers: false,
            selectionHighlight: false,
            columnSelection: false,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            //lineDecorationsWidth: 0,
            //lineNumbersMinChars: 0,
            revealHorizontalRightPadding: 0,
            bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: false
            },
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
                handleMouseWheel: false
            },
            readOnly: true,
            wordWrap: 'off',
            wordWrapOverride1: 'off',
            wordWrapOverride2: 'off'
        }, {
            contextKeyValues: {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionContextKeys"].inInlineEditsPreviewEditor.key]: true
            },
            contributions: []
        }, this._parentEditor);
    }
    _getHorizontalContentRangeInPreviewEditorToShow(editor, reader) {
        const state = this._state.read(reader);
        if (!state) {
            return undefined;
        }
        const diff = state.diff;
        const jumpToPos = this._properties.read(reader)?.nextCursorPosition;
        const visibleRange = state.visibleLineRange;
        const l = this._previewEditorObs.layoutInfo.read(reader);
        const trueContentWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._previewEditorObs, visibleRange, reader);
        let firstCharacterChange;
        if (jumpToPos) {
            firstCharacterChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(jumpToPos);
        } else if (diff[0].innerChanges) {
            firstCharacterChange = state.mode === 'modified' ? diff[0].innerChanges[0].modifiedRange : diff[0].innerChanges[0].originalRange;
        } else {
            return undefined;
        }
        // find the horizontal range we want to show.
        const preferredRange = growUntilVariableBoundaries(editor.getModel(), firstCharacterChange, 5);
        const leftOffset = this._previewEditorObs.getLeftOfPosition(preferredRange.getStartPosition(), reader);
        const rightOffset = this._previewEditorObs.getLeftOfPosition(preferredRange.getEndPosition(), reader);
        const left = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$numbers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(leftOffset, 0, trueContentWidth);
        const right = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$numbers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(rightOffset, left, trueContentWidth);
        const indentCol = editor.getModel().getLineFirstNonWhitespaceColumn(preferredRange.startLineNumber);
        const indentationEnd = this._previewEditorObs.getLeftOfPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](preferredRange.startLineNumber, indentCol), reader);
        const preferredRangeToReveal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](left, right);
        return {
            indentationEnd,
            preferredRangeToReveal,
            maxEditorWidth: trueContentWidth + l.contentLeft,
            contentWidth: trueContentWidth,
            nonContentWidth: l.contentLeft
        };
    }
    layout(dimension, desiredPreviewEditorScrollLeft) {
        this.previewEditor.layout(dimension);
        this._previewEditorObs.editor.setScrollLeft(desiredPreviewEditorScrollLeft);
    }
};
LongDistancePreviewEditor = __decorate([
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"])
], LongDistancePreviewEditor);
/*
 * Grows the range on each ends until it includes a none-variable-name character
 * or the next character would be a whitespace character
 * or the maxGrow limit is reached
 */ function growUntilVariableBoundaries(textModel, range, maxGrow) {
    const startPosition = range.getStartPosition();
    const endPosition = range.getEndPosition();
    const line = textModel.getLineContent(startPosition.lineNumber);
    function isVariableNameCharacter(col) {
        const char = line.charAt(col - 1);
        return /[a-zA-Z0-9_]/.test(char);
    }
    function isWhitespace(col) {
        const char = line.charAt(col - 1);
        return char === ' ' || char === '\t';
    }
    let startColumn = startPosition.column;
    while(startColumn > 1 && isVariableNameCharacter(startColumn) && !isWhitespace(startColumn - 1) && startPosition.column - startColumn < maxGrow){
        startColumn--;
    }
    let endColumn = endPosition.column - 1;
    while(endColumn <= line.length && isVariableNameCharacter(endColumn) && !isWhitespace(endColumn + 1) && endColumn - endPosition.column < maxGrow){
        endColumn++;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](startPosition.lineNumber, startColumn, endPosition.lineNumber, endColumn + 1);
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/towersLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMaxTowerHeightInAvailableArea",
    ()=>getMaxTowerHeightInAvailableArea
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * The tower areas are arranged from left to right, touch and are aligned at the bottom.
 * How high can a tower be placed at the requested horizontal range, so that its size fits into the union of the stacked availableTowerAreas?
 */ function getMaxTowerHeightInAvailableArea(towerHorizontalRange, availableTowerAreas) {
    const towerLeftOffset = towerHorizontalRange.start;
    const towerRightOffset = towerHorizontalRange.endExclusive;
    let minHeight = Number.MAX_VALUE;
    // Calculate the accumulated width to find which tower areas the requested tower overlaps
    let currentLeftOffset = 0;
    for (const availableArea of availableTowerAreas){
        const currentRightOffset = currentLeftOffset + availableArea.width;
        // Check if the requested tower overlaps with this available area
        const overlapLeft = Math.max(towerLeftOffset, currentLeftOffset);
        const overlapRight = Math.min(towerRightOffset, currentRightOffset);
        if (overlapLeft < overlapRight) {
            // There is an overlap - track the minimum height
            minHeight = Math.min(minHeight, availableArea.height);
        }
        currentLeftOffset = currentRightOffset;
    }
    if (towerRightOffset > currentLeftOffset) {
        return 0;
    }
    // If no overlap was found, return 0
    return minHeight === Number.MAX_VALUE ? 0 : minHeight;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/longDistnaceWidgetPlacement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetPlacementContext",
    ()=>WidgetPlacementContext,
    "splitIntoContinuousLineRanges",
    ()=>splitIntoContinuousLineRanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$towersLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/towersLayout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Context for computing widget placement within a continuous line range.
 */ class WidgetPlacementContext {
    constructor(_lineRangeInfo, editorTrueContentWidth, endOfLinePadding){
        this._lineRangeInfo = _lineRangeInfo;
        this.availableSpaceSizes = _lineRangeInfo.sizes.map((s, idx)=>{
            const lineNumber = _lineRangeInfo.lineRange.startLineNumber + idx;
            const linePaddingLeft = endOfLinePadding(lineNumber);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size2D"](Math.max(0, editorTrueContentWidth - s.width - linePaddingLeft), s.height);
        });
        this.availableSpaceHeightPrefixSums = getSums(this.availableSpaceSizes, (s)=>s.height);
        this.availableSpaceSizesTransposed = this.availableSpaceSizes.map((s)=>s.transpose());
    }
    /**
     * Computes the vertical outline for a widget placed at the given line number.
     */ getWidgetVerticalOutline(lineNumber, previewEditorHeight, layoutConstants) {
        const sizeIdx = lineNumber - this._lineRangeInfo.lineRange.startLineNumber;
        const top = this._lineRangeInfo.top + this.availableSpaceHeightPrefixSums[sizeIdx];
        const editorRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].ofStartAndLength(top, previewEditorHeight);
        const { previewEditorMargin, widgetPadding, widgetBorder, lowerBarHeight } = layoutConstants;
        const verticalWidgetRange = editorRange.withMargin(previewEditorMargin + widgetPadding + widgetBorder).withMargin(0, lowerBarHeight);
        return verticalWidgetRange;
    }
    /**
     * Tries to find a valid widget outline within this line range context.
     */ tryFindWidgetOutline(targetLineNumber, previewEditorHeight, editorTrueContentRight, layoutConstants) {
        if (this._lineRangeInfo.lineRange.length < 3) {
            return undefined;
        }
        return findFirstMinimzeDistance(this._lineRangeInfo.lineRange.addMargin(-1, -1), targetLineNumber, (lineNumber)=>{
            const verticalWidgetRange = this.getWidgetVerticalOutline(lineNumber, previewEditorHeight, layoutConstants);
            const maxWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$towersLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxTowerHeightInAvailableArea"])(verticalWidgetRange.delta(-this._lineRangeInfo.top), this.availableSpaceSizesTransposed);
            if (maxWidth < layoutConstants.minWidgetWidth) {
                return undefined;
            }
            const horizontalWidgetRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].ofStartAndLength(editorTrueContentRight - maxWidth, maxWidth);
            return {
                horizontalWidgetRange,
                verticalWidgetRange
            };
        });
    }
}
/**
 * Splits line size information into continuous ranges, breaking at positions where
 * the expected vertical position differs from the actual position (e.g., due to folded regions).
 */ function splitIntoContinuousLineRanges(lineRange, sizes, top, editorObs, reader) {
    const result = [];
    let currentRangeStart = lineRange.startLineNumber;
    let currentRangeTop = top;
    let currentSizes = [];
    for(let i = 0; i < sizes.length; i++){
        const lineNumber = lineRange.startLineNumber + i;
        const expectedTop = currentRangeTop + currentSizes.reduce((p, c)=>p + c.height, 0);
        const actualTop = editorObs.editor.getTopForLineNumber(lineNumber);
        if (i > 0 && actualTop !== expectedTop) {
            // Discontinuity detected - push the current range and start a new one
            result.push({
                lineRange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(currentRangeStart, lineNumber - currentRangeStart),
                top: currentRangeTop,
                sizes: currentSizes
            });
            currentRangeStart = lineNumber;
            currentRangeTop = actualTop;
            currentSizes = [];
        }
        currentSizes.push(sizes[i]);
    }
    // Push the final range
    result.push({
        lineRange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(currentRangeStart, lineRange.endLineNumberExclusive - currentRangeStart),
        top: currentRangeTop,
        sizes: currentSizes
    });
    // Don't observe each line individually for performance reasons
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])({
        owner: 'splitIntoContinuousLineRanges'
    }, (r)=>{
        return editorObs.observeTopForLineNumber(lineRange.endLineNumberExclusive - 1).read(r);
    }).read(reader);
    return result;
}
function findFirstMinimzeDistance(range, targetLine, predicate) {
    for(let offset = 0;; offset++){
        const down = targetLine + offset;
        if (down <= range.endLineNumberExclusive) {
            const result = predicate(down);
            if (result !== undefined) {
                return result;
            }
        }
        const up = targetLine - offset;
        if (up >= range.startLineNumber) {
            const result = predicate(up);
            if (result !== undefined) {
                return result;
            }
        }
        if (up < range.startLineNumber && down > range.endLineNumberExclusive) {
            return undefined;
        }
    }
}
function getSums(array, fn) {
    const result = [
        0
    ];
    let sum = 0;
    for (const item of array){
        sum += fn(item);
        result.push(sum);
    }
    return result;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/inlineEditsLongDistanceHint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsLongDistanceHint",
    ()=>InlineEditsLongDistanceHint,
    "scrollToReveal",
    ()=>scrollToReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$features$2f$hideUnchangedRegionsFeature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/features/hideUnchangedRegionsFeature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconLabels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$flexBoxLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/flexBoxLayout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/baseColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$chartsColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/chartsColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/editorColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/inputColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/listColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$menuColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/menuColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$minimapColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/minimapColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/miscColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$quickpickColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/quickpickColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$searchColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/searchColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistancePreviewEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/longDistancePreviewEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistnaceWidgetPlacement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/longDistnaceWidgetPlacement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/resources.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/model.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$getIconClasses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/getIconClasses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$files$2f$common$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/files/common/files.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
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
const BORDER_RADIUS = 6;
const MAX_WIDGET_WIDTH = {
    EMPTY_SPACE: 425,
    OVERLAY: 375
};
const MIN_WIDGET_WIDTH = 250;
const DEFAULT_WIDGET_LAYOUT_CONSTANTS = {
    previewEditorMargin: 2,
    widgetPadding: 2,
    widgetBorder: 1,
    lowerBarHeight: 20,
    minWidgetWidth: MIN_WIDGET_WIDTH
};
let InlineEditsLongDistanceHint = class InlineEditsLongDistanceHint extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _viewState, _previewTextModel, _tabAction, _instantiationService, _themeService, _keybindingService, _modelService, _languageService){
        super();
        this._editor = _editor;
        this._viewState = _viewState;
        this._previewTextModel = _previewTextModel;
        this._tabAction = _tabAction;
        this._instantiationService = _instantiationService;
        this._themeService = _themeService;
        this._keybindingService = _keybindingService;
        this._modelService = _modelService;
        this._languageService = _languageService;
        this.onDidClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].None;
        this._viewWithElement = undefined;
        this._hintTextPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const viewState = this._viewState.read(reader);
            return viewState ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](viewState.hint.lineNumber, Number.MAX_SAFE_INTEGER) : null;
        });
        this._lineSizesAroundHintPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const viewState = this._viewState.read(reader);
            const p = this._hintTextPosition.read(reader);
            if (!viewState || !p) {
                return [];
            }
            const model = this._editorObs.model.read(reader);
            if (!model) {
                return [];
            }
            const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(p.lineNumber, 1).addMargin(5, 5).intersect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(1, model.getLineCount()));
            if (!range) {
                return [];
            }
            const sizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContentSizeOfLines"])(this._editorObs, range, reader);
            const top = this._editorObs.observeTopForLineNumber(range.startLineNumber).read(reader);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistnaceWidgetPlacement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitIntoContinuousLineRanges"])(range, sizes, top, this._editorObs, reader);
        });
        this._isVisibleDelayed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debouncedObservable2"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._viewState.read(reader)?.hint.isVisible), (lastValue, newValue)=>lastValue === true && newValue === false ? 200 : 0);
        this._previewEditorLayoutInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const viewState = this._viewState.read(reader);
            if (!viewState || !this._isVisibleDelayed.read(reader)) {
                return undefined;
            }
            const continousLineRanges = this._lineSizesAroundHintPosition.read(reader);
            if (continousLineRanges.length === 0) {
                return undefined;
            }
            const editorScrollTop = this._editorObs.scrollTop.read(reader);
            const editorScrollLeft = this._editorObs.scrollLeft.read(reader);
            const editorLayout = this._editorObs.layoutInfo.read(reader);
            const previewContentHeight = this._previewEditor.contentHeight.read(reader);
            const previewEditorContentLayout = this._previewEditor.horizontalContentRangeInPreviewEditorToShow.read(reader);
            if (!previewContentHeight || !previewEditorContentLayout) {
                return undefined;
            }
            // const debugRects = stackSizesDown(new Point(editorLayout.contentLeft, lineSizes.top - scrollTop), lineSizes.sizes);
            const editorTrueContentWidth = editorLayout.contentWidth - editorLayout.verticalScrollbarWidth;
            const editorTrueContentRight = editorLayout.contentLeft + editorTrueContentWidth;
            // drawEditorWidths(this._editor, reader);
            const c = this._editorObs.cursorLineNumber.read(reader);
            if (!c) {
                return undefined;
            }
            const layoutConstants = DEFAULT_WIDGET_LAYOUT_CONSTANTS;
            const extraGutterMarginToAvoidScrollBar = 2;
            const previewEditorHeight = previewContentHeight + extraGutterMarginToAvoidScrollBar;
            // Try to find widget placement in available empty space
            let possibleWidgetOutline;
            let lastPlacementContext;
            const endOfLinePadding = (lineNumber)=>lineNumber === viewState.hint.lineNumber ? 40 : 20;
            for (const continousLineRange of continousLineRanges){
                const placementContext = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistnaceWidgetPlacement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetPlacementContext"](continousLineRange, editorTrueContentWidth, endOfLinePadding);
                lastPlacementContext = placementContext;
                possibleWidgetOutline = placementContext.tryFindWidgetOutline(viewState.hint.lineNumber, previewEditorHeight, editorTrueContentRight, layoutConstants);
                if (possibleWidgetOutline) {
                    break;
                }
            }
            // Fallback to overlay position if no empty space was found
            let position = 'empty-space';
            if (!possibleWidgetOutline) {
                position = 'overlay';
                const maxAvailableWidth = Math.min(editorLayout.width - editorLayout.contentLeft, MAX_WIDGET_WIDTH.OVERLAY);
                // Create a fallback placement context for computing overlay vertical position
                const fallbackPlacementContext = lastPlacementContext ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistnaceWidgetPlacement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetPlacementContext"](continousLineRanges[0], editorTrueContentWidth, endOfLinePadding);
                possibleWidgetOutline = {
                    horizontalWidgetRange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].ofStartAndLength(editorTrueContentRight - maxAvailableWidth, maxAvailableWidth),
                    verticalWidgetRange: fallbackPlacementContext.getWidgetVerticalOutline(viewState.hint.lineNumber + 2, previewEditorHeight, layoutConstants).delta(10)
                };
            }
            if (!possibleWidgetOutline) {
                return undefined;
            }
            const rectAvailableSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromRanges(possibleWidgetOutline.horizontalWidgetRange, possibleWidgetOutline.verticalWidgetRange).translateX(-editorScrollLeft).translateY(-editorScrollTop);
            const { previewEditorMargin, widgetPadding, widgetBorder, lowerBarHeight } = layoutConstants;
            const maxWidgetWidthUpperBound = position === 'overlay' ? MAX_WIDGET_WIDTH.OVERLAY : MAX_WIDGET_WIDTH.EMPTY_SPACE;
            // Honor the same `minWidgetWidth` the placement logic guarantees, so a short/empty preview line
            // (e.g. a jump onto an empty line) can't collapse the widget below its reserved space.
            const contentBasedWidgetWidth = previewEditorContentLayout.maxEditorWidth + previewEditorMargin + widgetPadding;
            const maxWidgetWidth = Math.min(maxWidgetWidthUpperBound, Math.max(contentBasedWidgetWidth, layoutConstants.minWidgetWidth));
            const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$flexBoxLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distributeFlexBoxLayout"])(rectAvailableSpace.width, {
                spaceBefore: {
                    min: 0,
                    max: 10,
                    priority: 1
                },
                content: {
                    min: 50,
                    rules: [
                        {
                            max: 150,
                            priority: 2
                        },
                        {
                            max: maxWidgetWidth,
                            priority: 1
                        }
                    ]
                },
                spaceAfter: {
                    min: 10
                }
            });
            if (!layout) {
                return null;
            }
            const ranges = lengthsToOffsetRanges([
                layout.spaceBefore,
                layout.content,
                layout.spaceAfter
            ], rectAvailableSpace.left);
            rectAvailableSpace.withHorizontalRange(ranges[0]);
            const widgetRect = rectAvailableSpace.withHorizontalRange(ranges[1]);
            rectAvailableSpace.withHorizontalRange(ranges[2]);
            const previewEditorRect = widgetRect.withMargin(-widgetPadding - widgetBorder - previewEditorMargin).withMargin(0, 0, -lowerBarHeight, 0);
            const previewEditorContentWidth = previewEditorRect.width - previewEditorContentLayout.nonContentWidth;
            const maxPrefferedRangeLength = previewEditorContentWidth * 0.8;
            const preferredRangeToReveal = previewEditorContentLayout.preferredRangeToReveal.intersect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].ofStartAndLength(previewEditorContentLayout.preferredRangeToReveal.start, maxPrefferedRangeLength)) ?? previewEditorContentLayout.preferredRangeToReveal;
            const desiredPreviewEditorScrollLeft = scrollToReveal(previewEditorContentLayout.indentationEnd, previewEditorContentWidth, preferredRangeToReveal);
            return {
                codeEditorSize: previewEditorRect.getSize(),
                codeScrollLeft: editorScrollLeft,
                contentLeft: editorLayout.contentLeft,
                widgetRect,
                previewEditorMargin,
                widgetPadding,
                widgetBorder,
                lowerBarHeight,
                desiredPreviewEditorScrollLeft: desiredPreviewEditorScrollLeft.newScrollPosition
            };
        });
        this._view = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>!!this._previewEditorLayoutInfo.read(reader) ? 'block' : 'none')
            }
        }, [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (_reader)=>[
                    this._widgetContent
                ])
        ]);
        this._widgetContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                class: [
                    'inline-edits-long-distance-hint-widget',
                    'show-file-icons'
                ],
                style: {
                    position: 'absolute',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorWidgetBackground"]),
                    padding: this._previewEditorLayoutInfo.map((i)=>i?.widgetPadding),
                    boxSizing: 'border-box',
                    borderRadius: BORDER_RADIUS,
                    border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>`${this._previewEditorLayoutInfo.read(reader)?.widgetBorder}px solid ${this._styles.read(reader).border}`),
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>this._viewState.read(reader)?.hint.isVisible ? '1' : '0'),
                    transition: 'opacity 200ms ease-in-out',
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>this._previewEditorLayoutInfo.read(reader)?.widgetRect)
                },
                onmousedown: (e)=>{
                    e.preventDefault(); // This prevents that the editor loses focus
                },
                onclick: ()=>{
                    this._viewState.read(undefined)?.model.jump();
                }
            }, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: [
                        'editorContainer'
                    ],
                    style: {
                        overflow: 'hidden',
                        padding: this._previewEditorLayoutInfo.map((i)=>i?.previewEditorMargin),
                        background: this._styles.map((s)=>s.background),
                        pointerEvents: 'none'
                    }
                }, [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (r)=>this._previewEditor.element)
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'bar',
                    style: {
                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["descriptionForeground"]),
                        pointerEvents: 'none',
                        margin: '0 4px',
                        height: this._previewEditorLayoutInfo.map((i)=>i?.lowerBarHeight),
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                        const children = [];
                        const viewState = this._viewState.read(reader);
                        if (!viewState) {
                            return children;
                        }
                        // Check if this is a cross-file edit
                        const currentModel = this._editorObs.model.read(reader);
                        const targetUri = viewState.target.uri;
                        const isCrossFileEdit = !currentModel || !viewState.target.targets(currentModel);
                        if (isCrossFileEdit) {
                            // For cross-file edits, show target filename instead of outline
                            const fileName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["basename"])(targetUri);
                            const iconClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$getIconClasses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconClasses"])(this._modelService, this._languageService, targetUri, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$files$2f$common$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileKind"].FILE);
                            children.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                class: 'target-file',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, [
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].elem('span', {
                                    class: iconClasses,
                                    style: {
                                        flexShrink: '0',
                                        marginRight: '4px'
                                    }
                                }),
                                fileName
                            ]));
                        } else {
                            // Outline Element
                            const source = this._originalOutlineSource.read(reader);
                            const originalTargetLineNumber = this._originalTargetLineNumber.read(reader);
                            const outlineItems = source?.getAt(originalTargetLineNumber, reader).slice(0, 1) ?? [];
                            const outlineElements = [];
                            if (outlineItems.length > 0) {
                                for(let i = 0; i < outlineItems.length; i++){
                                    const item = outlineItems[i];
                                    const icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKinds"].toIcon(item.kind);
                                    outlineElements.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                        class: 'breadcrumb-item',
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            flex: '1 1 auto',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }
                                    }, [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(icon),
                                        '\u00a0',
                                        item.name,
                                        ...i === outlineItems.length - 1 ? [] : [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].chevronRight)
                                        ]
                                    ]));
                                }
                            }
                            children.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                class: 'outline-elements',
                                style: {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, outlineElements));
                        }
                        // Show Edit Direction
                        const originalTargetLineNumber = this._originalTargetLineNumber.read(reader);
                        const arrowIcon = isCrossFileEdit ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].arrowRight : viewState.hint.lineNumber < originalTargetLineNumber ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].arrowDown : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].arrowUp;
                        const keybinding = this._keybindingService.lookupKeybinding(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jumpToNextInlineEditId"]);
                        let label = isCrossFileEdit ? 'Go to file' : 'Go to suggestion';
                        if (keybinding && keybinding.getLabel() === 'Tab') {
                            label = isCrossFileEdit ? 'Tab to open' : 'Tab to jump';
                        }
                        children.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            class: 'go-to-label',
                            style: {
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                flex: '0 0 auto',
                                paddingLeft: '6px'
                            }
                        }, [
                            label,
                            '\u00a0',
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(arrowIcon)
                        ]));
                        return children;
                    })
                ])
            ]));
        // Drives breadcrumbs and symbol icon
        this._originalTargetLineNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const viewState = this._viewState.read(reader);
            if (!viewState) {
                return -1;
            }
            if (viewState.edit.action?.kind === 'jumpTo') {
                return viewState.edit.action.position.lineNumber;
            }
            return viewState.diff[0]?.original.startLineNumber ?? -1;
        });
        this._originalOutlineSource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedDisposable"])(this, (reader)=>{
            const m = this._editorObs.model.read(reader);
            const factory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$features$2f$hideUnchangedRegionsFeature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HideUnchangedRegionsFeature"]._breadcrumbsSourceFactory.read(reader);
            return !m || !factory ? undefined : factory(m, this._instantiationService);
        });
        this._styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const v = this._tabAction.read(reader);
            // Check theme type by observing a color - this ensures we react to theme changes
            const widgetBorderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorWidgetBorder"], this._themeService).read(reader);
            const isHighContrast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._themeService.onDidColorThemeChange, ()=>{
                const theme = this._themeService.getColorTheme();
                return theme.type === 'hcDark' || theme.type === 'hcLight';
            }).read(reader);
            let borderColor;
            if (isHighContrast) {
                // Use editorWidgetBorder in high contrast mode for better visibility
                borderColor = widgetBorderColor;
            } else {
                let border;
                switch(v){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive:
                        border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSecondaryBackground"];
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Jump:
                        border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBackground"];
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept:
                        border = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorSuccessfulBackground"];
                        break;
                }
                borderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(border, this._themeService).read(reader);
            }
            return {
                border: borderColor.toString(),
                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._viewState.map((s)=>s?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor).read(reader))
            };
        });
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._previewEditor = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$longDistancePreviewEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LongDistancePreviewEditor"], this._previewTextModel, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const viewState = this._viewState.read(reader);
            if (!viewState) {
                return undefined;
            }
            return {
                diff: viewState.diff,
                model: viewState.model,
                inlineSuggestInfo: viewState.inlineSuggestInfo,
                nextCursorPosition: viewState.nextCursorPosition,
                target: viewState.target
            };
        }), this._editor, this._tabAction));
        this._viewWithElement = this._view.keepUpdated(this._store);
        this._register(this._editorObs.createOverlayWidget({
            domNode: this._viewWithElement.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0)
        }));
        this._widgetContent.get().keepUpdated(this._store);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const layoutInfo = this._previewEditorLayoutInfo.read(reader);
            if (!layoutInfo) {
                return;
            }
            this._previewEditor.layout(layoutInfo.codeEditorSize.toDimension(), layoutInfo.desiredPreviewEditorScrollLeft);
        }));
        this._isVisibleDelayed.recomputeInitiallyAndOnChange(this._store);
    }
    get isHovered() {
        return this._widgetContent.get().didMouseMoveDuringHover;
    }
};
InlineEditsLongDistanceHint = __decorate([
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IModelService"]),
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"])
], InlineEditsLongDistanceHint);
function lengthsToOffsetRanges(lengths, initialOffset = 0) {
    const result = [];
    let offset = initialOffset;
    for (const length of lengths){
        result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](offset, offset + length));
        offset += length;
    }
    return result;
}
/**
 * Changes the scroll position as little as possible just to reveal the given range in the window.
*/ function scrollToReveal(currentScrollPosition, windowWidth, contentRangeToReveal) {
    const visibleRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](currentScrollPosition, currentScrollPosition + windowWidth);
    if (visibleRange.containsRange(contentRangeToReveal)) {
        return {
            newScrollPosition: currentScrollPosition
        };
    }
    if (contentRangeToReveal.length > windowWidth) {
        return {
            newScrollPosition: contentRangeToReveal.start
        };
    }
    if (contentRangeToReveal.endExclusive > visibleRange.endExclusive) {
        return {
            newScrollPosition: contentRangeToReveal.endExclusive - windowWidth
        };
    }
    if (contentRangeToReveal.start < visibleRange.start) {
        return {
            newScrollPosition: contentRangeToReveal.start
        };
    }
    return {
        newScrollPosition: currentScrollPosition
    };
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsSideBySideView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsSideBySideView",
    ()=>InlineEditsSideBySideView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/userInteraction/browser/userInteractionService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$embeddedCodeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/codeEditor/embeddedCodeEditorWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$stickyScroll$2f$browser$2f$stickyScrollController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/stickyScroll/browser/stickyScrollController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/inlineCompletionContextKeys.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
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
const HORIZONTAL_PADDING = 0;
const VERTICAL_PADDING = 0;
const BORDER_WIDTH = 1;
const WIDGET_SEPARATOR_WIDTH = 1;
const WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH = 3;
const BORDER_RADIUS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"];
const ORIGINAL_END_PADDING = 20;
const MODIFIED_END_PADDING = 12;
let InlineEditsSideBySideView = class InlineEditsSideBySideView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    // This is an approximation and should be improved by using the real parameters used bellow
    static fitsInsideViewport(editor, textModel, edit, reader) {
        const editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(editor);
        const editorWidth = editorObs.layoutInfoWidth.read(reader);
        const editorContentLeft = editorObs.layoutInfoContentLeft.read(reader);
        const editorVerticalScrollbar = editor.getLayoutInfo().verticalScrollbarWidth;
        const minimapWidth = editorObs.layoutInfoMinimap.read(reader).minimapLeft !== 0 ? editorObs.layoutInfoMinimap.read(reader).minimapWidth : 0;
        const maxOriginalContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(editorObs, edit.displayRange, undefined /* do not reconsider on each layout info change */ );
        const maxModifiedContent = edit.lineEdit.newLines.reduce((max, line)=>Math.max(max, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContentRenderWidth"])(line, editor, textModel)), 0);
        const originalPadding = ORIGINAL_END_PADDING; // padding after last line of original editor
        const modifiedPadding = MODIFIED_END_PADDING + 2 * BORDER_WIDTH; // padding after last line of modified editor
        return maxOriginalContent + maxModifiedContent + originalPadding + modifiedPadding < editorWidth - editorContentLeft - editorVerticalScrollbar - minimapWidth;
    }
    constructor(_editor, _edit, _previewTextModel, _uiState, _tabAction, _instantiationService, _themeService, _userInteractionService){
        super();
        this._editor = _editor;
        this._edit = _edit;
        this._previewTextModel = _previewTextModel;
        this._uiState = _uiState;
        this._tabAction = _tabAction;
        this._instantiationService = _instantiationService;
        this._themeService = _themeService;
        this._userInteractionService = _userInteractionService;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._display = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>!!this._uiState.read(reader) ? 'block' : 'none');
        this.previewRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].ref();
        const separatorWidthObs = this._uiState.map((s)=>s?.editorType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor ? WIDGET_SEPARATOR_DIFF_EDITOR_WIDTH : WIDGET_SEPARATOR_WIDTH);
        this._editorContainer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: [
                'editorContainer'
            ],
            style: {
                position: 'absolute',
                overflow: 'hidden',
                cursor: 'pointer'
            },
            onmousedown: (e)=>{
                e.preventDefault(); // This prevents that the editor loses focus
            },
            onclick: (e)=>{
                this._onDidClick.fire(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"].create(e));
            }
        }, [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                class: 'preview',
                style: {
                    pointerEvents: 'none'
                },
                ref: this.previewRef
            })
        ]).keepUpdated(this._store);
        this.isHovered = this._userInteractionService.createHoverTracker(this._editorContainer.element, this._store);
        this.previewEditor = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$embeddedCodeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedCodeEditorWidget"], this.previewRef.element, {
            glyphMargin: false,
            lineNumbers: 'off',
            minimap: {
                enabled: false
            },
            guides: {
                indentation: false,
                bracketPairs: false,
                bracketPairsHorizontal: false,
                highlightActiveIndentation: false
            },
            editContext: false,
            rulers: [],
            padding: {
                top: 0,
                bottom: 0
            },
            folding: false,
            selectOnLineNumbers: false,
            selectionHighlight: false,
            columnSelection: false,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            revealHorizontalRightPadding: 0,
            bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: false
            },
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
                handleMouseWheel: false
            },
            readOnly: true,
            wordWrap: 'off',
            wordWrapOverride1: 'off',
            wordWrapOverride2: 'off'
        }, {
            contextKeyValues: {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$inlineCompletionContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionContextKeys"].inInlineEditsPreviewEditor.key]: true
            },
            contributions: []
        }, this._editor));
        this._previewEditorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this.previewEditor);
        this._activeViewZones = [];
        this._updatePreviewEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            this._editorContainer.readEffect(reader);
            this._previewEditorObs.model.read(reader); // update when the model is set
            // Setting this here explicitly to make sure that the preview editor is
            // visible when needed, we're also checking that these fields are defined
            // because of the auto run initial
            // Before removing these, verify with a non-monospace font family
            this._display.read(reader);
            if (this._nonOverflowView) {
                this._nonOverflowView.element.style.display = this._display.read(reader);
            }
            const uiState = this._uiState.read(reader);
            const edit = this._edit.read(reader);
            if (!uiState || !edit) {
                return;
            }
            const range = edit.originalLineRange;
            const hiddenAreas = [];
            if (range.startLineNumber > 1) {
                hiddenAreas.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](1, 1, range.startLineNumber - 1, 1));
            }
            if (range.startLineNumber + uiState.newTextLineCount < this._previewTextModel.getLineCount() + 1) {
                hiddenAreas.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.startLineNumber + uiState.newTextLineCount, 1, this._previewTextModel.getLineCount() + 1, 1));
            }
            this.previewEditor.setHiddenAreas(hiddenAreas, undefined, true);
            // TODO: is this the proper way to handle viewzones?
            const previousViewZones = [
                ...this._activeViewZones
            ];
            this._activeViewZones = [];
            const reducedLinesCount = range.endLineNumberExclusive - range.startLineNumber - uiState.newTextLineCount;
            this.previewEditor.changeViewZones((changeAccessor)=>{
                previousViewZones.forEach((id)=>changeAccessor.removeZone(id));
                if (reducedLinesCount > 0) {
                    this._activeViewZones.push(changeAccessor.addZone({
                        afterLineNumber: range.startLineNumber + uiState.newTextLineCount - 1,
                        heightInLines: reducedLinesCount,
                        showInHiddenAreas: true,
                        domNode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('div.diagonal-fill.inline-edits-view-zone')
                    }));
                }
            });
        });
        this._previewEditorWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const edit = this._edit.read(reader);
            if (!edit) {
                return 0;
            }
            this._updatePreviewEditor.read(reader);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._previewEditorObs, edit.modifiedLineRange, reader);
        });
        this._cursorPosIfTouchesEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const cursorPos = this._editorObs.cursorPosition.read(reader);
            const edit = this._edit.read(reader);
            if (!edit || !cursorPos) {
                return undefined;
            }
            return edit.modifiedLineRange.contains(cursorPos.lineNumber) ? cursorPos : undefined;
        });
        this._originalStartPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            return inlineEdit ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](inlineEdit.originalLineRange.startLineNumber, 1) : null;
        });
        this._originalEndPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            return inlineEdit ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](inlineEdit.originalLineRange.endLineNumberExclusive, 1) : null;
        });
        this._originalVerticalStartPosition = this._editorObs.observePosition(this._originalStartPosition, this._store).map((p)=>p?.y);
        this._originalVerticalEndPosition = this._editorObs.observePosition(this._originalEndPosition, this._store).map((p)=>p?.y);
        this._originalDisplayRange = this._edit.map((e)=>e?.displayRange);
        this._editorMaxContentWidthInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const originalDisplayRange = this._originalDisplayRange.read(reader);
            if (!originalDisplayRange) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0);
            }
            this._editorObs.versionId.read(reader);
            // Take the max value that we observed.
            // Reset when either the edit changes or the editor text version.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(this, (reader, lastValue)=>{
                const maxWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxContentWidthInRange"])(this._editorObs, originalDisplayRange, reader);
                return Math.max(maxWidth, lastValue ?? 0);
            });
        }).map((v, r)=>v.read(r));
        const editorDomContentRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeEditorBoundingClientRect"])(this._editor, this._store);
        this._previewEditorLayoutInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const inlineEdit = this._edit.read(reader);
            if (!inlineEdit) {
                return null;
            }
            const state = this._uiState.read(reader);
            if (!state) {
                return null;
            }
            const range = inlineEdit.originalLineRange;
            const horizontalScrollOffset = this._editorObs.scrollLeft.read(reader);
            const editorContentMaxWidthInRange = this._editorMaxContentWidthInRange.read(reader);
            const editorLayout = this._editorObs.layoutInfo.read(reader);
            const previewContentWidth = this._previewEditorWidth.read(reader);
            const editorContentAreaWidth = editorLayout.contentWidth - editorLayout.verticalScrollbarWidth;
            const editorBoundingClientRect = editorDomContentRect.read(reader);
            const clientContentAreaRight = editorLayout.contentLeft + editorLayout.contentWidth + editorBoundingClientRect.left;
            const remainingWidthRightOfContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(this._editor.getContainerDomNode()).innerWidth - clientContentAreaRight;
            const remainingWidthRightOfEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(this._editor.getContainerDomNode()).innerWidth - editorBoundingClientRect.right;
            const desiredMinimumWidth = Math.min(editorLayout.contentWidth * 0.3, previewContentWidth, 100);
            const IN_EDITOR_DISPLACEMENT = 0;
            const maximumAvailableWidth = IN_EDITOR_DISPLACEMENT + remainingWidthRightOfContent;
            const cursorPos = this._cursorPosIfTouchesEdit.read(reader);
            const maxPreviewEditorLeft = Math.max(// We're starting from the content area right and moving it left by IN_EDITOR_DISPLACEMENT and also by an amount to ensure some minimum desired width
            editorContentAreaWidth + horizontalScrollOffset - IN_EDITOR_DISPLACEMENT - Math.max(0, desiredMinimumWidth - maximumAvailableWidth), // But we don't want that the moving left ends up covering the cursor, so this will push it to the right again
            Math.min(cursorPos ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOffsetForPos"])(this._editorObs, cursorPos, reader) + 50 : 0, editorContentAreaWidth + horizontalScrollOffset));
            const previewEditorLeftInTextArea = Math.min(editorContentMaxWidthInRange + ORIGINAL_END_PADDING, maxPreviewEditorLeft);
            const maxContentWidth = editorContentMaxWidthInRange + ORIGINAL_END_PADDING + previewContentWidth + 70;
            const dist = maxPreviewEditorLeft - previewEditorLeftInTextArea;
            let desiredPreviewEditorScrollLeft;
            let codeRight;
            if (previewEditorLeftInTextArea > horizontalScrollOffset) {
                desiredPreviewEditorScrollLeft = 0;
                codeRight = editorLayout.contentLeft + previewEditorLeftInTextArea - horizontalScrollOffset;
            } else {
                desiredPreviewEditorScrollLeft = horizontalScrollOffset - previewEditorLeftInTextArea;
                codeRight = editorLayout.contentLeft;
            }
            const selectionTop = this._originalVerticalStartPosition.read(reader) ?? this._editor.getTopForLineNumber(range.startLineNumber) - this._editorObs.scrollTop.read(reader);
            const selectionBottom = this._originalVerticalEndPosition.read(reader) ?? this._editor.getBottomForLineNumber(range.endLineNumberExclusive - 1) - this._editorObs.scrollTop.read(reader);
            // TODO: const { prefixLeftOffset } = getPrefixTrim(inlineEdit.edit.edits.map(e => e.range), inlineEdit.originalLineRange, [], this._editor);
            const codeLeft = editorLayout.contentLeft - horizontalScrollOffset;
            let codeRect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopRightBottom(codeLeft, selectionTop, codeRight, selectionBottom);
            const isInsertion = codeRect.height === 0;
            if (!isInsertion) {
                codeRect = codeRect.withMargin(VERTICAL_PADDING, HORIZONTAL_PADDING);
            }
            const previewLineHeights = this._previewEditorObs.observeLineHeightsForLineRange(inlineEdit.modifiedLineRange).read(reader);
            const editHeight = previewLineHeights.reduce((acc, h)=>acc + h, 0);
            const codeHeight = selectionBottom - selectionTop;
            const previewEditorHeight = Math.max(codeHeight, editHeight);
            const clipped = dist === 0;
            const codeEditDist = 0;
            const previewEditorWidth = Math.min(previewContentWidth + MODIFIED_END_PADDING, remainingWidthRightOfEditor + editorLayout.width - editorLayout.contentLeft - codeEditDist);
            let editRect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(codeRect.right + codeEditDist, selectionTop, previewEditorWidth, previewEditorHeight);
            if (!isInsertion) {
                editRect = editRect.withMargin(VERTICAL_PADDING, HORIZONTAL_PADDING).translateX(HORIZONTAL_PADDING + BORDER_WIDTH);
            } else {
                // Align top of edit with insertion line
                editRect = editRect.withMargin(VERTICAL_PADDING, HORIZONTAL_PADDING).translateY(VERTICAL_PADDING);
            }
            // debugView(debugLogRects({ codeRect, editRect }, this._editor.getDomNode()!), reader);
            return {
                codeRect,
                editRect,
                codeScrollLeft: horizontalScrollOffset,
                contentLeft: editorLayout.contentLeft,
                isInsertion,
                maxContentWidth,
                shouldShowShadow: clipped,
                desiredPreviewEditorScrollLeft,
                previewEditorWidth
            };
        });
        this._stickyScrollController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$stickyScroll$2f$browser$2f$stickyScrollController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickyScrollController"].get(this._editorObs.editor);
        this._stickyScrollHeight = this._stickyScrollController ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._stickyScrollController.onDidChangeStickyScrollHeight, ()=>this._stickyScrollController.stickyScrollWidgetHeight) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0);
        this._shouldOverflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            {
                return false;
            }
        });
        this._originalBackgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this, this._themeService.onDidColorThemeChange, ()=>{
            return this._themeService.getColorTheme().getColor(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalBackgroundColor"]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"].transparent;
        });
        this._editorBackgroundColor = this._uiState.map((s)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(s?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor);
        });
        this._backgroundSvg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svg({
            transform: 'translate(-0.5 -0.5)',
            style: {
                overflow: 'visible',
                pointerEvents: 'none',
                position: 'absolute'
            }
        }, [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svgElem('path', {
                class: 'rightOfModifiedBackgroundCoverUp',
                d: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                    const layoutInfo = this._previewEditorLayoutInfo.read(reader);
                    if (!layoutInfo) {
                        return undefined;
                    }
                    const originalBackgroundColor = this._originalBackgroundColor.read(reader);
                    if (originalBackgroundColor.isTransparent()) {
                        return undefined;
                    }
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(layoutInfo.codeRect.getRightTop()).lineTo(layoutInfo.codeRect.getRightTop().deltaX(1000)).lineTo(layoutInfo.codeRect.getRightBottom().deltaX(1000)).lineTo(layoutInfo.codeRect.getRightBottom()).build();
                }),
                style: {
                    fill: this._editorBackgroundColor
                }
            })
        ]).keepUpdated(this._store);
        this._originalOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            style: {
                pointerEvents: 'none',
                display: this._previewEditorLayoutInfo.map((layoutInfo)=>layoutInfo?.isInsertion ? 'none' : 'block')
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const layoutInfoObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._previewEditorLayoutInfo).read(reader);
            if (!layoutInfoObs) {
                return undefined;
            }
            const editorBackground = this._editorBackgroundColor.read(reader);
            const separatorWidth = separatorWidthObs.read(reader);
            const borderStyling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalBorderColor"])(this._tabAction).map((bc)=>`${BORDER_WIDTH}px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(bc)}`);
            const borderStylingSeparator = `${BORDER_WIDTH + separatorWidth}px solid ${editorBackground}`;
            const hasBorderLeft = layoutInfoObs.read(reader).codeScrollLeft !== 0;
            const isModifiedLower = layoutInfoObs.map((layoutInfo)=>layoutInfo.codeRect.bottom < layoutInfo.editRect.bottom);
            const transitionRectSize = BORDER_RADIUS * 2 + BORDER_WIDTH * 2;
            // Create an overlay which hides the left hand side of the original overlay when it overflows to the left
            // such that there is a smooth transition at the edge of content left
            const overlayHider = layoutInfoObs.map((layoutInfo)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopRightBottom(layoutInfo.contentLeft - BORDER_RADIUS - BORDER_WIDTH, layoutInfo.codeRect.top, layoutInfo.contentLeft, layoutInfo.codeRect.bottom + transitionRectSize)).read(reader);
            const intersectionLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](overlayHider.left, Number.MAX_SAFE_INTEGER);
            const overlayRect = layoutInfoObs.map((layoutInfo)=>layoutInfo.codeRect.intersectHorizontal(intersectionLine));
            const separatorRect = overlayRect.map((overlayRect)=>overlayRect.withMargin(separatorWidth, 0, separatorWidth, separatorWidth).intersectHorizontal(intersectionLine));
            const transitionRect = overlayRect.map((overlayRect)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(overlayRect.right - transitionRectSize + BORDER_WIDTH, overlayRect.bottom - BORDER_WIDTH, transitionRectSize, transitionRectSize).intersectHorizontal(intersectionLine));
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalSeparatorSideBySide',
                    style: {
                        ...separatorRect.read(reader).toStyles(),
                        boxSizing: 'border-box',
                        borderRadius: `${BORDER_RADIUS}px 0 0 ${BORDER_RADIUS}px`,
                        borderTop: borderStylingSeparator,
                        borderBottom: borderStylingSeparator,
                        borderLeft: hasBorderLeft ? 'none' : borderStylingSeparator
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlaySideBySide',
                    style: {
                        ...overlayRect.read(reader).toStyles(),
                        boxSizing: 'border-box',
                        borderRadius: `${BORDER_RADIUS}px 0 0 ${BORDER_RADIUS}px`,
                        borderTop: borderStyling,
                        borderBottom: borderStyling,
                        borderLeft: hasBorderLeft ? 'none' : borderStyling,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalBackgroundColor"])
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalCornerCutoutSideBySide',
                    style: {
                        pointerEvents: 'none',
                        display: isModifiedLower.map((isLower)=>isLower ? 'block' : 'none'),
                        ...transitionRect.read(reader).toStyles()
                    }
                }, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        class: 'originalCornerCutoutBackground',
                        style: {
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            width: '100%',
                            height: '100%',
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalBackgroundColor"], this._themeService).map((c)=>c.toString())
                        }
                    }),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        class: 'originalCornerCutoutBorder',
                        style: {
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            borderTop: borderStyling,
                            borderRight: borderStyling,
                            borderRadius: `0 100% 0 0`,
                            backgroundColor: editorBackground
                        }
                    })
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'originalOverlaySideBySideHider',
                    style: {
                        ...overlayHider.toStyles(),
                        backgroundColor: editorBackground
                    }
                })
            ];
        })).keepUpdated(this._store);
        this._modifiedOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            style: {
                pointerEvents: 'none'
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const layoutInfoObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._previewEditorLayoutInfo).read(reader);
            if (!layoutInfoObs) {
                return undefined;
            }
            const isModifiedLower = layoutInfoObs.map((layoutInfo)=>layoutInfo.codeRect.bottom < layoutInfo.editRect.bottom);
            const editorBackground = this._editorBackgroundColor.read(reader);
            const separatorWidth = separatorWidthObs.read(reader);
            const borderRadius = isModifiedLower.map((isLower)=>`0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px ${isLower ? BORDER_RADIUS : 0}px`);
            const borderStyling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBlendedColor"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModifiedBorderColor"])(this._tabAction), this._themeService).map((c)=>`1px solid ${c.toString()}`);
            const borderStylingSeparator = `${BORDER_WIDTH + separatorWidth}px solid ${editorBackground}`;
            const overlayRect = layoutInfoObs.map((layoutInfo)=>layoutInfo.editRect.withMargin(0, BORDER_WIDTH));
            const separatorRect = overlayRect.map((overlayRect)=>overlayRect.withMargin(separatorWidth, separatorWidth, separatorWidth, 0));
            const insertionRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const overlay = overlayRect.read(reader);
                const layoutinfo = layoutInfoObs.read(reader);
                if (!layoutinfo.isInsertion || layoutinfo.contentLeft >= overlay.left) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromLeftTopWidthHeight(overlay.left, overlay.top, 0, 0);
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"](layoutinfo.contentLeft, overlay.top, overlay.left, overlay.top + BORDER_WIDTH * 2);
            });
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'modifiedInsertionSideBySide',
                    style: {
                        ...insertionRect.read(reader).toStyles(),
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModifiedBorderColor"])(this._tabAction).map((c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(c))
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'modifiedSeparatorSideBySide',
                    style: {
                        ...separatorRect.read(reader).toStyles(),
                        borderRadius,
                        borderTop: borderStylingSeparator,
                        borderBottom: borderStylingSeparator,
                        borderRight: borderStylingSeparator,
                        boxSizing: 'border-box'
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                    class: 'modifiedOverlaySideBySide',
                    style: {
                        ...overlayRect.read(reader).toStyles(),
                        borderRadius,
                        border: borderStyling,
                        boxSizing: 'border-box',
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiedBackgroundColor"])
                    }
                })
            ];
        })).keepUpdated(this._store);
        this._nonOverflowView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'inline-edits-view',
            style: {
                position: 'absolute',
                overflow: 'visible',
                top: '0px',
                left: '0px',
                display: this._display
            }
        }, [
            this._backgroundSvg,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._shouldOverflow.read(reader) ? [] : [
                    this._editorContainer,
                    this._originalOverlay,
                    this._modifiedOverlay
                ])
        ]).keepUpdated(this._store);
        this._register(this._editorObs.createOverlayWidget({
            domNode: this._nonOverflowView.element,
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(null),
            allowEditorOverflow: false,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const x = this._previewEditorLayoutInfo.read(reader)?.maxContentWidth;
                if (x === undefined) {
                    return 0;
                }
                return x;
            })
        }));
        this.previewEditor.setModel(this._previewTextModel);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const layoutInfo = this._previewEditorLayoutInfo.read(reader);
            if (!layoutInfo) {
                return;
            }
            const editorRect = layoutInfo.editRect.withMargin(-VERTICAL_PADDING, -HORIZONTAL_PADDING);
            this.previewEditor.layout({
                height: editorRect.height,
                width: layoutInfo.previewEditorWidth + 15 /* Make sure editor does not scroll horizontally */ 
            });
            this._editorContainer.element.style.top = `${editorRect.top}px`;
            this._editorContainer.element.style.left = `${editorRect.left}px`;
            this._editorContainer.element.style.width = `${layoutInfo.previewEditorWidth + HORIZONTAL_PADDING}px`; // Set width to clip view zone
        //this._editorContainer.element.style.borderRadius = `0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0`;
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const layoutInfo = this._previewEditorLayoutInfo.read(reader);
            if (!layoutInfo) {
                return;
            }
            this._previewEditorObs.editor.setScrollLeft(layoutInfo.desiredPreviewEditorScrollLeft);
        }));
        this._updatePreviewEditor.recomputeInitiallyAndOnChange(this._store);
    }
};
InlineEditsSideBySideView = __decorate([
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IUserInteractionService"])
], InlineEditsSideBySideView);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsWordReplacementView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsWordReplacementView",
    ()=>InlineEditsWordReplacementView,
    "WordReplacementsViewData",
    ()=>WordReplacementsViewData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconLabels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/hover/browser/hover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/baseColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$chartsColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/chartsColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/editorColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$inputColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/inputColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$listColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/listColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$menuColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/menuColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$minimapColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/minimapColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$miscColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/miscColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$quickpickColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/quickpickColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$searchColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/colors/searchColors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/theme/common/themeService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/point.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/2d/rect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/language.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/tokens/lineTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/userInteraction/browser/userInteractionService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
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
class WordReplacementsViewData {
    constructor(edit, editorType, alternativeAction){
        this.edit = edit;
        this.editorType = editorType;
        this.alternativeAction = alternativeAction;
    }
    equals(other) {
        return this.edit.equals(other.edit) && this.alternativeAction === other.alternativeAction;
    }
}
const BORDER_WIDTH = 1;
const DOM_ID_OVERLAY = 'word-replacement-view-overlay';
const DOM_ID_WIDGET = 'word-replacement-view-widget';
const DOM_ID_REPLACEMENT = 'word-replacement-view-replacement';
const DOM_ID_RENAME = 'word-replacement-view-rename';
let InlineEditsWordReplacementView = class InlineEditsWordReplacementView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        this.MAX_LENGTH = 100;
    }
    constructor(_editor, _viewData, _tabAction, _languageService, _themeService, _keybindingService, _hoverService, _userInteractionService){
        super();
        this._editor = _editor;
        this._viewData = _viewData;
        this._tabAction = _tabAction;
        this._languageService = _languageService;
        this._themeService = _themeService;
        this._keybindingService = _keybindingService;
        this._hoverService = _hoverService;
        this._userInteractionService = _userInteractionService;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this._start = this._editor.observePosition((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(this._viewData.edit.range.getStartPosition()), this._store);
        this._end = this._editor.observePosition((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(this._viewData.edit.range.getEndPosition()), this._store);
        this._line = document.createElement('div');
        this._primaryElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, null);
        this._secondaryElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, null);
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const elem = this._primaryElement.read(reader);
            if (!elem) {
                return false;
            }
            return this._userInteractionService.createHoverTracker(elem.element, reader.store).read(reader);
        });
        this._renderTextEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (_reader)=>{
            const tm = this._editor.model.read(undefined);
            if (!tm) {
                return;
            }
            const origLine = tm.getLineContent(this._viewData.edit.range.startLineNumber);
            const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"].replace(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](this._viewData.edit.range.startColumn - 1, this._viewData.edit.range.endColumn - 1), this._viewData.edit.text);
            const lineToTokenize = edit.replace(origLine);
            const t = tm.tokenization.tokenizeLinesAt(this._viewData.edit.range.startLineNumber, [
                lineToTokenize
            ])?.[0];
            let tokens;
            if (t) {
                tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenArray"].fromLineTokens(t).slice(edit.getRangeAfterReplace()).toLineTokens(this._viewData.edit.text, this._languageService.languageIdCodec);
            } else {
                tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$tokens$2f$lineTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineTokens"].createEmpty(this._viewData.edit.text, this._languageService.languageIdCodec);
            }
            const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderLines"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSource"]([
                tokens
            ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$renderLines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderOptions"].fromEditor(this._editor.editor).withSetWidth(false).withScrollBeyondLastColumn(0), [], this._line, true);
            this._line.style.width = `${res.minWidthInPx}px`;
        });
        const modifiedLineHeight = this._editor.observeLineHeightForPosition(this._viewData.edit.range.getStartPosition());
        const altCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromPromise"])(this._viewData.alternativeAction?.count ?? new Promise((resolve)=>resolve(undefined))).map((c)=>c.value);
        const altModifierActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._userInteractionService.readModifierKeyStatus(this._editor.editor.getDomNode(), reader).shiftKey);
        this._layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            this._renderTextEffect.read(reader);
            const widgetStart = this._start.read(reader);
            const widgetEnd = this._end.read(reader);
            // TODO@hediet better about widgetStart and widgetEnd in a single transaction!
            if (!widgetStart || !widgetEnd || widgetStart.x > widgetEnd.x || widgetStart.y > widgetEnd.y) {
                return undefined;
            }
            const lineHeight = modifiedLineHeight.read(reader);
            if (lineHeight <= 0) {
                return undefined;
            }
            const scrollLeft = this._editor.scrollLeft.read(reader);
            const w = this._editor.getOption(59 /* EditorOption.fontInfo */ ).read(reader).typicalHalfwidthCharacterWidth;
            const modifiedLeftOffset = 3 * w;
            const modifiedTopOffset = 4;
            const modifiedOffset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Point"](modifiedLeftOffset, modifiedTopOffset);
            let alternativeAction = undefined;
            if (this._viewData.alternativeAction) {
                const label = this._viewData.alternativeAction.label;
                const count = altCount.read(reader);
                const active = altModifierActive.read(reader);
                const occurrencesLabel = count !== undefined ? count === 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1283, "{0} 1 occurrence", label) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1284, "{0} {1} occurrences", label, count) : label;
                const keybindingTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1285, "{0} show occurrences", '[shift]');
                alternativeAction = {
                    label: count !== undefined ? active ? occurrencesLabel : label : label,
                    tooltip: occurrencesLabel ? `${occurrencesLabel}\n${keybindingTooltip}` : undefined,
                    icon: undefined,
                    count,
                    keybinding: this._keybindingService.lookupKeybinding(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineSuggestCommitAlternativeActionId"]),
                    active: altModifierActive
                };
            }
            const originalLine = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromPoints(widgetStart, widgetEnd).withHeight(lineHeight).translateX(-scrollLeft);
            const codeLine = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$rect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"].fromPointSize(originalLine.getLeftBottom().add(modifiedOffset), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$2d$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Point"](this._viewData.edit.text.length * w, originalLine.height));
            const modifiedLine = codeLine.withWidth(codeLine.width + (alternativeAction ? alternativeAction.label.length * w + 8 + 4 + 12 : 0));
            const lowerBackground = modifiedLine.withLeft(originalLine.left);
            // debugView(debugLogRects({ lowerBackground }, this._editor.editor.getContainerDomNode()), reader);
            return {
                alternativeAction,
                originalLine,
                codeLine,
                modifiedLine,
                lowerBackground,
                lineHeight
            };
        });
        this.minEditorScrollHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._layout).read(reader);
            if (!layout) {
                return 0;
            }
            return layout.read(reader).modifiedLine.bottom + BORDER_WIDTH + this._editor.editor.getScrollTop();
        });
        this._root = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
            class: 'word-replacement'
        }, [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapOutFalsy"])(this._layout).read(reader);
                if (!layout) {
                    return [];
                }
                const originalBorderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalBorderColor"])(this._tabAction).map((c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(c)).read(reader);
                const modifiedBorderColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModifiedBorderColor"])(this._tabAction).map((c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(c)).read(reader);
                this._line.style.lineHeight = `${layout.read(reader).modifiedLine.height + 2 * BORDER_WIDTH}px`;
                const secondaryElementHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(false); //this._secondaryElement.map((e, r) => e?.isHovered.read(r) ?? false);
                const alternativeAction = layout.map((l)=>l.alternativeAction);
                const alternativeActionActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>(alternativeAction.read(reader)?.active.read(reader) ?? false) || secondaryElementHovered.read(reader));
                const isHighContrast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._themeService.onDidColorThemeChange, ()=>{
                    const theme = this._themeService.getColorTheme();
                    return theme.type === 'hcDark' || theme.type === 'hcLight';
                }).read(reader);
                const hcBorderColor = isHighContrast ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$baseColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastBorder"], this._themeService).read(reader) : null;
                const primaryActiveStyles = {
                    borderColor: hcBorderColor ? hcBorderColor.toString() : modifiedBorderColor,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiedChangedTextOverlayColor"]),
                    color: '',
                    opacity: '1'
                };
                const secondaryActiveStyles = {
                    borderColor: hcBorderColor ? hcBorderColor.toString() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBorder"]),
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryBackground"]),
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineEditIndicatorPrimaryForeground"]),
                    opacity: '1'
                };
                const passiveStyles = {
                    borderColor: hcBorderColor ? hcBorderColor.toString() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeColor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverForeground"], this._themeService).map((c)=>c.transparent(0.2).toString()).read(reader),
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._viewData.editorType),
                    color: '',
                    opacity: '0.7'
                };
                const editorBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorBackgroundColor"])(this._viewData.editorType);
                const primaryActionStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (r)=>alternativeActionActive.read(r) ? primaryActiveStyles : primaryActiveStyles);
                const secondaryActionStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (r)=>alternativeActionActive.read(r) ? secondaryActiveStyles : passiveStyles);
                // TODO@benibenj clicking the arrow does not accept suggestion anymore
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                        id: DOM_ID_OVERLAY,
                        style: {
                            position: 'absolute',
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditorValidOverlayRect"])(this._editor).read(r)),
                            overflow: 'hidden',
                            pointerEvents: 'none'
                        }
                    }, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).lowerBackground.withMargin(BORDER_WIDTH, 2 * BORDER_WIDTH, BORDER_WIDTH, 0)),
                                background: editorBackground,
                                cursor: 'pointer',
                                pointerEvents: 'auto'
                            },
                            onmousedown: (e)=>this._mouseDown(e)
                        }),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            id: DOM_ID_WIDGET,
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).modifiedLine.withMargin(BORDER_WIDTH, 2 * BORDER_WIDTH)),
                                width: undefined,
                                pointerEvents: 'auto',
                                boxSizing: 'border-box',
                                borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                background: editorBackground,
                                display: 'flex',
                                justifyContent: 'left',
                                outline: `2px solid ${editorBackground}`
                            },
                            onmousedown: (e)=>this._mouseDown(e)
                        }, [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                id: DOM_ID_REPLACEMENT,
                                style: {
                                    fontFamily: this._editor.getOption(58 /* EditorOption.fontFamily */ ),
                                    fontSize: this._editor.getOption(61 /* EditorOption.fontSize */ ),
                                    fontWeight: this._editor.getOption(62 /* EditorOption.fontWeight */ ),
                                    width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).codeLine.withMargin(BORDER_WIDTH, 2 * BORDER_WIDTH)).width,
                                    borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                    border: primaryActionStyles.map((s)=>`${BORDER_WIDTH}px solid ${s.borderColor}`),
                                    boxSizing: 'border-box',
                                    padding: `${BORDER_WIDTH}px`,
                                    opacity: primaryActionStyles.map((s)=>s.opacity),
                                    background: primaryActionStyles.map((s)=>s.backgroundColor),
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer'
                                },
                                obsRef: (elem)=>{
                                    this._primaryElement.set(elem, undefined);
                                }
                            }, [
                                this._line
                            ]),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                                const altAction = alternativeAction.read(reader);
                                if (!altAction) {
                                    return undefined;
                                }
                                const keybinding = document.createElement('div');
                                const keybindingLabel = reader.store.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeybindingLabel"](keybinding, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OS"], {
                                    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$keybindingLabel$2f$keybindingLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unthemedKeybindingLabelOptions"],
                                    disableTitle: true
                                }));
                                keybindingLabel.set(altAction.keybinding);
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                                    id: DOM_ID_RENAME,
                                    style: {
                                        position: 'relative',
                                        borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                        borderTop: `${BORDER_WIDTH}px solid`,
                                        borderRight: `${BORDER_WIDTH}px solid`,
                                        borderBottom: `${BORDER_WIDTH}px solid`,
                                        borderLeft: `${BORDER_WIDTH}px solid`,
                                        borderColor: secondaryActionStyles.map((s)=>s.borderColor),
                                        opacity: secondaryActionStyles.map((s)=>s.opacity),
                                        color: secondaryActionStyles.map((s)=>s.color),
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '0 4px 0 1px',
                                        marginLeft: '4px',
                                        background: secondaryActionStyles.map((s)=>s.backgroundColor),
                                        cursor: 'pointer',
                                        textWrap: 'nowrap'
                                    },
                                    class: 'inline-edit-alternative-action-label',
                                    obsRef: (elem)=>{
                                        this._secondaryElement.set(elem, undefined);
                                    },
                                    ref: (elem)=>{
                                        if (altAction.tooltip) {
                                            reader.store.add(this._hoverService.setupDelayedHoverAtMouse(elem, {
                                                content: altAction.tooltip,
                                                appearance: {
                                                    compact: true
                                                }
                                            }));
                                        }
                                    }
                                }, [
                                    keybinding,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('div.inline-edit-alternative-action-label-separator'),
                                    altAction.icon ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$iconLabel$2f$iconLabels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIcon"])(altAction.icon) : undefined,
                                    altAction.label
                                ]);
                            })
                        ]),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].div({
                            style: {
                                position: 'absolute',
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToProps"])((reader)=>layout.read(reader).originalLine.withMargin(BORDER_WIDTH)),
                                boxSizing: 'border-box',
                                borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INLINE_EDITS_BORDER_RADIUS"]}px`,
                                border: `${BORDER_WIDTH}px solid ${originalBorderColor}`,
                                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["originalChangedTextOverlayColor"]),
                                pointerEvents: 'none'
                            }
                        }, []),
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svg({
                            width: 11,
                            height: 14,
                            viewBox: '0 0 11 14',
                            fill: 'none',
                            style: {
                                position: 'absolute',
                                left: layout.map((l)=>l.modifiedLine.left - 16),
                                top: layout.map((l)=>l.modifiedLine.top + Math.round((l.lineHeight - 14 - 5) / 2)),
                                pointerEvents: 'none'
                            },
                            onmousedown: (e)=>this._mouseDown(e)
                        }, [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svgElem('path', {
                                d: 'M1 0C1 2.98966 1 5.92087 1 8.49952C1 9.60409 1.89543 10.5 3 10.5H10.5',
                                stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverForeground"])
                            }),
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"].svgElem('path', {
                                d: 'M6 7.5L9.99999 10.49998L6 13.5',
                                stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asCssVariable"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$colors$2f$editorColors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorHoverForeground"])
                            })
                        ])
                    ])
                ];
            })
        ]).keepUpdated(this._store);
        this._register(this._editor.createOverlayWidget({
            domNode: this._root.element,
            minContentWidthInPx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(0),
            position: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])({
                preference: {
                    top: 0,
                    left: 0
                }
            }),
            allowEditorOverflow: false
        }));
    }
    _mouseDown(e) {
        const target_id = traverseParentsUntilId(e.target, new Set([
            DOM_ID_WIDGET,
            DOM_ID_REPLACEMENT,
            DOM_ID_RENAME,
            DOM_ID_OVERLAY
        ]));
        if (!target_id) {
            return;
        }
        e.preventDefault(); // This prevents that the editor loses focus
        this._onDidClick.fire(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"].create(e, target_id === DOM_ID_RENAME));
    }
};
InlineEditsWordReplacementView = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$language$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$theme$2f$common$2f$themeService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IThemeService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$hover$2f$browser$2f$hover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IHoverService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$userInteraction$2f$browser$2f$userInteractionService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IUserInteractionService"])
], InlineEditsWordReplacementView);
function traverseParentsUntilId(element, ids) {
    let current = element;
    while(current){
        if (ids.has(current.id)) {
            return current.id;
        }
        current = current.parentElement;
    }
    return null;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/originalEditorInlineDiffView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OriginalEditorInlineDiffView",
    ()=>OriginalEditorInlineDiffView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$diffEditorViewZones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/components/diffEditorViewZones/diffEditorViewZones.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ class OriginalEditorInlineDiffView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_originalEditor, _state, _modifiedTextModel){
        super();
        this._originalEditor = _originalEditor;
        this._state = _state;
        this._modifiedTextModel = _modifiedTextModel;
        this._onDidClick = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidClick = this._onDidClick.event;
        this.isHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._originalEditor).isTargetHovered((p)=>p.target.type === 6 /* MouseTargetType.CONTENT_TEXT */  && p.target.detail.injectedText?.options.attachedData instanceof InlineEditAttachedData && p.target.detail.injectedText.options.attachedData.owner === this, this._store);
        this._tokenizationFinished = modelTokenizationFinished(this._modifiedTextModel);
        this._decorations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const diff = this._state.read(reader);
            if (!diff) {
                return undefined;
            }
            const modified = diff.modifiedText;
            const showInline = diff.mode === 'insertionInline';
            const hasOneInnerChange = diff.diff.length === 1 && diff.diff[0].innerChanges?.length === 1;
            const showEmptyDecorations = true;
            const originalDecorations = [];
            const modifiedDecorations = [];
            const diffLineAddDecorationBackground = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-line-insert',
                description: 'line-insert',
                isWholeLine: true,
                marginClassName: 'gutter-insert'
            });
            const diffLineDeleteDecorationBackground = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-line-delete',
                description: 'line-delete',
                isWholeLine: true,
                marginClassName: 'gutter-delete'
            });
            const diffWholeLineDeleteDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-delete',
                description: 'char-delete',
                isWholeLine: false,
                zIndex: 1
            });
            const diffWholeLineAddDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-insert',
                description: 'char-insert',
                isWholeLine: true
            });
            const diffAddDecoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-insert',
                description: 'char-insert',
                shouldFillLineOnLineBreak: true
            });
            const diffAddDecorationEmpty = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-char-insert diff-range-empty',
                description: 'char-insert diff-range-empty'
            });
            const NESOriginalBackground = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelDecorationOptions"].register({
                className: 'inlineCompletions-original-lines',
                description: 'inlineCompletions-original-lines',
                isWholeLine: false,
                shouldFillLineOnLineBreak: true
            });
            const showFullLineDecorations = diff.mode !== 'sideBySide' && diff.mode !== 'deletion' && diff.mode !== 'insertionInline' && diff.mode !== 'lineReplacement';
            const hideEmptyInnerDecorations = diff.mode === 'lineReplacement';
            for (const m of diff.diff){
                if (showFullLineDecorations) {
                    if (!m.original.isEmpty) {
                        originalDecorations.push({
                            range: m.original.toInclusiveRange(),
                            options: diffLineDeleteDecorationBackground
                        });
                    }
                    if (!m.modified.isEmpty) {
                        modifiedDecorations.push({
                            range: m.modified.toInclusiveRange(),
                            options: diffLineAddDecorationBackground
                        });
                    }
                }
                if (m.modified.isEmpty || m.original.isEmpty) {
                    if (!m.original.isEmpty) {
                        originalDecorations.push({
                            range: m.original.toInclusiveRange(),
                            options: diffWholeLineDeleteDecoration
                        });
                    }
                    if (!m.modified.isEmpty) {
                        modifiedDecorations.push({
                            range: m.modified.toInclusiveRange(),
                            options: diffWholeLineAddDecoration
                        });
                    }
                } else {
                    const useInlineDiff = showInline && allowsTrueInlineDiffRendering(m);
                    for (const i of m.innerChanges || []){
                        // Don't show empty markers outside the line range
                        if (m.original.contains(i.originalRange.startLineNumber) && !(hideEmptyInnerDecorations && i.originalRange.isEmpty())) {
                            const replacedText = this._originalEditor.getModel()?.getValueInRange(i.originalRange, 1 /* EndOfLinePreference.LF */ );
                            originalDecorations.push({
                                range: i.originalRange,
                                options: {
                                    description: 'char-delete',
                                    shouldFillLineOnLineBreak: false,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classNames"])('inlineCompletions-char-delete', i.originalRange.isSingleLine() && diff.mode === 'insertionInline' && 'single-line-inline', i.originalRange.isEmpty() && 'empty', (i.originalRange.isEmpty() && hasOneInnerChange || diff.mode === 'deletion' && replacedText === '\n') && showEmptyDecorations && !useInlineDiff && 'diff-range-empty'),
                                    inlineClassName: useInlineDiff ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classNames"])('strike-through', 'inlineCompletions') : null,
                                    zIndex: 1
                                }
                            });
                        }
                        if (m.modified.contains(i.modifiedRange.startLineNumber)) {
                            modifiedDecorations.push({
                                range: i.modifiedRange,
                                options: i.modifiedRange.isEmpty() && showEmptyDecorations && !useInlineDiff && hasOneInnerChange ? diffAddDecorationEmpty : diffAddDecoration
                            });
                        }
                        if (useInlineDiff) {
                            const insertedText = modified.getValueOfRange(i.modifiedRange);
                            // when the injected text becomes long, the editor will split it into multiple spans
                            // to be able to get the border around the start and end of the text, we need to split it into multiple segments
                            const textSegments = insertedText.length > 3 ? [
                                {
                                    text: insertedText.slice(0, 1),
                                    extraClasses: [
                                        'start'
                                    ],
                                    offsetRange: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](i.modifiedRange.startColumn - 1, i.modifiedRange.startColumn)
                                },
                                {
                                    text: insertedText.slice(1, -1),
                                    extraClasses: [],
                                    offsetRange: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](i.modifiedRange.startColumn, i.modifiedRange.endColumn - 2)
                                },
                                {
                                    text: insertedText.slice(-1),
                                    extraClasses: [
                                        'end'
                                    ],
                                    offsetRange: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](i.modifiedRange.endColumn - 2, i.modifiedRange.endColumn - 1)
                                }
                            ] : [
                                {
                                    text: insertedText,
                                    extraClasses: [
                                        'start',
                                        'end'
                                    ],
                                    offsetRange: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](i.modifiedRange.startColumn - 1, i.modifiedRange.endColumn)
                                }
                            ];
                            // Tokenization
                            this._tokenizationFinished.read(reader); // reconsider when tokenization is finished
                            const lineTokens = this._modifiedTextModel.tokenization.getLineTokens(i.modifiedRange.startLineNumber);
                            for (const { text, extraClasses, offsetRange } of textSegments){
                                originalDecorations.push({
                                    range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(i.originalRange.getEndPosition()),
                                    options: {
                                        description: 'inserted-text',
                                        before: {
                                            tokens: lineTokens.getTokensInRange(offsetRange),
                                            content: text,
                                            inlineClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classNames"])('inlineCompletions-char-insert', i.modifiedRange.isSingleLine() && diff.mode === 'insertionInline' && 'single-line-inline', ...extraClasses // include extraClasses for additional styling if provided
                                            ),
                                            cursorStops: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InjectedTextCursorStops"].None,
                                            attachedData: new InlineEditAttachedData(this)
                                        },
                                        zIndex: 2,
                                        showIfCollapsed: true
                                    }
                                });
                            }
                        }
                    }
                }
            }
            if (diff.editorType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor) {
                for (const m of diff.diff){
                    if (!m.original.isEmpty) {
                        originalDecorations.push({
                            range: m.original.toExclusiveRange(),
                            options: NESOriginalBackground
                        });
                    }
                }
            }
            return {
                originalDecorations,
                modifiedDecorations
            };
        });
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._originalEditor).setDecorations(this._decorations.map((d)=>d?.originalDecorations ?? [])));
        const modifiedCodeEditor = this._state.map((s)=>s?.modifiedCodeEditor);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorunWithStore"])((reader, store)=>{
            const e = modifiedCodeEditor.read(reader);
            if (e) {
                store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(e).setDecorations(this._decorations.map((d)=>d?.modifiedDecorations ?? [])));
            }
        }));
        this._register(this._originalEditor.onMouseUp((e)=>{
            if (e.target.type !== 6 /* MouseTargetType.CONTENT_TEXT */ ) {
                return;
            }
            const a = e.target.detail.injectedText?.options.attachedData;
            if (a instanceof InlineEditAttachedData && a.owner === this) {
                this._onDidClick.fire(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditClickEvent"](e.event));
            }
        }));
    }
}
class InlineEditAttachedData {
    constructor(owner){
        this.owner = owner;
    }
}
function allowsTrueInlineDiffRendering(mapping) {
    if (!mapping.innerChanges) {
        return false;
    }
    return mapping.innerChanges.every((c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$diffEditorViewZones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rangeIsSingleLine"])(c.modifiedRange) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$diffEditor$2f$components$2f$diffEditorViewZones$2f$diffEditorViewZones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rangeIsSingleLine"])(c.originalRange));
}
let i = 0;
function modelTokenizationFinished(model) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(model.onDidChangeTokens, ()=>i++);
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsView",
    ()=>InlineEditsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/equals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/abstractText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/textLength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/diff/rangeMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsCollapsedView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsCollapsedView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsCustomView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsCustomView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsDeletionView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsDeletionView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsInsertionView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsInsertionView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsLineReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsLineReplacementView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$inlineEditsLongDistanceHint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/longDistanceHint/inlineEditsLongDistanceHint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsSideBySideView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsSideBySideView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/inlineEditsWordReplacementView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$originalEditorInlineDiffView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/originalEditorInlineDiffView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$jumpToView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViews/jumpToView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/getPositionOffsetTransformerFromTextModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
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
let InlineEditsView = class InlineEditsView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _model, _simpleModel, _inlineSuggestInfo, _showCollapsed, _instantiationService){
        super();
        this._editor = _editor;
        this._model = _model;
        this._simpleModel = _simpleModel;
        this._inlineSuggestInfo = _inlineSuggestInfo;
        this._showCollapsed = _showCollapsed;
        this._instantiationService = _instantiationService;
        this._tabAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>this._model.read(reader)?.tabAction.read(reader) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive);
        this.displayRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this._uiState.read(reader);
            if (!state) {
                return undefined;
            }
            if (state.target.uri.toString() !== this._editorObs.model.read(reader)?.uri.toString()) {
                return undefined;
            }
            if (state.state?.kind === 'custom') {
                const range = state.state.displayLocation?.range;
                if (!range) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('custom view should have a range');
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"](range.startLineNumber, range.endLineNumber);
            }
            if (state.state?.kind === 'insertionMultiLine') {
                return this._insertion.originalLines.read(reader);
            }
            return state.edit.displayRange;
        });
        this._currentInlineEditCache = undefined;
        this._uiState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const model = this._model.read(reader);
            const textModel = this._editorObs.model.read(reader);
            if (!model || !textModel || !this._constructorDone.read(reader)) {
                return undefined;
            }
            const inlineEdit = model.inlineEdit;
            let diff;
            let mappings;
            let newText = undefined;
            if (inlineEdit.edit) {
                mappings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RangeMapping"].fromEdit(inlineEdit.edit);
                newText = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringText"](inlineEdit.edit.apply(inlineEdit.originalText));
                diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineRangeMappingFromRangeMappings"])(mappings, inlineEdit.originalText, newText);
            } else {
                mappings = [];
                diff = [];
                newText = inlineEdit.originalText;
            }
            let state = this._determineRenderState(model, reader, diff, newText);
            if (!state) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedError"])(new Error(`unable to determine view: tried to render ${this._previousView?.view}`));
                return undefined;
            }
            const longDistanceHint = this._getLongDistanceHintState(model, reader);
            if (longDistanceHint && longDistanceHint.isVisible) {
                state.viewData.setLongDistanceViewData(longDistanceHint.lineNumber, inlineEdit.lineEdit.lineRange.startLineNumber);
            }
            state.viewData.isForAnotherDocument = !inlineEdit.originalText.targets(textModel);
            if (state.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide) {
                const indentationAdjustmentEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createReindentEdit"])(newText.getValue(), inlineEdit.modifiedLineRange, textModel.getOptions().tabSize);
                newText = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringText"](indentationAdjustmentEdit.applyToString(newText.getValue()));
                mappings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEditToModifiedRangeMappings"])(mappings, indentationAdjustmentEdit);
                diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$rangeMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineRangeMappingFromRangeMappings"])(mappings, inlineEdit.originalText, newText);
            }
            this._previewTextModel.setLanguage(textModel.getLanguageId());
            const previousNewText = this._previewTextModel.getValue();
            if (previousNewText !== newText.getValue()) {
                this._previewTextModel.setEOL(textModel.getEndOfLineSequence());
                const updateOldValueEdit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"].replace(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](0, previousNewText.length), newText.getValue());
                const updateOldValueEditSmall = updateOldValueEdit.removeCommonSuffixPrefix(previousNewText);
                const textEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPositionOffsetTransformerFromTextModel"])(this._previewTextModel).getTextEdit(updateOldValueEditSmall);
                this._previewTextModel.edit(textEdit);
            }
            if (this._showCollapsed.read(reader)) {
                state = {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Collapsed,
                    viewData: state.viewData
                };
            }
            model.handleInlineEditShownNextFrame(state.kind, state.viewData);
            const nextCursorPosition = inlineEdit.action?.kind === 'jumpTo' ? inlineEdit.action.position : null;
            return {
                state,
                diff,
                edit: inlineEdit,
                newText: newText.getValue(),
                newTextLineCount: inlineEdit.modifiedLineRange.length,
                editorType: model.editorType,
                longDistanceHint,
                nextCursorPosition: nextCursorPosition,
                target: inlineEdit.inlineCompletion.originalTextRef
            };
        });
        this.inlineEditsIsHovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            return this._sideBySide.isHovered.read(reader) || this._wordReplacementViews.read(reader).some((v)=>v.isHovered.read(reader)) || this._deletion.isHovered.read(reader) || this._inlineDiffView.isHovered.read(reader) || this._lineReplacementView.isHovered.read(reader) || this._insertion.isHovered.read(reader) || this._customView.isHovered.read(reader) || this._longDistanceHint.map((v, r)=>v?.isHovered.read(r) ?? false).read(reader);
        });
        this.gutterIndicatorOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            // TODO: have a better way to tell the gutter indicator view where the edit is inside a viewzone
            if (this._uiState.read(reader)?.state?.kind === 'insertionMultiLine') {
                return this._insertion.startLineOffset.read(reader);
            }
            return 0;
        });
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._constructorDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this._previewTextModel = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModel"], '', this._editor.getModel().getLanguageId(), {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModel"].DEFAULT_CREATION_OPTIONS,
            bracketPairColorizationOptions: {
                enabled: true,
                independentColorPoolPerBracketType: false
            }
        }, null));
        this._sideBySide = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsSideBySideView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsSideBySideView"], this._editor, this._model.map((m)=>m?.inlineEdit), this._previewTextModel, this._uiState.map((s)=>s && s.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide ? {
                newTextLineCount: s.newTextLineCount,
                editorType: s.editorType
            } : undefined), this._tabAction));
        this._deletion = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsDeletionView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsDeletionView"], this._editor, this._model.map((m)=>m?.inlineEdit), this._uiState.map((s)=>s && s.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Deletion ? {
                originalRange: s.state.originalRange,
                deletions: s.state.deletions,
                editorType: s.editorType
            } : undefined), this._tabAction));
        this._insertion = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsInsertionView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsInsertionView"], this._editor, this._uiState.map((s)=>s && s.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionMultiLine ? {
                lineNumber: s.state.lineNumber,
                startColumn: s.state.column,
                text: s.state.text,
                editorType: s.editorType
            } : undefined), this._tabAction));
        this._inlineCollapsedView = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsCollapsedView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsCollapsedView"], this._editor, this._model.map((m, reader)=>this._uiState.read(reader)?.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Collapsed ? m?.inlineEdit : undefined)));
        this._customView = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsCustomView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsCustomView"], this._editor, this._model.map((m, reader)=>this._uiState.read(reader)?.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Custom ? m?.displayLocation : undefined), this._tabAction, this._uiState.map((s)=>s?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor)));
        this._showLongDistanceHint = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map(this, (s)=>s.edits.showLongDistanceHint);
        this._longDistanceHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (!this._showLongDistanceHint.read(reader)) {
                return undefined;
            }
            return reader.store.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$longDistanceHint$2f$inlineEditsLongDistanceHint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsLongDistanceHint"], this._editor, this._uiState.map((s, reader)=>s?.longDistanceHint ? {
                    hint: s.longDistanceHint,
                    newTextLineCount: s.newTextLineCount,
                    edit: s.edit,
                    diff: s.diff,
                    editorType: s.editorType,
                    model: this._simpleModel.read(reader),
                    inlineSuggestInfo: this._inlineSuggestInfo.read(reader),
                    nextCursorPosition: s.nextCursorPosition,
                    target: s.target
                } : undefined), this._previewTextModel, this._tabAction));
        }).recomputeInitiallyAndOnChange(this._store);
        this._inlineDiffViewState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const e = this._uiState.read(reader);
            if (!e || !e.state) {
                return undefined;
            }
            if (e.state.kind === 'wordReplacements' || e.state.kind === 'insertionMultiLine' || e.state.kind === 'collapsed' || e.state.kind === 'custom' || e.state.kind === 'jumpTo') {
                return undefined;
            }
            return {
                modifiedText: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringText"](e.newText),
                diff: e.diff,
                mode: e.state.kind,
                modifiedCodeEditor: this._sideBySide.previewEditor,
                editorType: e.editorType
            };
        });
        this._inlineDiffView = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$originalEditorInlineDiffView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OriginalEditorInlineDiffView"](this._editor, this._inlineDiffViewState, this._previewTextModel));
        this._jumpToView = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$jumpToView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JumpToView"], this._editorObs, {
            style: 'label'
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const s = this._uiState.read(reader);
            if (s?.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].JumpTo) {
                return {
                    jumpToPosition: s.state.position
                };
            }
            return undefined;
        })));
        const wordReplacements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            equalsFn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"].arrayC(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"].thisC())
        }, (reader)=>{
            const s = this._uiState.read(reader);
            return s?.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements ? s.state.replacements.map((replacement)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WordReplacementsViewData"](replacement, s.editorType, s.state?.alternativeAction)) : [];
        });
        this._wordReplacementViews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapObservableArrayCached"])(this, wordReplacements, (viewData, store)=>{
            return store.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsWordReplacementView"], this._editorObs, viewData, this._tabAction));
        });
        this._lineReplacementView = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsLineReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsLineReplacementView"], this._editorObs, this._uiState.map((s)=>s?.state?.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement ? {
                originalRange: s.state.originalRange,
                modifiedRange: s.state.modifiedRange,
                modifiedLines: s.state.modifiedLines,
                replacements: s.state.replacements
            } : undefined), this._uiState.map((s)=>s?.editorType ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor), this._tabAction));
        this._useCodeShifting = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map((s)=>s.edits.allowCodeShifting);
        this._renderSideBySide = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map((s)=>s.edits.renderSideBySide);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return;
            }
            reader.store.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].any(this._sideBySide.onDidClick, this._lineReplacementView.onDidClick, this._insertion.onDidClick, ...this._wordReplacementViews.read(reader).map((w)=>w.onDidClick), this._inlineDiffView.onDidClick, this._customView.onDidClick)((clickEvent)=>{
                if (this._viewHasBeenShownLongerThan(350)) {
                    clickEvent.event.preventDefault();
                    model.accept(clickEvent.alternativeAction);
                }
            }));
        }));
        this._wordReplacementViews.recomputeInitiallyAndOnChange(this._store);
        const minEditorScrollHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            return Math.max(...this._wordReplacementViews.read(reader).map((v)=>v.minEditorScrollHeight.read(reader)), this._lineReplacementView.minEditorScrollHeight.read(reader), this._customView.minEditorScrollHeight.read(reader));
        }).recomputeInitiallyAndOnChange(this._store);
        let viewZoneId;
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const minScrollHeight = minEditorScrollHeight.read(reader);
            const textModel = this._editorObs.model.read(reader);
            if (!textModel) {
                return;
            }
            this._editor.changeViewZones((accessor)=>{
                const scrollHeight = this._editor.getScrollHeight();
                const viewZoneHeight = minScrollHeight - scrollHeight + 1 /* Add 1px so there is a small gap */ ;
                if (viewZoneHeight !== 0 && viewZoneId !== undefined) {
                    accessor.removeZone(viewZoneId);
                    viewZoneId = undefined;
                }
                if (viewZoneHeight <= 0) {
                    return;
                }
                viewZoneId = accessor.addZone({
                    afterLineNumber: textModel.getLineCount(),
                    heightInPx: viewZoneHeight,
                    domNode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('div.minScrollHeightViewZone')
                });
            });
        }));
        this._constructorDone.set(true, undefined); // TODO: remove and use correct initialization order
    }
    _getLongDistanceHintState(model, reader) {
        if (model.inlineEdit.inlineCompletion.identity.jumpedTo.read(reader)) {
            return undefined;
        }
        if (model.inlineEdit.action === undefined) {
            return undefined;
        }
        const editorModel = this._editorObs.model.read(reader);
        if (!editorModel || !model.inlineEdit.originalText.targets(editorModel)) {
            return {
                isVisible: true,
                lineNumber: model.inlineEdit.cursorPosition.lineNumber
            };
        }
        if (this._currentInlineEditCache?.inlineSuggestionIdentity !== model.inlineEdit.inlineCompletion.identity) {
            this._currentInlineEditCache = {
                inlineSuggestionIdentity: model.inlineEdit.inlineCompletion.identity,
                firstCursorLineNumber: model.inlineEdit.cursorPosition.lineNumber
            };
        }
        return {
            lineNumber: this._currentInlineEditCache.firstCursorLineNumber,
            isVisible: !model.inViewPort.read(reader)
        };
    }
    _getCacheId(model) {
        return model.inlineEdit.inlineCompletion.identity.id;
    }
    _determineView(model, reader, diff, newText) {
        // Check if we can use the previous view if it is the same InlineCompletion as previously shown
        const inlineEdit = model.inlineEdit;
        const canUseCache = this._previousView?.id === this._getCacheId(model) && this._previousView?.uri.toString() === this._editorObs.model.get().uri.toString();
        const reconsiderViewEditorWidthChange = this._previousView?.editorWidth !== this._editorObs.layoutInfoWidth.read(reader) && (this._previousView?.view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide || this._previousView?.view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement);
        if (canUseCache && !reconsiderViewEditorWidthChange) {
            return this._previousView.view;
        }
        const action = model.inlineEdit.inlineCompletion.action;
        if (action?.kind === 'edit' && action.alternativeAction) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements;
        }
        const targetUri = model.inlineEdit.inlineCompletion.originalTextRef.uri;
        const currentUri = this._editorObs.model.read(reader)?.uri;
        if (currentUri && targetUri.toString() !== currentUri.toString()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Custom;
        }
        if (model.displayLocation && !model.inlineEdit.inlineCompletion.identity.jumpedTo.read(reader)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Custom;
        }
        // Determine the view based on the edit / diff
        const numOriginalLines = inlineEdit.originalLineRange.length;
        const numModifiedLines = inlineEdit.modifiedLineRange.length;
        const inner = diff.flatMap((d)=>d.innerChanges ?? []);
        const isSingleInnerEdit = inner.length === 1;
        if (model.editorType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor) {
            if (isSingleInnerEdit && this._useCodeShifting.read(reader) !== 'never' && isSingleLineInsertion(diff)) {
                if (isSingleLineInsertionAfterPosition(diff, inlineEdit.cursorPosition)) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionInline;
                }
                // If we have a single line insertion before the cursor position, we do not want to move the cursor by inserting
                // the suggestion inline. Use a line replacement view instead. Do not use word replacement view.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement;
            }
            if (isDeletion(inner, inlineEdit, newText)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Deletion;
            }
            if (isSingleMultiLineInsertion(diff) && this._useCodeShifting.read(reader) === 'always') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionMultiLine;
            }
            const allInnerChangesNotTooLong = inner.every((m)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(m.originalRange).columnCount < __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsWordReplacementView"].MAX_LENGTH && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(m.modifiedRange).columnCount < __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsWordReplacementView"].MAX_LENGTH);
            if (allInnerChangesNotTooLong && isSingleInnerEdit && numOriginalLines === 1 && numModifiedLines === 1) {
                // Do not show indentation changes with word replacement view
                const modifiedText = inner.map((m)=>newText.getValueOfRange(m.modifiedRange));
                const originalText = inner.map((m)=>model.inlineEdit.originalText.getValueOfRange(m.originalRange));
                if (!modifiedText.some((v)=>v.includes('\t')) && !originalText.some((v)=>v.includes('\t'))) {
                    // Make sure there is no insertion, even if we grow them
                    if (!inner.some((m)=>m.originalRange.isEmpty()) || !growEditsUntilWhitespace(inner.map((m)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](m.originalRange, '')), inlineEdit.originalText).some((e)=>e.range.isEmpty() && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(e.range).columnCount < __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsWordReplacementView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsWordReplacementView"].MAX_LENGTH)) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements;
                    }
                }
            }
        }
        if (numOriginalLines > 0 && numModifiedLines > 0) {
            if (numOriginalLines === 1 && numModifiedLines === 1 && model.editorType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor /* prefer side by side in diff editor */ ) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement;
            }
            if (this._renderSideBySide.read(reader) !== 'never' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViews$2f$inlineEditsSideBySideView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsSideBySideView"].fitsInsideViewport(this._editor, this._previewTextModel, inlineEdit, reader)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement;
        }
        if (model.editorType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor) {
            if (isDeletion(inner, inlineEdit, newText)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Deletion;
            }
            if (isSingleMultiLineInsertion(diff) && this._useCodeShifting.read(reader) === 'always') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionMultiLine;
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide;
    }
    _determineRenderState(model, reader, diff, newText) {
        if (model.inlineEdit.action?.kind === 'jumpTo') {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].JumpTo,
                position: model.inlineEdit.action.position,
                viewData: createEmptyViewData()
            };
        }
        const inlineEdit = model.inlineEdit;
        let view = this._determineView(model, reader, diff, newText);
        if (this._willRenderAboveCursor(reader, inlineEdit, view)) {
            switch(view){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement:
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements:
                    view = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide;
                    break;
            }
        }
        this._previousView = {
            id: this._getCacheId(model),
            view,
            editorWidth: this._editor.getLayoutInfo().width,
            timestamp: Date.now(),
            uri: this._editorObs.model.get().uri
        };
        const inner = diff.flatMap((d)=>d.innerChanges ?? []);
        const textModel = this._editor.getModel();
        const stringChanges = inner.map((m)=>({
                originalRange: m.originalRange,
                modifiedRange: m.modifiedRange,
                original: inlineEdit.originalText.getValueOfRange(m.originalRange),
                modified: newText.getValueOfRange(m.modifiedRange)
            }));
        const viewData = getViewData(inlineEdit, stringChanges, textModel);
        switch(view){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionInline:
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionInline,
                    viewData
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide:
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].SideBySide,
                    viewData
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Collapsed:
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Collapsed,
                    viewData
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Custom:
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Custom,
                    displayLocation: model.displayLocation,
                    viewData
                };
        }
        if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Deletion) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Deletion,
                originalRange: inlineEdit.originalLineRange,
                deletions: inner.map((m)=>m.originalRange),
                viewData
            };
        }
        if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionMultiLine) {
            const change = inner[0];
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].InsertionMultiLine,
                lineNumber: change.originalRange.startLineNumber,
                column: change.originalRange.startColumn,
                text: newText.getValueOfRange(change.modifiedRange),
                viewData
            };
        }
        const replacements = stringChanges.map((m)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](m.originalRange, m.modified));
        if (replacements.length === 0) {
            return undefined;
        }
        if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements) {
            let grownEdits = growEditsToEntireWord(replacements, inlineEdit.originalText);
            if (grownEdits.some((e)=>e.range.isEmpty())) {
                grownEdits = growEditsUntilWhitespace(replacements, inlineEdit.originalText);
            }
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements,
                replacements: grownEdits,
                alternativeAction: model.inlineEdit.action?.alternativeAction,
                viewData
            };
        }
        if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement,
                originalRange: inlineEdit.originalLineRange,
                modifiedRange: inlineEdit.modifiedLineRange,
                modifiedLines: inlineEdit.modifiedLineRange.mapToLineArray((line)=>newText.getLineAt(line)),
                replacements: inner.map((m)=>({
                        originalRange: m.originalRange,
                        modifiedRange: m.modifiedRange
                    })),
                viewData
            };
        }
        return undefined;
    }
    _willRenderAboveCursor(reader, inlineEdit, view) {
        const useCodeShifting = this._useCodeShifting.read(reader);
        if (useCodeShifting === 'always') {
            return false;
        }
        for (const cursorPosition of inlineEdit.multiCursorPositions){
            if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].WordReplacements && cursorPosition.lineNumber === inlineEdit.originalLineRange.startLineNumber + 1) {
                return true;
            }
            if (view === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].LineReplacement && cursorPosition.lineNumber >= inlineEdit.originalLineRange.endLineNumberExclusive && cursorPosition.lineNumber < inlineEdit.modifiedLineRange.endLineNumberExclusive + inlineEdit.modifiedLineRange.length) {
                return true;
            }
        }
        return false;
    }
    _viewHasBeenShownLongerThan(durationMs) {
        const viewCreationTime = this._previousView?.timestamp;
        if (!viewCreationTime) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('viewHasBeenShownLongThan called before a view has been shown');
        }
        const currentTime = Date.now();
        return currentTime - viewCreationTime >= durationMs;
    }
};
InlineEditsView = __decorate([
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"])
], InlineEditsView);
const createEmptyViewData = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewData"](-1, -1, -1, -1, -1, -1, -1, true);
function getViewData(inlineEdit, stringChanges, textModel) {
    if (!inlineEdit.edit) {
        return createEmptyViewData();
    }
    const cursorPosition = inlineEdit.cursorPosition;
    const startsWithEOL = stringChanges.length === 0 ? false : stringChanges[0].modified.startsWith(textModel.getEOL());
    const viewData = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewData"](inlineEdit.edit.replacements.length === 0 ? 0 : inlineEdit.edit.replacements[0].range.getStartPosition().column - cursorPosition.column, inlineEdit.lineEdit.lineRange.startLineNumber - cursorPosition.lineNumber + (startsWithEOL && inlineEdit.lineEdit.lineRange.startLineNumber >= cursorPosition.lineNumber ? 1 : 0), inlineEdit.lineEdit.lineRange.length, inlineEdit.lineEdit.newLines.length, stringChanges.reduce((acc, r)=>acc + r.original.length, 0), stringChanges.reduce((acc, r)=>acc + r.modified.length, 0), stringChanges.length, stringChanges.every((r)=>r.original === stringChanges[0].original && r.modified === stringChanges[0].modified));
    return viewData;
}
function isSingleLineInsertion(diff) {
    return diff.every((m)=>m.innerChanges.every((r)=>isWordInsertion(r)));
    //TURBOPACK unreachable
    ;
    function isWordInsertion(r) {
        if (!r.originalRange.isEmpty()) {
            return false;
        }
        const isInsertionWithinLine = r.modifiedRange.startLineNumber === r.modifiedRange.endLineNumber;
        if (!isInsertionWithinLine) {
            return false;
        }
        return true;
    }
}
function isSingleLineInsertionAfterPosition(diff, position) {
    if (!position) {
        return false;
    }
    if (!isSingleLineInsertion(diff)) {
        return false;
    }
    const pos = position;
    return diff.every((m)=>m.innerChanges.every((r)=>isStableWordInsertion(r)));
    //TURBOPACK unreachable
    ;
    function isStableWordInsertion(r) {
        const insertPosition = r.originalRange.getStartPosition();
        if (pos.isBeforeOrEqual(insertPosition)) {
            return true;
        }
        if (insertPosition.lineNumber < pos.lineNumber) {
            return true;
        }
        return false;
    }
}
function isSingleMultiLineInsertion(diff) {
    const inner = diff.flatMap((d)=>d.innerChanges ?? []);
    if (inner.length !== 1) {
        return false;
    }
    const change = inner[0];
    if (!change.originalRange.isEmpty()) {
        return false;
    }
    if (change.modifiedRange.startLineNumber === change.modifiedRange.endLineNumber) {
        return false;
    }
    return true;
}
function isDeletion(inner, inlineEdit, newText) {
    const innerValues = inner.map((m)=>({
            original: inlineEdit.originalText.getValueOfRange(m.originalRange),
            modified: newText.getValueOfRange(m.modifiedRange)
        }));
    return innerValues.every(({ original, modified })=>modified.trim() === '' && original.length > 0 && (original.length > modified.length || original.trim() !== ''));
}
function growEditsToEntireWord(replacements, originalText) {
    return _growEdits(replacements, originalText, (char)=>/^[a-zA-Z]$/.test(char));
}
function growEditsUntilWhitespace(replacements, originalText) {
    return _growEdits(replacements, originalText, (char)=>!/^\s$/.test(char));
}
function _growEdits(replacements, originalText, fn) {
    const result = [];
    replacements.sort((a, b)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].compareRangesUsingStarts(a.range, b.range));
    for (const edit of replacements){
        let startIndex = edit.range.startColumn - 1;
        let endIndex = edit.range.endColumn - 2;
        let prefix = '';
        let suffix = '';
        const startLineContent = originalText.getLineAt(edit.range.startLineNumber);
        const endLineContent = originalText.getLineAt(edit.range.endLineNumber);
        if (isIncluded(startLineContent[startIndex])) {
            // grow to the left
            while(isIncluded(startLineContent[startIndex - 1])){
                prefix = startLineContent[startIndex - 1] + prefix;
                startIndex--;
            }
        }
        if (isIncluded(endLineContent[endIndex]) || endIndex < startIndex) {
            // grow to the right
            while(isIncluded(endLineContent[endIndex + 1])){
                suffix += endLineContent[endIndex + 1];
                endIndex++;
            }
        }
        // create new edit and merge together if they are touching
        let newEdit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](edit.range.startLineNumber, startIndex + 1, edit.range.endLineNumber, endIndex + 2), prefix + edit.text + suffix);
        if (result.length > 0 && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].areIntersectingOrTouching(result[result.length - 1].range, newEdit.range)) {
            newEdit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"].joinReplacements([
                result.pop(),
                newEdit
            ], originalText);
        }
        result.push(newEdit);
    }
    function isIncluded(c) {
        if (c === undefined) {
            return false;
        }
        return fn(c);
    }
    return result;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewProducer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineEditsViewAndDiffProducer",
    ()=>InlineEditsViewAndDiffProducer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditWithChanges$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditWithChanges.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorView.js [app-client] (ecmascript)");
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
let InlineEditsViewAndDiffProducer = class InlineEditsViewAndDiffProducer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _model, _showCollapsed, instantiationService){
        super();
        this._editor = _editor;
        this._model = _model;
        this._showCollapsed = _showCollapsed;
        this._inlineEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return undefined;
            }
            const textModel = this._editor.getModel();
            if (!textModel) {
                return undefined;
            }
            const state = model.inlineEditState.read(reader);
            if (!state) {
                return undefined;
            }
            const action = state.inlineSuggestion.action;
            let diffEdits;
            if (action?.kind === 'edit') {
                const editOffset = action.stringEdit;
                const t = state.inlineSuggestion.originalTextRef.getTransformer();
                const edits = editOffset.replacements.map((e)=>{
                    const innerEditRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(t.getPosition(e.replaceRange.start), t.getPosition(e.replaceRange.endExclusive));
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](innerEditRange, e.newText);
                });
                diffEdits = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"](edits);
            } else {
                diffEdits = undefined;
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditWithChanges$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditWithChanges"](state.inlineSuggestion.originalTextRef, action, diffEdits, model.primaryPosition.read(undefined), model.allPositions.read(undefined), state.inlineSuggestion.source.inlineSuggestions.commands ?? [], state.inlineSuggestion);
        });
        this._inlineEditModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return undefined;
            }
            const edit = this._inlineEdit.read(reader);
            if (!edit) {
                return undefined;
            }
            const tabAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
                /** @description tabAction */ if (this._editorObs.isFocused.read(reader)) {
                    if (model.tabShouldJumpToInlineEdit.read(reader)) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Jump;
                    }
                    if (model.tabShouldAcceptInlineEdit.read(reader)) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept;
                    }
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive;
            });
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelPerInlineEdit"](model, edit, tabAction);
        });
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this.view = this._register(instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsView"], this._editor, this._inlineEditModel, this._model.map((model)=>model ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleInlineSuggestModel"].fromInlineCompletionModel(model) : undefined), this._inlineEdit.map((e)=>e ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestionGutterMenuData"].fromInlineSuggestion(e.inlineCompletion) : undefined), this._showCollapsed));
    }
};
InlineEditsViewAndDiffProducer = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"])
], InlineEditsViewAndDiffProducer);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineSuggestionsView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineSuggestionsView",
    ()=>InlineSuggestionsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$domStylesheets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/domStylesheets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hotReloadHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hotReloadHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$inlineCompletionsHintsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/hintsWidget/inlineCompletionsHintsWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/ghostText/ghostTextView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsNewUsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsNewUsers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewProducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewProducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
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
let InlineSuggestionsView = class InlineSuggestionsView extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        this.hot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hotReloadHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHotClass"])(this);
    }
    constructor(_editor, _model, _focusIsInMenu, _instantiationService){
        super();
        this._editor = _editor;
        this._model = _model;
        this._focusIsInMenu = _focusIsInMenu;
        this._instantiationService = _instantiationService;
        this._ghostTexts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const model = this._model.read(reader);
            return model?.ghostTexts.read(reader) ?? [];
        });
        this._inlineEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._model.read(reader)?.inlineEditState.read(reader)?.inlineSuggestion);
        this._everHadInlineEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedObservableWithCache"])(this, (reader, last)=>last || !!this._inlineEdit.read(reader) || !!this._model.read(reader)?.inlineCompletionState.read(reader)?.inlineSuggestion?.showInlineEditMenu);
        // To break a cyclic dependency
        this._indicatorIsHoverVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, undefined);
        this._showInlineEditCollapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this._model.read(reader)?.showCollapsed.read(reader) ?? false;
            return s && !this._indicatorIsHoverVisible.read(reader)?.read(reader);
        });
        this._inlineEditWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedDisposable"])((reader)=>{
            if (!this._everHadInlineEdit.read(reader)) {
                return undefined;
            }
            return this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewProducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsViewAndDiffProducer"], this._editor, this._model, this._showInlineEditCollapsed);
        });
        this._gutterIndicatorState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const model = this._model.read(reader);
            if (!model) {
                return undefined;
            }
            const state = model.state.read(reader);
            if (state?.kind === 'ghostText' && state.inlineSuggestion?.showInlineEditMenu) {
                return {
                    displayRange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].ofLength(state.primaryGhostText.lineNumber, 1),
                    tabAction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._editorObs.isFocused.read(reader) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive),
                    gutterIndicatorOffset: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(getGhostTextTopOffset(state.inlineSuggestion, this._editor)),
                    inlineSuggestion: state.inlineSuggestion,
                    model
                };
            } else if (state?.kind === 'inlineEdit') {
                const inlineEditWidget = this._inlineEditWidget.read(reader)?.view;
                if (!inlineEditWidget) {
                    return undefined;
                }
                const displayRange = inlineEditWidget.displayRange.read(reader);
                if (!displayRange) {
                    return undefined;
                }
                return {
                    displayRange,
                    tabAction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
                        if (this._editorObs.isFocused.read(reader)) {
                            if (model.tabShouldJumpToInlineEdit.read(reader)) {
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Jump;
                            }
                            if (model.tabShouldAcceptInlineEdit.read(reader)) {
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Accept;
                            }
                        }
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive;
                    }),
                    gutterIndicatorOffset: inlineEditWidget.gutterIndicatorOffset,
                    inlineSuggestion: state.inlineSuggestion,
                    model
                };
            } else {
                return undefined;
            }
        });
        this._stablizedGhostTexts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertItemsToStableObservables"])(this._ghostTexts, this._store);
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        this._ghostTextWidgets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapObservableArrayCached"])(this, this._stablizedGhostTexts, (ghostText, store)=>store.add(this._createGhostText(ghostText))).recomputeInitiallyAndOnChange(this._store);
        this._inlineEditWidget.recomputeInitiallyAndOnChange(this._store);
        this._fontFamily = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map((val)=>val.fontFamily);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$domStylesheets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStyleSheetFromObservable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const fontFamily = this._fontFamily.read(reader);
            return `
.monaco-editor .ghost-text-decoration,
.monaco-editor .ghost-text-decoration-preview,
.monaco-editor .ghost-text {
	font-family: ${fontFamily};
}`;
        })));
        this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$hintsWidget$2f$inlineCompletionsHintsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsHintsWidget"](this._editor, this._model, this._instantiationService));
        this._indicator = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsGutterIndicator"], this._editorObs, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const s = this._gutterIndicatorState.read(reader);
            if (!s) {
                return undefined;
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsGutterIndicatorData"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestionGutterMenuData"].fromInlineSuggestion(s.inlineSuggestion), s.displayRange, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$components$2f$gutterIndicatorView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleInlineSuggestModel"].fromInlineCompletionModel(s.model), s.inlineSuggestion.action?.kind === 'edit' ? s.inlineSuggestion.action.alternativeAction : undefined);
        }), this._gutterIndicatorState.map((s, reader)=>s?.tabAction?.read(reader) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditTabAction"].Inactive), this._gutterIndicatorState.map((s, reader)=>s?.gutterIndicatorOffset?.read(reader) ?? 0), this._inlineEditWidget.map((w, reader)=>w?.view.inlineEditsIsHovered.read(reader) ?? false), this._focusIsInMenu));
        this._indicatorIsHoverVisible.set(this._indicator.isHoverVisible, undefined);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const w = this._inlineEditWidget.read(reader);
            if (!w) {
                return undefined;
            }
            return reader.store.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsNewUsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineEditsOnboardingExperience"], w._inlineEditModel, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(this._indicator), w.view._inlineCollapsedView));
        }).recomputeInitiallyAndOnChange(this._store);
    }
    _createGhostText(ghostText) {
        return this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextView"], this._editor, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])((reader)=>{
            const model = this._model.read(reader);
            const inlineCompletion = model?.inlineCompletionState.read(reader)?.inlineSuggestion;
            if (!model || !inlineCompletion) {
                // editor.suggest.preview: true causes situations where we have ghost text, but no suggest preview.
                return {
                    ghostText: ghostText.read(reader),
                    handleInlineCompletionShown: ()=>{},
                    warning: undefined
                };
            }
            return {
                ghostText: ghostText.read(reader),
                handleInlineCompletionShown: (viewData)=>model.handleInlineSuggestionShown(inlineCompletion, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].GhostText, viewData, Date.now()),
                warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$ghostText$2f$ghostTextView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextWidgetWarning"].from(model?.warning.read(reader))
            };
        }), {
            useSyntaxHighlighting: this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ ).map((v)=>v.syntaxHighlightingEnabled),
            highlightShortSuggestions: true
        });
    }
    shouldShowHoverAtViewZone(viewZoneId) {
        return this._ghostTextWidgets.get()[0]?.ownsViewZone(viewZoneId) ?? false;
    }
};
InlineSuggestionsView = __decorate([
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"])
], InlineSuggestionsView);
function getGhostTextTopOffset(inlineCompletion, editor) {
    const replacement = inlineCompletion.getSingleTextEdit();
    const textModel = editor.getModel();
    if (!textModel) {
        return 0;
    }
    const EOL = textModel.getEOL();
    if (replacement.range.isEmpty() && replacement.text.startsWith(EOL)) {
        const lineHeight = editor.getLineHeightForPosition(replacement.range.getStartPosition());
        return countPrefixRepeats(replacement.text, EOL) * lineHeight;
    }
    return 0;
}
function countPrefixRepeats(str, prefix) {
    if (!prefix.length) {
        return 0;
    }
    let count = 0;
    let i = 0;
    while(str.startsWith(prefix, i)){
        count++;
        i += prefix.length;
    }
    return count;
}
;
}),
]);

//# sourceMappingURL=a9bf9_monaco-editor_esm_vs_editor_contrib_inlineCompletions_browser_view_90fa325b._.js.map