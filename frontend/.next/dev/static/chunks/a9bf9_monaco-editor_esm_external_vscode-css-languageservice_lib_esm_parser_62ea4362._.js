(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MultiLineStream",
    ()=>MultiLineStream,
    "Scanner",
    ()=>Scanner,
    "TokenType",
    ()=>TokenType
]);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var TokenType;
(function(TokenType) {
    TokenType[TokenType["Ident"] = 0] = "Ident";
    TokenType[TokenType["AtKeyword"] = 1] = "AtKeyword";
    TokenType[TokenType["String"] = 2] = "String";
    TokenType[TokenType["BadString"] = 3] = "BadString";
    TokenType[TokenType["UnquotedString"] = 4] = "UnquotedString";
    TokenType[TokenType["Hash"] = 5] = "Hash";
    TokenType[TokenType["Num"] = 6] = "Num";
    TokenType[TokenType["Percentage"] = 7] = "Percentage";
    TokenType[TokenType["Dimension"] = 8] = "Dimension";
    TokenType[TokenType["UnicodeRange"] = 9] = "UnicodeRange";
    TokenType[TokenType["CDO"] = 10] = "CDO";
    TokenType[TokenType["CDC"] = 11] = "CDC";
    TokenType[TokenType["Colon"] = 12] = "Colon";
    TokenType[TokenType["SemiColon"] = 13] = "SemiColon";
    TokenType[TokenType["CurlyL"] = 14] = "CurlyL";
    TokenType[TokenType["CurlyR"] = 15] = "CurlyR";
    TokenType[TokenType["ParenthesisL"] = 16] = "ParenthesisL";
    TokenType[TokenType["ParenthesisR"] = 17] = "ParenthesisR";
    TokenType[TokenType["BracketL"] = 18] = "BracketL";
    TokenType[TokenType["BracketR"] = 19] = "BracketR";
    TokenType[TokenType["Whitespace"] = 20] = "Whitespace";
    TokenType[TokenType["Includes"] = 21] = "Includes";
    TokenType[TokenType["Dashmatch"] = 22] = "Dashmatch";
    TokenType[TokenType["SubstringOperator"] = 23] = "SubstringOperator";
    TokenType[TokenType["PrefixOperator"] = 24] = "PrefixOperator";
    TokenType[TokenType["SuffixOperator"] = 25] = "SuffixOperator";
    TokenType[TokenType["Delim"] = 26] = "Delim";
    TokenType[TokenType["EMS"] = 27] = "EMS";
    TokenType[TokenType["EXS"] = 28] = "EXS";
    TokenType[TokenType["Length"] = 29] = "Length";
    TokenType[TokenType["Angle"] = 30] = "Angle";
    TokenType[TokenType["Time"] = 31] = "Time";
    TokenType[TokenType["Freq"] = 32] = "Freq";
    TokenType[TokenType["Exclamation"] = 33] = "Exclamation";
    TokenType[TokenType["Resolution"] = 34] = "Resolution";
    TokenType[TokenType["Comma"] = 35] = "Comma";
    TokenType[TokenType["Charset"] = 36] = "Charset";
    TokenType[TokenType["EscapedJavaScript"] = 37] = "EscapedJavaScript";
    TokenType[TokenType["BadEscapedJavaScript"] = 38] = "BadEscapedJavaScript";
    TokenType[TokenType["Comment"] = 39] = "Comment";
    TokenType[TokenType["SingleLineComment"] = 40] = "SingleLineComment";
    TokenType[TokenType["EOF"] = 41] = "EOF";
    TokenType[TokenType["ContainerQueryLength"] = 42] = "ContainerQueryLength";
    TokenType[TokenType["CustomToken"] = 43] = "CustomToken"; // must be last token type
})(TokenType || (TokenType = {}));
class MultiLineStream {
    constructor(source){
        this.source = source;
        this.len = source.length;
        this.position = 0;
    }
    substring(from, to = this.position) {
        return this.source.substring(from, to);
    }
    eos() {
        return this.len <= this.position;
    }
    pos() {
        return this.position;
    }
    goBackTo(pos) {
        this.position = pos;
    }
    goBack(n) {
        this.position -= n;
    }
    advance(n) {
        this.position += n;
    }
    nextChar() {
        return this.source.charCodeAt(this.position++) || 0;
    }
    peekChar(n = 0) {
        return this.source.charCodeAt(this.position + n) || 0;
    }
    lookbackChar(n = 0) {
        return this.source.charCodeAt(this.position - n) || 0;
    }
    advanceIfChar(ch) {
        if (ch === this.source.charCodeAt(this.position)) {
            this.position++;
            return true;
        }
        return false;
    }
    advanceIfChars(ch) {
        if (this.position + ch.length > this.source.length) {
            return false;
        }
        let i = 0;
        for(; i < ch.length; i++){
            if (this.source.charCodeAt(this.position + i) !== ch[i]) {
                return false;
            }
        }
        this.advance(i);
        return true;
    }
    advanceWhileChar(condition) {
        const posNow = this.position;
        while(this.position < this.len && condition(this.source.charCodeAt(this.position))){
            this.position++;
        }
        return this.position - posNow;
    }
}
const _a = 'a'.charCodeAt(0);
const _f = 'f'.charCodeAt(0);
const _z = 'z'.charCodeAt(0);
const _A = 'A'.charCodeAt(0);
const _F = 'F'.charCodeAt(0);
const _Z = 'Z'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);
const _TLD = '~'.charCodeAt(0);
const _HAT = '^'.charCodeAt(0);
const _EQS = '='.charCodeAt(0);
const _PIP = '|'.charCodeAt(0);
const _MIN = '-'.charCodeAt(0);
const _USC = '_'.charCodeAt(0);
const _PRC = '%'.charCodeAt(0);
const _MUL = '*'.charCodeAt(0);
const _LPA = '('.charCodeAt(0);
const _RPA = ')'.charCodeAt(0);
const _LAN = '<'.charCodeAt(0);
const _RAN = '>'.charCodeAt(0);
const _ATS = '@'.charCodeAt(0);
const _HSH = '#'.charCodeAt(0);
const _DLR = '$'.charCodeAt(0);
const _BSL = '\\'.charCodeAt(0);
const _FSL = '/'.charCodeAt(0);
const _NWL = '\n'.charCodeAt(0);
const _CAR = '\r'.charCodeAt(0);
const _LFD = '\f'.charCodeAt(0);
const _DQO = '"'.charCodeAt(0);
const _SQO = '\''.charCodeAt(0);
const _WSP = ' '.charCodeAt(0);
const _TAB = '\t'.charCodeAt(0);
const _SEM = ';'.charCodeAt(0);
const _COL = ':'.charCodeAt(0);
const _CUL = '{'.charCodeAt(0);
const _CUR = '}'.charCodeAt(0);
const _BRL = '['.charCodeAt(0);
const _BRR = ']'.charCodeAt(0);
const _CMA = ','.charCodeAt(0);
const _DOT = '.'.charCodeAt(0);
const _BNG = '!'.charCodeAt(0);
const _QSM = '?'.charCodeAt(0);
const _PLS = '+'.charCodeAt(0);
const staticTokenTable = {};
staticTokenTable[_SEM] = TokenType.SemiColon;
staticTokenTable[_COL] = TokenType.Colon;
staticTokenTable[_CUL] = TokenType.CurlyL;
staticTokenTable[_CUR] = TokenType.CurlyR;
staticTokenTable[_BRR] = TokenType.BracketR;
staticTokenTable[_BRL] = TokenType.BracketL;
staticTokenTable[_LPA] = TokenType.ParenthesisL;
staticTokenTable[_RPA] = TokenType.ParenthesisR;
staticTokenTable[_CMA] = TokenType.Comma;
const staticUnitTable = {};
staticUnitTable['em'] = TokenType.EMS;
staticUnitTable['ex'] = TokenType.EXS;
staticUnitTable['px'] = TokenType.Length;
staticUnitTable['cm'] = TokenType.Length;
staticUnitTable['mm'] = TokenType.Length;
staticUnitTable['in'] = TokenType.Length;
staticUnitTable['pt'] = TokenType.Length;
staticUnitTable['pc'] = TokenType.Length;
staticUnitTable['deg'] = TokenType.Angle;
staticUnitTable['rad'] = TokenType.Angle;
staticUnitTable['grad'] = TokenType.Angle;
staticUnitTable['ms'] = TokenType.Time;
staticUnitTable['s'] = TokenType.Time;
staticUnitTable['hz'] = TokenType.Freq;
staticUnitTable['khz'] = TokenType.Freq;
staticUnitTable['%'] = TokenType.Percentage;
staticUnitTable['fr'] = TokenType.Percentage;
staticUnitTable['dpi'] = TokenType.Resolution;
staticUnitTable['dpcm'] = TokenType.Resolution;
staticUnitTable['cqw'] = TokenType.ContainerQueryLength;
staticUnitTable['cqh'] = TokenType.ContainerQueryLength;
staticUnitTable['cqi'] = TokenType.ContainerQueryLength;
staticUnitTable['cqb'] = TokenType.ContainerQueryLength;
staticUnitTable['cqmin'] = TokenType.ContainerQueryLength;
staticUnitTable['cqmax'] = TokenType.ContainerQueryLength;
class Scanner {
    constructor(){
        this.stream = new MultiLineStream('');
        this.ignoreComment = true;
        this.ignoreWhitespace = true;
        this.inURL = false;
    }
    setSource(input) {
        this.stream = new MultiLineStream(input);
    }
    finishToken(offset, type, text) {
        return {
            offset: offset,
            len: this.stream.pos() - offset,
            type: type,
            text: text || this.stream.substring(offset)
        };
    }
    substring(offset, len) {
        return this.stream.substring(offset, offset + len);
    }
    pos() {
        return this.stream.pos();
    }
    goBackTo(pos) {
        this.stream.goBackTo(pos);
    }
    scanUnquotedString() {
        const offset = this.stream.pos();
        const content = [];
        if (this._unquotedString(content)) {
            return this.finishToken(offset, TokenType.UnquotedString, content.join(''));
        }
        return null;
    }
    scan() {
        // processes all whitespaces and comments
        const triviaToken = this.trivia();
        if (triviaToken !== null) {
            return triviaToken;
        }
        const offset = this.stream.pos();
        // End of file/input
        if (this.stream.eos()) {
            return this.finishToken(offset, TokenType.EOF);
        }
        return this.scanNext(offset);
    }
    /**
     * Read the range as described in https://www.w3.org/TR/CSS21/syndata.html#tokenization
     * Assume the `u` has aleady been consumed
     * @returns if reading the unicode was successful
     */ tryScanUnicode() {
        const offset = this.stream.pos();
        if (!this.stream.eos() && this._unicodeRange()) {
            return this.finishToken(offset, TokenType.UnicodeRange);
        }
        this.stream.goBackTo(offset);
        return undefined;
    }
    scanNext(offset) {
        // CDO <!--
        if (this.stream.advanceIfChars([
            _LAN,
            _BNG,
            _MIN,
            _MIN
        ])) {
            return this.finishToken(offset, TokenType.CDO);
        }
        // CDC -->
        if (this.stream.advanceIfChars([
            _MIN,
            _MIN,
            _RAN
        ])) {
            return this.finishToken(offset, TokenType.CDC);
        }
        let content = [];
        if (this.ident(content)) {
            return this.finishToken(offset, TokenType.Ident, content.join(''));
        }
        // at-keyword
        if (this.stream.advanceIfChar(_ATS)) {
            content = [
                '@'
            ];
            if (this._name(content)) {
                const keywordText = content.join('');
                if (keywordText === '@charset') {
                    return this.finishToken(offset, TokenType.Charset, keywordText);
                }
                return this.finishToken(offset, TokenType.AtKeyword, keywordText);
            } else {
                return this.finishToken(offset, TokenType.Delim);
            }
        }
        // hash
        if (this.stream.advanceIfChar(_HSH)) {
            content = [
                '#'
            ];
            if (this._name(content)) {
                return this.finishToken(offset, TokenType.Hash, content.join(''));
            } else {
                return this.finishToken(offset, TokenType.Delim);
            }
        }
        // Important
        if (this.stream.advanceIfChar(_BNG)) {
            return this.finishToken(offset, TokenType.Exclamation);
        }
        // Numbers
        if (this._number()) {
            const pos = this.stream.pos();
            content = [
                this.stream.substring(offset, pos)
            ];
            if (this.stream.advanceIfChar(_PRC)) {
                // Percentage 43%
                return this.finishToken(offset, TokenType.Percentage);
            } else if (this.ident(content)) {
                const dim = this.stream.substring(pos).toLowerCase();
                const tokenType = staticUnitTable[dim];
                if (typeof tokenType !== 'undefined') {
                    // Known dimension 43px
                    return this.finishToken(offset, tokenType, content.join(''));
                } else {
                    // Unknown dimension 43ft
                    return this.finishToken(offset, TokenType.Dimension, content.join(''));
                }
            }
            return this.finishToken(offset, TokenType.Num);
        }
        // String, BadString
        content = [];
        let tokenType = this._string(content);
        if (tokenType !== null) {
            return this.finishToken(offset, tokenType, content.join(''));
        }
        // single character tokens
        tokenType = staticTokenTable[this.stream.peekChar()];
        if (typeof tokenType !== 'undefined') {
            this.stream.advance(1);
            return this.finishToken(offset, tokenType);
        }
        // includes ~=
        if (this.stream.peekChar(0) === _TLD && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.Includes);
        }
        // DashMatch |=
        if (this.stream.peekChar(0) === _PIP && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.Dashmatch);
        }
        // Substring operator *=
        if (this.stream.peekChar(0) === _MUL && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.SubstringOperator);
        }
        // Substring operator ^=
        if (this.stream.peekChar(0) === _HAT && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.PrefixOperator);
        }
        // Substring operator $=
        if (this.stream.peekChar(0) === _DLR && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.SuffixOperator);
        }
        // Delim
        this.stream.nextChar();
        return this.finishToken(offset, TokenType.Delim);
    }
    trivia() {
        while(true){
            const offset = this.stream.pos();
            if (this._whitespace()) {
                if (!this.ignoreWhitespace) {
                    return this.finishToken(offset, TokenType.Whitespace);
                }
            } else if (this.comment()) {
                if (!this.ignoreComment) {
                    return this.finishToken(offset, TokenType.Comment);
                }
            } else {
                return null;
            }
        }
    }
    comment() {
        if (this.stream.advanceIfChars([
            _FSL,
            _MUL
        ])) {
            let success = false, hot = false;
            this.stream.advanceWhileChar((ch)=>{
                if (hot && ch === _FSL) {
                    success = true;
                    return false;
                }
                hot = ch === _MUL;
                return true;
            });
            if (success) {
                this.stream.advance(1);
            }
            return true;
        }
        return false;
    }
    _number() {
        let npeek = 0, ch;
        if (this.stream.peekChar() === _DOT) {
            npeek = 1;
        }
        ch = this.stream.peekChar(npeek);
        if (ch >= _0 && ch <= _9) {
            this.stream.advance(npeek + 1);
            this.stream.advanceWhileChar((ch)=>{
                return ch >= _0 && ch <= _9 || npeek === 0 && ch === _DOT;
            });
            return true;
        }
        return false;
    }
    _newline(result) {
        const ch = this.stream.peekChar();
        switch(ch){
            case _CAR:
            case _LFD:
            case _NWL:
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                if (ch === _CAR && this.stream.advanceIfChar(_NWL)) {
                    result.push('\n');
                }
                return true;
        }
        return false;
    }
    _escape(result, includeNewLines) {
        let ch = this.stream.peekChar();
        if (ch === _BSL) {
            this.stream.advance(1);
            ch = this.stream.peekChar();
            let hexNumCount = 0;
            while(hexNumCount < 6 && (ch >= _0 && ch <= _9 || ch >= _a && ch <= _f || ch >= _A && ch <= _F)){
                this.stream.advance(1);
                ch = this.stream.peekChar();
                hexNumCount++;
            }
            if (hexNumCount > 0) {
                try {
                    const hexVal = parseInt(this.stream.substring(this.stream.pos() - hexNumCount), 16);
                    if (hexVal) {
                        result.push(String.fromCharCode(hexVal));
                    }
                } catch (e) {
                // ignore
                }
                // optional whitespace or new line, not part of result text
                if (ch === _WSP || ch === _TAB) {
                    this.stream.advance(1);
                } else {
                    this._newline([]);
                }
                return true;
            }
            if (ch !== _CAR && ch !== _LFD && ch !== _NWL) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            } else if (includeNewLines) {
                return this._newline(result);
            }
        }
        return false;
    }
    _stringChar(closeQuote, result) {
        // not closeQuote, not backslash, not newline
        const ch = this.stream.peekChar();
        if (ch !== 0 && ch !== closeQuote && ch !== _BSL && ch !== _CAR && ch !== _LFD && ch !== _NWL) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    }
    _string(result) {
        if (this.stream.peekChar() === _SQO || this.stream.peekChar() === _DQO) {
            const closeQuote = this.stream.nextChar();
            result.push(String.fromCharCode(closeQuote));
            while(this._stringChar(closeQuote, result) || this._escape(result, true)){
            // loop
            }
            if (this.stream.peekChar() === closeQuote) {
                this.stream.nextChar();
                result.push(String.fromCharCode(closeQuote));
                return TokenType.String;
            } else {
                return TokenType.BadString;
            }
        }
        return null;
    }
    _unquotedChar(result) {
        // not closeQuote, not backslash, not newline
        const ch = this.stream.peekChar();
        if (ch !== 0 && ch !== _BSL && ch !== _SQO && ch !== _DQO && ch !== _LPA && ch !== _RPA && ch !== _WSP && ch !== _TAB && ch !== _NWL && ch !== _LFD && ch !== _CAR) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    }
    _unquotedString(result) {
        let hasContent = false;
        while(this._unquotedChar(result) || this._escape(result)){
            hasContent = true;
        }
        return hasContent;
    }
    _whitespace() {
        const n = this.stream.advanceWhileChar((ch)=>{
            return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
        });
        return n > 0;
    }
    _name(result) {
        let matched = false;
        while(this._identChar(result) || this._escape(result)){
            matched = true;
        }
        return matched;
    }
    ident(result) {
        const pos = this.stream.pos();
        const hasMinus = this._minus(result);
        if (hasMinus) {
            if (this._minus(result) || this._identFirstChar(result) || this._escape(result)) {
                while(this._identChar(result) || this._escape(result)){
                // loop
                }
                return true;
            }
        } else if (this._identFirstChar(result) || this._escape(result)) {
            while(this._identChar(result) || this._escape(result)){
            // loop
            }
            return true;
        }
        this.stream.goBackTo(pos);
        return false;
    }
    _identFirstChar(result) {
        const ch = this.stream.peekChar();
        if (ch === _USC || // _
        ch >= _a && ch <= _z || // a-z
        ch >= _A && ch <= _Z || // A-Z
        ch >= 0x80 && ch <= 0xFFFF) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    }
    _minus(result) {
        const ch = this.stream.peekChar();
        if (ch === _MIN) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    }
    _identChar(result) {
        const ch = this.stream.peekChar();
        if (ch === _USC || // _
        ch === _MIN || // -
        ch >= _a && ch <= _z || // a-z
        ch >= _A && ch <= _Z || // A-Z
        ch >= _0 && ch <= _9 || // 0/9
        ch >= 0x80 && ch <= 0xFFFF) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    }
    _unicodeRange() {
        // follow https://www.w3.org/TR/CSS21/syndata.html#tokenization and https://www.w3.org/TR/css-syntax-3/#urange-syntax
        // assume u has already been parsed
        if (this.stream.advanceIfChar(_PLS)) {
            const isHexDigit = (ch)=>ch >= _0 && ch <= _9 || ch >= _a && ch <= _f || ch >= _A && ch <= _F;
            const codePoints = this.stream.advanceWhileChar(isHexDigit) + this.stream.advanceWhileChar((ch)=>ch === _QSM);
            if (codePoints >= 1 && codePoints <= 6) {
                if (this.stream.advanceIfChar(_MIN)) {
                    const digits = this.stream.advanceWhileChar(isHexDigit);
                    if (digits >= 1 && digits <= 6) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractDeclaration",
    ()=>AbstractDeclaration,
    "AttributeSelector",
    ()=>AttributeSelector,
    "BinaryExpression",
    ()=>BinaryExpression,
    "BodyDeclaration",
    ()=>BodyDeclaration,
    "Container",
    ()=>Container,
    "CustomPropertyDeclaration",
    ()=>CustomPropertyDeclaration,
    "CustomPropertySet",
    ()=>CustomPropertySet,
    "Declaration",
    ()=>Declaration,
    "Declarations",
    ()=>Declarations,
    "Document",
    ()=>Document,
    "EachStatement",
    ()=>EachStatement,
    "ElseStatement",
    ()=>ElseStatement,
    "Expression",
    ()=>Expression,
    "ExtendsReference",
    ()=>ExtendsReference,
    "FontFace",
    ()=>FontFace,
    "ForStatement",
    ()=>ForStatement,
    "Forward",
    ()=>Forward,
    "ForwardVisibility",
    ()=>ForwardVisibility,
    "Function",
    ()=>Function,
    "FunctionArgument",
    ()=>FunctionArgument,
    "FunctionDeclaration",
    ()=>FunctionDeclaration,
    "FunctionParameter",
    ()=>FunctionParameter,
    "GuardCondition",
    ()=>GuardCondition,
    "HexColorValue",
    ()=>HexColorValue,
    "Identifier",
    ()=>Identifier,
    "IfStatement",
    ()=>IfStatement,
    "Import",
    ()=>Import,
    "Interpolation",
    ()=>Interpolation,
    "Invocation",
    ()=>Invocation,
    "Keyframe",
    ()=>Keyframe,
    "KeyframeSelector",
    ()=>KeyframeSelector,
    "Layer",
    ()=>Layer,
    "LessGuard",
    ()=>LessGuard,
    "Level",
    ()=>Level,
    "ListEntry",
    ()=>ListEntry,
    "Marker",
    ()=>Marker,
    "Media",
    ()=>Media,
    "MediaCondition",
    ()=>MediaCondition,
    "MediaFeature",
    ()=>MediaFeature,
    "MediaQuery",
    ()=>MediaQuery,
    "Medialist",
    ()=>Medialist,
    "MixinContentDeclaration",
    ()=>MixinContentDeclaration,
    "MixinContentReference",
    ()=>MixinContentReference,
    "MixinDeclaration",
    ()=>MixinDeclaration,
    "MixinReference",
    ()=>MixinReference,
    "Module",
    ()=>Module,
    "ModuleConfiguration",
    ()=>ModuleConfiguration,
    "Namespace",
    ()=>Namespace,
    "NestedProperties",
    ()=>NestedProperties,
    "Node",
    ()=>Node,
    "NodeType",
    ()=>NodeType,
    "Nodelist",
    ()=>Nodelist,
    "NumericValue",
    ()=>NumericValue,
    "Page",
    ()=>Page,
    "PageBoxMarginBox",
    ()=>PageBoxMarginBox,
    "ParseErrorCollector",
    ()=>ParseErrorCollector,
    "Property",
    ()=>Property,
    "PropertyAtRule",
    ()=>PropertyAtRule,
    "RatioValue",
    ()=>RatioValue,
    "ReferenceType",
    ()=>ReferenceType,
    "RuleSet",
    ()=>RuleSet,
    "Selector",
    ()=>Selector,
    "SimpleSelector",
    ()=>SimpleSelector,
    "Stylesheet",
    ()=>Stylesheet,
    "Supports",
    ()=>Supports,
    "SupportsCondition",
    ()=>SupportsCondition,
    "Term",
    ()=>Term,
    "UnicodeRange",
    ()=>UnicodeRange,
    "UnknownAtRule",
    ()=>UnknownAtRule,
    "Use",
    ()=>Use,
    "Variable",
    ()=>Variable,
    "VariableDeclaration",
    ()=>VariableDeclaration,
    "ViewPort",
    ()=>ViewPort,
    "WhileStatement",
    ()=>WhileStatement,
    "getNodeAtOffset",
    ()=>getNodeAtOffset,
    "getNodePath",
    ()=>getNodePath,
    "getParentDeclaration",
    ()=>getParentDeclaration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/strings.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /// <summary>
/// Nodes for the css 2.1 specification. See for reference:
/// http://www.w3.org/TR/CSS21/grammar.html#grammar
/// </summary>
var NodeType;
(function(NodeType) {
    NodeType[NodeType["Undefined"] = 0] = "Undefined";
    NodeType[NodeType["Identifier"] = 1] = "Identifier";
    NodeType[NodeType["Stylesheet"] = 2] = "Stylesheet";
    NodeType[NodeType["Ruleset"] = 3] = "Ruleset";
    NodeType[NodeType["Selector"] = 4] = "Selector";
    NodeType[NodeType["SimpleSelector"] = 5] = "SimpleSelector";
    NodeType[NodeType["SelectorInterpolation"] = 6] = "SelectorInterpolation";
    NodeType[NodeType["SelectorCombinator"] = 7] = "SelectorCombinator";
    NodeType[NodeType["SelectorCombinatorParent"] = 8] = "SelectorCombinatorParent";
    NodeType[NodeType["SelectorCombinatorSibling"] = 9] = "SelectorCombinatorSibling";
    NodeType[NodeType["SelectorCombinatorAllSiblings"] = 10] = "SelectorCombinatorAllSiblings";
    NodeType[NodeType["SelectorCombinatorShadowPiercingDescendant"] = 11] = "SelectorCombinatorShadowPiercingDescendant";
    NodeType[NodeType["Page"] = 12] = "Page";
    NodeType[NodeType["PageBoxMarginBox"] = 13] = "PageBoxMarginBox";
    NodeType[NodeType["ClassSelector"] = 14] = "ClassSelector";
    NodeType[NodeType["IdentifierSelector"] = 15] = "IdentifierSelector";
    NodeType[NodeType["ElementNameSelector"] = 16] = "ElementNameSelector";
    NodeType[NodeType["PseudoSelector"] = 17] = "PseudoSelector";
    NodeType[NodeType["AttributeSelector"] = 18] = "AttributeSelector";
    NodeType[NodeType["Declaration"] = 19] = "Declaration";
    NodeType[NodeType["Declarations"] = 20] = "Declarations";
    NodeType[NodeType["Property"] = 21] = "Property";
    NodeType[NodeType["Expression"] = 22] = "Expression";
    NodeType[NodeType["BinaryExpression"] = 23] = "BinaryExpression";
    NodeType[NodeType["Term"] = 24] = "Term";
    NodeType[NodeType["Operator"] = 25] = "Operator";
    NodeType[NodeType["Value"] = 26] = "Value";
    NodeType[NodeType["StringLiteral"] = 27] = "StringLiteral";
    NodeType[NodeType["URILiteral"] = 28] = "URILiteral";
    NodeType[NodeType["EscapedValue"] = 29] = "EscapedValue";
    NodeType[NodeType["Function"] = 30] = "Function";
    NodeType[NodeType["NumericValue"] = 31] = "NumericValue";
    NodeType[NodeType["HexColorValue"] = 32] = "HexColorValue";
    NodeType[NodeType["RatioValue"] = 33] = "RatioValue";
    NodeType[NodeType["MixinDeclaration"] = 34] = "MixinDeclaration";
    NodeType[NodeType["MixinReference"] = 35] = "MixinReference";
    NodeType[NodeType["VariableName"] = 36] = "VariableName";
    NodeType[NodeType["VariableDeclaration"] = 37] = "VariableDeclaration";
    NodeType[NodeType["Prio"] = 38] = "Prio";
    NodeType[NodeType["Interpolation"] = 39] = "Interpolation";
    NodeType[NodeType["NestedProperties"] = 40] = "NestedProperties";
    NodeType[NodeType["ExtendsReference"] = 41] = "ExtendsReference";
    NodeType[NodeType["SelectorPlaceholder"] = 42] = "SelectorPlaceholder";
    NodeType[NodeType["Debug"] = 43] = "Debug";
    NodeType[NodeType["If"] = 44] = "If";
    NodeType[NodeType["Else"] = 45] = "Else";
    NodeType[NodeType["For"] = 46] = "For";
    NodeType[NodeType["Each"] = 47] = "Each";
    NodeType[NodeType["While"] = 48] = "While";
    NodeType[NodeType["MixinContentReference"] = 49] = "MixinContentReference";
    NodeType[NodeType["MixinContentDeclaration"] = 50] = "MixinContentDeclaration";
    NodeType[NodeType["Media"] = 51] = "Media";
    NodeType[NodeType["Keyframe"] = 52] = "Keyframe";
    NodeType[NodeType["FontFace"] = 53] = "FontFace";
    NodeType[NodeType["Import"] = 54] = "Import";
    NodeType[NodeType["Namespace"] = 55] = "Namespace";
    NodeType[NodeType["Invocation"] = 56] = "Invocation";
    NodeType[NodeType["FunctionDeclaration"] = 57] = "FunctionDeclaration";
    NodeType[NodeType["ReturnStatement"] = 58] = "ReturnStatement";
    NodeType[NodeType["MediaQuery"] = 59] = "MediaQuery";
    NodeType[NodeType["MediaCondition"] = 60] = "MediaCondition";
    NodeType[NodeType["MediaFeature"] = 61] = "MediaFeature";
    NodeType[NodeType["FunctionParameter"] = 62] = "FunctionParameter";
    NodeType[NodeType["FunctionArgument"] = 63] = "FunctionArgument";
    NodeType[NodeType["KeyframeSelector"] = 64] = "KeyframeSelector";
    NodeType[NodeType["ViewPort"] = 65] = "ViewPort";
    NodeType[NodeType["Document"] = 66] = "Document";
    NodeType[NodeType["AtApplyRule"] = 67] = "AtApplyRule";
    NodeType[NodeType["CustomPropertyDeclaration"] = 68] = "CustomPropertyDeclaration";
    NodeType[NodeType["CustomPropertySet"] = 69] = "CustomPropertySet";
    NodeType[NodeType["ListEntry"] = 70] = "ListEntry";
    NodeType[NodeType["Supports"] = 71] = "Supports";
    NodeType[NodeType["SupportsCondition"] = 72] = "SupportsCondition";
    NodeType[NodeType["NamespacePrefix"] = 73] = "NamespacePrefix";
    NodeType[NodeType["GridLine"] = 74] = "GridLine";
    NodeType[NodeType["Plugin"] = 75] = "Plugin";
    NodeType[NodeType["UnknownAtRule"] = 76] = "UnknownAtRule";
    NodeType[NodeType["Use"] = 77] = "Use";
    NodeType[NodeType["ModuleConfiguration"] = 78] = "ModuleConfiguration";
    NodeType[NodeType["Forward"] = 79] = "Forward";
    NodeType[NodeType["ForwardVisibility"] = 80] = "ForwardVisibility";
    NodeType[NodeType["Module"] = 81] = "Module";
    NodeType[NodeType["UnicodeRange"] = 82] = "UnicodeRange";
    NodeType[NodeType["Layer"] = 83] = "Layer";
    NodeType[NodeType["LayerNameList"] = 84] = "LayerNameList";
    NodeType[NodeType["LayerName"] = 85] = "LayerName";
    NodeType[NodeType["PropertyAtRule"] = 86] = "PropertyAtRule";
    NodeType[NodeType["Container"] = 87] = "Container";
})(NodeType || (NodeType = {}));
var ReferenceType;
(function(ReferenceType) {
    ReferenceType[ReferenceType["Mixin"] = 0] = "Mixin";
    ReferenceType[ReferenceType["Rule"] = 1] = "Rule";
    ReferenceType[ReferenceType["Variable"] = 2] = "Variable";
    ReferenceType[ReferenceType["Function"] = 3] = "Function";
    ReferenceType[ReferenceType["Keyframe"] = 4] = "Keyframe";
    ReferenceType[ReferenceType["Unknown"] = 5] = "Unknown";
    ReferenceType[ReferenceType["Module"] = 6] = "Module";
    ReferenceType[ReferenceType["Forward"] = 7] = "Forward";
    ReferenceType[ReferenceType["ForwardVisibility"] = 8] = "ForwardVisibility";
    ReferenceType[ReferenceType["Property"] = 9] = "Property";
})(ReferenceType || (ReferenceType = {}));
function getNodeAtOffset(node, offset) {
    let candidate = null;
    if (!node || offset < node.offset || offset > node.end) {
        return null;
    }
    // Find the shortest node at the position
    node.accept((node)=>{
        if (node.offset === -1 && node.length === -1) {
            return true;
        }
        if (node.offset <= offset && node.end >= offset) {
            if (!candidate) {
                candidate = node;
            } else if (node.length <= candidate.length) {
                candidate = node;
            }
            return true;
        }
        return false;
    });
    return candidate;
}
function getNodePath(node, offset) {
    let candidate = getNodeAtOffset(node, offset);
    const path = [];
    while(candidate){
        path.unshift(candidate);
        candidate = candidate.parent;
    }
    return path;
}
function getParentDeclaration(node) {
    const decl = node.findParent(NodeType.Declaration);
    const value = decl && decl.getValue();
    if (value && value.encloses(node)) {
        return decl;
    }
    return null;
}
class Node {
    get end() {
        return this.offset + this.length;
    }
    constructor(offset = -1, len = -1, nodeType){
        this.parent = null;
        this.offset = offset;
        this.length = len;
        if (nodeType) {
            this.nodeType = nodeType;
        }
    }
    set type(type) {
        this.nodeType = type;
    }
    get type() {
        return this.nodeType || NodeType.Undefined;
    }
    getTextProvider() {
        let node = this;
        while(node && !node.textProvider){
            node = node.parent;
        }
        if (node) {
            return node.textProvider;
        }
        return ()=>{
            return 'unknown';
        };
    }
    getText() {
        return this.getTextProvider()(this.offset, this.length);
    }
    matches(str) {
        return this.length === str.length && this.getTextProvider()(this.offset, this.length) === str;
    }
    startsWith(str) {
        return this.length >= str.length && this.getTextProvider()(this.offset, str.length) === str;
    }
    endsWith(str) {
        return this.length >= str.length && this.getTextProvider()(this.end - str.length, str.length) === str;
    }
    accept(visitor) {
        if (visitor(this) && this.children) {
            for (const child of this.children){
                child.accept(visitor);
            }
        }
    }
    acceptVisitor(visitor) {
        this.accept(visitor.visitNode.bind(visitor));
    }
    adoptChild(node, index = -1) {
        if (node.parent && node.parent.children) {
            const idx = node.parent.children.indexOf(node);
            if (idx >= 0) {
                node.parent.children.splice(idx, 1);
            }
        }
        node.parent = this;
        let children = this.children;
        if (!children) {
            children = this.children = [];
        }
        if (index !== -1) {
            children.splice(index, 0, node);
        } else {
            children.push(node);
        }
        return node;
    }
    attachTo(parent, index = -1) {
        if (parent) {
            parent.adoptChild(this, index);
        }
        return this;
    }
    collectIssues(results) {
        if (this.issues) {
            results.push.apply(results, this.issues);
        }
    }
    addIssue(issue) {
        if (!this.issues) {
            this.issues = [];
        }
        this.issues.push(issue);
    }
    hasIssue(rule) {
        return Array.isArray(this.issues) && this.issues.some((i)=>i.getRule() === rule);
    }
    isErroneous(recursive = false) {
        if (this.issues && this.issues.length > 0) {
            return true;
        }
        return recursive && Array.isArray(this.children) && this.children.some((c)=>c.isErroneous(true));
    }
    setNode(field, node, index = -1) {
        if (node) {
            node.attachTo(this, index);
            this[field] = node;
            return true;
        }
        return false;
    }
    addChild(node) {
        if (node) {
            if (!this.children) {
                this.children = [];
            }
            node.attachTo(this);
            this.updateOffsetAndLength(node);
            return true;
        }
        return false;
    }
    updateOffsetAndLength(node) {
        if (node.offset < this.offset || this.offset === -1) {
            this.offset = node.offset;
        }
        const nodeEnd = node.end;
        if (nodeEnd > this.end || this.length === -1) {
            this.length = nodeEnd - this.offset;
        }
    }
    hasChildren() {
        return !!this.children && this.children.length > 0;
    }
    getChildren() {
        return this.children ? this.children.slice(0) : [];
    }
    getChild(index) {
        if (this.children && index < this.children.length) {
            return this.children[index];
        }
        return null;
    }
    addChildren(nodes) {
        for (const node of nodes){
            this.addChild(node);
        }
    }
    findFirstChildBeforeOffset(offset) {
        if (this.children) {
            let current = null;
            for(let i = this.children.length - 1; i >= 0; i--){
                // iterate until we find a child that has a start offset smaller than the input offset
                current = this.children[i];
                if (current.offset <= offset) {
                    return current;
                }
            }
        }
        return null;
    }
    findChildAtOffset(offset, goDeep) {
        const current = this.findFirstChildBeforeOffset(offset);
        if (current && current.end >= offset) {
            if (goDeep) {
                return current.findChildAtOffset(offset, true) || current;
            }
            return current;
        }
        return null;
    }
    encloses(candidate) {
        return this.offset <= candidate.offset && this.offset + this.length >= candidate.offset + candidate.length;
    }
    getParent() {
        let result = this.parent;
        while(result instanceof Nodelist){
            result = result.parent;
        }
        return result;
    }
    findParent(type) {
        let result = this;
        while(result && result.type !== type){
            result = result.parent;
        }
        return result;
    }
    findAParent(...types) {
        let result = this;
        while(result && !types.some((t)=>result.type === t)){
            result = result.parent;
        }
        return result;
    }
    setData(key, value) {
        if (!this.options) {
            this.options = {};
        }
        this.options[key] = value;
    }
    getData(key) {
        if (!this.options || !this.options.hasOwnProperty(key)) {
            return null;
        }
        return this.options[key];
    }
}
class Nodelist extends Node {
    constructor(parent, index = -1){
        super(-1, -1);
        this.attachTo(parent, index);
        this.offset = -1;
        this.length = -1;
    }
}
class UnicodeRange extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.UnicodeRange;
    }
    setRangeStart(rangeStart) {
        return this.setNode('rangeStart', rangeStart);
    }
    getRangeStart() {
        return this.rangeStart;
    }
    setRangeEnd(rangeEnd) {
        return this.setNode('rangeEnd', rangeEnd);
    }
    getRangeEnd() {
        return this.rangeEnd;
    }
}
class Identifier extends Node {
    constructor(offset, length){
        super(offset, length);
        this.isCustomProperty = false;
    }
    get type() {
        return NodeType.Identifier;
    }
    containsInterpolation() {
        return this.hasChildren();
    }
}
class Stylesheet extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Stylesheet;
    }
}
class Declarations extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Declarations;
    }
}
class BodyDeclaration extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    getDeclarations() {
        return this.declarations;
    }
    setDeclarations(decls) {
        return this.setNode('declarations', decls);
    }
}
class RuleSet extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Ruleset;
    }
    getSelectors() {
        if (!this.selectors) {
            this.selectors = new Nodelist(this);
        }
        return this.selectors;
    }
    isNested() {
        return !!this.parent && this.parent.findParent(NodeType.Declarations) !== null;
    }
}
class Selector extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Selector;
    }
}
class SimpleSelector extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.SimpleSelector;
    }
}
class AbstractDeclaration extends Node {
    constructor(offset, length){
        super(offset, length);
    }
}
class CustomPropertySet extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.CustomPropertySet;
    }
}
class Declaration extends AbstractDeclaration {
    constructor(offset, length){
        super(offset, length);
        this.property = null;
    }
    get type() {
        return NodeType.Declaration;
    }
    setProperty(node) {
        return this.setNode('property', node);
    }
    getProperty() {
        return this.property;
    }
    getFullPropertyName() {
        const propertyName = this.property ? this.property.getName() : 'unknown';
        if (this.parent instanceof Declarations && this.parent.getParent() instanceof NestedProperties) {
            const parentDecl = this.parent.getParent().getParent();
            if (parentDecl instanceof Declaration) {
                return parentDecl.getFullPropertyName() + propertyName;
            }
        }
        return propertyName;
    }
    getNonPrefixedPropertyName() {
        const propertyName = this.getFullPropertyName();
        if (propertyName && propertyName.charAt(0) === '-') {
            const vendorPrefixEnd = propertyName.indexOf('-', 1);
            if (vendorPrefixEnd !== -1) {
                return propertyName.substring(vendorPrefixEnd + 1);
            }
        }
        return propertyName;
    }
    setValue(value) {
        return this.setNode('value', value);
    }
    getValue() {
        return this.value;
    }
    setNestedProperties(value) {
        return this.setNode('nestedProperties', value);
    }
    getNestedProperties() {
        return this.nestedProperties;
    }
}
class CustomPropertyDeclaration extends Declaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.CustomPropertyDeclaration;
    }
    setPropertySet(value) {
        return this.setNode('propertySet', value);
    }
    getPropertySet() {
        return this.propertySet;
    }
}
class Property extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Property;
    }
    setIdentifier(value) {
        return this.setNode('identifier', value);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$strings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(this.getText(), /[_\+]+$/); /* +_: less merge */ 
    }
    isCustomProperty() {
        return !!this.identifier && this.identifier.isCustomProperty;
    }
}
class Invocation extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Invocation;
    }
    getArguments() {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    }
}
class Function extends Invocation {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Function;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
}
class FunctionParameter extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.FunctionParameter;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    setDefaultValue(node) {
        return this.setNode('defaultValue', node, 0);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
}
class FunctionArgument extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.FunctionArgument;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    setValue(node) {
        return this.setNode('value', node, 0);
    }
    getValue() {
        return this.value;
    }
}
class IfStatement extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.If;
    }
    setExpression(node) {
        return this.setNode('expression', node, 0);
    }
    setElseClause(elseClause) {
        return this.setNode('elseClause', elseClause);
    }
}
class ForStatement extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.For;
    }
    setVariable(node) {
        return this.setNode('variable', node, 0);
    }
}
class EachStatement extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Each;
    }
    getVariables() {
        if (!this.variables) {
            this.variables = new Nodelist(this);
        }
        return this.variables;
    }
}
class WhileStatement extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.While;
    }
}
class ElseStatement extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Else;
    }
}
class FunctionDeclaration extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.FunctionDeclaration;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    getParameters() {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    }
}
class ViewPort extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.ViewPort;
    }
}
class FontFace extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.FontFace;
    }
}
class NestedProperties extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.NestedProperties;
    }
}
class Keyframe extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Keyframe;
    }
    setKeyword(keyword) {
        return this.setNode('keyword', keyword, 0);
    }
    getKeyword() {
        return this.keyword;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
}
class KeyframeSelector extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.KeyframeSelector;
    }
}
class Import extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Import;
    }
    setMedialist(node) {
        if (node) {
            node.attachTo(this);
            return true;
        }
        return false;
    }
}
class Use extends Node {
    get type() {
        return NodeType.Use;
    }
    getParameters() {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
}
class ModuleConfiguration extends Node {
    get type() {
        return NodeType.ModuleConfiguration;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    setValue(node) {
        return this.setNode('value', node, 0);
    }
    getValue() {
        return this.value;
    }
}
class Forward extends Node {
    get type() {
        return NodeType.Forward;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getMembers() {
        if (!this.members) {
            this.members = new Nodelist(this);
        }
        return this.members;
    }
    getParameters() {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    }
}
class ForwardVisibility extends Node {
    get type() {
        return NodeType.ForwardVisibility;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
}
class Namespace extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Namespace;
    }
}
class Media extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Media;
    }
}
class Supports extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Supports;
    }
}
class Layer extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Layer;
    }
    setNames(names) {
        return this.setNode('names', names);
    }
    getNames() {
        return this.names;
    }
}
class PropertyAtRule extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.PropertyAtRule;
    }
    setName(node) {
        if (node) {
            node.attachTo(this);
            this.name = node;
            return true;
        }
        return false;
    }
    getName() {
        return this.name;
    }
}
class Document extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Document;
    }
}
class Container extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Container;
    }
}
class Medialist extends Node {
    constructor(offset, length){
        super(offset, length);
    }
}
class MediaQuery extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MediaQuery;
    }
}
class MediaCondition extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MediaCondition;
    }
}
class MediaFeature extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MediaFeature;
    }
}
class SupportsCondition extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.SupportsCondition;
    }
}
class Page extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Page;
    }
}
class PageBoxMarginBox extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.PageBoxMarginBox;
    }
}
class Expression extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Expression;
    }
}
class BinaryExpression extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.BinaryExpression;
    }
    setLeft(left) {
        return this.setNode('left', left);
    }
    getLeft() {
        return this.left;
    }
    setRight(right) {
        return this.setNode('right', right);
    }
    getRight() {
        return this.right;
    }
    setOperator(value) {
        return this.setNode('operator', value);
    }
    getOperator() {
        return this.operator;
    }
}
class Term extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Term;
    }
    setOperator(value) {
        return this.setNode('operator', value);
    }
    getOperator() {
        return this.operator;
    }
    setExpression(value) {
        return this.setNode('expression', value);
    }
    getExpression() {
        return this.expression;
    }
}
class AttributeSelector extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.AttributeSelector;
    }
    setNamespacePrefix(value) {
        return this.setNode('namespacePrefix', value);
    }
    getNamespacePrefix() {
        return this.namespacePrefix;
    }
    setIdentifier(value) {
        return this.setNode('identifier', value);
    }
    getIdentifier() {
        return this.identifier;
    }
    setOperator(operator) {
        return this.setNode('operator', operator);
    }
    getOperator() {
        return this.operator;
    }
    setValue(value) {
        return this.setNode('value', value);
    }
    getValue() {
        return this.value;
    }
}
class HexColorValue extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.HexColorValue;
    }
}
class RatioValue extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.RatioValue;
    }
}
const _dot = '.'.charCodeAt(0), _0 = '0'.charCodeAt(0), _9 = '9'.charCodeAt(0);
class NumericValue extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.NumericValue;
    }
    getValue() {
        const raw = this.getText();
        let unitIdx = 0;
        let code;
        for(let i = 0, len = raw.length; i < len; i++){
            code = raw.charCodeAt(i);
            if (!(_0 <= code && code <= _9 || code === _dot)) {
                break;
            }
            unitIdx += 1;
        }
        return {
            value: raw.substring(0, unitIdx),
            unit: unitIdx < raw.length ? raw.substring(unitIdx) : undefined
        };
    }
}
class VariableDeclaration extends AbstractDeclaration {
    constructor(offset, length){
        super(offset, length);
        this.needsSemicolon = true;
    }
    get type() {
        return NodeType.VariableDeclaration;
    }
    setVariable(node) {
        if (node) {
            node.attachTo(this);
            this.variable = node;
            return true;
        }
        return false;
    }
    getVariable() {
        return this.variable;
    }
    getName() {
        return this.variable ? this.variable.getName() : '';
    }
    setValue(node) {
        if (node) {
            node.attachTo(this);
            this.value = node;
            return true;
        }
        return false;
    }
    getValue() {
        return this.value;
    }
}
class Interpolation extends Node {
    // private _interpolations: void; // workaround for https://github.com/Microsoft/TypeScript/issues/18276
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.Interpolation;
    }
}
class Variable extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.VariableName;
    }
    getName() {
        return this.getText();
    }
}
class ExtendsReference extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.ExtendsReference;
    }
    getSelectors() {
        if (!this.selectors) {
            this.selectors = new Nodelist(this);
        }
        return this.selectors;
    }
}
class MixinContentReference extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MixinContentReference;
    }
    getArguments() {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    }
}
class MixinContentDeclaration extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MixinContentDeclaration;
    }
    getParameters() {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    }
}
class MixinReference extends Node {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MixinReference;
    }
    getNamespaces() {
        if (!this.namespaces) {
            this.namespaces = new Nodelist(this);
        }
        return this.namespaces;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    getArguments() {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    }
    setContent(node) {
        return this.setNode('content', node);
    }
    getContent() {
        return this.content;
    }
}
class MixinDeclaration extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.MixinDeclaration;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
    getName() {
        return this.identifier ? this.identifier.getText() : '';
    }
    getParameters() {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    }
    setGuard(node) {
        if (node) {
            node.attachTo(this);
            this.guard = node;
        }
        return false;
    }
}
class UnknownAtRule extends BodyDeclaration {
    constructor(offset, length){
        super(offset, length);
    }
    get type() {
        return NodeType.UnknownAtRule;
    }
    setAtRuleName(atRuleName) {
        this.atRuleName = atRuleName;
    }
    getAtRuleName() {
        return this.atRuleName;
    }
}
class ListEntry extends Node {
    get type() {
        return NodeType.ListEntry;
    }
    setKey(node) {
        return this.setNode('key', node, 0);
    }
    setValue(node) {
        return this.setNode('value', node, 1);
    }
}
class LessGuard extends Node {
    getConditions() {
        if (!this.conditions) {
            this.conditions = new Nodelist(this);
        }
        return this.conditions;
    }
}
class GuardCondition extends Node {
    setVariable(node) {
        return this.setNode('variable', node);
    }
}
class Module extends Node {
    get type() {
        return NodeType.Module;
    }
    setIdentifier(node) {
        return this.setNode('identifier', node, 0);
    }
    getIdentifier() {
        return this.identifier;
    }
}
var Level;
(function(Level) {
    Level[Level["Ignore"] = 1] = "Ignore";
    Level[Level["Warning"] = 2] = "Warning";
    Level[Level["Error"] = 4] = "Error";
})(Level || (Level = {}));
class Marker {
    constructor(node, rule, level, message, offset = node.offset, length = node.length){
        this.node = node;
        this.rule = rule;
        this.level = level;
        this.message = message || rule.message;
        this.offset = offset;
        this.length = length;
    }
    getRule() {
        return this.rule;
    }
    getLevel() {
        return this.level;
    }
    getOffset() {
        return this.offset;
    }
    getLength() {
        return this.length;
    }
    getNode() {
        return this.node;
    }
    getMessage() {
        return this.message;
    }
}
/*
export class DefaultVisitor implements IVisitor {

    public visitNode(node:Node):boolean {
        switch (node.type) {
            case NodeType.Stylesheet:
                return this.visitStylesheet(<Stylesheet> node);
            case NodeType.FontFace:
                return this.visitFontFace(<FontFace> node);
            case NodeType.Ruleset:
                return this.visitRuleSet(<RuleSet> node);
            case NodeType.Selector:
                return this.visitSelector(<Selector> node);
            case NodeType.SimpleSelector:
                return this.visitSimpleSelector(<SimpleSelector> node);
            case NodeType.Declaration:
                return this.visitDeclaration(<Declaration> node);
            case NodeType.Function:
                return this.visitFunction(<Function> node);
            case NodeType.FunctionDeclaration:
                return this.visitFunctionDeclaration(<FunctionDeclaration> node);
            case NodeType.FunctionParameter:
                return this.visitFunctionParameter(<FunctionParameter> node);
            case NodeType.FunctionArgument:
                return this.visitFunctionArgument(<FunctionArgument> node);
            case NodeType.Term:
                return this.visitTerm(<Term> node);
            case NodeType.Declaration:
                return this.visitExpression(<Expression> node);
            case NodeType.NumericValue:
                return this.visitNumericValue(<NumericValue> node);
            case NodeType.Page:
                return this.visitPage(<Page> node);
            case NodeType.PageBoxMarginBox:
                return this.visitPageBoxMarginBox(<PageBoxMarginBox> node);
            case NodeType.Property:
                return this.visitProperty(<Property> node);
            case NodeType.NumericValue:
                return this.visitNodelist(<Nodelist> node);
            case NodeType.Import:
                return this.visitImport(<Import> node);
            case NodeType.Namespace:
                return this.visitNamespace(<Namespace> node);
            case NodeType.Keyframe:
                return this.visitKeyframe(<Keyframe> node);
            case NodeType.KeyframeSelector:
                return this.visitKeyframeSelector(<KeyframeSelector> node);
            case NodeType.MixinDeclaration:
                return this.visitMixinDeclaration(<MixinDeclaration> node);
            case NodeType.MixinReference:
                return this.visitMixinReference(<MixinReference> node);
            case NodeType.Variable:
                return this.visitVariable(<Variable> node);
            case NodeType.VariableDeclaration:
                return this.visitVariableDeclaration(<VariableDeclaration> node);
        }
        return this.visitUnknownNode(node);
    }

    public visitFontFace(node:FontFace):boolean {
        return true;
    }

    public visitKeyframe(node:Keyframe):boolean {
        return true;
    }

    public visitKeyframeSelector(node:KeyframeSelector):boolean {
        return true;
    }

    public visitStylesheet(node:Stylesheet):boolean {
        return true;
    }

    public visitProperty(Node:Property):boolean {
        return true;
    }

    public visitRuleSet(node:RuleSet):boolean {
        return true;
    }

    public visitSelector(node:Selector):boolean {
        return true;
    }

    public visitSimpleSelector(node:SimpleSelector):boolean {
        return true;
    }

    public visitDeclaration(node:Declaration):boolean {
        return true;
    }

    public visitFunction(node:Function):boolean {
        return true;
    }

    public visitFunctionDeclaration(node:FunctionDeclaration):boolean {
        return true;
    }

    public visitInvocation(node:Invocation):boolean {
        return true;
    }

    public visitTerm(node:Term):boolean {
        return true;
    }

    public visitImport(node:Import):boolean {
        return true;
    }

    public visitNamespace(node:Namespace):boolean {
        return true;
    }

    public visitExpression(node:Expression):boolean {
        return true;
    }

    public visitNumericValue(node:NumericValue):boolean {
        return true;
    }

    public visitPage(node:Page):boolean {
        return true;
    }

    public visitPageBoxMarginBox(node:PageBoxMarginBox):boolean {
        return true;
    }

    public visitNodelist(node:Nodelist):boolean {
        return true;
    }

    public visitVariableDeclaration(node:VariableDeclaration):boolean {
        return true;
    }

    public visitVariable(node:Variable):boolean {
        return true;
    }

    public visitMixinDeclaration(node:MixinDeclaration):boolean {
        return true;
    }

    public visitMixinReference(node:MixinReference):boolean {
        return true;
    }

    public visitUnknownNode(node:Node):boolean {
        return true;
    }
}
*/ class ParseErrorCollector {
    static entries(node) {
        const visitor = new ParseErrorCollector();
        node.acceptVisitor(visitor);
        return visitor.entries;
    }
    constructor(){
        this.entries = [];
    }
    visitNode(node) {
        if (node.isErroneous()) {
            node.collectIssues(this.entries);
        }
        return true;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssErrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSIssueType",
    ()=>CSSIssueType,
    "ParseError",
    ()=>ParseError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class CSSIssueType {
    constructor(id, message){
        this.id = id;
        this.message = message;
    }
}
const ParseError = {
    NumberExpected: new CSSIssueType('css-numberexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("number expected")),
    ConditionExpected: new CSSIssueType('css-conditionexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("condition expected")),
    RuleOrSelectorExpected: new CSSIssueType('css-ruleorselectorexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("at-rule or selector expected")),
    DotExpected: new CSSIssueType('css-dotexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("dot expected")),
    ColonExpected: new CSSIssueType('css-colonexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("colon expected")),
    SemiColonExpected: new CSSIssueType('css-semicolonexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("semi-colon expected")),
    TermExpected: new CSSIssueType('css-termexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("term expected")),
    ExpressionExpected: new CSSIssueType('css-expressionexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("expression expected")),
    OperatorExpected: new CSSIssueType('css-operatorexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("operator expected")),
    IdentifierExpected: new CSSIssueType('css-identifierexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("identifier expected")),
    PercentageExpected: new CSSIssueType('css-percentageexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("percentage expected")),
    URIOrStringExpected: new CSSIssueType('css-uriorstringexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("uri or string expected")),
    URIExpected: new CSSIssueType('css-uriexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("URI expected")),
    VariableNameExpected: new CSSIssueType('css-varnameexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("variable name expected")),
    VariableValueExpected: new CSSIssueType('css-varvalueexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("variable value expected")),
    PropertyValueExpected: new CSSIssueType('css-propertyvalueexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("property value expected")),
    LeftCurlyExpected: new CSSIssueType('css-lcurlyexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("{ expected")),
    RightCurlyExpected: new CSSIssueType('css-rcurlyexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("} expected")),
    LeftSquareBracketExpected: new CSSIssueType('css-rbracketexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("[ expected")),
    RightSquareBracketExpected: new CSSIssueType('css-lbracketexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("] expected")),
    LeftParenthesisExpected: new CSSIssueType('css-lparentexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("( expected")),
    RightParenthesisExpected: new CSSIssueType('css-rparentexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(") expected")),
    CommaExpected: new CSSIssueType('css-commaexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("comma expected")),
    PageDirectiveOrDeclarationExpected: new CSSIssueType('css-pagedirordeclexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("page directive or declaraton expected")),
    UnknownAtRule: new CSSIssueType('css-unknownatrule', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("at-rule unknown")),
    UnknownKeyword: new CSSIssueType('css-unknownkeyword', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("unknown keyword")),
    SelectorExpected: new CSSIssueType('css-selectorexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("selector expected")),
    StringLiteralExpected: new CSSIssueType('css-stringliteralexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("string literal expected")),
    WhitespaceExpected: new CSSIssueType('css-whitespaceexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("whitespace expected")),
    MediaQueryExpected: new CSSIssueType('css-mediaqueryexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("media query expected")),
    IdentifierOrWildcardExpected: new CSSIssueType('css-idorwildcardexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("identifier or wildcard expected")),
    WildcardExpected: new CSSIssueType('css-wildcardexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("wildcard expected")),
    IdentifierOrVariableExpected: new CSSIssueType('css-idorvarexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("identifier or variable expected"))
};
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssParser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parser",
    ()=>Parser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$cssLanguageTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/cssLanguageTypes.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/languageFacts/builtinData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/objects.js [app-client] (ecmascript)");
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
 *--------------------------------------------------------------------------------------------*/ /// <summary>
/// A parser for the css core specification. See for reference:
/// https://www.w3.org/TR/CSS21/grammar.html
/// http://www.w3.org/TR/CSS21/syndata.html#tokenization
/// </summary>
class Parser {
    constructor(scnr = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scanner"]()){
        this.keyframeRegex = /^@(\-(webkit|ms|moz|o)\-)?keyframes$/i;
        this.scanner = scnr;
        this.token = {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF,
            offset: -1,
            len: 0,
            text: ''
        };
        this.prevToken = undefined;
    }
    peekIdent(text) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident === this.token.type && text.length === this.token.text.length && text === this.token.text.toLowerCase();
    }
    peekKeyword(text) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword === this.token.type && text.length === this.token.text.length && text === this.token.text.toLowerCase();
    }
    peekDelim(text) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Delim === this.token.type && text === this.token.text;
    }
    peek(type) {
        return type === this.token.type;
    }
    peekOne(...types) {
        return types.indexOf(this.token.type) !== -1;
    }
    peekRegExp(type, regEx) {
        if (type !== this.token.type) {
            return false;
        }
        return regEx.test(this.token.text);
    }
    hasWhitespace() {
        return !!this.prevToken && this.prevToken.offset + this.prevToken.len !== this.token.offset;
    }
    consumeToken() {
        this.prevToken = this.token;
        this.token = this.scanner.scan();
    }
    acceptUnicodeRange() {
        const token = this.scanner.tryScanUnicode();
        if (token) {
            this.prevToken = token;
            this.token = this.scanner.scan();
            return true;
        }
        return false;
    }
    mark() {
        return {
            prev: this.prevToken,
            curr: this.token,
            pos: this.scanner.pos()
        };
    }
    restoreAtMark(mark) {
        this.prevToken = mark.prev;
        this.token = mark.curr;
        this.scanner.goBackTo(mark.pos);
    }
    try(func) {
        const pos = this.mark();
        const node = func();
        if (!node) {
            this.restoreAtMark(pos);
            return null;
        }
        return node;
    }
    acceptOneKeyword(keywords) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword === this.token.type) {
            for (const keyword of keywords){
                if (keyword.length === this.token.text.length && keyword === this.token.text.toLowerCase()) {
                    this.consumeToken();
                    return true;
                }
            }
        }
        return false;
    }
    accept(type) {
        if (type === this.token.type) {
            this.consumeToken();
            return true;
        }
        return false;
    }
    acceptIdent(text) {
        if (this.peekIdent(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    }
    acceptKeyword(text) {
        if (this.peekKeyword(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    }
    acceptDelim(text) {
        if (this.peekDelim(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    }
    acceptRegexp(regEx) {
        if (regEx.test(this.token.text)) {
            this.consumeToken();
            return true;
        }
        return false;
    }
    _parseRegexp(regEx) {
        let node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Identifier);
        do {}while (this.acceptRegexp(regEx))
        return this.finish(node);
    }
    acceptUnquotedString() {
        const pos = this.scanner.pos();
        this.scanner.goBackTo(this.token.offset);
        const unquoted = this.scanner.scanUnquotedString();
        if (unquoted) {
            this.token = unquoted;
            this.consumeToken();
            return true;
        }
        this.scanner.goBackTo(pos);
        return false;
    }
    resync(resyncTokens, resyncStopTokens) {
        while(true){
            if (resyncTokens && resyncTokens.indexOf(this.token.type) !== -1) {
                this.consumeToken();
                return true;
            } else if (resyncStopTokens && resyncStopTokens.indexOf(this.token.type) !== -1) {
                return true;
            } else {
                if (this.token.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF) {
                    return false;
                }
                this.token = this.scanner.scan();
            }
        }
    }
    createNode(nodeType) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"](this.token.offset, this.token.len, nodeType);
    }
    create(ctor) {
        return new ctor(this.token.offset, this.token.len);
    }
    finish(node, error, resyncTokens, resyncStopTokens) {
        // parseNumeric misuses error for boolean flagging (however the real error mustn't be a false)
        // + nodelist offsets mustn't be modified, because there is a offset hack in rulesets for smartselection
        if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Nodelist"])) {
            if (error) {
                this.markError(node, error, resyncTokens, resyncStopTokens);
            }
            // set the node end position
            if (this.prevToken) {
                // length with more elements belonging together
                const prevEnd = this.prevToken.offset + this.prevToken.len;
                node.length = prevEnd > node.offset ? prevEnd - node.offset : 0; // offset is taken from current token, end from previous: Use 0 for empty nodes
            }
        }
        return node;
    }
    markError(node, error, resyncTokens, resyncStopTokens) {
        if (this.token !== this.lastErrorToken) {
            node.addIssue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"](node, error, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Level"].Error, undefined, this.token.offset, this.token.len));
            this.lastErrorToken = this.token;
        }
        if (resyncTokens || resyncStopTokens) {
            this.resync(resyncTokens, resyncStopTokens);
        }
    }
    parseStylesheet(textDocument) {
        const versionId = textDocument.version;
        const text = textDocument.getText();
        const textProvider = (offset, length)=>{
            if (textDocument.version !== versionId) {
                throw new Error('Underlying model has changed, AST is no longer valid');
            }
            return text.substr(offset, length);
        };
        return this.internalParse(text, this._parseStylesheet, textProvider);
    }
    internalParse(input, parseFunc, textProvider) {
        this.scanner.setSource(input);
        this.token = this.scanner.scan();
        const node = parseFunc.bind(this)();
        if (node) {
            if (textProvider) {
                node.textProvider = textProvider;
            } else {
                node.textProvider = (offset, length)=>{
                    return input.substr(offset, length);
                };
            }
        }
        return node;
    }
    _parseStylesheet() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stylesheet"]);
        while(node.addChild(this._parseStylesheetStart())){
        // Parse statements only valid at the beginning of stylesheets.
        }
        let inRecovery = false;
        do {
            let hasMatch = false;
            do {
                hasMatch = false;
                const statement = this._parseStylesheetStatement();
                if (statement) {
                    node.addChild(statement);
                    hasMatch = true;
                    inRecovery = false;
                    if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF) && this._needsSemicolonAfter(statement) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
                        this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
                    }
                }
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CDO) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CDC)){
                    // accept empty statements
                    hasMatch = true;
                    inRecovery = false;
                }
            }while (hasMatch)
            if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
                break;
            }
            if (!inRecovery) {
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
                    this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownAtRule);
                } else {
                    this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RuleOrSelectorExpected);
                }
                inRecovery = true;
            }
            this.consumeToken();
        }while (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF))
        return this.finish(node);
    }
    _parseStylesheetStart() {
        return this._parseCharset();
    }
    _parseStylesheetStatement(isNested = false) {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseStylesheetAtStatement(isNested);
        }
        return this._parseRuleset(isNested);
    }
    _parseStylesheetAtStatement(isNested = false) {
        return this._parseImport() || this._parseMedia(isNested) || this._parsePage() || this._parseFontFace() || this._parseKeyframe() || this._parseSupports(isNested) || this._parseLayer(isNested) || this._parsePropertyAtRule() || this._parseViewPort() || this._parseNamespace() || this._parseDocument() || this._parseContainer(isNested) || this._parseUnknownAtRule();
    }
    _tryParseRuleset(isNested) {
        const mark = this.mark();
        if (this._parseSelector(isNested)) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) && this._parseSelector(isNested)){
            // loop
            }
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
                this.restoreAtMark(mark);
                return this._parseRuleset(isNested);
            }
        }
        this.restoreAtMark(mark);
        return null;
    }
    _parseRuleset(isNested = false) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RuleSet"]);
        const selectors = node.getSelectors();
        if (!selectors.addChild(this._parseSelector(isNested))) {
            return null;
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!selectors.addChild(this._parseSelector(isNested))) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SelectorExpected);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parseRuleSetDeclarationAtStatement() {
        return this._parseMedia(true) || this._parseSupports(true) || this._parseLayer(true) || this._parseContainer(true) || this._parseUnknownAtRule();
    }
    _parseRuleSetDeclaration() {
        // https://www.w3.org/TR/css-syntax-3/#consume-a-list-of-declarations
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseRuleSetDeclarationAtStatement();
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
            return this._parseRuleset(true);
        }
        return this._tryParseRuleset(true) || this._parseDeclaration();
    }
    _needsSemicolonAfter(node) {
        switch(node.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Keyframe:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ViewPort:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Media:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Ruleset:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Namespace:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].If:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].For:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Each:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].While:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionDeclaration:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinContentDeclaration:
                return false;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ExtendsReference:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinContentReference:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ReturnStatement:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MediaQuery:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Debug:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Import:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].AtApplyRule:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].CustomPropertyDeclaration:
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].VariableDeclaration:
                return node.needsSemicolon;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinReference:
                return !node.getContent();
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declaration:
                return !node.getNestedProperties();
        }
        return false;
    }
    _parseDeclarations(parseDeclaration) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declarations"]);
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            return null;
        }
        let decl = parseDeclaration();
        while(node.addChild(decl)){
            if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR)) {
                break;
            }
            if (this._needsSemicolonAfter(decl) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
                ]);
            }
            // We accepted semicolon token. Link it to declaration.
            if (decl && this.prevToken && this.prevToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) {
                decl.semicolonPosition = this.prevToken.offset;
            }
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)){
            // accept empty statements
            }
            decl = parseDeclaration();
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightCurlyExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
            ]);
        }
        return this.finish(node);
    }
    _parseBody(node, parseDeclaration) {
        if (!node.setDeclarations(this._parseDeclarations(parseDeclaration))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftCurlyExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
            ]);
        }
        return this.finish(node);
    }
    _parseSelector(isNested) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selector"]);
        let hasContent = false;
        if (isNested) {
            // nested selectors can start with a combinator
            hasContent = node.addChild(this._parseCombinator());
        }
        while(node.addChild(this._parseSimpleSelector())){
            hasContent = true;
            node.addChild(this._parseCombinator()); // optional
        }
        return hasContent ? this.finish(node) : null;
    }
    _parseDeclaration(stopTokens) {
        const customProperty = this._tryParseCustomPropertyDeclaration(stopTokens);
        if (customProperty) {
            return customProperty;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ColonExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon
            ], stopTokens || [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
            ]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        if (!node.setValue(this._parseExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].PropertyValueExpected);
        }
        node.addChild(this._parsePrio());
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    }
    _tryParseCustomPropertyDeclaration(stopTokens) {
        if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^--/)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomPropertyDeclaration"]);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ColonExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon
            ]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        const mark = this.mark();
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            // try to parse it as nested declaration
            const propertySet = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomPropertySet"]);
            const declarations = this._parseDeclarations(this._parseRuleSetDeclaration.bind(this));
            if (propertySet.setDeclarations(declarations) && !declarations.isErroneous(true)) {
                propertySet.addChild(this._parsePrio());
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
                    this.finish(propertySet);
                    node.setPropertySet(propertySet);
                    node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
                    return this.finish(node);
                }
            }
            this.restoreAtMark(mark);
        }
        // try to parse as expression
        const expression = this._parseExpr();
        if (expression && !expression.isErroneous(true)) {
            this._parsePrio();
            if (this.peekOne(...stopTokens || [], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
                node.setValue(expression);
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
                    node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
                }
                return this.finish(node);
            }
        }
        this.restoreAtMark(mark);
        node.addChild(this._parseCustomPropertyValue(stopTokens));
        node.addChild(this._parsePrio());
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$objects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(node.colonPosition) && this.token.offset === node.colonPosition + 1) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].PropertyValueExpected);
        }
        return this.finish(node);
    }
    /**
     * Parse custom property values.
     *
     * Based on https://www.w3.org/TR/css-variables/#syntax
     *
     * This code is somewhat unusual, as the allowed syntax is incredibly broad,
     * parsing almost any sequence of tokens, save for a small set of exceptions.
     * Unbalanced delimitors, invalid tokens, and declaration
     * terminators like semicolons and !important directives (when not inside
     * of delimitors).
     */ _parseCustomPropertyValue(stopTokens = [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
    ]) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        const isTopLevel = ()=>curlyDepth === 0 && parensDepth === 0 && bracketsDepth === 0;
        const onStopToken = ()=>stopTokens.indexOf(this.token.type) !== -1;
        let curlyDepth = 0;
        let parensDepth = 0;
        let bracketsDepth = 0;
        done: while(true){
            switch(this.token.type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon:
                    // A semicolon only ends things if we're not inside a delimitor.
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation:
                    // An exclamation ends the value if we're not inside delims.
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL:
                    curlyDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR:
                    curlyDepth--;
                    if (curlyDepth < 0) {
                        // The property value has been terminated without a semicolon, and
                        // this is the last declaration in the ruleset.
                        if (onStopToken() && parensDepth === 0 && bracketsDepth === 0) {
                            break done;
                        }
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftCurlyExpected);
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL:
                    parensDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR:
                    parensDepth--;
                    if (parensDepth < 0) {
                        if (onStopToken() && bracketsDepth === 0 && curlyDepth === 0) {
                            break done;
                        }
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected);
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL:
                    bracketsDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR:
                    bracketsDepth--;
                    if (bracketsDepth < 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftSquareBracketExpected);
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BadString:
                    break done;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF:
                    // We shouldn't have reached the end of input, something is
                    // unterminated.
                    let error = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightCurlyExpected;
                    if (bracketsDepth > 0) {
                        error = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightSquareBracketExpected;
                    } else if (parensDepth > 0) {
                        error = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected;
                    }
                    return this.finish(node, error);
            }
            this.consumeToken();
        }
        return this.finish(node);
    }
    _tryToParseDeclaration(stopTokens) {
        const mark = this.mark();
        if (this._parseProperty() && this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            // looks like a declaration, go ahead
            this.restoreAtMark(mark);
            return this._parseDeclaration(stopTokens);
        }
        this.restoreAtMark(mark);
        return null;
    }
    _parseProperty() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Property"]);
        const mark = this.mark();
        if (this.acceptDelim('*') || this.acceptDelim('_')) {
            // support for  IE 5.x, 6 and 7 star hack: see http://en.wikipedia.org/wiki/CSS_filter#Star_hack
            if (this.hasWhitespace()) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (node.setIdentifier(this._parsePropertyIdentifier())) {
            return this.finish(node);
        }
        return null;
    }
    _parsePropertyIdentifier() {
        return this._parseIdent();
    }
    _parseCharset() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Charset)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        this.consumeToken(); // charset
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].String)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseImport() {
        // @import [ <url> | <string> ]
        //     [ layer | layer(<layer-name>) ]?
        //     <import-condition> ;
        // <import-conditions> = [ supports( [ <supports-condition> | <declaration> ] ) ]?
        //                      <media-query-list>?
        if (!this.peekKeyword('@import')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Import"]);
        this.consumeToken(); // @import
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].URIOrStringExpected);
        }
        return this._completeParseImport(node);
    }
    _completeParseImport(node) {
        if (this.acceptIdent('layer')) {
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                if (!node.addChild(this._parseLayerName())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
                    ]);
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                    ], []);
                }
            }
        }
        if (this.acceptIdent('supports')) {
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                node.addChild(this._tryToParseDeclaration() || this._parseSupportsCondition());
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                    ], []);
                }
            }
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            node.setMedialist(this._parseMediaQueryList());
        }
        return this.finish(node);
    }
    _parseNamespace() {
        // http://www.w3.org/TR/css3-namespace/
        // namespace  : NAMESPACE_SYM S* [IDENT S*]? [STRING|URI] S* ';' S*
        if (!this.peekKeyword('@namespace')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Namespace"]);
        this.consumeToken(); // @namespace
        if (!node.addChild(this._parseURILiteral())) {
            node.addChild(this._parseIdent()); // optional prefix
            if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].URIExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
                ]);
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseFontFace() {
        if (!this.peekKeyword('@font-face')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontFace"]);
        this.consumeToken(); // @font-face
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parseViewPort() {
        if (!this.peekKeyword('@-ms-viewport') && !this.peekKeyword('@-o-viewport') && !this.peekKeyword('@viewport')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewPort"]);
        this.consumeToken(); // @-ms-viewport
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parseKeyframe() {
        if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword, this.keyframeRegex)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keyframe"]);
        const atNode = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        this.consumeToken(); // atkeyword
        node.setKeyword(this.finish(atNode));
        if (atNode.matches('@-ms-keyframes')) {
            this.markError(atNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownKeyword);
        }
        if (!node.setIdentifier(this._parseKeyframeIdent())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        return this._parseBody(node, this._parseKeyframeSelector.bind(this));
    }
    _parseKeyframeIdent() {
        return this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Keyframe
        ]);
    }
    _parseKeyframeSelector() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeSelector"]);
        let hasContent = false;
        if (node.addChild(this._parseIdent())) {
            hasContent = true;
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Percentage)) {
            hasContent = true;
        }
        if (!hasContent) {
            return null;
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            hasContent = false;
            if (node.addChild(this._parseIdent())) {
                hasContent = true;
            }
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Percentage)) {
                hasContent = true;
            }
            if (!hasContent) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].PercentageExpected);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _tryParseKeyframeSelector() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeSelector"]);
        const pos = this.mark();
        let hasContent = false;
        if (node.addChild(this._parseIdent())) {
            hasContent = true;
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Percentage)) {
            hasContent = true;
        }
        if (!hasContent) {
            return null;
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            hasContent = false;
            if (node.addChild(this._parseIdent())) {
                hasContent = true;
            }
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Percentage)) {
                hasContent = true;
            }
            if (!hasContent) {
                this.restoreAtMark(pos);
                return null;
            }
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            this.restoreAtMark(pos);
            return null;
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parsePropertyAtRule() {
        // @property <custom-property-name> {
        // 	<declaration-list>
        //  }
        if (!this.peekKeyword('@property')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyAtRule"]);
        this.consumeToken(); // @layer
        if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^--/) || !node.setName(this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Property
        ]))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
        }
        return this._parseBody(node, this._parseDeclaration.bind(this));
    }
    _parseLayer(isNested = false) {
        // @layer layer-name {rules}
        // @layer layer-name;
        // @layer layer-name, layer-name, layer-name;
        // @layer {rules}
        if (!this.peekKeyword('@layer')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"]);
        this.consumeToken(); // @layer
        const names = this._parseLayerNameList();
        if (names) {
            node.setNames(names);
        }
        if ((!names || names.getChildren().length === 1) && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            return this._parseBody(node, this._parseLayerDeclaration.bind(this, isNested));
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseLayerDeclaration(isNested = false) {
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true) || this._tryToParseDeclaration() || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    }
    _parseLayerNameList() {
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].LayerNameList);
        if (!node.addChild(this._parseLayerName())) {
            return null;
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!node.addChild(this._parseLayerName())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
        }
        return this.finish(node);
    }
    _parseLayerName() {
        // <layer-name> = <ident> [ '.' <ident> ]*
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].LayerName);
        if (!node.addChild(this._parseIdent())) {
            return null;
        }
        while(!this.hasWhitespace() && this.acceptDelim('.')){
            if (this.hasWhitespace() || !node.addChild(this._parseIdent())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
        }
        return this.finish(node);
    }
    _parseSupports(isNested = false) {
        // SUPPORTS_SYM S* supports_condition '{' S* ruleset* '}' S*
        if (!this.peekKeyword('@supports')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Supports"]);
        this.consumeToken(); // @supports
        node.addChild(this._parseSupportsCondition());
        return this._parseBody(node, this._parseSupportsDeclaration.bind(this, isNested));
    }
    _parseSupportsDeclaration(isNested = false) {
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true) || this._tryToParseDeclaration() || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    }
    _parseSupportsCondition() {
        // supports_condition : supports_negation | supports_conjunction | supports_disjunction | supports_condition_in_parens ;
        // supports_condition_in_parens: ( '(' S* supports_condition S* ')' ) | supports_declaration_condition | general_enclosed ;
        // supports_negation: NOT S+ supports_condition_in_parens ;
        // supports_conjunction: supports_condition_in_parens ( S+ AND S+ supports_condition_in_parens )+;
        // supports_disjunction: supports_condition_in_parens ( S+ OR S+ supports_condition_in_parens )+;
        // supports_declaration_condition: '(' S* declaration ')';
        // general_enclosed: ( FUNCTION | '(' ) ( any | unused )* ')' ;
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportsCondition"]);
        if (this.acceptIdent('not')) {
            node.addChild(this._parseSupportsConditionInParens());
        } else {
            node.addChild(this._parseSupportsConditionInParens());
            if (this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^(and|or)$/i)) {
                const text = this.token.text.toLowerCase();
                while(this.acceptIdent(text)){
                    node.addChild(this._parseSupportsConditionInParens());
                }
            }
        }
        return this.finish(node);
    }
    _parseSupportsConditionInParens() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportsCondition"]);
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (this.prevToken) {
                node.lParent = this.prevToken.offset;
            }
            if (!node.addChild(this._tryToParseDeclaration([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
            ]))) {
                if (!this._parseSupportsCondition()) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ConditionExpected);
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                ], []);
            }
            if (this.prevToken) {
                node.rParent = this.prevToken.offset;
            }
            return this.finish(node);
        } else if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
            const pos = this.mark();
            this.consumeToken();
            if (!this.hasWhitespace() && this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                let openParentCount = 1;
                while(this.token.type !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF && openParentCount !== 0){
                    if (this.token.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL) {
                        openParentCount++;
                    } else if (this.token.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR) {
                        openParentCount--;
                    }
                    this.consumeToken();
                }
                return this.finish(node);
            } else {
                this.restoreAtMark(pos);
            }
        }
        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [], [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL
        ]);
    }
    _parseMediaDeclaration(isNested = false) {
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true) || this._tryToParseDeclaration() || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    }
    _parseMedia(isNested = false) {
        // MEDIA_SYM S* media_query_list '{' S* ruleset* '}' S*
        // media_query_list : S* [media_query [ ',' S* media_query ]* ]?
        if (!this.peekKeyword('@media')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Media"]);
        this.consumeToken(); // @media
        if (!node.addChild(this._parseMediaQueryList())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].MediaQueryExpected);
        }
        return this._parseBody(node, this._parseMediaDeclaration.bind(this, isNested));
    }
    _parseMediaQueryList() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Medialist"]);
        if (!node.addChild(this._parseMediaQuery())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].MediaQueryExpected);
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!node.addChild(this._parseMediaQuery())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].MediaQueryExpected);
            }
        }
        return this.finish(node);
    }
    _parseMediaQuery() {
        // <media-query> = <media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaQuery"]);
        const pos = this.mark();
        this.acceptIdent('not');
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (this.acceptIdent('only')) ;
            if (!node.addChild(this._parseIdent())) {
                return null;
            }
            if (this.acceptIdent('and')) {
                node.addChild(this._parseMediaCondition());
            }
        } else {
            this.restoreAtMark(pos); // 'not' is part of the MediaCondition
            node.addChild(this._parseMediaCondition());
        }
        return this.finish(node);
    }
    _parseRatio() {
        const pos = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatioValue"]);
        if (!this._parseNumeric()) {
            return null;
        }
        if (!this.acceptDelim('/')) {
            this.restoreAtMark(pos);
            return null;
        }
        if (!this._parseNumeric()) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].NumberExpected);
        }
        return this.finish(node);
    }
    _parseMediaCondition() {
        // <media-condition> = <media-not> | <media-and> | <media-or> | <media-in-parens>
        // <media-not> = not <media-in-parens>
        // <media-and> = <media-in-parens> [ and <media-in-parens> ]+
        // <media-or> = <media-in-parens> [ or <media-in-parens> ]+
        // <media-in-parens> = ( <media-condition> ) | <media-feature> | <general-enclosed>
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaCondition"]);
        this.acceptIdent('not');
        let parseExpression = true;
        while(parseExpression){
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
            if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL) || this.peekIdent('not')) {
                // <media-condition>
                node.addChild(this._parseMediaCondition());
            } else {
                node.addChild(this._parseMediaFeature());
            }
            // not yet implemented: general enclosed
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
            parseExpression = this.acceptIdent('and') || this.acceptIdent('or');
        }
        return this.finish(node);
    }
    _parseMediaFeature() {
        const resyncStopToken = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
        ];
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaFeature"]);
        // <media-feature> = ( [ <mf-plain> | <mf-boolean> | <mf-range> ] )
        // <mf-plain> = <mf-name> : <mf-value>
        // <mf-boolean> = <mf-name>
        // <mf-range> = <mf-name> [ '<' | '>' ]? '='? <mf-value> | <mf-value> [ '<' | '>' ]? '='? <mf-name> | <mf-value> '<' '='? <mf-name> '<' '='? <mf-value> | <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>
        if (node.addChild(this._parseMediaFeatureName())) {
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
                if (!node.addChild(this._parseMediaFeatureValue())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected, [], resyncStopToken);
                }
            } else if (this._parseMediaFeatureRangeOperator()) {
                if (!node.addChild(this._parseMediaFeatureValue())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected, [], resyncStopToken);
                }
                if (this._parseMediaFeatureRangeOperator()) {
                    if (!node.addChild(this._parseMediaFeatureValue())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected, [], resyncStopToken);
                    }
                }
            } else ;
        } else if (node.addChild(this._parseMediaFeatureValue())) {
            if (!this._parseMediaFeatureRangeOperator()) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].OperatorExpected, [], resyncStopToken);
            }
            if (!node.addChild(this._parseMediaFeatureName())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [], resyncStopToken);
            }
            if (this._parseMediaFeatureRangeOperator()) {
                if (!node.addChild(this._parseMediaFeatureValue())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected, [], resyncStopToken);
                }
            }
        } else {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [], resyncStopToken);
        }
        return this.finish(node);
    }
    _parseMediaFeatureRangeOperator() {
        if (this.acceptDelim('<') || this.acceptDelim('>')) {
            if (!this.hasWhitespace()) {
                this.acceptDelim('=');
            }
            return true;
        } else if (this.acceptDelim('=')) {
            return true;
        }
        return false;
    }
    _parseMediaFeatureName() {
        return this._parseIdent();
    }
    _parseMediaFeatureValue() {
        return this._parseRatio() || this._parseTermExpression();
    }
    _parseMedium() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (node.addChild(this._parseIdent())) {
            return this.finish(node);
        } else {
            return null;
        }
    }
    _parsePageDeclaration() {
        return this._parsePageMarginBox() || this._parseRuleSetDeclaration();
    }
    _parsePage() {
        // http://www.w3.org/TR/css3-page/
        // page_rule : PAGE_SYM S* page_selector_list '{' S* page_body '}' S*
        // page_body :  /* Can be empty */ declaration? [ ';' S* page_body ]? | page_margin_box page_body
        if (!this.peekKeyword('@page')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Page"]);
        this.consumeToken();
        if (node.addChild(this._parsePageSelector())) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                if (!node.addChild(this._parsePageSelector())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
                }
            }
        }
        return this._parseBody(node, this._parsePageDeclaration.bind(this));
    }
    _parsePageMarginBox() {
        // page_margin_box :  margin_sym S* '{' S* declaration? [ ';' S* declaration? ]* '}' S*
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageBoxMarginBox"]);
        if (!this.acceptOneKeyword(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$languageFacts$2f$builtinData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pageBoxDirectives"])) {
            this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownAtRule, [], [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
            ]);
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parsePageSelector() {
        // page_selector : pseudo_page+ | IDENT pseudo_page*
        // pseudo_page :  ':' [ "left" | "right" | "first" | "blank" ];
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        node.addChild(this._parseIdent()); // optional ident
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            if (!node.addChild(this._parseIdent())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
        }
        return this.finish(node);
    }
    _parseDocument() {
        // -moz-document is experimental but has been pushed to css4
        if (!this.peekKeyword('@-moz-document')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"]);
        this.consumeToken(); // @-moz-document
        this.resync([], [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
        ]); // ignore all the rules
        return this._parseBody(node, this._parseStylesheetStatement.bind(this));
    }
    _parseContainerDeclaration(isNested = false) {
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true) || this._tryToParseDeclaration() || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    }
    _parseContainer(isNested = false) {
        if (!this.peekKeyword('@container')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"]);
        this.consumeToken(); // @container
        node.addChild(this._parseIdent()); // optional container name
        node.addChild(this._parseContainerQuery());
        return this._parseBody(node, this._parseContainerDeclaration.bind(this, isNested));
    }
    _parseContainerQuery() {
        // <container-query>     = not <query-in-parens>
        //                         | <query-in-parens> [ [ and <query-in-parens> ]* | [ or <query-in-parens> ]* ]
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (this.acceptIdent('not')) {
            node.addChild(this._parseContainerQueryInParens());
        } else {
            node.addChild(this._parseContainerQueryInParens());
            if (this.peekIdent('and')) {
                while(this.acceptIdent('and')){
                    node.addChild(this._parseContainerQueryInParens());
                }
            } else if (this.peekIdent('or')) {
                while(this.acceptIdent('or')){
                    node.addChild(this._parseContainerQueryInParens());
                }
            }
        }
        return this.finish(node);
    }
    _parseContainerQueryInParens() {
        // <query-in-parens>     = ( <container-query> )
        // 					  | ( <size-feature> )
        // 					  | style( <style-query> )
        // 					  | <general-enclosed>
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (this.peekIdent('not') || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                node.addChild(this._parseContainerQuery());
            } else {
                node.addChild(this._parseMediaFeature());
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
        } else if (this.acceptIdent('style')) {
            if (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
            node.addChild(this._parseStyleQuery());
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
        } else {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [], [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
            ]);
        }
        return this.finish(node);
    }
    _parseStyleQuery() {
        // <style-query>         = not <style-in-parens>
        // 					  | <style-in-parens> [ [ and <style-in-parens> ]* | [ or <style-in-parens> ]* ]
        // 					  | <style-feature>
        // <style-in-parens>     = ( <style-query> )
        // 					  | ( <style-feature> )
        // 					  | <general-enclosed>
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (this.acceptIdent('not')) {
            node.addChild(this._parseStyleInParens());
        } else if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            node.addChild(this._parseStyleInParens());
            if (this.peekIdent('and')) {
                while(this.acceptIdent('and')){
                    node.addChild(this._parseStyleInParens());
                }
            } else if (this.peekIdent('or')) {
                while(this.acceptIdent('or')){
                    node.addChild(this._parseStyleInParens());
                }
            }
        } else {
            node.addChild(this._parseDeclaration([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
            ]));
        }
        return this.finish(node);
    }
    _parseStyleInParens() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            node.addChild(this._parseStyleQuery());
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
        } else {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [], [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
            ]);
        }
        return this.finish(node);
    }
    // https://www.w3.org/TR/css-syntax-3/#consume-an-at-rule
    _parseUnknownAtRule() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnknownAtRule"]);
        node.addChild(this._parseUnknownAtRuleName());
        const isTopLevel = ()=>curlyDepth === 0 && parensDepth === 0 && bracketsDepth === 0;
        let curlyLCount = 0;
        let curlyDepth = 0;
        let parensDepth = 0;
        let bracketsDepth = 0;
        done: while(true){
            switch(this.token.type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon:
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF:
                    if (curlyDepth > 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightCurlyExpected);
                    } else if (bracketsDepth > 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightSquareBracketExpected);
                    } else if (parensDepth > 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
                    } else {
                        return this.finish(node);
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL:
                    curlyLCount++;
                    curlyDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR:
                    curlyDepth--;
                    // End of at-rule, consume CurlyR and return node
                    if (curlyLCount > 0 && curlyDepth === 0) {
                        this.consumeToken();
                        if (bracketsDepth > 0) {
                            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightSquareBracketExpected);
                        } else if (parensDepth > 0) {
                            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
                        }
                        break done;
                    }
                    if (curlyDepth < 0) {
                        // The property value has been terminated without a semicolon, and
                        // this is the last declaration in the ruleset.
                        if (parensDepth === 0 && bracketsDepth === 0) {
                            break done;
                        }
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftCurlyExpected);
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL:
                    parensDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR:
                    parensDepth--;
                    if (parensDepth < 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected);
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL:
                    bracketsDepth++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR:
                    bracketsDepth--;
                    if (bracketsDepth < 0) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftSquareBracketExpected);
                    }
                    break;
            }
            this.consumeToken();
        }
        return node;
    }
    _parseUnknownAtRuleName() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this.finish(node);
        }
        return node;
    }
    _parseOperator() {
        // these are operators for binary expressions
        if (this.peekDelim('/') || this.peekDelim('*') || this.peekDelim('+') || this.peekDelim('-') || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Dashmatch) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Includes) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SubstringOperator) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].PrefixOperator) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SuffixOperator) || this.peekDelim('=')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Operator);
            this.consumeToken();
            return this.finish(node);
        } else {
            return null;
        }
    }
    _parseUnaryOperator() {
        if (!this.peekDelim('+') && !this.peekDelim('-')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        this.consumeToken();
        return this.finish(node);
    }
    _parseCombinator() {
        if (this.peekDelim('>')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            const mark = this.mark();
            if (!this.hasWhitespace() && this.acceptDelim('>')) {
                if (!this.hasWhitespace() && this.acceptDelim('>')) {
                    node.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorShadowPiercingDescendant;
                    return this.finish(node);
                }
                this.restoreAtMark(mark);
            }
            node.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorParent;
            return this.finish(node);
        } else if (this.peekDelim('+')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            node.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorSibling;
            return this.finish(node);
        } else if (this.peekDelim('~')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            node.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorAllSiblings;
            return this.finish(node);
        } else if (this.peekDelim('/')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            const mark = this.mark();
            if (!this.hasWhitespace() && this.acceptIdent('deep') && !this.hasWhitespace() && this.acceptDelim('/')) {
                node.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinatorShadowPiercingDescendant;
                return this.finish(node);
            }
            this.restoreAtMark(mark);
        }
        return null;
    }
    _parseSimpleSelector() {
        // simple_selector
        //  : element_name [ HASH | class | attrib | pseudo ]* | [ HASH | class | attrib | pseudo ]+ ;
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleSelector"]);
        let c = 0;
        if (node.addChild(this._parseElementName() || this._parseNestingSelector())) {
            c++;
        }
        while((c === 0 || !this.hasWhitespace()) && node.addChild(this._parseSimpleSelectorBody())){
            c++;
        }
        return c > 0 ? this.finish(node) : null;
    }
    _parseNestingSelector() {
        if (this.peekDelim('&')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinator);
            this.consumeToken();
            return this.finish(node);
        }
        return null;
    }
    _parseSimpleSelectorBody() {
        return this._parsePseudo() || this._parseHash() || this._parseClass() || this._parseAttrib();
    }
    _parseSelectorIdent() {
        return this._parseIdent();
    }
    _parseHash() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Hash) && !this.peekDelim('#')) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].IdentifierSelector);
        if (this.acceptDelim('#')) {
            if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
        } else {
            this.consumeToken(); // TokenType.Hash
        }
        return this.finish(node);
    }
    _parseClass() {
        // class: '.' IDENT ;
        if (!this.peekDelim('.')) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ClassSelector);
        this.consumeToken(); // '.'
        if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
        }
        return this.finish(node);
    }
    _parseElementName() {
        // element_name: (ns? '|')? IDENT | '*';
        const pos = this.mark();
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ElementNameSelector);
        node.addChild(this._parseNamespacePrefix());
        if (!node.addChild(this._parseSelectorIdent()) && !this.acceptDelim('*')) {
            this.restoreAtMark(pos);
            return null;
        }
        return this.finish(node);
    }
    _parseNamespacePrefix() {
        const pos = this.mark();
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].NamespacePrefix);
        if (!node.addChild(this._parseIdent()) && !this.acceptDelim('*')) ;
        if (!this.acceptDelim('|')) {
            this.restoreAtMark(pos);
            return null;
        }
        return this.finish(node);
    }
    _parseAttrib() {
        // attrib : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*   [ IDENT | STRING ] S* ]? ']'
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AttributeSelector"]);
        this.consumeToken(); // BracketL
        // Optional attrib namespace
        node.setNamespacePrefix(this._parseNamespacePrefix());
        if (!node.setIdentifier(this._parseIdent())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
        }
        if (node.setOperator(this._parseOperator())) {
            node.setValue(this._parseBinaryExpr());
            this.acceptIdent('i'); // case insensitive matching
            this.acceptIdent('s'); // case sensitive matching
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightSquareBracketExpected);
        }
        return this.finish(node);
    }
    _parsePseudo() {
        // pseudo: ':' [ IDENT | FUNCTION S* [IDENT S*]? ')' ]
        const node = this._tryParsePseudoIdentifier();
        if (node) {
            if (!this.hasWhitespace() && this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                const tryAsSelector = ()=>{
                    const selectors = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
                    if (!selectors.addChild(this._parseSelector(true))) {
                        return null;
                    }
                    while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) && selectors.addChild(this._parseSelector(true))){
                    // loop
                    }
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        return this.finish(selectors);
                    }
                    return null;
                };
                let hasSelector = node.addChild(this.try(tryAsSelector));
                if (!hasSelector) {
                    if (node.addChild(this._parseBinaryExpr()) && this.acceptIdent('of') && !node.addChild(this.try(tryAsSelector))) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SelectorExpected);
                    }
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
                }
            }
            return this.finish(node);
        }
        return null;
    }
    _tryParsePseudoIdentifier() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return null;
        }
        const pos = this.mark();
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].PseudoSelector);
        this.consumeToken(); // Colon
        if (this.hasWhitespace()) {
            this.restoreAtMark(pos);
            return null;
        }
        // optional, support ::
        this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon);
        if (this.hasWhitespace() || !node.addChild(this._parseIdent())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
        }
        return this.finish(node);
    }
    _tryParsePrio() {
        const mark = this.mark();
        const prio = this._parsePrio();
        if (prio) {
            return prio;
        }
        this.restoreAtMark(mark);
        return null;
    }
    _parsePrio() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation)) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Prio);
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation) && this.acceptIdent('important')) {
            return this.finish(node);
        }
        return null;
    }
    _parseExpr(stopOnComma = false) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Expression"]);
        if (!node.addChild(this._parseBinaryExpr())) {
            return null;
        }
        while(true){
            if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)) {
                if (stopOnComma) {
                    return this.finish(node);
                }
                this.consumeToken();
            }
            if (!node.addChild(this._parseBinaryExpr())) {
                break;
            }
        }
        return this.finish(node);
    }
    _parseUnicodeRange() {
        if (!this.peekIdent('u')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnicodeRange"]);
        if (!this.acceptUnicodeRange()) {
            return null;
        }
        return this.finish(node);
    }
    _parseNamedLine() {
        // https://www.w3.org/TR/css-grid-1/#named-lines
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].GridLine);
        this.consumeToken();
        while(node.addChild(this._parseIdent())){
        // repeat
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightSquareBracketExpected);
        }
        return this.finish(node);
    }
    _parseBinaryExpr(preparsedLeft, preparsedOper) {
        let node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BinaryExpression"]);
        if (!node.setLeft(preparsedLeft || this._parseTerm())) {
            return null;
        }
        if (!node.setOperator(preparsedOper || this._parseOperator())) {
            return this.finish(node);
        }
        if (!node.setRight(this._parseTerm())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected);
        }
        // things needed for multiple binary expressions
        node = this.finish(node);
        const operator = this._parseOperator();
        if (operator) {
            node = this._parseBinaryExpr(node, operator);
        }
        return this.finish(node);
    }
    _parseTerm() {
        let node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Term"]);
        node.setOperator(this._parseUnaryOperator()); // optional
        if (node.setExpression(this._parseTermExpression())) {
            return this.finish(node);
        }
        return null;
    }
    _parseTermExpression() {
        return this._parseURILiteral() || // url before function
        this._parseUnicodeRange() || this._parseFunction() || // function before ident
        this._parseIdent() || this._parseStringLiteral() || this._parseNumeric() || this._parseHexColor() || this._parseOperation() || this._parseNamedLine();
    }
    _parseOperation() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        this.consumeToken(); // ParenthesisL
        node.addChild(this._parseExpr());
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseNumeric() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Num) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Percentage) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Resolution) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Length) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EMS) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EXS) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Angle) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Time) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Dimension) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ContainerQueryLength) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Freq)) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumericValue"]);
            this.consumeToken();
            return this.finish(node);
        }
        return null;
    }
    _parseStringLiteral() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].String) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BadString)) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].StringLiteral);
        this.consumeToken();
        return this.finish(node);
    }
    _parseURILiteral() {
        if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^url(-prefix)?$/i)) {
            return null;
        }
        const pos = this.mark();
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].URILiteral);
        this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident);
        if (this.hasWhitespace() || !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        this.scanner.inURL = true;
        this.consumeToken(); // consume ()
        node.addChild(this._parseURLArgument()); // argument is optional
        this.scanner.inURL = false;
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseURLArgument() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].String) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BadString) && !this.acceptUnquotedString()) {
            return null;
        }
        return this.finish(node);
    }
    _parseIdent(referenceTypes) {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
        if (referenceTypes) {
            node.referenceTypes = referenceTypes;
        }
        node.isCustomProperty = this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^--/);
        this.consumeToken();
        return this.finish(node);
    }
    _parseFunction() {
        const pos = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Function"]);
        if (!node.setIdentifier(this._parseFunctionIdentifier())) {
            return null;
        }
        if (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        if (node.getArguments().addChild(this._parseFunctionArgument())) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    break;
                }
                if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                    this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
                }
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseFunctionIdentifier() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
        node.referenceTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function
        ];
        if (this.acceptIdent('progid')) {
            // support for IE7 specific filters: 'progid:DXImageTransform.Microsoft.MotionBlur(strength=13, direction=310)'
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident) && this.acceptDelim('.')){
                // loop
                }
            }
            return this.finish(node);
        }
        this.consumeToken();
        return this.finish(node);
    }
    _parseFunctionArgument() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"]);
        if (node.setValue(this._parseExpr(true))) {
            return this.finish(node);
        }
        return null;
    }
    _parseHexColor() {
        if (this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Hash, /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/g)) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexColorValue"]);
            this.consumeToken();
            return this.finish(node);
        } else {
            return null;
        }
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssSymbolScope.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalScope",
    ()=>GlobalScope,
    "Scope",
    ()=>Scope,
    "ScopeBuilder",
    ()=>ScopeBuilder,
    "Symbol",
    ()=>Symbol,
    "Symbols",
    ()=>Symbols
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/utils/arrays.js [app-client] (ecmascript)");
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class Scope {
    constructor(offset, length){
        this.offset = offset;
        this.length = length;
        this.symbols = [];
        this.parent = null;
        this.children = [];
    }
    addChild(scope) {
        this.children.push(scope);
        scope.setParent(this);
    }
    setParent(scope) {
        this.parent = scope;
    }
    findScope(offset, length = 0) {
        if (this.offset <= offset && this.offset + this.length > offset + length || this.offset === offset && this.length === length) {
            return this.findInScope(offset, length);
        }
        return null;
    }
    findInScope(offset, length = 0) {
        // find the first scope child that has an offset larger than offset + length
        const end = offset + length;
        const idx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$utils$2f$arrays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findFirst"])(this.children, (s)=>s.offset > end);
        if (idx === 0) {
            // all scopes have offsets larger than our end
            return this;
        }
        const res = this.children[idx - 1];
        if (res.offset <= offset && res.offset + res.length >= offset + length) {
            return res.findInScope(offset, length);
        }
        return this;
    }
    addSymbol(symbol) {
        this.symbols.push(symbol);
    }
    getSymbol(name, type) {
        for(let index = 0; index < this.symbols.length; index++){
            const symbol = this.symbols[index];
            if (symbol.name === name && symbol.type === type) {
                return symbol;
            }
        }
        return null;
    }
    getSymbols() {
        return this.symbols;
    }
}
class GlobalScope extends Scope {
    constructor(){
        super(0, Number.MAX_VALUE);
    }
}
class Symbol {
    constructor(name, value, node, type){
        this.name = name;
        this.value = value;
        this.node = node;
        this.type = type;
    }
}
class ScopeBuilder {
    constructor(scope){
        this.scope = scope;
    }
    addSymbol(node, name, value, type) {
        if (node.offset !== -1) {
            const current = this.scope.findScope(node.offset, node.length);
            if (current) {
                current.addSymbol(new Symbol(name, value, node, type));
            }
        }
    }
    addScope(node) {
        if (node.offset !== -1) {
            const current = this.scope.findScope(node.offset, node.length);
            if (current && (current.offset !== node.offset || current.length !== node.length)) {
                const newScope = new Scope(node.offset, node.length);
                current.addChild(newScope);
                return newScope;
            }
            return current;
        }
        return null;
    }
    addSymbolToChildScope(scopeNode, node, name, value, type) {
        if (scopeNode && scopeNode.offset !== -1) {
            const current = this.addScope(scopeNode); // create the scope or gets the existing one
            if (current) {
                current.addSymbol(new Symbol(name, value, node, type));
            }
        }
    }
    visitNode(node) {
        switch(node.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Keyframe:
                this.addSymbol(node, node.getName(), void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Keyframe);
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].CustomPropertyDeclaration:
                return this.visitCustomPropertyDeclarationNode(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].VariableDeclaration:
                return this.visitVariableDeclarationNode(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Ruleset:
                return this.visitRuleSet(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].MixinDeclaration:
                this.addSymbol(node, node.getName(), void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin);
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionDeclaration:
                this.addSymbol(node, node.getName(), void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function);
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].FunctionParameter:
                {
                    return this.visitFunctionParameterNode(node);
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Declarations:
                this.addScope(node);
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].For:
                const forNode = node;
                const scopeNode = forNode.getDeclarations();
                if (scopeNode && forNode.variable) {
                    this.addSymbolToChildScope(scopeNode, forNode.variable, forNode.variable.getName(), void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
                }
                return true;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Each:
                {
                    const eachNode = node;
                    const scopeNode = eachNode.getDeclarations();
                    if (scopeNode) {
                        const variables = eachNode.getVariables().getChildren();
                        for (const variable of variables){
                            this.addSymbolToChildScope(scopeNode, variable, variable.getName(), void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
                        }
                    }
                    return true;
                }
        }
        return true;
    }
    visitRuleSet(node) {
        const current = this.scope.findScope(node.offset, node.length);
        if (current) {
            for (const child of node.getSelectors().getChildren()){
                if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selector"]) {
                    if (child.getChildren().length === 1) {
                        current.addSymbol(new Symbol(child.getChild(0).getText(), void 0, child, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Rule));
                    }
                }
            }
        }
        return true;
    }
    visitVariableDeclarationNode(node) {
        const value = node.getValue() ? node.getValue().getText() : void 0;
        this.addSymbol(node, node.getName(), value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
        return true;
    }
    visitFunctionParameterNode(node) {
        // parameters are part of the body scope
        const scopeNode = node.getParent().getDeclarations();
        if (scopeNode) {
            const valueNode = node.getDefaultValue();
            const value = valueNode ? valueNode.getText() : void 0;
            this.addSymbolToChildScope(scopeNode, node, node.getName(), value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
        }
        return true;
    }
    visitCustomPropertyDeclarationNode(node) {
        const value = node.getValue() ? node.getValue().getText() : '';
        this.addCSSVariable(node.getProperty(), node.getProperty().getName(), value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable);
        return true;
    }
    addCSSVariable(node, name, value, type) {
        if (node.offset !== -1) {
            this.scope.addSymbol(new Symbol(name, value, node, type));
        }
    }
}
class Symbols {
    constructor(node){
        this.global = new GlobalScope();
        node.acceptVisitor(new ScopeBuilder(this.global));
    }
    findSymbolsAtOffset(offset, referenceType) {
        let scope = this.global.findScope(offset, 0);
        const result = [];
        const names = {};
        while(scope){
            const symbols = scope.getSymbols();
            for(let i = 0; i < symbols.length; i++){
                const symbol = symbols[i];
                if (symbol.type === referenceType && !names[symbol.name]) {
                    result.push(symbol);
                    names[symbol.name] = true;
                }
            }
            scope = scope.parent;
        }
        return result;
    }
    internalFindSymbol(node, referenceTypes) {
        let scopeNode = node;
        if (node.parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionParameter"] && node.parent.getParent() instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BodyDeclaration"]) {
            scopeNode = node.parent.getParent().getDeclarations();
        }
        if (node.parent instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"] && node.parent.getParent() instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Function"]) {
            const funcId = node.parent.getParent().getIdentifier();
            if (funcId) {
                const functionSymbol = this.internalFindSymbol(funcId, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function
                ]);
                if (functionSymbol) {
                    scopeNode = functionSymbol.node.getDeclarations();
                }
            }
        }
        if (!scopeNode) {
            return null;
        }
        const name = node.getText();
        let scope = this.global.findScope(scopeNode.offset, scopeNode.length);
        while(scope){
            for(let index = 0; index < referenceTypes.length; index++){
                const type = referenceTypes[index];
                const symbol = scope.getSymbol(name, type);
                if (symbol) {
                    return symbol;
                }
            }
            scope = scope.parent;
        }
        return null;
    }
    evaluateReferenceTypes(node) {
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]) {
            const referenceTypes = node.referenceTypes;
            if (referenceTypes) {
                return referenceTypes;
            } else {
                if (node.isCustomProperty) {
                    return [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable
                    ];
                }
                // are a reference to a keyframe?
                const decl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentDeclaration"])(node);
                if (decl) {
                    const propertyName = decl.getNonPrefixedPropertyName();
                    if ((propertyName === 'animation' || propertyName === 'animation-name') && decl.getValue() && decl.getValue().offset === node.offset) {
                        return [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Keyframe
                        ];
                    }
                }
            }
        } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Variable"]) {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Variable
            ];
        }
        const selector = node.findAParent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Selector, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ExtendsReference);
        if (selector) {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Rule
            ];
        }
        return null;
    }
    findSymbolFromNode(node) {
        if (!node) {
            return null;
        }
        while(node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Interpolation){
            node = node.getParent();
        }
        const referenceTypes = this.evaluateReferenceTypes(node);
        if (referenceTypes) {
            return this.internalFindSymbol(node, referenceTypes);
        }
        return null;
    }
    matchesSymbol(node, symbol) {
        if (!node) {
            return false;
        }
        while(node.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Interpolation){
            node = node.getParent();
        }
        if (!node.matches(symbol.name)) {
            return false;
        }
        const referenceTypes = this.evaluateReferenceTypes(node);
        if (!referenceTypes || referenceTypes.indexOf(symbol.type) === -1) {
            return false;
        }
        const nodeSymbol = this.internalFindSymbol(node, referenceTypes);
        return nodeSymbol === symbol;
    }
    findSymbol(name, type, offset) {
        let scope = this.global.findScope(offset);
        while(scope){
            const symbol = scope.getSymbol(name, type);
            if (symbol) {
                return symbol;
            }
            scope = scope.parent;
        }
        return null;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssScanner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ellipsis",
    ()=>Ellipsis,
    "EqualsOperator",
    ()=>EqualsOperator,
    "GreaterEqualsOperator",
    ()=>GreaterEqualsOperator,
    "InterpolationFunction",
    ()=>InterpolationFunction,
    "NotEqualsOperator",
    ()=>NotEqualsOperator,
    "SCSSScanner",
    ()=>SCSSScanner,
    "SmallerEqualsOperator",
    ()=>SmallerEqualsOperator,
    "VariableName",
    ()=>VariableName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const _FSL = '/'.charCodeAt(0);
const _NWL = '\n'.charCodeAt(0);
const _CAR = '\r'.charCodeAt(0);
const _LFD = '\f'.charCodeAt(0);
const _DLR = '$'.charCodeAt(0);
const _HSH = '#'.charCodeAt(0);
const _CUL = '{'.charCodeAt(0);
const _EQS = '='.charCodeAt(0);
const _BNG = '!'.charCodeAt(0);
const _LAN = '<'.charCodeAt(0);
const _RAN = '>'.charCodeAt(0);
const _DOT = '.'.charCodeAt(0);
let customTokenValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CustomToken;
const VariableName = customTokenValue++;
const InterpolationFunction = customTokenValue++;
customTokenValue++;
const EqualsOperator = customTokenValue++;
const NotEqualsOperator = customTokenValue++;
const GreaterEqualsOperator = customTokenValue++;
const SmallerEqualsOperator = customTokenValue++;
const Ellipsis = customTokenValue++;
customTokenValue++;
class SCSSScanner extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scanner"] {
    scanNext(offset) {
        // scss variable
        if (this.stream.advanceIfChar(_DLR)) {
            const content = [
                '$'
            ];
            if (this.ident(content)) {
                return this.finishToken(offset, VariableName, content.join(''));
            } else {
                this.stream.goBackTo(offset);
            }
        }
        // scss: interpolation function #{..})
        if (this.stream.advanceIfChars([
            _HSH,
            _CUL
        ])) {
            return this.finishToken(offset, InterpolationFunction);
        }
        // operator ==
        if (this.stream.advanceIfChars([
            _EQS,
            _EQS
        ])) {
            return this.finishToken(offset, EqualsOperator);
        }
        // operator !=
        if (this.stream.advanceIfChars([
            _BNG,
            _EQS
        ])) {
            return this.finishToken(offset, NotEqualsOperator);
        }
        // operators <, <=
        if (this.stream.advanceIfChar(_LAN)) {
            if (this.stream.advanceIfChar(_EQS)) {
                return this.finishToken(offset, SmallerEqualsOperator);
            }
            return this.finishToken(offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Delim);
        }
        // ooperators >, >=
        if (this.stream.advanceIfChar(_RAN)) {
            if (this.stream.advanceIfChar(_EQS)) {
                return this.finishToken(offset, GreaterEqualsOperator);
            }
            return this.finishToken(offset, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Delim);
        }
        // ellipis
        if (this.stream.advanceIfChars([
            _DOT,
            _DOT,
            _DOT
        ])) {
            return this.finishToken(offset, Ellipsis);
        }
        return super.scanNext(offset);
    }
    comment() {
        if (super.comment()) {
            return true;
        }
        if (!this.inURL && this.stream.advanceIfChars([
            _FSL,
            _FSL
        ])) {
            this.stream.advanceWhileChar((ch)=>{
                switch(ch){
                    case _NWL:
                    case _CAR:
                    case _LFD:
                        return false;
                    default:
                        return true;
                }
            });
            return true;
        } else {
            return false;
        }
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssErrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCSSIssueType",
    ()=>SCSSIssueType,
    "SCSSParseError",
    ()=>SCSSParseError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/@vscode/l10n/dist/browser.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class SCSSIssueType {
    constructor(id, message){
        this.id = id;
        this.message = message;
    }
}
const SCSSParseError = {
    FromExpected: new SCSSIssueType('scss-fromexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("'from' expected")),
    ThroughOrToExpected: new SCSSIssueType('scss-throughexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("'through' or 'to' expected")),
    InExpected: new SCSSIssueType('scss-fromexpected', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f40$vscode$2f$l10n$2f$dist$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])("'in' expected"))
};
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssParser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCSSParser",
    ()=>SCSSParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/scssErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssErrors.js [app-client] (ecmascript)");
;
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /// <summary>
/// A parser for scss
/// http://sass-lang.com/documentation/file.SASS_REFERENCE.html
/// </summary>
class SCSSParser extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"] {
    constructor(){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSScanner"]());
    }
    _parseStylesheetStatement(isNested = false) {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseWarnAndDebug() // @warn, @debug and @error statements
             || this._parseControlStatement() // @if, @while, @for, @each
             || this._parseMixinDeclaration() // @mixin
             || this._parseMixinContent() // @content
             || this._parseMixinReference() // @include
             || this._parseFunctionDeclaration() // @function
             || this._parseForward() // @forward
             || this._parseUse() // @use
             || this._parseRuleset(isNested) // @at-rule
             || super._parseStylesheetAtStatement(isNested);
        }
        return this._parseRuleset(true) || this._parseVariableDeclaration();
    }
    _parseImport() {
        if (!this.peekKeyword('@import')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Import"]);
        this.consumeToken();
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].URIOrStringExpected);
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].URIOrStringExpected);
            }
        }
        return this._completeParseImport(node);
    }
    // scss variables: $font-size: 12px;
    _parseVariableDeclaration(panic = []) {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableName"])) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableDeclaration"]);
        if (!node.setVariable(this._parseVariable())) {
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ColonExpected);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        if (!node.setValue(this._parseExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableValueExpected, [], panic);
        }
        while(this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation)){
            if (node.addChild(this._tryParsePrio())) ;
            else {
                this.consumeToken();
                if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^(default|global)$/)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownKeyword);
                }
                this.consumeToken();
            }
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    }
    _parseMediaCondition() {
        return this._parseInterpolation() || super._parseMediaCondition();
    }
    _parseMediaFeatureRangeOperator() {
        return this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmallerEqualsOperator"]) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GreaterEqualsOperator"]) || super._parseMediaFeatureRangeOperator();
    }
    _parseMediaFeatureName() {
        return this._parseModuleMember() || this._parseFunction() // function before ident
         || this._parseIdent() || this._parseVariable();
    }
    _parseKeyframeSelector() {
        return this._tryParseKeyframeSelector() || this._parseControlStatement(this._parseKeyframeSelector.bind(this)) || this._parseWarnAndDebug() // @warn, @debug and @error statements
         || this._parseMixinReference() // @include
         || this._parseFunctionDeclaration() // @function
         || this._parseVariableDeclaration() || this._parseMixinContent();
    }
    _parseVariable() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableName"])) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Variable"]);
        this.consumeToken();
        return node;
    }
    _parseModuleMember() {
        const pos = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Module"]);
        if (!node.setIdentifier(this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Module
        ]))) {
            return null;
        }
        if (this.hasWhitespace() || !this.acceptDelim('.') || this.hasWhitespace()) {
            this.restoreAtMark(pos);
            return null;
        }
        if (!node.addChild(this._parseVariable() || this._parseFunction())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierOrVariableExpected);
        }
        return node;
    }
    _parseIdent(referenceTypes) {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolationFunction"]) && !this.peekDelim('-')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
        node.referenceTypes = referenceTypes;
        node.isCustomProperty = this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /^--/);
        let hasContent = false;
        const indentInterpolation = ()=>{
            const pos = this.mark();
            if (this.acceptDelim('-')) {
                if (!this.hasWhitespace()) {
                    this.acceptDelim('-');
                }
                if (this.hasWhitespace()) {
                    this.restoreAtMark(pos);
                    return null;
                }
            }
            return this._parseInterpolation();
        };
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident) || node.addChild(indentInterpolation()) || hasContent && this.acceptRegexp(/^[\w-]/)){
            hasContent = true;
            if (this.hasWhitespace()) {
                break;
            }
        }
        return hasContent ? this.finish(node) : null;
    }
    _parseTermExpression() {
        return this._parseModuleMember() || this._parseVariable() || this._parseNestingSelector() || //this._tryParsePrio() ||
        super._parseTermExpression();
    }
    _parseInterpolation() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterpolationFunction"])) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Interpolation"]);
            this.consumeToken();
            if (!node.addChild(this._parseExpr()) && !this._parseNestingSelector()) {
                if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR)) {
                    return this.finish(node);
                }
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightCurlyExpected);
            }
            return this.finish(node);
        }
        return null;
    }
    _parseOperator() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualsOperator"]) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotEqualsOperator"]) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GreaterEqualsOperator"]) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmallerEqualsOperator"]) || this.peekDelim('>') || this.peekDelim('<') || this.peekIdent('and') || this.peekIdent('or') || this.peekDelim('%')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Operator);
            this.consumeToken();
            return this.finish(node);
        }
        return super._parseOperator();
    }
    _parseUnaryOperator() {
        if (this.peekIdent('not')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            return this.finish(node);
        }
        return super._parseUnaryOperator();
    }
    _parseRuleSetDeclaration() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseKeyframe() // nested @keyframe
             || this._parseImport() // nested @import
             || this._parseMedia(true) // nested @media
             || this._parseFontFace() // nested @font-face
             || this._parseWarnAndDebug() // @warn, @debug and @error statements
             || this._parseControlStatement() // @if, @while, @for, @each
             || this._parseFunctionDeclaration() // @function
             || this._parseExtends() // @extends
             || this._parseMixinReference() // @include
             || this._parseMixinContent() // @content
             || this._parseMixinDeclaration() // nested @mixin
             || this._parseRuleset(true) // @at-rule
             || this._parseSupports(true) // @supports
             || this._parseLayer() // @layer
             || this._parsePropertyAtRule() // @property
             || this._parseContainer(true) // nested @container
             || this._parseRuleSetDeclarationAtStatement();
        }
        return this._parseVariableDeclaration() // variable declaration
         || this._tryParseRuleset(true) // nested ruleset
         || this._parseDeclaration(); // try css ruleset declaration as last so in the error case, the ast will contain a declaration
    }
    _parseDeclaration(stopTokens) {
        const custonProperty = this._tryParseCustomPropertyDeclaration(stopTokens);
        if (custonProperty) {
            return custonProperty;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Declaration"]);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ColonExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon
            ], stopTokens || [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
            ]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        let hasContent = false;
        if (node.setValue(this._parseExpr())) {
            hasContent = true;
            node.addChild(this._parsePrio());
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            node.setNestedProperties(this._parseNestedProperties());
        } else {
            if (!hasContent) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].PropertyValueExpected);
            }
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    }
    _parseNestedProperties() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NestedProperties"]);
        return this._parseBody(node, this._parseDeclaration.bind(this));
    }
    _parseExtends() {
        if (this.peekKeyword('@extend')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendsReference"]);
            this.consumeToken();
            if (!node.getSelectors().addChild(this._parseSimpleSelector())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SelectorExpected);
            }
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                node.getSelectors().addChild(this._parseSimpleSelector());
            }
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation)) {
                if (!this.acceptIdent('optional')) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownKeyword);
                }
            }
            return this.finish(node);
        }
        return null;
    }
    _parseSimpleSelectorBody() {
        return this._parseSelectorPlaceholder() || super._parseSimpleSelectorBody();
    }
    _parseNestingSelector() {
        if (this.peekDelim('&')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinator);
            this.consumeToken();
            while(!this.hasWhitespace() && (this.acceptDelim('-') || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Num) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Dimension) || node.addChild(this._parseIdent()) || this.acceptDelim('&'))){
            //  support &-foo-1
            }
            return this.finish(node);
        }
        return null;
    }
    _parseSelectorPlaceholder() {
        if (this.peekDelim('%')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorPlaceholder);
            this.consumeToken();
            this._parseIdent();
            return this.finish(node);
        } else if (this.peekKeyword('@at-root')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorPlaceholder);
            this.consumeToken();
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                if (!this.acceptIdent('with') && !this.acceptIdent('without')) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ColonExpected);
                }
                if (!node.addChild(this._parseIdent())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
                    ]);
                }
            }
            return this.finish(node);
        }
        return null;
    }
    _parseElementName() {
        const pos = this.mark();
        const node = super._parseElementName();
        if (node && !this.hasWhitespace() && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        return node;
    }
    _tryParsePseudoIdentifier() {
        return this._parseInterpolation() || super._tryParsePseudoIdentifier(); // for #49589
    }
    _parseWarnAndDebug() {
        if (!this.peekKeyword('@debug') && !this.peekKeyword('@warn') && !this.peekKeyword('@error')) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Debug);
        this.consumeToken(); // @debug, @warn or @error
        node.addChild(this._parseExpr()); // optional
        return this.finish(node);
    }
    _parseControlStatement(parseStatement = this._parseRuleSetDeclaration.bind(this)) {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return null;
        }
        return this._parseIfStatement(parseStatement) || this._parseForStatement(parseStatement) || this._parseEachStatement(parseStatement) || this._parseWhileStatement(parseStatement);
    }
    _parseIfStatement(parseStatement) {
        if (!this.peekKeyword('@if')) {
            return null;
        }
        return this._internalParseIfStatement(parseStatement);
    }
    _internalParseIfStatement(parseStatement) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IfStatement"]);
        this.consumeToken(); // @if or if
        if (!node.setExpression(this._parseExpr(true))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
        }
        this._parseBody(node, parseStatement);
        if (this.acceptKeyword('@else')) {
            if (this.peekIdent('if')) {
                node.setElseClause(this._internalParseIfStatement(parseStatement));
            } else if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
                const elseNode = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElseStatement"]);
                this._parseBody(elseNode, parseStatement);
                node.setElseClause(elseNode);
            }
        }
        return this.finish(node);
    }
    _parseForStatement(parseStatement) {
        if (!this.peekKeyword('@for')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForStatement"]);
        this.consumeToken(); // @for
        if (!node.setVariable(this._parseVariable())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!this.acceptIdent('from')) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSParseError"].FromExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!this.acceptIdent('to') && !this.acceptIdent('through')) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSParseError"].ThroughOrToExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        return this._parseBody(node, parseStatement);
    }
    _parseEachStatement(parseStatement) {
        if (!this.peekKeyword('@each')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EachStatement"]);
        this.consumeToken(); // @each
        const variables = node.getVariables();
        if (!variables.addChild(this._parseVariable())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!variables.addChild(this._parseVariable())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
                ]);
            }
        }
        this.finish(variables);
        if (!this.acceptIdent('in')) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCSSParseError"].InExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!node.addChild(this._parseExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        return this._parseBody(node, parseStatement);
    }
    _parseWhileStatement(parseStatement) {
        if (!this.peekKeyword('@while')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WhileStatement"]);
        this.consumeToken(); // @while
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        return this._parseBody(node, parseStatement);
    }
    _parseFunctionBodyDeclaration() {
        return this._parseVariableDeclaration() || this._parseReturnStatement() || this._parseWarnAndDebug() || this._parseControlStatement(this._parseFunctionBodyDeclaration.bind(this));
    }
    _parseFunctionDeclaration() {
        if (!this.peekKeyword('@function')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionDeclaration"]);
        this.consumeToken(); // @function
        if (!node.setIdentifier(this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function
        ]))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (node.getParameters().addChild(this._parseParameterDeclaration())) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                }
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        return this._parseBody(node, this._parseFunctionBodyDeclaration.bind(this));
    }
    _parseReturnStatement() {
        if (!this.peekKeyword('@return')) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].ReturnStatement);
        this.consumeToken(); // @function
        if (!node.addChild(this._parseExpr())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
        }
        return this.finish(node);
    }
    _parseMixinDeclaration() {
        if (!this.peekKeyword('@mixin')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinDeclaration"]);
        this.consumeToken();
        if (!node.setIdentifier(this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin
        ]))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                    }
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
                ]);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    }
    _parseParameterDeclaration() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionParameter"]);
        if (!node.setIdentifier(this._parseVariable())) {
            return null;
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipsis"])) ;
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            if (!node.setDefaultValue(this._parseExpr(true))) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableValueExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                ]);
            }
        }
        return this.finish(node);
    }
    _parseMixinContent() {
        if (!this.peekKeyword('@content')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinContentReference"]);
        this.consumeToken();
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (node.getArguments().addChild(this._parseFunctionArgument())) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
                    }
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
            }
        }
        return this.finish(node);
    }
    _parseMixinReference() {
        if (!this.peekKeyword('@include')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinReference"]);
        this.consumeToken();
        // Could be module or mixin identifier, set as mixin as default.
        const firstIdent = this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin
        ]);
        if (!node.setIdentifier(firstIdent)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
            ]);
        }
        // Is a module accessor.
        if (!this.hasWhitespace() && this.acceptDelim('.') && !this.hasWhitespace()) {
            const secondIdent = this._parseIdent([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin
            ]);
            if (!secondIdent) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR
                ]);
            }
            const moduleToken = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Module"]);
            // Re-purpose first matched ident as identifier for module token.
            firstIdent.referenceTypes = [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Module
            ];
            moduleToken.setIdentifier(firstIdent);
            // Override identifier with second ident.
            node.setIdentifier(secondIdent);
            node.addChild(moduleToken);
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (node.getArguments().addChild(this._parseFunctionArgument())) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
                    }
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
            }
        }
        if (this.peekIdent('using') || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            node.setContent(this._parseMixinContentDeclaration());
        }
        return this.finish(node);
    }
    _parseMixinContentDeclaration() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinContentDeclaration"]);
        if (this.acceptIdent('using')) {
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
            if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                    }
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL
                ]);
            }
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            this._parseBody(node, this._parseMixinReferenceBodyStatement.bind(this));
        }
        return this.finish(node);
    }
    _parseMixinReferenceBodyStatement() {
        return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
    }
    _parseFunctionArgument() {
        // [variableName ':'] expression | variableName '...'
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"]);
        const pos = this.mark();
        const argument = this._parseVariable();
        if (argument) {
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
                if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipsis"])) {
                    node.setValue(argument);
                    return this.finish(node);
                } else {
                    this.restoreAtMark(pos);
                }
            } else {
                node.setIdentifier(argument);
            }
        }
        if (node.setValue(this._parseExpr(true))) {
            this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$scssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipsis"]); // #43746
            node.addChild(this._parsePrio()); // #9859
            return this.finish(node);
        } else if (node.setValue(this._tryParsePrio())) {
            return this.finish(node);
        }
        return null;
    }
    _parseURLArgument() {
        const pos = this.mark();
        const node = super._parseURLArgument();
        if (!node || !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            this.restoreAtMark(pos);
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            node.addChild(this._parseBinaryExpr());
            return this.finish(node);
        }
        return node;
    }
    _parseOperation() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        this.consumeToken();
        while(node.addChild(this._parseListElement())){
            this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma); // optional
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseListElement() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListEntry"]);
        const child = this._parseBinaryExpr();
        if (!child) {
            return null;
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            node.setKey(child);
            if (!node.setValue(this._parseBinaryExpr())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
            }
        } else {
            node.setValue(child);
        }
        return this.finish(node);
    }
    _parseUse() {
        if (!this.peekKeyword('@use')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Use"]);
        this.consumeToken(); // @use
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].StringLiteralExpected);
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            if (!this.peekRegExp(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident, /as|with/)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownKeyword);
            }
            if (this.acceptIdent('as') && !node.setIdentifier(this._parseIdent([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Module
            ])) && !this.acceptDelim('*')) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierOrWildcardExpected);
            }
            if (this.acceptIdent('with')) {
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                    ]);
                }
                // First variable statement, no comma.
                if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                }
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                    }
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
                }
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseModuleConfigDeclaration() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModuleConfiguration"]);
        if (!node.setIdentifier(this._parseVariable())) {
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon) || !node.setValue(this._parseExpr(true))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableValueExpected, [], [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
            ]);
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Exclamation)) {
            if (this.hasWhitespace() || !this.acceptIdent('default')) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].UnknownKeyword);
            }
        }
        return this.finish(node);
    }
    _parseForward() {
        if (!this.peekKeyword('@forward')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Forward"]);
        this.consumeToken();
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].StringLiteralExpected);
        }
        if (this.acceptIdent('as')) {
            const identifier = this._parseIdent([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Forward
            ]);
            if (!node.setIdentifier(identifier)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
            // Wildcard must be the next character after the identifier string.
            if (this.hasWhitespace() || !this.acceptDelim('*')) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].WildcardExpected);
            }
        }
        if (this.acceptIdent('with')) {
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                ]);
            }
            // First variable statement, no comma.
            if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
            }
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableNameExpected);
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
            }
        } else if (this.peekIdent('hide') || this.peekIdent('show')) {
            if (!node.addChild(this._parseForwardVisibility())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierOrVariableExpected);
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseForwardVisibility() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardVisibility"]);
        // Assume to be "hide" or "show".
        node.setIdentifier(this._parseIdent());
        while(node.addChild(this._parseVariable() || this._parseIdent())){
            // Consume all variables and idents ahead.
            this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma);
        }
        // More than just identifier
        return node.getChildren().length > 1 ? node : null;
    }
    _parseSupportsCondition() {
        return this._parseInterpolation() || super._parseSupportsCondition();
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/lessScanner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ellipsis",
    ()=>Ellipsis,
    "LESSScanner",
    ()=>LESSScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const _FSL = '/'.charCodeAt(0);
const _NWL = '\n'.charCodeAt(0);
const _CAR = '\r'.charCodeAt(0);
const _LFD = '\f'.charCodeAt(0);
const _TIC = '`'.charCodeAt(0);
const _DOT = '.'.charCodeAt(0);
let customTokenValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CustomToken;
const Ellipsis = customTokenValue++;
class LESSScanner extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scanner"] {
    scanNext(offset) {
        // LESS: escaped JavaScript code `const a = "dddd"`
        const tokenType = this.escapedJavaScript();
        if (tokenType !== null) {
            return this.finishToken(offset, tokenType);
        }
        if (this.stream.advanceIfChars([
            _DOT,
            _DOT,
            _DOT
        ])) {
            return this.finishToken(offset, Ellipsis);
        }
        return super.scanNext(offset);
    }
    comment() {
        if (super.comment()) {
            return true;
        }
        if (!this.inURL && this.stream.advanceIfChars([
            _FSL,
            _FSL
        ])) {
            this.stream.advanceWhileChar((ch)=>{
                switch(ch){
                    case _NWL:
                    case _CAR:
                    case _LFD:
                        return false;
                    default:
                        return true;
                }
            });
            return true;
        } else {
            return false;
        }
    }
    escapedJavaScript() {
        const ch = this.stream.peekChar();
        if (ch === _TIC) {
            this.stream.advance(1);
            this.stream.advanceWhileChar((ch)=>{
                return ch !== _TIC;
            });
            return this.stream.advanceIfChar(_TIC) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EscapedJavaScript : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BadEscapedJavaScript;
        }
        return null;
    }
}
;
}),
"[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/lessParser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LESSParser",
    ()=>LESSParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/lessScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssScanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssNodes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/monaco-editor/esm/external/vscode-css-languageservice/lib/esm/parser/cssErrors.js [app-client] (ecmascript)");
;
;
;
;
;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /// <summary>
/// A parser for LESS
/// http://lesscss.org/
/// </summary>
class LESSParser extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"] {
    constructor(){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LESSScanner"]());
    }
    _parseStylesheetStatement(isNested = false) {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseVariableDeclaration() || this._parsePlugin() || super._parseStylesheetAtStatement(isNested);
        }
        return this._tryParseMixinDeclaration() || this._tryParseMixinReference() || this._parseFunction() || this._parseRuleset(true);
    }
    _parseImport() {
        if (!this.peekKeyword('@import') && !this.peekKeyword('@import-once')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Import"]);
        this.consumeToken();
        // less 1.4.1: @import (css) "lib"
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
                ]);
            }
            do {
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)) {
                    break;
                }
            }while (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident))
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
                ]);
            }
        }
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].URIOrStringExpected, [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon
            ]);
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            node.setMedialist(this._parseMediaQueryList());
        }
        return this._completeParseImport(node);
    }
    _parsePlugin() {
        if (!this.peekKeyword('@plugin')) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Plugin);
        this.consumeToken(); // @import
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].StringLiteralExpected);
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SemiColonExpected);
        }
        return this.finish(node);
    }
    _parseMediaQuery() {
        const node = super._parseMediaQuery();
        if (!node) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaQuery"]);
            if (node.addChild(this._parseVariable())) {
                return this.finish(node);
            }
            return null;
        }
        return node;
    }
    _parseMediaDeclaration(isNested = false) {
        return this._tryParseRuleset(isNested) || this._tryToParseDeclaration() || this._tryParseMixinDeclaration() || this._tryParseMixinReference() || this._parseDetachedRuleSetMixin() || this._parseStylesheetStatement(isNested);
    }
    _parseMediaFeatureName() {
        return this._parseIdent() || this._parseVariable();
    }
    _parseVariableDeclaration(panic = []) {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VariableDeclaration"]);
        const mark = this.mark();
        if (!node.setVariable(this._parseVariable(true))) {
            return null;
        }
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            if (this.prevToken) {
                node.colonPosition = this.prevToken.offset;
            }
            if (node.setValue(this._parseDetachedRuleSet())) {
                node.needsSemicolon = false;
            } else if (!node.setValue(this._parseExpr())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].VariableValueExpected, [], panic);
            }
            node.addChild(this._parsePrio());
        } else {
            this.restoreAtMark(mark);
            return null; // at keyword, but no ':', not a variable declaration but some at keyword
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    }
    _parseDetachedRuleSet() {
        let mark = this.mark();
        // "Anonymous mixin" used in each() and possibly a generic type in the future
        if (this.peekDelim('#') || this.peekDelim('.')) {
            this.consumeToken();
            if (!this.hasWhitespace() && this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
                let node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinDeclaration"]);
                if (node.getParameters().addChild(this._parseMixinParameter())) {
                    while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)){
                        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                            break;
                        }
                        if (!node.getParameters().addChild(this._parseMixinParameter())) {
                            this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [], [
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                            ]);
                        }
                    }
                }
                if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    this.restoreAtMark(mark);
                    return null;
                }
            } else {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            return null;
        }
        const content = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BodyDeclaration"]);
        this._parseBody(content, this._parseDetachedRuleSetBody.bind(this));
        return this.finish(content);
    }
    _parseDetachedRuleSetBody() {
        return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
    }
    _addLookupChildren(node) {
        if (!node.addChild(this._parseLookupValue())) {
            return false;
        }
        let expectsValue = false;
        while(true){
            if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
                expectsValue = true;
            }
            if (!node.addChild(this._parseLookupValue())) {
                break;
            }
            expectsValue = false;
        }
        return !expectsValue;
    }
    _parseLookupValue() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
        const mark = this.mark();
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
            this.restoreAtMark(mark);
            return null;
        }
        if ((node.addChild(this._parseVariable(false, true)) || node.addChild(this._parsePropertyIdentifier())) && this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketR)) {
            return node;
        }
        this.restoreAtMark(mark);
        return null;
    }
    _parseVariable(declaration = false, insideLookup = false) {
        const isPropertyReference = !declaration && this.peekDelim('$');
        if (!this.peekDelim('@') && !isPropertyReference && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Variable"]);
        const mark = this.mark();
        while(this.acceptDelim('@') || !declaration && this.acceptDelim('$')){
            if (this.hasWhitespace()) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword) && !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident)) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!insideLookup && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
            if (!this._addLookupChildren(node)) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        return node;
    }
    _parseTermExpression() {
        return this._parseVariable() || this._parseEscaped() || super._parseTermExpression() || // preference for colors before mixin references
        this._tryParseMixinReference(false);
    }
    _parseEscaped() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EscapedJavaScript) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BadEscapedJavaScript)) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].EscapedValue);
            this.consumeToken();
            return this.finish(node);
        }
        if (this.peekDelim('~')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].EscapedValue);
            this.consumeToken();
            if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].String) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EscapedJavaScript)) {
                return this.finish(node);
            } else {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].TermExpected);
            }
        }
        return null;
    }
    _parseOperator() {
        const node = this._parseGuardOperator();
        if (node) {
            return node;
        } else {
            return super._parseOperator();
        }
    }
    _parseGuardOperator() {
        if (this.peekDelim('>')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Operator);
            this.consumeToken();
            this.acceptDelim('=');
            return node;
        } else if (this.peekDelim('=')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Operator);
            this.consumeToken();
            this.acceptDelim('<');
            return node;
        } else if (this.peekDelim('<')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Operator);
            this.consumeToken();
            this.acceptDelim('=');
            return node;
        }
        return null;
    }
    _parseRuleSetDeclaration() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return this._parseKeyframe() || this._parseMedia(true) || this._parseImport() || this._parseSupports(true) // @supports
             || this._parseLayer() // @layer
             || this._parsePropertyAtRule() // @property
             || this._parseContainer(true) // @container
             || this._parseDetachedRuleSetMixin() // less detached ruleset mixin
             || this._parseVariableDeclaration() // Variable declarations
             || this._parseRuleSetDeclarationAtStatement();
        }
        return this._tryParseMixinDeclaration() || this._tryParseRuleset(true) // nested ruleset
         || this._tryParseMixinReference() // less mixin reference
         || this._parseFunction() || this._parseExtend() // less extend declaration
         || this._parseDeclaration(); // try css ruleset declaration as the last option
    }
    _parseKeyframeIdent() {
        return this._parseIdent([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Keyframe
        ]) || this._parseVariable();
    }
    _parseKeyframeSelector() {
        return this._parseDetachedRuleSetMixin() // less detached ruleset mixin
         || super._parseKeyframeSelector();
    }
    // public _parseSimpleSelectorBody(): nodes.Node | null {
    // 	return this._parseNestingSelector() || super._parseSimpleSelectorBody();
    // }
    _parseSelector(isNested) {
        // CSS Guards
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selector"]);
        let hasContent = false;
        if (isNested) {
            // nested selectors can start with a combinator
            hasContent = node.addChild(this._parseCombinator());
        }
        while(node.addChild(this._parseSimpleSelector())){
            hasContent = true;
            const mark = this.mark();
            if (node.addChild(this._parseGuard()) && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
                break;
            }
            this.restoreAtMark(mark);
            node.addChild(this._parseCombinator()); // optional
        }
        return hasContent ? this.finish(node) : null;
    }
    _parseNestingSelector() {
        if (this.peekDelim('&')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorCombinator);
            this.consumeToken();
            while(!this.hasWhitespace() && (this.acceptDelim('-') || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Num) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Dimension) || node.addChild(this._parseIdent()) || this.acceptDelim('&'))){
            //  support &-foo
            }
            return this.finish(node);
        }
        return null;
    }
    _parseSelectorIdent() {
        if (!this.peekInterpolatedIdent()) {
            return null;
        }
        const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].SelectorInterpolation);
        const hasContent = this._acceptInterpolatedIdent(node);
        return hasContent ? this.finish(node) : null;
    }
    _parsePropertyIdentifier(inLookup = false) {
        const propertyRegex = /^[\w-]+/;
        if (!this.peekInterpolatedIdent() && !this.peekRegExp(this.token.type, propertyRegex)) {
            return null;
        }
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
        node.isCustomProperty = this.acceptDelim('-') && this.acceptDelim('-');
        let childAdded = false;
        if (!inLookup) {
            if (node.isCustomProperty) {
                childAdded = this._acceptInterpolatedIdent(node);
            } else {
                childAdded = this._acceptInterpolatedIdent(node, propertyRegex);
            }
        } else {
            if (node.isCustomProperty) {
                childAdded = node.addChild(this._parseIdent());
            } else {
                childAdded = node.addChild(this._parseRegexp(propertyRegex));
            }
        }
        if (!childAdded) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!inLookup && !this.hasWhitespace()) {
            this.acceptDelim('+');
            if (!this.hasWhitespace()) {
                this.acceptIdent('_');
            }
        }
        return this.finish(node);
    }
    peekInterpolatedIdent() {
        return this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident) || this.peekDelim('@') || this.peekDelim('$') || this.peekDelim('-');
    }
    _acceptInterpolatedIdent(node, identRegex) {
        let hasContent = false;
        const indentInterpolation = ()=>{
            const pos = this.mark();
            if (this.acceptDelim('-')) {
                if (!this.hasWhitespace()) {
                    this.acceptDelim('-');
                }
                if (this.hasWhitespace()) {
                    this.restoreAtMark(pos);
                    return null;
                }
            }
            return this._parseInterpolation();
        };
        const accept = identRegex ? ()=>this.acceptRegexp(identRegex) : ()=>this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Ident);
        while(accept() || node.addChild(this._parseInterpolation() || this.try(indentInterpolation))){
            hasContent = true;
            if (this.hasWhitespace()) {
                break;
            }
        }
        return hasContent;
    }
    _parseInterpolation() {
        // @{name} Variable or
        // ${name} Property
        const mark = this.mark();
        if (this.peekDelim('@') || this.peekDelim('$')) {
            const node = this.createNode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].Interpolation);
            this.consumeToken();
            if (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
                this.restoreAtMark(mark);
                return null;
            }
            if (!node.addChild(this._parseIdent())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected);
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightCurlyExpected);
            }
            return this.finish(node);
        }
        return null;
    }
    _tryParseMixinDeclaration() {
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinDeclaration"]);
        if (!node.setIdentifier(this._parseMixinDeclarationIdentifier()) || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            this.restoreAtMark(mark);
            return null;
        }
        if (node.getParameters().addChild(this._parseMixinParameter())) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)){
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseMixinParameter())) {
                    this.markError(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].IdentifierExpected, [], [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                    ]);
                }
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            this.restoreAtMark(mark);
            return null;
        }
        node.setGuard(this._parseGuard());
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyL)) {
            this.restoreAtMark(mark);
            return null;
        }
        return this._parseBody(node, this._parseMixInBodyDeclaration.bind(this));
    }
    _parseMixInBodyDeclaration() {
        return this._parseFontFace() || this._parseRuleSetDeclaration();
    }
    _parseMixinDeclarationIdentifier() {
        let identifier;
        if (this.peekDelim('#') || this.peekDelim('.')) {
            identifier = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
            this.consumeToken(); // # or .
            if (this.hasWhitespace() || !identifier.addChild(this._parseIdent())) {
                return null;
            }
        } else if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Hash)) {
            identifier = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
            this.consumeToken(); // TokenType.Hash
        } else {
            return null;
        }
        identifier.referenceTypes = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin
        ];
        return this.finish(identifier);
    }
    _parsePseudo() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
            return null;
        }
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendsReference"]);
        this.consumeToken(); // :
        if (this.acceptIdent('extend')) {
            return this._completeExtends(node);
        }
        this.restoreAtMark(mark);
        return super._parsePseudo();
    }
    _parseExtend() {
        if (!this.peekDelim('&')) {
            return null;
        }
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendsReference"]);
        this.consumeToken(); // &
        if (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon) || !this.acceptIdent('extend')) {
            this.restoreAtMark(mark);
            return null;
        }
        return this._completeExtends(node);
    }
    _completeExtends(node) {
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected);
        }
        const selectors = node.getSelectors();
        if (!selectors.addChild(this._parseSelector(true))) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SelectorExpected);
        }
        while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!selectors.addChild(this._parseSelector(true))) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].SelectorExpected);
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseDetachedRuleSetMixin() {
        if (!this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AtKeyword)) {
            return null;
        }
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinReference"]);
        if (node.addChild(this._parseVariable(true)) && (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL))) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _tryParseMixinReference(atRoot = true) {
        const mark = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MixinReference"]);
        let identifier = this._parseMixinDeclarationIdentifier();
        while(identifier){
            this.acceptDelim('>');
            const nextId = this._parseMixinDeclarationIdentifier();
            if (nextId) {
                node.getNamespaces().addChild(identifier);
                identifier = nextId;
            } else {
                break;
            }
        }
        if (!node.setIdentifier(identifier)) {
            this.restoreAtMark(mark);
            return null;
        }
        let hasArguments = false;
        if (this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            hasArguments = true;
            if (node.getArguments().addChild(this._parseMixinArgument())) {
                while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)){
                    if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseMixinArgument())) {
                        return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
                    }
                }
            }
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
            }
            identifier.referenceTypes = [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin
            ];
        } else {
            identifier.referenceTypes = [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Mixin,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Rule
            ];
        }
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BracketL)) {
            if (!atRoot) {
                this._addLookupChildren(node);
            }
        } else {
            node.addChild(this._parsePrio());
        }
        if (!hasArguments && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CurlyR) && !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].EOF)) {
            this.restoreAtMark(mark);
            return null;
        }
        return this.finish(node);
    }
    _parseMixinArgument() {
        // [variableName ':'] expression | variableName '...'
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionArgument"]);
        const pos = this.mark();
        const argument = this._parseVariable();
        if (argument) {
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon)) {
                this.restoreAtMark(pos);
            } else {
                node.setIdentifier(argument);
            }
        }
        if (node.setValue(this._parseDetachedRuleSet() || this._parseExpr(true))) {
            return this.finish(node);
        }
        this.restoreAtMark(pos);
        return null;
    }
    _parseMixinParameter() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionParameter"]);
        // special rest variable: @rest...
        if (this.peekKeyword('@rest')) {
            const restNode = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipsis"])) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].DotExpected, [], [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR
                ]);
            }
            node.setIdentifier(this.finish(restNode));
            return this.finish(node);
        }
        // special const args: ...
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$lessScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipsis"])) {
            const varargsNode = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            this.consumeToken();
            node.setIdentifier(this.finish(varargsNode));
            return this.finish(node);
        }
        let hasContent = false;
        // default variable declaration: @param: 12 or @name
        if (node.setIdentifier(this._parseVariable())) {
            this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Colon);
            hasContent = true;
        }
        if (!node.setDefaultValue(this._parseDetachedRuleSet() || this._parseExpr(true)) && !hasContent) {
            return null;
        }
        return this.finish(node);
    }
    _parseGuard() {
        if (!this.peekIdent('when')) {
            return null;
        }
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LessGuard"]);
        this.consumeToken(); // when
        if (!node.getConditions().addChild(this._parseGuardCondition())) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ConditionExpected);
        }
        while(this.acceptIdent('and') || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma)){
            if (!node.getConditions().addChild(this._parseGuardCondition())) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ConditionExpected);
            }
        }
        return this.finish(node);
    }
    _parseGuardCondition() {
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuardCondition"]);
        node.isNegated = this.acceptIdent('not');
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            if (node.isNegated) {
                return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].LeftParenthesisExpected);
            }
            return null;
        }
        if (!node.addChild(this._parseExpr())) ;
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseFunction() {
        const pos = this.mark();
        const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Function"]);
        if (!node.setIdentifier(this._parseFunctionIdentifier())) {
            return null;
        }
        if (this.hasWhitespace() || !this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        if (node.getArguments().addChild(this._parseMixinArgument())) {
            while(this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].Comma) || this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].SemiColon)){
                if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
                    break;
                }
                if (!node.getArguments().addChild(this._parseMixinArgument())) {
                    return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].ExpressionExpected);
                }
            }
        }
        if (!this.accept(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            return this.finish(node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseError"].RightParenthesisExpected);
        }
        return this.finish(node);
    }
    _parseFunctionIdentifier() {
        if (this.peekDelim('%')) {
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identifier"]);
            node.referenceTypes = [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceType"].Function
            ];
            this.consumeToken();
            return this.finish(node);
        }
        return super._parseFunctionIdentifier();
    }
    _parseURLArgument() {
        const pos = this.mark();
        const node = super._parseURLArgument();
        if (!node || !this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssScanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ParenthesisR)) {
            this.restoreAtMark(pos);
            const node = this.create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$monaco$2d$editor$2f$esm$2f$external$2f$vscode$2d$css$2d$languageservice$2f$lib$2f$esm$2f$parser$2f$cssNodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"]);
            node.addChild(this._parseBinaryExpr());
            return this.finish(node);
        }
        return node;
    }
}
;
}),
]);

//# sourceMappingURL=a9bf9_monaco-editor_esm_external_vscode-css-languageservice_lib_esm_parser_62ea4362._.js.map