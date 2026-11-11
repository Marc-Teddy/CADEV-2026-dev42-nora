(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/defaultProviders.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultDropProvidersFeature",
    ()=>DefaultDropProvidersFeature,
    "DefaultPasteProvidersFeature",
    ()=>DefaultPasteProvidersFeature,
    "DefaultTextPasteOrDropEditProvider",
    ()=>DefaultTextPasteOrDropEditProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/dataTransfer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hierarchicalKind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/mime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/network.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/resources.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/uri.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$workspace$2f$common$2f$workspace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/workspace/common/workspace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js [app-client] (ecmascript)");
;
;
;
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
class SimplePasteAndDropProvider {
    constructor(kind){
        this.copyMimeTypes = [];
        this.kind = kind;
        this.providedDropEditKinds = [
            this.kind
        ];
        this.providedPasteEditKinds = [
            this.kind
        ];
    }
    async provideDocumentPasteEdits(_model, _ranges, dataTransfer, context, token) {
        const edit = await this.getEdit(dataTransfer, token);
        if (!edit) {
            return undefined;
        }
        return {
            edits: [
                {
                    insertText: edit.insertText,
                    title: edit.title,
                    kind: edit.kind,
                    handledMimeType: edit.handledMimeType,
                    yieldTo: edit.yieldTo
                }
            ],
            dispose () {}
        };
    }
    async provideDocumentDropEdits(_model, _position, dataTransfer, token) {
        const edit = await this.getEdit(dataTransfer, token);
        if (!edit) {
            return;
        }
        return {
            edits: [
                {
                    insertText: edit.insertText,
                    title: edit.title,
                    kind: edit.kind,
                    handledMimeType: edit.handledMimeType,
                    yieldTo: edit.yieldTo
                }
            ],
            dispose () {}
        };
    }
}
class DefaultTextPasteOrDropEditProvider extends SimplePasteAndDropProvider {
    static{
        this.id = 'text';
    }
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"].Empty.append('text', 'plain'));
        this.id = DefaultTextPasteOrDropEditProvider.id;
        this.dropMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text
        ];
        this.pasteMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text
        ];
    }
    async getEdit(dataTransfer, _token) {
        const textEntry = dataTransfer.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text);
        if (!textEntry) {
            return;
        }
        // Suppress if there's also a uriList entry.
        // Typically the uri-list contains the same text as the text entry so showing both is confusing.
        if (dataTransfer.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList)) {
            return;
        }
        const insertText = await textEntry.asString();
        return {
            handledMimeType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text,
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(980, "Insert Plain Text"),
            insertText,
            kind: this.kind
        };
    }
}
class PathProvider extends SimplePasteAndDropProvider {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"].Empty.append('uri', 'path', 'absolute'));
        this.dropMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList
        ];
        this.pasteMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList
        ];
    }
    async getEdit(dataTransfer, token) {
        const entries = await extractUriList(dataTransfer);
        if (!entries.length || token.isCancellationRequested) {
            return;
        }
        let uriCount = 0;
        const insertText = entries.map(({ uri, originalText })=>{
            if (uri.scheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Schemas"].file) {
                return uri.fsPath;
            } else {
                uriCount++;
                return originalText;
            }
        }).join(' ');
        let label;
        if (uriCount > 0) {
            // Dropping at least one generic uri (such as https) so use most generic label
            label = entries.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(981, "Insert Uris") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(982, "Insert Uri");
        } else {
            // All the paths are file paths
            label = entries.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(983, "Insert Paths") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(984, "Insert Path");
        }
        return {
            handledMimeType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList,
            insertText,
            title: label,
            kind: this.kind
        };
    }
}
let RelativePathProvider = class RelativePathProvider extends SimplePasteAndDropProvider {
    constructor(_workspaceContextService){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"].Empty.append('uri', 'path', 'relative'));
        this._workspaceContextService = _workspaceContextService;
        this.dropMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList
        ];
        this.pasteMimeTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList
        ];
    }
    async getEdit(dataTransfer, token) {
        const entries = await extractUriList(dataTransfer);
        if (!entries.length || token.isCancellationRequested) {
            return;
        }
        const relativeUris = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(entries.map(({ uri })=>{
            const root = this._workspaceContextService.getWorkspaceFolder(uri);
            return root ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$resources$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["relativePath"])(root.uri, uri) : undefined;
        }));
        if (!relativeUris.length) {
            return;
        }
        return {
            handledMimeType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList,
            insertText: relativeUris.join(' '),
            title: entries.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(985, "Insert Relative Paths") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(986, "Insert Relative Path"),
            kind: this.kind
        };
    }
};
RelativePathProvider = __decorate([
    __param(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$workspace$2f$common$2f$workspace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IWorkspaceContextService"])
], RelativePathProvider);
class PasteHtmlProvider {
    constructor(){
        this.kind = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"]('html');
        this.providedPasteEditKinds = [
            this.kind
        ];
        this.copyMimeTypes = [];
        this.pasteMimeTypes = [
            'text/html'
        ];
        this._yieldTo = [
            {
                mimeType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text
            }
        ];
    }
    async provideDocumentPasteEdits(_model, _ranges, dataTransfer, context, token) {
        if (context.triggerKind !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentPasteTriggerKind"].PasteAs && !context.only?.contains(this.kind)) {
            return;
        }
        const entry = dataTransfer.get('text/html');
        const htmlText = await entry?.asString();
        if (!htmlText || token.isCancellationRequested) {
            return;
        }
        return {
            dispose () {},
            edits: [
                {
                    insertText: htmlText,
                    yieldTo: this._yieldTo,
                    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(987, 'Insert HTML'),
                    kind: this.kind
                }
            ]
        };
    }
}
async function extractUriList(dataTransfer) {
    const urlListEntry = dataTransfer.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList);
    if (!urlListEntry) {
        return [];
    }
    const strUriList = await urlListEntry.asString();
    const entries = [];
    for (const entry of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UriList"].parse(strUriList)){
        try {
            entries.push({
                uri: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].parse(entry),
                originalText: entry
            });
        } catch  {
        // noop
        }
    }
    return entries;
}
const genericLanguageSelector = {
    scheme: '*',
    hasAccessToAllModels: true
};
let DefaultDropProvidersFeature = class DefaultDropProvidersFeature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(languageFeaturesService, workspaceContextService){
        super();
        this._register(languageFeaturesService.documentDropEditProvider.register(genericLanguageSelector, new DefaultTextPasteOrDropEditProvider()));
        this._register(languageFeaturesService.documentDropEditProvider.register(genericLanguageSelector, new PathProvider()));
        this._register(languageFeaturesService.documentDropEditProvider.register(genericLanguageSelector, new RelativePathProvider(workspaceContextService)));
    }
};
DefaultDropProvidersFeature = __decorate([
    __param(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$workspace$2f$common$2f$workspace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IWorkspaceContextService"])
], DefaultDropProvidersFeature);
let DefaultPasteProvidersFeature = class DefaultPasteProvidersFeature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(languageFeaturesService, workspaceContextService){
        super();
        this._register(languageFeaturesService.documentPasteEditProvider.register(genericLanguageSelector, new DefaultTextPasteOrDropEditProvider()));
        this._register(languageFeaturesService.documentPasteEditProvider.register(genericLanguageSelector, new PathProvider()));
        this._register(languageFeaturesService.documentPasteEditProvider.register(genericLanguageSelector, new RelativePathProvider(workspaceContextService)));
        this._register(languageFeaturesService.documentPasteEditProvider.register(genericLanguageSelector, new PasteHtmlProvider()));
    }
};
DefaultPasteProvidersFeature = __decorate([
    __param(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$workspace$2f$common$2f$workspace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IWorkspaceContextService"])
], DefaultPasteProvidersFeature);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/edit.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCombinedWorkspaceEdit",
    ()=>createCombinedWorkspaceEdit,
    "sortEditsByYieldTo",
    ()=>sortEditsByYieldTo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/bulkEditService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetParser.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Given a {@link DropOrPasteEdit} and set of ranges, creates a {@link WorkspaceEdit} that applies the insert text from
 * the {@link DropOrPasteEdit} at each range plus any additional edits.
 */ function createCombinedWorkspaceEdit(uri, ranges, edit) {
    // If the edit insert text is empty, skip applying at each range
    if (typeof edit.insertText === 'string' ? edit.insertText === '' : edit.insertText.snippet === '') {
        return {
            edits: edit.additionalEdit?.edits ?? []
        };
    }
    return {
        edits: [
            ...ranges.map((range)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceTextEdit"](uri, {
                    range,
                    text: typeof edit.insertText === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$snippet$2f$browser$2f$snippetParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnippetParser"].escape(edit.insertText) + '$0' : edit.insertText.snippet,
                    insertAsSnippet: true
                })),
            ...edit.additionalEdit?.edits ?? []
        ]
    };
}
function sortEditsByYieldTo(edits) {
    function yieldsTo(yTo, other) {
        if ('mimeType' in yTo) {
            return yTo.mimeType === other.handledMimeType;
        }
        return !!other.kind && yTo.kind.contains(other.kind);
    }
    // Build list of nodes each node yields to
    const yieldsToMap = new Map();
    for (const edit of edits){
        for (const yTo of edit.yieldTo ?? []){
            for (const other of edits){
                if (other === edit) {
                    continue;
                }
                if (yieldsTo(yTo, other)) {
                    let arr = yieldsToMap.get(edit);
                    if (!arr) {
                        arr = [];
                        yieldsToMap.set(edit, arr);
                    }
                    arr.push(other);
                }
            }
        }
    }
    if (!yieldsToMap.size) {
        return Array.from(edits);
    }
    // Topological sort
    const visited = new Set();
    const tempStack = [];
    function visit(nodes) {
        if (!nodes.length) {
            return [];
        }
        const node = nodes[0];
        if (tempStack.includes(node)) {
            console.warn('Yield to cycle detected', node);
            return nodes;
        }
        if (visited.has(node)) {
            return visit(nodes.slice(1));
        }
        let pre = [];
        const yTo = yieldsToMap.get(node);
        if (yTo) {
            tempStack.push(node);
            pre = visit(yTo);
            tempStack.pop();
        }
        visited.add(node);
        return [
            ...pre,
            node,
            ...visit(nodes.slice(1))
        ];
    }
    return visit(Array.from(edits));
}
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/postEditWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostEditWidgetManager",
    ()=>PostEditWidgetManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/browser/ui/button/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/codicons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errorMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errorMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/themables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actionWidget$2f$browser$2f$actionWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/actionWidget/browser/actionWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybinding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$notification$2f$common$2f$notification$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/notification/common/notification.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/bulkEditService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/editorState/browser/editorState.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/edit.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
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
var PostEditWidget_1;
let PostEditWidget = class PostEditWidget extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        PostEditWidget_1 = this;
    }
    static{
        this.baseId = 'editor.widget.postEditWidget';
    }
    constructor(typeId, editor, visibleContext, showCommand, range, edits, onSelectNewEdit, additionalActions, contextKeyService, _keybindingService, _actionWidgetService){
        super();
        this.typeId = typeId;
        this.editor = editor;
        this.showCommand = showCommand;
        this.range = range;
        this.edits = edits;
        this.onSelectNewEdit = onSelectNewEdit;
        this.additionalActions = additionalActions;
        this._keybindingService = _keybindingService;
        this._actionWidgetService = _actionWidgetService;
        this.allowEditorOverflow = true;
        this.suppressMouseDown = true;
        this.create();
        this.visibleContext = visibleContext.bindTo(contextKeyService);
        this.visibleContext.set(true);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>this.visibleContext.reset()));
        this.editor.addContentWidget(this);
        this.editor.layoutContentWidget(this);
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDisposable"])(()=>this.editor.removeContentWidget(this)));
        this._register(this.editor.onDidChangeCursorPosition((e)=>{
            this.dispose();
        }));
        this._register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].runAndSubscribe(_keybindingService.onDidUpdateKeybindings, ()=>{
            this._updateButtonTitle();
        }));
    }
    _updateButtonTitle() {
        this.button.element.title = this._keybindingService.appendKeybinding(this.showCommand.label, this.showCommand.id);
    }
    create() {
        this.domNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$"])('.post-edit-widget');
        this.button = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$ui$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"](this.domNode, {
            supportIcons: true
        }));
        this.button.label = '$(insert)';
        this._register((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDisposableListener"])(this.domNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventType"].CLICK, ()=>this.showSelector()));
    }
    getId() {
        return PostEditWidget_1.baseId + '.' + this.typeId;
    }
    getDomNode() {
        return this.domNode;
    }
    getPosition() {
        return {
            position: this.range.getEndPosition(),
            preference: [
                2 /* ContentWidgetPositionPreference.BELOW */ 
            ]
        };
    }
    showSelector() {
        const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$browser$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDomNodePagePosition"])(this.button.element);
        const anchor = {
            x: pos.left + pos.width,
            y: pos.top + pos.height
        };
        this._actionWidgetService.show('postEditWidget', false, this.edits.allEdits.map((edit, i)=>{
            return {
                kind: "action" /* ActionListItemKind.Action */ ,
                item: edit,
                label: edit.title,
                disabled: false,
                canPreview: false,
                group: {
                    title: '',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$themables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeIcon"].fromId(i === this.edits.activeEditIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].check.id : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$codicons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Codicon"].blank.id)
                }
            };
        }), {
            onHide: ()=>{
                this.editor.focus();
            },
            onSelect: (item)=>{
                this._actionWidgetService.hide(false);
                const i = this.edits.allEdits.findIndex((edit)=>edit === item);
                if (i !== this.edits.activeEditIndex) {
                    return this.onSelectNewEdit(i);
                }
            }
        }, anchor, this.editor.getDomNode() ?? undefined, this.additionalActions);
    }
};
PostEditWidget = PostEditWidget_1 = __decorate([
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IContextKeyService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$keybinding$2f$common$2f$keybinding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IKeybindingService"]),
    __param(10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$actionWidget$2f$browser$2f$actionWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IActionWidgetService"])
], PostEditWidget);
let PostEditWidgetManager = class PostEditWidgetManager extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    constructor(_id, _editor, _visibleContext, _showCommand, _getAdditionalActions, _instantiationService, _bulkEditService, _notificationService){
        super();
        this._id = _id;
        this._editor = _editor;
        this._visibleContext = _visibleContext;
        this._showCommand = _showCommand;
        this._getAdditionalActions = _getAdditionalActions;
        this._instantiationService = _instantiationService;
        this._bulkEditService = _bulkEditService;
        this._notificationService = _notificationService;
        this._currentWidget = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutableDisposable"]());
        this._register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Event"].any(_editor.onDidChangeModel, _editor.onDidChangeModelContent)(()=>this.clear()));
    }
    async applyEditAndShowIfNeeded(ranges, edits, canShowWidget, resolve, token) {
        if (!ranges.length || !this._editor.hasModel()) {
            return;
        }
        const model = this._editor.getModel();
        const edit = edits.allEdits.at(edits.activeEditIndex);
        if (!edit) {
            return;
        }
        const onDidSelectEdit = async (newEditIndex)=>{
            const model = this._editor.getModel();
            if (!model) {
                return;
            }
            await model.undo();
            this.applyEditAndShowIfNeeded(ranges, {
                activeEditIndex: newEditIndex,
                allEdits: edits.allEdits
            }, canShowWidget, resolve, token);
        };
        const handleError = (e, message)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCancellationError"])(e)) {
                return;
            }
            this._notificationService.error(message);
            if (canShowWidget) {
                this.show(ranges[0], edits, onDidSelectEdit);
            }
        };
        const editorStateCts = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorStateCancellationTokenSource"](this._editor, 1 /* CodeEditorStateFlag.Value */  | 2 /* CodeEditorStateFlag.Selection */ , undefined, token);
        let resolvedEdit;
        try {
            resolvedEdit = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["raceCancellationError"])(resolve(edit, editorStateCts.token), editorStateCts.token);
        } catch (e) {
            return handleError(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(991, "Error resolving edit '{0}':\n{1}", edit.title, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errorMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toErrorMessage"])(e)));
        } finally{
            editorStateCts.dispose();
        }
        if (token.isCancellationRequested) {
            return;
        }
        const combinedWorkspaceEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCombinedWorkspaceEdit"])(model.uri, ranges, resolvedEdit);
        // Use a decoration to track edits around the trigger range
        const primaryRange = ranges[0];
        const editTrackingDecoration = model.deltaDecorations([], [
            {
                range: primaryRange,
                options: {
                    description: 'paste-line-suffix',
                    stickiness: 0 /* TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges */ 
                }
            }
        ]);
        this._editor.focus();
        let editResult;
        let editRange;
        try {
            editResult = await this._bulkEditService.apply(combinedWorkspaceEdit, {
                editor: this._editor,
                token
            });
            editRange = model.getDecorationRange(editTrackingDecoration[0]);
        } catch (e) {
            return handleError(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(992, "Error applying edit '{0}':\n{1}", edit.title, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errorMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toErrorMessage"])(e)));
        } finally{
            model.deltaDecorations(editTrackingDecoration, []);
        }
        if (token.isCancellationRequested) {
            return;
        }
        if (canShowWidget && editResult.isApplied && edits.allEdits.length > 1) {
            this.show(editRange ?? primaryRange, edits, onDidSelectEdit);
        }
    }
    show(range, edits, onDidSelectEdit) {
        this.clear();
        if (this._editor.hasModel()) {
            this._currentWidget.value = this._instantiationService.createInstance(PostEditWidget, this._id, this._editor, this._visibleContext, this._showCommand, range, edits, onDidSelectEdit, this._getAdditionalActions());
        }
    }
    clear() {
        this._currentWidget.clear();
    }
    tryShowSelector() {
        this._currentWidget.value?.showSelector();
    }
};
PostEditWidgetManager = __decorate([
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IBulkEditService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$notification$2f$common$2f$notification$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INotificationService"])
], PostEditWidgetManager);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/copyPasteController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyPasteController",
    ()=>CopyPasteController,
    "changePasteTypeCommandId",
    ()=>changePasteTypeCommandId,
    "pasteAsPreferenceConfig",
    ()=>pasteAsPreferenceConfig,
    "pasteWidgetVisibleCtx",
    ()=>pasteWidgetVisibleCtx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/cancellation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/dataTransfer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hierarchicalKind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/mime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/uuid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$clipboard$2f$common$2f$clipboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/clipboard/common/clipboardService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/commands/common/commands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/configuration/common/configuration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/log/common/log.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$progress$2f$common$2f$progress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/progress/common/progress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$quickinput$2f$common$2f$quickInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/quickinput/common/quickInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/services/bulkEditService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/languages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/editorState/browser/editorState.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineProgress$2f$browser$2f$inlineProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineProgress/browser/inlineProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$message$2f$browser$2f$messageController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/message/browser/messageController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/defaultProviders.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$postEditWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/postEditWidget.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
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
var CopyPasteController_1;
const changePasteTypeCommandId = 'editor.changePasteType';
const pasteAsPreferenceConfig = 'editor.pasteAs.preferences';
const pasteWidgetVisibleCtx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RawContextKey"]('pasteWidgetVisible', false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(971, "Whether the paste widget is showing"));
const vscodeClipboardMime = 'application/vnd.code.copymetadata';
let CopyPasteController = class CopyPasteController extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        CopyPasteController_1 = this;
    }
    static{
        this.ID = 'editor.contrib.copyPasteActionController';
    }
    static get(editor) {
        return editor.getContribution(CopyPasteController_1.ID);
    }
    constructor(editor, instantiationService, _logService, _bulkEditService, _clipboardService, _commandService, _configService, _languageFeaturesService, _quickInputService, _progressService){
        super();
        this._logService = _logService;
        this._bulkEditService = _bulkEditService;
        this._clipboardService = _clipboardService;
        this._commandService = _commandService;
        this._configService = _configService;
        this._languageFeaturesService = _languageFeaturesService;
        this._quickInputService = _quickInputService;
        this._progressService = _progressService;
        this._editor = editor;
        this._register(editor.onWillCopy((e)=>this.handleCopy(e)));
        this._register(editor.onWillCut((e)=>this.handleCopy(e)));
        this._register(editor.onWillPaste((e)=>this.handlePaste(e)));
        this._pasteProgressManager = this._register(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineProgress$2f$browser$2f$inlineProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineProgressManager"]('pasteIntoEditor', editor, instantiationService));
        this._postPasteWidgetManager = this._register(instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$postEditWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostEditWidgetManager"], 'pasteIntoEditor', editor, pasteWidgetVisibleCtx, {
            id: changePasteTypeCommandId,
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(972, "Show paste options...")
        }, ()=>CopyPasteController_1._configureDefaultAction ? [
                CopyPasteController_1._configureDefaultAction
            ] : []));
    }
    changePasteType() {
        this._postPasteWidgetManager.tryShowSelector();
    }
    async pasteAs(preferred) {
        this._logService.trace('CopyPasteController.pasteAs');
        this._editor.focus();
        try {
            this._logService.trace('Before calling editor.action.clipboardPasteAction');
            this._pasteAsActionContext = {
                preferred
            };
            await this._commandService.executeCommand('editor.action.clipboardPasteAction');
        } finally{
            this._pasteAsActionContext = undefined;
        }
    }
    clearWidgets() {
        this._postPasteWidgetManager.clear();
    }
    isPasteAsEnabled() {
        return this._editor.getOption(97 /* EditorOption.pasteAs */ ).enabled;
    }
    async finishedPaste() {
        await this._currentPasteOperation;
    }
    handleCopy(e) {
        this._logService.trace('CopyPasteController#handleCopy');
        if (!this._editor.hasTextFocus()) {
            return;
        }
        // Explicitly clear the clipboard internal state.
        // This is needed because on web, the browser clipboard is faked out using an in-memory store.
        // This means the resources clipboard is not properly updated when copying from the editor.
        this._clipboardService.clearInternalState?.();
        if (!this.isPasteAsEnabled()) {
            return;
        }
        const model = this._editor.getModel();
        const viewModel = this._editor._getViewModel();
        const selections = this._editor.getSelections();
        if (!model || !viewModel || !selections?.length) {
            return;
        }
        const defaultPastePayload = {
            multicursorText: e.dataToCopy.multicursorText ?? null,
            pasteOnNewLine: e.dataToCopy.isFromEmptySelection,
            mode: null
        };
        const providers = this._languageFeaturesService.documentPasteEditProvider.ordered(model).filter((x)=>!!x.prepareDocumentPaste);
        if (!providers.length) {
            this.setCopyMetadata(e.clipboardData, {
                defaultPastePayload
            });
            return;
        }
        const dataTransfer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VSDataTransfer"]();
        const providerCopyMimeTypes = providers.flatMap((x)=>x.copyMimeTypes ?? []);
        // Save off a handle pointing to data that VS Code maintains.
        const handle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUuid"])();
        this.setCopyMetadata(e.clipboardData, {
            id: handle,
            providerCopyMimeTypes,
            defaultPastePayload
        });
        const operations = providers.map((provider)=>{
            return {
                providerMimeTypes: provider.copyMimeTypes,
                operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCancelablePromise"])((token)=>provider.prepareDocumentPaste(model, e.dataToCopy.sourceRanges, dataTransfer, token).catch((err)=>{
                        console.error(err);
                        return undefined;
                    }))
            };
        });
        CopyPasteController_1._currentCopyOperation?.operations.forEach((entry)=>entry.operation.cancel());
        CopyPasteController_1._currentCopyOperation = {
            handle,
            operations
        };
    }
    async handlePaste(e) {
        this._logService.trace('CopyPasteController#handlePaste for id : ', e.metadata?.id);
        if (!this._editor.hasTextFocus()) {
            return;
        }
        const dataTransfer = e.toExternalVSDataTransfer();
        if (!dataTransfer) {
            return;
        }
        dataTransfer.delete(vscodeClipboardMime);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$message$2f$browser$2f$messageController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageController"].get(this._editor)?.closeMessage();
        this._currentPasteOperation?.cancel();
        this._currentPasteOperation = undefined;
        const model = this._editor.getModel();
        const selections = this._editor.getSelections();
        if (!selections?.length || !model) {
            return;
        }
        if (this._editor.getOption(104 /* EditorOption.readOnly */ ) // Never enabled if editor is readonly.
         || !this.isPasteAsEnabled() && !this._pasteAsActionContext // Or feature disabled (but still enable if paste was explicitly requested)
        ) {
            return;
        }
        const metadata = this.fetchCopyMetadata(e);
        this._logService.trace('CopyPasteController#handlePaste with metadata : ', metadata?.id, ' and text.length : ', e.clipboardData.getData('text/plain').length);
        const fileTypes = Array.from(e.clipboardData.files).map((file)=>file.type);
        const allPotentialMimeTypes = [
            ...e.clipboardData.types,
            ...fileTypes,
            ...metadata?.providerCopyMimeTypes ?? [],
            // TODO: always adds `uri-list` because this get set if there are resources in the system clipboard.
            // However we can only check the system clipboard async. For this early check, just add it in.
            // We filter providers again once we have the final dataTransfer we will use.
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList
        ];
        const allProviders = this._languageFeaturesService.documentPasteEditProvider.ordered(model).filter((provider)=>{
            // Filter out providers that don't match the requested paste types
            const preference = this._pasteAsActionContext?.preferred;
            if (preference) {
                if (!this.providerMatchesPreference(provider, preference)) {
                    return false;
                }
            }
            // And providers that don't handle any of mime types in the clipboard
            return provider.pasteMimeTypes?.some((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesMimeType"])(type, allPotentialMimeTypes));
        });
        if (!allProviders.length) {
            if (this._pasteAsActionContext?.preferred) {
                this.showPasteAsNoEditMessage(selections, this._pasteAsActionContext.preferred);
                // Also prevent default paste from applying
                e.setHandled();
            }
            return;
        }
        // Prevent the editor's default paste handler from running.
        // Note that after this point, we are fully responsible for handling paste.
        // If we can't provider a paste for any reason, we need to explicitly delegate pasting back to the editor.
        e.setHandled();
        if (this._pasteAsActionContext) {
            this.showPasteAsPick(this._pasteAsActionContext.preferred, allProviders, selections, dataTransfer, metadata);
        } else {
            this.doPasteInline(allProviders, selections, dataTransfer, metadata, e.browserEvent);
        }
    }
    showPasteAsNoEditMessage(selections, preference) {
        const kindLabel = 'only' in preference ? preference.only.value : 'preferences' in preference ? preference.preferences.length ? preference.preferences.map((preference)=>preference.value).join(', ') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(973, "empty") : preference.providerId;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$message$2f$browser$2f$messageController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageController"].get(this._editor)?.showMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(974, "No paste edits for '{0}' found", kindLabel), selections[0].getStartPosition());
    }
    doPasteInline(allProviders, selections, dataTransfer, metadata, clipboardEvent) {
        this._logService.trace('CopyPasteController#doPasteInline');
        const editor = this._editor;
        if (!editor.hasModel()) {
            return;
        }
        const editorStateCts = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorStateCancellationTokenSource"](editor, 1 /* CodeEditorStateFlag.Value */  | 2 /* CodeEditorStateFlag.Selection */ , undefined);
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCancelablePromise"])(async (pToken)=>{
            const editor = this._editor;
            if (!editor.hasModel()) {
                return;
            }
            const model = editor.getModel();
            const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
            const cts = disposables.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$cancellation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancellationTokenSource"](pToken));
            disposables.add(editorStateCts.token.onCancellationRequested(()=>cts.cancel()));
            const token = cts.token;
            try {
                await this.mergeInDataFromCopy(allProviders, dataTransfer, metadata, token);
                if (token.isCancellationRequested) {
                    return;
                }
                const supportedProviders = allProviders.filter((provider)=>this.isSupportedPasteProvider(provider, dataTransfer));
                if (!supportedProviders.length || supportedProviders.length === 1 && supportedProviders[0] instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTextPasteOrDropEditProvider"] // Only our default text provider is active
                ) {
                    return this.applyDefaultPasteHandler(dataTransfer, metadata, token, clipboardEvent);
                }
                const context = {
                    triggerKind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentPasteTriggerKind"].Automatic
                };
                const editSession = await this.getPasteEdits(supportedProviders, dataTransfer, model, selections, context, token);
                disposables.add(editSession);
                if (token.isCancellationRequested) {
                    return;
                }
                // If the only edit returned is our default text edit, use the default paste handler
                if (editSession.edits.length === 1 && editSession.edits[0].provider instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTextPasteOrDropEditProvider"]) {
                    return this.applyDefaultPasteHandler(dataTransfer, metadata, token, clipboardEvent);
                }
                if (editSession.edits.length) {
                    const canShowWidget = editor.getOption(97 /* EditorOption.pasteAs */ ).showPasteSelector === 'afterPaste';
                    return this._postPasteWidgetManager.applyEditAndShowIfNeeded(selections, {
                        activeEditIndex: this.getInitialActiveEditIndex(model, editSession.edits),
                        allEdits: editSession.edits
                    }, canShowWidget, async (edit, resolveToken)=>{
                        if (!edit.provider.resolveDocumentPasteEdit) {
                            return edit;
                        }
                        const resolveP = edit.provider.resolveDocumentPasteEdit(edit, resolveToken);
                        const showP = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeferredPromise"]();
                        const resolved = await this._pasteProgressManager.showWhile(selections[0].getEndPosition(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(975, "Resolving paste edit for '{0}'. Click to cancel", edit.title), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["raceCancellation"])(Promise.race([
                            showP.p,
                            resolveP
                        ]), resolveToken), {
                            cancel: ()=>showP.cancel()
                        }, 0);
                        if (resolved) {
                            edit.insertText = resolved.insertText;
                            edit.additionalEdit = resolved.additionalEdit;
                        }
                        return edit;
                    }, token);
                }
                await this.applyDefaultPasteHandler(dataTransfer, metadata, token, clipboardEvent);
            } finally{
                disposables.dispose();
                if (this._currentPasteOperation === p) {
                    this._currentPasteOperation = undefined;
                }
            }
        });
        this._pasteProgressManager.showWhile(selections[0].getEndPosition(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(976, "Running paste handlers. Click to cancel and do basic paste"), p, {
            cancel: async ()=>{
                p.cancel();
                if (editorStateCts.token.isCancellationRequested) {
                    return;
                }
                await this.applyDefaultPasteHandler(dataTransfer, metadata, editorStateCts.token, clipboardEvent);
            }
        }).finally(()=>{
            editorStateCts.dispose();
        });
        this._currentPasteOperation = p;
    }
    showPasteAsPick(preference, allProviders, selections, dataTransfer, metadata) {
        this._logService.trace('CopyPasteController#showPasteAsPick');
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCancelablePromise"])(async (token)=>{
            const editor = this._editor;
            if (!editor.hasModel()) {
                return;
            }
            const model = editor.getModel();
            const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
            const tokenSource = disposables.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorStateCancellationTokenSource"](editor, 1 /* CodeEditorStateFlag.Value */  | 2 /* CodeEditorStateFlag.Selection */ , undefined, token));
            try {
                await this.mergeInDataFromCopy(allProviders, dataTransfer, metadata, tokenSource.token);
                if (tokenSource.token.isCancellationRequested) {
                    return;
                }
                // Filter out any providers the don't match the full data transfer we will send them.
                let supportedProviders = allProviders.filter((provider)=>this.isSupportedPasteProvider(provider, dataTransfer, preference));
                if (preference) {
                    // We are looking for a specific edit
                    supportedProviders = supportedProviders.filter((provider)=>this.providerMatchesPreference(provider, preference));
                }
                const context = {
                    triggerKind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentPasteTriggerKind"].PasteAs,
                    only: preference && 'only' in preference ? preference.only : undefined
                };
                let editSession = disposables.add(await this.getPasteEdits(supportedProviders, dataTransfer, model, selections, context, tokenSource.token));
                if (tokenSource.token.isCancellationRequested) {
                    return;
                }
                // Filter out any edits that don't match the requested kind
                if (preference) {
                    editSession = {
                        edits: editSession.edits.filter((edit)=>{
                            if ('only' in preference) {
                                return preference.only.contains(edit.kind);
                            } else if ('preferences' in preference) {
                                return preference.preferences.some((preference)=>preference.contains(edit.kind));
                            } else {
                                return preference.providerId === edit.provider.id;
                            }
                        }),
                        dispose: editSession.dispose
                    };
                }
                if (!editSession.edits.length) {
                    if (preference) {
                        this.showPasteAsNoEditMessage(selections, preference);
                    }
                    return;
                }
                let pickedEdit;
                if (preference) {
                    pickedEdit = editSession.edits.at(0);
                } else {
                    const configureDefaultItem = {
                        id: 'editor.pasteAs.default',
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(977, "Configure default paste action"),
                        edit: undefined
                    };
                    const selected = await this._quickInputService.pick([
                        ...editSession.edits.map((edit)=>({
                                label: edit.title,
                                description: edit.kind?.value,
                                edit
                            })),
                        ...CopyPasteController_1._configureDefaultAction ? [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upcast"])({
                                type: 'separator'
                            }),
                            {
                                label: CopyPasteController_1._configureDefaultAction.label,
                                edit: undefined
                            }
                        ] : []
                    ], {
                        placeHolder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(978, "Select Paste Action")
                    });
                    if (selected === configureDefaultItem) {
                        CopyPasteController_1._configureDefaultAction?.run();
                        return;
                    }
                    pickedEdit = selected?.edit;
                }
                if (!pickedEdit) {
                    return;
                }
                const combinedWorkspaceEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCombinedWorkspaceEdit"])(model.uri, selections, pickedEdit);
                await this._bulkEditService.apply(combinedWorkspaceEdit, {
                    editor: this._editor
                });
            } finally{
                disposables.dispose();
                if (this._currentPasteOperation === p) {
                    this._currentPasteOperation = undefined;
                }
            }
        });
        this._progressService.withProgress({
            location: 10 /* ProgressLocation.Window */ ,
            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(979, "Running paste handlers")
        }, ()=>p);
    }
    setCopyMetadata(clipboardData, metadata) {
        this._logService.trace('CopyPasteController#setCopyMetadata new id : ', metadata.id);
        clipboardData.setData(vscodeClipboardMime, JSON.stringify(metadata));
    }
    fetchCopyMetadata(e) {
        this._logService.trace('CopyPasteController#fetchCopyMetadata');
        // Prefer using the clipboard data we saved off
        const rawMetadata = e.clipboardData.getData(vscodeClipboardMime);
        if (rawMetadata) {
            try {
                return JSON.parse(rawMetadata);
            } catch  {
                return undefined;
            }
        }
        if (e.metadata) {
            return {
                defaultPastePayload: {
                    mode: e.metadata.mode,
                    multicursorText: e.metadata.multicursorText ?? null,
                    pasteOnNewLine: !!e.metadata.isFromEmptySelection
                }
            };
        }
        return undefined;
    }
    async mergeInDataFromCopy(allProviders, dataTransfer, metadata, token) {
        this._logService.trace('CopyPasteController#mergeInDataFromCopy with metadata : ', metadata?.id);
        if (metadata?.id && CopyPasteController_1._currentCopyOperation?.handle === metadata.id) {
            // Only resolve providers that have data we may care about
            const toResolve = CopyPasteController_1._currentCopyOperation.operations.filter((op)=>allProviders.some((provider)=>provider.pasteMimeTypes.some((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesMimeType"])(type, op.providerMimeTypes)))).map((op)=>op.operation);
            const toMergeResults = await Promise.all(toResolve);
            if (token.isCancellationRequested) {
                return;
            }
            // Values from higher priority providers should overwrite values from lower priority ones.
            // Reverse the array to so that the calls to `DataTransfer.replace` later will do this
            for (const toMergeData of toMergeResults.reverse()){
                if (toMergeData) {
                    for (const [key, value] of toMergeData){
                        dataTransfer.replace(key, value);
                    }
                }
            }
        }
        if (!dataTransfer.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList)) {
            const resources = await this._clipboardService.readResources();
            if (token.isCancellationRequested) {
                return;
            }
            if (resources.length) {
                dataTransfer.append(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].uriList, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStringDataTransferItem"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UriList"].create(resources)));
            }
        }
    }
    async getPasteEdits(providers, dataTransfer, model, selections, context, token) {
        const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["raceCancellation"])(Promise.all(providers.map(async (provider)=>{
            try {
                const edits = await provider.provideDocumentPasteEdits?.(model, selections, dataTransfer, context, token);
                if (edits) {
                    disposables.add(edits);
                }
                return edits?.edits?.map((edit)=>({
                        ...edit,
                        provider
                    }));
            } catch (err) {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCancellationError"])(err)) {
                    console.error(err);
                }
                return undefined;
            }
        })), token);
        const edits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(results ?? []).flat().filter((edit)=>{
            return !context.only || context.only.contains(edit.kind);
        });
        return {
            edits: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortEditsByYieldTo"])(edits),
            dispose: ()=>disposables.dispose()
        };
    }
    async applyDefaultPasteHandler(dataTransfer, metadata, token, clipboardEvent) {
        const textDataTransfer = dataTransfer.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mimes"].text) ?? dataTransfer.get('text');
        const text = await textDataTransfer?.asString() ?? '';
        if (token.isCancellationRequested) {
            return;
        }
        const payload = {
            clipboardEvent,
            text,
            pasteOnNewLine: metadata?.defaultPastePayload.pasteOnNewLine ?? false,
            multicursorText: metadata?.defaultPastePayload.multicursorText ?? null,
            mode: null
        };
        this._logService.trace('CopyPasteController#applyDefaultPasteHandler for id : ', metadata?.id);
        this._editor.trigger('keyboard', "paste" /* Handler.Paste */ , payload);
    }
    /**
     * Filter out providers if they:
     * - Don't handle any of the data transfer types we have
     * - Don't match the preferred paste kind
     */ isSupportedPasteProvider(provider, dataTransfer, preference) {
        if (!provider.pasteMimeTypes?.some((type)=>dataTransfer.matches(type))) {
            return false;
        }
        return !preference || this.providerMatchesPreference(provider, preference);
    }
    providerMatchesPreference(provider, preference) {
        if ('only' in preference) {
            return provider.providedPasteEditKinds.some((providedKind)=>preference.only.contains(providedKind));
        } else if ('preferences' in preference) {
            return provider.providedPasteEditKinds.some((providedKind)=>preference.preferences.some((preferredKind)=>preferredKind.contains(providedKind)));
        } else {
            return provider.id === preference.providerId;
        }
    }
    getInitialActiveEditIndex(model, edits) {
        const preferredProviders = this._configService.getValue(pasteAsPreferenceConfig, {
            resource: model.uri
        });
        for (const config of Array.isArray(preferredProviders) ? preferredProviders : []){
            const desiredKind = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"](config);
            const editIndex = edits.findIndex((edit)=>desiredKind.contains(edit.kind));
            if (editIndex >= 0) {
                return editIndex;
            }
        }
        return 0;
    }
};
CopyPasteController = CopyPasteController_1 = __decorate([
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$log$2f$common$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILogService"]),
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$services$2f$bulkEditService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IBulkEditService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$clipboard$2f$common$2f$clipboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IClipboardService"]),
    __param(5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$commands$2f$common$2f$commands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICommandService"]),
    __param(6, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IConfigurationService"]),
    __param(7, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(8, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$quickinput$2f$common$2f$quickInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IQuickInputService"]),
    __param(9, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$progress$2f$common$2f$progress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IProgressService"])
], CopyPasteController);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/copyPasteContribution.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pasteAsCommandId",
    ()=>pasteAsCommandId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hierarchicalKind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/editorExtensions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/editorContextKeys.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/editorFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/copyPasteController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/defaultProviders.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ const pasteAsCommandId = 'editor.action.pasteAs';
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorContribution"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"].ID, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"], 0 /* EditorContributionInstantiation.Eager */ ); // eager because it listens to events on the container dom node of the editor
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorFeature"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultPasteProvidersFeature"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorCommand"])(new class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCommand"] {
    constructor(){
        super({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["changePasteTypeCommandId"],
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pasteWidgetVisibleCtx"],
            kbOpts: {
                weight: 100 /* KeybindingWeight.EditorContrib */ ,
                primary: 2048 /* KeyMod.CtrlCmd */  | 89 /* KeyCode.Period */ 
            }
        });
    }
    runEditorCommand(_accessor, editor) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"].get(editor)?.changePasteType();
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorCommand"])(new class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCommand"] {
    constructor(){
        super({
            id: 'editor.hidePasteWidget',
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pasteWidgetVisibleCtx"],
            kbOpts: {
                weight: 100 /* KeybindingWeight.EditorContrib */ ,
                primary: 9 /* KeyCode.Escape */ 
            }
        });
    }
    runEditorCommand(_accessor, editor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"].get(editor)?.clearWidgets();
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(class PasteAsAction extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorAction"] {
    static{
        this.argsSchema = {
            oneOf: [
                {
                    type: 'object',
                    required: [
                        'kind'
                    ],
                    properties: {
                        kind: {
                            type: 'string',
                            description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(967, "The kind of the paste edit to try pasting with.\nIf there are multiple edits for this kind, the editor will show a picker. If there are no edits of this kind, the editor will show an error message.")
                        }
                    }
                },
                {
                    type: 'object',
                    required: [
                        'preferences'
                    ],
                    properties: {
                        preferences: {
                            type: 'array',
                            description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(968, "List of preferred paste edit kind to try applying.\nThe first edit matching the preferences will be applied."),
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            ]
        };
    }
    constructor(){
        super({
            id: pasteAsCommandId,
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize2"])(969, "Paste As..."),
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorContextKeys"].writable,
            metadata: {
                description: 'Paste as',
                args: [
                    {
                        name: 'args',
                        schema: PasteAsAction.argsSchema
                    }
                ]
            },
            canTriggerInlineEdits: true
        });
    }
    run(_accessor, editor, args) {
        let preference;
        if (args) {
            if ('kind' in args) {
                preference = {
                    only: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"](args.kind)
                };
            } else if ('preferences' in args) {
                preference = {
                    preferences: args.preferences.map((kind)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"](kind))
                };
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"].get(editor)?.pasteAs(preference);
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorAction"])(class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorAction"] {
    constructor(){
        super({
            id: 'editor.action.pasteAsText',
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize2"])(970, "Paste as Text"),
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorContextKeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorContextKeys"].writable,
            canTriggerInlineEdits: true
        });
    }
    run(_accessor, editor) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$copyPasteController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyPasteController"].get(editor)?.pasteAs({
            providerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTextPasteOrDropEditProvider"].id
        });
    }
});
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/dropIntoEditorController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropIntoEditorController",
    ()=>DropIntoEditorController,
    "changeDropTypeCommandId",
    ()=>changeDropTypeCommandId,
    "dropAsPreferenceConfig",
    ()=>dropAsPreferenceConfig,
    "dropWidgetVisibleCtx",
    ()=>dropWidgetVisibleCtx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/arrays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/dataTransfer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/hierarchicalKind.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/nls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/configuration/common/configuration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/contextkey/common/contextkey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dnd$2f$browser$2f$dnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/dnd/browser/dnd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/dataTransfer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/core/range.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$treeViewsDnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDnd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$treeViewsDndService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDndService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/editorState/browser/editorState.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineProgress$2f$browser$2f$inlineProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/inlineProgress/browser/inlineProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$postEditWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/postEditWidget.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
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
var DropIntoEditorController_1;
const dropAsPreferenceConfig = 'editor.dropIntoEditor.preferences';
const changeDropTypeCommandId = 'editor.changeDropType';
const dropWidgetVisibleCtx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$contextkey$2f$common$2f$contextkey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RawContextKey"]('dropWidgetVisible', false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(988, "Whether the drop widget is showing"));
let DropIntoEditorController = class DropIntoEditorController extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disposable"] {
    static{
        DropIntoEditorController_1 = this;
    }
    static{
        this.ID = 'editor.contrib.dropIntoEditorController';
    }
    static get(editor) {
        return editor.getContribution(DropIntoEditorController_1.ID);
    }
    constructor(editor, instantiationService, _configService, _languageFeaturesService, _treeViewsDragAndDropService){
        super();
        this._configService = _configService;
        this._languageFeaturesService = _languageFeaturesService;
        this._treeViewsDragAndDropService = _treeViewsDragAndDropService;
        this.treeItemsTransfer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$dnd$2f$browser$2f$dnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalSelectionTransfer"].getInstance();
        this._dropProgressManager = this._register(instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$inlineProgress$2f$browser$2f$inlineProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineProgressManager"], 'dropIntoEditor', editor));
        this._postDropWidgetManager = this._register(instantiationService.createInstance(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$postEditWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostEditWidgetManager"], 'dropIntoEditor', editor, dropWidgetVisibleCtx, {
            id: changeDropTypeCommandId,
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(989, "Show drop options...")
        }, ()=>DropIntoEditorController_1._configureDefaultAction ? [
                DropIntoEditorController_1._configureDefaultAction
            ] : []));
        this._register(editor.onDropIntoEditor((e)=>this.onDropIntoEditor(editor, e.position, e.event)));
    }
    clearWidgets() {
        this._postDropWidgetManager.clear();
    }
    changeDropType() {
        this._postDropWidgetManager.tryShowSelector();
    }
    async onDropIntoEditor(editor, position, dragEvent) {
        if (!dragEvent.dataTransfer || !editor.hasModel()) {
            return;
        }
        DropIntoEditorController_1._currentDropOperation?.cancel();
        editor.focus();
        editor.setPosition(position);
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCancelablePromise"])(async (token)=>{
            const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
            const tokenSource = disposables.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$editorState$2f$browser$2f$editorState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorStateCancellationTokenSource"](editor, 1 /* CodeEditorStateFlag.Value */ , undefined, token));
            try {
                const ourDataTransfer = await this.extractDataTransferData(dragEvent);
                if (ourDataTransfer.size === 0 || tokenSource.token.isCancellationRequested) {
                    return;
                }
                const model = editor.getModel();
                if (!model) {
                    return;
                }
                const providers = this._languageFeaturesService.documentDropEditProvider.ordered(model).filter((provider)=>{
                    if (!provider.dropMimeTypes) {
                        // Keep all providers that don't specify mime types
                        return true;
                    }
                    return provider.dropMimeTypes.some((mime)=>ourDataTransfer.matches(mime));
                });
                const editSession = disposables.add(await this.getDropEdits(providers, model, position, ourDataTransfer, tokenSource.token));
                if (tokenSource.token.isCancellationRequested) {
                    return;
                }
                if (editSession.edits.length) {
                    const activeEditIndex = this.getInitialActiveEditIndex(model, editSession.edits);
                    const canShowWidget = editor.getOption(43 /* EditorOption.dropIntoEditor */ ).showDropSelector === 'afterDrop';
                    // Pass in the parent token here as it tracks cancelling the entire drop operation
                    await this._postDropWidgetManager.applyEditAndShowIfNeeded([
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$core$2f$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"].fromPositions(position)
                    ], {
                        activeEditIndex,
                        allEdits: editSession.edits
                    }, canShowWidget, async (edit)=>edit, token);
                }
            } finally{
                disposables.dispose();
                if (DropIntoEditorController_1._currentDropOperation === p) {
                    DropIntoEditorController_1._currentDropOperation = undefined;
                }
            }
        });
        this._dropProgressManager.showWhile(position, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$nls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localize"])(990, "Running drop handlers. Click to cancel"), p, {
            cancel: ()=>p.cancel()
        });
        DropIntoEditorController_1._currentDropOperation = p;
    }
    async getDropEdits(providers, model, position, dataTransfer, token) {
        const disposables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisposableStore"]();
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["raceCancellation"])(Promise.all(providers.map(async (provider)=>{
            try {
                const edits = await provider.provideDocumentDropEdits(model, position, dataTransfer, token);
                if (edits) {
                    disposables.add(edits);
                }
                return edits?.edits.map((edit)=>({
                        ...edit,
                        providerId: provider.id
                    }));
            } catch (err) {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCancellationError"])(err)) {
                    console.error(err);
                }
                console.error(err);
            }
            return undefined;
        })), token);
        const edits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(results ?? []).flat();
        return {
            edits: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortEditsByYieldTo"])(edits),
            dispose: ()=>disposables.dispose()
        };
    }
    getInitialActiveEditIndex(model, edits) {
        const preferredProviders = this._configService.getValue(dropAsPreferenceConfig, {
            resource: model.uri
        });
        for (const config of Array.isArray(preferredProviders) ? preferredProviders : []){
            const desiredKind = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$hierarchicalKind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HierarchicalKind"](config);
            const editIndex = edits.findIndex((edit)=>edit.kind && desiredKind.contains(edit.kind));
            if (editIndex >= 0) {
                return editIndex;
            }
        }
        return 0;
    }
    async extractDataTransferData(dragEvent) {
        if (!dragEvent.dataTransfer) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$base$2f$common$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VSDataTransfer"]();
        }
        const dataTransfer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$dataTransfer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toExternalVSDataTransfer"])(dragEvent.dataTransfer);
        if (this.treeItemsTransfer.hasData(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$treeViewsDnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DraggedTreeItemsIdentifier"].prototype)) {
            const data = this.treeItemsTransfer.getData(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$treeViewsDnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DraggedTreeItemsIdentifier"].prototype);
            if (Array.isArray(data)) {
                for (const id of data){
                    const treeDataTransfer = await this._treeViewsDragAndDropService.removeDragOperationTransfer(id.identifier);
                    if (treeDataTransfer) {
                        for (const [type, value] of treeDataTransfer){
                            dataTransfer.replace(type, value);
                        }
                    }
                }
            }
        }
        return dataTransfer;
    }
};
DropIntoEditorController = DropIntoEditorController_1 = __decorate([
    __param(1, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$instantiation$2f$common$2f$instantiation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IInstantiationService"]),
    __param(2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$platform$2f$configuration$2f$common$2f$configuration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IConfigurationService"]),
    __param(3, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$languageFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ILanguageFeaturesService"]),
    __param(4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$services$2f$treeViewsDndService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITreeViewsDnDService"])
], DropIntoEditorController);
;
}),
"[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/dropIntoEditorContribution.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/browser/editorExtensions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/common/editorFeatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/defaultProviders.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/dropIntoEditorController.js [app-client] (ecmascript)");
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorContribution"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropIntoEditorController"].ID, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropIntoEditorController"], 2 /* EditorContributionInstantiation.BeforeFirstInteraction */ );
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$common$2f$editorFeatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorFeature"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$defaultProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultDropProvidersFeature"]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorCommand"])(new class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCommand"] {
    constructor(){
        super({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["changeDropTypeCommandId"],
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dropWidgetVisibleCtx"],
            kbOpts: {
                weight: 100 /* KeybindingWeight.EditorContrib */ ,
                primary: 2048 /* KeyMod.CtrlCmd */  | 89 /* KeyCode.Period */ 
            }
        });
    }
    runEditorCommand(_accessor, editor, _args) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropIntoEditorController"].get(editor)?.changeDropType();
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorCommand"])(new class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$browser$2f$editorExtensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCommand"] {
    constructor(){
        super({
            id: 'editor.hideDropWidget',
            precondition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dropWidgetVisibleCtx"],
            kbOpts: {
                weight: 100 /* KeybindingWeight.EditorContrib */ ,
                primary: 9 /* KeyCode.Escape */ 
            }
        });
    }
    runEditorCommand(_accessor, editor, _args) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$vs$2f$editor$2f$contrib$2f$dropOrPasteInto$2f$browser$2f$dropIntoEditorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropIntoEditorController"].get(editor)?.clearWidgets();
    }
});
}),
]);

//# sourceMappingURL=d4b1c_modules_monaco-editor_esm_vs_editor_contrib_dropOrPasteInto_browser_9e01b375._.js.map