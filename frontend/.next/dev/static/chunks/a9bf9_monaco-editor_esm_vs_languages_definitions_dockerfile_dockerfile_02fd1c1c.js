(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/monaco-editor/esm/vs/languages/definitions/dockerfile/dockerfile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "conf",
    ()=>conf,
    "language",
    ()=>language
]);
const conf = {
    brackets: [
        [
            "{",
            "}"
        ],
        [
            "[",
            "]"
        ],
        [
            "(",
            ")"
        ]
    ],
    autoClosingPairs: [
        {
            open: "{",
            close: "}"
        },
        {
            open: "[",
            close: "]"
        },
        {
            open: "(",
            close: ")"
        },
        {
            open: '"',
            close: '"'
        },
        {
            open: "'",
            close: "'"
        }
    ],
    surroundingPairs: [
        {
            open: "{",
            close: "}"
        },
        {
            open: "[",
            close: "]"
        },
        {
            open: "(",
            close: ")"
        },
        {
            open: '"',
            close: '"'
        },
        {
            open: "'",
            close: "'"
        }
    ]
};
const language = {
    defaultToken: "",
    tokenPostfix: ".dockerfile",
    variable: /\${?[\w]+}?/,
    tokenizer: {
        root: [
            {
                include: "@whitespace"
            },
            {
                include: "@comment"
            },
            [
                /(ONBUILD)(\s+)/,
                [
                    "keyword",
                    ""
                ]
            ],
            [
                /(ENV)(\s+)([\w]+)/,
                [
                    "keyword",
                    "",
                    {
                        token: "variable",
                        next: "@arguments"
                    }
                ]
            ],
            [
                /(FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|ARG|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|STOPSIGNAL|SHELL|HEALTHCHECK|ENTRYPOINT)/,
                {
                    token: "keyword",
                    next: "@arguments"
                }
            ]
        ],
        arguments: [
            {
                include: "@whitespace"
            },
            {
                include: "@strings"
            },
            [
                /(@variable)/,
                {
                    cases: {
                        "@eos": {
                            token: "variable",
                            next: "@popall"
                        },
                        "@default": "variable"
                    }
                }
            ],
            [
                /\\/,
                {
                    cases: {
                        "@eos": "",
                        "@default": ""
                    }
                }
            ],
            [
                /./,
                {
                    cases: {
                        "@eos": {
                            token: "",
                            next: "@popall"
                        },
                        "@default": ""
                    }
                }
            ]
        ],
        // Deal with white space, including comments
        whitespace: [
            [
                /\s+/,
                {
                    cases: {
                        "@eos": {
                            token: "",
                            next: "@popall"
                        },
                        "@default": ""
                    }
                }
            ]
        ],
        comment: [
            [
                /(^#.*$)/,
                "comment",
                "@popall"
            ]
        ],
        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [
            [
                /\\'$/,
                "",
                "@popall"
            ],
            // \' leaves @arguments at eol
            [
                /\\'/,
                ""
            ],
            // \' is not a string
            [
                /'$/,
                "string",
                "@popall"
            ],
            [
                /'/,
                "string",
                "@stringBody"
            ],
            [
                /"$/,
                "string",
                "@popall"
            ],
            [
                /"/,
                "string",
                "@dblStringBody"
            ]
        ],
        stringBody: [
            [
                /[^\\\$']/,
                {
                    cases: {
                        "@eos": {
                            token: "string",
                            next: "@popall"
                        },
                        "@default": "string"
                    }
                }
            ],
            [
                /\\./,
                "string.escape"
            ],
            [
                /'$/,
                "string",
                "@popall"
            ],
            [
                /'/,
                "string",
                "@pop"
            ],
            [
                /(@variable)/,
                "variable"
            ],
            [
                /\\$/,
                "string"
            ],
            [
                /$/,
                "string",
                "@popall"
            ]
        ],
        dblStringBody: [
            [
                /[^\\\$"]/,
                {
                    cases: {
                        "@eos": {
                            token: "string",
                            next: "@popall"
                        },
                        "@default": "string"
                    }
                }
            ],
            [
                /\\./,
                "string.escape"
            ],
            [
                /"$/,
                "string",
                "@popall"
            ],
            [
                /"/,
                "string",
                "@pop"
            ],
            [
                /(@variable)/,
                "variable"
            ],
            [
                /\\$/,
                "string"
            ],
            [
                /$/,
                "string",
                "@popall"
            ]
        ]
    }
};
;
}),
]);

//# sourceMappingURL=a9bf9_monaco-editor_esm_vs_languages_definitions_dockerfile_dockerfile_02fd1c1c.js.map