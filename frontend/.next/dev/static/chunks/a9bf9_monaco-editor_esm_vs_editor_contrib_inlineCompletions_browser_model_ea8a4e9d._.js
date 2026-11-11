(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/changeRecorder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextModelChangeRecorder",
    ()=>TextModelChangeRecorder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/log/common/log.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$codeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/widget/codeEditor/codeEditorWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$structuredLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/structuredLogger.js [app-client] (ecmascript)");
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
let TextModelChangeRecorder = class TextModelChangeRecorder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editor, _instantiationService, _loggerService){
        super();
        this._editor = _editor;
        this._instantiationService = _instantiationService;
        this._loggerService = _loggerService;
        this._structuredLogger = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$structuredLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StructuredLogger"].cast(), 'editor.inlineSuggest.logChangeReason.commandId'));
        const logger = this._loggerService?.createLogger('textModelChanges', {
            hidden: false,
            name: 'Text Model Changes Reason'
        });
        const loggingLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this, logger.onDidChangeLogLevel, ()=>logger.getLevel());
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canLog"])(loggingLevel.read(reader), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogLevel"].Trace)) {
                return;
            }
            reader.store.add(this._editor.onDidChangeModelContent((e)=>{
                if (this._editor.getModel()?.uri.scheme === 'output') {
                    return;
                }
                logger.trace('onDidChangeModelContent: ' + e.detailedReasons.map((r)=>r.toKey(Number.MAX_VALUE)).join(', '));
            }));
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            if (!(this._editor instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$widget$2f$codeEditor$2f$codeEditorWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeEditorWidget"])) {
                return;
            }
            if (!this._structuredLogger.isEnabled.read(reader)) {
                return;
            }
            reader.store.add(this._editor.onDidChangeModelContent((e)=>{
                const tm = this._editor.getModel();
                if (!tm) {
                    return;
                }
                const reason = e.detailedReasons[0];
                const data = {
                    ...reason.metadata,
                    sourceId: 'TextModel.setChangeReason',
                    source: reason.metadata.source,
                    time: Date.now(),
                    modelUri: tm.uri,
                    modelVersion: tm.getVersionId()
                };
                setTimeout(()=>{
                    // To ensure that this reaches the extension host after the content change event.
                    // (Without the setTimeout, I observed this command being called before the content change event arrived)
                    this._structuredLogger.log(data);
                }, 0);
            }));
        }));
    }
};
TextModelChangeRecorder = __decorate([
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILoggerService"])
], TextModelChangeRecorder);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/ghostText.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhostText",
    ()=>GhostText,
    "GhostTextPart",
    ()=>GhostTextPart,
    "GhostTextReplacement",
    ()=>GhostTextReplacement,
    "ghostTextOrReplacementEquals",
    ()=>ghostTextOrReplacementEquals,
    "ghostTextsOrReplacementsEqual",
    ()=>ghostTextsOrReplacementsEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/viewLayout/lineDecorations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/assert.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ class GhostText {
    constructor(lineNumber, parts){
        this.lineNumber = lineNumber;
        this.parts = parts;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertFn"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAdjacentItems"])(parts, (p1, p2)=>p1.column <= p2.column));
    }
    equals(other) {
        return this.lineNumber === other.lineNumber && this.parts.length === other.parts.length && this.parts.every((part, index)=>part.equals(other.parts[index]));
    }
    renderForScreenReader(lineText) {
        if (this.parts.length === 0) {
            return '';
        }
        const lastPart = this.parts[this.parts.length - 1];
        const cappedLineText = lineText.substr(0, lastPart.column - 1);
        const text = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"]([
            ...this.parts.map((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](1, p.column)), p.lines.map((line)=>line.line).join('\n')))
        ]).applyToString(cappedLineText);
        return text.substring(this.parts[0].column - 1);
    }
    isEmpty() {
        return this.parts.every((p)=>p.lines.length === 0);
    }
    get lineCount() {
        return 1 + this.parts.reduce((r, p)=>r + p.lines.length - 1, 0);
    }
}
class GhostTextPart {
    constructor(column, text, /**
     * Indicates if this part is a preview of an inline suggestion when a suggestion is previewed.
    */ preview, _inlineDecorations = []){
        this.column = column;
        this.text = text;
        this.preview = preview;
        this._inlineDecorations = _inlineDecorations;
        this.lines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitLines"])(this.text).map((line, i)=>({
                line,
                lineDecorations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineDecoration"].filter(this._inlineDecorations, i + 1, 1, line.length + 1)
            }));
    }
    equals(other) {
        return this.column === other.column && this.lines.length === other.lines.length && this.lines.every((line, index)=>line.line === other.lines[index].line && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$viewLayout$2f$lineDecorations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineDecoration"].equalsArr(line.lineDecorations, other.lines[index].lineDecorations));
    }
}
class GhostTextReplacement {
    constructor(lineNumber, columnRange, text, additionalReservedLineCount = 0){
        this.lineNumber = lineNumber;
        this.columnRange = columnRange;
        this.text = text;
        this.additionalReservedLineCount = additionalReservedLineCount;
        this.parts = [
            new GhostTextPart(this.columnRange.endColumnExclusive, this.text, false)
        ];
        this.newLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitLines"])(this.text);
    }
    renderForScreenReader(_lineText) {
        return this.newLines.join('\n');
    }
    get lineCount() {
        return this.newLines.length;
    }
    isEmpty() {
        return this.parts.every((p)=>p.lines.length === 0);
    }
    equals(other) {
        return this.lineNumber === other.lineNumber && this.columnRange.equals(other.columnRange) && this.newLines.length === other.newLines.length && this.newLines.every((line, index)=>line === other.newLines[index]) && this.additionalReservedLineCount === other.additionalReservedLineCount;
    }
}
function ghostTextsOrReplacementsEqual(a, b) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(a, b, ghostTextOrReplacementEquals);
}
function ghostTextOrReplacementEquals(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (a instanceof GhostText && b instanceof GhostText) {
        return a.equals(b);
    }
    if (a instanceof GhostTextReplacement && b instanceof GhostTextReplacement) {
        return a.equals(b);
    }
    return false;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "singleTextEditAugments",
    ()=>singleTextEditAugments,
    "singleTextRemoveCommonPrefix",
    ()=>singleTextRemoveCommonPrefix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/textLength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function singleTextRemoveCommonPrefix(edit, model, validModelRange) {
    const modelRange = validModelRange ? edit.range.intersectRanges(validModelRange) : edit.range;
    if (!modelRange) {
        return edit;
    }
    const normalizedText = edit.text.replaceAll('\r\n', '\n');
    const valueToReplace = model.getValueInRange(modelRange, 1 /* EndOfLinePreference.LF */ );
    const commonPrefixLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonPrefixLength"])(valueToReplace, normalizedText);
    const start = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofText(valueToReplace.substring(0, commonPrefixLen)).addToPosition(edit.range.getStartPosition());
    const text = normalizedText.substring(commonPrefixLen);
    const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(start, edit.range.getEndPosition());
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, text);
}
function singleTextEditAugments(edit, base) {
    // The augmented completion must replace the base range, but can replace even more
    return edit.text.startsWith(base.text) && rangeExtends(edit.range, base.range);
}
function rangeExtends(extendingRange, rangeToExtend) {
    return rangeToExtend.getStartPosition().equals(extendingRange.getStartPosition()) && rangeToExtend.getEndPosition().isBeforeOrEqual(extendingRange.getEndPosition());
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/computeGhostText.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeGhostText",
    ()=>computeGhostText,
    "smartDiff",
    ()=>smartDiff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/diff/diff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/ghostText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)");
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
 * @param previewSuffixLength Sets where to split `inlineCompletion.text`.
 * 	If the text is `hello` and the suffix length is 2, the non-preview part is `hel` and the preview-part is `lo`.
*/ function computeGhostText(edit, model, mode, cursorPosition, previewSuffixLength = 0) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(edit, model);
    if (e.range.endLineNumber !== e.range.startLineNumber) {
        // This edit might span multiple lines, but the first lines must be a common prefix.
        return undefined;
    }
    const sourceLine = model.getLineContent(e.range.startLineNumber);
    const sourceIndentationLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLeadingWhitespace"])(sourceLine).length;
    const suggestionTouchesIndentation = e.range.startColumn - 1 <= sourceIndentationLength;
    if (suggestionTouchesIndentation) {
        // source:      ··········[······abc]
        //                         ^^^^^^^^^ inlineCompletion.range
        //              ^^^^^^^^^^ ^^^^^^ sourceIndentationLength
        //                         ^^^^^^ replacedIndentation.length
        //                               ^^^ rangeThatDoesNotReplaceIndentation
        // inlineCompletion.text: '··foo'
        //                         ^^ suggestionAddedIndentationLength
        const suggestionAddedIndentationLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLeadingWhitespace"])(e.text).length;
        const replacedIndentation = sourceLine.substring(e.range.startColumn - 1, sourceIndentationLength);
        const [startPosition, endPosition] = [
            e.range.getStartPosition(),
            e.range.getEndPosition()
        ];
        const newStartPosition = startPosition.column + replacedIndentation.length <= endPosition.column ? startPosition.delta(0, replacedIndentation.length) : endPosition;
        const rangeThatDoesNotReplaceIndentation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(newStartPosition, endPosition);
        const suggestionWithoutIndentationChange = e.text.startsWith(replacedIndentation) ? e.text.substring(replacedIndentation.length) : e.text.substring(suggestionAddedIndentationLength);
        e = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](rangeThatDoesNotReplaceIndentation, suggestionWithoutIndentationChange);
    }
    // This is a single line string
    const valueToBeReplaced = model.getValueInRange(e.range);
    const changes = cachingDiff(valueToBeReplaced, e.text);
    if (!changes) {
        // No ghost text in case the diff would be too slow to compute
        return undefined;
    }
    const lineNumber = e.range.startLineNumber;
    const parts = new Array();
    if (mode === 'prefix') {
        const filteredChanges = changes.filter((c)=>c.originalLength === 0);
        if (filteredChanges.length > 1 || filteredChanges.length === 1 && filteredChanges[0].originalStart !== valueToBeReplaced.length) {
            // Prefixes only have a single change.
            return undefined;
        }
    }
    const previewStartInCompletionText = e.text.length - previewSuffixLength;
    for (const c of changes){
        const insertColumn = e.range.startColumn + c.originalStart + c.originalLength;
        if (mode === 'subwordSmart' && cursorPosition && cursorPosition.lineNumber === e.range.startLineNumber && insertColumn < cursorPosition.column) {
            // No ghost text before cursor
            return undefined;
        }
        if (c.originalLength > 0) {
            return undefined;
        }
        if (c.modifiedLength === 0) {
            continue;
        }
        const modifiedEnd = c.modifiedStart + c.modifiedLength;
        const nonPreviewTextEnd = Math.max(c.modifiedStart, Math.min(modifiedEnd, previewStartInCompletionText));
        const nonPreviewText = e.text.substring(c.modifiedStart, nonPreviewTextEnd);
        const italicText = e.text.substring(nonPreviewTextEnd, Math.max(c.modifiedStart, modifiedEnd));
        if (nonPreviewText.length > 0) {
            parts.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextPart"](insertColumn, nonPreviewText, false));
        }
        if (italicText.length > 0) {
            parts.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostTextPart"](insertColumn, italicText, true));
        }
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostText"](lineNumber, parts);
}
let lastRequest = undefined;
function cachingDiff(originalValue, newValue) {
    if (lastRequest?.originalValue === originalValue && lastRequest?.newValue === newValue) {
        return lastRequest?.changes;
    } else {
        let changes = smartDiff(originalValue, newValue, true);
        if (changes) {
            const deletedChars = deletedCharacters(changes);
            if (deletedChars > 0) {
                // For performance reasons, don't compute diff if there is nothing to improve
                const newChanges = smartDiff(originalValue, newValue, false);
                if (newChanges && deletedCharacters(newChanges) < deletedChars) {
                    // Disabling smartness seems to be better here
                    changes = newChanges;
                }
            }
        }
        lastRequest = {
            originalValue,
            newValue,
            changes
        };
        return changes;
    }
}
function deletedCharacters(changes) {
    let sum = 0;
    for (const c of changes){
        sum += c.originalLength;
    }
    return sum;
}
/**
 * When matching `if ()` with `if (f() = 1) { g(); }`,
 * align it like this:        `if (       )`
 * Not like this:			  `if (  )`
 * Also not like this:		  `if (             )`.
 *
 * The parenthesis are preprocessed to ensure that they match correctly.
 */ function smartDiff(originalValue, newValue, smartBracketMatching) {
    if (originalValue.length > 5000 || newValue.length > 5000) {
        // We don't want to work on strings that are too big
        return undefined;
    }
    function getMaxCharCode(val) {
        let maxCharCode = 0;
        for(let i = 0, len = val.length; i < len; i++){
            const charCode = val.charCodeAt(i);
            if (charCode > maxCharCode) {
                maxCharCode = charCode;
            }
        }
        return maxCharCode;
    }
    const maxCharCode = Math.max(getMaxCharCode(originalValue), getMaxCharCode(newValue));
    function getUniqueCharCode(id) {
        if (id < 0) {
            throw new Error('unexpected');
        }
        return maxCharCode + id + 1;
    }
    function getElements(source) {
        let level = 0;
        let group = 0;
        const characters = new Int32Array(source.length);
        for(let i = 0, len = source.length; i < len; i++){
            // TODO support more brackets
            if (smartBracketMatching && source[i] === '(') {
                const id = group * 100 + level;
                characters[i] = getUniqueCharCode(2 * id);
                level++;
            } else if (smartBracketMatching && source[i] === ')') {
                level = Math.max(level - 1, 0);
                const id = group * 100 + level;
                characters[i] = getUniqueCharCode(2 * id + 1);
                if (level === 0) {
                    group++;
                }
            } else {
                characters[i] = source.charCodeAt(i);
            }
        }
        return characters;
    }
    const elements1 = getElements(originalValue);
    const elements2 = getElements(newValue);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LcsDiff"]({
        getElements: ()=>elements1
    }, {
        getElements: ()=>elements2
    }).ComputeDiff(false).changes;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/editKind.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineSuggestionEditKind",
    ()=>InlineSuggestionEditKind,
    "computeEditKind",
    ()=>computeEditKind
]);
const syntacticalChars = new Set([
    ';',
    ',',
    '=',
    '+',
    '-',
    '*',
    '/',
    '{',
    '}',
    '(',
    ')',
    '[',
    ']',
    '<',
    '>',
    ':',
    '.',
    '!',
    '?',
    '&',
    '|',
    '^',
    '%',
    '@',
    '#',
    '~',
    '`',
    '\\',
    '\'',
    '"',
    '$'
]);
function isSyntacticalChar(char) {
    return syntacticalChars.has(char);
}
function isIdentifierChar(char) {
    return /[a-zA-Z0-9_]/.test(char);
}
function isWhitespaceChar(char) {
    return char === ' ' || char === '\t';
}
function analyzeTextShape(text) {
    const lines = text.split(/\r\n|\r|\n/);
    if (lines.length > 1) {
        return {
            kind: 'multiLine',
            lineCount: lines.length
        };
    }
    const isSingleChar = text.length === 1;
    let singleCharKind;
    if (isSingleChar) {
        if (isSyntacticalChar(text)) {
            singleCharKind = 'syntactical';
        } else if (isIdentifierChar(text)) {
            singleCharKind = 'identifier';
        } else if (isWhitespaceChar(text)) {
            singleCharKind = 'whitespace';
        }
    }
    // Analyze whitespace patterns
    const whitespaceMatches = text.match(/[ \t]+/g) || [];
    const isMultipleWhitespace = whitespaceMatches.some((ws)=>ws.length > 1);
    const hasDuplicatedWhitespace = whitespaceMatches.some((ws)=>ws.includes('  ') || ws.includes('\t\t'));
    // Analyze word patterns
    const words = text.split(/\s+/).filter((w)=>w.length > 0);
    const isWord = words.length === 1 && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(words[0]);
    const isMultipleWords = words.length > 1;
    return {
        kind: 'singleLine',
        isSingleCharacter: isSingleChar,
        singleCharacterKind: singleCharKind,
        isWord,
        isMultipleWords,
        isMultipleWhitespace,
        hasDuplicatedWhitespace
    };
}
class InlineSuggestionEditKind {
    constructor(edits){
        this.edits = edits;
    }
    toString() {
        return JSON.stringify({
            edits: this.edits
        });
    }
}
function computeEditKind(edit, textModel, cursorPosition) {
    if (edit.replacements.length === 0) {
        // Empty edit - return undefined as there's no edit to classify
        return undefined;
    }
    return new InlineSuggestionEditKind(edit.replacements.map((rep)=>computeSingleEditKind(rep, textModel)));
}
function countLines(text) {
    if (text.length === 0) {
        return 0;
    }
    return text.split(/\r\n|\r|\n/).length - 1;
}
function computeSingleEditKind(replacement, textModel, cursorPosition) {
    const replaceRange = replacement.replaceRange;
    const newText = replacement.newText;
    const deletedLength = replaceRange.length;
    const insertedLength = newText.length;
    const linesInserted = countLines(newText);
    const kind = replaceRange.isEmpty ? 'insert' : newText.length === 0 ? 'delete' : 'replace';
    switch(kind){
        case 'insert':
            return {
                operation: 'insert',
                properties: computeInsertProperties(replaceRange.start, newText, textModel),
                charactersInserted: insertedLength,
                charactersDeleted: 0,
                linesInserted,
                linesDeleted: 0
            };
        case 'delete':
            {
                const deletedText = textModel.getValue().substring(replaceRange.start, replaceRange.endExclusive);
                return {
                    operation: 'delete',
                    properties: computeDeleteProperties(replaceRange.start, replaceRange.endExclusive, textModel),
                    charactersInserted: 0,
                    charactersDeleted: deletedLength,
                    linesInserted: 0,
                    linesDeleted: countLines(deletedText)
                };
            }
        case 'replace':
            {
                const oldText = textModel.getValue().substring(replaceRange.start, replaceRange.endExclusive);
                return {
                    operation: 'replace',
                    properties: computeReplaceProperties(oldText, newText),
                    charactersInserted: insertedLength,
                    charactersDeleted: deletedLength,
                    linesInserted,
                    linesDeleted: countLines(oldText)
                };
            }
    }
}
function computeInsertProperties(offset, newText, textModel, cursorPosition) {
    const textShape = analyzeTextShape(newText);
    const insertPosition = textModel.getPositionAt(offset);
    const lineContent = textModel.getLineContent(insertPosition.lineNumber);
    const lineLength = lineContent.length;
    // Determine location shape
    let locationShape;
    const isLineEmpty = lineContent.trim().length === 0;
    const isAtEndOfLine = insertPosition.column > lineLength;
    const isAtStartOfLine = insertPosition.column === 1;
    if (isLineEmpty) {
        locationShape = 'emptyLine';
    } else if (isAtEndOfLine) {
        locationShape = 'endOfLine';
    } else if (isAtStartOfLine) {
        locationShape = 'startOfLine';
    } else {
        locationShape = 'middleOfLine';
    }
    // Compute relative to cursor if cursor position is provided
    let relativeToCursor;
    return {
        textShape,
        locationShape,
        relativeToCursor
    };
}
function computeDeleteProperties(startOffset, endOffset, textModel) {
    const deletedText = textModel.getValue().substring(startOffset, endOffset);
    const textShape = analyzeTextShape(deletedText);
    const startPosition = textModel.getPositionAt(startOffset);
    const endPosition = textModel.getPositionAt(endOffset);
    // Check if delete is at end of line
    const lineContent = textModel.getLineContent(endPosition.lineNumber);
    const isAtEndOfLine = endPosition.column > lineContent.length;
    // Check if entire line content is deleted
    const deletesEntireLineContent = startPosition.lineNumber === endPosition.lineNumber && startPosition.column === 1 && endPosition.column > lineContent.length;
    return {
        textShape,
        isAtEndOfLine,
        deletesEntireLineContent
    };
}
function computeReplaceProperties(oldText, newText) {
    const oldShape = analyzeTextShape(oldText);
    const newShape = analyzeTextShape(newText);
    const oldIsWord = oldShape.kind === 'singleLine' && oldShape.isWord;
    const newIsWord = newShape.kind === 'singleLine' && newShape.isWord;
    const isWordToWordReplacement = oldIsWord && newIsWord;
    const isAdditive = newText.length > oldText.length;
    const isSubtractive = newText.length < oldText.length;
    const isSingleLineToSingleLine = oldShape.kind === 'singleLine' && newShape.kind === 'singleLine';
    const isSingleLineToMultiLine = oldShape.kind === 'singleLine' && newShape.kind === 'multiLine';
    const isMultiLineToSingleLine = oldShape.kind === 'multiLine' && newShape.kind === 'singleLine';
    return {
        isWordToWordReplacement,
        isAdditive,
        isSubtractive,
        isSingleLineToSingleLine,
        isSingleLineToMultiLine,
        isMultiLineToSingleLine
    };
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionIsVisible.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inlineCompletionIsVisible",
    ()=>inlineCompletionIsVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/filters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function inlineCompletionIsVisible(singleTextEdit, originalRange, model, cursorPosition) {
    const minimizedReplacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(singleTextEdit, model);
    const editRange = singleTextEdit.range;
    if (!editRange || originalRange && !originalRange.getStartPosition().equals(editRange.getStartPosition()) || cursorPosition.lineNumber !== minimizedReplacement.range.startLineNumber || minimizedReplacement.isEmpty // if the completion is empty after removing the common prefix of the completion and the model, the completion item would not be visible
    ) {
        return false;
    }
    // We might consider comparing by .toLowerText, but this requires GhostTextReplacement
    const originalValue = model.getValueInRange(minimizedReplacement.range, 1 /* EndOfLinePreference.LF */ );
    const filterText = minimizedReplacement.text;
    const cursorPosIndex = Math.max(0, cursorPosition.column - minimizedReplacement.range.startColumn);
    let filterTextBefore = filterText.substring(0, cursorPosIndex);
    let filterTextAfter = filterText.substring(cursorPosIndex);
    let originalValueBefore = originalValue.substring(0, cursorPosIndex);
    let originalValueAfter = originalValue.substring(cursorPosIndex);
    const originalValueIndent = model.getLineIndentColumn(minimizedReplacement.range.startLineNumber);
    if (minimizedReplacement.range.startColumn <= originalValueIndent) {
        // Remove indentation
        originalValueBefore = originalValueBefore.trimStart();
        if (originalValueBefore.length === 0) {
            originalValueAfter = originalValueAfter.trimStart();
        }
        filterTextBefore = filterTextBefore.trimStart();
        if (filterTextBefore.length === 0) {
            filterTextAfter = filterTextAfter.trimStart();
        }
    }
    return filterTextBefore.startsWith(originalValueBefore) && !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesSubString"])(originalValueAfter, filterTextAfter);
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/InlineSuggestAlternativeAction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineSuggestAlternativeAction",
    ()=>InlineSuggestAlternativeAction
]);
var InlineSuggestAlternativeAction;
(function(InlineSuggestAlternativeAction) {
    function toString(action) {
        return action?.command.id ?? undefined;
    }
    InlineSuggestAlternativeAction.toString = toString;
})(InlineSuggestAlternativeAction || (InlineSuggestAlternativeAction = {}));
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/textModelValueReference.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextModelValueReference",
    ()=>TextModelValueReference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/abstractText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/textLength.js [app-client] (ecmascript)");
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * An immutable view of a text model at a specific version.
 * Like TextModelText but throws if the underlying model has changed.
 * This ensures data read from the reference is consistent with
 * the version at construction time.
 */ class TextModelValueReference extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractText"] {
    static snapshot(textModel) {
        return new TextModelValueReference(textModel);
    }
    constructor(_textModel){
        super();
        this._textModel = _textModel;
        this._version = _textModel.getVersionId();
    }
    get uri() {
        return this._textModel.uri;
    }
    _assertValid() {
        if (this._textModel.getVersionId() !== this._version) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedError"])(new Error(`TextModel has changed: expected version ${this._version}, got ${this._textModel.getVersionId()}`));
        // TODO: throw here!
        }
    }
    targets(textModel) {
        return this._textModel.uri.toString() === textModel.uri.toString();
    }
    getValueOfRange(range) {
        this._assertValid();
        return this._textModel.getValueInRange(range);
    }
    getLineLength(lineNumber) {
        this._assertValid();
        return this._textModel.getLineLength(lineNumber);
    }
    get length() {
        this._assertValid();
        const lastLineNumber = this._textModel.getLineCount();
        const lastLineLen = this._textModel.getLineLength(lastLineNumber);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"](lastLineNumber - 1, lastLineLen);
    }
    getEOL() {
        this._assertValid();
        return this._textModel.getEOL();
    }
    getPositionAt(offset) {
        this._assertValid();
        return this._textModel.getPositionAt(offset);
    }
    getValueInRange(range) {
        this._assertValid();
        return this._textModel.getValueInRange(range);
    }
    getVersionId() {
        return this._version;
    }
    dangerouslyGetUnderlyingModel() {
        return this._textModel;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineSuggestionItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionItem",
    ()=>InlineCompletionItem,
    "InlineEditItem",
    ()=>InlineEditItem,
    "InlineSuggestHint",
    ()=>InlineSuggestHint,
    "InlineSuggestionIdentity",
    ()=>InlineSuggestionIdentity,
    "InlineSuggestionItem",
    ()=>InlineSuggestionItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/abstractText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/getPositionOffsetTransformerFromTextModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/textLength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$linesDiffComputers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/diff/linesDiffComputers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModelText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$editKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/editKind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionIsVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionIsVisible.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$InlineSuggestAlternativeAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/InlineSuggestAlternativeAction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/textModelValueReference.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableSignal.js [app-client] (ecmascript)");
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var InlineSuggestionItem;
(function(InlineSuggestionItem) {
    function create(data, textModel, shouldDiffEdit = true) {
        if (!data.isInlineEdit && !data.action?.uri && data.action?.kind === 'edit') {
            return InlineCompletionItem.create(data, textModel, data.action);
        } else {
            return InlineEditItem.create(data, textModel, shouldDiffEdit);
        }
    }
    InlineSuggestionItem.create = create;
})(InlineSuggestionItem || (InlineSuggestionItem = {}));
function hashInlineSuggestionAction(action) {
    const obj = action?.kind === 'edit' ? {
        ...action,
        alternativeAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$InlineSuggestAlternativeAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestAlternativeAction"].toString(action.alternativeAction),
        target: action?.target.uri.toString()
    } : {
        ...action,
        target: action?.target.uri.toString()
    };
    return JSON.stringify(obj);
}
class InlineSuggestionItemBase {
    constructor(_data, identity, hint, /**
     * Reference to the text model this item targets.
     * For cross-file edits, this may differ from the current editor's model.
     */ originalTextRef){
        this._data = _data;
        this.identity = identity;
        this.hint = hint;
        this.originalTextRef = originalTextRef;
    }
    /**
     * A reference to the original inline completion list this inline completion has been constructed from.
     * Used for event data to ensure referential equality.
    */ get source() {
        return this._data.source;
    }
    get isFromExplicitRequest() {
        return this._data.context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit;
    }
    get forwardStable() {
        return this.source.inlineSuggestions.enableForwardStability ?? false;
    }
    get targetRange() {
        if (this.hint) {
            return this.hint.range;
        }
        if (this.action?.kind === 'edit') {
            return this.action.textReplacement.range;
        } else if (this.action?.kind === 'jumpTo') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(this.action.position);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('InlineSuggestionItem: Either hint or action must be set');
    }
    get semanticId() {
        return this.hash;
    }
    get gutterMenuLinkAction() {
        return this._sourceInlineCompletion.gutterMenuLinkAction;
    }
    get command() {
        return this._sourceInlineCompletion.command;
    }
    get supportsRename() {
        return this._data.supportsRename;
    }
    get warning() {
        return this._sourceInlineCompletion.warning;
    }
    get showInlineEditMenu() {
        return !!this._sourceInlineCompletion.showInlineEditMenu;
    }
    get hash() {
        return hashInlineSuggestionAction(this.action);
    }
    get requestUuid() {
        return this._data.context.requestUuid;
    }
    get partialAccepts() {
        return this._data.partialAccepts;
    }
    /**
     * A reference to the original inline completion this inline completion has been constructed from.
     * Used for event data to ensure referential equality.
    */ get _sourceInlineCompletion() {
        return this._data.sourceInlineCompletion;
    }
    addRef() {
        this.identity.addRef();
        this.source.addRef();
    }
    removeRef() {
        this.identity.removeRef();
        this.source.removeRef();
    }
    reportInlineEditShown(commandService, viewKind, viewData, model, timeWhenShown) {
        const insertText = this.action?.kind === 'edit' ? this.action.textReplacement.text : ''; // TODO@hediet support insertText === undefined
        this._data.reportInlineEditShown(commandService, insertText, viewKind, viewData, this.computeEditKind(model), timeWhenShown);
    }
    reportPartialAccept(acceptedCharacters, info, partialAcceptance) {
        this._data.reportPartialAccept(acceptedCharacters, info, partialAcceptance);
    }
    reportEndOfLife(reason) {
        this._data.reportEndOfLife(reason);
    }
    setEndOfLifeReason(reason) {
        this._data.setEndOfLifeReason(reason);
    }
    setIsPreceeded(item) {
        this._data.setIsPreceeded(item.partialAccepts);
    }
    setNotShownReasonIfNotSet(reason) {
        this._data.setNotShownReason(reason);
    }
    /**
     * Avoid using this method. Instead introduce getters for the needed properties.
    */ getSourceCompletion() {
        return this._sourceInlineCompletion;
    }
    setRenameProcessingInfo(info) {
        this._data.setRenameProcessingInfo(info);
    }
    withAction(action) {
        return this._data.withAction(action);
    }
    addPerformanceMarker(marker) {
        this._data.addPerformanceMarker(marker);
    }
}
class InlineSuggestionIdentity {
    constructor(){
        this._onDispose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        this.onDispose = this._onDispose;
        this._jumpedTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this._refCount = 0;
        this.id = 'InlineCompletionIdentity' + InlineSuggestionIdentity.idCounter++;
    }
    static{
        this.idCounter = 0;
    }
    get jumpedTo() {
        return this._jumpedTo;
    }
    addRef() {
        this._refCount++;
    }
    removeRef() {
        this._refCount--;
        if (this._refCount === 0) {
            this._onDispose.trigger(undefined);
        }
    }
    setJumpTo(tx) {
        this._jumpedTo.set(true, tx);
    }
}
class InlineSuggestHint {
    static create(hint) {
        return new InlineSuggestHint(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(hint.range), hint.content, hint.style);
    }
    constructor(range, content, style){
        this.range = range;
        this.content = content;
        this.style = style;
    }
    withEdit(edit, positionOffsetTransformer) {
        const offsetRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](positionOffsetTransformer.getOffset(this.range.getStartPosition()), positionOffsetTransformer.getOffset(this.range.getEndPosition()));
        const newOffsetRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEditsToRanges"])([
            offsetRange
        ], edit)[0];
        if (!newOffsetRange) {
            return undefined;
        }
        const newRange = positionOffsetTransformer.getRange(newOffsetRange);
        return new InlineSuggestHint(newRange, this.content, this.style);
    }
}
class InlineCompletionItem extends InlineSuggestionItemBase {
    static create(data, textModel, action) {
        const identity = new InlineSuggestionIdentity();
        const transformer = textModel.getTransformer();
        const insertText = action.insertText.replace(/\r\n|\r|\n/g, textModel.getEOL());
        const edit = reshapeInlineCompletion(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](transformer.getOffsetRange(action.range), insertText), textModel);
        const trimmedEdit = edit.removeCommonSuffixAndPrefix(textModel.getValue());
        const textEdit = transformer.getTextReplacement(edit);
        const displayLocation = data.hint ? InlineSuggestHint.create(data.hint) : undefined;
        return new InlineCompletionItem(edit, trimmedEdit, textEdit, textEdit.range, action.snippetInfo, data.additionalTextEdits, data, identity, displayLocation, textModel);
    }
    constructor(_edit, _trimmedEdit, _textEdit, _originalRange, snippetInfo, additionalTextEdits, data, identity, displayLocation, originalTextRef){
        super(data, identity, displayLocation, originalTextRef);
        this._edit = _edit;
        this._trimmedEdit = _trimmedEdit;
        this._textEdit = _textEdit;
        this._originalRange = _originalRange;
        this.snippetInfo = snippetInfo;
        this.additionalTextEdits = additionalTextEdits;
        this.isInlineEdit = false;
    }
    get action() {
        return {
            kind: 'edit',
            textReplacement: this.getSingleTextEdit(),
            snippetInfo: this.snippetInfo,
            stringEdit: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"]([
                this._trimmedEdit
            ]),
            alternativeAction: undefined,
            target: this.originalTextRef
        };
    }
    get hash() {
        return JSON.stringify(this._trimmedEdit.toJson());
    }
    getSingleTextEdit() {
        return this._textEdit;
    }
    withIdentity(identity) {
        return new InlineCompletionItem(this._edit, this._trimmedEdit, this._textEdit, this._originalRange, this.snippetInfo, this.additionalTextEdits, this._data, identity, this.hint, this.originalTextRef);
    }
    withEdit(textModelEdit, textModel) {
        // If the edit is to a different model than our target, it's a noop
        if (!this.originalTextRef.targets(textModel)) {
            return this; // unchanged
        }
        const newEditRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEditsToRanges"])([
            this._edit.replaceRange
        ], textModelEdit);
        if (newEditRange.length === 0) {
            return undefined;
        }
        const newEdit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](newEditRange[0], this._textEdit.text);
        const positionOffsetTransformer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPositionOffsetTransformerFromTextModel"])(textModel);
        const newTextEdit = positionOffsetTransformer.getTextReplacement(newEdit);
        let newDisplayLocation = this.hint;
        if (newDisplayLocation) {
            newDisplayLocation = newDisplayLocation.withEdit(textModelEdit, positionOffsetTransformer);
            if (!newDisplayLocation) {
                return undefined;
            }
        }
        const trimmedEdit = newEdit.removeCommonSuffixAndPrefix(textModel.getValue());
        return new InlineCompletionItem(newEdit, trimmedEdit, newTextEdit, this._originalRange, this.snippetInfo, this.additionalTextEdits, this._data, this.identity, newDisplayLocation, this.originalTextRef);
    }
    canBeReused(model, position) {
        // TODO@hediet I believe this can be simplified to `return true;`, as applying an edit should kick out this suggestion.
        const updatedRange = this._textEdit.range;
        const result = !!updatedRange && updatedRange.containsPosition(position) && this.isVisible(model, position) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(updatedRange).isGreaterThanOrEqualTo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(this._originalRange));
        return result;
    }
    isVisible(model, cursorPosition) {
        const singleTextEdit = this.getSingleTextEdit();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionIsVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineCompletionIsVisible"])(singleTextEdit, this._originalRange, model, cursorPosition);
    }
    computeEditKind(model) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$editKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeEditKind"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"]([
            this._edit
        ]), model);
    }
    get editRange() {
        return this.getSingleTextEdit().range;
    }
}
class InlineEditItem extends InlineSuggestionItemBase {
    static create(data, textModel, shouldDiffEdit = true) {
        let action;
        let edits = [];
        if (data.action?.kind === 'edit') {
            const offsetEdit = shouldDiffEdit ? getDiffedStringEdit(textModel, data.action.range, data.action.insertText) : getStringEdit(textModel, data.action.range, data.action.insertText); // TODO compute async
            const textEdit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].fromStringEdit(offsetEdit, textModel);
            const singleTextEdit = offsetEdit.isEmpty() ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](1, 1, 1, 1), '') : textEdit.toReplacement(textModel); // FIXME: .toReplacement() can throw because offsetEdit is empty because we get an empty diff in getStringEdit after diffing
            edits = offsetEdit.replacements.map((edit)=>{
                const replacedRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(textModel.getPositionAt(edit.replaceRange.start), textModel.getTransformer().getPosition(edit.replaceRange.endExclusive));
                const replacedText = textModel.getValueInRange(replacedRange);
                return SingleUpdatedNextEdit.create(edit, replacedText);
            });
            action = {
                kind: 'edit',
                snippetInfo: data.action.snippetInfo,
                stringEdit: offsetEdit,
                textReplacement: singleTextEdit,
                alternativeAction: data.action.alternativeAction,
                target: textModel
            };
        } else if (data.action?.kind === 'jumpTo') {
            action = {
                kind: 'jumpTo',
                position: data.action.position,
                offset: textModel.getTransformer().getOffset(data.action.position),
                target: textModel
            };
        } else {
            action = undefined;
            if (!data.hint) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('InlineEditItem: action is undefined and no hint is provided');
            }
        }
        const identity = new InlineSuggestionIdentity();
        const hint = data.hint ? InlineSuggestHint.create(data.hint) : undefined;
        return new InlineEditItem(action, data, identity, edits, hint, false, textModel.getVersionId(), textModel);
    }
    constructor(_action, data, identity, _edits, hint, _lastChangePartOfInlineEdit = false, _inlineEditModelVersion, originalTextRef){
        super(data, identity, hint, originalTextRef);
        this._action = _action;
        this._edits = _edits;
        this._lastChangePartOfInlineEdit = _lastChangePartOfInlineEdit;
        this._inlineEditModelVersion = _inlineEditModelVersion;
        this.snippetInfo = undefined;
        this.additionalTextEdits = [];
        this.isInlineEdit = true;
    }
    get updatedEditModelVersion() {
        return this._inlineEditModelVersion;
    }
    // public get updatedEdit(): StringEdit { return this._edit; }
    get action() {
        return this._action;
    }
    withIdentity(identity) {
        return new InlineEditItem(this._action, this._data, identity, this._edits, this.hint, this._lastChangePartOfInlineEdit, this._inlineEditModelVersion, this.originalTextRef);
    }
    canBeReused(model, position) {
        // TODO@hediet I believe this can be simplified to `return true;`, as applying an edit should kick out this suggestion.
        return this._lastChangePartOfInlineEdit && this.updatedEditModelVersion === model.getVersionId();
    }
    withEdit(textModelChanges, textModel) {
        // If the edit is to a different model than our target, it's a noop
        if (!this.originalTextRef.targets(textModel)) {
            return this; // unchanged
        }
        const edit = this._applyTextModelChanges(textModelChanges, this._edits, textModel);
        return edit;
    }
    _applyTextModelChanges(textModelChanges, edits, textModel) {
        const positionOffsetTransformer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$getPositionOffsetTransformerFromTextModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPositionOffsetTransformerFromTextModel"])(textModel);
        let lastChangePartOfInlineEdit = false;
        let inlineEditModelVersion = this._inlineEditModelVersion;
        let newAction;
        const updatedTarget = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelValueReference"].snapshot(textModel);
        if (this.action?.kind === 'edit') {
            edits = edits.map((innerEdit)=>innerEdit.applyTextModelChanges(textModelChanges));
            if (edits.some((edit)=>edit.edit === undefined)) {
                return undefined; // change is invalid, so we will have to drop the completion
            }
            const newTextModelVersion = textModel.getVersionId();
            lastChangePartOfInlineEdit = edits.some((edit)=>edit.lastChangeUpdatedEdit);
            if (lastChangePartOfInlineEdit) {
                inlineEditModelVersion = newTextModelVersion ?? -1;
            }
            if (newTextModelVersion === null || inlineEditModelVersion + 20 < newTextModelVersion) {
                return undefined; // the completion has been ignored for a while, remove it
            }
            edits = edits.filter((innerEdit)=>!innerEdit.edit.isEmpty);
            if (edits.length === 0) {
                return undefined; // the completion has been typed by the user
            }
            const newEdit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"](edits.map((edit)=>edit.edit));
            const newTextEdit = positionOffsetTransformer.getTextEdit(newEdit).toReplacement(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelText"](textModel));
            newAction = {
                kind: 'edit',
                textReplacement: newTextEdit,
                snippetInfo: this.snippetInfo,
                stringEdit: newEdit,
                alternativeAction: this.action.alternativeAction,
                target: updatedTarget
            };
        } else if (this.action?.kind === 'jumpTo') {
            const jumpToOffset = this.action.offset;
            const newJumpToOffset = textModelChanges.applyToOffsetOrUndefined(jumpToOffset);
            if (newJumpToOffset === undefined) {
                return undefined;
            }
            const newJumpToPosition = positionOffsetTransformer.getPosition(newJumpToOffset);
            newAction = {
                kind: 'jumpTo',
                position: newJumpToPosition,
                offset: newJumpToOffset,
                target: updatedTarget
            };
        } else {
            newAction = undefined;
        }
        let newDisplayLocation = this.hint;
        if (newDisplayLocation) {
            newDisplayLocation = newDisplayLocation.withEdit(textModelChanges, positionOffsetTransformer);
            if (!newDisplayLocation) {
                return undefined;
            }
        }
        return new InlineEditItem(newAction, this._data, this.identity, edits, newDisplayLocation, lastChangePartOfInlineEdit, inlineEditModelVersion, updatedTarget);
    }
    computeEditKind(model) {
        const edit = this.action?.kind === 'edit' ? this.action.stringEdit : undefined;
        if (!edit) {
            return undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$editKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeEditKind"])(edit, model);
    }
}
function getDiffedStringEdit(textModel, editRange, replaceText) {
    const eol = textModel.getEOL();
    const editOriginalText = textModel.getValueOfRange(editRange);
    const editReplaceText = replaceText.replace(/\r\n|\r|\n/g, eol);
    const diffAlgorithm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$diff$2f$linesDiffComputers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linesDiffComputers"].getDefault();
    const lineDiffs = diffAlgorithm.computeDiff((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitLines"])(editOriginalText), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitLines"])(editReplaceText), {
        ignoreTrimWhitespace: false,
        computeMoves: false,
        extendToSubwords: true,
        maxComputationTimeMs: 50
    });
    const innerChanges = lineDiffs.changes.flatMap((c)=>c.innerChanges ?? []);
    function addRangeToPos(pos, range) {
        const start = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].fromPosition(range.getStartPosition());
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofRange(range).createRange(start.addToPosition(pos));
    }
    const modifiedText = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$abstractText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringText"](editReplaceText);
    const offsetEdit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"](innerChanges.map((c)=>{
        const rangeInModel = addRangeToPos(editRange.getStartPosition(), c.originalRange);
        const originalRange = textModel.getTransformer().getOffsetRange(rangeInModel);
        const replaceText = modifiedText.getValueOfRange(c.modifiedRange);
        const edit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](originalRange, replaceText);
        const originalText = textModel.getValueOfRange(rangeInModel);
        return reshapeInlineEdit(edit, originalText, innerChanges.length, textModel);
    }));
    return offsetEdit;
}
function getStringEdit(textModel, editRange, replaceText) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"]([
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](textModel.getTransformer().getOffsetRange(editRange), replaceText)
    ]);
}
class SingleUpdatedNextEdit {
    static create(edit, replacedText) {
        const prefixLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonPrefixLength"])(edit.newText, replacedText);
        const suffixLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonSuffixLength"])(edit.newText, replacedText);
        const trimmedNewText = edit.newText.substring(prefixLength, edit.newText.length - suffixLength);
        return new SingleUpdatedNextEdit(edit, trimmedNewText, prefixLength, suffixLength);
    }
    get edit() {
        return this._edit;
    }
    get lastChangeUpdatedEdit() {
        return this._lastChangeUpdatedEdit;
    }
    constructor(_edit, _trimmedNewText, _prefixLength, _suffixLength, _lastChangeUpdatedEdit = false){
        this._edit = _edit;
        this._trimmedNewText = _trimmedNewText;
        this._prefixLength = _prefixLength;
        this._suffixLength = _suffixLength;
        this._lastChangeUpdatedEdit = _lastChangeUpdatedEdit;
    }
    applyTextModelChanges(textModelChanges) {
        const c = this._clone();
        c._applyTextModelChanges(textModelChanges);
        return c;
    }
    _clone() {
        return new SingleUpdatedNextEdit(this._edit, this._trimmedNewText, this._prefixLength, this._suffixLength, this._lastChangeUpdatedEdit);
    }
    _applyTextModelChanges(textModelChanges) {
        this._lastChangeUpdatedEdit = false; // TODO @benibenj make immutable
        if (!this._edit) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('UpdatedInnerEdits: No edit to apply changes to');
        }
        const result = this._applyChanges(this._edit, textModelChanges);
        if (!result) {
            this._edit = undefined;
            return;
        }
        this._edit = result.edit;
        this._lastChangeUpdatedEdit = result.editHasChanged;
    }
    _applyChanges(edit, textModelChanges) {
        let editStart = edit.replaceRange.start;
        let editEnd = edit.replaceRange.endExclusive;
        let editReplaceText = edit.newText;
        let editHasChanged = false;
        const shouldPreserveEditShape = this._prefixLength > 0 || this._suffixLength > 0;
        for(let i = textModelChanges.replacements.length - 1; i >= 0; i--){
            const change = textModelChanges.replacements[i];
            // INSERTIONS (only support inserting at start of edit)
            const isInsertion = change.newText.length > 0 && change.replaceRange.isEmpty;
            if (isInsertion && !shouldPreserveEditShape && change.replaceRange.start === editStart && editReplaceText.startsWith(change.newText)) {
                editStart += change.newText.length;
                editReplaceText = editReplaceText.substring(change.newText.length);
                editEnd += change.newText.length;
                editHasChanged = true;
                continue;
            }
            if (isInsertion && shouldPreserveEditShape && change.replaceRange.start === editStart + this._prefixLength && this._trimmedNewText.startsWith(change.newText)) {
                editEnd += change.newText.length;
                editHasChanged = true;
                this._prefixLength += change.newText.length;
                this._trimmedNewText = this._trimmedNewText.substring(change.newText.length);
                continue;
            }
            // DELETIONS
            const isDeletion = change.newText.length === 0 && change.replaceRange.length > 0;
            if (isDeletion && change.replaceRange.start >= editStart + this._prefixLength && change.replaceRange.endExclusive <= editEnd - this._suffixLength) {
                // user deleted text IN-BETWEEN the deletion range
                editEnd -= change.replaceRange.length;
                editHasChanged = true;
                continue;
            }
            // user did exactly the edit
            if (change.equals(edit)) {
                editHasChanged = true;
                editStart = change.replaceRange.endExclusive;
                editReplaceText = '';
                continue;
            }
            // MOVE EDIT
            if (change.replaceRange.start > editEnd) {
                continue;
            }
            if (change.replaceRange.endExclusive < editStart) {
                // the change happens before the completion range
                editStart += change.newText.length - change.replaceRange.length;
                editEnd += change.newText.length - change.replaceRange.length;
                continue;
            }
            // The change intersects the completion, so we will have to drop the completion
            return undefined;
        }
        // the resulting edit is a noop as the original and new text are the same
        if (this._trimmedNewText.length === 0 && editStart + this._prefixLength === editEnd - this._suffixLength) {
            return {
                edit: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](editStart + this._prefixLength, editStart + this._prefixLength), ''),
                editHasChanged: true
            };
        }
        return {
            edit: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](editStart, editEnd), editReplaceText),
            editHasChanged
        };
    }
}
function reshapeInlineCompletion(edit, textModel) {
    // If the insertion is a multi line insertion starting on the next line
    // Move it forwards so that the multi line insertion starts on the current line
    const eol = textModel.getEOL();
    if (edit.replaceRange.isEmpty && edit.newText.includes(eol)) {
        edit = reshapeMultiLineInsertion(edit, textModel);
    }
    return edit;
}
function reshapeInlineEdit(edit, originalText, totalInnerEdits, textModel) {
    // TODO: EOL are not properly trimmed by the diffAlgorithm #12680
    const eol = textModel.getEOL();
    if (edit.newText.endsWith(eol) && originalText.endsWith(eol)) {
        edit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](edit.replaceRange.deltaEnd(-eol.length), edit.newText.slice(0, -eol.length));
    }
    // INSERTION
    // If the insertion ends with a new line and is inserted at the start of a line which has text,
    // we move the insertion to the end of the previous line if possible
    if (totalInnerEdits === 1 && edit.replaceRange.isEmpty && edit.newText.includes(eol)) {
        const startPosition = textModel.getTransformer().getPosition(edit.replaceRange.start);
        const hasTextOnInsertionLine = textModel.getLineLength(startPosition.lineNumber) !== 0;
        if (hasTextOnInsertionLine) {
            edit = reshapeMultiLineInsertion(edit, textModel);
        }
    }
    // The diff algorithm extended a simple edit to the entire word
    // shrink it back to a simple edit if it is deletion/insertion only
    if (totalInnerEdits === 1) {
        const prefixLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonPrefixLength"])(originalText, edit.newText);
        const suffixLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonSuffixLength"])(originalText.slice(prefixLength), edit.newText.slice(prefixLength));
        // reshape it back to an insertion
        if (prefixLength + suffixLength === originalText.length) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](edit.replaceRange.deltaStart(prefixLength).deltaEnd(-suffixLength), edit.newText.substring(prefixLength, edit.newText.length - suffixLength));
        }
        // reshape it back to a deletion
        if (prefixLength + suffixLength === edit.newText.length) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](edit.replaceRange.deltaStart(prefixLength).deltaEnd(-suffixLength), '');
        }
    }
    return edit;
}
function reshapeMultiLineInsertion(edit, textModel) {
    if (!edit.replaceRange.isEmpty) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Unexpected original range');
    }
    if (edit.replaceRange.start === 0) {
        return edit;
    }
    const eol = textModel.getEOL();
    const startPosition = textModel.getTransformer().getPosition(edit.replaceRange.start);
    const startColumn = startPosition.column;
    const startLineNumber = startPosition.lineNumber;
    // If the insertion ends with a new line and is inserted at the start of a line which has text,
    // we move the insertion to the end of the previous line if possible
    if (startColumn === 1 && startLineNumber > 1 && edit.newText.endsWith(eol) && !edit.newText.startsWith(eol)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](edit.replaceRange.delta(-1), eol + edit.newText.slice(0, -eol.length));
    }
    return edit;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/graph.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectedGraph",
    ()=>DirectedGraph
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class DirectedGraph {
    constructor(){
        this._nodes = new Set();
        this._outgoingEdges = new Map();
    }
    static from(nodes, getOutgoing) {
        const graph = new DirectedGraph();
        for (const node of nodes){
            graph._nodes.add(node);
        }
        for (const node of nodes){
            const outgoing = getOutgoing(node);
            if (outgoing.length > 0) {
                const outgoingSet = new Set();
                for (const target of outgoing){
                    outgoingSet.add(target);
                }
                graph._outgoingEdges.set(node, outgoingSet);
            }
        }
        return graph;
    }
    /**
     * After this, the graph is guaranteed to have no cycles.
     */ removeCycles() {
        const foundCycles = [];
        const visited = new Set();
        const recursionStack = new Set();
        const toRemove = [];
        const dfs = (node)=>{
            visited.add(node);
            recursionStack.add(node);
            const outgoing = this._outgoingEdges.get(node);
            if (outgoing) {
                for (const neighbor of outgoing){
                    if (!visited.has(neighbor)) {
                        dfs(neighbor);
                    } else if (recursionStack.has(neighbor)) {
                        // Found a cycle
                        foundCycles.push(neighbor);
                        toRemove.push({
                            from: node,
                            to: neighbor
                        });
                    }
                }
            }
            recursionStack.delete(node);
        };
        // Run DFS from all unvisited nodes
        for (const node of this._nodes){
            if (!visited.has(node)) {
                dfs(node);
            }
        }
        // Remove edges that cause cycles
        for (const { from, to } of toRemove){
            const outgoingSet = this._outgoingEdges.get(from);
            if (outgoingSet) {
                outgoingSet.delete(to);
            }
        }
        return {
            foundCycles
        };
    }
    getOutgoing(node) {
        const outgoing = this._outgoingEdges.get(node);
        return outgoing ? Array.from(outgoing) : [];
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionEditorType",
    ()=>InlineCompletionEditorType,
    "InlineSuggestData",
    ()=>InlineSuggestData,
    "InlineSuggestionList",
    ()=>InlineSuggestionList,
    "provideInlineCompletions",
    ()=>provideInlineCompletions,
    "runWhenCancelled",
    ()=>runWhenCancelled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/cache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/cancellation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$collections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/collections.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/uri.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/uuid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$bracketPairsTextModelPart$2f$fixBrackets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/bracketPairsTextModelPart/fixBrackets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/textModelEditSource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$graph$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/graph.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionIsVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionIsVisible.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
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
 *--------------------------------------------------------------------------------------------*/ function provideInlineCompletions(providers, position, model, context, requestInfo, languageConfigurationService) {
    const requestUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefixedUuid"])('icr');
    const cancellationTokenSource = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancellationTokenSource"]();
    let cancelReason = undefined;
    const contextWithUuid = {
        ...context,
        requestUuid: requestUuid
    };
    const defaultReplaceRange = getDefaultRange(position, model);
    const providersByGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$collections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupByMap"])(providers, (p)=>p.groupId);
    const yieldsToGraph = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$graph$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectedGraph"].from(providers, (p)=>{
        return p.yieldsToGroupIds?.flatMap((groupId)=>providersByGroupId.get(groupId) ?? []) ?? [];
    });
    const { foundCycles } = yieldsToGraph.removeCycles();
    if (foundCycles.length > 0) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedExternalError"])(new Error(`Inline completions: cyclic yield-to dependency detected.` + ` Path: ${foundCycles.map((s)=>s.toString ? s.toString() : '' + s).join(' -> ')}`));
    }
    let runningCount = 0;
    const queryProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CachedFunction"](async (provider)=>{
        try {
            runningCount++;
            if (cancellationTokenSource.token.isCancellationRequested) {
                return undefined;
            }
            const yieldsTo = yieldsToGraph.getOutgoing(provider);
            for (const p of yieldsTo){
                // We know there is no cycle, so no recursion here
                const result = await queryProvider.get(p);
                if (result) {
                    for (const item of result.inlineSuggestions.items){
                        if (item.isInlineEdit || typeof item.insertText !== 'string' && item.insertText !== undefined) {
                            return undefined;
                        }
                        if (item.insertText !== undefined) {
                            const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(item.range) ?? defaultReplaceRange, item.insertText);
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionIsVisible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inlineCompletionIsVisible"])(t, undefined, model, position)) {
                                return undefined;
                            }
                        }
                    // else: inline completion is not visible, so lets not block
                    }
                }
            }
            let result;
            const providerStartTime = Date.now();
            try {
                result = await provider.provideInlineCompletions(model, position, contextWithUuid, cancellationTokenSource.token);
            } catch (e) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedExternalError"])(e);
                return undefined;
            }
            const providerEndTime = Date.now();
            if (!result) {
                return undefined;
            }
            const data = [];
            const list = new InlineSuggestionList(result, data, provider);
            list.addRef();
            runWhenCancelled(cancellationTokenSource.token, ()=>{
                return list.removeRef(cancelReason);
            });
            if (cancellationTokenSource.token.isCancellationRequested) {
                return undefined; // The list is disposed now, so we cannot return the items!
            }
            for (const item of result.items){
                const r = toInlineSuggestData(item, list, defaultReplaceRange, model, languageConfigurationService, contextWithUuid, requestInfo, {
                    startTime: providerStartTime,
                    endTime: providerEndTime
                });
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorResult"].is(r)) {
                    r.logError();
                    continue;
                }
                data.push(r);
            }
            return list;
        } finally{
            runningCount--;
        }
    });
    const inlineCompletionLists = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncIterableProducer"].fromPromisesResolveOrder(providers.map((p)=>queryProvider.get(p))).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
    return {
        contextWithUuid,
        get didAllProvidersReturn () {
            return runningCount === 0;
        },
        lists: inlineCompletionLists,
        cancelAndDispose: (reason)=>{
            if (cancelReason !== undefined) {
                return;
            }
            cancelReason = reason;
            cancellationTokenSource.dispose(true);
        }
    };
}
/** If the token is eventually cancelled, this will not leak either. */ function runWhenCancelled(token, callback) {
    if (token.isCancellationRequested) {
        callback();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"].None;
    } else {
        const listener = token.onCancellationRequested(()=>{
            listener.dispose();
            callback();
        });
        return {
            dispose: ()=>listener.dispose()
        };
    }
}
function toInlineSuggestData(inlineCompletion, source, defaultReplaceRange, textModel, languageConfigurationService, context, requestInfo, providerRequestInfo) {
    let action;
    const uri = inlineCompletion.uri ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].revive(inlineCompletion.uri) : undefined;
    if (inlineCompletion.jumpToPosition !== undefined) {
        action = {
            kind: 'jumpTo',
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].lift(inlineCompletion.jumpToPosition),
            uri
        };
    } else if (inlineCompletion.insertText !== undefined) {
        let insertText;
        let snippetInfo;
        let range = inlineCompletion.range ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(inlineCompletion.range) : defaultReplaceRange;
        if (typeof inlineCompletion.insertText === 'string') {
            insertText = inlineCompletion.insertText;
            if (languageConfigurationService && inlineCompletion.completeBracketPairs) {
                insertText = closeBrackets(insertText, range.getStartPosition(), textModel, languageConfigurationService);
                // Modify range depending on if brackets are added or removed
                const diff = insertText.length - inlineCompletion.insertText.length;
                if (diff !== 0) {
                    range = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn + diff);
                }
            }
            snippetInfo = undefined;
        } else if ('snippet' in inlineCompletion.insertText) {
            const preBracketCompletionLength = inlineCompletion.insertText.snippet.length;
            if (languageConfigurationService && inlineCompletion.completeBracketPairs) {
                inlineCompletion.insertText.snippet = closeBrackets(inlineCompletion.insertText.snippet, range.getStartPosition(), textModel, languageConfigurationService);
                // Modify range depending on if brackets are added or removed
                const diff = inlineCompletion.insertText.snippet.length - preBracketCompletionLength;
                if (diff !== 0) {
                    range = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn + diff);
                }
            }
            const snippet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetParser"]().parse(inlineCompletion.insertText.snippet);
            if (snippet.children.length === 1 && snippet.children[0] instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]) {
                insertText = snippet.children[0].value;
                snippetInfo = undefined;
            } else {
                insertText = snippet.toString();
                snippetInfo = {
                    snippet: inlineCompletion.insertText.snippet,
                    range: range
                };
            }
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertNever"])(inlineCompletion.insertText);
        }
        action = {
            kind: 'edit',
            range,
            insertText,
            snippetInfo,
            uri,
            alternativeAction: undefined
        };
    } else {
        action = undefined;
        if (!inlineCompletion.hint) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorResult"].message('Inline completion has no insertText, jumpToPosition nor hint.');
        }
    }
    return new InlineSuggestData(action, inlineCompletion.hint, inlineCompletion.additionalTextEdits || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReadonlyEmptyArray"])(), inlineCompletion, source, context, inlineCompletion.isInlineEdit ?? false, inlineCompletion.supportsRename ?? false, requestInfo, providerRequestInfo, inlineCompletion.correlationId);
}
class InlineSuggestData {
    get action() {
        return this._action;
    }
    constructor(_action, hint, additionalTextEdits, sourceInlineCompletion, source, context, isInlineEdit, supportsRename, _requestInfo, _providerRequestInfo, _correlationId){
        this._action = _action;
        this.hint = hint;
        this.additionalTextEdits = additionalTextEdits;
        this.sourceInlineCompletion = sourceInlineCompletion;
        this.source = source;
        this.context = context;
        this.isInlineEdit = isInlineEdit;
        this.supportsRename = supportsRename;
        this._requestInfo = _requestInfo;
        this._providerRequestInfo = _providerRequestInfo;
        this._correlationId = _correlationId;
        this._didShow = false;
        this._timeUntilShown = undefined;
        this._timeUntilActuallyShown = undefined;
        this._showStartTime = undefined;
        this._shownDuration = 0;
        this._showUncollapsedStartTime = undefined;
        this._showUncollapsedDuration = 0;
        this._notShownReason = undefined;
        this._didReportEndOfLife = false;
        this._lastSetEndOfLifeReason = undefined;
        this._isPreceeded = false;
        this._partiallyAcceptedCount = 0;
        this._partiallyAcceptedSinceOriginal = {
            characters: 0,
            ratio: 0,
            count: 0
        };
        this._renameInfo = undefined;
        this._editKind = undefined;
        this.performance = new InlineSuggestionsPerformance();
        this._viewData = {
            editorType: _requestInfo.editorType
        };
    }
    get showInlineEditMenu() {
        return this.sourceInlineCompletion.showInlineEditMenu ?? false;
    }
    get partialAccepts() {
        return this._partiallyAcceptedSinceOriginal;
    }
    async reportInlineEditShown(commandService, updatedInsertText, viewKind, viewData, editKind, timeWhenShown) {
        this.updateShownDuration(viewKind);
        if (this._didShow || this._didReportEndOfLife) {
            return;
        }
        this.addPerformanceMarker('shown');
        this._didShow = true;
        this._editKind = editKind;
        this._viewData.viewKind = viewKind;
        this._viewData.renderData = viewData;
        this._timeUntilShown = timeWhenShown - this._requestInfo.startTime;
        this._timeUntilActuallyShown = Date.now() - this._requestInfo.startTime;
        const editDeltaInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditDeltaInfo"](viewData.lineCountModified, viewData.lineCountOriginal, viewData.characterCountModified, viewData.characterCountOriginal);
        this.source.provider.handleItemDidShow?.(this.source.inlineSuggestions, this.sourceInlineCompletion, updatedInsertText, editDeltaInfo);
        if (this.sourceInlineCompletion.shownCommand) {
            await commandService.executeCommand(this.sourceInlineCompletion.shownCommand.id, ...this.sourceInlineCompletion.shownCommand.arguments || []);
        }
    }
    reportPartialAccept(acceptedCharacters, info, partialAcceptance) {
        this._partiallyAcceptedCount++;
        this._partiallyAcceptedSinceOriginal.characters += partialAcceptance.characters;
        this._partiallyAcceptedSinceOriginal.ratio = Math.min(this._partiallyAcceptedSinceOriginal.ratio + (1 - this._partiallyAcceptedSinceOriginal.ratio) * partialAcceptance.ratio, 1);
        this._partiallyAcceptedSinceOriginal.count += partialAcceptance.count;
        this.source.provider.handlePartialAccept?.(this.source.inlineSuggestions, this.sourceInlineCompletion, acceptedCharacters, info);
    }
    /**
     * Sends the end of life event to the provider.
     * If no reason is provided, the last set reason is used.
     * If no reason was set, the default reason is used.
    */ reportEndOfLife(reason) {
        if (this._didReportEndOfLife) {
            return;
        }
        this._didReportEndOfLife = true;
        this.reportInlineEditHidden();
        if (!reason) {
            reason = this._lastSetEndOfLifeReason ?? {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Ignored,
                userTypingDisagreed: false,
                supersededBy: undefined
            };
        }
        // A suggestion can only be "rejected" if it was actually shown to the user.
        // If the suggestion was never shown, downgrade to "ignored".
        if (reason.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Rejected && !this._didShow) {
            reason = {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Ignored,
                userTypingDisagreed: false,
                supersededBy: undefined
            };
        }
        if (reason.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Rejected && this.source.provider.handleRejection) {
            this.source.provider.handleRejection(this.source.inlineSuggestions, this.sourceInlineCompletion);
        }
        if (this.source.provider.handleEndOfLifetime) {
            const summary = {
                requestUuid: this.context.requestUuid,
                correlationId: this._correlationId,
                selectedSuggestionInfo: !!this.context.selectedSuggestionInfo,
                partiallyAccepted: this._partiallyAcceptedCount,
                partiallyAcceptedCountSinceOriginal: this._partiallyAcceptedSinceOriginal.count,
                partiallyAcceptedRatioSinceOriginal: this._partiallyAcceptedSinceOriginal.ratio,
                partiallyAcceptedCharactersSinceOriginal: this._partiallyAcceptedSinceOriginal.characters,
                shown: this._didShow,
                shownDuration: this._shownDuration,
                shownDurationUncollapsed: this._showUncollapsedDuration,
                editKind: this._editKind?.toString(),
                preceeded: this._isPreceeded,
                timeUntilShown: this._timeUntilShown,
                timeUntilActuallyShown: this._timeUntilActuallyShown,
                timeUntilProviderRequest: this._providerRequestInfo.startTime - this._requestInfo.startTime,
                timeUntilProviderResponse: this._providerRequestInfo.endTime - this._requestInfo.startTime,
                editorType: this._viewData.editorType,
                languageId: this._requestInfo.languageId,
                requestReason: this._requestInfo.reason,
                viewKind: this._viewData.viewKind,
                notShownReason: this._notShownReason,
                performanceMarkers: this.performance.toString(),
                renameCreated: this._renameInfo?.createdRename,
                renameDuration: this._renameInfo?.duration,
                renameTimedOut: this._renameInfo?.timedOut,
                renameDroppedOtherEdits: this._renameInfo?.droppedOtherEdits,
                renameDroppedRenameEdits: this._renameInfo?.droppedRenameEdits,
                typingInterval: this._requestInfo.typingInterval,
                typingIntervalCharacterCount: this._requestInfo.typingIntervalCharacterCount,
                skuPlan: this._requestInfo.sku?.plan,
                skuType: this._requestInfo.sku?.type,
                availableProviders: this._requestInfo.availableProviders.map((p)=>p.toString()).join(','),
                ...this._viewData.renderData?.getData()
            };
            this.source.provider.handleEndOfLifetime(this.source.inlineSuggestions, this.sourceInlineCompletion, reason, summary);
        }
    }
    setIsPreceeded(partialAccepts) {
        this._isPreceeded = true;
        if (this._partiallyAcceptedSinceOriginal.characters !== 0 || this._partiallyAcceptedSinceOriginal.ratio !== 0 || this._partiallyAcceptedSinceOriginal.count !== 0) {
            console.warn('Expected partiallyAcceptedCountSinceOriginal to be { characters: 0, rate: 0, partialAcceptances: 0 } before setIsPreceeded.');
        }
        this._partiallyAcceptedSinceOriginal = partialAccepts;
    }
    setNotShownReason(reason) {
        this._notShownReason ??= reason;
    }
    /**
     * Sets the end of life reason, but does not send the event to the provider yet.
    */ setEndOfLifeReason(reason) {
        this.reportInlineEditHidden();
        this._lastSetEndOfLifeReason = reason;
    }
    updateShownDuration(viewKind) {
        const timeNow = Date.now();
        if (!this._showStartTime) {
            this._showStartTime = timeNow;
        }
        const isCollapsed = viewKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$view$2f$inlineEdits$2f$inlineEditsViewInterface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionViewKind"].Collapsed;
        if (!isCollapsed && this._showUncollapsedStartTime === undefined) {
            this._showUncollapsedStartTime = timeNow;
        }
        if (isCollapsed && this._showUncollapsedStartTime !== undefined) {
            this._showUncollapsedDuration += timeNow - this._showUncollapsedStartTime;
        }
    }
    reportInlineEditHidden() {
        if (this._showStartTime === undefined) {
            return;
        }
        const timeNow = Date.now();
        this._shownDuration += timeNow - this._showStartTime;
        this._showStartTime = undefined;
        if (this._showUncollapsedStartTime === undefined) {
            return;
        }
        this._showUncollapsedDuration += timeNow - this._showUncollapsedStartTime;
        this._showUncollapsedStartTime = undefined;
    }
    setRenameProcessingInfo(info) {
        if (this._renameInfo) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]('Rename info has already been set.');
        }
        this._renameInfo = info;
    }
    withAction(action) {
        this._action = action;
        return this;
    }
    addPerformanceMarker(marker) {
        this.performance.mark(marker);
    }
}
class InlineSuggestionsPerformance {
    constructor(){
        this.markers = [];
        this.markers.push({
            name: 'start',
            timeStamp: Date.now()
        });
    }
    mark(marker) {
        this.markers.push({
            name: marker,
            timeStamp: Date.now()
        });
    }
    toString() {
        const deltas = [];
        for(let i = 1; i < this.markers.length; i++){
            const delta = this.markers[i].timeStamp - this.markers[i - 1].timeStamp;
            deltas.push({
                [this.markers[i].name]: delta
            });
        }
        return JSON.stringify(deltas);
    }
}
var InlineCompletionEditorType;
(function(InlineCompletionEditorType) {
    InlineCompletionEditorType["TextEditor"] = "textEditor";
    InlineCompletionEditorType["DiffEditor"] = "diffEditor";
    InlineCompletionEditorType["Notebook"] = "notebook";
})(InlineCompletionEditorType || (InlineCompletionEditorType = {}));
/**
 * A ref counted pointer to the computed `InlineCompletions` and the `InlineCompletionsProvider` that
 * computed them.
 */ class InlineSuggestionList {
    constructor(inlineSuggestions, inlineSuggestionsData, provider){
        this.inlineSuggestions = inlineSuggestions;
        this.inlineSuggestionsData = inlineSuggestionsData;
        this.provider = provider;
        this.refCount = 0;
    }
    addRef() {
        this.refCount++;
    }
    removeRef(reason = {
        kind: 'other'
    }) {
        this.refCount--;
        if (this.refCount === 0) {
            for (const item of this.inlineSuggestionsData){
                // Fallback if it has not been called before
                item.reportEndOfLife();
            }
            this.provider.disposeInlineCompletions(this.inlineSuggestions, reason);
        } else if (this.refCount < 0) {
            // Invariant: every addRef must be paired with exactly one removeRef.
            // Going negative means a removeRef without a matching addRef somewhere.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedError"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"](`InlineSuggestionList (provider=${this.provider.providerId?.toString()}) refCount went negative (${this.refCount}) — more removeRef than addRef calls.`));
        }
    }
}
function getDefaultRange(position, model) {
    const word = model.getWordAtPosition(position);
    const maxColumn = model.getLineMaxColumn(position.lineNumber);
    // By default, always replace up until the end of the current line.
    // This default might be subject to change!
    return word ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](position.lineNumber, word.startColumn, position.lineNumber, maxColumn) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(position, position.with(undefined, maxColumn));
}
function closeBrackets(text, position, model, languageConfigurationService) {
    const currentLine = model.getLineContent(position.lineNumber);
    const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"].replace(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](position.column - 1, currentLine.length), text);
    const proposedLineTokens = model.tokenization.tokenizeLinesAt(position.lineNumber, [
        edit.replace(currentLine)
    ]);
    const textTokens = proposedLineTokens?.[0].sliceZeroCopy(edit.getRangeAfterReplace());
    if (!textTokens) {
        return text;
    }
    const fixedText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$bracketPairsTextModelPart$2f$fixBrackets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fixBracketsInLine"])(textTokens, languageConfigurationService);
    return fixedText;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/renameSymbolProcessor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenameInferenceEngine",
    ()=>RenameInferenceEngine,
    "RenameSymbolProcessor",
    ()=>RenameSymbolProcessor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/cancellation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/diff/diff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/commands/common/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/bulkEditService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/languageConfigurationRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/textModelEditSource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$rename$2f$browser$2f$rename$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/rename/browser/rename.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/commandIds.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineSuggestionItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineSuggestionItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$renameSymbolTrackerService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/renameSymbolTrackerService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$codeEditorService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/codeEditorService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/textModelValueReference.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
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
var RenameKind;
(function(RenameKind) {
    RenameKind["no"] = "no";
    RenameKind["yes"] = "yes";
    RenameKind["maybe"] = "maybe";
})(RenameKind || (RenameKind = {}));
(function(RenameKind) {
    function fromString(value) {
        switch(value){
            case 'no':
                return RenameKind.no;
            case 'yes':
                return RenameKind.yes;
            case 'maybe':
                return RenameKind.maybe;
            default:
                return RenameKind.no;
        }
    }
    RenameKind.fromString = fromString;
})(RenameKind || (RenameKind = {}));
class RenameInferenceEngine {
    constructor(){}
    inferRename(textModel, editRange, insertText, wordDefinition) {
        // Extend the edit range to full lines to capture prefix/suffix renames
        const extendedRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](editRange.startLineNumber, 1, editRange.endLineNumber, textModel.getLineMaxColumn(editRange.endLineNumber));
        const startDiff = editRange.startColumn - extendedRange.startColumn;
        const endDiff = extendedRange.endColumn - editRange.endColumn;
        const originalText = textModel.getValueInRange(extendedRange);
        const modifiedText = textModel.getValueInRange(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](extendedRange.startLineNumber, extendedRange.startColumn, extendedRange.startLineNumber, extendedRange.startColumn + startDiff)) + insertText + textModel.getValueInRange(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](extendedRange.endLineNumber, extendedRange.endColumn - endDiff, extendedRange.endLineNumber, extendedRange.endColumn));
        // console.log(`Original: ${originalText} \nmodified: ${modifiedText}`);
        const others = [];
        const renames = [];
        let oldName = undefined;
        let newName = undefined;
        let position = undefined;
        const nesOffset = textModel.getOffsetAt(extendedRange.getStartPosition());
        const { changes: originalChanges } = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LcsDiff"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringDiffSequence"](originalText), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$diff$2f$diff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringDiffSequence"](modifiedText)).ComputeDiff(true);
        if (originalChanges.length === 0) {
            return undefined;
        }
        // Fold the changes to larger changes if the gap between two changes is a full word. This covers cases like renaming
        // `foo` to `abcfoobar`
        const changes = [];
        for (const change of originalChanges){
            if (changes.length === 0) {
                changes.push(change);
                continue;
            }
            const lastChange = changes[changes.length - 1];
            const gapOriginalLength = change.originalStart - (lastChange.originalStart + lastChange.originalLength);
            if (gapOriginalLength > 0) {
                const gapStartOffset = nesOffset + lastChange.originalStart + lastChange.originalLength;
                const gapStartPos = textModel.getPositionAt(gapStartOffset);
                const wordRange = textModel.getWordAtPosition(gapStartPos);
                if (wordRange) {
                    const wordStartOffset = textModel.getOffsetAt(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](gapStartPos.lineNumber, wordRange.startColumn));
                    const wordEndOffset = textModel.getOffsetAt(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](gapStartPos.lineNumber, wordRange.endColumn));
                    const gapEndOffset = gapStartOffset + gapOriginalLength;
                    if (wordStartOffset <= gapStartOffset && gapEndOffset <= wordEndOffset && wordStartOffset <= gapEndOffset && gapEndOffset <= wordEndOffset) {
                        lastChange.originalLength = change.originalStart + change.originalLength - lastChange.originalStart;
                        lastChange.modifiedLength = change.modifiedStart + change.modifiedLength - lastChange.modifiedStart;
                        continue;
                    }
                }
            }
            changes.push(change);
        }
        let tokenDiff = 0;
        for (const change of changes){
            const originalTextSegment = originalText.substring(change.originalStart, change.originalStart + change.originalLength);
            const insertedTextSegment = modifiedText.substring(change.modifiedStart, change.modifiedStart + change.modifiedLength);
            const startOffset = nesOffset + change.originalStart;
            const startPos = textModel.getPositionAt(startOffset);
            const endOffset = startOffset + change.originalLength;
            const endPos = textModel.getPositionAt(endOffset);
            const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(startPos, endPos);
            const diff = insertedTextSegment.length - change.originalLength;
            // If the original text segment contains a whitespace character we don't consider this a rename since
            // identifiers in programming languages can't contain whitespace characters usually
            if (/\s/.test(originalTextSegment)) {
                others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                tokenDiff += diff;
                continue;
            }
            if (originalTextSegment.length > 0) {
                wordDefinition.lastIndex = 0;
                const match = wordDefinition.exec(originalTextSegment);
                if (match === null || match.index !== 0 || match[0].length !== originalTextSegment.length) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
            }
            // If the inserted text contains a whitespace character we don't consider this a rename since identifiers in
            // programming languages can't contain whitespace characters usually
            if (/\s/.test(insertedTextSegment)) {
                others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                tokenDiff += diff;
                continue;
            }
            if (insertedTextSegment.length > 0) {
                wordDefinition.lastIndex = 0;
                const match = wordDefinition.exec(insertedTextSegment);
                if (match === null || match.index !== 0 || match[0].length !== insertedTextSegment.length) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
            }
            const wordRange = textModel.getWordAtPosition(startPos);
            // If we don't have a word range at the start position of the current document then we
            // don't treat it as a rename assuming that the rename refactoring will fail as well since
            // there can't be an identifier at that position.
            if (wordRange === null) {
                others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                tokenDiff += diff;
                continue;
            }
            const originalStartColumn = change.originalStart + 1;
            const isInsertion = change.originalLength === 0 && change.modifiedLength > 0;
            let tokenInfo;
            // Word info is left aligned whereas token info is right aligned for insertions.
            // We prefer a suffix insertion for renames so we take the word range for the token info.
            if (isInsertion && originalStartColumn === wordRange.endColumn && wordRange.endColumn > wordRange.startColumn) {
                tokenInfo = this.getTokenAtPosition(textModel, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](startPos.lineNumber, wordRange.startColumn));
            } else {
                tokenInfo = this.getTokenAtPosition(textModel, startPos);
            }
            if (wordRange.startColumn !== tokenInfo.range.startColumn || wordRange.endColumn !== tokenInfo.range.endColumn) {
                others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                tokenDiff += diff;
                continue;
            }
            if (tokenInfo.type === 0 /* StandardTokenType.Other */ ) {
                let identifier = textModel.getValueInRange(tokenInfo.range);
                if (identifier.length === 0) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
                if (oldName === undefined) {
                    oldName = identifier;
                } else if (oldName !== identifier) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
                // We assume that the new name starts at the same position as the old name from a token range perspective.
                const tokenStartPos = textModel.getOffsetAt(tokenInfo.range.getStartPosition()) - nesOffset + tokenDiff;
                const tokenEndPos = textModel.getOffsetAt(tokenInfo.range.getEndPosition()) - nesOffset + tokenDiff;
                identifier = modifiedText.substring(tokenStartPos, tokenEndPos + diff);
                if (identifier.length === 0) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
                if (newName === undefined) {
                    newName = identifier;
                } else if (newName !== identifier) {
                    others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                    tokenDiff += diff;
                    continue;
                }
                if (position === undefined) {
                    position = tokenInfo.range.getStartPosition();
                }
                if (oldName !== undefined && newName !== undefined && oldName.length > 0 && newName.length > 0 && oldName !== newName) {
                    renames.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](tokenInfo.range, newName));
                } else {
                    renames.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                }
                tokenDiff += diff;
            } else {
                others.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, insertedTextSegment));
                tokenDiff += insertedTextSegment.length - change.originalLength;
            }
        }
        if (oldName === undefined || newName === undefined || position === undefined || oldName.length === 0 || newName.length === 0 || oldName === newName) {
            return undefined;
        }
        wordDefinition.lastIndex = 0;
        let match = wordDefinition.exec(oldName);
        if (match === null || match.index !== 0 || match[0].length !== oldName.length) {
            return undefined;
        }
        wordDefinition.lastIndex = 0;
        match = wordDefinition.exec(newName);
        if (match === null || match.index !== 0 || match[0].length !== newName.length) {
            return undefined;
        }
        return {
            renames: {
                edits: renames,
                position,
                oldName,
                newName
            },
            others: {
                edits: others
            }
        };
    }
    getTokenAtPosition(textModel, position) {
        textModel.tokenization.tokenizeIfCheap(position.lineNumber);
        const tokens = textModel.tokenization.getLineTokens(position.lineNumber);
        const idx = tokens.findTokenIndexAtOffset(position.column - 1);
        return {
            type: tokens.getStandardTokenType(idx),
            range: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](position.lineNumber, 1 + tokens.getStartOffset(idx), position.lineNumber, 1 + tokens.getEndOffset(idx))
        };
    }
}
class EditorState {
    static create(codeEditorService, textModel) {
        const editor = codeEditorService.getFocusedCodeEditor();
        if (editor === null) {
            return undefined;
        }
        if (editor.getModel() !== textModel) {
            return undefined;
        }
        return new EditorState(editor, textModel.getVersionId());
    }
    constructor(editor, versionId){
        this.editor = editor;
        this.versionId = versionId;
    }
    equals(other) {
        if (other === undefined) {
            return false;
        }
        return this.editor === other.editor && this.versionId === other.versionId;
    }
}
class RenameSymbolRunnable {
    constructor(languageFeaturesService, commandService, requestUuid, textModel, state, position, newName, lastSymbolRename, oldName){
        this._result = undefined;
        this._commandService = commandService;
        this._textModel = textModel;
        this._state = state;
        this._requestUuid = requestUuid;
        this._cancellationTokenSource = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancellationTokenSource"]();
        if (lastSymbolRename === undefined || oldName === undefined) {
            this._promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$rename$2f$browser$2f$rename$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rawRename"])(languageFeaturesService.renameProvider, textModel, position, newName, this._cancellationTokenSource.token);
            return;
        } else {
            this._promise = this.sendNesRenameRequest(textModel, position, oldName, newName, lastSymbolRename);
        }
    }
    get requestUuid() {
        return this._requestUuid;
    }
    isValid(codeEditorService) {
        return this._state.equals(EditorState.create(codeEditorService, this._textModel));
    }
    cancel() {
        this._cancellationTokenSource.cancel();
    }
    async getCount() {
        if (this._cancellationTokenSource.token.isCancellationRequested) {
            return 0;
        }
        const result = await this.getResult();
        if (result === undefined || this._cancellationTokenSource.token.isCancellationRequested) {
            return 0;
        }
        return result.edits.length;
    }
    async getWorkspaceEdit() {
        return this.getResult();
    }
    async getResult() {
        if (this._cancellationTokenSource.token.isCancellationRequested) {
            return undefined;
        }
        if (this._result === undefined) {
            this._result = await this._promise;
        }
        if (this._result.rejectReason || this._cancellationTokenSource.token.isCancellationRequested) {
            return undefined;
        }
        return this._result;
    }
    async sendNesRenameRequest(textModel, position, oldName, newName, lastSymbolRename) {
        try {
            const result = await this._commandService.executeCommand('github.copilot.nes.postRename', textModel.uri, position, oldName, newName, lastSymbolRename);
            if (result === undefined) {
                return {
                    rejectReason: 'Rename failed',
                    edits: []
                };
            }
            const edits = [];
            for (const item of result){
                for (const change of item.changes){
                    const range = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](change.range.start.line + 1, change.range.start.character + 1, change.range.end.line + 1, change.range.end.character + 1);
                    const edit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceTextEdit"](item.file, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](range, change.newText ?? newName));
                    edits.push(edit);
                }
            }
            return {
                edits
            };
        } catch (error) {
            return {
                rejectReason: 'Rename failed',
                edits: []
            };
        }
    }
}
let RenameSymbolProcessor = class RenameSymbolProcessor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_commandService, _languageFeaturesService, _languageConfigurationService, bulkEditService, _renameSymbolTrackerService, _codeEditorService){
        super();
        this._commandService = _commandService;
        this._languageFeaturesService = _languageFeaturesService;
        this._languageConfigurationService = _languageConfigurationService;
        this._renameSymbolTrackerService = _renameSymbolTrackerService;
        this._codeEditorService = _codeEditorService;
        this._renameInferenceEngine = new RenameInferenceEngine();
        this._renameRunnable = undefined;
        this._register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandsRegistry"].registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renameSymbolCommandId"], async (_, source, renameRunnable)=>{
            if (renameRunnable === undefined || !renameRunnable.isValid(this._codeEditorService)) {
                return;
            }
            try {
                const workspaceEdit = await renameRunnable.getWorkspaceEdit();
                if (workspaceEdit === undefined) {
                    return;
                }
                bulkEditService.apply(workspaceEdit, {
                    reason: source
                });
            } finally{
                if (this._renameRunnable === renameRunnable) {
                    this._renameRunnable = undefined;
                }
            }
        }));
    }
    async proposeRenameRefactoring(textModel, suggestItem, context) {
        if (!suggestItem.supportsRename || suggestItem.action?.kind !== 'edit' || context.selectedSuggestionInfo) {
            return suggestItem;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$rename$2f$browser$2f$rename$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasProvider"])(this._languageFeaturesService.renameProvider, textModel)) {
            return suggestItem;
        }
        const state = EditorState.create(this._codeEditorService, textModel);
        if (state === undefined) {
            return suggestItem;
        }
        const start = Date.now();
        const edit = suggestItem.action.textReplacement;
        const languageConfiguration = this._languageConfigurationService.getLanguageConfiguration(textModel.getLanguageId());
        // Check synchronously if a rename is possible
        const edits = this._renameInferenceEngine.inferRename(textModel, edit.range, edit.text, languageConfiguration.wordDefinition);
        if (edits === undefined || edits.renames.edits.length === 0) {
            return suggestItem;
        }
        const { oldName, newName, position, edits: renameEdits } = edits.renames;
        const trackedWord = this._renameSymbolTrackerService.trackedWord.get();
        let lastSymbolRename = undefined;
        if (trackedWord !== undefined && trackedWord.model === textModel && trackedWord.originalWord === oldName && trackedWord.currentWord === newName) {
            lastSymbolRename = trackedWord.currentRange;
        }
        // Check asynchronously if a rename is possible
        let timedOut = false;
        const check = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["raceTimeout"])(this.checkRenamePrecondition(suggestItem, textModel, position, oldName, newName, lastSymbolRename), 100, ()=>{
            timedOut = true;
        });
        const renamePossible = this.isRenamePossible(suggestItem, check, state, textModel);
        suggestItem.setRenameProcessingInfo({
            createdRename: renamePossible,
            duration: Date.now() - start,
            timedOut,
            droppedOtherEdits: renamePossible ? edits.others.edits.length : undefined,
            droppedRenameEdits: renamePossible ? renameEdits.length - 1 : undefined
        });
        if (!renamePossible) {
            return suggestItem;
        }
        // Prepare the rename edits
        if (this._renameRunnable === undefined) {
            this._renameRunnable = new RenameSymbolRunnable(this._languageFeaturesService, this._commandService, suggestItem.requestUuid, textModel, state, position, newName, lastSymbolRename, lastSymbolRename !== undefined ? oldName : undefined);
        }
        // Create alternative action
        const source = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditSources"].inlineCompletionAccept({
            nes: suggestItem.isInlineEdit,
            requestUuid: suggestItem.requestUuid,
            providerId: suggestItem.source.provider.providerId,
            languageId: textModel.getLanguageId(),
            correlationId: suggestItem.getSourceCompletion().correlationId
        });
        const command = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$commandIds$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renameSymbolCommandId"],
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1274, "Rename"),
            arguments: [
                source,
                this._renameRunnable
            ]
        };
        const alternativeAction = {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(1275, "Rename"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].replaceAll,
            command,
            count: this._renameRunnable.getCount()
        };
        const renameAction = {
            kind: 'edit',
            range: renameEdits[0].range,
            insertText: renameEdits[0].text,
            snippetInfo: suggestItem.snippetInfo,
            alternativeAction,
            uri: textModel.uri
        };
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelValueReference"].snapshot(textModel);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineSuggestionItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestionItem"].create(suggestItem.withAction(renameAction), ref, false);
    }
    async checkRenamePrecondition(suggestItem, textModel, position, oldName, newName, lastSymbolRename) {
        const no = {
            canRename: RenameKind.no,
            timedOut: false
        };
        try {
            const result = await this._commandService.executeCommand('github.copilot.nes.prepareRename', textModel.uri, position, oldName, newName, suggestItem.requestUuid, lastSymbolRename);
            if (result === undefined) {
                return no;
            } else if (typeof result === 'string') {
                const canRename = RenameKind.fromString(result);
                if (canRename === RenameKind.yes || canRename === RenameKind.maybe) {
                    return {
                        canRename,
                        oldName,
                        onOldState: false
                    };
                } else {
                    return {
                        canRename,
                        timedOut: false
                    };
                }
            } else {
                return result;
            }
        } catch (error) {
            return no;
        }
    }
    isRenamePossible(suggestItem, check, state, textModel) {
        if (check === undefined || check.canRename === RenameKind.no) {
            return false;
        }
        if (!state.equals(EditorState.create(this._codeEditorService, textModel))) {
            return false;
        }
        if (this._renameRunnable === undefined) {
            return true;
        }
        if (this._renameRunnable.requestUuid === suggestItem.requestUuid) {
            return false;
        } else {
            this._renameRunnable.cancel();
            this._renameRunnable = undefined;
            return true;
        }
    }
};
RenameSymbolProcessor = __decorate([
    __param(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"]),
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageConfigurationService"]),
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IBulkEditService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$renameSymbolTrackerService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IRenameSymbolTrackerService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$codeEditorService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICodeEditorService"])
], RenameSymbolProcessor);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsSource.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionsSource",
    ()=>InlineCompletionsSource,
    "InlineCompletionsState",
    ()=>InlineCompletionsState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arraysFind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/cancellation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/equals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/objects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$experimental$2f$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/experimental/reducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/configuration/common/configuration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$browser$2f$forwardingTelemetryService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/dataChannel/browser/forwardingTelemetryService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/log/common/log.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$platformObservableUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/observable/common/platformObservableUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/languageConfigurationRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelStringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModelStringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$completionsEnablement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/completionsEnablement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$resolverService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/resolverService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$structuredLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/structuredLogger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineSuggestionItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineSuggestionItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$renameSymbolProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/renameSymbolProcessor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/textModelValueReference.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$changeTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/changeTracker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/runOnChange.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
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
var InlineCompletionsSource_1;
let InlineCompletionsSource = class InlineCompletionsSource extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        InlineCompletionsSource_1 = this;
    }
    static{
        this._requestId = 0;
    }
    constructor(_textModel, _versionId, _debounceValue, _cursorPosition, completionsEnablementSetting, _languageConfigurationService, _logService, _configurationService, _instantiationService, _contextKeyService, _textModelService){
        super();
        this._textModel = _textModel;
        this._versionId = _versionId;
        this._debounceValue = _debounceValue;
        this._cursorPosition = _cursorPosition;
        this._languageConfigurationService = _languageConfigurationService;
        this._logService = _logService;
        this._configurationService = _configurationService;
        this._instantiationService = _instantiationService;
        this._contextKeyService = _contextKeyService;
        this._textModelService = _textModelService;
        this._updateOperation = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutableDisposable"]());
        this._state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$experimental$2f$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableReducerSettable"])(this, {
            initial: ()=>({
                    inlineCompletions: InlineCompletionsState.createEmpty(),
                    suggestWidgetInlineCompletions: InlineCompletionsState.createEmpty()
                }),
            disposeFinal: (values)=>{
                values.inlineCompletions.dispose();
                values.suggestWidgetInlineCompletions.dispose();
            },
            changeTracker: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$changeTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordChangesLazy"])(()=>({
                    versionId: this._versionId
                })),
            update: (reader, previousValue, changes)=>{
                const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"].compose(changes.changes.map((c)=>c.change ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelStringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["offsetEditFromContentChanges"])(c.change.changes) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringEdit"].empty).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]));
                if (edit.isEmpty()) {
                    return previousValue;
                }
                try {
                    return {
                        inlineCompletions: previousValue.inlineCompletions.createStateWithAppliedEdit(edit, this._textModel),
                        suggestWidgetInlineCompletions: previousValue.suggestWidgetInlineCompletions.createStateWithAppliedEdit(edit, this._textModel)
                    };
                } finally{
                    previousValue.inlineCompletions.dispose();
                    previousValue.suggestWidgetInlineCompletions.dispose();
                }
            }
        });
        this.inlineCompletions = this._state.map(this, (v)=>v.inlineCompletions);
        this.suggestWidgetInlineCompletions = this._state.map(this, (v)=>v.suggestWidgetInlineCompletions);
        this._completionsEnabled = undefined;
        this.clearOperationOnTextModelChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            this._versionId.read(reader);
            this._updateOperation.clear();
            return undefined; // always constant
        });
        this._loadingCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, 0);
        this.loading = this._loadingCount.map(this, (v)=>v > 0);
        this._dataChannelTelemetryService = this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$browser$2f$forwardingTelemetryService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataChannelForwardingTelemetryService"]);
        this._loggingEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$platformObservableUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableConfigValue"])('editor.inlineSuggest.logFetch', false, this._configurationService).recomputeInitiallyAndOnChange(this._store);
        this._sendRequestData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$observable$2f$common$2f$platformObservableUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableConfigValue"])('editor.inlineSuggest.emptyResponseInformation', true, this._configurationService).recomputeInitiallyAndOnChange(this._store);
        this._structuredFetchLogger = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$structuredLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StructuredLogger"].cast(), 'editor.inlineSuggest.logFetch.commandId'));
        this._renameProcessor = this._store.add(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$renameSymbolProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenameSymbolProcessor"]));
        this.clearOperationOnTextModelChange.recomputeInitiallyAndOnChange(this._store);
        if (completionsEnablementSetting) {
            this._updateCompletionsEnablement(completionsEnablementSetting);
            this._register(this._configurationService.onDidChangeConfiguration((e)=>{
                if (e.affectsConfiguration(completionsEnablementSetting)) {
                    this._updateCompletionsEnablement(completionsEnablementSetting);
                }
            }));
        }
        this._state.recomputeInitiallyAndOnChange(this._store);
    }
    _updateCompletionsEnablement(enalementSetting) {
        const result = this._configurationService.getValue(enalementSetting);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObject"])(result)) {
            this._completionsEnabled = undefined;
        } else {
            this._completionsEnabled = result;
        }
    }
    _log(entry) {
        if (this._loggingEnabled.get()) {
            this._logService.info((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$structuredLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRecordableLogEntry"])(entry));
        }
        this._structuredFetchLogger.log(entry);
    }
    fetch(providers, providersLabel, context, activeInlineCompletion, withDebounce, userJumpedToActiveCompletion, requestInfo) {
        const position = this._cursorPosition.get();
        const request = new UpdateRequest(position, context, this._textModel.getVersionId(), new Set(providers));
        const target = context.selectedSuggestionInfo ? this.suggestWidgetInlineCompletions.get() : this.inlineCompletions.get();
        if (this._updateOperation.value?.request.satisfies(request)) {
            return this._updateOperation.value.promise;
        } else if (target?.request?.satisfies(request)) {
            return Promise.resolve(true);
        }
        const updateOngoing = !!this._updateOperation.value;
        this._updateOperation.clear();
        const source = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancellationTokenSource"]();
        const promise = (async ()=>{
            const store = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
            this._loadingCount.set(this._loadingCount.get() + 1, undefined);
            let didDecrease = false;
            const decreaseLoadingCount = ()=>{
                if (!didDecrease) {
                    didDecrease = true;
                    this._loadingCount.set(this._loadingCount.get() - 1, undefined);
                }
            };
            const loadingReset = store.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RunOnceScheduler"](()=>decreaseLoadingCount(), 10 * 1000));
            loadingReset.schedule();
            const inlineSuggestionsProviders = providers.filter((p)=>p.providerId);
            const requestResponseInfo = new RequestResponseData(context, requestInfo, inlineSuggestionsProviders);
            try {
                const recommendedDebounceValue = this._debounceValue.get(this._textModel);
                const debounceValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findLastMax"])(providers.map((p)=>p.debounceDelayMs), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareUndefinedSmallest"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberComparator"])) ?? recommendedDebounceValue;
                // Debounce in any case if update is ongoing
                const shouldDebounce = updateOngoing || withDebounce && context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Automatic;
                if (shouldDebounce) {
                    // This debounces the operation
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wait"])(debounceValue, source.token);
                }
                if (source.token.isCancellationRequested || this._store.isDisposed || this._textModel.getVersionId() !== request.versionId) {
                    requestResponseInfo.setNoSuggestionReasonIfNotSet('canceled:beforeFetch');
                    return false;
                }
                const requestId = InlineCompletionsSource_1._requestId++;
                if (this._loggingEnabled.get() || this._structuredFetchLogger.isEnabled.get()) {
                    this._log({
                        sourceId: 'InlineCompletions.fetch',
                        kind: 'start',
                        requestId,
                        modelUri: this._textModel.uri,
                        modelVersion: this._textModel.getVersionId(),
                        context: {
                            triggerKind: context.triggerKind,
                            suggestInfo: context.selectedSuggestionInfo ? true : undefined
                        },
                        time: Date.now(),
                        provider: providersLabel
                    });
                }
                const startTime = new Date();
                const providerResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["provideInlineCompletions"])(providers, this._cursorPosition.get(), this._textModel, context, requestInfo, this._languageConfigurationService);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runWhenCancelled"])(source.token, ()=>providerResult.cancelAndDispose({
                        kind: 'tokenCancellation'
                    }));
                let shouldStopEarly = false;
                let producedSuggestion = false;
                const providerSuggestions = [];
                for await (const list of providerResult.lists){
                    if (!list) {
                        continue;
                    }
                    list.addRef();
                    store.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>list.removeRef(list.inlineSuggestionsData.length === 0 ? {
                            kind: 'empty'
                        } : {
                            kind: 'notTaken'
                        })));
                    for (const item of list.inlineSuggestionsData){
                        producedSuggestion = true;
                        if (!context.includeInlineEdits && (item.isInlineEdit || item.showInlineEditMenu)) {
                            item.setNotShownReason('notInlineEditRequested');
                            continue;
                        }
                        if (!context.includeInlineCompletions && !(item.isInlineEdit || item.showInlineEditMenu)) {
                            item.setNotShownReason('notInlineCompletionRequested');
                            continue;
                        }
                        item.addPerformanceMarker('providerReturned');
                        const targetUri = item.action?.uri;
                        let targetModel;
                        let disposable;
                        if (targetUri && targetUri.toString() !== this._textModel.uri.toString()) {
                            const modelRef = await this._textModelService.createModelReference(targetUri);
                            targetModel = modelRef.object.textEditorModel;
                            disposable = modelRef;
                        } else {
                            targetModel = this._textModel;
                            disposable = undefined;
                        }
                        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$textModelValueReference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelValueReference"].snapshot(targetModel);
                        const i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineSuggestionItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineSuggestionItem"].create(item, ref);
                        if (disposable) {
                            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$runOnChange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runOnChange"])(i.identity.onDispose, ()=>{
                                disposable?.dispose();
                                s.dispose();
                            });
                        }
                        item.addPerformanceMarker('itemCreated');
                        providerSuggestions.push(i);
                        // Stop after first visible inline completion
                        if (!i.isInlineEdit && !i.showInlineEditMenu && context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Automatic) {
                            if (i.isVisible(this._textModel, this._cursorPosition.get())) {
                                shouldStopEarly = true;
                            }
                        }
                    }
                    if (shouldStopEarly) {
                        break;
                    }
                }
                providerSuggestions.forEach((s)=>s.addPerformanceMarker('providersResolved'));
                const suggestions = await Promise.all(providerSuggestions.map(async (s)=>{
                    return this._renameProcessor.proposeRenameRefactoring(this._textModel, s, context);
                }));
                suggestions.forEach((s)=>s.addPerformanceMarker('renameProcessed'));
                providerResult.cancelAndDispose({
                    kind: 'lostRace'
                });
                if (this._loggingEnabled.get() || this._structuredFetchLogger.isEnabled.get()) {
                    const didAllProvidersReturn = providerResult.didAllProvidersReturn;
                    let error = undefined;
                    if (source.token.isCancellationRequested || this._store.isDisposed || this._textModel.getVersionId() !== request.versionId) {
                        error = 'canceled';
                    }
                    const result = suggestions.map((c)=>{
                        const comp = c.getSourceCompletion();
                        if (comp.doNotLog) {
                            return undefined;
                        }
                        const obj = {
                            insertText: comp.insertText,
                            range: comp.range,
                            additionalTextEdits: comp.additionalTextEdits,
                            uri: comp.uri,
                            command: comp.command,
                            gutterMenuLinkAction: comp.gutterMenuLinkAction,
                            shownCommand: comp.shownCommand,
                            completeBracketPairs: comp.completeBracketPairs,
                            isInlineEdit: comp.isInlineEdit,
                            showInlineEditMenu: comp.showInlineEditMenu,
                            showRange: comp.showRange,
                            warning: comp.warning,
                            hint: comp.hint,
                            supportsRename: comp.supportsRename,
                            correlationId: comp.correlationId,
                            jumpToPosition: comp.jumpToPosition
                        };
                        return {
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneAndChange"])(obj, (v)=>{
                                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].isIRange(v)) {
                                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(v).toString();
                                }
                                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].isIPosition(v)) {
                                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].lift(v).toString();
                                }
                                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].is(v)) {
                                    return {
                                        $commandId: v.id
                                    };
                                }
                                return v;
                            }),
                            $providerId: c.source.provider.providerId?.toString()
                        };
                    }).filter((result)=>result !== undefined);
                    this._log({
                        sourceId: 'InlineCompletions.fetch',
                        kind: 'end',
                        requestId,
                        durationMs: Date.now() - startTime.getTime(),
                        error,
                        result,
                        time: Date.now(),
                        didAllProvidersReturn
                    });
                }
                requestResponseInfo.setRequestUuid(providerResult.contextWithUuid.requestUuid);
                if (producedSuggestion) {
                    requestResponseInfo.setHasProducedSuggestion();
                    if (suggestions.length > 0 && source.token.isCancellationRequested) {
                        suggestions.forEach((s)=>s.setNotShownReasonIfNotSet('canceled:whileAwaitingOtherProviders'));
                    }
                } else {
                    if (source.token.isCancellationRequested) {
                        requestResponseInfo.setNoSuggestionReasonIfNotSet('canceled:whileFetching');
                    } else {
                        const completionsQuotaExceeded = this._contextKeyService.getContextKeyValue('completionsQuotaExceeded');
                        requestResponseInfo.setNoSuggestionReasonIfNotSet(completionsQuotaExceeded ? 'completionsQuotaExceeded' : 'noSuggestion');
                    }
                }
                const remainingTimeToWait = context.earliestShownDateTime - Date.now();
                if (remainingTimeToWait > 0) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wait"])(remainingTimeToWait, source.token);
                }
                suggestions.forEach((s)=>s.addPerformanceMarker('minShowDelayPassed'));
                if (source.token.isCancellationRequested || this._store.isDisposed || this._textModel.getVersionId() !== request.versionId || userJumpedToActiveCompletion.get()) {
                    const notShownReason = source.token.isCancellationRequested ? 'canceled:afterMinShowDelay' : this._store.isDisposed ? 'canceled:disposed' : this._textModel.getVersionId() !== request.versionId ? 'canceled:documentChanged' : userJumpedToActiveCompletion.get() ? 'canceled:userJumped' : 'unknown';
                    suggestions.forEach((s)=>s.setNotShownReasonIfNotSet(notShownReason));
                    return false;
                }
                const endTime = new Date();
                this._debounceValue.update(this._textModel, endTime.getTime() - startTime.getTime());
                const cursorPosition = this._cursorPosition.get();
                this._updateOperation.clear();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
                    /** @description Update completions with provider result */ const v = this._state.get();
                    if (context.selectedSuggestionInfo) {
                        this._state.set({
                            inlineCompletions: InlineCompletionsState.createEmpty(),
                            suggestWidgetInlineCompletions: v.suggestWidgetInlineCompletions.createStateWithAppliedResults(suggestions, request, this._textModel, cursorPosition, activeInlineCompletion)
                        }, tx);
                    } else {
                        this._state.set({
                            inlineCompletions: v.inlineCompletions.createStateWithAppliedResults(suggestions, request, this._textModel, cursorPosition, activeInlineCompletion),
                            suggestWidgetInlineCompletions: InlineCompletionsState.createEmpty()
                        }, tx);
                    }
                    v.inlineCompletions.dispose();
                    v.suggestWidgetInlineCompletions.dispose();
                });
            } finally{
                store.dispose();
                decreaseLoadingCount();
                this._sendInlineCompletionsRequestTelemetry(requestResponseInfo);
            }
            return true;
        })();
        const updateOperation = new UpdateOperation(request, source, promise);
        this._updateOperation.value = updateOperation;
        return promise;
    }
    clear(tx) {
        if (this._store.isDisposed) {
            return;
        }
        this._updateOperation.clear();
        const v = this._state.get();
        this._state.set({
            inlineCompletions: InlineCompletionsState.createEmpty(),
            suggestWidgetInlineCompletions: InlineCompletionsState.createEmpty()
        }, tx);
        v.inlineCompletions.dispose();
        v.suggestWidgetInlineCompletions.dispose();
    }
    seedInlineCompletionsWithSuggestWidget() {
        const inlineCompletions = this.inlineCompletions.get();
        const suggestWidgetInlineCompletions = this.suggestWidgetInlineCompletions.get();
        if (!suggestWidgetInlineCompletions) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
            /** @description Seed inline completions with (newer) suggest widget inline completions */ if (!inlineCompletions || (suggestWidgetInlineCompletions.request?.versionId ?? -1) > (inlineCompletions.request?.versionId ?? -1)) {
                inlineCompletions?.dispose();
                const s = this._state.get();
                this._state.set({
                    inlineCompletions: suggestWidgetInlineCompletions.clone(),
                    suggestWidgetInlineCompletions: InlineCompletionsState.createEmpty()
                }, tx);
                s.inlineCompletions.dispose();
                s.suggestWidgetInlineCompletions.dispose();
            }
            this.clearSuggestWidgetInlineCompletions(tx);
        });
    }
    /**
     * Seeds the inline completions with an external inline completion item.
     * Used when transplanting a completion from one model to another (cross-file edits).
     */ seedWithCompletion(item, tx) {
        const s = this._state.get();
        this._state.set({
            inlineCompletions: new InlineCompletionsState([
                item
            ], undefined),
            suggestWidgetInlineCompletions: InlineCompletionsState.createEmpty()
        }, tx);
        s.inlineCompletions.dispose();
        s.suggestWidgetInlineCompletions.dispose();
    }
    _sendInlineCompletionsRequestTelemetry(requestResponseInfo) {
        if (!this._sendRequestData.get() && !this._contextKeyService.getContextKeyValue('isRunningUnificationExperiment')) {
            return;
        }
        if (requestResponseInfo.requestUuid === undefined || requestResponseInfo.hasProducedSuggestion) {
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$completionsEnablement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompletionsEnabledFromObject"])(this._completionsEnabled, this._textModel.getLanguageId())) {
            return;
        }
        if (!requestResponseInfo.providers.some((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$browser$2f$forwardingTelemetryService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCopilotLikeExtension"])(p.providerId?.extensionId))) {
            return;
        }
        const emptyEndOfLifeEvent = {
            opportunityId: requestResponseInfo.requestUuid,
            noSuggestionReason: requestResponseInfo.noSuggestionReason ?? 'unknown',
            extensionId: 'vscode-core',
            extensionVersion: '0.0.0',
            groupId: 'empty',
            shown: false,
            skuPlan: requestResponseInfo.requestInfo.sku?.plan,
            skuType: requestResponseInfo.requestInfo.sku?.type,
            editorType: requestResponseInfo.requestInfo.editorType,
            requestReason: requestResponseInfo.requestInfo.reason,
            typingInterval: requestResponseInfo.requestInfo.typingInterval,
            typingIntervalCharacterCount: requestResponseInfo.requestInfo.typingIntervalCharacterCount,
            languageId: requestResponseInfo.requestInfo.languageId,
            selectedSuggestionInfo: !!requestResponseInfo.context.selectedSuggestionInfo,
            availableProviders: requestResponseInfo.providers.map((p)=>p.providerId?.toString()).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]).join(','),
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$browser$2f$forwardingTelemetryService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardToChannelIf"])(requestResponseInfo.providers.some((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dataChannel$2f$browser$2f$forwardingTelemetryService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCopilotLikeExtension"])(p.providerId?.extensionId))),
            timeUntilProviderRequest: undefined,
            timeUntilProviderResponse: undefined,
            viewKind: undefined,
            preceeded: undefined,
            superseded: undefined,
            reason: undefined,
            acceptedAlternativeAction: undefined,
            correlationId: undefined,
            shownDuration: undefined,
            shownDurationUncollapsed: undefined,
            timeUntilShown: undefined,
            partiallyAccepted: undefined,
            partiallyAcceptedCountSinceOriginal: undefined,
            partiallyAcceptedRatioSinceOriginal: undefined,
            partiallyAcceptedCharactersSinceOriginal: undefined,
            cursorColumnDistance: undefined,
            cursorLineDistance: undefined,
            lineCountOriginal: undefined,
            lineCountModified: undefined,
            characterCountOriginal: undefined,
            characterCountModified: undefined,
            disjointReplacements: undefined,
            sameShapeReplacements: undefined,
            longDistanceHintVisible: undefined,
            longDistanceHintDistance: undefined,
            isForAnotherDocument: undefined,
            notShownReason: undefined,
            renameCreated: false,
            renameDuration: undefined,
            renameTimedOut: false,
            renameDroppedOtherEdits: undefined,
            renameDroppedRenameEdits: undefined,
            performanceMarkers: undefined,
            editKind: undefined
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendInlineCompletionsEndOfLifeTelemetry"])(this._dataChannelTelemetryService, emptyEndOfLifeEvent);
    }
    clearSuggestWidgetInlineCompletions(tx) {
        if (this._updateOperation.value?.request.context.selectedSuggestionInfo) {
            this._updateOperation.clear();
        }
    }
    cancelUpdate() {
        this._updateOperation.clear();
    }
};
InlineCompletionsSource = InlineCompletionsSource_1 = __decorate([
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageConfigurationService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILogService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IConfigurationService"]),
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$resolverService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITextModelService"])
], InlineCompletionsSource);
class UpdateRequest {
    constructor(position, context, versionId, providers){
        this.position = position;
        this.context = context;
        this.versionId = versionId;
        this.providers = providers;
    }
    satisfies(other) {
        return this.position.equals(other.position) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalsIfDefined"])(this.context.selectedSuggestionInfo, other.context.selectedSuggestionInfo, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thisEqualsC"])()) && (other.context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Automatic || this.context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit) && this.versionId === other.versionId && isSubset(other.providers, this.providers);
    }
}
class RequestResponseData {
    constructor(context, requestInfo, providers){
        this.context = context;
        this.requestInfo = requestInfo;
        this.providers = providers;
        this.hasProducedSuggestion = false;
    }
    setRequestUuid(uuid) {
        this.requestUuid = uuid;
    }
    setNoSuggestionReasonIfNotSet(type) {
        this.noSuggestionReason ??= type;
    }
    setHasProducedSuggestion() {
        this.hasProducedSuggestion = true;
    }
}
function isSubset(set1, set2) {
    return [
        ...set1
    ].every((item)=>set2.has(item));
}
class UpdateOperation {
    constructor(request, cancellationTokenSource, promise){
        this.request = request;
        this.cancellationTokenSource = cancellationTokenSource;
        this.promise = promise;
    }
    dispose() {
        this.cancellationTokenSource.cancel();
    }
}
class InlineCompletionsState extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static createEmpty() {
        return new InlineCompletionsState([], undefined);
    }
    constructor(inlineCompletions, request){
        super();
        this.inlineCompletions = inlineCompletions;
        this.request = request;
        for (const inlineCompletion of this.inlineCompletions){
            inlineCompletion.addRef();
        }
        this._register({
            dispose: ()=>{
                for (const inlineCompletion of this.inlineCompletions){
                    inlineCompletion.removeRef();
                }
            }
        });
    }
    _findById(id) {
        return this.inlineCompletions.find((i)=>i.identity === id);
    }
    _findByHash(hash) {
        return this.inlineCompletions.find((i)=>i.hash === hash);
    }
    /**
     * Applies the edit on the state.
    */ createStateWithAppliedEdit(edit, textModel) {
        const newInlineCompletions = this.inlineCompletions.map((i)=>i.withEdit(edit, textModel)).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
        return new InlineCompletionsState(newInlineCompletions, this.request);
    }
    createStateWithAppliedResults(updatedSuggestions, request, textModel, cursorPosition, itemIdToPreserveAtTop) {
        let itemToPreserve = undefined;
        if (itemIdToPreserveAtTop) {
            const itemToPreserveCandidate = this._findById(itemIdToPreserveAtTop);
            if (itemToPreserveCandidate && itemToPreserveCandidate.canBeReused(textModel, request.position)) {
                itemToPreserve = itemToPreserveCandidate;
                const updatedItemToPreserve = updatedSuggestions.find((i)=>i.hash === itemToPreserveCandidate.hash);
                if (updatedItemToPreserve) {
                    updatedSuggestions = moveToFront(updatedItemToPreserve, updatedSuggestions);
                } else {
                    updatedSuggestions = [
                        itemToPreserveCandidate,
                        ...updatedSuggestions
                    ];
                }
            }
        }
        const preferInlineCompletions = itemToPreserve ? !itemToPreserve.isInlineEdit : updatedSuggestions.some((i)=>!i.isInlineEdit && i.isVisible(textModel, cursorPosition));
        let updatedItems = [];
        for (const i of updatedSuggestions){
            const oldItem = this._findByHash(i.hash);
            let item;
            if (oldItem && oldItem !== i) {
                item = i.withIdentity(oldItem.identity);
                i.setIsPreceeded(oldItem);
                oldItem.setEndOfLifeReason({
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Ignored,
                    userTypingDisagreed: false,
                    supersededBy: i.getSourceCompletion()
                });
            } else {
                item = i;
            }
            if (preferInlineCompletions !== item.isInlineEdit) {
                updatedItems.push(item);
            }
        }
        updatedItems.sort((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareBy"])((i)=>i.showInlineEditMenu, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["booleanComparator"]));
        updatedItems = distinctByKey(updatedItems, (i)=>i.semanticId);
        return new InlineCompletionsState(updatedItems, request);
    }
    clone() {
        return new InlineCompletionsState(this.inlineCompletions, this.request);
    }
}
/** Keeps the first item in case of duplicates. */ function distinctByKey(items, key) {
    const seen = new Set();
    return items.filter((item)=>{
        const k = key(item);
        if (seen.has(k)) {
            return false;
        }
        seen.add(k);
        return true;
    });
}
function moveToFront(item, items) {
    const index = items.indexOf(item);
    if (index > -1) {
        return [
            item,
            ...items.slice(0, index),
            ...items.slice(index + 1)
        ];
    }
    return items;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/typingSpeed.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypingInterval",
    ()=>TypingInterval
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Tracks typing speed as average milliseconds between keystrokes.
 * Higher values indicate slower typing.
 */ class TypingInterval extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    // Configuration constants
    static{
        this.MAX_SESSION_GAP_MS = 3_000;
    }
    static{
        this.MIN_SESSION_DURATION_MS = 1_000;
    }
    static{
        this.SESSION_HISTORY_LIMIT = 50;
    }
    static{
        this.TYPING_SPEED_WINDOW_MS = 300_000;
    }
    static{
        this.MIN_CHARS_FOR_RELIABLE_SPEED = 20;
    }
    /**
     * Gets the current typing interval as average milliseconds between keystrokes
     * and the number of characters involved in the computation.
     * Higher interval values indicate slower typing.
     * Returns { interval: 0, characterCount: 0 } if no typing data is available.
     */ getTypingInterval() {
        if (this._cacheInvalidated || this._cachedTypingIntervalResult === null) {
            this._cachedTypingIntervalResult = this._calculateTypingInterval();
            this._cacheInvalidated = false;
        }
        return this._cachedTypingIntervalResult;
    }
    constructor(_textModel){
        super();
        this._textModel = _textModel;
        this._typingSessions = [];
        this._currentSession = null;
        this._lastChangeTime = 0;
        this._cachedTypingIntervalResult = null;
        this._cacheInvalidated = true;
        this._register(this._textModel.onDidChangeContent((e)=>this._updateTypingSpeed(e)));
    }
    _updateTypingSpeed(change) {
        const now = Date.now();
        if (!this._isUserTyping(change)) {
            this._finalizeCurrentSession();
            return;
        }
        // If too much time has passed since last change, start a new session
        if (this._currentSession && now - this._lastChangeTime > TypingInterval.MAX_SESSION_GAP_MS) {
            this._finalizeCurrentSession();
        }
        // Start new session if none exists
        if (!this._currentSession) {
            this._currentSession = {
                startTime: now,
                endTime: now,
                characterCount: 0
            };
        }
        // Update current session
        this._currentSession.endTime = now;
        this._currentSession.characterCount += this._getActualCharacterCount(change);
        this._lastChangeTime = now;
        this._cacheInvalidated = true;
    }
    _getActualCharacterCount(change) {
        let totalChars = 0;
        for (const c of change.changes){
            // Count characters added or removed (use the larger of the two)
            totalChars += Math.max(c.text.length, c.rangeLength);
        }
        return totalChars;
    }
    _isUserTyping(change) {
        // If no detailed reasons, assume user typing
        if (!change.detailedReasons || change.detailedReasons.length === 0) {
            return false;
        }
        // Check if any of the reasons indicate actual user typing
        for (const reason of change.detailedReasons){
            if (this._isUserTypingReason(reason)) {
                return true;
            }
        }
        return false;
    }
    _isUserTypingReason(reason) {
        // Handle undo/redo - not considered user typing
        if (reason.metadata.isUndoing || reason.metadata.isRedoing) {
            return false;
        }
        // Handle different source types
        switch(reason.metadata.source){
            case 'cursor':
                {
                    // Direct user input via cursor
                    const kind = reason.metadata.kind;
                    return kind === 'type' || kind === 'compositionType' || kind === 'compositionEnd';
                }
            default:
                // All other sources (paste, suggestions, code actions, etc.) are not user typing
                return false;
        }
    }
    _finalizeCurrentSession() {
        if (!this._currentSession) {
            return;
        }
        const sessionDuration = this._currentSession.endTime - this._currentSession.startTime;
        // Only keep sessions that meet minimum duration and have actual content
        if (sessionDuration >= TypingInterval.MIN_SESSION_DURATION_MS && this._currentSession.characterCount > 0) {
            this._typingSessions.push(this._currentSession);
            // Limit session history
            if (this._typingSessions.length > TypingInterval.SESSION_HISTORY_LIMIT) {
                this._typingSessions.shift();
            }
        }
        this._currentSession = null;
    }
    _calculateTypingInterval() {
        // Finalize current session for calculation
        if (this._currentSession) {
            const tempSession = {
                ...this._currentSession
            };
            const sessionDuration = tempSession.endTime - tempSession.startTime;
            if (sessionDuration >= TypingInterval.MIN_SESSION_DURATION_MS && tempSession.characterCount > 0) {
                const allSessions = [
                    ...this._typingSessions,
                    tempSession
                ];
                return this._calculateSpeedFromSessions(allSessions);
            }
        }
        return this._calculateSpeedFromSessions(this._typingSessions);
    }
    _calculateSpeedFromSessions(sessions) {
        if (sessions.length === 0) {
            return {
                averageInterval: 0,
                characterCount: 0
            };
        }
        // Sort sessions by recency (most recent first) to ensure we get the most recent sessions
        const sortedSessions = [
            ...sessions
        ].sort((a, b)=>b.endTime - a.endTime);
        // First, try the standard window
        const cutoffTime = Date.now() - TypingInterval.TYPING_SPEED_WINDOW_MS;
        const recentSessions = sortedSessions.filter((session)=>session.endTime > cutoffTime);
        const olderSessions = sortedSessions.splice(recentSessions.length);
        let totalChars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sum"])(recentSessions.map((session)=>session.characterCount));
        // If we don't have enough characters in the standard window, expand to include older sessions
        for(let i = 0; i < olderSessions.length && totalChars < TypingInterval.MIN_CHARS_FOR_RELIABLE_SPEED; i++){
            recentSessions.push(olderSessions[i]);
            totalChars += olderSessions[i].characterCount;
        }
        const totalTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sum"])(recentSessions.map((session)=>session.endTime - session.startTime));
        if (totalTime === 0 || totalChars <= 1) {
            return {
                averageInterval: 0,
                characterCount: totalChars
            };
        }
        // Calculate average milliseconds between keystrokes
        const keystrokeIntervals = Math.max(1, totalChars - 1);
        const avgMsBetweenKeystrokes = totalTime / keystrokeIntervals;
        return {
            averageInterval: Math.round(avgMsBetweenKeystrokes),
            characterCount: totalChars
        };
    }
    dispose() {
        this._finalizeCurrentSession();
        super.dispose();
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsModel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineCompletionsModel",
    ()=>InlineCompletionsModel,
    "VersionIdChangeReason",
    ()=>VersionIdChangeReason,
    "getSecondaryEdits",
    ()=>getSecondaryEdits,
    "isSuggestionInViewport",
    ()=>isSuggestionInViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arraysFind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/equals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/accessibility/common/accessibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/commands/common/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/observableCodeEditor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$product$2f$common$2f$product$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/product/common/product.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$cursorColumns$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/cursorColumns.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/lineRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$selection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/selection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/text/textLength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages/languageConfigurationRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/model/textModelText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetController2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$animatedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/animatedValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$computeGhostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/computeGhostText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/ghostText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionsSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsSource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/provideInlineCompletions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/textModelEditSource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$codeEditorService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/codeEditorService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$inlineCompletionsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/inlineCompletionsService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$typingSpeed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/typingSpeed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/stringEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/ranges/offsetRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/uri.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$defaultAccount$2f$common$2f$defaultAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/defaultAccount/common/defaultAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/network.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/controller/common.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/derived.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableSignal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/constObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/reactions/autorun.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/observables/observableFromEvent.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
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
let InlineCompletionsModel = class InlineCompletionsModel extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    get isAcceptingPartially() {
        return this._isAcceptingPartially;
    }
    get editor() {
        return this._editor;
    }
    constructor(textModel, _selectedSuggestItem, _textModelVersionId, _positions, _debounceValue, _enabled, _isSuppressed, _editor, _instantiationService, _commandService, _languageConfigurationService, _accessibilityService, _languageFeaturesService, _codeEditorService, _inlineCompletionsService, defaultAccountService){
        super();
        this.textModel = textModel;
        this._selectedSuggestItem = _selectedSuggestItem;
        this._textModelVersionId = _textModelVersionId;
        this._positions = _positions;
        this._debounceValue = _debounceValue;
        this._enabled = _enabled;
        this._isSuppressed = _isSuppressed;
        this._editor = _editor;
        this._instantiationService = _instantiationService;
        this._commandService = _commandService;
        this._languageConfigurationService = _languageConfigurationService;
        this._accessibilityService = _accessibilityService;
        this._languageFeaturesService = _languageFeaturesService;
        this._codeEditorService = _codeEditorService;
        this._inlineCompletionsService = _inlineCompletionsService;
        this._isActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this._onlyRequestInlineEditsSignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        this._forceUpdateExplicitlySignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        this._noDelaySignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        this._fetchSpecificProviderSignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        // We use a semantic id to keep the same inline completion selected even if the provider reorders the completions.
        this._selectedInlineCompletionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, undefined);
        this.primaryPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._positions.read(reader)[0] ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](1, 1));
        this.allPositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._positions.read(reader));
        this.sku = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, undefined);
        this._isAcceptingPartially = false;
        this._appearedInsideViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this.state.read(reader);
            if (!state || !state.inlineSuggestion) {
                return false;
            }
            return isSuggestionInViewport(this._editor, state.inlineSuggestion, reader);
        });
        this._onDidAccept = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidAccept = this._onDidAccept.event;
        this._lastShownInlineCompletionInfo = undefined;
        this._lastAcceptedInlineCompletionInfo = undefined;
        this._didUndoInlineEdits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedHandleChanges"])({
            owner: this,
            changeTracker: {
                createChangeSummary: ()=>({
                        didUndo: false
                    }),
                handleChange: (ctx, changeSummary)=>{
                    changeSummary.didUndo = ctx.didChange(this._textModelVersionId) && !!ctx.change?.isUndoing;
                    return true;
                }
            }
        }, (reader, changeSummary)=>{
            const versionId = this._textModelVersionId.read(reader);
            if (versionId !== null && this._lastAcceptedInlineCompletionInfo && this._lastAcceptedInlineCompletionInfo.textModelVersionIdAfter === versionId - 1 && this._lastAcceptedInlineCompletionInfo.inlineCompletion.isInlineEdit && changeSummary.didUndo) {
                this._lastAcceptedInlineCompletionInfo = undefined;
                return true;
            }
            return false;
        });
        this._preserveCurrentCompletionReasons = new Set([
            VersionIdChangeReason.Redo,
            VersionIdChangeReason.Undo,
            VersionIdChangeReason.AcceptWord
        ]);
        this.dontRefetchSignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableSignal"])(this);
        this._fetchInlineCompletionsPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedHandleChanges"])({
            owner: this,
            changeTracker: {
                createChangeSummary: ()=>({
                        dontRefetch: false,
                        preserveCurrentCompletion: false,
                        inlineCompletionTriggerKind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Automatic,
                        onlyRequestInlineEdits: false,
                        shouldDebounce: true,
                        provider: undefined,
                        changeHint: undefined,
                        textChange: false,
                        changeReason: ''
                    }),
                handleChange: (ctx, changeSummary)=>{
                    /** @description fetch inline completions */ if (ctx.didChange(this._textModelVersionId)) {
                        if (this._preserveCurrentCompletionReasons.has(this._getReason(ctx.change))) {
                            changeSummary.preserveCurrentCompletion = true;
                        }
                        const detailedReasons = ctx.change?.detailedReasons ?? [];
                        changeSummary.changeReason = detailedReasons.length > 0 ? detailedReasons[0].getType() : '';
                        changeSummary.textChange = true;
                    } else if (ctx.didChange(this._forceUpdateExplicitlySignal)) {
                        changeSummary.preserveCurrentCompletion = true;
                        changeSummary.inlineCompletionTriggerKind = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit;
                    } else if (ctx.didChange(this.dontRefetchSignal)) {
                        changeSummary.dontRefetch = true;
                    } else if (ctx.didChange(this._onlyRequestInlineEditsSignal)) {
                        changeSummary.onlyRequestInlineEdits = true;
                    } else if (ctx.didChange(this._fetchSpecificProviderSignal)) {
                        changeSummary.provider = ctx.change?.provider;
                        changeSummary.changeHint = ctx.change?.changeHint;
                    }
                    return true;
                }
            }
        }, (reader, changeSummary)=>{
            this._source.clearOperationOnTextModelChange.read(reader); // Make sure the clear operation runs before the fetch operation
            this._noDelaySignal.read(reader);
            this.dontRefetchSignal.read(reader);
            this._onlyRequestInlineEditsSignal.read(reader);
            this._forceUpdateExplicitlySignal.read(reader);
            this._fetchSpecificProviderSignal.read(reader);
            const shouldUpdate = !this._isSuppressed() && (this._enabled.read(reader) && this._selectedSuggestItem.read(reader) || this._isActive.read(reader)) && (!this._inlineCompletionsService.isSnoozing() || changeSummary.inlineCompletionTriggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit);
            if (!shouldUpdate) {
                this._source.cancelUpdate();
                return undefined;
            }
            this._textModelVersionId.read(reader); // Refetch on text change
            const suggestWidgetInlineCompletions = this._source.suggestWidgetInlineCompletions.read(undefined);
            let suggestItem = this._selectedSuggestItem.read(reader);
            if (this._shouldShowOnSuggestConflict.read(undefined)) {
                suggestItem = undefined;
            }
            if (suggestWidgetInlineCompletions && !suggestItem) {
                this._source.seedInlineCompletionsWithSuggestWidget();
            }
            if (changeSummary.dontRefetch) {
                return Promise.resolve(true);
            }
            if (this._didUndoInlineEdits.read(reader) && changeSummary.inlineCompletionTriggerKind !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
                    this._source.clear(tx);
                });
                return undefined;
            }
            let reason = '';
            if (changeSummary.provider) {
                reason += 'providerOnDidChange';
            } else if (changeSummary.inlineCompletionTriggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit) {
                reason += 'explicit';
            }
            if (changeSummary.changeReason) {
                reason += reason.length > 0 ? `:${changeSummary.changeReason}` : changeSummary.changeReason;
            }
            const typingInterval = this._typing.getTypingInterval();
            const requestInfo = {
                editorType: this.editorType,
                startTime: Date.now(),
                languageId: this.textModel.getLanguageId(),
                reason,
                typingInterval: typingInterval.averageInterval,
                typingIntervalCharacterCount: typingInterval.characterCount,
                availableProviders: [],
                sku: this.sku.read(undefined)
            };
            let context = {
                triggerKind: changeSummary.inlineCompletionTriggerKind,
                selectedSuggestionInfo: suggestItem?.toSelectedSuggestionInfo(),
                includeInlineCompletions: !changeSummary.onlyRequestInlineEdits,
                includeInlineEdits: this._inlineEditsEnabled.read(reader),
                requestIssuedDateTime: requestInfo.startTime,
                earliestShownDateTime: requestInfo.startTime + (changeSummary.inlineCompletionTriggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit || this.inAcceptFlow.read(undefined) ? 0 : this._minShowDelay.read(undefined)),
                changeHint: changeSummary.changeHint
            };
            if (context.triggerKind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Automatic && changeSummary.textChange) {
                if (this.textModel.getAlternativeVersionId() === this._lastShownInlineCompletionInfo?.alternateTextModelVersionId) {
                    // When undoing back to a version where an inline edit/completion was shown,
                    // we want to show an inline edit (or completion) again if it was originally an inline edit (or completion).
                    context = {
                        ...context,
                        includeInlineCompletions: !this._lastShownInlineCompletionInfo.inlineCompletion.isInlineEdit,
                        includeInlineEdits: this._lastShownInlineCompletionInfo.inlineCompletion.isInlineEdit
                    };
                }
            }
            const itemToPreserveCandidate = this.selectedInlineCompletion.read(undefined) ?? this._inlineSuggestionItems.read(undefined)?.inlineEdit;
            const itemToPreserve = changeSummary.preserveCurrentCompletion || itemToPreserveCandidate?.forwardStable ? itemToPreserveCandidate : undefined;
            const userJumpedToActiveCompletion = this._jumpedToId.map((jumpedTo)=>!!jumpedTo && jumpedTo === this._inlineSuggestionItems.read(undefined)?.inlineEdit?.semanticId);
            const providers = changeSummary.provider ? {
                providers: [
                    changeSummary.provider
                ],
                label: 'single:' + changeSummary.provider.providerId?.toString()
            } : {
                providers: this._languageFeaturesService.inlineCompletionsProvider.all(this.textModel),
                label: undefined
            }; // TODO: should use inlineCompletionProviders
            const availableProviders = this.getAvailableProviders(providers.providers);
            requestInfo.availableProviders = availableProviders.map((p)=>p.providerId).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
            return this._source.fetch(availableProviders, providers.label, context, itemToPreserve?.identity, changeSummary.shouldDebounce, userJumpedToActiveCompletion, requestInfo);
        });
        this._inlineSuggestionItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this
        }, (reader)=>{
            const c = this._source.inlineCompletions.read(reader);
            if (!c) {
                return undefined;
            }
            const cursorPosition = this.primaryPosition.read(reader);
            let inlineEdit = undefined;
            const visibleCompletions = [];
            for (const completion of c.inlineCompletions){
                if (!completion.isInlineEdit) {
                    if (completion.isVisible(this.textModel, cursorPosition)) {
                        visibleCompletions.push(completion);
                    }
                } else {
                    inlineEdit = completion;
                }
            }
            if (visibleCompletions.length !== 0) {
                // Don't show the inline edit if there is a visible completion
                inlineEdit = undefined;
            }
            return {
                inlineCompletions: visibleCompletions,
                inlineEdit
            };
        });
        this._inlineCompletionItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayEqualsC"])()
        }, (reader)=>{
            const c = this._inlineSuggestionItems.read(reader);
            return c?.inlineCompletions ?? [];
        });
        this.selectedInlineCompletionIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const selectedInlineCompletionId = this._selectedInlineCompletionId.read(reader);
            const filteredCompletions = this._inlineCompletionItems.read(reader);
            const idx = this._selectedInlineCompletionId === undefined ? -1 : filteredCompletions.findIndex((v)=>v.semanticId === selectedInlineCompletionId);
            if (idx === -1) {
                // Reset the selection so that the selection does not jump back when it appears again
                this._selectedInlineCompletionId.set(undefined, undefined);
                return 0;
            }
            return idx;
        });
        this.selectedInlineCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const filteredCompletions = this._inlineCompletionItems.read(reader);
            const idx = this.selectedInlineCompletionIndex.read(reader);
            return filteredCompletions[idx];
        });
        this.activeCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayEqualsC"])()
        }, (r)=>this.selectedInlineCompletion.read(r)?.source.inlineSuggestions.commands ?? []);
        this.inlineCompletionsCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this.lastTriggerKind.read(reader) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionTriggerKind"].Explicit) {
                return this._inlineCompletionItems.read(reader).length;
            } else {
                return undefined;
            }
        });
        this._hasVisiblePeekWidgets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>this._editorObs.openedPeekWidgets.read(reader) > 0);
        this._shouldShowOnSuggestConflict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const showOnSuggestConflict = this._showOnSuggestConflict.read(reader);
            if (showOnSuggestConflict !== 'never') {
                const hasInlineCompletion = !!this.selectedInlineCompletion.read(reader);
                if (hasInlineCompletion) {
                    const item = this._selectedSuggestItem.read(reader);
                    if (!item) {
                        return false;
                    }
                    if (showOnSuggestConflict === 'whenSuggestListIsIncomplete') {
                        return item.listIncomplete;
                    }
                    return true;
                }
            }
            return false;
        });
        this.state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: (a, b)=>{
                if (!a || !b) {
                    return a === b;
                }
                if (a.kind === 'ghostText' && b.kind === 'ghostText') {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghostTextsOrReplacementsEqual"])(a.ghostTexts, b.ghostTexts) && a.inlineSuggestion === b.inlineSuggestion && a.suggestItem === b.suggestItem;
                } else if (a.kind === 'inlineEdit' && b.kind === 'inlineEdit') {
                    return a.inlineSuggestion === b.inlineSuggestion;
                }
                return false;
            }
        }, (reader)=>{
            const model = this.textModel;
            if (this._suppressInSnippetMode.read(reader) && this._isInSnippetMode.read(reader)) {
                return undefined;
            }
            const item = this._inlineSuggestionItems.read(reader);
            const inlineEditResult = item?.inlineEdit;
            if (inlineEditResult) {
                if (this._hasVisiblePeekWidgets.read(reader)) {
                    return undefined;
                }
                const cursorAtInlineEdit = this.primaryPosition.map((cursorPos)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$lineRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineRange"].fromRangeInclusive(inlineEditResult.targetRange).addMargin(1, 1).contains(cursorPos.lineNumber));
                const stringEdit = inlineEditResult.action?.kind === 'edit' ? inlineEditResult.action.stringEdit : undefined;
                const replacements = stringEdit ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].fromStringEdit(stringEdit, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelText"](this.textModel)).replacements : [];
                let nextEditUri = (item.inlineEdit?.command?.id === 'vscode.open' || item.inlineEdit?.command?.id === '_workbench.open') && // eslint-disable-next-line local/code-no-any-casts
                item.inlineEdit?.command.arguments?.length ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].from(item.inlineEdit?.command.arguments[0]) : undefined;
                if (!inlineEditResult.originalTextRef.targets(this.textModel)) {
                    nextEditUri = inlineEditResult.originalTextRef.uri;
                }
                return {
                    kind: 'inlineEdit',
                    inlineSuggestion: inlineEditResult,
                    edits: replacements,
                    cursorAtInlineEdit,
                    nextEditUri
                };
            }
            const suggestItem = this._selectedSuggestItem.read(reader);
            if (!this._shouldShowOnSuggestConflict.read(reader) && suggestItem) {
                const suggestCompletionEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(suggestItem.getSingleTextEdit(), model);
                const augmentation = this._computeAugmentation(suggestCompletionEdit, reader);
                const isSuggestionPreviewEnabled = this._suggestPreviewEnabled.read(reader);
                if (!isSuggestionPreviewEnabled && !augmentation) {
                    return undefined;
                }
                const fullEdit = augmentation?.edit ?? suggestCompletionEdit;
                const fullEditPreviewLength = augmentation ? augmentation.edit.text.length - suggestCompletionEdit.text.length : 0;
                const mode = this._suggestPreviewMode.read(reader);
                const positions = this._positions.read(reader);
                const allPotentialEdits = [
                    fullEdit,
                    ...getSecondaryEdits(this.textModel, positions, fullEdit)
                ];
                const validEditsAndGhostTexts = allPotentialEdits.map((edit, idx)=>({
                        edit,
                        ghostText: edit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$computeGhostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeGhostText"])(edit, model, mode, positions[idx], fullEditPreviewLength) : undefined
                    })).filter(({ edit, ghostText })=>edit !== undefined && ghostText !== undefined);
                const edits = validEditsAndGhostTexts.map(({ edit })=>edit);
                const ghostTexts = validEditsAndGhostTexts.map(({ ghostText })=>ghostText);
                const primaryGhostText = ghostTexts[0] ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostText"](fullEdit.range.endLineNumber, []);
                return {
                    kind: 'ghostText',
                    edits,
                    primaryGhostText,
                    ghostTexts,
                    inlineSuggestion: augmentation?.completion,
                    suggestItem
                };
            } else {
                if (!this._isActive.read(reader)) {
                    return undefined;
                }
                const inlineSuggestion = this.selectedInlineCompletion.read(reader);
                if (!inlineSuggestion) {
                    return undefined;
                }
                const replacement = inlineSuggestion.getSingleTextEdit();
                const mode = this._inlineSuggestMode.read(reader);
                const positions = this._positions.read(reader);
                const allPotentialEdits = [
                    replacement,
                    ...getSecondaryEdits(this.textModel, positions, replacement)
                ];
                const validEditsAndGhostTexts = allPotentialEdits.map((edit, idx)=>({
                        edit,
                        ghostText: edit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$computeGhostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeGhostText"])(edit, model, mode, positions[idx], 0) : undefined
                    })).filter(({ edit, ghostText })=>edit !== undefined && ghostText !== undefined);
                const edits = validEditsAndGhostTexts.map(({ edit })=>edit);
                const ghostTexts = validEditsAndGhostTexts.map(({ ghostText })=>ghostText);
                if (!ghostTexts[0]) {
                    return undefined;
                }
                return {
                    kind: 'ghostText',
                    edits,
                    primaryGhostText: ghostTexts[0],
                    ghostTexts,
                    inlineSuggestion,
                    suggestItem: undefined
                };
            }
        });
        this.status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._source.loading.read(reader)) {
                return 'loading';
            }
            const s = this.state.read(reader);
            if (s?.kind === 'ghostText') {
                return 'ghostText';
            }
            if (s?.kind === 'inlineEdit') {
                return 'inlineEdit';
            }
            return 'noSuggestion';
        });
        this.inlineCompletionState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this.state.read(reader);
            if (!s || s.kind !== 'ghostText') {
                return undefined;
            }
            if (this._editorObs.inComposition.read(reader)) {
                return undefined;
            }
            return s;
        });
        this.inlineEditState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this.state.read(reader);
            if (!s || s.kind !== 'inlineEdit') {
                return undefined;
            }
            return s;
        });
        this.inlineEditAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this.inlineEditState.read(reader);
            return !!s;
        });
        this.warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            return this.inlineCompletionState.read(reader)?.inlineSuggestion?.warning;
        });
        this.ghostTexts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghostTextsOrReplacementsEqual"]
        }, (reader)=>{
            const v = this.inlineCompletionState.read(reader);
            if (!v) {
                return undefined;
            }
            return v.ghostTexts;
        });
        this.primaryGhostText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derivedOpts"])({
            owner: this,
            equalsFn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$ghostText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghostTextOrReplacementEquals"]
        }, (reader)=>{
            const v = this.inlineCompletionState.read(reader);
            if (!v) {
                return undefined;
            }
            return v?.primaryGhostText;
        });
        this.showCollapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const state = this.state.read(reader);
            if (!state || state.kind !== 'inlineEdit') {
                return false;
            }
            if (state.inlineSuggestion.hint || state.inlineSuggestion.action?.kind === 'jumpTo') {
                return false;
            }
            const isCurrentModelVersion = state.inlineSuggestion.updatedEditModelVersion === this._textModelVersionId.read(reader);
            return (this._inlineEditsShowCollapsedEnabled.read(reader) || !isCurrentModelVersion) && this._jumpedToId.read(reader) !== state.inlineSuggestion.semanticId && !this._inAcceptFlow.read(reader);
        });
        this._tabShouldIndent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._inAcceptFlow.read(reader)) {
                return false;
            }
            function isMultiLine(range) {
                return range.startLineNumber !== range.endLineNumber;
            }
            function getNonIndentationRange(model, lineNumber) {
                const columnStart = model.getLineIndentColumn(lineNumber);
                const lastNonWsColumn = model.getLineLastNonWhitespaceColumn(lineNumber);
                const columnEnd = Math.max(lastNonWsColumn, columnStart);
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](lineNumber, columnStart, lineNumber, columnEnd);
            }
            const selections = this._editorObs.selections.read(reader);
            return selections?.some((s)=>{
                if (s.isEmpty()) {
                    return this.textModel.getLineLength(s.startLineNumber) === 0;
                } else {
                    return isMultiLine(s) || s.containsRange(getNonIndentationRange(this.textModel, s.startLineNumber));
                }
            });
        });
        this.tabShouldJumpToInlineEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            if (this._tabShouldIndent.read(reader)) {
                return false;
            }
            const s = this.inlineEditState.read(reader);
            if (!s) {
                return false;
            }
            if (s.inlineSuggestion.action?.kind === 'jumpTo') {
                return true;
            }
            if (this.showCollapsed.read(reader)) {
                return true;
            }
            if (this._inAcceptFlow.read(reader) && this._appearedInsideViewport.read(reader)) {
                return false;
            }
            return !s.cursorAtInlineEdit.read(reader);
        });
        this.tabShouldAcceptInlineEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$derived$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["derived"])(this, (reader)=>{
            const s = this.inlineEditState.read(reader);
            if (!s) {
                return false;
            }
            if (s.inlineSuggestion.action?.kind === 'jumpTo') {
                return false;
            }
            if (this.showCollapsed.read(reader)) {
                return false;
            }
            if (this._tabShouldIndent.read(reader)) {
                return false;
            }
            if (this._inAcceptFlow.read(reader) && this._appearedInsideViewport.read(reader)) {
                return true;
            }
            if (s.inlineSuggestion.targetRange.startLineNumber === this._editorObs.cursorLineNumber.read(reader)) {
                return true;
            }
            if (this._jumpedToId.read(reader) === s.inlineSuggestion.semanticId) {
                return true;
            }
            return s.cursorAtInlineEdit.read(reader);
        });
        this._jumpedToId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, undefined);
        this._inAcceptFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableValue"])(this, false);
        this.inAcceptFlow = this._inAcceptFlow;
        this._source = this._register(this._instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$inlineCompletionsSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionsSource"], this.textModel, this._textModelVersionId, this._debounceValue, this.primaryPosition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$product$2f$common$2f$product$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaultChatAgent?.completionsEnablementSetting));
        this.lastTriggerKind = this._source.inlineCompletions.map(this, (v)=>v?.request?.context.triggerKind);
        this._editorObs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(this._editor);
        const suggest = this._editorObs.getOption(134 /* EditorOption.suggest */ );
        this._suggestPreviewEnabled = suggest.map((v)=>v.preview);
        this._suggestPreviewMode = suggest.map((v)=>v.previewMode);
        const inlineSuggest = this._editorObs.getOption(71 /* EditorOption.inlineSuggest */ );
        this._inlineSuggestMode = inlineSuggest.map((v)=>v.mode);
        this._suppressedInlineCompletionGroupIds = inlineSuggest.map((v)=>new Set(v.experimental.suppressInlineSuggestions.split(',')));
        this._inlineEditsEnabled = inlineSuggest.map((v)=>!!v.edits.enabled);
        this._inlineEditsShowCollapsedEnabled = inlineSuggest.map((s)=>s.edits.showCollapsed);
        this._triggerCommandOnProviderChange = inlineSuggest.map((s)=>s.triggerCommandOnProviderChange);
        this._minShowDelay = inlineSuggest.map((s)=>s.minShowDelay);
        this._showOnSuggestConflict = inlineSuggest.map((s)=>s.experimental.showOnSuggestConflict);
        this._suppressInSnippetMode = inlineSuggest.map((s)=>s.suppressInSnippetMode);
        const snippetController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetController2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetController2"].get(this._editor);
        this._isInSnippetMode = snippetController?.isInSnippetObservable ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(false);
        defaultAccountService.getDefaultAccount().then(createDisposableCb((account)=>this.sku.set(skuFromAccount(account), undefined), this._store));
        this._register(defaultAccountService.onDidChangeDefaultAccount((account)=>this.sku.set(skuFromAccount(account), undefined)));
        this._typing = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$typingSpeed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypingInterval"](this.textModel));
        this._register(this._inlineCompletionsService.onDidChangeIsSnoozing((isSnoozing)=>{
            if (isSnoozing) {
                this.stop();
            }
        }));
        {
            const isNotebook = this.textModel.uri.scheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Schemas"].vscodeNotebookCell;
            const [diffEditor] = this._codeEditorService.listDiffEditors().filter((d)=>d.getOriginalEditor().getId() === this._editor.getId() || d.getModifiedEditor().getId() === this._editor.getId());
            this.isInDiffEditor = !!diffEditor;
            this.editorType = isNotebook ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].Notebook : this.isInDiffEditor ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].DiffEditor : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$provideInlineCompletions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEditorType"].TextEditor;
        }
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recomputeInitiallyAndOnChange"])(this.state, (s)=>{
            if (s && s.inlineSuggestion) {
                this._inlineCompletionsService.reportNewCompletion(s.inlineSuggestion.requestUuid);
            }
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recomputeInitiallyAndOnChange"])(this._fetchInlineCompletionsPromise));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            this._editorObs.versionId.read(reader);
            this._inAcceptFlow.set(false, undefined);
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const jumpToReset = this.state.map((s, reader)=>!s || s.kind === 'inlineEdit' && !s.cursorAtInlineEdit.read(reader)).read(reader);
            if (jumpToReset) {
                this._jumpedToId.set(undefined, undefined);
            }
        }));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const inlineSuggestion = this.state.map((s)=>s?.inlineSuggestion).read(reader);
            if (inlineSuggestion) {
                inlineSuggestion.addPerformanceMarker('activeSuggestion');
            }
        }));
        const inlineEditSemanticId = this.inlineEditState.map((s)=>s?.inlineSuggestion.semanticId);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const id = inlineEditSemanticId.read(reader);
            if (id) {
                this._editor.pushUndoStop();
                this._lastShownInlineCompletionInfo = {
                    alternateTextModelVersionId: this.textModel.getAlternativeVersionId(),
                    inlineCompletion: this.state.get().inlineSuggestion
                };
            }
        }));
        // TODO: should use getAvailableProviders and update on _suppressedInlineCompletionGroupIds change
        const inlineCompletionProviders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this._languageFeaturesService.inlineCompletionsProvider.onDidChange, ()=>this._languageFeaturesService.inlineCompletionsProvider.all(textModel));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapObservableArrayCached"])(this, inlineCompletionProviders, (provider, store)=>{
            if (!provider.onDidChangeInlineCompletions) {
                return;
            }
            store.add(provider.onDidChangeInlineCompletions((changeHint)=>{
                if (!this._enabled.get()) {
                    return;
                }
                // Only update the active editor
                const activeEditor = this._codeEditorService.getFocusedCodeEditor() || this._codeEditorService.getActiveCodeEditor();
                if (activeEditor !== this._editor) {
                    return;
                }
                if (this._triggerCommandOnProviderChange.get()) {
                    // TODO@hediet remove this and always do the else branch.
                    this.trigger(undefined, {
                        onlyFetchInlineEdits: true
                    });
                    return;
                }
                // If there is an active suggestion from a different provider, we ignore the update
                const activeState = this.state.get();
                if (activeState && (activeState.inlineSuggestion || activeState.edits) && activeState.inlineSuggestion?.source.provider !== provider) {
                    return;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
                    this._fetchSpecificProviderSignal.trigger(tx, {
                        provider,
                        changeHint: changeHint ?? undefined
                    });
                    this.trigger(tx);
                });
            }));
        }).recomputeInitiallyAndOnChange(this._store);
        this._didUndoInlineEdits.recomputeInitiallyAndOnChange(this._store);
    }
    getIndentationInfo(reader) {
        let startsWithIndentation = false;
        let startsWithIndentationLessThanTabSize = true;
        const ghostText = this?.primaryGhostText.read(reader);
        if (!!this?._selectedSuggestItem && ghostText && ghostText.parts.length > 0) {
            const { column, lines } = ghostText.parts[0];
            const firstLine = lines[0].line;
            const indentationEndColumn = this.textModel.getLineIndentColumn(ghostText.lineNumber);
            const inIndentation = column <= indentationEndColumn;
            if (inIndentation) {
                let firstNonWsIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firstNonWhitespaceIndex"])(firstLine);
                if (firstNonWsIdx === -1) {
                    firstNonWsIdx = firstLine.length - 1;
                }
                startsWithIndentation = firstNonWsIdx > 0;
                const tabSize = this.textModel.getOptions().tabSize;
                const visibleColumnIndentation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$cursorColumns$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CursorColumns"].visibleColumnFromColumn(firstLine, firstNonWsIdx + 1, tabSize);
                startsWithIndentationLessThanTabSize = visibleColumnIndentation < tabSize;
            }
        }
        return {
            startsWithIndentation,
            startsWithIndentationLessThanTabSize
        };
    }
    _getReason(e) {
        if (e?.isUndoing) {
            return VersionIdChangeReason.Undo;
        }
        if (e?.isRedoing) {
            return VersionIdChangeReason.Redo;
        }
        if (this.isAcceptingPartially) {
            return VersionIdChangeReason.AcceptWord;
        }
        return VersionIdChangeReason.Other;
    }
    // TODO: This is not an ideal implementation of excludesGroupIds, however as this is currently still behind proposed API
    // and due to the time constraints, we are using a simplified approach
    getAvailableProviders(providers) {
        const suppressedProviderGroupIds = this._suppressedInlineCompletionGroupIds.get();
        const unsuppressedProviders = providers.filter((provider)=>!(provider.groupId && suppressedProviderGroupIds.has(provider.groupId)));
        const excludedGroupIds = new Set();
        for (const provider of unsuppressedProviders){
            provider.excludesGroupIds?.forEach((p)=>excludedGroupIds.add(p));
        }
        const availableProviders = [];
        for (const provider of unsuppressedProviders){
            if (provider.groupId && excludedGroupIds.has(provider.groupId)) {
                continue;
            }
            availableProviders.push(provider);
        }
        return availableProviders;
    }
    async trigger(tx, options = {}) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtransaction"])(tx, (tx)=>{
            if (options.onlyFetchInlineEdits) {
                this._onlyRequestInlineEditsSignal.trigger(tx);
            }
            if (options.noDelay) {
                this._noDelaySignal.trigger(tx);
            }
            this._isActive.set(true, tx);
            if (options.explicit) {
                this._inAcceptFlow.set(true, tx);
                this._forceUpdateExplicitlySignal.trigger(tx);
            }
            if (options.provider) {
                this._fetchSpecificProviderSignal.trigger(tx, {
                    provider: options.provider,
                    changeHint: options.changeHint
                });
            }
        });
        await this._fetchInlineCompletionsPromise.get();
    }
    async triggerExplicitly(tx, onlyFetchInlineEdits = false) {
        return this.trigger(tx, {
            onlyFetchInlineEdits,
            explicit: true
        });
    }
    stop(stopReason = 'automatic', tx) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtransaction"])(tx, (tx)=>{
            if (stopReason === 'explicitCancel') {
                const inlineCompletion = this.state.get()?.inlineSuggestion;
                if (inlineCompletion) {
                    inlineCompletion.reportEndOfLife({
                        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Rejected
                    });
                }
            }
            this._isActive.set(false, tx);
            this._source.clear(tx);
        });
    }
    _computeAugmentation(suggestCompletion, reader) {
        const model = this.textModel;
        const suggestWidgetInlineCompletions = this._source.suggestWidgetInlineCompletions.read(reader);
        const candidateInlineCompletions = suggestWidgetInlineCompletions ? suggestWidgetInlineCompletions.inlineCompletions.filter((c)=>!c.isInlineEdit) : [
            this.selectedInlineCompletion.read(reader)
        ].filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
        const augmentedCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapFindFirst"])(candidateInlineCompletions, (completion)=>{
            let r = completion.getSingleTextEdit();
            r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(r, model, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(r.range.getStartPosition(), suggestCompletion.range.getEndPosition()));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextEditAugments"])(r, suggestCompletion) ? {
                completion,
                edit: r
            } : undefined;
        });
        return augmentedCompletion;
    }
    async _deltaSelectedInlineCompletionIndex(delta) {
        await this.triggerExplicitly();
        const completions = this._inlineCompletionItems.get() || [];
        if (completions.length > 0) {
            const newIdx = (this.selectedInlineCompletionIndex.get() + delta + completions.length) % completions.length;
            this._selectedInlineCompletionId.set(completions[newIdx].semanticId, undefined);
        } else {
            this._selectedInlineCompletionId.set(undefined, undefined);
        }
    }
    async next() {
        await this._deltaSelectedInlineCompletionIndex(1);
    }
    async previous() {
        await this._deltaSelectedInlineCompletionIndex(-1);
    }
    _getMetadata(completion, languageId, type = undefined) {
        if (type) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditSources"].inlineCompletionPartialAccept({
                nes: completion.isInlineEdit,
                requestUuid: completion.requestUuid,
                providerId: completion.source.provider.providerId,
                languageId,
                type,
                correlationId: completion.getSourceCompletion().correlationId
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$textModelEditSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditSources"].inlineCompletionAccept({
                nes: completion.isInlineEdit,
                requestUuid: completion.requestUuid,
                correlationId: completion.getSourceCompletion().correlationId,
                providerId: completion.source.provider.providerId,
                languageId
            });
        }
    }
    async accept(editor = this._editor, alternativeAction = false) {
        if (editor.getModel() !== this.textModel) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]();
        }
        let completion;
        let isNextEditUri = false;
        const state = this.state.get();
        if (state?.kind === 'ghostText') {
            if (!state || state.primaryGhostText.isEmpty() || !state.inlineSuggestion) {
                return;
            }
            completion = state.inlineSuggestion;
        } else if (state?.kind === 'inlineEdit') {
            completion = state.inlineSuggestion;
            isNextEditUri = !!state.nextEditUri;
        } else {
            return;
        }
        // Make sure the completion list will not be disposed before the text change is sent.
        completion.addRef();
        try {
            let followUpTrigger = false;
            editor.pushUndoStop();
            if (!completion.originalTextRef.targets(this.textModel)) {
                // The edit targets a different document, open it and transplant the completion
                const targetEditor = await this._codeEditorService.openCodeEditor({
                    resource: completion.originalTextRef.uri
                }, this._editor);
                if (targetEditor) {
                    const controller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$controller$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInlineCompletionsController"])(targetEditor);
                    const m = controller?.model.get();
                    targetEditor.focus();
                    m?.transplantCompletion(completion);
                    targetEditor.revealLineInCenter(completion.targetRange.startLineNumber);
                }
            } else if (isNextEditUri) {
            // Do nothing
            } else if (completion.action?.kind === 'edit') {
                const action = completion.action;
                if (alternativeAction && action.alternativeAction) {
                    followUpTrigger = true;
                    const altCommand = action.alternativeAction.command;
                    await this._commandService.executeCommand(altCommand.id, ...altCommand.arguments || []).then(undefined, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedExternalError"]);
                } else if (action.snippetInfo) {
                    const mainEdit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"].delete(action.textReplacement.range);
                    const additionalEdits = completion.additionalTextEdits.map((e)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(e.range), e.text ?? ''));
                    const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].fromParallelReplacementsUnsorted([
                        mainEdit,
                        ...additionalEdits
                    ]);
                    editor.edit(edit, this._getMetadata(completion, this.textModel.getLanguageId()));
                    editor.setPosition(action.snippetInfo.range.getStartPosition(), 'inlineCompletionAccept');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetController2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetController2"].get(editor)?.insert(action.snippetInfo.snippet, {
                        undoStopBefore: false
                    });
                } else {
                    const edits = state.edits;
                    // The cursor should move to the end of the edit, not the end of the range provided by the extension
                    // Inline Edit diffs (human readable) the suggestion from the extension so it already removes common suffix/prefix
                    // Inline Completions does diff the suggestion so it may contain common suffix
                    let minimalEdits = edits;
                    if (state.kind === 'ghostText') {
                        minimalEdits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTextReplacementCommonSuffixPrefix"])(edits, this.textModel);
                    }
                    const selections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPositionsAfterApplying"])(minimalEdits).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$selection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selection"].fromPositions(p));
                    const additionalEdits = completion.additionalTextEdits.map((e)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].lift(e.range), e.text ?? ''));
                    const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].fromParallelReplacementsUnsorted([
                        ...edits,
                        ...additionalEdits
                    ]);
                    editor.edit(edit, this._getMetadata(completion, this.textModel.getLanguageId()));
                    if (completion.hint === undefined) {
                        // do not move the cursor when the completion is displayed in a different location
                        editor.setSelections(state.kind === 'inlineEdit' ? selections.slice(-1) : selections, 'inlineCompletionAccept');
                    }
                    if (state.kind === 'inlineEdit' && !this._accessibilityService.isMotionReduced()) {
                        const editRanges = edit.getNewRanges();
                        const dec = this._store.add(new FadeoutDecoration(editor, editRanges, ()=>{
                            this._store.delete(dec);
                        }));
                    }
                }
            }
            this._onDidAccept.fire();
            // Reset before invoking the command, as the command might cause a follow up trigger (which we don't want to reset).
            this.stop();
            if (completion.command) {
                await this._commandService.executeCommand(completion.command.id, ...completion.command.arguments || []).then(undefined, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onUnexpectedExternalError"]);
            }
            // TODO: how can we make alternative actions to retrigger?
            if (followUpTrigger) {
                this.trigger(undefined);
            }
            completion.reportEndOfLife({
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Accepted,
                alternativeAction
            });
        } finally{
            completion.removeRef();
            this._inAcceptFlow.set(true, undefined);
            this._lastAcceptedInlineCompletionInfo = {
                textModelVersionIdAfter: this.textModel.getVersionId(),
                inlineCompletion: completion
            };
        }
    }
    async acceptNextWord() {
        await this._acceptNext(this._editor, 'word', (pos, text)=>{
            const langId = this.textModel.getLanguageIdAtPosition(pos.lineNumber, pos.column);
            const config = this._languageConfigurationService.getLanguageConfiguration(langId);
            const wordRegExp = new RegExp(config.wordDefinition.source, config.wordDefinition.flags.replace('g', ''));
            const m1 = text.match(wordRegExp);
            let acceptUntilIndexExclusive = 0;
            if (m1 && m1.index !== undefined) {
                if (m1.index === 0) {
                    acceptUntilIndexExclusive = m1[0].length;
                } else {
                    acceptUntilIndexExclusive = m1.index;
                }
            } else {
                acceptUntilIndexExclusive = text.length;
            }
            const wsRegExp = /\s+/g;
            const m2 = wsRegExp.exec(text);
            if (m2 && m2.index !== undefined) {
                if (m2.index + m2[0].length < acceptUntilIndexExclusive) {
                    acceptUntilIndexExclusive = m2.index + m2[0].length;
                }
            }
            return acceptUntilIndexExclusive;
        }, 0 /* PartialAcceptTriggerKind.Word */ );
    }
    async acceptNextLine() {
        await this._acceptNext(this._editor, 'line', (pos, text)=>{
            const m = text.match(/\n/);
            if (m && m.index !== undefined) {
                return m.index + 1;
            }
            return text.length;
        }, 1 /* PartialAcceptTriggerKind.Line */ );
    }
    async _acceptNext(editor, type, getAcceptUntilIndex, kind) {
        if (editor.getModel() !== this.textModel) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BugIndicatingError"]();
        }
        const state = this.inlineCompletionState.get();
        if (!state || state.primaryGhostText.isEmpty() || !state.inlineSuggestion) {
            return;
        }
        const ghostText = state.primaryGhostText;
        const completion = state.inlineSuggestion;
        if (completion.snippetInfo) {
            // not in WYSIWYG mode, partial commit might change completion, thus it is not supported
            await this.accept(editor);
            return;
        }
        const firstPart = ghostText.parts[0];
        const ghostTextPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"](ghostText.lineNumber, firstPart.column);
        const ghostTextVal = firstPart.text;
        const acceptUntilIndexExclusive = getAcceptUntilIndex(ghostTextPos, ghostTextVal);
        if (acceptUntilIndexExclusive === ghostTextVal.length && ghostText.parts.length === 1) {
            this.accept(editor);
            return;
        }
        const partialGhostTextVal = ghostTextVal.substring(0, acceptUntilIndexExclusive);
        const positions = this._positions.get();
        const cursorPosition = positions[0];
        // Executing the edit might free the completion, so we have to hold a reference on it.
        completion.addRef();
        try {
            this._isAcceptingPartially = true;
            try {
                editor.pushUndoStop();
                const replaceRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(cursorPosition, ghostTextPos);
                const newText = editor.getModel().getValueInRange(replaceRange) + partialGhostTextVal;
                const primaryEdit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](replaceRange, newText);
                const edits = [
                    primaryEdit,
                    ...getSecondaryEdits(this.textModel, positions, primaryEdit)
                ].filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
                const selections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEndPositionsAfterApplying"])(edits).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$selection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selection"].fromPositions(p));
                editor.edit(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].fromParallelReplacementsUnsorted(edits), this._getMetadata(completion, this.textModel.getLanguageId(), type));
                editor.setSelections(selections, 'inlineCompletionPartialAccept');
                editor.revealPositionInCenterIfOutsideViewport(editor.getPosition(), 0 /* ScrollType.Smooth */ );
            } finally{
                this._isAcceptingPartially = false;
            }
            const acceptedRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(completion.editRange.getStartPosition(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$text$2f$textLength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextLength"].ofText(partialGhostTextVal).addToPosition(ghostTextPos));
            // This assumes that the inline completion and the model use the same EOL style.
            const text = editor.getModel().getValueInRange(acceptedRange, 1 /* EndOfLinePreference.LF */ );
            const acceptedLength = text.length;
            completion.reportPartialAccept(acceptedLength, {
                kind,
                acceptedLength: acceptedLength
            }, {
                characters: acceptUntilIndexExclusive,
                ratio: acceptUntilIndexExclusive / ghostTextVal.length,
                count: 1
            });
        } finally{
            completion.removeRef();
        }
    }
    handleSuggestAccepted(item) {
        const itemEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(item.getSingleTextEdit(), this.textModel);
        const augmentedCompletion = this._computeAugmentation(itemEdit, undefined);
        if (!augmentedCompletion) {
            return;
        }
        // This assumes that the inline completion and the model use the same EOL style.
        const alreadyAcceptedLength = this.textModel.getValueInRange(augmentedCompletion.completion.editRange, 1 /* EndOfLinePreference.LF */ ).length;
        const acceptedLength = alreadyAcceptedLength + itemEdit.text.length;
        augmentedCompletion.completion.reportPartialAccept(itemEdit.text.length, {
            kind: 2 /* PartialAcceptTriggerKind.Suggest */ ,
            acceptedLength
        }, {
            characters: itemEdit.text.length,
            count: 1,
            ratio: 1
        });
    }
    extractReproSample() {
        const value = this.textModel.getValue();
        const item = this.state.get()?.inlineSuggestion;
        return {
            documentValue: value,
            inlineCompletion: item?.getSourceCompletion()
        };
    }
    jump() {
        const s = this.inlineEditState.get();
        if (!s) {
            return;
        }
        const suggestion = s.inlineSuggestion;
        if (!suggestion.originalTextRef.targets(this.textModel)) {
            this.accept(this._editor);
            return;
        }
        suggestion.addRef();
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
                if (suggestion.action?.kind === 'jumpTo') {
                    this.stop(undefined, tx);
                    suggestion.reportEndOfLife({
                        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineCompletionEndOfLifeReasonKind"].Accepted,
                        alternativeAction: false
                    });
                }
                this._jumpedToId.set(s.inlineSuggestion.semanticId, tx);
                this.dontRefetchSignal.trigger(tx);
                const targetRange = s.inlineSuggestion.targetRange;
                const targetPosition = targetRange.getStartPosition();
                this._editor.setPosition(targetPosition, 'inlineCompletions.jump');
                // TODO: consider using view information to reveal it
                const isSingleLineChange = targetRange.isSingleLine() && (s.inlineSuggestion.hint || s.inlineSuggestion.action?.kind === 'edit' && !s.inlineSuggestion.action.textReplacement.text.includes('\n'));
                if (isSingleLineChange || s.inlineSuggestion.action?.kind === 'jumpTo') {
                    this._editor.revealPosition(targetPosition, 0 /* ScrollType.Smooth */ );
                } else {
                    const revealRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](targetRange.startLineNumber - 1, 1, targetRange.endLineNumber + 1, 1);
                    this._editor.revealRange(revealRange, 0 /* ScrollType.Smooth */ );
                }
                s.inlineSuggestion.identity.setJumpTo(tx);
                this._editor.focus();
            });
        } finally{
            suggestion.removeRef();
        }
    }
    async handleInlineSuggestionShown(inlineCompletion, viewKind, viewData, timeWhenShown) {
        await inlineCompletion.reportInlineEditShown(this._commandService, viewKind, viewData, this.textModel, timeWhenShown);
    }
    /**
     * Transplants an inline completion from another model to this one.
     * Used for cross-file inline edits.
     */ transplantCompletion(item) {
        // No explicit addRef needed: `seedWithCompletion` creates a new `InlineCompletionsState`
        // which calls `addRef` on every item it holds and pairs it with `removeRef` in dispose.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transaction"])((tx)=>{
            this._source.seedWithCompletion(item, tx);
            this._isActive.set(true, tx);
            this._inAcceptFlow.set(true, tx);
            this.dontRefetchSignal.trigger(tx);
        });
    }
};
InlineCompletionsModel = __decorate([
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"]),
    __param(10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2f$languageConfigurationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageConfigurationService"]),
    __param(11, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$accessibility$2f$common$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAccessibilityService"]),
    __param(12, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(13, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$codeEditorService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICodeEditorService"]),
    __param(14, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$inlineCompletionsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInlineCompletionsService"]),
    __param(15, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$defaultAccount$2f$common$2f$defaultAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IDefaultAccountService"])
], InlineCompletionsModel);
var VersionIdChangeReason;
(function(VersionIdChangeReason) {
    VersionIdChangeReason[VersionIdChangeReason["Undo"] = 0] = "Undo";
    VersionIdChangeReason[VersionIdChangeReason["Redo"] = 1] = "Redo";
    VersionIdChangeReason[VersionIdChangeReason["AcceptWord"] = 2] = "AcceptWord";
    VersionIdChangeReason[VersionIdChangeReason["Other"] = 3] = "Other";
})(VersionIdChangeReason || (VersionIdChangeReason = {}));
function getSecondaryEdits(textModel, positions, primaryTextRepl) {
    if (positions.length === 1) {
        // No secondary cursor positions
        return [];
    }
    const text = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$model$2f$textModelText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextModelText"](textModel);
    const textTransformer = text.getTransformer();
    const primaryOffset = textTransformer.getOffset(positions[0]);
    const secondaryOffsets = positions.slice(1).map((pos)=>textTransformer.getOffset(pos));
    primaryTextRepl = primaryTextRepl.removeCommonPrefixAndSuffix(text);
    const primaryStringRepl = textTransformer.getStringReplacement(primaryTextRepl);
    const deltaFromOffsetToRangeStart = primaryStringRepl.replaceRange.start - primaryOffset;
    const primaryContextRange = primaryStringRepl.replaceRange.join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].emptyAt(primaryOffset));
    const primaryContextValue = text.getValueOfOffsetRange(primaryContextRange);
    const replacements = secondaryOffsets.map((secondaryOffset)=>{
        const newRangeStart = secondaryOffset + deltaFromOffsetToRangeStart;
        const newRangeEnd = newRangeStart + primaryStringRepl.replaceRange.length;
        const range = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"](newRangeStart, newRangeEnd);
        const contextRange = range.join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$ranges$2f$offsetRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OffsetRange"].emptyAt(secondaryOffset));
        const contextValue = text.getValueOfOffsetRange(contextRange);
        if (contextValue !== primaryContextValue) {
            return undefined;
        }
        const stringRepl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$stringEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringReplacement"](range, primaryStringRepl.newText);
        const repl = textTransformer.getTextReplacement(stringRepl);
        return repl;
    }).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"]);
    return replacements;
}
class FadeoutDecoration extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(editor, ranges, onDispose){
        super();
        if (onDispose) {
            this._register({
                dispose: ()=>onDispose()
            });
        }
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(editor).setDecorations((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$constObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constObservable"])(ranges.map((range)=>({
                range: range,
                options: {
                    description: 'animation',
                    className: 'edits-fadeout-decoration',
                    zIndex: 1
                }
            })))));
        const val = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$animatedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObservableAnimatedValue"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$animatedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedValue"].startNow(1, 0, 1000, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$animatedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeOutCubic"]));
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$reactions$2f$autorun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autorun"])((reader)=>{
            const opacity = val.getValue(reader);
            editor.getContainerDomNode().style.setProperty('--animation-opacity', opacity.toString());
            if (val.isFinished(reader)) {
                this.dispose();
            }
        }));
    }
}
function isSuggestionInViewport(editor, suggestion, reader = undefined) {
    const targetRange = suggestion.targetRange;
    // TODO make getVisibleRanges reactive!
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$observableCodeEditor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableCodeEditor"])(editor).scrollTop.read(reader);
    const visibleRanges = editor.getVisibleRanges();
    if (visibleRanges.length < 1) {
        return false;
    }
    const viewportRange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"](visibleRanges[0].startLineNumber, visibleRanges[0].startColumn, visibleRanges[visibleRanges.length - 1].endLineNumber, visibleRanges[visibleRanges.length - 1].endColumn);
    return viewportRange.containsRange(targetRange);
}
function skuFromAccount(account) {
    if (account?.entitlementsData?.access_type_sku && account?.entitlementsData?.copilot_plan) {
        return {
            type: account.entitlementsData.access_type_sku,
            plan: account.entitlementsData.copilot_plan
        };
    }
    return undefined;
}
class DisposableCallback {
    constructor(cb){
        this.handler = (val)=>{
            return this._cb?.(val);
        };
        this._cb = cb;
    }
    dispose() {
        this._cb = undefined;
    }
}
function createDisposableCb(cb, store) {
    const dcb = new DisposableCallback(cb);
    store.add(dcb);
    return dcb.handler;
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/suggestWidgetAdapter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObservableSuggestWidgetAdapter",
    ()=>ObservableSuggestWidgetAdapter,
    "SuggestItemInfo",
    ()=>SuggestItemInfo,
    "SuggestWidgetAdaptor",
    ()=>SuggestWidgetAdaptor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arraysFind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/position.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/edits/textEdit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/model/singleTextEditHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetSession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetSession.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$suggest$2f$browser$2f$suggestController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/suggest/browser/suggestController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/observableInternal/index.js [app-client] (ecmascript) <locals>");
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class SuggestWidgetAdaptor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    get selectedItem() {
        return this._currentSuggestItemInfo;
    }
    constructor(editor, suggestControllerPreselector, onWillAccept){
        super();
        this.editor = editor;
        this.suggestControllerPreselector = suggestControllerPreselector;
        this.onWillAccept = onWillAccept;
        this.isSuggestWidgetVisible = false;
        this.isShiftKeyPressed = false;
        this._isActive = false;
        this._currentSuggestItemInfo = undefined;
        this._onDidSelectedItemChange = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]());
        this.onDidSelectedItemChange = this._onDidSelectedItemChange.event;
        // See the command acceptAlternativeSelectedSuggestion that is bound to shift+tab
        this._register(editor.onKeyDown((e)=>{
            if (e.shiftKey && !this.isShiftKeyPressed) {
                this.isShiftKeyPressed = true;
                this.update(this._isActive);
            }
        }));
        this._register(editor.onKeyUp((e)=>{
            if (e.shiftKey && this.isShiftKeyPressed) {
                this.isShiftKeyPressed = false;
                this.update(this._isActive);
            }
        }));
        const suggestController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$suggest$2f$browser$2f$suggestController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestController"].get(this.editor);
        if (suggestController) {
            this._register(suggestController.registerSelector({
                priority: 100,
                select: (model, pos, suggestItems)=>{
                    const textModel = this.editor.getModel();
                    if (!textModel) {
                        // Should not happen
                        return -1;
                    }
                    const i = this.suggestControllerPreselector();
                    const itemToPreselect = i ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(i, textModel) : undefined;
                    if (!itemToPreselect) {
                        return -1;
                    }
                    const position = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].lift(pos);
                    const candidates = suggestItems.map((suggestItem, index)=>{
                        const suggestItemInfo = SuggestItemInfo.fromSuggestion(suggestController, textModel, position, suggestItem, this.isShiftKeyPressed);
                        const suggestItemTextEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextRemoveCommonPrefix"])(suggestItemInfo.getSingleTextEdit(), textModel);
                        const valid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineCompletions$2f$browser$2f$model$2f$singleTextEditHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTextEditAugments"])(itemToPreselect, suggestItemTextEdit);
                        return {
                            index,
                            valid,
                            prefixLength: suggestItemTextEdit.text.length,
                            suggestItem
                        };
                    }).filter((item)=>item && item.valid && item.prefixLength > 0);
                    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arraysFind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findFirstMax"])(candidates, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareBy"])((s)=>s.prefixLength, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberComparator"]));
                    return result ? result.index : -1;
                }
            }));
            let isBoundToSuggestWidget = false;
            const bindToSuggestWidget = ()=>{
                if (isBoundToSuggestWidget) {
                    return;
                }
                isBoundToSuggestWidget = true;
                this._register(suggestController.widget.value.onDidShow(()=>{
                    this.isSuggestWidgetVisible = true;
                    this.update(true);
                }));
                this._register(suggestController.widget.value.onDidHide(()=>{
                    this.isSuggestWidgetVisible = false;
                    this.update(false);
                }));
                this._register(suggestController.widget.value.onDidFocus(()=>{
                    this.isSuggestWidgetVisible = true;
                    this.update(true);
                }));
            };
            this._register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].once(suggestController.model.onDidTrigger)((e)=>{
                bindToSuggestWidget();
            }));
            this._register(suggestController.onWillInsertSuggestItem((e)=>{
                const position = this.editor.getPosition();
                const model = this.editor.getModel();
                if (!position || !model) {
                    return undefined;
                }
                const suggestItemInfo = SuggestItemInfo.fromSuggestion(suggestController, model, position, e.item, this.isShiftKeyPressed);
                this.onWillAccept(suggestItemInfo);
            }));
        }
        this.update(this._isActive);
    }
    update(newActive) {
        const newInlineCompletion = this.getSuggestItemInfo();
        if (this._isActive !== newActive || !suggestItemInfoEquals(this._currentSuggestItemInfo, newInlineCompletion)) {
            this._isActive = newActive;
            this._currentSuggestItemInfo = newInlineCompletion;
            this._onDidSelectedItemChange.fire();
        }
    }
    getSuggestItemInfo() {
        const suggestController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$suggest$2f$browser$2f$suggestController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestController"].get(this.editor);
        if (!suggestController || !this.isSuggestWidgetVisible) {
            return undefined;
        }
        const focusedItem = suggestController.widget.value.getFocusedItem();
        const position = this.editor.getPosition();
        const model = this.editor.getModel();
        if (!focusedItem || !position || !model) {
            return undefined;
        }
        return SuggestItemInfo.fromSuggestion(suggestController, model, position, focusedItem.item, this.isShiftKeyPressed);
    }
    stopForceRenderingAbove() {
        const suggestController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$suggest$2f$browser$2f$suggestController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestController"].get(this.editor);
        suggestController?.stopForceRenderingAbove();
    }
    forceRenderingAbove() {
        const suggestController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$suggest$2f$browser$2f$suggestController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestController"].get(this.editor);
        suggestController?.forceRenderingAbove();
    }
}
class SuggestItemInfo {
    static fromSuggestion(suggestController, model, position, item, toggleMode) {
        let { insertText } = item.completion;
        let isSnippetText = false;
        if (item.completion.insertTextRules & 4 /* CompletionItemInsertTextRule.InsertAsSnippet */ ) {
            const snippet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetParser"]().parse(insertText);
            if (snippet.children.length < 100) {
                // Adjust whitespace is expensive.
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetSession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetSession"].adjustWhitespace(model, position, true, snippet);
            }
            insertText = snippet.toString();
            isSnippetText = true;
        }
        const info = suggestController.getOverwriteInfo(item, toggleMode);
        return new SuggestItemInfo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(position.delta(0, -info.overwriteBefore), position.delta(0, Math.max(info.overwriteAfter, 0))), insertText, item.completion.kind, isSnippetText, item.container.incomplete ?? false);
    }
    constructor(range, insertText, completionItemKind, isSnippetText, listIncomplete){
        this.range = range;
        this.insertText = insertText;
        this.completionItemKind = completionItemKind;
        this.isSnippetText = isSnippetText;
        this.listIncomplete = listIncomplete;
    }
    equals(other) {
        return this.range.equalsRange(other.range) && this.insertText === other.insertText && this.completionItemKind === other.completionItemKind && this.isSnippetText === other.isSnippetText;
    }
    toSelectedSuggestionInfo() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectedSuggestionInfo"](this.range, this.insertText, this.completionItemKind, this.isSnippetText);
    }
    getSingleTextEdit() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$edits$2f$textEdit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReplacement"](this.range, this.insertText);
    }
}
function suggestItemInfoEquals(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    return a.equals(b);
}
class ObservableSuggestWidgetAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_editorObs, _handleSuggestAccepted, _suggestControllerPreselector){
        super();
        this._editorObs = _editorObs;
        this._handleSuggestAccepted = _handleSuggestAccepted;
        this._suggestControllerPreselector = _suggestControllerPreselector;
        this._suggestWidgetAdaptor = this._register(new SuggestWidgetAdaptor(this._editorObs.editor, ()=>{
            this._editorObs.forceUpdate();
            return this._suggestControllerPreselector();
        }, (item)=>this._editorObs.forceUpdate((_tx)=>{
                /** @description InlineCompletionsController.handleSuggestAccepted */ this._handleSuggestAccepted(item);
            })));
        this.selectedItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$observableInternal$2f$observables$2f$observableFromEvent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observableFromEvent"])(this, (cb)=>this._suggestWidgetAdaptor.onDidSelectedItemChange(()=>{
                this._editorObs.forceUpdate((_tx)=>cb(undefined));
            }), ()=>this._suggestWidgetAdaptor.selectedItem);
    }
    stopForceRenderingAbove() {
        this._suggestWidgetAdaptor.stopForceRenderingAbove();
    }
    forceRenderingAbove() {
        this._suggestWidgetAdaptor.forceRenderingAbove();
    }
}
;
}),
]);

//# sourceMappingURL=a9bf9_monaco-editor_esm_vs_editor_contrib_inlineCompletions_browser_model_ea8a4e9d._.js.map