(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/pathCompletion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PathCompletionParticipant",
    ()=>PathCompletionParticipant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/resources.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class PathCompletionParticipant {
    constructor(readDirectory){
        this.readDirectory = readDirectory;
        this.literalCompletions = [];
        this.importCompletions = [];
    }
    onCssURILiteralValue(context) {
        this.literalCompletions.push(context);
    }
    onCssImportPath(context) {
        this.importCompletions.push(context);
    }
    async computeCompletions(document, documentContext) {
        const result = {
            items: [],
            isIncomplete: false
        };
        for (const literalCompletion of this.literalCompletions){
            const uriValue = literalCompletion.uriValue;
            const fullValue = stripQuotes(uriValue);
            if (fullValue === '.' || fullValue === '..') {
                result.isIncomplete = true;
            } else {
                const items = await this.providePathSuggestions(uriValue, literalCompletion.position, literalCompletion.range, document, documentContext);
                for (let item of items){
                    result.items.push(item);
                }
            }
        }
        for (const importCompletion of this.importCompletions){
            const pathValue = importCompletion.pathValue;
            const fullValue = stripQuotes(pathValue);
            if (fullValue === '.' || fullValue === '..') {
                result.isIncomplete = true;
            } else {
                let suggestions = await this.providePathSuggestions(pathValue, importCompletion.position, importCompletion.range, document, documentContext);
                if (document.languageId === 'scss') {
                    suggestions.forEach((s)=>{
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(s.label, '_') && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endsWith"])(s.label, '.scss')) {
                            if (s.textEdit) {
                                s.textEdit.newText = s.label.slice(1, -5);
                            } else {
                                s.label = s.label.slice(1, -5);
                            }
                        }
                    });
                }
                for (let item of suggestions){
                    result.items.push(item);
                }
            }
        }
        return result;
    }
    async providePathSuggestions(pathValue, position, range, document, documentContext) {
        const fullValue = stripQuotes(pathValue);
        const isValueQuoted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(pathValue, `'`) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(pathValue, `"`);
        const valueBeforeCursor = isValueQuoted ? fullValue.slice(0, position.character - (range.start.character + 1)) : fullValue.slice(0, position.character - range.start.character);
        const currentDocUri = document.uri;
        const fullValueRange = isValueQuoted ? shiftRange(range, 1, -1) : range;
        const replaceRange = pathToReplaceRange(valueBeforeCursor, fullValue, fullValueRange);
        const valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf('/') + 1); // keep the last slash
        let parentDir = documentContext.resolveReference(valueBeforeLastSlash || '.', currentDocUri);
        if (parentDir) {
            try {
                const result = [];
                const infos = await this.readDirectory(parentDir);
                for (const [name, type] of infos){
                    // Exclude paths that start with `.`
                    if (name.charCodeAt(0) !== CharCode_dot && (type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FileType"].Directory || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(parentDir, name) !== currentDocUri)) {
                        result.push(createCompletionItem(name, type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FileType"].Directory, replaceRange));
                    }
                }
                return result;
            } catch (e) {
            // ignore
            }
        }
        return [];
    }
}
const CharCode_dot = '.'.charCodeAt(0);
function stripQuotes(fullValue) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(fullValue, `'`) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(fullValue, `"`)) {
        return fullValue.slice(1, -1);
    } else {
        return fullValue;
    }
}
function pathToReplaceRange(valueBeforeCursor, fullValue, fullValueRange) {
    let replaceRange;
    const lastIndexOfSlash = valueBeforeCursor.lastIndexOf('/');
    if (lastIndexOfSlash === -1) {
        replaceRange = fullValueRange;
    } else {
        // For cases where cursor is in the middle of attribute value, like <script src="./s|rc/test.js">
        // Find the last slash before cursor, and calculate the start of replace range from there
        const valueAfterLastSlash = fullValue.slice(lastIndexOfSlash + 1);
        const startPos = shiftPosition(fullValueRange.end, -valueAfterLastSlash.length);
        // If whitespace exists, replace until it
        const whitespaceIndex = valueAfterLastSlash.indexOf(' ');
        let endPos;
        if (whitespaceIndex !== -1) {
            endPos = shiftPosition(startPos, whitespaceIndex);
        } else {
            endPos = fullValueRange.end;
        }
        replaceRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(startPos, endPos);
    }
    return replaceRange;
}
function createCompletionItem(name, isDir, replaceRange) {
    if (isDir) {
        name = name + '/';
        return {
            label: escapePath(name),
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Folder,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(replaceRange, escapePath(name)),
            command: {
                title: 'Suggest',
                command: 'editor.action.triggerSuggest'
            }
        };
    } else {
        return {
            label: escapePath(name),
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].File,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(replaceRange, escapePath(name))
        };
    }
}
// Escape https://www.w3.org/TR/CSS1/#url
function escapePath(p) {
    return p.replace(/(\s|\(|\)|,|"|')/g, '\\$1');
}
function shiftPosition(pos, offset) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].create(pos.line, pos.character + offset);
}
function shiftRange(range, startOffset, endOffset) {
    const start = shiftPosition(range.start, startOffset);
    const end = shiftPosition(range.end, endOffset);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(start, end);
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCompletion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSCompletion",
    ()=>CSSCompletion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssSymbolScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssSymbolScope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/entry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/builtinData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/objects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$pathCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/pathCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
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
 *--------------------------------------------------------------------------------------------*/ const SnippetFormat = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet;
const retriggerCommand = {
    title: 'Suggest',
    command: 'editor.action.triggerSuggest'
};
var SortTexts;
(function(SortTexts) {
    // char code 32, comes before everything
    SortTexts["Enums"] = " ";
    SortTexts["Normal"] = "d";
    SortTexts["VendorPrefixed"] = "x";
    SortTexts["Term"] = "y";
    SortTexts["Variable"] = "z";
})(SortTexts || (SortTexts = {}));
class CSSCompletion {
    constructor(variablePrefix = null, lsOptions, cssDataManager){
        this.variablePrefix = variablePrefix;
        this.lsOptions = lsOptions;
        this.cssDataManager = cssDataManager;
        this.completionParticipants = [];
    }
    configure(settings) {
        this.defaultSettings = settings;
    }
    getSymbolContext() {
        if (!this.symbolContext) {
            this.symbolContext = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssSymbolScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Symbols"](this.styleSheet);
        }
        return this.symbolContext;
    }
    setCompletionParticipants(registeredCompletionParticipants) {
        this.completionParticipants = registeredCompletionParticipants || [];
    }
    async doComplete2(document, position, styleSheet, documentContext, completionSettings = this.defaultSettings) {
        if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) {
            return this.doComplete(document, position, styleSheet, completionSettings);
        }
        const participant = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$pathCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathCompletionParticipant"](this.lsOptions.fileSystemProvider.readDirectory);
        const contributedParticipants = this.completionParticipants;
        this.completionParticipants = [
            participant
        ].concat(contributedParticipants);
        const result = this.doComplete(document, position, styleSheet, completionSettings);
        try {
            const pathCompletionResult = await participant.computeCompletions(document, documentContext);
            return {
                isIncomplete: result.isIncomplete || pathCompletionResult.isIncomplete,
                itemDefaults: result.itemDefaults,
                items: pathCompletionResult.items.concat(result.items)
            };
        } finally{
            this.completionParticipants = contributedParticipants;
        }
    }
    doComplete(document, position, styleSheet, documentSettings) {
        this.offset = document.offsetAt(position);
        this.position = position;
        this.currentWord = getCurrentWord(document, this.offset);
        this.defaultReplaceRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].create(this.position.line, this.position.character - this.currentWord.length), this.position);
        this.textDocument = document;
        this.styleSheet = styleSheet;
        this.documentSettings = documentSettings;
        try {
            const result = {
                isIncomplete: false,
                itemDefaults: {
                    editRange: {
                        start: {
                            line: position.line,
                            character: position.character - this.currentWord.length
                        },
                        end: position
                    }
                },
                items: []
            };
            this.nodePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodePath"])(this.styleSheet, this.offset);
            for(let i = this.nodePath.length - 1; i >= 0; i--){
                const node = this.nodePath[i];
                if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Property"]) {
                    this.getCompletionsForDeclarationProperty(node.getParent(), result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Expression"]) {
                    if (node.parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Interpolation"]) {
                        this.getVariableProposals(null, result);
                    } else {
                        this.getCompletionsForExpression(node, result);
                    }
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"]) {
                    const parentRef = node.findAParent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ExtendsReference, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Ruleset);
                    if (parentRef) {
                        if (parentRef.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ExtendsReference) {
                            this.getCompletionsForExtendsReference(parentRef, node, result);
                        } else {
                            const parentRuleSet = parentRef;
                            this.getCompletionsForSelector(parentRuleSet, parentRuleSet && parentRuleSet.isNested(), result);
                        }
                    }
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"]) {
                    this.getCompletionsForFunctionArgument(node, node.getParent(), result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declarations"]) {
                    this.getCompletionsForDeclarations(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableDeclaration"]) {
                    this.getCompletionsForVariableDeclaration(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
                    this.getCompletionsForRuleSet(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Interpolation"]) {
                    this.getCompletionsForInterpolation(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionDeclaration"]) {
                    this.getCompletionsForFunctionDeclaration(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinReference"]) {
                    this.getCompletionsForMixinReference(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Function"]) {
                    this.getCompletionsForFunctionArgument(null, node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Supports"]) {
                    this.getCompletionsForSupports(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportsCondition"]) {
                    this.getCompletionsForSupportsCondition(node, result);
                } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendsReference"]) {
                    this.getCompletionsForExtendsReference(node, null, result);
                } else if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].URILiteral) {
                    this.getCompletionForUriLiteralValue(node, result);
                } else if (node.parent === null) {
                    this.getCompletionForTopLevel(result);
                } else if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].StringLiteral && this.isImportPathParent(node.parent.type)) {
                    this.getCompletionForImportPath(node, result);
                // } else if (node instanceof nodes.Variable) {
                // this.getCompletionsForVariableDeclaration()
                } else {
                    continue;
                }
                if (result.items.length > 0 || this.offset > node.offset) {
                    return this.finalize(result);
                }
            }
            this.getCompletionsForStylesheet(result);
            if (result.items.length === 0) {
                if (this.variablePrefix && this.currentWord.indexOf(this.variablePrefix) === 0) {
                    this.getVariableProposals(null, result);
                }
            }
            return this.finalize(result);
        } finally{
            // don't hold on any state, clear symbolContext
            this.position = null;
            this.currentWord = null;
            this.textDocument = null;
            this.styleSheet = null;
            this.symbolContext = null;
            this.defaultReplaceRange = null;
            this.nodePath = null;
        }
    }
    isImportPathParent(type) {
        return type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Import;
    }
    finalize(result) {
        return result;
    }
    findInNodePath(...types) {
        for(let i = this.nodePath.length - 1; i >= 0; i--){
            const node = this.nodePath[i];
            if (types.indexOf(node.type) !== -1) {
                return node;
            }
        }
        return null;
    }
    getCompletionsForDeclarationProperty(declaration, result) {
        return this.getPropertyProposals(declaration, result);
    }
    getPropertyProposals(declaration, result) {
        const triggerPropertyValueCompletion = this.isTriggerPropertyValueCompletionEnabled;
        const completePropertyWithSemicolon = this.isCompletePropertyWithSemicolonEnabled;
        const properties = this.cssDataManager.getProperties();
        properties.forEach((entry)=>{
            let range;
            let insertText;
            let retrigger = false;
            if (declaration) {
                range = this.getCompletionRange(declaration.getProperty());
                insertText = entry.name;
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(declaration.colonPosition)) {
                    insertText += ': ';
                    retrigger = true;
                }
            } else {
                range = this.getCompletionRange(null);
                insertText = entry.name + ': ';
                retrigger = true;
            }
            // Empty .selector { | } case
            if (!declaration && completePropertyWithSemicolon) {
                insertText += '$0;';
            }
            // Cases such as .selector { p; } or .selector { p:; }
            if (declaration && !declaration.semicolonPosition) {
                if (completePropertyWithSemicolon && this.offset >= this.textDocument.offsetAt(range.end)) {
                    insertText += '$0;';
                }
            }
            const item = {
                label: entry.name,
                documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemTag"].Deprecated
                ] : [],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(range, insertText),
                insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Property
            };
            if (!entry.restrictions) {
                retrigger = false;
            }
            if (triggerPropertyValueCompletion && retrigger) {
                item.command = retriggerCommand;
            }
            const relevance = typeof entry.relevance === 'number' ? Math.min(Math.max(entry.relevance, 0), 99) : 50;
            const sortTextSuffix = (255 - relevance).toString(16);
            const sortTextPrefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(entry.name, '-') ? SortTexts.VendorPrefixed : SortTexts.Normal;
            item.sortText = sortTextPrefix + '_' + sortTextSuffix;
            result.items.push(item);
        });
        this.completionParticipants.forEach((participant)=>{
            if (participant.onCssProperty) {
                participant.onCssProperty({
                    propertyName: this.currentWord,
                    range: this.defaultReplaceRange
                });
            }
        });
        return result;
    }
    get isTriggerPropertyValueCompletionEnabled() {
        return this.documentSettings?.triggerPropertyValueCompletion ?? true;
    }
    get isCompletePropertyWithSemicolonEnabled() {
        return this.documentSettings?.completePropertyWithSemicolon ?? true;
    }
    getCompletionsForDeclarationValue(node, result) {
        const propertyName = node.getFullPropertyName();
        const entry = this.cssDataManager.getProperty(propertyName);
        let existingNode = node.getValue() || null;
        while(existingNode && existingNode.hasChildren()){
            existingNode = existingNode.findChildAtOffset(this.offset, false);
        }
        this.completionParticipants.forEach((participant)=>{
            if (participant.onCssPropertyValue) {
                participant.onCssPropertyValue({
                    propertyName,
                    propertyValue: this.currentWord,
                    range: this.getCompletionRange(existingNode)
                });
            }
        });
        if (entry) {
            if (entry.restrictions) {
                for (const restriction of entry.restrictions){
                    switch(restriction){
                        case 'color':
                            this.getColorProposals(entry, existingNode, result);
                            break;
                        case 'position':
                            this.getPositionProposals(entry, existingNode, result);
                            break;
                        case 'repeat':
                            this.getRepeatStyleProposals(entry, existingNode, result);
                            break;
                        case 'line-style':
                            this.getLineStyleProposals(entry, existingNode, result);
                            break;
                        case 'line-width':
                            this.getLineWidthProposals(entry, existingNode, result);
                            break;
                        case 'geometry-box':
                            this.getGeometryBoxProposals(entry, existingNode, result);
                            break;
                        case 'box':
                            this.getBoxProposals(entry, existingNode, result);
                            break;
                        case 'image':
                            this.getImageProposals(entry, existingNode, result);
                            break;
                        case 'timing-function':
                            this.getTimingFunctionProposals(entry, existingNode, result);
                            break;
                        case 'shape':
                            this.getBasicShapeProposals(entry, existingNode, result);
                            break;
                    }
                }
            }
            this.getValueEnumProposals(entry, existingNode, result);
            this.getCSSWideKeywordProposals(entry, existingNode, result);
            this.getUnitProposals(entry, existingNode, result);
        } else {
            const existingValues = collectValues(this.styleSheet, node);
            for (const existingValue of existingValues.getEntries()){
                result.items.push({
                    label: existingValue,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), existingValue),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
                });
            }
        }
        this.getVariableProposals(existingNode, result);
        this.getTermProposals(entry, existingNode, result);
        return result;
    }
    getValueEnumProposals(entry, existingNode, result) {
        if (entry.values) {
            for (const value of entry.values){
                let insertString = value.name;
                let insertTextFormat;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endsWith"])(insertString, ')')) {
                    const from = insertString.lastIndexOf('(');
                    if (from !== -1) {
                        insertString = insertString.substring(0, from + 1) + '$1' + insertString.substring(from + 1);
                        insertTextFormat = SnippetFormat;
                    }
                }
                let sortText = SortTexts.Enums;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(value.name, '-')) {
                    sortText += SortTexts.VendorPrefixed;
                }
                const item = {
                    label: value.name,
                    documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(value, this.doesSupportMarkdown()),
                    tags: isDeprecated(entry) ? [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemTag"].Deprecated
                    ] : [],
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertString),
                    sortText,
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value,
                    insertTextFormat
                };
                result.items.push(item);
            }
        }
        return result;
    }
    getCSSWideKeywordProposals(entry, existingNode, result) {
        for(const keywords in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssWideKeywords"]){
            result.items.push({
                label: keywords,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssWideKeywords"][keywords],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), keywords),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        for(const func in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssWideFunctions"]){
            const insertText = moveCursorInsideParenthesis(func);
            result.items.push({
                label: func,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssWideFunctions"][func],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: SnippetFormat,
                command: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(func, 'var') ? retriggerCommand : undefined
            });
        }
        return result;
    }
    getCompletionsForInterpolation(node, result) {
        if (this.offset >= node.offset + 2) {
            this.getVariableProposals(null, result);
        }
        return result;
    }
    getVariableProposals(existingNode, result) {
        const symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
        for (const symbol of symbols){
            const insertText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(symbol.name, '--') ? `var(${symbol.name})` : symbol.name;
            const completionItem = {
                label: symbol.name,
                documentation: symbol.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLimitedString"])(symbol.value) : symbol.value,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Variable,
                sortText: SortTexts.Variable
            };
            if (typeof completionItem.documentation === 'string' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])(completionItem.documentation)) {
                completionItem.kind = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Color;
            }
            if (symbol.node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionParameter) {
                const mixinNode = symbol.node.getParent();
                if (mixinNode.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration) {
                    completionItem.detail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('argument from \'{0}\'', mixinNode.getName());
                }
            }
            result.items.push(completionItem);
        }
        return result;
    }
    getVariableProposalsForCSSVarFunction(result) {
        const allReferencedVariables = new Set();
        this.styleSheet.acceptVisitor(new VariableCollector(allReferencedVariables, this.offset));
        let symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
        for (const symbol of symbols){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(symbol.name, '--')) {
                const completionItem = {
                    label: symbol.name,
                    documentation: symbol.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLimitedString"])(symbol.value) : symbol.value,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(null), symbol.name),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Variable
                };
                if (typeof completionItem.documentation === 'string' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])(completionItem.documentation)) {
                    completionItem.kind = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Color;
                }
                result.items.push(completionItem);
            }
            allReferencedVariables.remove(symbol.name);
        }
        for (const name of allReferencedVariables.getEntries()){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(name, '--')) {
                const completionItem = {
                    label: name,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(null), name),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Variable
                };
                result.items.push(completionItem);
            }
        }
        return result;
    }
    getUnitProposals(entry, existingNode, result) {
        let currentWord = '0';
        if (this.currentWord.length > 0) {
            const numMatch = this.currentWord.match(/^-?\d[\.\d+]*/);
            if (numMatch) {
                currentWord = numMatch[0];
                result.isIncomplete = currentWord.length === this.currentWord.length;
            }
        } else if (this.currentWord.length === 0) {
            result.isIncomplete = true;
        }
        if (existingNode && existingNode.parent && existingNode.parent.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Term) {
            existingNode = existingNode.getParent(); // include the unary operator
        }
        if (entry.restrictions) {
            for (const restriction of entry.restrictions){
                const units$1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["units"][restriction];
                if (units$1) {
                    for (const unit of units$1){
                        const insertText = currentWord + unit;
                        result.items.push({
                            label: insertText,
                            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Unit
                        });
                    }
                }
            }
        }
        return result;
    }
    getCompletionRange(existingNode) {
        if (existingNode && existingNode.offset <= this.offset && this.offset <= existingNode.end) {
            const end = existingNode.end !== -1 ? this.textDocument.positionAt(existingNode.end) : this.position;
            const start = this.textDocument.positionAt(existingNode.offset);
            if (start.line === end.line) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(start, end); // multi line edits are not allowed
            }
        }
        return this.defaultReplaceRange;
    }
    getColorProposals(entry, existingNode, result) {
        for(const color in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colors"]){
            result.items.push({
                label: color,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colors"][color],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), color),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Color
            });
        }
        for(const color in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorKeywords"]){
            result.items.push({
                label: color,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorKeywords"][color],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), color),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        const colorValues = new Set();
        this.styleSheet.acceptVisitor(new ColorValueCollector(colorValues, this.offset));
        for (const color of colorValues.getEntries()){
            result.items.push({
                label: color,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), color),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Color
            });
        }
        for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorFunctions"]){
            result.items.push({
                label: p.label,
                detail: p.func,
                documentation: p.desc,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), p.insertText),
                insertTextFormat: SnippetFormat,
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function
            });
        }
        return result;
    }
    getPositionProposals(entry, existingNode, result) {
        for(const position in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionKeywords"]){
            result.items.push({
                label: position,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionKeywords"][position],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), position),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getRepeatStyleProposals(entry, existingNode, result) {
        for(const repeat in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repeatStyleKeywords"]){
            result.items.push({
                label: repeat,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repeatStyleKeywords"][repeat],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), repeat),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getLineStyleProposals(entry, existingNode, result) {
        for(const lineStyle in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineStyleKeywords"]){
            result.items.push({
                label: lineStyle,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineStyleKeywords"][lineStyle],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), lineStyle),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getLineWidthProposals(entry, existingNode, result) {
        for (const lineWidth of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineWidthKeywords"]){
            result.items.push({
                label: lineWidth,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), lineWidth),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getGeometryBoxProposals(entry, existingNode, result) {
        for(const box in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geometryBoxKeywords"]){
            result.items.push({
                label: box,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geometryBoxKeywords"][box],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), box),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getBoxProposals(entry, existingNode, result) {
        for(const box in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boxKeywords"]){
            result.items.push({
                label: box,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boxKeywords"][box],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), box),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Value
            });
        }
        return result;
    }
    getImageProposals(entry, existingNode, result) {
        for(const image in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageFunctions"]){
            const insertText = moveCursorInsideParenthesis(image);
            result.items.push({
                label: image,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageFunctions"][image],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: image !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    }
    getTimingFunctionProposals(entry, existingNode, result) {
        for(const timing in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionTimingFunctions"]){
            const insertText = moveCursorInsideParenthesis(timing);
            result.items.push({
                label: timing,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionTimingFunctions"][timing],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: timing !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    }
    getBasicShapeProposals(entry, existingNode, result) {
        for(const shape in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["basicShapeFunctions"]){
            const insertText = moveCursorInsideParenthesis(shape);
            result.items.push({
                label: shape,
                documentation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["basicShapeFunctions"][shape],
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: shape !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    }
    getCompletionsForStylesheet(result) {
        const node = this.styleSheet.findFirstChildBeforeOffset(this.offset);
        if (!node) {
            return this.getCompletionForTopLevel(result);
        }
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
            return this.getCompletionsForRuleSet(node, result);
        }
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Supports"]) {
            return this.getCompletionsForSupports(node, result);
        }
        return result;
    }
    getCompletionForTopLevel(result) {
        this.cssDataManager.getAtDirectives().forEach((entry)=>{
            result.items.push({
                label: entry.name,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(null), entry.name),
                documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemTag"].Deprecated
                ] : [],
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
            });
        });
        this.getCompletionsForSelector(null, false, result);
        return result;
    }
    getCompletionsForRuleSet(ruleSet, result) {
        const declarations = ruleSet.getDeclarations();
        const isAfter = declarations && declarations.endsWith('}') && this.offset >= declarations.end;
        if (isAfter) {
            return this.getCompletionForTopLevel(result);
        }
        const isInSelectors = !declarations || this.offset <= declarations.offset;
        if (isInSelectors) {
            return this.getCompletionsForSelector(ruleSet, ruleSet.isNested(), result);
        }
        return this.getCompletionsForDeclarations(ruleSet.getDeclarations(), result);
    }
    getCompletionsForSelector(ruleSet, isNested, result) {
        const existingNode = this.findInNodePath(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].IdentifierSelector, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ClassSelector, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ElementNameSelector);
        if (!existingNode && this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ':')) {
            // after the ':' of a pseudo selector, no node generated for just ':'
            this.currentWord = ':' + this.currentWord;
            if (this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ':')) {
                this.currentWord = ':' + this.currentWord; // for '::'
            }
            this.defaultReplaceRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].create(this.position.line, this.position.character - this.currentWord.length), this.position);
        }
        const pseudoClasses = this.cssDataManager.getPseudoClasses();
        pseudoClasses.forEach((entry)=>{
            const insertText = moveCursorInsideParenthesis(entry.name);
            const item = {
                label: entry.name,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemTag"].Deprecated
                ] : [],
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
            };
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(entry.name, ':-')) {
                item.sortText = SortTexts.VendorPrefixed;
            }
            result.items.push(item);
        });
        const pseudoElements = this.cssDataManager.getPseudoElements();
        pseudoElements.forEach((entry)=>{
            const insertText = moveCursorInsideParenthesis(entry.name);
            const item = {
                label: entry.name,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemTag"].Deprecated
                ] : [],
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
                insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
            };
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(entry.name, '::-')) {
                item.sortText = SortTexts.VendorPrefixed;
            }
            result.items.push(item);
        });
        if (!isNested) {
            for (const entry of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html5Tags"]){
                result.items.push({
                    label: entry,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), entry),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
                });
            }
            for (const entry of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgElements"]){
                result.items.push({
                    label: entry,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), entry),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
                });
            }
        }
        const visited = {};
        visited[this.currentWord] = true;
        const docText = this.textDocument.getText();
        this.styleSheet.accept((n)=>{
            if (n.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SimpleSelector && n.length > 0) {
                const selector = docText.substr(n.offset, n.length);
                if (selector.charAt(0) === '.' && !visited[selector]) {
                    visited[selector] = true;
                    result.items.push({
                        label: selector,
                        textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), selector),
                        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
                    });
                }
                return false;
            }
            return true;
        });
        if (ruleSet && ruleSet.isNested()) {
            const selector = ruleSet.getSelectors().findFirstChildBeforeOffset(this.offset);
            if (selector && ruleSet.getSelectors().getChildren().indexOf(selector) === 0) {
                this.getPropertyProposals(null, result);
            }
        }
        return result;
    }
    getCompletionsForDeclarations(declarations, result) {
        if (!declarations || this.offset === declarations.offset) {
            return result;
        }
        const node = declarations.findFirstChildBeforeOffset(this.offset);
        if (!node) {
            return this.getCompletionsForDeclarationProperty(null, result);
        }
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractDeclaration"]) {
            const declaration = node;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(declaration.colonPosition) || this.offset <= declaration.colonPosition) {
                // complete property
                return this.getCompletionsForDeclarationProperty(declaration, result);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(declaration.semicolonPosition) && declaration.semicolonPosition < this.offset) {
                if (this.offset === declaration.semicolonPosition + 1) {
                    return result; // don't show new properties right after semicolon (see Bug 15421:[intellisense] [css] Be less aggressive when manually typing CSS)
                }
                // complete next property
                return this.getCompletionsForDeclarationProperty(null, result);
            }
            if (declaration instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
                // complete value
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
        } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendsReference"]) {
            this.getCompletionsForExtendsReference(node, null, result);
        } else if (this.currentWord && this.currentWord[0] === '@') {
            this.getCompletionsForDeclarationProperty(null, result);
        } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
            this.getCompletionsForDeclarationProperty(null, result);
        }
        return result;
    }
    getCompletionsForVariableDeclaration(declaration, result) {
        if (this.offset && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(declaration.colonPosition) && this.offset > declaration.colonPosition) {
            this.getVariableProposals(declaration.getValue() || null, result);
        }
        return result;
    }
    getCompletionsForExpression(expression, result) {
        const parent = expression.getParent();
        if (parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"]) {
            this.getCompletionsForFunctionArgument(parent, parent.getParent(), result);
            return result;
        }
        const declaration = expression.findParent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declaration);
        if (!declaration) {
            this.getTermProposals(undefined, null, result);
            return result;
        }
        const node = expression.findChildAtOffset(this.offset, true);
        if (!node) {
            return this.getCompletionsForDeclarationValue(declaration, result);
        }
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumericValue"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]) {
            return this.getCompletionsForDeclarationValue(declaration, result);
        }
        return result;
    }
    getCompletionsForFunctionArgument(arg, func, result) {
        const identifier = func.getIdentifier();
        if (identifier && identifier.matches('var')) {
            if (!func.getArguments().hasChildren() || func.getArguments().getChild(0) === arg) {
                this.getVariableProposalsForCSSVarFunction(result);
            }
        }
        return result;
    }
    getCompletionsForFunctionDeclaration(decl, result) {
        const declarations = decl.getDeclarations();
        if (declarations && this.offset > declarations.offset && this.offset < declarations.end) {
            this.getTermProposals(undefined, null, result);
        }
        return result;
    }
    getCompletionsForMixinReference(ref, result) {
        const allMixins = this.getSymbolContext().findSymbolsAtOffset(this.offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin);
        for (const mixinSymbol of allMixins){
            if (mixinSymbol.node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinDeclaration"]) {
                result.items.push(this.makeTermProposal(mixinSymbol, mixinSymbol.node.getParameters(), null));
            }
        }
        const identifierNode = ref.getIdentifier() || null;
        this.completionParticipants.forEach((participant)=>{
            if (participant.onCssMixinReference) {
                participant.onCssMixinReference({
                    mixinName: this.currentWord,
                    range: this.getCompletionRange(identifierNode)
                });
            }
        });
        return result;
    }
    getTermProposals(entry, existingNode, result) {
        const allFunctions = this.getSymbolContext().findSymbolsAtOffset(this.offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function);
        for (const functionSymbol of allFunctions){
            if (functionSymbol.node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionDeclaration"]) {
                result.items.push(this.makeTermProposal(functionSymbol, functionSymbol.node.getParameters(), existingNode));
            }
        }
        return result;
    }
    makeTermProposal(symbol, parameters, existingNode) {
        symbol.node;
        const params = parameters.getChildren().map((c)=>{
            return c instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionParameter"] ? c.getName() : c.getText();
        });
        const insertText = symbol.name + '(' + params.map((p, index)=>'${' + (index + 1) + ':' + p + '}').join(', ') + ')';
        return {
            label: symbol.name,
            detail: symbol.name + '(' + params.join(', ') + ')',
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
            insertTextFormat: SnippetFormat,
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function,
            sortText: SortTexts.Term
        };
    }
    getCompletionsForSupportsCondition(supportsCondition, result) {
        const child = supportsCondition.findFirstChildBeforeOffset(this.offset);
        if (child) {
            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(child.colonPosition) || this.offset <= child.colonPosition) {
                    return this.getCompletionsForDeclarationProperty(child, result);
                } else {
                    return this.getCompletionsForDeclarationValue(child, result);
                }
            } else if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportsCondition"]) {
                return this.getCompletionsForSupportsCondition(child, result);
            }
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(supportsCondition.lParent) && this.offset > supportsCondition.lParent && (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(supportsCondition.rParent) || this.offset <= supportsCondition.rParent)) {
            return this.getCompletionsForDeclarationProperty(null, result);
        }
        return result;
    }
    getCompletionsForSupports(supports, result) {
        const declarations = supports.getDeclarations();
        const inInCondition = !declarations || this.offset <= declarations.offset;
        if (inInCondition) {
            const child = supports.findFirstChildBeforeOffset(this.offset);
            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportsCondition"]) {
                return this.getCompletionsForSupportsCondition(child, result);
            }
            return result;
        }
        return this.getCompletionForTopLevel(result);
    }
    getCompletionsForExtendsReference(extendsRef, existingNode, result) {
        return result;
    }
    getCompletionForUriLiteralValue(uriLiteralNode, result) {
        let uriValue;
        let position;
        let range;
        // No children, empty value
        if (!uriLiteralNode.hasChildren()) {
            uriValue = '';
            position = this.position;
            const emptyURIValuePosition = this.textDocument.positionAt(uriLiteralNode.offset + 'url('.length);
            range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(emptyURIValuePosition, emptyURIValuePosition);
        } else {
            const uriValueNode = uriLiteralNode.getChild(0);
            uriValue = uriValueNode.getText();
            position = this.position;
            range = this.getCompletionRange(uriValueNode);
        }
        this.completionParticipants.forEach((participant)=>{
            if (participant.onCssURILiteralValue) {
                participant.onCssURILiteralValue({
                    uriValue,
                    position,
                    range
                });
            }
        });
        return result;
    }
    getCompletionForImportPath(importPathNode, result) {
        this.completionParticipants.forEach((participant)=>{
            if (participant.onCssImportPath) {
                participant.onCssImportPath({
                    pathValue: importPathNode.getText(),
                    position: this.position,
                    range: this.getCompletionRange(importPathNode)
                });
            }
        });
        return result;
    }
    hasCharacterAtPosition(offset, char) {
        const text = this.textDocument.getText();
        return offset >= 0 && offset < text.length && text.charAt(offset) === char;
    }
    doesSupportMarkdown() {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(this.supportsMarkdown)) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(this.lsOptions.clientCapabilities)) {
                this.supportsMarkdown = true;
                return this.supportsMarkdown;
            }
            const documentationFormat = this.lsOptions.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
            this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].Markdown) !== -1;
        }
        return this.supportsMarkdown;
    }
}
function isDeprecated(entry) {
    if (entry.status && (entry.status === 'nonstandard' || entry.status === 'obsolete')) {
        return true;
    }
    return false;
}
class Set {
    constructor(){
        this.entries = {};
    }
    add(entry) {
        this.entries[entry] = true;
    }
    remove(entry) {
        delete this.entries[entry];
    }
    getEntries() {
        return Object.keys(this.entries);
    }
}
function moveCursorInsideParenthesis(text) {
    return text.replace(/\(\)$/, "($1)");
}
function collectValues(styleSheet, declaration) {
    const fullPropertyName = declaration.getFullPropertyName();
    const entries = new Set();
    function visitValue(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumericValue"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexColorValue"]) {
            entries.add(node.getText());
        }
        return true;
    }
    function matchesProperty(decl) {
        const propertyName = decl.getFullPropertyName();
        return fullPropertyName === propertyName;
    }
    function vistNode(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"] && node !== declaration) {
            if (matchesProperty(node)) {
                const value = node.getValue();
                if (value) {
                    value.accept(visitValue);
                }
            }
        }
        return true;
    }
    styleSheet.accept(vistNode);
    return entries;
}
class ColorValueCollector {
    constructor(entries, currentOffset){
        this.entries = entries;
        this.currentOffset = currentOffset;
    // nothing to do
    }
    visitNode(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexColorValue"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Function"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorConstructor"])(node)) {
            if (this.currentOffset < node.offset || node.end < this.currentOffset) {
                this.entries.add(node.getText());
            }
        }
        return true;
    }
}
class VariableCollector {
    constructor(entries, currentOffset){
        this.entries = entries;
        this.currentOffset = currentOffset;
    // nothing to do
    }
    visitNode(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"] && node.isCustomProperty) {
            if (this.currentOffset < node.offset || node.end < this.currentOffset) {
                this.entries.add(node.getText());
            }
        }
        return true;
    }
}
function getCurrentWord(document, offset) {
    let i = offset - 1;
    const text = document.getText();
    while(i >= 0 && ' \t\n\r":{[()]},*>+'.indexOf(text.charAt(i)) === -1){
        i--;
    }
    return text.substring(i + 1, offset);
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/selectorPrinting.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Element",
    ()=>Element,
    "LabelElement",
    ()=>LabelElement,
    "RootElement",
    ()=>RootElement,
    "SelectorPrinting",
    ()=>SelectorPrinting,
    "selectorToElement",
    ()=>selectorToElement,
    "toElement",
    ()=>toElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssParser.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class Element {
    constructor(){
        this.parent = null;
        this.children = null;
        this.attributes = null;
    }
    findAttribute(name) {
        if (this.attributes) {
            for (const attribute of this.attributes){
                if (attribute.name === name) {
                    return attribute.value;
                }
            }
        }
        return null;
    }
    addChild(child) {
        if (child instanceof Element) {
            child.parent = this;
        }
        if (!this.children) {
            this.children = [];
        }
        this.children.push(child);
    }
    append(text) {
        if (this.attributes) {
            const last = this.attributes[this.attributes.length - 1];
            last.value = last.value + text;
        }
    }
    prepend(text) {
        if (this.attributes) {
            const first = this.attributes[0];
            first.value = text + first.value;
        }
    }
    findRoot() {
        let curr = this;
        while(curr.parent && !(curr.parent instanceof RootElement)){
            curr = curr.parent;
        }
        return curr;
    }
    removeChild(child) {
        if (this.children) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                this.children.splice(index, 1);
                return true;
            }
        }
        return false;
    }
    addAttr(name, value) {
        if (!this.attributes) {
            this.attributes = [];
        }
        for (const attribute of this.attributes){
            if (attribute.name === name) {
                attribute.value += ' ' + value;
                return;
            }
        }
        this.attributes.push({
            name,
            value
        });
    }
    clone(cloneChildren = true) {
        const elem = new Element();
        if (this.attributes) {
            elem.attributes = [];
            for (const attribute of this.attributes){
                elem.addAttr(attribute.name, attribute.value);
            }
        }
        if (cloneChildren && this.children) {
            elem.children = [];
            for(let index = 0; index < this.children.length; index++){
                elem.addChild(this.children[index].clone());
            }
        }
        return elem;
    }
    cloneWithParent() {
        const clone = this.clone(false);
        if (this.parent && !(this.parent instanceof RootElement)) {
            const parentClone = this.parent.cloneWithParent();
            parentClone.addChild(clone);
        }
        return clone;
    }
}
class RootElement extends Element {
}
class LabelElement extends Element {
    constructor(label){
        super();
        this.addAttr('name', label);
    }
}
class MarkedStringPrinter {
    constructor(quote){
        this.quote = quote;
        this.result = [];
    // empty
    }
    print(element, flagOpts) {
        this.result = [];
        if (element instanceof RootElement) {
            if (element.children) {
                this.doPrint(element.children, 0);
            }
        } else {
            this.doPrint([
                element
            ], 0);
        }
        let value;
        if (flagOpts) {
            value = `${flagOpts.text}\n … ` + this.result.join('\n');
        } else {
            value = this.result.join('\n');
        }
        return [
            {
                language: 'html',
                value
            }
        ];
    }
    doPrint(elements, indent) {
        for (const element of elements){
            this.doPrintElement(element, indent);
            if (element.children) {
                this.doPrint(element.children, indent + 1);
            }
        }
    }
    writeLine(level, content) {
        const indent = new Array(level + 1).join('  ');
        this.result.push(indent + content);
    }
    doPrintElement(element, indent) {
        const name = element.findAttribute('name');
        // special case: a simple label
        if (element instanceof LabelElement || name === '\u2026') {
            this.writeLine(indent, name);
            return;
        }
        // the real deal
        const content = [
            '<'
        ];
        // element name
        if (name) {
            content.push(name);
        } else {
            content.push('element');
        }
        // attributes
        if (element.attributes) {
            for (const attr of element.attributes){
                if (attr.name !== 'name') {
                    content.push(' ');
                    content.push(attr.name);
                    const value = attr.value;
                    if (value) {
                        content.push('=');
                        content.push(quotes.ensure(value, this.quote));
                    }
                }
            }
        }
        content.push('>');
        this.writeLine(indent, content.join(''));
    }
}
var quotes;
(function(quotes) {
    function ensure(value, which) {
        return which + remove(value) + which;
    }
    quotes.ensure = ensure;
    function remove(value) {
        const match = value.match(/^['"](.*)["']$/);
        if (match) {
            return match[1];
        }
        return value;
    }
    quotes.remove = remove;
})(quotes || (quotes = {}));
class Specificity {
    constructor(){
        /** Count of identifiers (e.g., `#app`) */ this.id = 0;
        /** Count of attributes (`[type="number"]`), classes (`.container-fluid`), and pseudo-classes (`:hover`) */ this.attr = 0;
        /** Count of tag names (`div`), and pseudo-elements (`::before`) */ this.tag = 0;
    }
}
function toElement(node, parentElement) {
    let result = new Element();
    for (const child of node.getChildren()){
        switch(child.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinator:
                if (parentElement) {
                    const segments = child.getText().split('&');
                    if (segments.length === 1) {
                        // should not happen
                        result.addAttr('name', segments[0]);
                        break;
                    }
                    result = parentElement.cloneWithParent();
                    if (segments[0]) {
                        const root = result.findRoot();
                        root.prepend(segments[0]);
                    }
                    for(let i = 1; i < segments.length; i++){
                        if (i > 1) {
                            const clone = parentElement.cloneWithParent();
                            result.addChild(clone.findRoot());
                            result = clone;
                        }
                        result.append(segments[i]);
                    }
                }
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorPlaceholder:
                if (child.matches('@at-root')) {
                    return result;
                }
            // fall through
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ElementNameSelector:
                const text = child.getText();
                result.addAttr('name', text === '*' ? 'element' : unescape(text));
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ClassSelector:
                result.addAttr('class', unescape(child.getText().substring(1)));
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].IdentifierSelector:
                result.addAttr('id', unescape(child.getText().substring(1)));
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration:
                result.addAttr('class', child.getName());
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector:
                result.addAttr(unescape(child.getText()), '');
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].AttributeSelector:
                const selector = child;
                const identifier = selector.getIdentifier();
                if (identifier) {
                    const expression = selector.getValue();
                    const operator = selector.getOperator();
                    let value;
                    if (expression && operator) {
                        switch(unescape(operator.getText())){
                            case '|=':
                                // excatly or followed by -words
                                value = `${quotes.remove(unescape(expression.getText()))}-\u2026`;
                                break;
                            case '^=':
                                // prefix
                                value = `${quotes.remove(unescape(expression.getText()))}\u2026`;
                                break;
                            case '$=':
                                // suffix
                                value = `\u2026${quotes.remove(unescape(expression.getText()))}`;
                                break;
                            case '~=':
                                // one of a list of words
                                value = ` \u2026 ${quotes.remove(unescape(expression.getText()))} \u2026 `;
                                break;
                            case '*=':
                                // substring
                                value = `\u2026${quotes.remove(unescape(expression.getText()))}\u2026`;
                                break;
                            default:
                                value = quotes.remove(unescape(expression.getText()));
                                break;
                        }
                    }
                    result.addAttr(unescape(identifier.getText()), value);
                }
                break;
        }
    }
    return result;
}
function unescape(content) {
    const scanner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scanner"]();
    scanner.setSource(content);
    const token = scanner.scanUnquotedString();
    if (token) {
        return token.text;
    }
    return content;
}
class SelectorPrinting {
    constructor(cssDataManager){
        this.cssDataManager = cssDataManager;
    }
    selectorToMarkedString(node, flagOpts) {
        const root = selectorToElement(node);
        if (root) {
            const markedStrings = new MarkedStringPrinter('"').print(root, flagOpts);
            markedStrings.push(this.selectorToSpecificityMarkedString(node));
            return markedStrings;
        } else {
            return [];
        }
    }
    simpleSelectorToMarkedString(node) {
        const element = toElement(node);
        const markedStrings = new MarkedStringPrinter('"').print(element);
        markedStrings.push(this.selectorToSpecificityMarkedString(node));
        return markedStrings;
    }
    isPseudoElementIdentifier(text) {
        const match = text.match(/^::?([\w-]+)/);
        if (!match) {
            return false;
        }
        return !!this.cssDataManager.getPseudoElement('::' + match[1]);
    }
    selectorToSpecificityMarkedString(node) {
        const calculateMostSpecificListItem = (childElements)=>{
            const specificity = new Specificity();
            let mostSpecificListItem = new Specificity();
            for (const containerElement of childElements){
                for (const childElement of containerElement.getChildren()){
                    const itemSpecificity = calculateScore(childElement);
                    if (itemSpecificity.id > mostSpecificListItem.id) {
                        mostSpecificListItem = itemSpecificity;
                        continue;
                    } else if (itemSpecificity.id < mostSpecificListItem.id) {
                        continue;
                    }
                    if (itemSpecificity.attr > mostSpecificListItem.attr) {
                        mostSpecificListItem = itemSpecificity;
                        continue;
                    } else if (itemSpecificity.attr < mostSpecificListItem.attr) {
                        continue;
                    }
                    if (itemSpecificity.tag > mostSpecificListItem.tag) {
                        mostSpecificListItem = itemSpecificity;
                        continue;
                    }
                }
            }
            specificity.id += mostSpecificListItem.id;
            specificity.attr += mostSpecificListItem.attr;
            specificity.tag += mostSpecificListItem.tag;
            return specificity;
        };
        //https://www.w3.org/TR/selectors-3/#specificity
        const calculateScore = (node)=>{
            const specificity = new Specificity();
            elementLoop: for (const element of node.getChildren()){
                switch(element.type){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].IdentifierSelector:
                        specificity.id++;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ClassSelector:
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].AttributeSelector:
                        specificity.attr++;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ElementNameSelector:
                        //ignore universal selector
                        if (element.matches('*')) {
                            break;
                        }
                        specificity.tag++;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector:
                        const text = element.getText();
                        const childElements = element.getChildren();
                        if (this.isPseudoElementIdentifier(text)) {
                            if (text.match(/^::slotted/i) && childElements.length > 0) {
                                // The specificity of ::slotted() is that of a pseudo-element, plus the specificity of its argument.
                                // ::slotted() does not allow a selector list as its argument, but this isn't the right place to give feedback on validity.
                                // Reporting the most specific child will be correct for correct CSS and will be forgiving in case of mistakes.
                                specificity.tag++;
                                let mostSpecificListItem = calculateMostSpecificListItem(childElements);
                                specificity.id += mostSpecificListItem.id;
                                specificity.attr += mostSpecificListItem.attr;
                                specificity.tag += mostSpecificListItem.tag;
                                continue elementLoop;
                            }
                            specificity.tag++; // pseudo element
                            continue elementLoop;
                        }
                        // where and child selectors have zero specificity
                        if (text.match(/^:where/i)) {
                            continue elementLoop;
                        }
                        // the most specific child selector
                        if (text.match(/^:(?:not|has|is)/i) && childElements.length > 0) {
                            let mostSpecificListItem = calculateMostSpecificListItem(childElements);
                            specificity.id += mostSpecificListItem.id;
                            specificity.attr += mostSpecificListItem.attr;
                            specificity.tag += mostSpecificListItem.tag;
                            continue elementLoop;
                        }
                        if (text.match(/^:(?:host|host-context)/i) && childElements.length > 0) {
                            // The specificity of :host() is that of a pseudo-class, plus the specificity of its argument.
                            // The specificity of :host-context() is that of a pseudo-class, plus the specificity of its argument.
                            specificity.attr++;
                            let mostSpecificListItem = calculateMostSpecificListItem(childElements);
                            specificity.id += mostSpecificListItem.id;
                            specificity.attr += mostSpecificListItem.attr;
                            specificity.tag += mostSpecificListItem.tag;
                            continue elementLoop;
                        }
                        if (text.match(/^:(?:nth-child|nth-last-child)/i) && childElements.length > 0) {
                            /* The specificity of the :nth-child(An+B [of S]?) pseudo-class is the specificity of a single pseudo-class plus, if S is specified, the specificity of the most specific complex selector in S */ // https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo
                            specificity.attr++;
                            // 23 = Binary Expression.
                            if (childElements.length === 3 && childElements[1].type === 23) {
                                let mostSpecificListItem = calculateMostSpecificListItem(childElements[2].getChildren());
                                specificity.id += mostSpecificListItem.id;
                                specificity.attr += mostSpecificListItem.attr;
                                specificity.tag += mostSpecificListItem.tag;
                                continue elementLoop;
                            }
                            // Edge case: 'n' without integer prefix A, with B integer non-existent, is not regarded as a binary expression token.
                            const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"]();
                            const pseudoSelectorText = childElements[1].getText();
                            parser.scanner.setSource(pseudoSelectorText);
                            const firstToken = parser.scanner.scan();
                            const secondToken = parser.scanner.scan();
                            if (firstToken.text === 'n' || firstToken.text === '-n' && secondToken.text === 'of') {
                                const complexSelectorListNodes = [];
                                const complexSelectorText = pseudoSelectorText.slice(secondToken.offset + 2);
                                const complexSelectorArray = complexSelectorText.split(',');
                                for (const selector of complexSelectorArray){
                                    const node = parser.internalParse(selector, parser._parseSelector);
                                    if (node) {
                                        complexSelectorListNodes.push(node);
                                    }
                                }
                                let mostSpecificListItem = calculateMostSpecificListItem(complexSelectorListNodes);
                                specificity.id += mostSpecificListItem.id;
                                specificity.attr += mostSpecificListItem.attr;
                                specificity.tag += mostSpecificListItem.tag;
                                continue elementLoop;
                            }
                            continue elementLoop;
                        }
                        specificity.attr++; //pseudo class
                        continue elementLoop;
                }
                if (element.getChildren().length > 0) {
                    const itemSpecificity = calculateScore(element);
                    specificity.id += itemSpecificity.id;
                    specificity.attr += itemSpecificity.attr;
                    specificity.tag += itemSpecificity.tag;
                }
            }
            return specificity;
        };
        const specificity = calculateScore(node);
        return `[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Selector Specificity')}](https://developer.mozilla.org/docs/Web/CSS/Specificity): (${specificity.id}, ${specificity.attr}, ${specificity.tag})`;
    }
}
class SelectorElementBuilder {
    constructor(element){
        this.prev = null;
        this.element = element;
    }
    processSelector(selector) {
        let parentElement = null;
        if (!(this.element instanceof RootElement)) {
            if (selector.getChildren().some((c)=>c.hasChildren() && c.getChild(0).type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinator)) {
                const curr = this.element.findRoot();
                if (curr.parent instanceof RootElement) {
                    parentElement = this.element;
                    this.element = curr.parent;
                    this.element.removeChild(curr);
                    this.prev = null;
                }
            }
        }
        for (const selectorChild of selector.getChildren()){
            if (selectorChild instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"]) {
                if (this.prev instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"]) {
                    const labelElement = new LabelElement('\u2026');
                    this.element.addChild(labelElement);
                    this.element = labelElement;
                } else if (this.prev && (this.prev.matches('+') || this.prev.matches('~')) && this.element.parent) {
                    this.element = this.element.parent;
                }
                if (this.prev && this.prev.matches('~')) {
                    this.element.addChild(new LabelElement('\u22EE'));
                }
                const thisElement = toElement(selectorChild, parentElement);
                const root = thisElement.findRoot();
                this.element.addChild(root);
                this.element = thisElement;
            }
            if (selectorChild instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"] || selectorChild.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorParent || selectorChild.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorShadowPiercingDescendant || selectorChild.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorSibling || selectorChild.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorAllSiblings) {
                this.prev = selectorChild;
            }
        }
    }
}
function isNewSelectorContext(node) {
    switch(node.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Stylesheet:
            return true;
    }
    return false;
}
function selectorToElement(node) {
    if (node.matches('@at-root')) {
        return null;
    }
    const root = new RootElement();
    const parentRuleSets = [];
    const ruleSet = node.getParent();
    if (ruleSet instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
        let parent = ruleSet.getParent(); // parent of the selector's ruleset
        while(parent && !isNewSelectorContext(parent)){
            if (parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
                if (parent.getSelectors().matches('@at-root')) {
                    break;
                }
                parentRuleSets.push(parent);
            }
            parent = parent.getParent();
        }
    }
    const builder = new SelectorElementBuilder(root);
    for(let i = parentRuleSets.length - 1; i >= 0; i--){
        const selector = parentRuleSets[i].getSelectors().getChild(0);
        if (selector) {
            builder.processSelector(selector);
        }
    }
    builder.processSelector(node);
    return root;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssHover.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSHover",
    ()=>CSSHover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/entry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$selectorPrinting$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/selectorPrinting.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/objects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ class CSSHover {
    constructor(clientCapabilities, cssDataManager){
        this.clientCapabilities = clientCapabilities;
        this.cssDataManager = cssDataManager;
        this.selectorPrinting = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$selectorPrinting$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectorPrinting"](cssDataManager);
    }
    configure(settings) {
        this.defaultSettings = settings;
    }
    doHover(document, position, stylesheet, settings = this.defaultSettings) {
        function getRange(node) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(node.offset), document.positionAt(node.end));
        }
        const offset = document.offsetAt(position);
        const nodepath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodePath"])(stylesheet, offset);
        /**
         * nodepath is top-down
         * Build up the hover by appending inner node's information
         */ let hover = null;
        let flagOpts;
        for(let i = 0; i < nodepath.length; i++){
            const node = nodepath[i];
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Media"]) {
                const regex = /@media[^\{]+/g;
                const matches = node.getText().match(regex);
                flagOpts = {
                    isMedia: true,
                    text: matches?.[0]
                };
            }
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selector"]) {
                hover = {
                    contents: this.selectorPrinting.selectorToMarkedString(node, flagOpts),
                    range: getRange(node)
                };
                break;
            }
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"]) {
                /**
                 * Some sass specific at rules such as `@at-root` are parsed as `SimpleSelector`
                 */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(node.getText(), '@')) {
                    hover = {
                        contents: this.selectorPrinting.simpleSelectorToMarkedString(node),
                        range: getRange(node)
                    };
                }
                break;
            }
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
                const propertyName = node.getFullPropertyName();
                const entry = this.cssDataManager.getProperty(propertyName);
                if (entry) {
                    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown(), settings);
                    if (contents) {
                        hover = {
                            contents,
                            range: getRange(node)
                        };
                    } else {
                        hover = null;
                    }
                }
                continue;
            }
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnknownAtRule"]) {
                const atRuleName = node.getText();
                const entry = this.cssDataManager.getAtDirective(atRuleName);
                if (entry) {
                    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown(), settings);
                    if (contents) {
                        hover = {
                            contents,
                            range: getRange(node)
                        };
                    } else {
                        hover = null;
                    }
                }
                continue;
            }
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"] && node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector) {
                const selectorName = node.getText();
                const entry = selectorName.slice(0, 2) === '::' ? this.cssDataManager.getPseudoElement(selectorName) : this.cssDataManager.getPseudoClass(selectorName);
                if (entry) {
                    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryDescription"])(entry, this.doesSupportMarkdown(), settings);
                    if (contents) {
                        hover = {
                            contents,
                            range: getRange(node)
                        };
                    } else {
                        hover = null;
                    }
                }
                continue;
            }
        }
        if (hover) {
            hover.contents = this.convertContents(hover.contents);
        }
        return hover;
    }
    convertContents(contents) {
        if (!this.doesSupportMarkdown()) {
            if (typeof contents === 'string') {
                return contents;
            } else if ('kind' in contents) {
                return {
                    kind: 'plaintext',
                    value: contents.value
                };
            } else if (Array.isArray(contents)) {
                return contents.map((c)=>{
                    return typeof c === 'string' ? c : c.value;
                });
            } else {
                return contents.value;
            }
        }
        return contents;
    }
    doesSupportMarkdown() {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(this.supportsMarkdown)) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(this.clientCapabilities)) {
                this.supportsMarkdown = true;
                return this.supportsMarkdown;
            }
            const hover = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.hover;
            this.supportsMarkdown = hover && hover.contentFormat && Array.isArray(hover.contentFormat) && hover.contentFormat.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].Markdown) !== -1;
        }
        return this.supportsMarkdown;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssNavigation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSNavigation",
    ()=>CSSNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssSymbolScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssSymbolScope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/resources.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ const startsWithSchemeRegex = /^\w+:\/\//;
const startsWithData = /^data:/;
class CSSNavigation {
    constructor(fileSystemProvider, resolveModuleReferences){
        this.fileSystemProvider = fileSystemProvider;
        this.resolveModuleReferences = resolveModuleReferences;
    }
    configure(settings) {
        this.defaultSettings = settings;
    }
    findDefinition(document, position, stylesheet) {
        const symbols = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssSymbolScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Symbols"](stylesheet);
        const offset = document.offsetAt(position);
        const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAtOffset"])(stylesheet, offset);
        if (!node) {
            return null;
        }
        const symbol = symbols.findSymbolFromNode(node);
        if (!symbol) {
            return null;
        }
        return {
            uri: document.uri,
            range: getRange(symbol.node, document)
        };
    }
    findReferences(document, position, stylesheet) {
        const highlights = this.findDocumentHighlights(document, position, stylesheet);
        return highlights.map((h)=>{
            return {
                uri: document.uri,
                range: h.range
            };
        });
    }
    getHighlightNode(document, position, stylesheet) {
        const offset = document.offsetAt(position);
        let node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAtOffset"])(stylesheet, offset);
        if (!node || node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Stylesheet || node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declarations) {
            return;
        }
        if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Identifier && node.parent && node.parent.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ClassSelector) {
            node = node.parent;
        }
        return node;
    }
    findDocumentHighlights(document, position, stylesheet) {
        const result = [];
        const node = this.getHighlightNode(document, position, stylesheet);
        if (!node) {
            return result;
        }
        const symbols = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssSymbolScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Symbols"](stylesheet);
        const symbol = symbols.findSymbolFromNode(node);
        const name = node.getText();
        stylesheet.accept((candidate)=>{
            if (symbol) {
                if (symbols.matchesSymbol(candidate, symbol)) {
                    result.push({
                        kind: getHighlightKind(candidate),
                        range: getRange(candidate, document)
                    });
                    return false;
                }
            } else if (node && node.type === candidate.type && candidate.matches(name)) {
                // Same node type and data
                result.push({
                    kind: getHighlightKind(candidate),
                    range: getRange(candidate, document)
                });
            }
            return true;
        });
        return result;
    }
    isRawStringDocumentLinkNode(node) {
        return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Import;
    }
    findDocumentLinks(document, stylesheet, documentContext) {
        const linkData = this.findUnresolvedLinks(document, stylesheet);
        const resolvedLinks = [];
        for (let data of linkData){
            const link = data.link;
            const target = link.target;
            if (!target || startsWithData.test(target)) ;
            else if (startsWithSchemeRegex.test(target)) {
                resolvedLinks.push(link);
            } else {
                const resolved = documentContext.resolveReference(target, document.uri);
                if (resolved) {
                    link.target = resolved;
                }
                resolvedLinks.push(link);
            }
        }
        return resolvedLinks;
    }
    async findDocumentLinks2(document, stylesheet, documentContext) {
        const linkData = this.findUnresolvedLinks(document, stylesheet);
        const resolvedLinks = [];
        for (let data of linkData){
            const link = data.link;
            const target = link.target;
            if (!target || startsWithData.test(target)) ;
            else if (startsWithSchemeRegex.test(target)) {
                resolvedLinks.push(link);
            } else {
                const resolvedTarget = await this.resolveReference(target, document.uri, documentContext, data.isRawLink);
                if (resolvedTarget !== undefined) {
                    link.target = resolvedTarget;
                    resolvedLinks.push(link);
                }
            }
        }
        return resolvedLinks;
    }
    findUnresolvedLinks(document, stylesheet) {
        const result = [];
        const collect = (uriStringNode)=>{
            let rawUri = uriStringNode.getText();
            const range = getRange(uriStringNode, document);
            // Make sure the range is not empty
            if (range.start.line === range.end.line && range.start.character === range.end.character) {
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(rawUri, `'`) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(rawUri, `"`)) {
                rawUri = rawUri.slice(1, -1);
            }
            const isRawLink = uriStringNode.parent ? this.isRawStringDocumentLinkNode(uriStringNode.parent) : false;
            result.push({
                link: {
                    target: rawUri,
                    range
                },
                isRawLink
            });
        };
        stylesheet.accept((candidate)=>{
            if (candidate.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].URILiteral) {
                const first = candidate.getChild(0);
                if (first) {
                    collect(first);
                }
                return false;
            }
            /**
             * In @import, it is possible to include links that do not use `url()`
             * For example, `@import 'foo.css';`
             */ if (candidate.parent && this.isRawStringDocumentLinkNode(candidate.parent)) {
                const rawText = candidate.getText();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(rawText, `'`) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(rawText, `"`)) {
                    collect(candidate);
                }
                return false;
            }
            return true;
        });
        return result;
    }
    findSymbolInformations(document, stylesheet) {
        const result = [];
        const addSymbolInformation = (name, kind, symbolNodeOrRange)=>{
            const range = symbolNodeOrRange instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"] ? getRange(symbolNodeOrRange, document) : symbolNodeOrRange;
            const entry = {
                name: name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('<undefined>'),
                kind,
                location: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Location"].create(document.uri, range)
            };
            result.push(entry);
        };
        this.collectDocumentSymbols(document, stylesheet, addSymbolInformation);
        return result;
    }
    findDocumentSymbols(document, stylesheet) {
        const result = [];
        const parents = [];
        const addDocumentSymbol = (name, kind, symbolNodeOrRange, nameNodeOrRange, bodyNode)=>{
            const range = symbolNodeOrRange instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"] ? getRange(symbolNodeOrRange, document) : symbolNodeOrRange;
            let selectionRange = nameNodeOrRange instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"] ? getRange(nameNodeOrRange, document) : nameNodeOrRange;
            if (!selectionRange || !containsRange(range, selectionRange)) {
                selectionRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(range.start, range.start);
            }
            const entry = {
                name: name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('<undefined>'),
                kind,
                range,
                selectionRange
            };
            let top = parents.pop();
            while(top && !containsRange(top[1], range)){
                top = parents.pop();
            }
            if (top) {
                const topSymbol = top[0];
                if (!topSymbol.children) {
                    topSymbol.children = [];
                }
                topSymbol.children.push(entry);
                parents.push(top); // put back top
            } else {
                result.push(entry);
            }
            if (bodyNode) {
                parents.push([
                    entry,
                    getRange(bodyNode, document)
                ]);
            }
        };
        this.collectDocumentSymbols(document, stylesheet, addDocumentSymbol);
        return result;
    }
    collectDocumentSymbols(document, stylesheet, collect) {
        stylesheet.accept((node)=>{
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]) {
                for (const selector of node.getSelectors().getChildren()){
                    if (selector instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selector"]) {
                        const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(selector.offset), document.positionAt(node.end));
                        collect(selector.getText(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Class, range, selector, node.getDeclarations());
                    }
                }
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableDeclaration"]) {
                collect(node.getName(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Variable, node, node.getVariable(), undefined);
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinDeclaration"]) {
                collect(node.getName(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Method, node, node.getIdentifier(), node.getDeclarations());
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionDeclaration"]) {
                collect(node.getName(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Function, node, node.getIdentifier(), node.getDeclarations());
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keyframe"]) {
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("@keyframes {0}", node.getName());
                collect(name, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Class, node, node.getIdentifier(), node.getDeclarations());
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontFace"]) {
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("@font-face");
                collect(name, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Class, node, undefined, node.getDeclarations());
            } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Media"]) {
                const mediaList = node.getChild(0);
                if (mediaList instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Medialist"]) {
                    const name = '@media ' + mediaList.getText();
                    collect(name, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymbolKind"].Module, node, mediaList, node.getDeclarations());
                }
            }
            return true;
        });
    }
    findDocumentColors(document, stylesheet) {
        const result = [];
        stylesheet.accept((node)=>{
            const colorInfo = getColorInformation(node, document);
            if (colorInfo) {
                result.push(colorInfo);
            }
            return true;
        });
        return result;
    }
    getColorPresentations(document, stylesheet, color, range) {
        const result = [];
        const red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
        let label;
        if (color.alpha === 1) {
            label = `rgb(${red256}, ${green256}, ${blue256})`;
        } else {
            label = `rgba(${red256}, ${green256}, ${blue256}, ${color.alpha})`;
        }
        result.push({
            label: label,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(range, label)
        });
        if (color.alpha === 1) {
            label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}`;
        } else {
            label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}${toTwoDigitHex(Math.round(color.alpha * 255))}`;
        }
        result.push({
            label: label,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(range, label)
        });
        const hsl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hslFromColor"])(color);
        if (hsl.a === 1) {
            label = `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
        } else {
            label = `hsla(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%, ${hsl.a})`;
        }
        result.push({
            label: label,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(range, label)
        });
        const hwb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hwbFromColor"])(color);
        if (hwb.a === 1) {
            label = `hwb(${hwb.h} ${Math.round(hwb.w * 100)}% ${Math.round(hwb.b * 100)}%)`;
        } else {
            label = `hwb(${hwb.h} ${Math.round(hwb.w * 100)}% ${Math.round(hwb.b * 100)}% / ${hwb.a})`;
        }
        result.push({
            label: label,
            textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(range, label)
        });
        return result;
    }
    prepareRename(document, position, stylesheet) {
        const node = this.getHighlightNode(document, position, stylesheet);
        if (node) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(node.offset), document.positionAt(node.end));
        }
    }
    doRename(document, position, newName, stylesheet) {
        const highlights = this.findDocumentHighlights(document, position, stylesheet);
        const edits = highlights.map((h)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(h.range, newName));
        return {
            changes: {
                [document.uri]: edits
            }
        };
    }
    async resolveModuleReference(ref, documentUri, documentContext) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(documentUri, 'file://')) {
            const moduleName = getModuleNameFromPath(ref);
            if (moduleName && moduleName !== '.' && moduleName !== '..') {
                const rootFolderUri = documentContext.resolveReference('/', documentUri);
                const documentFolderUri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dirname"])(documentUri);
                const modulePath = await this.resolvePathToModule(moduleName, documentFolderUri, rootFolderUri);
                if (modulePath) {
                    const pathWithinModule = ref.substring(moduleName.length + 1);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(modulePath, pathWithinModule);
                }
            }
        }
        return undefined;
    }
    async mapReference(target, isRawLink) {
        return target;
    }
    async resolveReference(target, documentUri, documentContext, isRawLink = false, settings = this.defaultSettings) {
        // Following [css-loader](https://github.com/webpack-contrib/css-loader#url)
        // and [sass-loader's](https://github.com/webpack-contrib/sass-loader#imports)
        // convention, if an import path starts with ~ then use node module resolution
        // *unless* it starts with "~/" as this refers to the user's home directory.
        if (target[0] === '~' && target[1] !== '/' && this.fileSystemProvider) {
            target = target.substring(1);
            return this.mapReference(await this.resolveModuleReference(target, documentUri, documentContext), isRawLink);
        }
        const ref = await this.mapReference(documentContext.resolveReference(target, documentUri), isRawLink);
        // Following [less-loader](https://github.com/webpack-contrib/less-loader#imports)
        // and [sass-loader's](https://github.com/webpack-contrib/sass-loader#resolving-import-at-rules)
        // new resolving import at-rules (~ is deprecated). The loader will first try to resolve @import as a relative path. If it cannot be resolved,
        // then the loader will try to resolve @import inside node_modules.
        if (this.resolveModuleReferences) {
            if (ref && await this.fileExists(ref)) {
                return ref;
            }
            const moduleReference = await this.mapReference(await this.resolveModuleReference(target, documentUri, documentContext), isRawLink);
            if (moduleReference) {
                return moduleReference;
            }
        }
        // Try resolving the reference from the language configuration alias settings
        if (ref && !await this.fileExists(ref)) {
            const rootFolderUri = documentContext.resolveReference('/', documentUri);
            if (settings && rootFolderUri) {
                // Specific file reference
                if (target in settings) {
                    return this.mapReference((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(rootFolderUri, settings[target]), isRawLink);
                }
                // Reference folder
                const firstSlash = target.indexOf('/');
                const prefix = `${target.substring(0, firstSlash)}/`;
                if (prefix in settings) {
                    const aliasPath = settings[prefix].slice(0, -1);
                    let newPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(rootFolderUri, aliasPath);
                    return this.mapReference(newPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(newPath, target.substring(prefix.length - 1)), isRawLink);
                }
            }
        }
        // fall back. it might not exists
        return ref;
    }
    async resolvePathToModule(_moduleName, documentFolderUri, rootFolderUri) {
        // resolve the module relative to the document. We can't use `require` here as the code is webpacked.
        const packPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinPath"])(documentFolderUri, 'node_modules', _moduleName, 'package.json');
        if (await this.fileExists(packPath)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dirname"])(packPath);
        } else if (rootFolderUri && documentFolderUri.startsWith(rootFolderUri) && documentFolderUri.length !== rootFolderUri.length) {
            return this.resolvePathToModule(_moduleName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dirname"])(documentFolderUri), rootFolderUri);
        }
        return undefined;
    }
    async fileExists(uri) {
        if (!this.fileSystemProvider) {
            return false;
        }
        try {
            const stat = await this.fileSystemProvider.stat(uri);
            if (stat.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FileType"].Unknown && stat.size === -1) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }
}
function getColorInformation(node, document) {
    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(node);
    if (color) {
        const range = getRange(node, document);
        return {
            color,
            range
        };
    }
    return null;
}
function getRange(node, document) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(node.offset), document.positionAt(node.end));
}
/**
 * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
 */ function containsRange(range, otherRange) {
    const otherStartLine = otherRange.start.line, otherEndLine = otherRange.end.line;
    const rangeStartLine = range.start.line, rangeEndLine = range.end.line;
    if (otherStartLine < rangeStartLine || otherEndLine < rangeStartLine) {
        return false;
    }
    if (otherStartLine > rangeEndLine || otherEndLine > rangeEndLine) {
        return false;
    }
    if (otherStartLine === rangeStartLine && otherRange.start.character < range.start.character) {
        return false;
    }
    if (otherEndLine === rangeEndLine && otherRange.end.character > range.end.character) {
        return false;
    }
    return true;
}
function getHighlightKind(node) {
    if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Selector) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentHighlightKind"].Write;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]) {
        if (node.parent && node.parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Property"]) {
            if (node.isCustomProperty) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentHighlightKind"].Write;
            }
        }
    }
    if (node.parent) {
        switch(node.parent.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionDeclaration:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Keyframe:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].VariableDeclaration:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionParameter:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentHighlightKind"].Write;
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentHighlightKind"].Read;
}
function toTwoDigitHex(n) {
    const r = n.toString(16);
    return r.length !== 2 ? '0' + r : r;
}
function getModuleNameFromPath(path) {
    const firstSlash = path.indexOf('/');
    if (firstSlash === -1) {
        return '';
    }
    // If a scoped module (starts with @) then get up until second instance of '/', or to the end of the string for root-level imports.
    if (path[0] === '@') {
        const secondSlash = path.indexOf('/', firstSlash + 1);
        if (secondSlash === -1) {
            return path;
        }
        return path.substring(0, secondSlash);
    }
    // Otherwise get until first instance of '/'
    return path.substring(0, firstSlash);
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintRules.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LintConfigurationSettings",
    ()=>LintConfigurationSettings,
    "Rule",
    ()=>Rule,
    "Rules",
    ()=>Rules,
    "Setting",
    ()=>Setting,
    "Settings",
    ()=>Settings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const Warning = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Warning;
const Error = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Error;
const Ignore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Ignore;
class Rule {
    constructor(id, message, defaultValue){
        this.id = id;
        this.message = message;
        this.defaultValue = defaultValue;
    // nothing to do
    }
}
class Setting {
    constructor(id, message, defaultValue){
        this.id = id;
        this.message = message;
        this.defaultValue = defaultValue;
    // nothing to do
    }
}
const Rules = {
    AllVendorPrefixes: new Rule('compatibleVendorPrefixes', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("When using a vendor-specific prefix make sure to also include all other vendor-specific properties"), Ignore),
    IncludeStandardPropertyWhenUsingVendorPrefix: new Rule('vendorPrefix', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("When using a vendor-specific prefix also include the standard property"), Warning),
    DuplicateDeclarations: new Rule('duplicateProperties', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Do not use duplicate style definitions"), Ignore),
    EmptyRuleSet: new Rule('emptyRules', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Do not use empty rulesets"), Warning),
    ImportStatemement: new Rule('importStatement', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Import statements do not load in parallel"), Ignore),
    BewareOfBoxModelSize: new Rule('boxModel', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Do not use width or height when using padding or border"), Ignore),
    UniversalSelector: new Rule('universalSelector', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("The universal selector (*) is known to be slow"), Ignore),
    ZeroWithUnit: new Rule('zeroUnits', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("No unit for zero needed"), Ignore),
    RequiredPropertiesForFontFace: new Rule('fontFaceProperties', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("@font-face rule must define 'src' and 'font-family' properties"), Warning),
    HexColorLength: new Rule('hexColorLength', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Hex colors must consist of three, four, six or eight hex numbers"), Error),
    ArgsInColorFunction: new Rule('argumentsInColorFunction', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Invalid number of parameters"), Error),
    UnknownProperty: new Rule('unknownProperties', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Unknown property."), Warning),
    UnknownAtRules: new Rule('unknownAtRules', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Unknown at-rule."), Warning),
    IEStarHack: new Rule('ieHack', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("IE hacks are only necessary when supporting IE7 and older"), Ignore),
    UnknownVendorSpecificProperty: new Rule('unknownVendorSpecificProperties', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Unknown vendor specific property."), Ignore),
    PropertyIgnoredDueToDisplay: new Rule('propertyIgnoredDueToDisplay', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Property is ignored due to the display."), Warning),
    AvoidImportant: new Rule('important', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored."), Ignore),
    AvoidFloat: new Rule('float', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes."), Ignore),
    AvoidIdSelector: new Rule('idSelector', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Selectors should not contain IDs because these rules are too tightly coupled with the HTML."), Ignore)
};
const Settings = {
    ValidProperties: new Setting('validProperties', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("A list of properties that are not validated against the `unknownProperties` rule."), [])
};
class LintConfigurationSettings {
    constructor(conf = {}){
        this.conf = conf;
    }
    getRule(rule) {
        if (this.conf.hasOwnProperty(rule.id)) {
            const level = toLevel(this.conf[rule.id]);
            if (level) {
                return level;
            }
        }
        return rule.defaultValue;
    }
    getSetting(setting) {
        return this.conf[setting.id];
    }
}
function toLevel(level) {
    switch(level){
        case 'ignore':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Ignore;
        case 'warning':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Warning;
        case 'error':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Error;
    }
    return null;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCodeActions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSCodeActions",
    ()=>CSSCodeActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class CSSCodeActions {
    constructor(cssDataManager){
        this.cssDataManager = cssDataManager;
    }
    doCodeActions(document, range, context, stylesheet) {
        return this.doCodeActions2(document, range, context, stylesheet).map((ca)=>{
            const textDocumentEdit = ca.edit && ca.edit.documentChanges && ca.edit.documentChanges[0];
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].create(ca.title, '_css.applyCodeAction', document.uri, document.version, textDocumentEdit && textDocumentEdit.edits);
        });
    }
    doCodeActions2(document, range, context, stylesheet) {
        const result = [];
        if (context.diagnostics) {
            for (const diagnostic of context.diagnostics){
                this.appendFixesForMarker(document, stylesheet, diagnostic, result);
            }
        }
        return result;
    }
    getFixesForUnknownProperty(document, property, marker, result) {
        const propertyName = property.getName();
        const candidates = [];
        this.cssDataManager.getProperties().forEach((p)=>{
            const score = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["difference"])(propertyName, p.name);
            if (score >= propertyName.length / 2 /*score_lim*/ ) {
                candidates.push({
                    property: p.name,
                    score
                });
            }
        });
        // Sort in descending order.
        candidates.sort((a, b)=>{
            return b.score - a.score || a.property.localeCompare(b.property);
        });
        let maxActions = 3;
        for (const candidate of candidates){
            const propertyName = candidate.property;
            const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Rename to '{0}'", propertyName);
            const edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(marker.range, propertyName);
            const documentIdentifier = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VersionedTextDocumentIdentifier"].create(document.uri, document.version);
            const workspaceEdit = {
                documentChanges: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextDocumentEdit"].create(documentIdentifier, [
                        edit
                    ])
                ]
            };
            const codeAction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeAction"].create(title, workspaceEdit, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeActionKind"].QuickFix);
            codeAction.diagnostics = [
                marker
            ];
            result.push(codeAction);
            if (--maxActions <= 0) {
                return;
            }
        }
    }
    appendFixesForMarker(document, stylesheet, marker, result) {
        if (marker.code !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].UnknownProperty.id) {
            return;
        }
        const offset = document.offsetAt(marker.range.start);
        const end = document.offsetAt(marker.range.end);
        const nodepath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodePath"])(stylesheet, offset);
        for(let i = nodepath.length - 1; i >= 0; i--){
            const node = nodepath[i];
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
                const property = node.getProperty();
                if (property && property.offset === offset && property.end === end) {
                    this.getFixesForUnknownProperty(document, property, marker, result);
                    return;
                }
            }
        }
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Element",
    ()=>Element,
    "default",
    ()=>calculateBoxModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/arrays.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class Element {
    constructor(decl){
        this.fullPropertyName = decl.getFullPropertyName().toLowerCase();
        this.node = decl;
    }
}
function setSide(model, side, value, property) {
    const state = model[side];
    state.value = value;
    if (value) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["includes"])(state.properties, property)) {
            state.properties.push(property);
        }
    }
}
function setAllSides(model, value, property) {
    setSide(model, 'top', value, property);
    setSide(model, 'right', value, property);
    setSide(model, 'bottom', value, property);
    setSide(model, 'left', value, property);
}
function updateModelWithValue(model, side, value, property) {
    if (side === 'top' || side === 'right' || side === 'bottom' || side === 'left') {
        setSide(model, side, value, property);
    } else {
        setAllSides(model, value, property);
    }
}
function updateModelWithList(model, values, property) {
    switch(values.length){
        case 1:
            updateModelWithValue(model, undefined, values[0], property);
            break;
        case 2:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'bottom', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'left', values[1], property);
            break;
        case 3:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'left', values[1], property);
            updateModelWithValue(model, 'bottom', values[2], property);
            break;
        case 4:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'bottom', values[2], property);
            updateModelWithValue(model, 'left', values[3], property);
            break;
    }
}
function matches(value, candidates) {
    for (let candidate of candidates){
        if (value.matches(candidate)) {
            return true;
        }
    }
    return false;
}
/**
 * @param allowsKeywords whether the initial value of property is zero, so keywords `initial` and `unset` count as zero
 * @return `true` if this node represents a non-zero border; otherwise, `false`
 */ function checkLineWidth(value, allowsKeywords = true) {
    if (allowsKeywords && matches(value, [
        'initial',
        'unset'
    ])) {
        return false;
    }
    // a <length> is a value and a unit
    // so use `parseFloat` to strip the unit
    return parseFloat(value.getText()) !== 0;
}
function checkLineWidthList(nodes, allowsKeywords = true) {
    return nodes.map((node)=>checkLineWidth(node, allowsKeywords));
}
/**
 * @param allowsKeywords whether keywords `initial` and `unset` count as zero
 * @return `true` if this node represents a non-zero border; otherwise, `false`
 */ function checkLineStyle(valueNode, allowsKeywords = true) {
    if (matches(valueNode, [
        'none',
        'hidden'
    ])) {
        return false;
    }
    if (allowsKeywords && matches(valueNode, [
        'initial',
        'unset'
    ])) {
        return false;
    }
    return true;
}
function checkLineStyleList(nodes, allowsKeywords = true) {
    return nodes.map((node)=>checkLineStyle(node, allowsKeywords));
}
function checkBorderShorthand(node) {
    const children = node.getChildren();
    // the only child can be a keyword, a <line-width>, or a <line-style>
    // if either check returns false, the result is no border
    if (children.length === 1) {
        const value = children[0];
        return checkLineWidth(value) && checkLineStyle(value);
    }
    // multiple children can't contain keywords
    // if any child means no border, the result is no border
    for (const child of children){
        const value = child;
        if (!checkLineWidth(value, /* allowsKeywords: */ false) || !checkLineStyle(value, /* allowsKeywords: */ false)) {
            return false;
        }
    }
    return true;
}
function calculateBoxModel(propertyTable) {
    const model = {
        top: {
            value: false,
            properties: []
        },
        right: {
            value: false,
            properties: []
        },
        bottom: {
            value: false,
            properties: []
        },
        left: {
            value: false,
            properties: []
        }
    };
    for (const property of propertyTable){
        const value = property.node.value;
        if (typeof value === 'undefined') {
            continue;
        }
        switch(property.fullPropertyName){
            case 'box-sizing':
                // has `box-sizing`, bail out
                return {
                    top: {
                        value: false,
                        properties: []
                    },
                    right: {
                        value: false,
                        properties: []
                    },
                    bottom: {
                        value: false,
                        properties: []
                    },
                    left: {
                        value: false,
                        properties: []
                    }
                };
            case 'width':
                model.width = property;
                break;
            case 'height':
                model.height = property;
                break;
            default:
                const segments = property.fullPropertyName.split('-');
                switch(segments[0]){
                    case 'border':
                        switch(segments[1]){
                            case undefined:
                            case 'top':
                            case 'right':
                            case 'bottom':
                            case 'left':
                                switch(segments[2]){
                                    case undefined:
                                        updateModelWithValue(model, segments[1], checkBorderShorthand(value), property);
                                        break;
                                    case 'width':
                                        // the initial value of `border-width` is `medium`, not zero
                                        updateModelWithValue(model, segments[1], checkLineWidth(value, false), property);
                                        break;
                                    case 'style':
                                        // the initial value of `border-style` is `none`
                                        updateModelWithValue(model, segments[1], checkLineStyle(value, true), property);
                                        break;
                                }
                                break;
                            case 'width':
                                // the initial value of `border-width` is `medium`, not zero
                                updateModelWithList(model, checkLineWidthList(value.getChildren(), false), property);
                                break;
                            case 'style':
                                // the initial value of `border-style` is `none`
                                updateModelWithList(model, checkLineStyleList(value.getChildren(), true), property);
                                break;
                        }
                        break;
                    case 'padding':
                        if (segments.length === 1) {
                            // the initial value of `padding` is zero
                            updateModelWithList(model, checkLineWidthList(value.getChildren(), true), property);
                        } else {
                            // the initial value of `padding` is zero
                            updateModelWithValue(model, segments[1], checkLineWidth(value, true), property);
                        }
                        break;
                }
                break;
        }
    }
    return model;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LintVisitor",
    ()=>LintVisitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/builtinData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintUtil.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ class NodesByRootMap {
    constructor(){
        this.data = {};
    }
    add(root, name, node) {
        let entry = this.data[root];
        if (!entry) {
            entry = {
                nodes: [],
                names: []
            };
            this.data[root] = entry;
        }
        entry.names.push(name);
        if (node) {
            entry.nodes.push(node);
        }
    }
}
class LintVisitor {
    static entries(node, document, settings, cssDataManager, entryFilter) {
        const visitor = new LintVisitor(document, settings, cssDataManager);
        node.acceptVisitor(visitor);
        visitor.completeValidations();
        return visitor.getEntries(entryFilter);
    }
    constructor(document, settings, cssDataManager){
        this.cssDataManager = cssDataManager;
        this.warnings = [];
        this.settings = settings;
        this.documentText = document.getText();
        this.keyframes = new NodesByRootMap();
        this.validProperties = {};
        const properties = settings.getSetting(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Settings"].ValidProperties);
        if (Array.isArray(properties)) {
            properties.forEach((p)=>{
                if (typeof p === 'string') {
                    const name = p.trim().toLowerCase();
                    if (name.length) {
                        this.validProperties[name] = true;
                    }
                }
            });
        }
    }
    isValidPropertyDeclaration(element) {
        const propertyName = element.fullPropertyName;
        return this.validProperties[propertyName];
    }
    fetch(input, s) {
        const elements = [];
        for (const curr of input){
            if (curr.fullPropertyName === s) {
                elements.push(curr);
            }
        }
        return elements;
    }
    fetchWithValue(input, s, v) {
        const elements = [];
        for (const inputElement of input){
            if (inputElement.fullPropertyName === s) {
                const expression = inputElement.node.getValue();
                if (expression && this.findValueInExpression(expression, v)) {
                    elements.push(inputElement);
                }
            }
        }
        return elements;
    }
    findValueInExpression(expression, v) {
        let found = false;
        expression.accept((node)=>{
            if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Identifier && node.matches(v)) {
                found = true;
            }
            return !found;
        });
        return found;
    }
    getEntries(filter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Warning | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Error) {
        return this.warnings.filter((entry)=>{
            return (entry.getLevel() & filter) !== 0;
        });
    }
    addEntry(node, rule, details) {
        const entry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"](node, rule, this.settings.getRule(rule), details);
        this.warnings.push(entry);
    }
    getMissingNames(expected, actual) {
        const expectedClone = expected.slice(0); // clone
        for(let i = 0; i < actual.length; i++){
            const k = expectedClone.indexOf(actual[i]);
            if (k !== -1) {
                expectedClone[k] = null;
            }
        }
        let result = null;
        for(let i = 0; i < expectedClone.length; i++){
            const curr = expectedClone[i];
            if (curr) {
                if (result === null) {
                    result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("'{0}'", curr);
                } else {
                    result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("{0}, '{1}'", result, curr);
                }
            }
        }
        return result;
    }
    visitNode(node) {
        switch(node.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].UnknownAtRule:
                return this.visitUnknownAtRule(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Keyframe:
                return this.visitKeyframe(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FontFace:
                return this.visitFontFace(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Ruleset:
                return this.visitRuleSet(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SimpleSelector:
                return this.visitSimpleSelector(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Function:
                return this.visitFunction(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].NumericValue:
                return this.visitNumericValue(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Import:
                return this.visitImport(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].HexColorValue:
                return this.visitHexColorValue(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Prio:
                return this.visitPrio(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].IdentifierSelector:
                return this.visitIdentifierSelector(node);
        }
        return true;
    }
    completeValidations() {
        this.validateKeyframes();
    }
    visitUnknownAtRule(node) {
        const atRuleName = node.getChild(0);
        if (!atRuleName) {
            return false;
        }
        const atDirective = this.cssDataManager.getAtDirective(atRuleName.getText());
        if (atDirective) {
            return false;
        }
        this.addEntry(atRuleName, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].UnknownAtRules, `Unknown at rule ${atRuleName.getText()}`);
        return true;
    }
    visitKeyframe(node) {
        const keyword = node.getKeyword();
        if (!keyword) {
            return false;
        }
        const text = keyword.getText();
        this.keyframes.add(node.getName(), text, text !== '@keyframes' ? keyword : null);
        return true;
    }
    validateKeyframes() {
        // @keyframe and it's vendor specific alternatives
        // @keyframe should be included
        const expected = [
            '@-webkit-keyframes',
            '@-moz-keyframes',
            '@-o-keyframes'
        ];
        for(const name in this.keyframes.data){
            const actual = this.keyframes.data[name].names;
            const needsStandard = actual.indexOf('@keyframes') === -1;
            if (!needsStandard && actual.length === 1) {
                continue; // only the non-vendor specific keyword is used, that's fine, no warning
            }
            const missingVendorSpecific = this.getMissingNames(expected, actual);
            if (missingVendorSpecific || needsStandard) {
                for (const node of this.keyframes.data[name].nodes){
                    if (needsStandard) {
                        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Always define standard rule '@keyframes' when defining keyframes.");
                        this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].IncludeStandardPropertyWhenUsingVendorPrefix, message);
                    }
                    if (missingVendorSpecific) {
                        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Always include all vendor specific rules: Missing: {0}", missingVendorSpecific);
                        this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].AllVendorPrefixes, message);
                    }
                }
            }
        }
        return true;
    }
    visitSimpleSelector(node) {
        /////////////////////////////////////////////////////////////
        //	Lint - The universal selector (*) is known to be slow.
        /////////////////////////////////////////////////////////////
        const firstChar = this.documentText.charAt(node.offset);
        if (node.length === 1 && firstChar === '*') {
            this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].UniversalSelector);
        }
        return true;
    }
    visitIdentifierSelector(node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Avoid id selectors
        /////////////////////////////////////////////////////////////
        this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].AvoidIdSelector);
        return true;
    }
    visitImport(node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Import statements shouldn't be used, because they aren't offering parallel downloads.
        /////////////////////////////////////////////////////////////
        this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].ImportStatemement);
        return true;
    }
    visitRuleSet(node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Don't use empty rulesets.
        /////////////////////////////////////////////////////////////
        const declarations = node.getDeclarations();
        if (!declarations) {
            // syntax error
            return false;
        }
        if (!declarations.hasChildren()) {
            this.addEntry(node.getSelectors(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].EmptyRuleSet);
        }
        const propertyTable = [];
        for (const element of declarations.getChildren()){
            if (element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
                propertyTable.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Element"](element));
            }
        }
        /////////////////////////////////////////////////////////////
        // the rule warns when it finds:
        // width being used with border, border-left, border-right, padding, padding-left, or padding-right
        // height being used with border, border-top, border-bottom, padding, padding-top, or padding-bottom
        // No error when box-sizing property is specified, as it assumes the user knows what he's doing.
        // see https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size
        /////////////////////////////////////////////////////////////
        const boxModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(propertyTable);
        if (boxModel.width) {
            let properties = [];
            if (boxModel.right.value) {
                properties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(properties, boxModel.right.properties);
            }
            if (boxModel.left.value) {
                properties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(properties, boxModel.left.properties);
            }
            if (properties.length !== 0) {
                for (const item of properties){
                    this.addEntry(item.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].BewareOfBoxModelSize);
                }
                this.addEntry(boxModel.width.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].BewareOfBoxModelSize);
            }
        }
        if (boxModel.height) {
            let properties = [];
            if (boxModel.top.value) {
                properties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(properties, boxModel.top.properties);
            }
            if (boxModel.bottom.value) {
                properties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(properties, boxModel.bottom.properties);
            }
            if (properties.length !== 0) {
                for (const item of properties){
                    this.addEntry(item.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].BewareOfBoxModelSize);
                }
                this.addEntry(boxModel.height.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].BewareOfBoxModelSize);
            }
        }
        /////////////////////////////////////////////////////////////
        //	Properties ignored due to display
        /////////////////////////////////////////////////////////////
        // With 'display: inline-block', 'float' has no effect
        let displayElems = this.fetchWithValue(propertyTable, 'display', 'inline-block');
        if (displayElems.length > 0) {
            const elem = this.fetch(propertyTable, 'float');
            for(let index = 0; index < elem.length; index++){
                const node = elem[index].node;
                const value = node.getValue();
                if (value && !value.matches('none')) {
                    this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].PropertyIgnoredDueToDisplay, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'"));
                }
            }
        }
        // With 'display: block', 'vertical-align' has no effect
        displayElems = this.fetchWithValue(propertyTable, 'display', 'block');
        if (displayElems.length > 0) {
            const elem = this.fetch(propertyTable, 'vertical-align');
            for(let index = 0; index < elem.length; index++){
                this.addEntry(elem[index].node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].PropertyIgnoredDueToDisplay, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Property is ignored due to the display. With 'display: block', vertical-align should not be used."));
            }
        }
        /////////////////////////////////////////////////////////////
        //	Avoid 'float'
        /////////////////////////////////////////////////////////////
        const elements = this.fetch(propertyTable, 'float');
        for(let index = 0; index < elements.length; index++){
            const element = elements[index];
            if (!this.isValidPropertyDeclaration(element)) {
                this.addEntry(element.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].AvoidFloat);
            }
        }
        /////////////////////////////////////////////////////////////
        //	Don't use duplicate declarations.
        /////////////////////////////////////////////////////////////
        for(let i = 0; i < propertyTable.length; i++){
            const element = propertyTable[i];
            if (element.fullPropertyName !== 'background' && !this.validProperties[element.fullPropertyName]) {
                const value = element.node.getValue();
                if (value && this.documentText.charAt(value.offset) !== '-') {
                    const elements = this.fetch(propertyTable, element.fullPropertyName);
                    if (elements.length > 1) {
                        for(let k = 0; k < elements.length; k++){
                            const value = elements[k].node.getValue();
                            if (value && this.documentText.charAt(value.offset) !== '-' && elements[k] !== element) {
                                this.addEntry(element.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].DuplicateDeclarations);
                            }
                        }
                    }
                }
            }
        }
        /////////////////////////////////////////////////////////////
        //	Unknown propery & When using a vendor-prefixed gradient, make sure to use them all.
        /////////////////////////////////////////////////////////////
        const isExportBlock = node.getSelectors().matches(":export");
        if (!isExportBlock) {
            const propertiesBySuffix = new NodesByRootMap();
            let containsUnknowns = false;
            for (const element of propertyTable){
                const decl = element.node;
                if (this.isCSSDeclaration(decl)) {
                    let name = element.fullPropertyName;
                    const firstChar = name.charAt(0);
                    if (firstChar === '-') {
                        if (name.charAt(1) !== '-') {
                            if (!this.cssDataManager.isKnownProperty(name) && !this.validProperties[name]) {
                                this.addEntry(decl.getProperty(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].UnknownVendorSpecificProperty);
                            }
                            const nonPrefixedName = decl.getNonPrefixedPropertyName();
                            propertiesBySuffix.add(nonPrefixedName, name, decl.getProperty());
                        }
                    } else {
                        const fullName = name;
                        if (firstChar === '*' || firstChar === '_') {
                            this.addEntry(decl.getProperty(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].IEStarHack);
                            name = name.substr(1);
                        }
                        // _property and *property might be contributed via custom data
                        if (!this.cssDataManager.isKnownProperty(fullName) && !this.cssDataManager.isKnownProperty(name)) {
                            if (!this.validProperties[name]) {
                                this.addEntry(decl.getProperty(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].UnknownProperty, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Unknown property: '{0}'", decl.getFullPropertyName()));
                            }
                        }
                        propertiesBySuffix.add(name, name, null); // don't pass the node as we don't show errors on the standard
                    }
                } else {
                    containsUnknowns = true;
                }
            }
            if (!containsUnknowns) {
                for(const suffix in propertiesBySuffix.data){
                    const entry = propertiesBySuffix.data[suffix];
                    const actual = entry.names;
                    const needsStandard = this.cssDataManager.isStandardProperty(suffix) && actual.indexOf(suffix) === -1;
                    if (!needsStandard && actual.length === 1) {
                        continue; // only the non-vendor specific rule is used, that's fine, no warning
                    }
                    /**
                     * We should ignore missing standard properties, if there's an explicit contextual reference to a
                     * vendor specific pseudo-element selector with the same vendor (prefix)
                     *
                     * (See https://github.com/microsoft/vscode/issues/164350)
                     */ const entriesThatNeedStandard = new Set(needsStandard ? entry.nodes : []);
                    if (needsStandard) {
                        const pseudoElements = this.getContextualVendorSpecificPseudoElements(node);
                        for (const node of entry.nodes){
                            const propertyName = node.getName();
                            const prefix = propertyName.substring(0, propertyName.length - suffix.length);
                            if (pseudoElements.some((x)=>x.startsWith(prefix))) {
                                entriesThatNeedStandard.delete(node);
                            }
                        }
                    }
                    const expected = [];
                    for(let i = 0, len = LintVisitor.prefixes.length; i < len; i++){
                        const prefix = LintVisitor.prefixes[i];
                        if (this.cssDataManager.isStandardProperty(prefix + suffix)) {
                            expected.push(prefix + suffix);
                        }
                    }
                    const missingVendorSpecific = this.getMissingNames(expected, actual);
                    if (missingVendorSpecific || needsStandard) {
                        for (const node of entry.nodes){
                            if (needsStandard && entriesThatNeedStandard.has(node)) {
                                const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Also define the standard property '{0}' for compatibility", suffix);
                                this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].IncludeStandardPropertyWhenUsingVendorPrefix, message);
                            }
                            if (missingVendorSpecific) {
                                const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Always include all vendor specific properties: Missing: {0}", missingVendorSpecific);
                                this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].AllVendorPrefixes, message);
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    /**
     * Walks up the syntax tree (starting from given `node`) and captures vendor
     * specific pseudo-element selectors.
     * @returns An array of vendor specific pseudo-elements; or empty if none
     * was found.
     */ getContextualVendorSpecificPseudoElements(node) {
        function walkDown(s, n) {
            for (const child of n.getChildren()){
                if (child.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector) {
                    const pseudoElement = child.getChildren()[0]?.getText();
                    if (pseudoElement) {
                        s.add(pseudoElement);
                    }
                }
                walkDown(s, child);
            }
        }
        function walkUp(s, n) {
            if (n.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Ruleset) {
                for (const selector of n.getSelectors().getChildren()){
                    walkDown(s, selector);
                }
            }
            return n.parent ? walkUp(s, n.parent) : undefined;
        }
        const result = new Set();
        walkUp(result, node);
        return Array.from(result);
    }
    visitPrio(node) {
        /////////////////////////////////////////////////////////////
        //	Don't use !important
        /////////////////////////////////////////////////////////////
        this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].AvoidImportant);
        return true;
    }
    visitNumericValue(node) {
        /////////////////////////////////////////////////////////////
        //	0 has no following unit
        /////////////////////////////////////////////////////////////
        const funcDecl = node.findParent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Function);
        if (funcDecl && funcDecl.getName() === 'calc') {
            return true;
        }
        const decl = node.findParent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declaration);
        if (decl) {
            const declValue = decl.getValue();
            if (declValue) {
                const value = node.getValue();
                if (!value.unit || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["units"].length.indexOf(value.unit.toLowerCase()) === -1) {
                    return true;
                }
                if (parseFloat(value.value) === 0.0 && !!value.unit && !this.validProperties[decl.getFullPropertyName()]) {
                    this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].ZeroWithUnit);
                }
            }
        }
        return true;
    }
    visitFontFace(node) {
        const declarations = node.getDeclarations();
        if (!declarations) {
            // syntax error
            return false;
        }
        let definesSrc = false, definesFontFamily = false;
        let containsUnknowns = false;
        for (const node of declarations.getChildren()){
            if (this.isCSSDeclaration(node)) {
                const name = node.getProperty().getName().toLowerCase();
                if (name === 'src') {
                    definesSrc = true;
                }
                if (name === 'font-family') {
                    definesFontFamily = true;
                }
            } else {
                containsUnknowns = true;
            }
        }
        if (!containsUnknowns && (!definesSrc || !definesFontFamily)) {
            this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].RequiredPropertiesForFontFace);
        }
        return true;
    }
    isCSSDeclaration(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]) {
            if (!node.getValue()) {
                return false;
            }
            const property = node.getProperty();
            if (!property) {
                return false;
            }
            const identifier = property.getIdentifier();
            if (!identifier || identifier.containsInterpolation()) {
                return false;
            }
            return true;
        }
        return false;
    }
    visitHexColorValue(node) {
        // Rule: #eeff0011 or #eeff00 or #ef01 or #ef0
        const length = node.length;
        if (length !== 9 && length !== 7 && length !== 5 && length !== 4) {
            this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].HexColorLength);
        }
        return false;
    }
    visitFunction(node) {
        const fnName = node.getName().toLowerCase();
        let expectedAttrCount = -1;
        let actualAttrCount = 0;
        switch(fnName){
            case 'rgb(':
            case 'hsl(':
                expectedAttrCount = 3;
                break;
            case 'rgba(':
            case 'hsla(':
                expectedAttrCount = 4;
                break;
        }
        if (expectedAttrCount !== -1) {
            node.getArguments().accept((n)=>{
                if (n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BinaryExpression"]) {
                    actualAttrCount += 1;
                    return false;
                }
                return true;
            });
            if (actualAttrCount !== expectedAttrCount) {
                this.addEntry(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"].ArgsInColorFunction);
            }
        }
        return true;
    }
}
LintVisitor.prefixes = [
    '-ms-',
    '-moz-',
    '-o-',
    '-webkit-'
];
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssValidation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSValidation",
    ()=>CSSValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lintRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class CSSValidation {
    constructor(cssDataManager){
        this.cssDataManager = cssDataManager;
    }
    configure(settings) {
        this.settings = settings;
    }
    doValidation(document, stylesheet, settings = this.settings) {
        if (settings && settings.validate === false) {
            return [];
        }
        const entries = [];
        entries.push.apply(entries, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseErrorCollector"].entries(stylesheet));
        entries.push.apply(entries, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LintVisitor"].entries(stylesheet, document, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LintConfigurationSettings"](settings && settings.lint), this.cssDataManager));
        const ruleIds = [];
        for(const r in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"]){
            ruleIds.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lintRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rules"][r].id);
        }
        function toDiagnostic(marker) {
            const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(marker.getOffset()), document.positionAt(marker.getOffset() + marker.getLength()));
            const source = document.languageId;
            return {
                code: marker.getRule().id,
                source: source,
                message: marker.getMessage(),
                severity: marker.getLevel() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Warning ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticSeverity"].Warning : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticSeverity"].Error,
                range: range
            };
        }
        return entries.filter((entry)=>entry.getLevel() !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Ignore).map(toDiagnostic);
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/scssCompletion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCSSCompletion",
    ()=>SCSSCompletion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const sassDocumentationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Sass documentation');
class SCSSCompletion extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCompletion"] {
    constructor(lsServiceOptions, cssDataManager){
        super('$', lsServiceOptions, cssDataManager);
        addReferencesToDocumentation(SCSSCompletion.scssModuleLoaders);
        addReferencesToDocumentation(SCSSCompletion.scssModuleBuiltIns);
    }
    isImportPathParent(type) {
        return type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Forward || type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Use || super.isImportPathParent(type);
    }
    getCompletionForImportPath(importPathNode, result) {
        const parentType = importPathNode.getParent().type;
        if (parentType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Forward || parentType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Use) {
            for (let p of SCSSCompletion.scssModuleBuiltIns){
                const item = {
                    label: p.label,
                    documentation: p.documentation,
                    textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(importPathNode), `'${p.label}'`),
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Module
                };
                result.items.push(item);
            }
        }
        return super.getCompletionForImportPath(importPathNode, result);
    }
    createReplaceFunction() {
        let tabStopCounter = 1;
        return (_match, p1)=>{
            return '\\' + p1 + ': ${' + tabStopCounter++ + ':' + (SCSSCompletion.variableDefaults[p1] || '') + '}';
        };
    }
    createFunctionProposals(proposals, existingNode, sortToEnd, result) {
        for (const p of proposals){
            const insertText = p.func.replace(/\[?(\$\w+)\]?/g, this.createReplaceFunction());
            const label = p.func.substr(0, p.func.indexOf('('));
            const item = {
                label: label,
                detail: p.func,
                documentation: p.desc,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), insertText),
                insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function
            };
            if (sortToEnd) {
                item.sortText = 'z';
            }
            result.items.push(item);
        }
        return result;
    }
    getCompletionsForSelector(ruleSet, isNested, result) {
        this.createFunctionProposals(SCSSCompletion.selectorFuncs, null, true, result);
        return super.getCompletionsForSelector(ruleSet, isNested, result);
    }
    getTermProposals(entry, existingNode, result) {
        let functions = SCSSCompletion.builtInFuncs;
        if (entry) {
            functions = functions.filter((f)=>!f.type || !entry.restrictions || entry.restrictions.indexOf(f.type) !== -1);
        }
        this.createFunctionProposals(functions, existingNode, true, result);
        return super.getTermProposals(entry, existingNode, result);
    }
    getColorProposals(entry, existingNode, result) {
        this.createFunctionProposals(SCSSCompletion.colorProposals, existingNode, false, result);
        return super.getColorProposals(entry, existingNode, result);
    }
    getCompletionsForDeclarationProperty(declaration, result) {
        this.getCompletionForAtDirectives(result);
        this.getCompletionsForSelector(null, true, result);
        return super.getCompletionsForDeclarationProperty(declaration, result);
    }
    getCompletionsForExtendsReference(_extendsRef, existingNode, result) {
        const symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Rule);
        for (const symbol of symbols){
            const suggest = {
                label: symbol.name,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), symbol.name),
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function
            };
            result.items.push(suggest);
        }
        return result;
    }
    getCompletionForAtDirectives(result) {
        result.items.push(...SCSSCompletion.scssAtDirectives);
        return result;
    }
    getCompletionForTopLevel(result) {
        this.getCompletionForAtDirectives(result);
        this.getCompletionForModuleLoaders(result);
        super.getCompletionForTopLevel(result);
        return result;
    }
    getCompletionForModuleLoaders(result) {
        result.items.push(...SCSSCompletion.scssModuleLoaders);
        return result;
    }
}
SCSSCompletion.variableDefaults = {
    '$red': '1',
    '$green': '2',
    '$blue': '3',
    '$alpha': '1.0',
    '$color': '#000000',
    '$weight': '0.5',
    '$hue': '0',
    '$saturation': '0%',
    '$lightness': '0%',
    '$degrees': '0',
    '$amount': '0',
    '$string': '""',
    '$substring': '"s"',
    '$number': '0',
    '$limit': '1'
};
SCSSCompletion.colorProposals = [
    {
        func: 'red($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the red component of a color.')
    },
    {
        func: 'green($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the green component of a color.')
    },
    {
        func: 'blue($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the blue component of a color.')
    },
    {
        func: 'mix($color, $color, [$weight])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Mixes two colors together.')
    },
    {
        func: 'hue($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the hue component of a color.')
    },
    {
        func: 'saturation($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the saturation component of a color.')
    },
    {
        func: 'lightness($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the lightness component of a color.')
    },
    {
        func: 'adjust-hue($color, $degrees)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Changes the hue of a color.')
    },
    {
        func: 'lighten($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color lighter.')
    },
    {
        func: 'darken($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color darker.')
    },
    {
        func: 'saturate($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color more saturated.')
    },
    {
        func: 'desaturate($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color less saturated.')
    },
    {
        func: 'grayscale($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Converts a color to grayscale.')
    },
    {
        func: 'complement($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the complement of a color.')
    },
    {
        func: 'invert($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the inverse of a color.')
    },
    {
        func: 'alpha($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Gets the opacity component of a color.')
    },
    {
        func: 'opacity($color)',
        desc: 'Gets the alpha component (opacity) of a color.'
    },
    {
        func: 'rgba($color, $alpha)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Changes the alpha component for a color.')
    },
    {
        func: 'opacify($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color more opaque.')
    },
    {
        func: 'fade-in($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color more opaque.')
    },
    {
        func: 'transparentize($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color more transparent.')
    },
    {
        func: 'fade-out($color, $amount)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes a color more transparent.')
    },
    {
        func: 'adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Increases or decreases one or more components of a color.')
    },
    {
        func: 'scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Fluidly scales one or more properties of a color.')
    },
    {
        func: 'change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Changes one or more properties of a color.')
    },
    {
        func: 'ie-hex-str($color)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Converts a color into the format understood by IE filters.')
    }
];
SCSSCompletion.selectorFuncs = [
    {
        func: 'selector-nest($selectors…)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Nests selector beneath one another like they would be nested in the stylesheet.')
    },
    {
        func: 'selector-append($selectors…)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Appends selectors to one another without spaces in between.')
    },
    {
        func: 'selector-extend($selector, $extendee, $extender)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Extends $extendee with $extender within $selector.')
    },
    {
        func: 'selector-replace($selector, $original, $replacement)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Replaces $original with $replacement within $selector.')
    },
    {
        func: 'selector-unify($selector1, $selector2)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Unifies two selectors to produce a selector that matches elements matched by both.')
    },
    {
        func: 'is-superselector($super, $sub)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether $super matches all the elements $sub does, and possibly more.')
    },
    {
        func: 'simple-selectors($selector)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the simple selectors that comprise a compound selector.')
    },
    {
        func: 'selector-parse($selector)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Parses a selector into the format returned by &.')
    }
];
SCSSCompletion.builtInFuncs = [
    {
        func: 'unquote($string)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Removes quotes from a string.')
    },
    {
        func: 'quote($string)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Adds quotes to a string.')
    },
    {
        func: 'str-length($string)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the number of characters in a string.')
    },
    {
        func: 'str-insert($string, $insert, $index)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Inserts $insert into $string at $index.')
    },
    {
        func: 'str-index($string, $substring)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the index of the first occurance of $substring in $string.')
    },
    {
        func: 'str-slice($string, $start-at, [$end-at])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Extracts a substring from $string.')
    },
    {
        func: 'to-upper-case($string)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Converts a string to upper case.')
    },
    {
        func: 'to-lower-case($string)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Converts a string to lower case.')
    },
    {
        func: 'percentage($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Converts a unitless number to a percentage.'),
        type: 'percentage'
    },
    {
        func: 'round($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Rounds a number to the nearest whole number.')
    },
    {
        func: 'ceil($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Rounds a number up to the next whole number.')
    },
    {
        func: 'floor($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Rounds a number down to the previous whole number.')
    },
    {
        func: 'abs($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the absolute value of a number.')
    },
    {
        func: 'min($numbers)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Finds the minimum of several numbers.')
    },
    {
        func: 'max($numbers)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Finds the maximum of several numbers.')
    },
    {
        func: 'random([$limit])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns a random number.')
    },
    {
        func: 'length($list)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the length of a list.')
    },
    {
        func: 'nth($list, $n)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns a specific item in a list.')
    },
    {
        func: 'set-nth($list, $n, $value)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Replaces the nth item in a list.')
    },
    {
        func: 'join($list1, $list2, [$separator])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Joins together two lists into one.')
    },
    {
        func: 'append($list1, $val, [$separator])',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Appends a single value onto the end of a list.')
    },
    {
        func: 'zip($lists)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Combines several lists into a single multidimensional list.')
    },
    {
        func: 'index($list, $value)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the position of a value within a list.')
    },
    {
        func: 'list-separator(#list)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the separator of a list.')
    },
    {
        func: 'map-get($map, $key)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the value in a map associated with a given key.')
    },
    {
        func: 'map-merge($map1, $map2)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Merges two maps together into a new map.')
    },
    {
        func: 'map-remove($map, $keys)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns a new map with keys removed.')
    },
    {
        func: 'map-keys($map)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns a list of all keys in a map.')
    },
    {
        func: 'map-values($map)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns a list of all values in a map.')
    },
    {
        func: 'map-has-key($map, $key)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a map has a value associated with a given key.')
    },
    {
        func: 'keywords($args)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the keywords passed to a function that takes variable arguments.')
    },
    {
        func: 'feature-exists($feature)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a feature exists in the current Sass runtime.')
    },
    {
        func: 'variable-exists($name)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a variable with the given name exists in the current scope.')
    },
    {
        func: 'global-variable-exists($name)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a variable with the given name exists in the global scope.')
    },
    {
        func: 'function-exists($name)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a function with the given name exists.')
    },
    {
        func: 'mixin-exists($name)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a mixin with the given name exists.')
    },
    {
        func: 'inspect($value)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the string representation of a value as it would be represented in Sass.')
    },
    {
        func: 'type-of($value)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the type of a value.')
    },
    {
        func: 'unit($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns the unit(s) associated with a number.')
    },
    {
        func: 'unitless($number)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether a number has units.')
    },
    {
        func: 'comparable($number1, $number2)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Returns whether two numbers can be added, subtracted, or compared.')
    },
    {
        func: 'call($name, $args…)',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Dynamically calls a Sass function.')
    }
];
SCSSCompletion.scssAtDirectives = [
    {
        label: "@extend",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Inherits the styles of another selector."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@at-root",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Causes one or more rules to be emitted at the root of the document."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@debug",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Prints the value of an expression to the standard error output stream. Useful for debugging complicated Sass files."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@warn",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Prints the value of an expression to the standard error output stream. Useful for libraries that need to warn users of deprecations or recovering from minor mixin usage mistakes. Warnings can be turned off with the `--quiet` command-line option or the `:quiet` Sass option."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@error",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Throws the value of an expression as a fatal error with stack trace. Useful for validating arguments to mixins and functions."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@if",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Includes the body if the expression does not evaluate to `false` or `null`."),
        insertText: "@if ${1:expr} {\n\t$0\n}",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@for",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("For loop that repeatedly outputs a set of styles for each `$var` in the `from/through` or `from/to` clause."),
        insertText: "@for \\$${1:var} from ${2:start} ${3|to,through|} ${4:end} {\n\t$0\n}",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@each",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Each loop that sets `$var` to each item in the list or map, then outputs the styles it contains using that value of `$var`."),
        insertText: "@each \\$${1:var} in ${2:list} {\n\t$0\n}",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@while",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("While loop that takes an expression and repeatedly outputs the nested styles until the statement evaluates to `false`."),
        insertText: "@while ${1:condition} {\n\t$0\n}",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@mixin",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Defines styles that can be re-used throughout the stylesheet with `@include`."),
        insertText: "@mixin ${1:name} {\n\t$0\n}",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@include",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Includes the styles defined by another mixin into the current rule."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@function",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Defines complex operations that can be re-used throughout stylesheets."),
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    }
];
SCSSCompletion.scssModuleLoaders = [
    {
        label: "@use",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Loads mixins, functions, and variables from other Sass stylesheets as 'modules', and combines CSS from multiple stylesheets together."),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/at-rules/use'
            }
        ],
        insertText: "@use $0;",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    },
    {
        label: "@forward",
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("Loads a Sass stylesheet and makes its mixins, functions, and variables available when this stylesheet is loaded with the @use rule."),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/at-rules/forward'
            }
        ],
        insertText: "@forward $0;",
        insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Keyword
    }
];
SCSSCompletion.scssModuleBuiltIns = [
    {
        label: 'sass:math',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Provides functions that operate on numbers.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/math'
            }
        ]
    },
    {
        label: 'sass:string',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes it easy to combine, search, or split apart strings.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/string'
            }
        ]
    },
    {
        label: 'sass:color',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Generates new colors based on existing ones, making it easy to build color themes.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/color'
            }
        ]
    },
    {
        label: 'sass:list',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Lets you access and modify values in lists.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/list'
            }
        ]
    },
    {
        label: 'sass:map',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Makes it possible to look up the value associated with a key in a map, and much more.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/map'
            }
        ]
    },
    {
        label: 'sass:selector',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Provides access to Sass’s powerful selector engine.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/selector'
            }
        ]
    },
    {
        label: 'sass:meta',
        documentation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Exposes the details of Sass’s inner workings.'),
        references: [
            {
                name: sassDocumentationName,
                url: 'https://sass-lang.com/documentation/modules/meta'
            }
        ]
    }
];
/**
 * Todo @Pine: Remove this and do it through custom data
 */ function addReferencesToDocumentation(items) {
    items.forEach((i)=>{
        if (i.documentation && i.references && i.references.length > 0) {
            const markdownDoc = typeof i.documentation === 'string' ? {
                kind: 'markdown',
                value: i.documentation
            } : {
                kind: 'markdown',
                value: i.documentation.value
            };
            markdownDoc.value += '\n\n';
            markdownDoc.value += i.references.map((r)=>{
                return `[${r.name}](${r.url})`;
            }).join(' | ');
            i.documentation = markdownDoc;
        }
    });
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lessCompletion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LESSCompletion",
    ()=>LESSCompletion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class LESSCompletion extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCompletion"] {
    constructor(lsOptions, cssDataManager){
        super('@', lsOptions, cssDataManager);
    }
    createFunctionProposals(proposals, existingNode, sortToEnd, result) {
        for (const p of proposals){
            const item = {
                label: p.name,
                detail: p.example,
                documentation: p.description,
                textEdit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEdit"].replace(this.getCompletionRange(existingNode), p.name + '($0)'),
                insertTextFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsertTextFormat"].Snippet,
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletionItemKind"].Function
            };
            if (sortToEnd) {
                item.sortText = 'z';
            }
            result.items.push(item);
        }
        return result;
    }
    getTermProposals(entry, existingNode, result) {
        let functions = LESSCompletion.builtInProposals;
        if (entry) {
            functions = functions.filter((f)=>!f.type || !entry.restrictions || entry.restrictions.indexOf(f.type) !== -1);
        }
        this.createFunctionProposals(functions, existingNode, true, result);
        return super.getTermProposals(entry, existingNode, result);
    }
    getColorProposals(entry, existingNode, result) {
        this.createFunctionProposals(LESSCompletion.colorProposals, existingNode, false, result);
        return super.getColorProposals(entry, existingNode, result);
    }
    getCompletionsForDeclarationProperty(declaration, result) {
        this.getCompletionsForSelector(null, true, result);
        return super.getCompletionsForDeclarationProperty(declaration, result);
    }
}
LESSCompletion.builtInProposals = [
    // Boolean functions
    {
        'name': 'if',
        'example': 'if(condition, trueValue [, falseValue]);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns one of two values depending on a condition.')
    },
    {
        'name': 'boolean',
        'example': 'boolean(condition);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('"store" a boolean test for later evaluation in a guard or if().')
    },
    // List functions
    {
        'name': 'length',
        'example': 'length(@list);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the number of elements in a value list')
    },
    {
        'name': 'extract',
        'example': 'extract(@list, index);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns a value at the specified position in the list')
    },
    {
        'name': 'range',
        'example': 'range([start, ] end [, step]);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('generate a list spanning a range of values')
    },
    {
        'name': 'each',
        'example': 'each(@list, ruleset);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('bind the evaluation of a ruleset to each member of a list.')
    },
    // Other built-ins
    {
        'name': 'escape',
        'example': 'escape(@string);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('URL encodes a string')
    },
    {
        'name': 'e',
        'example': 'e(@string);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('escape string content')
    },
    {
        'name': 'replace',
        'example': 'replace(@string, @pattern, @replacement[, @flags]);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('string replace')
    },
    {
        'name': 'unit',
        'example': 'unit(@dimension, [@unit: \'\']);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('remove or change the unit of a dimension')
    },
    {
        'name': 'color',
        'example': 'color(@string);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('parses a string to a color'),
        'type': 'color'
    },
    {
        'name': 'convert',
        'example': 'convert(@value, unit);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('converts numbers from one type into another')
    },
    {
        'name': 'data-uri',
        'example': 'data-uri([mimetype,] url);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('inlines a resource and falls back to `url()`'),
        'type': 'url'
    },
    {
        'name': 'abs',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('absolute value of a number'),
        'example': 'abs(number);'
    },
    {
        'name': 'acos',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('arccosine - inverse of cosine function'),
        'example': 'acos(number);'
    },
    {
        'name': 'asin',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('arcsine - inverse of sine function'),
        'example': 'asin(number);'
    },
    {
        'name': 'ceil',
        'example': 'ceil(@number);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('rounds up to an integer')
    },
    {
        'name': 'cos',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('cosine function'),
        'example': 'cos(number);'
    },
    {
        'name': 'floor',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('rounds down to an integer'),
        'example': 'floor(@number);'
    },
    {
        'name': 'percentage',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('converts to a %, e.g. 0.5 > 50%'),
        'example': 'percentage(@number);',
        'type': 'percentage'
    },
    {
        'name': 'round',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('rounds a number to a number of places'),
        'example': 'round(number, [places: 0]);'
    },
    {
        'name': 'sqrt',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('calculates square root of a number'),
        'example': 'sqrt(number);'
    },
    {
        'name': 'sin',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('sine function'),
        'example': 'sin(number);'
    },
    {
        'name': 'tan',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('tangent function'),
        'example': 'tan(number);'
    },
    {
        'name': 'atan',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('arctangent - inverse of tangent function'),
        'example': 'atan(number);'
    },
    {
        'name': 'pi',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns pi'),
        'example': 'pi();'
    },
    {
        'name': 'pow',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('first argument raised to the power of the second argument'),
        'example': 'pow(@base, @exponent);'
    },
    {
        'name': 'mod',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('first argument modulus second argument'),
        'example': 'mod(number, number);'
    },
    {
        'name': 'min',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the lowest of one or more values'),
        'example': 'min(@x, @y);'
    },
    {
        'name': 'max',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the lowest of one or more values'),
        'example': 'max(@x, @y);'
    }
];
LESSCompletion.colorProposals = [
    {
        'name': 'argb',
        'example': 'argb(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('creates a #AARRGGBB')
    },
    {
        'name': 'hsl',
        'example': 'hsl(@hue, @saturation, @lightness);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('creates a color')
    },
    {
        'name': 'hsla',
        'example': 'hsla(@hue, @saturation, @lightness, @alpha);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('creates a color')
    },
    {
        'name': 'hsv',
        'example': 'hsv(@hue, @saturation, @value);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('creates a color')
    },
    {
        'name': 'hsva',
        'example': 'hsva(@hue, @saturation, @value, @alpha);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('creates a color')
    },
    {
        'name': 'hue',
        'example': 'hue(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `hue` channel of `@color` in the HSL space')
    },
    {
        'name': 'saturation',
        'example': 'saturation(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `saturation` channel of `@color` in the HSL space')
    },
    {
        'name': 'lightness',
        'example': 'lightness(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `lightness` channel of `@color` in the HSL space')
    },
    {
        'name': 'hsvhue',
        'example': 'hsvhue(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `hue` channel of `@color` in the HSV space')
    },
    {
        'name': 'hsvsaturation',
        'example': 'hsvsaturation(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `saturation` channel of `@color` in the HSV space')
    },
    {
        'name': 'hsvvalue',
        'example': 'hsvvalue(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `value` channel of `@color` in the HSV space')
    },
    {
        'name': 'red',
        'example': 'red(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `red` channel of `@color`')
    },
    {
        'name': 'green',
        'example': 'green(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `green` channel of `@color`')
    },
    {
        'name': 'blue',
        'example': 'blue(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `blue` channel of `@color`')
    },
    {
        'name': 'alpha',
        'example': 'alpha(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `alpha` channel of `@color`')
    },
    {
        'name': 'luma',
        'example': 'luma(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns the `luma` value (perceptual brightness) of `@color`')
    },
    {
        'name': 'saturate',
        'example': 'saturate(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points more saturated')
    },
    {
        'name': 'desaturate',
        'example': 'desaturate(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points less saturated')
    },
    {
        'name': 'lighten',
        'example': 'lighten(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points lighter')
    },
    {
        'name': 'darken',
        'example': 'darken(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points darker')
    },
    {
        'name': 'fadein',
        'example': 'fadein(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points less transparent')
    },
    {
        'name': 'fadeout',
        'example': 'fadeout(@color, 10%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` 10% points more transparent')
    },
    {
        'name': 'fade',
        'example': 'fade(@color, 50%);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` with 50% transparency')
    },
    {
        'name': 'spin',
        'example': 'spin(@color, 10);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@color` with a 10 degree larger in hue')
    },
    {
        'name': 'mix',
        'example': 'mix(@color1, @color2, [@weight: 50%]);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return a mix of `@color1` and `@color2`')
    },
    {
        'name': 'greyscale',
        'example': 'greyscale(@color);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('returns a grey, 100% desaturated color')
    },
    {
        'name': 'contrast',
        'example': 'contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);',
        'description': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('return `@darkcolor` if `@color1 is> 43% luma` otherwise return `@lightcolor`, see notes')
    },
    {
        'name': 'multiply',
        'example': 'multiply(@color1, @color2);'
    },
    {
        'name': 'screen',
        'example': 'screen(@color1, @color2);'
    },
    {
        'name': 'overlay',
        'example': 'overlay(@color1, @color2);'
    },
    {
        'name': 'softlight',
        'example': 'softlight(@color1, @color2);'
    },
    {
        'name': 'hardlight',
        'example': 'hardlight(@color1, @color2);'
    },
    {
        'name': 'difference',
        'example': 'difference(@color1, @color2);'
    },
    {
        'name': 'exclusion',
        'example': 'exclusion(@color1, @color2);'
    },
    {
        'name': 'average',
        'example': 'average(@color1, @color2);'
    },
    {
        'name': 'negation',
        'example': 'negation(@color1, @color2);'
    }
];
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssFolding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFoldingRanges",
    ()=>getFoldingRanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/lessScanner.js [app-client] (ecmascript)");
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function getFoldingRanges(document, context) {
    const ranges = computeFoldingRanges(document);
    return limitFoldingRanges(ranges, context);
}
function computeFoldingRanges(document) {
    function getStartLine(t) {
        return document.positionAt(t.offset).line;
    }
    function getEndLine(t) {
        return document.positionAt(t.offset + t.len).line;
    }
    function getScanner() {
        switch(document.languageId){
            case 'scss':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSScanner"]();
            case 'less':
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LESSScanner"]();
            default:
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scanner"]();
        }
    }
    function tokenToRange(t, kind) {
        const startLine = getStartLine(t);
        const endLine = getEndLine(t);
        if (startLine !== endLine) {
            return {
                startLine,
                endLine,
                kind
            };
        } else {
            return null;
        }
    }
    const ranges = [];
    const delimiterStack = [];
    const scanner = getScanner();
    scanner.ignoreComment = false;
    scanner.setSource(document.getText());
    let token = scanner.scan();
    let prevToken = null;
    while(token.type !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF){
        switch(token.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolationFunction"]:
                {
                    delimiterStack.push({
                        line: getStartLine(token),
                        type: 'brace',
                        isStart: true
                    });
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR:
                {
                    if (delimiterStack.length !== 0) {
                        const prevDelimiter = popPrevStartDelimiterOfType(delimiterStack, 'brace');
                        if (!prevDelimiter) {
                            break;
                        }
                        let endLine = getEndLine(token);
                        if (prevDelimiter.type === 'brace') {
                            /**
                         * Other than the case when curly brace is not on a new line by itself, for example
                         * .foo {
                         *   color: red; }
                         * Use endLine minus one to show ending curly brace
                         */ if (prevToken && getEndLine(prevToken) !== endLine) {
                                endLine--;
                            }
                            if (prevDelimiter.line !== endLine) {
                                ranges.push({
                                    startLine: prevDelimiter.line,
                                    endLine,
                                    kind: undefined
                                });
                            }
                        }
                    }
                    break;
                }
            /**
             * In CSS, there is no single line comment prefixed with //
             * All comments are marked as `Comment`
             */ case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comment:
                {
                    const commentRegionMarkerToDelimiter = (marker)=>{
                        if (marker === '#region') {
                            return {
                                line: getStartLine(token),
                                type: 'comment',
                                isStart: true
                            };
                        } else {
                            return {
                                line: getEndLine(token),
                                type: 'comment',
                                isStart: false
                            };
                        }
                    };
                    const getCurrDelimiter = (token)=>{
                        const matches = token.text.match(/^\s*\/\*\s*(#region|#endregion)\b\s*(.*?)\s*\*\//);
                        if (matches) {
                            return commentRegionMarkerToDelimiter(matches[1]);
                        } else if (document.languageId === 'scss' || document.languageId === 'less') {
                            const matches = token.text.match(/^\s*\/\/\s*(#region|#endregion)\b\s*(.*?)\s*/);
                            if (matches) {
                                return commentRegionMarkerToDelimiter(matches[1]);
                            }
                        }
                        return null;
                    };
                    const currDelimiter = getCurrDelimiter(token);
                    // /* */ comment region folding
                    // All #region and #endregion cases
                    if (currDelimiter) {
                        if (currDelimiter.isStart) {
                            delimiterStack.push(currDelimiter);
                        } else {
                            const prevDelimiter = popPrevStartDelimiterOfType(delimiterStack, 'comment');
                            if (!prevDelimiter) {
                                break;
                            }
                            if (prevDelimiter.type === 'comment') {
                                if (prevDelimiter.line !== currDelimiter.line) {
                                    ranges.push({
                                        startLine: prevDelimiter.line,
                                        endLine: currDelimiter.line,
                                        kind: 'region'
                                    });
                                }
                            }
                        }
                    } else {
                        const range = tokenToRange(token, 'comment');
                        if (range) {
                            ranges.push(range);
                        }
                    }
                    break;
                }
        }
        prevToken = token;
        token = scanner.scan();
    }
    return ranges;
}
function popPrevStartDelimiterOfType(stack, type) {
    if (stack.length === 0) {
        return null;
    }
    for(let i = stack.length - 1; i >= 0; i--){
        if (stack[i].type === type && stack[i].isStart) {
            return stack.splice(i, 1)[0];
        }
    }
    return null;
}
/**
 * - Sort regions
 * - Remove invalid regions (intersections)
 * - If limit exceeds, only return `rangeLimit` amount of ranges
 */ function limitFoldingRanges(ranges, context) {
    const maxRanges = context && context.rangeLimit || Number.MAX_VALUE;
    const sortedRanges = ranges.sort((r1, r2)=>{
        let diff = r1.startLine - r2.startLine;
        if (diff === 0) {
            diff = r1.endLine - r2.endLine;
        }
        return diff;
    });
    const validRanges = [];
    let prevEndLine = -1;
    sortedRanges.forEach((r)=>{
        if (!(r.startLine < prevEndLine && prevEndLine < r.endLine)) {
            validRanges.push(r);
            prevEndLine = r.endLine;
        }
    });
    if (validRanges.length < maxRanges) {
        return validRanges;
    } else {
        return validRanges.slice(0, maxRanges);
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssFormatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "format",
    ()=>format
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$beautify$2f$beautify$2d$css$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/beautify/beautify-css.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function format(document, range, options) {
    let value = document.getText();
    let includesEnd = true;
    let initialIndentLevel = 0;
    let inRule = false;
    const tabSize = options.tabSize || 4;
    if (range) {
        let startOffset = document.offsetAt(range.start);
        // include all leading whitespace iff at the beginning of the line
        let extendedStart = startOffset;
        while(extendedStart > 0 && isWhitespace(value, extendedStart - 1)){
            extendedStart--;
        }
        if (extendedStart === 0 || isEOL(value, extendedStart - 1)) {
            startOffset = extendedStart;
        } else {
            // else keep at least one whitespace
            if (extendedStart < startOffset) {
                startOffset = extendedStart + 1;
            }
        }
        // include all following whitespace until the end of the line
        let endOffset = document.offsetAt(range.end);
        let extendedEnd = endOffset;
        while(extendedEnd < value.length && isWhitespace(value, extendedEnd)){
            extendedEnd++;
        }
        if (extendedEnd === value.length || isEOL(value, extendedEnd)) {
            endOffset = extendedEnd;
        }
        range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(startOffset), document.positionAt(endOffset));
        // Test if inside a rule
        inRule = isInRule(value, startOffset);
        includesEnd = endOffset === value.length;
        value = value.substring(startOffset, endOffset);
        if (startOffset !== 0) {
            const startOfLineOffset = document.offsetAt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].create(range.start.line, 0));
            initialIndentLevel = computeIndentLevel(document.getText(), startOfLineOffset, options);
        }
        if (inRule) {
            value = `{\n${trimLeft(value)}`;
        }
    } else {
        range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].create(0, 0), document.positionAt(value.length));
    }
    const cssOptions = {
        indent_size: tabSize,
        indent_char: options.insertSpaces ? ' ' : '\t',
        end_with_newline: includesEnd && getFormatOption(options, 'insertFinalNewline', false),
        selector_separator_newline: getFormatOption(options, 'newlineBetweenSelectors', true),
        newline_between_rules: getFormatOption(options, 'newlineBetweenRules', true),
        space_around_selector_separator: getFormatOption(options, 'spaceAroundSelectorSeparator', false),
        brace_style: getFormatOption(options, 'braceStyle', 'collapse'),
        indent_empty_lines: getFormatOption(options, 'indentEmptyLines', false),
        max_preserve_newlines: getFormatOption(options, 'maxPreserveNewLines', undefined),
        preserve_newlines: getFormatOption(options, 'preserveNewLines', true),
        wrap_line_length: getFormatOption(options, 'wrapLineLength', undefined),
        eol: '\n'
    };
    let result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$beautify$2f$beautify$2d$css$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css_beautify"])(value, cssOptions);
    if (inRule) {
        result = trimLeft(result.substring(2));
    }
    if (initialIndentLevel > 0) {
        const indent = options.insertSpaces ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repeat"])(' ', tabSize * initialIndentLevel) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repeat"])('\t', initialIndentLevel);
        result = result.split('\n').join('\n' + indent);
        if (range.start.character === 0) {
            result = indent + result; // keep the indent
        }
    }
    return [
        {
            range: range,
            newText: result
        }
    ];
}
function trimLeft(str) {
    return str.replace(/^\s+/, '');
}
const _CUL = '{'.charCodeAt(0);
const _CUR = '}'.charCodeAt(0);
function isInRule(str, offset) {
    while(offset >= 0){
        const ch = str.charCodeAt(offset);
        if (ch === _CUL) {
            return true;
        } else if (ch === _CUR) {
            return false;
        }
        offset--;
    }
    return false;
}
function getFormatOption(options, key, dflt) {
    if (options && options.hasOwnProperty(key)) {
        const value = options[key];
        if (value !== null) {
            return value;
        }
    }
    return dflt;
}
function computeIndentLevel(content, offset, options) {
    let i = offset;
    let nChars = 0;
    const tabSize = options.tabSize || 4;
    while(i < content.length){
        const ch = content.charAt(i);
        if (ch === ' ') {
            nChars++;
        } else if (ch === '\t') {
            nChars += tabSize;
        } else {
            break;
        }
        i++;
    }
    return Math.floor(nChars / tabSize);
}
function isEOL(text, offset) {
    return '\r\n'.indexOf(text.charAt(offset)) !== -1;
}
function isWhitespace(text, offset) {
    return ' \t'.indexOf(text.charAt(offset)) !== -1;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssSelectionRange.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSelectionRanges",
    ()=>getSelectionRanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function getSelectionRanges(document, positions, stylesheet) {
    function getSelectionRange(position) {
        const applicableRanges = getApplicableRanges(position);
        let current = undefined;
        for(let index = applicableRanges.length - 1; index >= 0; index--){
            current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectionRange"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(document.positionAt(applicableRanges[index][0]), document.positionAt(applicableRanges[index][1])), current);
        }
        if (!current) {
            current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectionRange"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].create(position, position));
        }
        return current;
    }
    return positions.map(getSelectionRange);
    //TURBOPACK unreachable
    ;
    function getApplicableRanges(position) {
        const offset = document.offsetAt(position);
        let currNode = stylesheet.findChildAtOffset(offset, true);
        if (!currNode) {
            return [];
        }
        const result = [];
        while(currNode){
            if (currNode.parent && currNode.offset === currNode.parent.offset && currNode.end === currNode.parent.end) {
                currNode = currNode.parent;
                continue;
            }
            // The `{ }` part of `.a { }`
            if (currNode.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declarations) {
                if (offset > currNode.offset && offset < currNode.end) {
                    // Return `{ }` and the range inside `{` and `}`
                    result.push([
                        currNode.offset + 1,
                        currNode.end - 1
                    ]);
                }
            }
            result.push([
                currNode.offset,
                currNode.end
            ]);
            currNode = currNode.parent;
        }
        return result;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/scssNavigation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCSSNavigation",
    ()=>SCSSNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssNavigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-uri/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class SCSSNavigation extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSNavigation"] {
    constructor(fileSystemProvider){
        super(fileSystemProvider, true);
    }
    isRawStringDocumentLinkNode(node) {
        return super.isRawStringDocumentLinkNode(node) || node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Use || node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Forward;
    }
    async mapReference(target, isRawLink) {
        if (this.fileSystemProvider && target && isRawLink) {
            const pathVariations = toPathVariations(target);
            for (const variation of pathVariations){
                if (await this.fileExists(variation)) {
                    return variation;
                }
            }
        }
        return target;
    }
    async resolveReference(target, documentUri, documentContext, isRawLink = false) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startsWith"])(target, 'sass:')) {
            return undefined; // sass library
        }
        return super.resolveReference(target, documentUri, documentContext, isRawLink);
    }
}
function toPathVariations(target) {
    // No variation for links that ends with .css suffix
    if (target.endsWith('.css')) {
        return [
            target
        ];
    }
    // If a link is like a/, try resolving a/index.scss and a/_index.scss
    if (target.endsWith('/')) {
        return [
            target + 'index.scss',
            target + '_index.scss'
        ];
    }
    const targetUri = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].parse(target.replace(/\.scss$/, ''));
    const basename = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].basename(targetUri);
    const dirname = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].dirname(targetUri);
    if (basename.startsWith('_')) {
        // No variation for links such as _a
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].joinPath(dirname, basename + '.scss').toString(true)
        ];
    }
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].joinPath(dirname, basename + '.scss').toString(true),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].joinPath(dirname, '_' + basename + '.scss').toString(true),
        target + '/index.scss',
        target + '/_index.scss',
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].joinPath(dirname, basename + '.css').toString(true)
    ];
}
;
}),
]);

//# sourceMappingURL=a9bf9_monaco-editor_esm_external_vscode-css-languageservice_lib_esm_services_43b60987._.js.map