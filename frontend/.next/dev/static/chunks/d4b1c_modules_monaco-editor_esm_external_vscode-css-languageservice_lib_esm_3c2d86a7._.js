(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "difference",
    ()=>difference,
    "endsWith",
    ()=>endsWith,
    "getLimitedString",
    ()=>getLimitedString,
    "repeat",
    ()=>repeat,
    "startsWith",
    ()=>startsWith,
    "trim",
    ()=>trim
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    for(let i = 0; i < needle.length; i++){
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Determines if haystack ends with needle.
 */ function endsWith(haystack, needle) {
    let diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.lastIndexOf(needle) === diff;
    } else if (diff === 0) {
        return haystack === needle;
    } else {
        return false;
    }
}
/**
 * Computes the difference score for two strings. More similar strings have a higher score.
 * We use largest common subsequence dynamic programming approach but penalize in the end for length differences.
 * Strings that have a large length difference will get a bad default score 0.
 * Complexity - both time and space O(first.length * second.length)
 * Dynamic programming LCS computation http://en.wikipedia.org/wiki/Longest_common_subsequence_problem
 *
 * @param first a string
 * @param second a string
 */ function difference(first, second, maxLenDelta = 4) {
    let lengthDifference = Math.abs(first.length - second.length);
    // We only compute score if length of the currentWord and length of entry.name are similar.
    if (lengthDifference > maxLenDelta) {
        return 0;
    }
    // Initialize LCS (largest common subsequence) matrix.
    let LCS = [];
    let zeroArray = [];
    let i, j;
    for(i = 0; i < second.length + 1; ++i){
        zeroArray.push(0);
    }
    for(i = 0; i < first.length + 1; ++i){
        LCS.push(zeroArray);
    }
    for(i = 1; i < first.length + 1; ++i){
        for(j = 1; j < second.length + 1; ++j){
            if (first[i - 1] === second[j - 1]) {
                LCS[i][j] = LCS[i - 1][j - 1] + 1;
            } else {
                LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
            }
        }
    }
    return LCS[first.length][second.length] - Math.sqrt(lengthDifference);
}
/**
 * Limit of string length.
 */ function getLimitedString(str, ellipsis = true) {
    if (!str) {
        return '';
    }
    if (str.length < 140) {
        return str;
    }
    return str.slice(0, 140) + (ellipsis ? '\u2026' : '');
}
/**
 * Limit of string length.
 */ function trim(str, regexp) {
    const m = regexp.exec(str);
    if (m && m[0].length) {
        return str.substr(0, str.length - m[0].length);
    }
    return str;
}
function repeat(value, count) {
    let s = '';
    while(count > 0){
        if ((count & 1) === 1) {
            s += value;
        }
        value += value;
        count = count >>> 1;
    }
    return s;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/objects.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDefined",
    ()=>isDefined,
    "values",
    ()=>values
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function values(obj) {
    return Object.keys(obj).map((key)=>obj[key]);
}
function isDefined(obj) {
    return typeof obj !== 'undefined';
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/arrays.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findFirst",
    ()=>findFirst,
    "includes",
    ()=>includes,
    "union",
    ()=>union
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */ function findFirst(array, p) {
    let low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while(low < high){
        let mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}
function includes(array, item) {
    return array.indexOf(item) !== -1;
}
function union(...arrays) {
    const result = [];
    for (const array of arrays){
        for (const item of array){
            if (!includes(result, item)) {
                result.push(item);
            }
        }
    }
    return result;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/resources.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dirname",
    ()=>dirname,
    "joinPath",
    ()=>joinPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-uri/lib/esm/index.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function dirname(uriString) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].dirname(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].parse(uriString)).toString(true);
}
function joinPath(uriString, ...paths) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Utils"].joinPath(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$uri$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URI"].parse(uriString), ...paths).toString(true);
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientCapabilities",
    ()=>ClientCapabilities,
    "FileType",
    ()=>FileType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$textdocument$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-textdocument/lib/esm/main.js [app-client] (ecmascript)");
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var ClientCapabilities;
(function(ClientCapabilities) {
    ClientCapabilities.LATEST = {
        textDocument: {
            completion: {
                completionItem: {
                    documentationFormat: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].Markdown,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].PlainText
                    ]
                }
            },
            hover: {
                contentFormat: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].Markdown,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].PlainText
                ]
            }
        }
    };
})(ClientCapabilities || (ClientCapabilities = {}));
var FileType;
(function(FileType) {
    /**
     * The file type is unknown.
     */ FileType[FileType["Unknown"] = 0] = "Unknown";
    /**
     * A regular file.
     */ FileType[FileType["File"] = 1] = "File";
    /**
     * A directory.
     */ FileType[FileType["Directory"] = 2] = "Directory";
    /**
     * A symbolic link to a file.
     */ FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType || (FileType = {}));
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorFromHSL",
    ()=>colorFromHSL,
    "colorFromHWB",
    ()=>colorFromHWB,
    "colorFromHex",
    ()=>colorFromHex,
    "colorFunctions",
    ()=>colorFunctions,
    "colorKeywords",
    ()=>colorKeywords,
    "colors",
    ()=>colors,
    "getColorValue",
    ()=>getColorValue,
    "hexDigit",
    ()=>hexDigit,
    "hslFromColor",
    ()=>hslFromColor,
    "hwbFromColor",
    ()=>hwbFromColor,
    "isColorConstructor",
    ()=>isColorConstructor,
    "isColorString",
    ()=>isColorString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const hexColorRegExp = /(^#([0-9A-F]{3}){1,2}$)|(^#([0-9A-F]{4}){1,2}$)/i;
const colorFunctions = [
    {
        label: 'rgb',
        func: 'rgb($red, $green, $blue)',
        insertText: 'rgb(${1:red}, ${2:green}, ${3:blue})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from red, green, and blue values.')
    },
    {
        label: 'rgba',
        func: 'rgba($red, $green, $blue, $alpha)',
        insertText: 'rgba(${1:red}, ${2:green}, ${3:blue}, ${4:alpha})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from red, green, blue, and alpha values.')
    },
    {
        label: 'rgb relative',
        func: 'rgb(from $color $red $green $blue)',
        insertText: 'rgb(from ${1:color} ${2:r} ${3:g} ${4:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the red, green, and blue values of another Color.')
    },
    {
        label: 'hsl',
        func: 'hsl($hue, $saturation, $lightness)',
        insertText: 'hsl(${1:hue}, ${2:saturation}, ${3:lightness})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from hue, saturation, and lightness values.')
    },
    {
        label: 'hsla',
        func: 'hsla($hue, $saturation, $lightness, $alpha)',
        insertText: 'hsla(${1:hue}, ${2:saturation}, ${3:lightness}, ${4:alpha})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from hue, saturation, lightness, and alpha values.')
    },
    {
        label: 'hsl relative',
        func: 'hsl(from $color $hue $saturation $lightness)',
        insertText: 'hsl(from ${1:color} ${2:h} ${3:s} ${4:l})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the hue, saturation, and lightness values of another Color.')
    },
    {
        label: 'hwb',
        func: 'hwb($hue $white $black)',
        insertText: 'hwb(${1:hue} ${2:white} ${3:black})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from hue, white, and black values.')
    },
    {
        label: 'hwb relative',
        func: 'hwb(from $color $hue $white $black)',
        insertText: 'hwb(from ${1:color} ${2:h} ${3:w} ${4:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the hue, white, and black values of another Color.')
    },
    {
        label: 'lab',
        func: 'lab($lightness $a $b)',
        insertText: 'lab(${1:lightness} ${2:a} ${3:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from lightness, a, and b values.')
    },
    {
        label: 'lab relative',
        func: 'lab(from $color $lightness $a $b)',
        insertText: 'lab(from ${1:color} ${2:l} ${3:a} ${4:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the lightness, a, and b values of another Color.')
    },
    {
        label: 'oklab',
        func: 'oklab($lightness $a $b)',
        insertText: 'oklab(${1:lightness} ${2:a} ${3:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from lightness, a, and b values.')
    },
    {
        label: 'oklab relative',
        func: 'oklab(from $color $lightness $a $b)',
        insertText: 'oklab(from ${1:color} ${2:l} ${3:a} ${4:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the lightness, a, and b values of another Color.')
    },
    {
        label: 'lch',
        func: 'lch($lightness $chroma $hue)',
        insertText: 'lch(${1:lightness} ${2:chroma} ${3:hue})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from lightness, chroma, and hue values.')
    },
    {
        label: 'lch relative',
        func: 'lch(from $color $lightness $chroma $hue)',
        insertText: 'lch(from ${1:color} ${2:l} ${3:c} ${4:h})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the lightness, chroma, and hue values of another Color.')
    },
    {
        label: 'oklch',
        func: 'oklch($lightness $chroma $hue)',
        insertText: 'oklch(${1:lightness} ${2:chroma} ${3:hue})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from lightness, chroma, and hue values.')
    },
    {
        label: 'oklch relative',
        func: 'oklch(from $color $lightness $chroma $hue)',
        insertText: 'oklch(from ${1:color} ${2:l} ${3:c} ${4:h})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color from the lightness, chroma, and hue values of another Color.')
    },
    {
        label: 'color',
        func: 'color($color-space $red $green $blue)',
        insertText: 'color(${1|srgb,srgb-linear,display-p3,a98-rgb,prophoto-rgb,rec2020,xyx,xyz-d50,xyz-d65|} ${2:red} ${3:green} ${4:blue})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color in a specific color space from red, green, and blue values.')
    },
    {
        label: 'color relative',
        func: 'color(from $color $color-space $red $green $blue)',
        insertText: 'color(from ${1:color} ${2|srgb,srgb-linear,display-p3,a98-rgb,prophoto-rgb,rec2020,xyx,xyz-d50,xyz-d65|} ${3:r} ${4:g} ${5:b})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Creates a Color in a specific color space from the red, green, and blue values of another Color.')
    },
    {
        label: 'color-mix',
        func: 'color-mix(in $color-space, $color $percentage, $color $percentage)',
        insertText: 'color-mix(in ${1|srgb,srgb-linear,lab,oklab,xyz,xyz-d50,xyz-d65|}, ${3:color} ${4:percentage}, ${5:color} ${6:percentage})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Mix two colors together in a rectangular color space.')
    },
    {
        label: 'color-mix hue',
        func: 'color-mix(in $color-space $interpolation-method hue, $color $percentage, $color $percentage)',
        insertText: 'color-mix(in ${1|hsl,hwb,lch,oklch|} ${2|shorter hue,longer hue,increasing hue,decreasing hue|}, ${3:color} ${4:percentage}, ${5:color} ${6:percentage})',
        desc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('Mix two colors together in a polar color space.')
    }
];
const colorFunctionNameRegExp = /^(rgb|rgba|hsl|hsla|hwb)$/i;
const colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rebeccapurple: '#663399',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};
const colorsRegExp = new RegExp(`^(${Object.keys(colors).join('|')})$`, "i");
const colorKeywords = {
    'currentColor': 'The value of the \'color\' property. The computed value of the \'currentColor\' keyword is the computed value of the \'color\' property. If the \'currentColor\' keyword is set on the \'color\' property itself, it is treated as \'color:inherit\' at parse time.',
    'transparent': 'Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value.'
};
const colorKeywordsRegExp = new RegExp(`^(${Object.keys(colorKeywords).join('|')})$`, "i");
function getNumericValue(node, factor) {
    const val = node.getText();
    const m = val.match(/^([-+]?[0-9]*\.?[0-9]+)(%?)$/);
    if (m) {
        if (m[2]) {
            factor = 100.0;
        }
        const result = parseFloat(m[1]) / factor;
        if (result >= 0 && result <= 1) {
            return result;
        }
    }
    throw new Error();
}
function getAngle(node) {
    const val = node.getText();
    const m = val.match(/^([-+]?[0-9]*\.?[0-9]+)(deg|rad|grad|turn)?$/);
    if (m) {
        switch(m[2]){
            case 'deg':
                return parseFloat(val) % 360;
            case 'rad':
                return parseFloat(val) * 180 / Math.PI % 360;
            case 'grad':
                return parseFloat(val) * 0.9 % 360;
            case 'turn':
                return parseFloat(val) * 360 % 360;
            default:
                if ('undefined' === typeof m[2]) {
                    return parseFloat(val) % 360;
                }
        }
    }
    throw new Error();
}
function isColorConstructor(node) {
    const name = node.getName();
    if (!name) {
        return false;
    }
    return colorFunctionNameRegExp.test(name);
}
function isColorString(s) {
    return hexColorRegExp.test(s) || colorsRegExp.test(s) || colorKeywordsRegExp.test(s);
}
const Digit0 = 48;
const Digit9 = 57;
const A = 65;
const a = 97;
const f = 102;
function hexDigit(charCode) {
    if (charCode < Digit0) {
        return 0;
    }
    if (charCode <= Digit9) {
        return charCode - Digit0;
    }
    if (charCode < a) {
        charCode += a - A;
    }
    if (charCode >= a && charCode <= f) {
        return charCode - a + 10;
    }
    return 0;
}
function colorFromHex(text) {
    if (text[0] !== '#') {
        return null;
    }
    switch(text.length){
        case 4:
            return {
                red: hexDigit(text.charCodeAt(1)) * 0x11 / 255.0,
                green: hexDigit(text.charCodeAt(2)) * 0x11 / 255.0,
                blue: hexDigit(text.charCodeAt(3)) * 0x11 / 255.0,
                alpha: 1
            };
        case 5:
            return {
                red: hexDigit(text.charCodeAt(1)) * 0x11 / 255.0,
                green: hexDigit(text.charCodeAt(2)) * 0x11 / 255.0,
                blue: hexDigit(text.charCodeAt(3)) * 0x11 / 255.0,
                alpha: hexDigit(text.charCodeAt(4)) * 0x11 / 255.0
            };
        case 7:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
                green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
                blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
                alpha: 1
            };
        case 9:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
                green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
                blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
                alpha: (hexDigit(text.charCodeAt(7)) * 0x10 + hexDigit(text.charCodeAt(8))) / 255.0
            };
    }
    return null;
}
function colorFromHSL(hue, sat, light, alpha = 1.0) {
    hue = hue / 60.0;
    if (sat === 0) {
        return {
            red: light,
            green: light,
            blue: light,
            alpha
        };
    } else {
        const hueToRgb = (t1, t2, hue)=>{
            while(hue < 0){
                hue += 6;
            }
            while(hue >= 6){
                hue -= 6;
            }
            if (hue < 1) {
                return (t2 - t1) * hue + t1;
            }
            if (hue < 3) {
                return t2;
            }
            if (hue < 4) {
                return (t2 - t1) * (4 - hue) + t1;
            }
            return t1;
        };
        const t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
        const t1 = light * 2 - t2;
        return {
            red: hueToRgb(t1, t2, hue + 2),
            green: hueToRgb(t1, t2, hue),
            blue: hueToRgb(t1, t2, hue - 2),
            alpha
        };
    }
}
function hslFromColor(rgba) {
    const r = rgba.red;
    const g = rgba.green;
    const b = rgba.blue;
    const a = rgba.alpha;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (min + max) / 2;
    const chroma = max - min;
    if (chroma > 0) {
        s = Math.min(l <= 0.5 ? chroma / (2 * l) : chroma / (2 - 2 * l), 1);
        switch(max){
            case r:
                h = (g - b) / chroma + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / chroma + 2;
                break;
            case b:
                h = (r - g) / chroma + 4;
                break;
        }
        h *= 60;
        h = Math.round(h);
    }
    return {
        h,
        s,
        l,
        a
    };
}
function colorFromHWB(hue, white, black, alpha = 1.0) {
    if (white + black >= 1) {
        const gray = white / (white + black);
        return {
            red: gray,
            green: gray,
            blue: gray,
            alpha
        };
    }
    const rgb = colorFromHSL(hue, 1, 0.5, alpha);
    let red = rgb.red;
    red *= 1 - white - black;
    red += white;
    let green = rgb.green;
    green *= 1 - white - black;
    green += white;
    let blue = rgb.blue;
    blue *= 1 - white - black;
    blue += white;
    return {
        red: red,
        green: green,
        blue: blue,
        alpha
    };
}
function hwbFromColor(rgba) {
    const hsl = hslFromColor(rgba);
    const white = Math.min(rgba.red, rgba.green, rgba.blue);
    const black = 1 - Math.max(rgba.red, rgba.green, rgba.blue);
    return {
        h: hsl.h,
        w: white,
        b: black,
        a: hsl.a
    };
}
function getColorValue(node) {
    if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].HexColorValue) {
        const text = node.getText();
        return colorFromHex(text);
    } else if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Function) {
        const functionNode = node;
        const name = functionNode.getName();
        let colorValues = functionNode.getArguments().getChildren();
        if (colorValues.length === 1) {
            const functionArg = colorValues[0].getChildren();
            if (functionArg.length === 1 && functionArg[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Expression) {
                colorValues = functionArg[0].getChildren();
                if (colorValues.length === 3) {
                    const lastValue = colorValues[2];
                    if (lastValue instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BinaryExpression"]) {
                        const left = lastValue.getLeft(), right = lastValue.getRight(), operator = lastValue.getOperator();
                        if (left && right && operator && operator.matches('/')) {
                            colorValues = [
                                colorValues[0],
                                colorValues[1],
                                left,
                                right
                            ];
                        }
                    }
                }
            }
        }
        if (!name || colorValues.length < 3 || colorValues.length > 4) {
            return null;
        }
        try {
            const alpha = colorValues.length === 4 ? getNumericValue(colorValues[3], 1) : 1;
            if (name === 'rgb' || name === 'rgba') {
                return {
                    red: getNumericValue(colorValues[0], 255.0),
                    green: getNumericValue(colorValues[1], 255.0),
                    blue: getNumericValue(colorValues[2], 255.0),
                    alpha
                };
            } else if (name === 'hsl' || name === 'hsla') {
                const h = getAngle(colorValues[0]);
                const s = getNumericValue(colorValues[1], 100.0);
                const l = getNumericValue(colorValues[2], 100.0);
                return colorFromHSL(h, s, l, alpha);
            } else if (name === 'hwb') {
                const h = getAngle(colorValues[0]);
                const w = getNumericValue(colorValues[1], 100.0);
                const b = getNumericValue(colorValues[2], 100.0);
                return colorFromHWB(h, w, b, alpha);
            }
        } catch (e) {
            // parse error on numeric value
            return null;
        }
    } else if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Identifier) {
        if (node.parent && node.parent.type !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Term) {
            return null;
        }
        const term = node.parent;
        if (term && term.parent && term.parent.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].BinaryExpression) {
            const expression = term.parent;
            if (expression.parent && expression.parent.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ListEntry && expression.parent.key === expression) {
                return null;
            }
        }
        const candidateColor = node.getText().toLowerCase();
        if (candidateColor === 'none') {
            return null;
        }
        const colorHex = colors[candidateColor];
        if (colorHex) {
            return colorFromHex(colorHex);
        }
    }
    return null;
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/builtinData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "basicShapeFunctions",
    ()=>basicShapeFunctions,
    "boxKeywords",
    ()=>boxKeywords,
    "cssWideFunctions",
    ()=>cssWideFunctions,
    "cssWideKeywords",
    ()=>cssWideKeywords,
    "geometryBoxKeywords",
    ()=>geometryBoxKeywords,
    "html5Tags",
    ()=>html5Tags,
    "imageFunctions",
    ()=>imageFunctions,
    "lineStyleKeywords",
    ()=>lineStyleKeywords,
    "lineWidthKeywords",
    ()=>lineWidthKeywords,
    "pageBoxDirectives",
    ()=>pageBoxDirectives,
    "positionKeywords",
    ()=>positionKeywords,
    "repeatStyleKeywords",
    ()=>repeatStyleKeywords,
    "svgElements",
    ()=>svgElements,
    "transitionTimingFunctions",
    ()=>transitionTimingFunctions,
    "units",
    ()=>units
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const positionKeywords = {
    'bottom': 'Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.',
    'center': 'Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.',
    'left': 'Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.',
    'right': 'Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.',
    'top': 'Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset.'
};
const repeatStyleKeywords = {
    'no-repeat': 'Placed once and not repeated in this direction.',
    'repeat': 'Repeated in this direction as often as needed to cover the background painting area.',
    'repeat-x': 'Computes to ‘repeat no-repeat’.',
    'repeat-y': 'Computes to ‘no-repeat repeat’.',
    'round': 'Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.',
    'space': 'Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area.'
};
const lineStyleKeywords = {
    'dashed': 'A series of square-ended dashes.',
    'dotted': 'A series of round dots.',
    'double': 'Two parallel solid lines with some space between them.',
    'groove': 'Looks as if it were carved in the canvas.',
    'hidden': 'Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables.',
    'inset': 'Looks as if the content on the inside of the border is sunken into the canvas.',
    'none': 'No border. Color and width are ignored.',
    'outset': 'Looks as if the content on the inside of the border is coming out of the canvas.',
    'ridge': 'Looks as if it were coming out of the canvas.',
    'solid': 'A single line segment.'
};
const lineWidthKeywords = [
    'medium',
    'thick',
    'thin'
];
const boxKeywords = {
    'border-box': 'The background is painted within (clipped to) the border box.',
    'content-box': 'The background is painted within (clipped to) the content box.',
    'padding-box': 'The background is painted within (clipped to) the padding box.'
};
const geometryBoxKeywords = {
    'margin-box': 'Uses the margin box as reference box.',
    'fill-box': 'Uses the object bounding box as reference box.',
    'stroke-box': 'Uses the stroke bounding box as reference box.',
    'view-box': 'Uses the nearest SVG viewport as reference box.'
};
const cssWideKeywords = {
    'initial': 'Represents the value specified as the property’s initial value.',
    'inherit': 'Represents the computed value of the property on the element’s parent.',
    'unset': 'Acts as either `inherit` or `initial`, depending on whether the property is inherited or not.'
};
const cssWideFunctions = {
    'var()': 'Evaluates the value of a custom variable.',
    'calc()': 'Evaluates an mathematical expression. The following operators can be used: + - * /.'
};
const imageFunctions = {
    'url()': 'Reference an image file by URL',
    'image()': 'Provide image fallbacks and annotations.',
    '-webkit-image-set()': 'Provide multiple resolutions. Remember to use unprefixed image-set() in addition.',
    'image-set()': 'Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation.',
    '-moz-element()': 'Use an element in the document as an image. Remember to use unprefixed element() in addition.',
    'element()': 'Use an element in the document as an image.',
    'cross-fade()': 'Indicates the two images to be combined and how far along in the transition the combination is.',
    '-webkit-gradient()': 'Deprecated. Use modern linear-gradient() or radial-gradient() instead.',
    '-webkit-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    '-moz-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    '-o-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    'linear-gradient()': 'A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.',
    '-webkit-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    '-moz-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    '-o-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    'repeating-linear-gradient()': 'Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.',
    '-webkit-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
    '-moz-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
    'radial-gradient()': 'Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.',
    '-webkit-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
    '-moz-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
    'repeating-radial-gradient()': 'Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.'
};
const transitionTimingFunctions = {
    'ease': 'Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).',
    'ease-in': 'Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).',
    'ease-in-out': 'Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0).',
    'ease-out': 'Equivalent to cubic-bezier(0, 0, 0.58, 1.0).',
    'linear': 'Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0).',
    'step-end': 'Equivalent to steps(1, end).',
    'step-start': 'Equivalent to steps(1, start).',
    'steps()': 'The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”.',
    'cubic-bezier()': 'Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2).',
    'cubic-bezier(0.6, -0.28, 0.735, 0.045)': 'Ease-in Back. Overshoots.',
    'cubic-bezier(0.68, -0.55, 0.265, 1.55)': 'Ease-in-out Back. Overshoots.',
    'cubic-bezier(0.175, 0.885, 0.32, 1.275)': 'Ease-out Back. Overshoots.',
    'cubic-bezier(0.6, 0.04, 0.98, 0.335)': 'Ease-in Circular. Based on half circle.',
    'cubic-bezier(0.785, 0.135, 0.15, 0.86)': 'Ease-in-out Circular. Based on half circle.',
    'cubic-bezier(0.075, 0.82, 0.165, 1)': 'Ease-out Circular. Based on half circle.',
    'cubic-bezier(0.55, 0.055, 0.675, 0.19)': 'Ease-in Cubic. Based on power of three.',
    'cubic-bezier(0.645, 0.045, 0.355, 1)': 'Ease-in-out Cubic. Based on power of three.',
    'cubic-bezier(0.215, 0.610, 0.355, 1)': 'Ease-out Cubic. Based on power of three.',
    'cubic-bezier(0.95, 0.05, 0.795, 0.035)': 'Ease-in Exponential. Based on two to the power ten.',
    'cubic-bezier(1, 0, 0, 1)': 'Ease-in-out Exponential. Based on two to the power ten.',
    'cubic-bezier(0.19, 1, 0.22, 1)': 'Ease-out Exponential. Based on two to the power ten.',
    'cubic-bezier(0.47, 0, 0.745, 0.715)': 'Ease-in Sine.',
    'cubic-bezier(0.445, 0.05, 0.55, 0.95)': 'Ease-in-out Sine.',
    'cubic-bezier(0.39, 0.575, 0.565, 1)': 'Ease-out Sine.',
    'cubic-bezier(0.55, 0.085, 0.68, 0.53)': 'Ease-in Quadratic. Based on power of two.',
    'cubic-bezier(0.455, 0.03, 0.515, 0.955)': 'Ease-in-out Quadratic. Based on power of two.',
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)': 'Ease-out Quadratic. Based on power of two.',
    'cubic-bezier(0.895, 0.03, 0.685, 0.22)': 'Ease-in Quartic. Based on power of four.',
    'cubic-bezier(0.77, 0, 0.175, 1)': 'Ease-in-out Quartic. Based on power of four.',
    'cubic-bezier(0.165, 0.84, 0.44, 1)': 'Ease-out Quartic. Based on power of four.',
    'cubic-bezier(0.755, 0.05, 0.855, 0.06)': 'Ease-in Quintic. Based on power of five.',
    'cubic-bezier(0.86, 0, 0.07, 1)': 'Ease-in-out Quintic. Based on power of five.',
    'cubic-bezier(0.23, 1, 0.320, 1)': 'Ease-out Quintic. Based on power of five.'
};
const basicShapeFunctions = {
    'circle()': 'Defines a circle.',
    'ellipse()': 'Defines an ellipse.',
    'inset()': 'Defines an inset rectangle.',
    'polygon()': 'Defines a polygon.'
};
const units = {
    'length': [
        'cap',
        'ch',
        'cm',
        'cqb',
        'cqh',
        'cqi',
        'cqmax',
        'cqmin',
        'cqw',
        'dvb',
        'dvh',
        'dvi',
        'dvw',
        'em',
        'ex',
        'ic',
        'in',
        'lh',
        'lvb',
        'lvh',
        'lvi',
        'lvw',
        'mm',
        'pc',
        'pt',
        'px',
        'q',
        'rcap',
        'rch',
        'rem',
        'rex',
        'ric',
        'rlh',
        'svb',
        'svh',
        'svi',
        'svw',
        'vb',
        'vh',
        'vi',
        'vmax',
        'vmin',
        'vw'
    ],
    'angle': [
        'deg',
        'rad',
        'grad',
        'turn'
    ],
    'time': [
        'ms',
        's'
    ],
    'frequency': [
        'Hz',
        'kHz'
    ],
    'resolution': [
        'dpi',
        'dpcm',
        'dppx'
    ],
    'percentage': [
        '%',
        'fr'
    ]
};
const html5Tags = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rb',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'const',
    'video',
    'wbr'
];
const svgElements = [
    'circle',
    'clipPath',
    'cursor',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'foreignObject',
    'g',
    'hatch',
    'hatchpath',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'mesh',
    'meshpatch',
    'meshrow',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'set',
    'solidcolor',
    'stop',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'tspan',
    'use',
    'view'
];
const pageBoxDirectives = [
    '@bottom-center',
    '@bottom-left',
    '@bottom-left-corner',
    '@bottom-right',
    '@bottom-right-corner',
    '@left-bottom',
    '@left-middle',
    '@left-top',
    '@right-bottom',
    '@right-middle',
    '@right-top',
    '@top-center',
    '@top-left',
    '@top-left-corner',
    '@top-right',
    '@top-right-corner'
];
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/entry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserNames",
    ()=>browserNames,
    "getBrowserLabel",
    ()=>getBrowserLabel,
    "getEntryDescription",
    ()=>getEntryDescription,
    "textToMarkedString",
    ()=>textToMarkedString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const browserNames = {
    E: 'Edge',
    FF: 'Firefox',
    S: 'Safari',
    C: 'Chrome',
    IE: 'IE',
    O: 'Opera'
};
function getEntryStatus(status) {
    switch(status){
        case 'experimental':
            return '⚠️ Property is experimental. Be cautious when using it.️\n\n';
        case 'nonstandard':
            return '🚨️ Property is nonstandard. Avoid using it.\n\n';
        case 'obsolete':
            return '🚨️️️ Property is obsolete. Avoid using it.\n\n';
        default:
            return '';
    }
}
function getEntryDescription(entry, doesSupportMarkdown, settings) {
    let result;
    if (doesSupportMarkdown) {
        result = {
            kind: 'markdown',
            value: getEntryMarkdownDescription(entry, settings)
        };
    } else {
        result = {
            kind: 'plaintext',
            value: getEntryStringDescription(entry, settings)
        };
    }
    if (result.value === '') {
        return undefined;
    }
    return result;
}
function textToMarkedString(text) {
    text = text.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function getEntryStringDescription(entry, settings) {
    if (!entry.description || entry.description === '') {
        return '';
    }
    if (typeof entry.description !== 'string') {
        return entry.description.value;
    }
    let result = '';
    if (settings?.documentation !== false) {
        if (entry.status) {
            result += getEntryStatus(entry.status);
        }
        result += entry.description;
        const browserLabel = getBrowserLabel(entry.browsers);
        if (browserLabel) {
            result += '\n(' + browserLabel + ')';
        }
        if ('syntax' in entry) {
            result += `\n\nSyntax: ${entry.syntax}`;
        }
    }
    if (entry.references && entry.references.length > 0 && settings?.references !== false) {
        if (result.length > 0) {
            result += '\n\n';
        }
        result += entry.references.map((r)=>{
            return `${r.name}: ${r.url}`;
        }).join(' | ');
    }
    return result;
}
function getEntryMarkdownDescription(entry, settings) {
    if (!entry.description || entry.description === '') {
        return '';
    }
    let result = '';
    if (settings?.documentation !== false) {
        if (entry.status) {
            result += getEntryStatus(entry.status);
        }
        if (typeof entry.description === 'string') {
            result += textToMarkedString(entry.description);
        } else {
            result += entry.description.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$languageserver$2d$types$2f$lib$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkupKind"].Markdown ? entry.description.value : textToMarkedString(entry.description.value);
        }
        const browserLabel = getBrowserLabel(entry.browsers);
        if (browserLabel) {
            result += '\n\n(' + textToMarkedString(browserLabel) + ')';
        }
        if ('syntax' in entry && entry.syntax) {
            result += `\n\nSyntax: ${textToMarkedString(entry.syntax)}`;
        }
    }
    if (entry.references && entry.references.length > 0 && settings?.references !== false) {
        if (result.length > 0) {
            result += '\n\n';
        }
        result += entry.references.map((r)=>{
            return `[${r.name}](${r.url})`;
        }).join(' | ');
    }
    return result;
}
/**
 * Input is like `["E12","FF49","C47","IE","O"]`
 * Output is like `Edge 12, Firefox 49, Chrome 47, IE, Opera`
 */ function getBrowserLabel(browsers = []) {
    if (browsers.length === 0) {
        return null;
    }
    return browsers.map((b)=>{
        let result = '';
        const matches = b.match(/([A-Z]+)(\d+)?/);
        const name = matches[1];
        const version = matches[2];
        if (name in browserNames) {
            result += browserNames[name];
        }
        if (version) {
            result += ' ' + version;
        }
        return result;
    }).join(', ');
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/dataProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSDataProvider",
    ()=>CSSDataProvider
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class CSSDataProvider {
    /**
     * Currently, unversioned data uses the V1 implementation
     * In the future when the provider handles multiple versions of HTML custom data,
     * use the latest implementation for unversioned data
     */ constructor(data){
        this._properties = [];
        this._atDirectives = [];
        this._pseudoClasses = [];
        this._pseudoElements = [];
        this.addData(data);
    }
    provideProperties() {
        return this._properties;
    }
    provideAtDirectives() {
        return this._atDirectives;
    }
    providePseudoClasses() {
        return this._pseudoClasses;
    }
    providePseudoElements() {
        return this._pseudoElements;
    }
    addData(data) {
        if (Array.isArray(data.properties)) {
            for (const prop of data.properties){
                if (isPropertyData(prop)) {
                    this._properties.push(prop);
                }
            }
        }
        if (Array.isArray(data.atDirectives)) {
            for (const prop of data.atDirectives){
                if (isAtDirective(prop)) {
                    this._atDirectives.push(prop);
                }
            }
        }
        if (Array.isArray(data.pseudoClasses)) {
            for (const prop of data.pseudoClasses){
                if (isPseudoClassData(prop)) {
                    this._pseudoClasses.push(prop);
                }
            }
        }
        if (Array.isArray(data.pseudoElements)) {
            for (const prop of data.pseudoElements){
                if (isPseudoElementData(prop)) {
                    this._pseudoElements.push(prop);
                }
            }
        }
    }
}
function isPropertyData(d) {
    return typeof d.name === 'string';
}
function isAtDirective(d) {
    return typeof d.name === 'string';
}
function isPseudoClassData(d) {
    return typeof d.name === 'string';
}
function isPseudoElementData(d) {
    return typeof d.name === 'string';
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/dataManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSDataManager",
    ()=>CSSDataManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/objects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$data$2f$webCustomData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/data/webCustomData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/dataProvider.js [app-client] (ecmascript)");
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class CSSDataManager {
    constructor(options){
        this.dataProviders = [];
        this._propertySet = {};
        this._atDirectiveSet = {};
        this._pseudoClassSet = {};
        this._pseudoElementSet = {};
        this._properties = [];
        this._atDirectives = [];
        this._pseudoClasses = [];
        this._pseudoElements = [];
        this.setDataProviders(options?.useDefaultDataProvider !== false, options?.customDataProviders || []);
    }
    setDataProviders(builtIn, providers) {
        this.dataProviders = [];
        if (builtIn) {
            this.dataProviders.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSDataProvider"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$data$2f$webCustomData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssData"]));
        }
        this.dataProviders.push(...providers);
        this.collectData();
    }
    /**
     * Collect all data  & handle duplicates
     */ collectData() {
        this._propertySet = {};
        this._atDirectiveSet = {};
        this._pseudoClassSet = {};
        this._pseudoElementSet = {};
        this.dataProviders.forEach((provider)=>{
            provider.provideProperties().forEach((p)=>{
                if (!this._propertySet[p.name]) {
                    this._propertySet[p.name] = p;
                }
            });
            provider.provideAtDirectives().forEach((p)=>{
                if (!this._atDirectiveSet[p.name]) {
                    this._atDirectiveSet[p.name] = p;
                }
            });
            provider.providePseudoClasses().forEach((p)=>{
                if (!this._pseudoClassSet[p.name]) {
                    this._pseudoClassSet[p.name] = p;
                }
            });
            provider.providePseudoElements().forEach((p)=>{
                if (!this._pseudoElementSet[p.name]) {
                    this._pseudoElementSet[p.name] = p;
                }
            });
        });
        this._properties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"])(this._propertySet);
        this._atDirectives = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"])(this._atDirectiveSet);
        this._pseudoClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"])(this._pseudoClassSet);
        this._pseudoElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"])(this._pseudoElementSet);
    }
    getProperty(name) {
        return this._propertySet[name];
    }
    getAtDirective(name) {
        return this._atDirectiveSet[name];
    }
    getPseudoClass(name) {
        return this._pseudoClassSet[name];
    }
    getPseudoElement(name) {
        return this._pseudoElementSet[name];
    }
    getProperties() {
        return this._properties;
    }
    getAtDirectives() {
        return this._atDirectives;
    }
    getPseudoClasses() {
        return this._pseudoClasses;
    }
    getPseudoElements() {
        return this._pseudoElements;
    }
    isKnownProperty(name) {
        return name.toLowerCase() in this._propertySet;
    }
    isStandardProperty(name) {
        return this.isKnownProperty(name) && (!this._propertySet[name.toLowerCase()].status || this._propertySet[name.toLowerCase()].status === 'standard');
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/beautify/beautify-css.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "css_beautify",
    ()=>css_beautify
]);
// copied from js-beautify/js/lib/beautify-css.js
// version: 1.15.1
/* AUTO-GENERATED. DO NOT MODIFY. */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@beautifier.io>
        https://beautifier.io/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/ // http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/
var legacy_beautify_css;
/******/ (function() {
    /******/ var __webpack_modules__ = [
        ,
        ,
        function(module) {
            /*jshint node:true */ /*
  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ function OutputLine(parent) {
                this.__parent = parent;
                this.__character_count = 0;
                // use indent_count as a marker for this.__lines that have preserved indentation
                this.__indent_count = -1;
                this.__alignment_count = 0;
                this.__wrap_point_index = 0;
                this.__wrap_point_character_count = 0;
                this.__wrap_point_indent_count = -1;
                this.__wrap_point_alignment_count = 0;
                this.__items = [];
            }
            OutputLine.prototype.clone_empty = function() {
                var line = new OutputLine(this.__parent);
                line.set_indent(this.__indent_count, this.__alignment_count);
                return line;
            };
            OutputLine.prototype.item = function(index) {
                if (index < 0) {
                    return this.__items[this.__items.length + index];
                } else {
                    return this.__items[index];
                }
            };
            OutputLine.prototype.has_match = function(pattern) {
                for(var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--){
                    if (this.__items[lastCheckedOutput].match(pattern)) {
                        return true;
                    }
                }
                return false;
            };
            OutputLine.prototype.set_indent = function(indent, alignment) {
                if (this.is_empty()) {
                    this.__indent_count = indent || 0;
                    this.__alignment_count = alignment || 0;
                    this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
                }
            };
            OutputLine.prototype._set_wrap_point = function() {
                if (this.__parent.wrap_line_length) {
                    this.__wrap_point_index = this.__items.length;
                    this.__wrap_point_character_count = this.__character_count;
                    this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
                    this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
                }
            };
            OutputLine.prototype._should_wrap = function() {
                return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
            };
            OutputLine.prototype._allow_wrap = function() {
                if (this._should_wrap()) {
                    this.__parent.add_new_line();
                    var next = this.__parent.current_line;
                    next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
                    next.__items = this.__items.slice(this.__wrap_point_index);
                    this.__items = this.__items.slice(0, this.__wrap_point_index);
                    next.__character_count += this.__character_count - this.__wrap_point_character_count;
                    this.__character_count = this.__wrap_point_character_count;
                    if (next.__items[0] === " ") {
                        next.__items.splice(0, 1);
                        next.__character_count -= 1;
                    }
                    return true;
                }
                return false;
            };
            OutputLine.prototype.is_empty = function() {
                return this.__items.length === 0;
            };
            OutputLine.prototype.last = function() {
                if (!this.is_empty()) {
                    return this.__items[this.__items.length - 1];
                } else {
                    return null;
                }
            };
            OutputLine.prototype.push = function(item) {
                this.__items.push(item);
                var last_newline_index = item.lastIndexOf('\n');
                if (last_newline_index !== -1) {
                    this.__character_count = item.length - last_newline_index;
                } else {
                    this.__character_count += item.length;
                }
            };
            OutputLine.prototype.pop = function() {
                var item = null;
                if (!this.is_empty()) {
                    item = this.__items.pop();
                    this.__character_count -= item.length;
                }
                return item;
            };
            OutputLine.prototype._remove_indent = function() {
                if (this.__indent_count > 0) {
                    this.__indent_count -= 1;
                    this.__character_count -= this.__parent.indent_size;
                }
            };
            OutputLine.prototype._remove_wrap_indent = function() {
                if (this.__wrap_point_indent_count > 0) {
                    this.__wrap_point_indent_count -= 1;
                }
            };
            OutputLine.prototype.trim = function() {
                while(this.last() === ' '){
                    this.__items.pop();
                    this.__character_count -= 1;
                }
            };
            OutputLine.prototype.toString = function() {
                var result = '';
                if (this.is_empty()) {
                    if (this.__parent.indent_empty_lines) {
                        result = this.__parent.get_indent_string(this.__indent_count);
                    }
                } else {
                    result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
                    result += this.__items.join('');
                }
                return result;
            };
            function IndentStringCache(options, baseIndentString) {
                this.__cache = [
                    ''
                ];
                this.__indent_size = options.indent_size;
                this.__indent_string = options.indent_char;
                if (!options.indent_with_tabs) {
                    this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
                }
                // Set to null to continue support for auto detection of base indent
                baseIndentString = baseIndentString || '';
                if (options.indent_level > 0) {
                    baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
                }
                this.__base_string = baseIndentString;
                this.__base_string_length = baseIndentString.length;
            }
            IndentStringCache.prototype.get_indent_size = function(indent, column) {
                var result = this.__base_string_length;
                column = column || 0;
                if (indent < 0) {
                    result = 0;
                }
                result += indent * this.__indent_size;
                result += column;
                return result;
            };
            IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
                var result = this.__base_string;
                column = column || 0;
                if (indent_level < 0) {
                    indent_level = 0;
                    result = '';
                }
                column += indent_level * this.__indent_size;
                this.__ensure_cache(column);
                result += this.__cache[column];
                return result;
            };
            IndentStringCache.prototype.__ensure_cache = function(column) {
                while(column >= this.__cache.length){
                    this.__add_column();
                }
            };
            IndentStringCache.prototype.__add_column = function() {
                var column = this.__cache.length;
                var indent = 0;
                var result = '';
                if (this.__indent_size && column >= this.__indent_size) {
                    indent = Math.floor(column / this.__indent_size);
                    column -= indent * this.__indent_size;
                    result = new Array(indent + 1).join(this.__indent_string);
                }
                if (column) {
                    result += new Array(column + 1).join(' ');
                }
                this.__cache.push(result);
            };
            function Output(options, baseIndentString) {
                this.__indent_cache = new IndentStringCache(options, baseIndentString);
                this.raw = false;
                this._end_with_newline = options.end_with_newline;
                this.indent_size = options.indent_size;
                this.wrap_line_length = options.wrap_line_length;
                this.indent_empty_lines = options.indent_empty_lines;
                this.__lines = [];
                this.previous_line = null;
                this.current_line = null;
                this.next_line = new OutputLine(this);
                this.space_before_token = false;
                this.non_breaking_space = false;
                this.previous_token_wrapped = false;
                // initialize
                this.__add_outputline();
            }
            Output.prototype.__add_outputline = function() {
                this.previous_line = this.current_line;
                this.current_line = this.next_line.clone_empty();
                this.__lines.push(this.current_line);
            };
            Output.prototype.get_line_number = function() {
                return this.__lines.length;
            };
            Output.prototype.get_indent_string = function(indent, column) {
                return this.__indent_cache.get_indent_string(indent, column);
            };
            Output.prototype.get_indent_size = function(indent, column) {
                return this.__indent_cache.get_indent_size(indent, column);
            };
            Output.prototype.is_empty = function() {
                return !this.previous_line && this.current_line.is_empty();
            };
            Output.prototype.add_new_line = function(force_newline) {
                // never newline at the start of file
                // otherwise, newline only if we didn't just add one or we're forced
                if (this.is_empty() || !force_newline && this.just_added_newline()) {
                    return false;
                }
                // if raw output is enabled, don't print additional newlines,
                // but still return True as though you had
                if (!this.raw) {
                    this.__add_outputline();
                }
                return true;
            };
            Output.prototype.get_code = function(eol) {
                this.trim(true);
                // handle some edge cases where the last tokens
                // has text that ends with newline(s)
                var last_item = this.current_line.pop();
                if (last_item) {
                    if (last_item[last_item.length - 1] === '\n') {
                        last_item = last_item.replace(/\n+$/g, '');
                    }
                    this.current_line.push(last_item);
                }
                if (this._end_with_newline) {
                    this.__add_outputline();
                }
                var sweet_code = this.__lines.join('\n');
                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }
                return sweet_code;
            };
            Output.prototype.set_wrap_point = function() {
                this.current_line._set_wrap_point();
            };
            Output.prototype.set_indent = function(indent, alignment) {
                indent = indent || 0;
                alignment = alignment || 0;
                // Next line stores alignment values
                this.next_line.set_indent(indent, alignment);
                // Never indent your first output indent at the start of the file
                if (this.__lines.length > 1) {
                    this.current_line.set_indent(indent, alignment);
                    return true;
                }
                this.current_line.set_indent();
                return false;
            };
            Output.prototype.add_raw_token = function(token) {
                for(var x = 0; x < token.newlines; x++){
                    this.__add_outputline();
                }
                this.current_line.set_indent(-1);
                this.current_line.push(token.whitespace_before);
                this.current_line.push(token.text);
                this.space_before_token = false;
                this.non_breaking_space = false;
                this.previous_token_wrapped = false;
            };
            Output.prototype.add_token = function(printable_token) {
                this.__add_space_before_token();
                this.current_line.push(printable_token);
                this.space_before_token = false;
                this.non_breaking_space = false;
                this.previous_token_wrapped = this.current_line._allow_wrap();
            };
            Output.prototype.__add_space_before_token = function() {
                if (this.space_before_token && !this.just_added_newline()) {
                    if (!this.non_breaking_space) {
                        this.set_wrap_point();
                    }
                    this.current_line.push(' ');
                }
            };
            Output.prototype.remove_indent = function(index) {
                var output_length = this.__lines.length;
                while(index < output_length){
                    this.__lines[index]._remove_indent();
                    index++;
                }
                this.current_line._remove_wrap_indent();
            };
            Output.prototype.trim = function(eat_newlines) {
                eat_newlines = eat_newlines === undefined ? false : eat_newlines;
                this.current_line.trim();
                while(eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()){
                    this.__lines.pop();
                    this.current_line = this.__lines[this.__lines.length - 1];
                    this.current_line.trim();
                }
                this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
            };
            Output.prototype.just_added_newline = function() {
                return this.current_line.is_empty();
            };
            Output.prototype.just_added_blankline = function() {
                return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
            };
            Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
                var index = this.__lines.length - 2;
                while(index >= 0){
                    var potentialEmptyLine = this.__lines[index];
                    if (potentialEmptyLine.is_empty()) {
                        break;
                    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
                        this.__lines.splice(index + 1, 0, new OutputLine(this));
                        this.previous_line = this.__lines[this.__lines.length - 2];
                        break;
                    }
                    index--;
                }
            };
            module.exports.Output = Output;
        /***/ },
        ,
        ,
        ,
        function(module) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ function Options(options, merge_child_field) {
                this.raw_options = _mergeOpts(options, merge_child_field);
                // Support passing the source text back with no change
                this.disabled = this._get_boolean('disabled');
                this.eol = this._get_characters('eol', 'auto');
                this.end_with_newline = this._get_boolean('end_with_newline');
                this.indent_size = this._get_number('indent_size', 4);
                this.indent_char = this._get_characters('indent_char', ' ');
                this.indent_level = this._get_number('indent_level');
                this.preserve_newlines = this._get_boolean('preserve_newlines', true);
                this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
                if (!this.preserve_newlines) {
                    this.max_preserve_newlines = 0;
                }
                this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
                if (this.indent_with_tabs) {
                    this.indent_char = '\t';
                    // indent_size behavior changed after 1.8.6
                    // It used to be that indent_size would be
                    // set to 1 for indent_with_tabs. That is no longer needed and
                    // actually doesn't make sense - why not use spaces? Further,
                    // that might produce unexpected behavior - tabs being used
                    // for single-column alignment. So, when indent_with_tabs is true
                    // and indent_size is 1, reset indent_size to 4.
                    if (this.indent_size === 1) {
                        this.indent_size = 4;
                    }
                }
                // Backwards compat with 1.3.x
                this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
                this.indent_empty_lines = this._get_boolean('indent_empty_lines');
                // valid templating languages ['django', 'erb', 'handlebars', 'php', 'smarty', 'angular']
                // For now, 'auto' = all off for javascript, all except angular on for html (and inline javascript/css).
                // other values ignored
                this.templating = this._get_selection_list('templating', [
                    'auto',
                    'none',
                    'angular',
                    'django',
                    'erb',
                    'handlebars',
                    'php',
                    'smarty'
                ], [
                    'auto'
                ]);
            }
            Options.prototype._get_array = function(name, default_value) {
                var option_value = this.raw_options[name];
                var result = default_value || [];
                if (typeof option_value === 'object') {
                    if (option_value !== null && typeof option_value.concat === 'function') {
                        result = option_value.concat();
                    }
                } else if (typeof option_value === 'string') {
                    result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
                }
                return result;
            };
            Options.prototype._get_boolean = function(name, default_value) {
                var option_value = this.raw_options[name];
                var result = option_value === undefined ? !!default_value : !!option_value;
                return result;
            };
            Options.prototype._get_characters = function(name, default_value) {
                var option_value = this.raw_options[name];
                var result = default_value || '';
                if (typeof option_value === 'string') {
                    result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
                }
                return result;
            };
            Options.prototype._get_number = function(name, default_value) {
                var option_value = this.raw_options[name];
                default_value = parseInt(default_value, 10);
                if (isNaN(default_value)) {
                    default_value = 0;
                }
                var result = parseInt(option_value, 10);
                if (isNaN(result)) {
                    result = default_value;
                }
                return result;
            };
            Options.prototype._get_selection = function(name, selection_list, default_value) {
                var result = this._get_selection_list(name, selection_list, default_value);
                if (result.length !== 1) {
                    throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
                }
                return result[0];
            };
            Options.prototype._get_selection_list = function(name, selection_list, default_value) {
                if (!selection_list || selection_list.length === 0) {
                    throw new Error("Selection list cannot be empty.");
                }
                default_value = default_value || [
                    selection_list[0]
                ];
                if (!this._is_valid_selection(default_value, selection_list)) {
                    throw new Error("Invalid Default Value!");
                }
                var result = this._get_array(name, default_value);
                if (!this._is_valid_selection(result, selection_list)) {
                    throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
                }
                return result;
            };
            Options.prototype._is_valid_selection = function(result, selection_list) {
                return result.length && selection_list.length && !result.some(function(item) {
                    return selection_list.indexOf(item) === -1;
                });
            };
            // merges child options up with the parent options object
            // Example: obj = {a: 1, b: {a: 2}}
            //          mergeOpts(obj, 'b')
            //
            //          Returns: {a: 2}
            function _mergeOpts(allOptions, childFieldName) {
                var finalOpts = {};
                allOptions = _normalizeOpts(allOptions);
                var name;
                for(name in allOptions){
                    if (name !== childFieldName) {
                        finalOpts[name] = allOptions[name];
                    }
                }
                //merge in the per type settings for the childFieldName
                if (childFieldName && allOptions[childFieldName]) {
                    for(name in allOptions[childFieldName]){
                        finalOpts[name] = allOptions[childFieldName][name];
                    }
                }
                return finalOpts;
            }
            function _normalizeOpts(options) {
                var convertedOpts = {};
                var key;
                for(key in options){
                    var newKey = key.replace(/-/g, "_");
                    convertedOpts[newKey] = options[key];
                }
                return convertedOpts;
            }
            module.exports.Options = Options;
            module.exports.normalizeOpts = _normalizeOpts;
            module.exports.mergeOpts = _mergeOpts;
        /***/ },
        ,
        function(module) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');
            function InputScanner(input_string) {
                this.__input = input_string || '';
                this.__input_length = this.__input.length;
                this.__position = 0;
            }
            InputScanner.prototype.restart = function() {
                this.__position = 0;
            };
            InputScanner.prototype.back = function() {
                if (this.__position > 0) {
                    this.__position -= 1;
                }
            };
            InputScanner.prototype.hasNext = function() {
                return this.__position < this.__input_length;
            };
            InputScanner.prototype.next = function() {
                var val = null;
                if (this.hasNext()) {
                    val = this.__input.charAt(this.__position);
                    this.__position += 1;
                }
                return val;
            };
            InputScanner.prototype.peek = function(index) {
                var val = null;
                index = index || 0;
                index += this.__position;
                if (index >= 0 && index < this.__input_length) {
                    val = this.__input.charAt(index);
                }
                return val;
            };
            // This is a JavaScript only helper function (not in python)
            // Javascript doesn't have a match method
            // and not all implementation support "sticky" flag.
            // If they do not support sticky then both this.match() and this.test() method
            // must get the match and check the index of the match.
            // If sticky is supported and set, this method will use it.
            // Otherwise it will check that global is set, and fall back to the slower method.
            InputScanner.prototype.__match = function(pattern, index) {
                pattern.lastIndex = index;
                var pattern_match = pattern.exec(this.__input);
                if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
                    if (pattern_match.index !== index) {
                        pattern_match = null;
                    }
                }
                return pattern_match;
            };
            InputScanner.prototype.test = function(pattern, index) {
                index = index || 0;
                index += this.__position;
                if (index >= 0 && index < this.__input_length) {
                    return !!this.__match(pattern, index);
                } else {
                    return false;
                }
            };
            InputScanner.prototype.testChar = function(pattern, index) {
                // test one character regex match
                var val = this.peek(index);
                pattern.lastIndex = 0;
                return val !== null && pattern.test(val);
            };
            InputScanner.prototype.match = function(pattern) {
                var pattern_match = this.__match(pattern, this.__position);
                if (pattern_match) {
                    this.__position += pattern_match[0].length;
                } else {
                    pattern_match = null;
                }
                return pattern_match;
            };
            InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
                var val = '';
                var match;
                if (starting_pattern) {
                    match = this.match(starting_pattern);
                    if (match) {
                        val += match[0];
                    }
                }
                if (until_pattern && (match || !starting_pattern)) {
                    val += this.readUntil(until_pattern, until_after);
                }
                return val;
            };
            InputScanner.prototype.readUntil = function(pattern, until_after) {
                var val = '';
                var match_index = this.__position;
                pattern.lastIndex = this.__position;
                var pattern_match = pattern.exec(this.__input);
                if (pattern_match) {
                    match_index = pattern_match.index;
                    if (until_after) {
                        match_index += pattern_match[0].length;
                    }
                } else {
                    match_index = this.__input_length;
                }
                val = this.__input.substring(this.__position, match_index);
                this.__position = match_index;
                return val;
            };
            InputScanner.prototype.readUntilAfter = function(pattern) {
                return this.readUntil(pattern, true);
            };
            InputScanner.prototype.get_regexp = function(pattern, match_from) {
                var result = null;
                var flags = 'g';
                if (match_from && regexp_has_sticky) {
                    flags = 'y';
                }
                // strings are converted to regexp
                if (typeof pattern === "string" && pattern !== '') {
                    // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
                    result = new RegExp(pattern, flags);
                } else if (pattern) {
                    result = new RegExp(pattern.source, flags);
                }
                return result;
            };
            InputScanner.prototype.get_literal_regexp = function(literal_string) {
                return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            };
            /* css beautifier legacy helpers */ InputScanner.prototype.peekUntilAfter = function(pattern) {
                var start = this.__position;
                var val = this.readUntilAfter(pattern);
                this.__position = start;
                return val;
            };
            InputScanner.prototype.lookBack = function(testVal) {
                var start = this.__position - 1;
                return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
            };
            module.exports.InputScanner = InputScanner;
        /***/ },
        ,
        ,
        ,
        ,
        function(module) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ function Directives(start_block_pattern, end_block_pattern) {
                start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
                end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
                this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
                this.__directive_pattern = / (\w+)[:](\w+)/g;
                this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
            }
            Directives.prototype.get_directives = function(text) {
                if (!text.match(this.__directives_block_pattern)) {
                    return null;
                }
                var directives = {};
                this.__directive_pattern.lastIndex = 0;
                var directive_match = this.__directive_pattern.exec(text);
                while(directive_match){
                    directives[directive_match[1]] = directive_match[2];
                    directive_match = this.__directive_pattern.exec(text);
                }
                return directives;
            };
            Directives.prototype.readIgnored = function(input) {
                return input.readUntilAfter(this.__directives_end_ignore_pattern);
            };
            module.exports.Directives = Directives;
        /***/ },
        ,
        function(module, __unused_webpack_exports, __webpack_require__) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ var Beautifier = __webpack_require__(16).Beautifier, Options = __webpack_require__(17).Options;
            function css_beautify(source_text, options) {
                var beautifier = new Beautifier(source_text, options);
                return beautifier.beautify();
            }
            module.exports = css_beautify;
            module.exports.defaultOptions = function() {
                return new Options();
            };
        /***/ },
        function(module, __unused_webpack_exports, __webpack_require__) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ var Options = __webpack_require__(17).Options;
            var Output = __webpack_require__(2).Output;
            var InputScanner = __webpack_require__(8).InputScanner;
            var Directives = __webpack_require__(13).Directives;
            var directives_core = new Directives(/\/\*/, /\*\//);
            var lineBreak = /\r\n|[\r\n]/;
            var allLineBreaks = /\r\n|[\r\n]/g;
            // tokenizer
            var whitespaceChar = /\s/;
            var whitespacePattern = /(?:\s|\n)+/g;
            var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
            var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
            function Beautifier(source_text, options) {
                this._source_text = source_text || '';
                // Allow the setting of language/file-type specific options
                // with inheritance of overall settings
                this._options = new Options(options);
                this._ch = null;
                this._input = null;
                // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
                this.NESTED_AT_RULE = {
                    "page": true,
                    "font-face": true,
                    "keyframes": true,
                    // also in CONDITIONAL_GROUP_RULE below
                    "media": true,
                    "supports": true,
                    "document": true
                };
                this.CONDITIONAL_GROUP_RULE = {
                    "media": true,
                    "supports": true,
                    "document": true
                };
                this.NON_SEMICOLON_NEWLINE_PROPERTY = [
                    "grid-template-areas",
                    "grid-template"
                ];
            }
            Beautifier.prototype.eatString = function(endChars) {
                var result = '';
                this._ch = this._input.next();
                while(this._ch){
                    result += this._ch;
                    if (this._ch === "\\") {
                        result += this._input.next();
                    } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
                        break;
                    }
                    this._ch = this._input.next();
                }
                return result;
            };
            // Skips any white space in the source text from the current position.
            // When allowAtLeastOneNewLine is true, will output new lines for each
            // newline character found; if the user has preserve_newlines off, only
            // the first newline will be output
            Beautifier.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
                var result = whitespaceChar.test(this._input.peek());
                var newline_count = 0;
                while(whitespaceChar.test(this._input.peek())){
                    this._ch = this._input.next();
                    if (allowAtLeastOneNewLine && this._ch === '\n') {
                        if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
                            newline_count++;
                            this._output.add_new_line(true);
                        }
                    }
                }
                return result;
            };
            // Nested pseudo-class if we are insideRule
            // and the next special character found opens
            // a new block
            Beautifier.prototype.foundNestedPseudoClass = function() {
                var openParen = 0;
                var i = 1;
                var ch = this._input.peek(i);
                while(ch){
                    if (ch === "{") {
                        return true;
                    } else if (ch === '(') {
                        // pseudoclasses can contain ()
                        openParen += 1;
                    } else if (ch === ')') {
                        if (openParen === 0) {
                            return false;
                        }
                        openParen -= 1;
                    } else if (ch === ";" || ch === "}") {
                        return false;
                    }
                    i++;
                    ch = this._input.peek(i);
                }
                return false;
            };
            Beautifier.prototype.print_string = function(output_string) {
                this._output.set_indent(this._indentLevel);
                this._output.non_breaking_space = true;
                this._output.add_token(output_string);
            };
            Beautifier.prototype.preserveSingleSpace = function(isAfterSpace) {
                if (isAfterSpace) {
                    this._output.space_before_token = true;
                }
            };
            Beautifier.prototype.indent = function() {
                this._indentLevel++;
            };
            Beautifier.prototype.outdent = function() {
                if (this._indentLevel > 0) {
                    this._indentLevel--;
                }
            };
            /*_____________________--------------------_____________________*/ Beautifier.prototype.beautify = function() {
                if (this._options.disabled) {
                    return this._source_text;
                }
                var source_text = this._source_text;
                var eol = this._options.eol;
                if (eol === 'auto') {
                    eol = '\n';
                    if (source_text && lineBreak.test(source_text || '')) {
                        eol = source_text.match(lineBreak)[0];
                    }
                }
                // HACK: newline parsing inconsistent. This brute force normalizes the this._input.
                source_text = source_text.replace(allLineBreaks, '\n');
                // reset
                var baseIndentString = source_text.match(/^[\t ]*/)[0];
                this._output = new Output(this._options, baseIndentString);
                this._input = new InputScanner(source_text);
                this._indentLevel = 0;
                this._nestedLevel = 0;
                this._ch = null;
                var parenLevel = 0;
                var insideRule = false;
                // This is the value side of a property value pair (blue in the following ex)
                // label { content: blue }
                var insidePropertyValue = false;
                var enteringConditionalGroup = false;
                var insideNonNestedAtRule = false;
                var insideScssMap = false;
                var topCharacter = this._ch;
                var insideNonSemiColonValues = false;
                var whitespace;
                var isAfterSpace;
                var previous_ch;
                while(true){
                    whitespace = this._input.read(whitespacePattern);
                    isAfterSpace = whitespace !== '';
                    previous_ch = topCharacter;
                    this._ch = this._input.next();
                    if (this._ch === '\\' && this._input.hasNext()) {
                        this._ch += this._input.next();
                    }
                    topCharacter = this._ch;
                    if (!this._ch) {
                        break;
                    } else if (this._ch === '/' && this._input.peek() === '*') {
                        // /* css comment */
                        // Always start block comments on a new line.
                        // This handles scenarios where a block comment immediately
                        // follows a property definition on the same line or where
                        // minified code is being beautified.
                        this._output.add_new_line();
                        this._input.back();
                        var comment = this._input.read(block_comment_pattern);
                        // Handle ignore directive
                        var directives = directives_core.get_directives(comment);
                        if (directives && directives.ignore === 'start') {
                            comment += directives_core.readIgnored(this._input);
                        }
                        this.print_string(comment);
                        // Ensures any new lines following the comment are preserved
                        this.eatWhitespace(true);
                        // Block comments are followed by a new line so they don't
                        // share a line with other properties
                        this._output.add_new_line();
                    } else if (this._ch === '/' && this._input.peek() === '/') {
                        // // single line comment
                        // Preserves the space before a comment
                        // on the same line as a rule
                        this._output.space_before_token = true;
                        this._input.back();
                        this.print_string(this._input.read(comment_pattern));
                        // Ensures any new lines following the comment are preserved
                        this.eatWhitespace(true);
                    } else if (this._ch === '$') {
                        this.preserveSingleSpace(isAfterSpace);
                        this.print_string(this._ch);
                        // strip trailing space, if present, for hash property checks
                        var variable = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                        if (variable.match(/[ :]$/)) {
                            // we have a variable or pseudo-class, add it and insert one space before continuing
                            variable = this.eatString(": ").replace(/\s+$/, '');
                            this.print_string(variable);
                            this._output.space_before_token = true;
                        }
                        // might be sass variable
                        if (parenLevel === 0 && variable.indexOf(':') !== -1) {
                            insidePropertyValue = true;
                            this.indent();
                        }
                    } else if (this._ch === '@') {
                        this.preserveSingleSpace(isAfterSpace);
                        // deal with less property mixins @{...}
                        if (this._input.peek() === '{') {
                            this.print_string(this._ch + this.eatString('}'));
                        } else {
                            this.print_string(this._ch);
                            // strip trailing space, if present, for hash property checks
                            var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                            if (variableOrRule.match(/[ :]$/)) {
                                // we have a variable or pseudo-class, add it and insert one space before continuing
                                variableOrRule = this.eatString(": ").replace(/\s+$/, '');
                                this.print_string(variableOrRule);
                                this._output.space_before_token = true;
                            }
                            // might be less variable
                            if (parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
                                insidePropertyValue = true;
                                this.indent();
                            // might be a nesting at-rule
                            } else if (variableOrRule in this.NESTED_AT_RULE) {
                                this._nestedLevel += 1;
                                if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                                    enteringConditionalGroup = true;
                                }
                            // might be a non-nested at-rule
                            } else if (parenLevel === 0 && !insidePropertyValue) {
                                insideNonNestedAtRule = true;
                            }
                        }
                    } else if (this._ch === '#' && this._input.peek() === '{') {
                        this.preserveSingleSpace(isAfterSpace);
                        this.print_string(this._ch + this.eatString('}'));
                    } else if (this._ch === '{') {
                        if (insidePropertyValue) {
                            insidePropertyValue = false;
                            this.outdent();
                        }
                        // non nested at rule becomes nested
                        insideNonNestedAtRule = false;
                        // when entering conditional groups, only rulesets are allowed
                        if (enteringConditionalGroup) {
                            enteringConditionalGroup = false;
                            insideRule = this._indentLevel >= this._nestedLevel;
                        } else {
                            // otherwise, declarations are also allowed
                            insideRule = this._indentLevel >= this._nestedLevel - 1;
                        }
                        if (this._options.newline_between_rules && insideRule) {
                            if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
                                this._output.ensure_empty_line_above('/', ',');
                            }
                        }
                        this._output.space_before_token = true;
                        // The difference in print_string and indent order is necessary to indent the '{' correctly
                        if (this._options.brace_style === 'expand') {
                            this._output.add_new_line();
                            this.print_string(this._ch);
                            this.indent();
                            this._output.set_indent(this._indentLevel);
                        } else {
                            // inside mixin and first param is object
                            if (previous_ch === '(') {
                                this._output.space_before_token = false;
                            } else if (previous_ch !== ',') {
                                this.indent();
                            }
                            this.print_string(this._ch);
                        }
                        this.eatWhitespace(true);
                        this._output.add_new_line();
                    } else if (this._ch === '}') {
                        this.outdent();
                        this._output.add_new_line();
                        if (previous_ch === '{') {
                            this._output.trim(true);
                        }
                        if (insidePropertyValue) {
                            this.outdent();
                            insidePropertyValue = false;
                        }
                        this.print_string(this._ch);
                        insideRule = false;
                        if (this._nestedLevel) {
                            this._nestedLevel--;
                        }
                        this.eatWhitespace(true);
                        this._output.add_new_line();
                        if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
                            if (this._input.peek() !== '}') {
                                this._output.add_new_line(true);
                            }
                        }
                        if (this._input.peek() === ')') {
                            this._output.trim(true);
                            if (this._options.brace_style === "expand") {
                                this._output.add_new_line(true);
                            }
                        }
                    } else if (this._ch === ":") {
                        for(var i = 0; i < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; i++){
                            if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[i])) {
                                insideNonSemiColonValues = true;
                                break;
                            }
                        }
                        if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideNonNestedAtRule && parenLevel === 0) {
                            // 'property: value' delimiter
                            // which could be in a conditional group query
                            this.print_string(':');
                            if (!insidePropertyValue) {
                                insidePropertyValue = true;
                                this._output.space_before_token = true;
                                this.eatWhitespace(true);
                                this.indent();
                            }
                        } else {
                            // sass/less parent reference don't use a space
                            // sass nested pseudo-class don't use a space
                            // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                            if (this._input.lookBack(" ")) {
                                this._output.space_before_token = true;
                            }
                            if (this._input.peek() === ":") {
                                // pseudo-element
                                this._ch = this._input.next();
                                this.print_string("::");
                            } else {
                                // pseudo-class
                                this.print_string(':');
                            }
                        }
                    } else if (this._ch === '"' || this._ch === '\'') {
                        var preserveQuoteSpace = previous_ch === '"' || previous_ch === '\'';
                        this.preserveSingleSpace(preserveQuoteSpace || isAfterSpace);
                        this.print_string(this._ch + this.eatString(this._ch));
                        this.eatWhitespace(true);
                    } else if (this._ch === ';') {
                        insideNonSemiColonValues = false;
                        if (parenLevel === 0) {
                            if (insidePropertyValue) {
                                this.outdent();
                                insidePropertyValue = false;
                            }
                            insideNonNestedAtRule = false;
                            this.print_string(this._ch);
                            this.eatWhitespace(true);
                            // This maintains single line comments on the same
                            // line. Block comments are also affected, but
                            // a new line is always output before one inside
                            // that section
                            if (this._input.peek() !== '/') {
                                this._output.add_new_line();
                            }
                        } else {
                            this.print_string(this._ch);
                            this.eatWhitespace(true);
                            this._output.space_before_token = true;
                        }
                    } else if (this._ch === '(') {
                        if (this._input.lookBack("url")) {
                            this.print_string(this._ch);
                            this.eatWhitespace();
                            parenLevel++;
                            this.indent();
                            this._ch = this._input.next();
                            if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
                                this._input.back();
                            } else if (this._ch) {
                                this.print_string(this._ch + this.eatString(')'));
                                if (parenLevel) {
                                    parenLevel--;
                                    this.outdent();
                                }
                            }
                        } else {
                            var space_needed = false;
                            if (this._input.lookBack("with")) {
                                // look back is not an accurate solution, we need tokens to confirm without whitespaces
                                space_needed = true;
                            }
                            this.preserveSingleSpace(isAfterSpace || space_needed);
                            this.print_string(this._ch);
                            // handle scss/sass map
                            if (insidePropertyValue && previous_ch === "$" && this._options.selector_separator_newline) {
                                this._output.add_new_line();
                                insideScssMap = true;
                            } else {
                                this.eatWhitespace();
                                parenLevel++;
                                this.indent();
                            }
                        }
                    } else if (this._ch === ')') {
                        if (parenLevel) {
                            parenLevel--;
                            this.outdent();
                        }
                        if (insideScssMap && this._input.peek() === ";" && this._options.selector_separator_newline) {
                            insideScssMap = false;
                            this.outdent();
                            this._output.add_new_line();
                        }
                        this.print_string(this._ch);
                    } else if (this._ch === ',') {
                        this.print_string(this._ch);
                        this.eatWhitespace(true);
                        if (this._options.selector_separator_newline && (!insidePropertyValue || insideScssMap) && parenLevel === 0 && !insideNonNestedAtRule) {
                            this._output.add_new_line();
                        } else {
                            this._output.space_before_token = true;
                        }
                    } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
                        //handle combinator spacing
                        if (this._options.space_around_combinator) {
                            this._output.space_before_token = true;
                            this.print_string(this._ch);
                            this._output.space_before_token = true;
                        } else {
                            this.print_string(this._ch);
                            this.eatWhitespace();
                            // squash extra whitespace
                            if (this._ch && whitespaceChar.test(this._ch)) {
                                this._ch = '';
                            }
                        }
                    } else if (this._ch === ']') {
                        this.print_string(this._ch);
                    } else if (this._ch === '[') {
                        this.preserveSingleSpace(isAfterSpace);
                        this.print_string(this._ch);
                    } else if (this._ch === '=') {
                        this.eatWhitespace();
                        this.print_string('=');
                        if (whitespaceChar.test(this._ch)) {
                            this._ch = '';
                        }
                    } else if (this._ch === '!' && !this._input.lookBack("\\")) {
                        this._output.space_before_token = true;
                        this.print_string(this._ch);
                    } else {
                        var preserveAfterSpace = previous_ch === '"' || previous_ch === '\'';
                        this.preserveSingleSpace(preserveAfterSpace || isAfterSpace);
                        this.print_string(this._ch);
                        if (!this._output.just_added_newline() && this._input.peek() === '\n' && insideNonSemiColonValues) {
                            this._output.add_new_line();
                        }
                    }
                }
                var sweetCode = this._output.get_code(eol);
                return sweetCode;
            };
            module.exports.Beautifier = Beautifier;
        /***/ },
        function(module, __unused_webpack_exports, __webpack_require__) {
            /*jshint node:true */ /*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/ var BaseOptions = __webpack_require__(6).Options;
            function Options(options) {
                BaseOptions.call(this, options, 'css');
                this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
                this.newline_between_rules = this._get_boolean('newline_between_rules', true);
                var space_around_selector_separator = this._get_boolean('space_around_selector_separator');
                this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;
                var brace_style_split = this._get_selection_list('brace_style', [
                    'collapse',
                    'expand',
                    'end-expand',
                    'none',
                    'preserve-inline'
                ]);
                this.brace_style = 'collapse';
                for(var bs = 0; bs < brace_style_split.length; bs++){
                    if (brace_style_split[bs] !== 'expand') {
                        // default to collapse, as only collapse|expand is implemented for now
                        this.brace_style = 'collapse';
                    } else {
                        this.brace_style = brace_style_split[bs];
                    }
                }
            }
            Options.prototype = new BaseOptions();
            module.exports.Options = Options;
        /***/ }
    ];
    /************************************************************************/ /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/ /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
        /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = __webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {}
        };
        /******/ /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/ /******/ // Return the exports of the module
        /******/ return module.exports;
    /******/ }
    /******/ /************************************************************************/ /******/ /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__(15);
    /******/ legacy_beautify_css = __webpack_exports__;
/******/ /******/ })();
var css_beautify = legacy_beautify_css;
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageService.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCSSLanguageService",
    ()=>getCSSLanguageService,
    "getLESSLanguageService",
    ()=>getLESSLanguageService,
    "getSCSSLanguageService",
    ()=>getSCSSLanguageService,
    "newCSSDataProvider",
    ()=>newCSSDataProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssHover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssNavigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCodeActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssCodeActions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssValidation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$scssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/scssCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/lessParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lessCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/lessCompletion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssFolding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssFolding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssFormatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssFormatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/dataManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/dataProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssSelectionRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/cssSelectionRange.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$scssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/services/scssNavigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
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
 *--------------------------------------------------------------------------------------------*/ function newCSSDataProvider(data) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSDataProvider"](data);
}
function createFacade(parser, completion, hover, navigation, codeActions, validation, cssDataManager) {
    return {
        configure: (settings)=>{
            validation.configure(settings);
            completion.configure(settings?.completion);
            hover.configure(settings?.hover);
            navigation.configure(settings?.importAliases);
        },
        setDataProviders: cssDataManager.setDataProviders.bind(cssDataManager),
        doValidation: validation.doValidation.bind(validation),
        parseStylesheet: parser.parseStylesheet.bind(parser),
        doComplete: completion.doComplete.bind(completion),
        doComplete2: completion.doComplete2.bind(completion),
        setCompletionParticipants: completion.setCompletionParticipants.bind(completion),
        doHover: hover.doHover.bind(hover),
        format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssFormatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["format"],
        findDefinition: navigation.findDefinition.bind(navigation),
        findReferences: navigation.findReferences.bind(navigation),
        findDocumentHighlights: navigation.findDocumentHighlights.bind(navigation),
        findDocumentLinks: navigation.findDocumentLinks.bind(navigation),
        findDocumentLinks2: navigation.findDocumentLinks2.bind(navigation),
        findDocumentSymbols: navigation.findSymbolInformations.bind(navigation),
        findDocumentSymbols2: navigation.findDocumentSymbols.bind(navigation),
        doCodeActions: codeActions.doCodeActions.bind(codeActions),
        doCodeActions2: codeActions.doCodeActions2.bind(codeActions),
        findDocumentColors: navigation.findDocumentColors.bind(navigation),
        getColorPresentations: navigation.getColorPresentations.bind(navigation),
        prepareRename: navigation.prepareRename.bind(navigation),
        doRename: navigation.doRename.bind(navigation),
        getFoldingRanges: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssFolding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFoldingRanges"],
        getSelectionRanges: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssSelectionRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectionRanges"]
    };
}
const defaultLanguageServiceOptions = {};
function getCSSLanguageService(options = defaultLanguageServiceOptions) {
    const cssDataManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSDataManager"](options);
    return createFacade(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"](), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCompletion"](null, options, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSHover"](options && options.clientCapabilities, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSNavigation"](options && options.fileSystemProvider, false), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCodeActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCodeActions"](cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSValidation"](cssDataManager), cssDataManager);
}
function getSCSSLanguageService(options = defaultLanguageServiceOptions) {
    const cssDataManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSDataManager"](options);
    return createFacade(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSParser"](), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$scssCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSCompletion"](options, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSHover"](options && options.clientCapabilities, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$scssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSNavigation"](options && options.fileSystemProvider), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCodeActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCodeActions"](cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSValidation"](cssDataManager), cssDataManager);
}
function getLESSLanguageService(options = defaultLanguageServiceOptions) {
    const cssDataManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$dataManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSDataManager"](options);
    return createFacade(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LESSParser"](), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$lessCompletion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LESSCompletion"](options, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssHover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSHover"](options && options.clientCapabilities, cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSNavigation"](options && options.fileSystemProvider, true), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssCodeActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSCodeActions"](cssDataManager), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$services$2f$cssValidation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSValidation"](cssDataManager), cssDataManager);
}
;
}),
]);

//# sourceMappingURL=d4b1c_modules_monaco-editor_esm_external_vscode-css-languageservice_lib_esm_3c2d86a7._.js.map