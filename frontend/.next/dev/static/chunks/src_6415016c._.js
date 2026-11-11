(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/use-toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast,
    "ToastAction",
    ()=>ToastAction,
    "ToastClose",
    ()=>ToastClose,
    "ToastDescription",
    ()=>ToastDescription,
    "ToastProvider",
    ()=>ToastProvider,
    "ToastTitle",
    ()=>ToastTitle,
    "ToastViewport",
    ()=>ToastViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold [&+div]:text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "ToastViewport$React.forwardRef");
__turbopack_context__.k.register(_c1, "ToastViewport");
__turbopack_context__.k.register(_c2, "Toast$React.forwardRef");
__turbopack_context__.k.register(_c3, "Toast");
__turbopack_context__.k.register(_c4, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToastAction");
__turbopack_context__.k.register(_c6, "ToastClose$React.forwardRef");
__turbopack_context__.k.register(_c7, "ToastClose");
__turbopack_context__.k.register(_c8, "ToastTitle$React.forwardRef");
__turbopack_context__.k.register(_c9, "ToastTitle");
__turbopack_context__.k.register(_c10, "ToastDescription$React.forwardRef");
__turbopack_context__.k.register(_c11, "ToastDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/toaster.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster() {
    _s();
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/i18n.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLang",
    ()=>useLang
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/* ============================================================
   NORA — Internationalisation FR / EN
   Provider léger (pas de dépendance) : dictionnaire à clés plates,
   persistance localStorage, bascule instantanée sans rechargement.
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const fr = {
    /* ---------- Nav landing ---------- */ "nav.product": "Fonctionnalités",
    "nav.community": "Communauté",
    "nav.roadmap": "Feuille de route",
    "nav.enter": "Entrer",
    "nav.openApp": "Ouvrir l'app",
    "nav.cmdk": "pour naviguer",
    "nav.menu": "Menu",
    /* ---------- Hero ---------- */ "hero.badge": "La plateforme des devs africains",
    "hero.t1": "Ici, les devs africains",
    "hero.t2": "codent ensemble",
    "hero.t3": "et se font repérer.",
    "hero.sub": "Un profil-portfolio vivant, de vrais projets, une messagerie temps réel validée des deux côtés, des challenges et des opportunités. Toute ta vie de dev, au même endroit.",
    "hero.live": "En direct de la plateforme",
    "hero.stat.devs": "devs inscrits",
    "hero.stat.projects": "projets publiés",
    "hero.stat.posts": "posts sur le fil",
    "hero.stat.countries": "pays représentés",
    "hero.stat.online": "en ligne maintenant",
    "hero.cta1": "Créer mon compte",
    "hero.cta2": "Explorer la plateforme",
    "hero.fx": "Effet de fond",
    "hero.fxOn": "activé",
    "hero.fxOff": "coupé",
    /* ---------- Terminal ---------- */ "term.title": "nora — session démo",
    "term.line1": "du quotidien dev, du concept au déploiement",
    /* ---------- Ticker (chiffres réels + repli) ---------- */ "ticker.devs": "devs inscrits",
    "ticker.projects": "projets publiés",
    "ticker.posts": "posts sur le fil",
    "ticker.countries": "pays représentés",
    "ticker.channels": "salons publics",
    "ticker.1": "communautés locales",
    "ticker.2": "salons temps réel",
    "ticker.3": "challenges de code",
    "ticker.4": "missions Mobile Money",
    "ticker.5": "profil-portfolio vivant",
    "ticker.6": "hackathons en un clic",
    "ticker.7": "agents de code IA",
    "ticker.8": "réputation vérifiable",
    /* ---------- Afrique ---------- */ "africa.kicker": "01 — Le terrain",
    "africa.title": "Une communauté, un continent.",
    "africa.sub": "Des meetups par ville, des salons par stack, un fil qui parle de votre stack. Le lien online commence là où vous êtes.",
    "africa.hub": "hub actif",
    "africa.cities": "Villes actives cette semaine",
    "africa.note": "Bêta : les communautés ouvrent ville par ville.",
    "africa.mapAlt": "Carte d'Afrique composée des drapeaux des 54 pays",
    "africa.mapCaption": "54 pays · un réseau de devs",
    "africa.memberWord": "membres actifs",
    "africa.countriesWord": "pays représentés",
    "africa.photoTitle": "Les communautés locales, en vrai.",
    /* ---------- Bento ---------- */ "bento.kicker": "02 — Le produit",
    "bento.title": "Tout le quotidien dev, dans une seule grille.",
    "bento.sub": "Pas dix outils. Un espace qui suit le code de l'idée au déploiement.",
    "activity.kicker": "01bis — En direct",
    "activity.title": "Le dernier projet, le dernier post.",
    "activity.project.badge": "dernier projet",
    "activity.project.cta": "Tous les projets",
    "activity.post.badge": "dernier post du fil",
    "activity.post.cta": "Ouvrir le fil",
    "activity.empty": "Les premières publications arrivent.",
    "activity.star": "Star",
    "activity.strip": "Projets en direct",
    "bento.ai.t": "NORA AI",
    "bento.ai.d": "Un agent qui propose du code corrigé, avec coloration syntaxique, copie en un clic et suggestions prêtes à l'emploi.",
    "bento.profile.t": "Profil-portfolio vivant",
    "bento.profile.d": "Compétences, projets, réputation vérifiable. Ce que recruteurs et pairs voient en premier.",
    "bento.editor.t": "Éditeur + agents IA",
    "bento.editor.d": "Construire, tester, itérer depuis le navigateur. L'agent propose un diff, vous validez.",
    "bento.salons.t": "Salons temps réel",
    "bento.salons.d": "Des salons thématiques et privés, à la manière de Discord. Le code y circule vite.",
    "bento.hackathon.t": "Hackathon mode",
    "bento.hackathon.d": "Équipe formée à la volée : salon, dépôt partagé et environnement générés en un clic.",
    "bento.challenges.t": "Challenges & classement",
    "bento.challenges.d": "Défis entre pairs, points, séries. La progression se voit.",
    "bento.missions.t": "Missions rémunérées",
    "bento.missions.d": "Petits contrats payés en Mobile Money. Une vraie raison de revenir.",
    "bento.cities.t": "Communautés locales",
    "bento.cities.d": "Groupes par pays et par ville pour organiser les meetups.",
    "bento.reputation.t": "Réputation vérifiable",
    "bento.reputation.d": "Score basé sur projets réels, challenges réussis et contributions — utile aux recruteurs.",
    "bento.explore": "Explorer",
    /* ---------- Diff ---------- */ "diff.kicker": "03 — L'assistance IA",
    "diff.title": "L'agent propose. Vous validez.",
    "diff.sub": "Chaque correction passe par un diff lisible : lignes retirées en orange, ajoutées en vert.",
    "diff.before": "avant",
    "diff.after": "après",
    "diff.removed": "retirées",
    "diff.added": "ajoutées",
    "diff.apply": "Appliquer le diff",
    "diff.applied": "Diff appliqué",
    /* ---------- Parcours ---------- */ "roadmap.kicker": "04 — Le parcours",
    "roadmap.title": "Ce qu'on construit, commit par commit.",
    "roadmap.sub": "De la bêta au continent : les prochaines étapes du produit.",
    "roadmap.now": "en cours",
    /* ---------- CTA final ---------- */ "cta.title": "Votre profil mérite mieux qu'un CV en PDF.",
    "cta.sub": "Rejoignez la bêta, publiez votre premier projet, trouvez votre prochaine équipe.",
    "cta.b1": "Créer mon compte",
    "cta.b2": "Se connecter",
    /* ---------- Footer ---------- */ "footer.tag": "Pensée par des devs africains, pour les devs africains.",
    "footer.product": "Produit",
    "footer.community": "Communauté",
    "footer.stack": "Stack",
    "footer.p1": "Profil-portfolio",
    "footer.p2": "Salons temps réel",
    "footer.p3": "Éditeur + IA",
    "footer.p4": "Missions",
    "footer.c1": "Communautés locales",
    "footer.c2": "Mentorat",
    "footer.c3": "Hackathons",
    "footer.c4": "Newsletter",
    "footer.s1": "React + TypeScript",
    "footer.s2": "Tailwind CSS",
    "footer.s3": "Backend Go",
    "footer.s4": "REST + OpenAPI",
    "footer.rights": "Réalisée par l'équipe dev42.",
    "footer.cmdk": "Astuce : Cmd/Ctrl + K pour naviguer vite.",
    /* ---------- Auth ---------- */ "auth.login.kicker": "Retour au code",
    "auth.login.title": "Connexion",
    "auth.login.sub": "Pas de compte ?",
    "auth.register.kicker": "Rejoindre NORA",
    "auth.register.title": "Inscription",
    "auth.register.sub": "Déjà membre ?",
    "auth.email": "Email ou pseudo",
    "auth.password": "Mot de passe",
    "auth.name": "Nom complet",
    "auth.username": "Pseudo",
    "auth.city": "Ville",
    "auth.submitLogin": "Se connecter",
    "auth.submitRegister": "Créer mon compte",
    "auth.requiredToast": "Connexion requise pour accéder à la plateforme.",
    "auth.perk1.t": "Votre portfolio, vivant",
    "auth.perk1.d": "Un profil qui montre le code, pas seulement des mots.",
    "auth.perk2.t": "Des équipes à la volée",
    "auth.perk2.d": "Salon, dépôt et environnement générés en un clic.",
    "auth.perk3.t": "Visibilité locale et continentale",
    "auth.perk3.d": "Réputation vérifiable, classements, missions payées.",
    "auth.back": "Retour",
    /* ---------- App shell ---------- */ "app.dashboard": "Tableau de bord",
    "app.dashboard.short": "Accueil",
    "app.studio": "Studio",
    "app.studio.short": "Studio",
    "app.feed": "Fil d'actualité",
    "app.feed.short": "Fil",
    "app.projects": "Projets",
    "app.devs": "Développeurs",
    "app.salons": "Messagerie",
    "app.challenges": "Challenges",
    "app.missions": "Missions",
    "app.profile": "Mon profil",
    "app.profile.short": "Profil",
    "app.search": "Rechercher…",
    "app.theme.dark": "Thème sombre",
    "app.theme.light": "Thème clair",
    "app.lang": "Langue",
    "app.logout": "Déconnexion",
    "app.home": "Accueil",
    "app.group.workspace": "Espace",
    "app.group.create": "Créer",
    "app.group.discover": "Découvrir",
    "app.group.grow": "Progresser",
    /* ---------- Topbar : cloche, compte, paramètres ---------- */ "top.notif": "Notifications",
    "top.notif.title": "Notifications",
    "top.notif.live": "en direct",
    "top.notif.empty": "Rien de neuf — tes notifications apparaîtront ici.",
    "top.notif.contact": "veut discuter avec toi",
    "top.notif.like": "a aimé ton post",
    "top.notif.star": "a staré ton projet",
    "top.notif.message": "t'a envoyé un message",
    "top.account": "Mon compte",
    "top.settings": "Paramètres",
    /* ---------- Panneau paramètres ---------- */ "settings.title": "Paramètres",
    "settings.sub": "Apparence, langue et intégrations — appliquées immédiatement.",
    "settings.appearance": "Apparence",
    "settings.language": "Langue",
    "settings.github": "GitHub",
    "settings.github.d": "Charge tes dépôts publics réels et importe-les comme projets NORA en un clic.",
    "settings.github.load": "Charger",
    "settings.github.import": "Importer",
    "settings.github.imported": "Importé",
    /* ---------- Studio (IDE) ---------- */ "studio.kicker": "Studio de code",
    "studio.title": "NORA Studio",
    "studio.explorer": "Explorateur",
    "studio.newFile": "Nouveau fichier",
    "studio.noFiles": "Aucun fichier — crée le premier.",
    "studio.filesCount": "fichiers",
    "studio.noOpenFile": "Aucun fichier ouvert",
    "studio.pick": "Sélectionne un fichier dans l'explorateur",
    "studio.pickHint": "Tes fichiers sont persistés côté backend — ils te suivent entre deux sessions.",
    "studio.console": "Console",
    "studio.clear": "Effacer",
    "studio.consoleHint": "▸ Exécute un fichier JavaScript pour voir sa sortie ici.",
    "studio.run": "Exécuter",
    "studio.runJsOnly": "L'exécution navigateur est disponible pour les fichiers JavaScript (.js).",
    "studio.running": "Exécution de",
    "studio.done": "Terminé",
    "studio.timeout": "⏱ Dépassement — exécution stoppée (5 s max).",
    "studio.save": "Enregistrer",
    "studio.saved": "Fichier enregistré ✓",
    "studio.saveError": "Enregistrement impossible",
    "studio.fileCreated": "Fichier créé ✓",
    "studio.fileError": "Création impossible",
    "studio.fileDeleted": "Fichier supprimé",
    "studio.deleteFile": "Supprimer (2 clics)",
    "studio.ai.title": "NORA IA",
    "studio.ai.hint": "Demande un algorithme, une correction, un composant — puis insère le code dans ton fichier.",
    "studio.ai.thinking": "réfléchit…",
    "studio.ai.insert": "Insérer",
    "studio.ai.placeholder": "Ex. : un tri rapide en JS…",
    "studio.aiError": "NORA est momentanément indisponible.",
    "studio.inserted": "Code inséré dans le fichier ✓",
    "studio.sandboxNote": "exécution isolée, 5 s max",
    /* ---------- Dashboard v2 ---------- */ "dash.greeting": "Salut",
    "dash.today": "Voici ce qui bouge aujourd'hui.",
    "dash.hero.hello": "Bonjour",
    "dash.hero.tag": "Connecte. Apprends. Construis.",
    "dash.hero.sub": "Rejoins une communauté dynamique de développeurs africains — projets, salons, challenges et missions au même endroit.",
    "dash.hero.cta": "Découvrir NORA",
    "dash.featured": "profils en vedette",
    "dash.stats.posts": "Posts publiés",
    "dash.stats.channels": "Salons publics",
    "dash.profile.t": "Ton profil",
    "dash.profile.d": "Complète ton profil pour gagner plus de visibilité auprès des recruteurs et des pairs !",
    "dash.profile.cta": "Compléter",
    "dash.stats.devs": "Développeurs",
    "dash.stats.projects": "Projets publiés",
    "dash.stats.challenges": "Challenges résolus",
    "dash.stats.paid": "FCFA versés aux devs",
    "dash.trend.t": "Projets tendance",
    "dash.team.t": "Rejoins une équipe",
    "dash.seeAll": "Voir tout",
    "dash.activity.t": "Ton activité récente",
    "dash.editor.t": "NORA Studio",
    "dash.editor.d": "Code directement dans ton navigateur : fichiers persistés, exécution en bac à sable et agent IA à côté.",
    "dash.editor.cta": "Ouvrir le Studio",
    "dash.build.t": "Ensemble, faisons rayonner les talents africains.",
    "dash.build.tag": "#BuildAfrica",
    "dash.hackathon.t": "Hackathon à venir",
    "dash.hackathon.cta": "Former une équipe",
    /* ---------- Feed ---------- */ "feed.compose": "Partager un projet, une question, un win…",
    "feed.post": "Publier",
    "feed.all": "Tout",
    "feed.projects": "Projets",
    "feed.code": "Code",
    "feed.articles": "Articles",
    "feed.follow": "Suivre",
    "feed.following": "Suivi",
    "feed.like": "J'aime",
    "feed.comment": "Commenter",
    "feed.comment.soon": "Commentaires — bientôt disponible",
    "feed.share": "Partager",
    "feed.viewProject": "Voir le projet",
    /* ---------- Projets ---------- */ "projects.title": "Projets publiés",
    "projects.sub": "Le vitrine du continent. Starez, fourchez, rejoignez.",
    "projects.all": "Tous",
    "projects.status.production": "En production",
    "projects.status.dev": "En développement",
    "projects.status.equipe": "En équipe",
    "projects.status.idee": "Idée",
    "projects.roles": "Rôles ouverts",
    "projects.join": "Rejoindre",
    "progress": "Progression",
    /* ---------- Devs ---------- */ "devs.title": "Développeurs",
    "devs.sub": "Des portfolios vivants, pas des CV statiques.",
    "devs.online": "en ligne",
    "devs.offline": "hors ligne",
    "devs.availability.ouverte": "Disponible",
    "devs.availability.hackathon": "Cherche hackathon",
    "devs.availability.mentorat": "Mentore",
    "devs.availability.missions": "Ouvert aux missions",
    "devs.availability.occupe": "Occupé",
    "devs.viewProfile": "Voir le profil",
    "devs.message": "Message",
    "devs.filter.all": "Tous les profils",
    /* ---------- Salons ---------- */ "salons.title": "Salons",
    "salons.sub": "Discussion temps réel, thématique ou privée.",
    "salons.online": "en ligne",
    "salons.typing": "écrit…",
    "salons.send": "Envoyer un message",
    "salons.workspace.t": "Mode hackathon",
    "salons.workspace.d": "Créez un espace de travail complet : salon, dépôt de code partagé, environnement dev.",
    "salons.workspace.cta": "Générer l'espace",
    "salons.workspace.created": "Espace généré en 0,8 s",
    "salons.members": "membres",
    "salons.unread": "non lus",
    /* ---------- Salons / Messagerie v2 ---------- */ "msg.title": "Messagerie",
    "msg.sub": "Discussions privées et canaux thématiques — en temps réel.",
    "msg.search": "Rechercher une discussion…",
    "msg.discussions": "Discussions",
    "msg.channels": "Canaux",
    "msg.empty": "Sélectionne une discussion pour commencer.",
    "msg.placeholder": "Écris un message…",
    "msg.sending": "Envoi en cours…",
    "msg.requestNeeded": "La discussion s'ouvre après validation de votre demande de contact.",
    "msg.send": "Envoyer",
    "msg.request.t": "Demande de contact",
    "msg.request.d": "veut discuter avec toi. Accepte pour ouvrir la conversation.",
    "msg.accept": "Accepter",
    "msg.decline": "Refuser",
    "msg.pending": "En attente",
    "msg.acceptedToast": "a accepté ta demande — la discussion est ouverte !",
    "msg.requestSentToast": "Demande envoyée — réponse dès que le dev accepte.",
    "msg.incomingToast": "te souhaite discuter — voir la messagerie.",
    "msg.nora.t": "NORA",
    "msg.nora.d": "Ton agent IA de code — dispo 24/7",
    "msg.nora.sug1": "Explique-moi le mode léger de NORA",
    "msg.nora.sug2": "Comment fetch l'API Go en 2G ?",
    "msg.nora.sug3": "Génère un composant carte projet",
    "msg.newChat": "Écris à un dev",
    "msg.typing": "écrit…",
    "msg.today": "Aujourd'hui",
    /* ---------- Challenges ---------- */ "chal.title": "Challenges",
    "chal.sub": "Des défis courts, des points réels, un classement honnête.",
    "chal.daily": "Quotidien",
    "chal.weekly": "Hebdo",
    "chal.participate": "Participer",
    "chal.endsIn": "Se termine",
    "chal.successRate": "réussite",
    "chal.participants": "participants",
    "chal.board": "Classement du mois",
    "chal.streak": "série",
    "chal.you": "vous",
    "chal.difficulty.Facile": "Facile",
    "chal.difficulty.Moyen": "Moyen",
    "chal.difficulty.Difficile": "Difficile",
    "chal.difficulty.Expert": "Expert",
    "chal.by": "par",
    /* ---------- Missions ---------- */ "missions.title": "Missions rémunérées",
    "missions.sub": "Petits contrats, paiement Mobile Money, zéro friction.",
    "missions.budget": "Budget",
    "missions.duration": "Durée",
    "missions.apply": "Postuler",
    "missions.applied": "Candidature envoyée",
    "missions.paidVia": "Payée via",
    "missions.urgency.Immédiat": "Immédiat",
    "missions.urgency.Cette semaine": "Cette semaine",
    "missions.urgency.Flexible": "Flexible",
    "missions.match": "correspondance",
    /* ---------- Profil ---------- */ "prof.overview": "Aperçu",
    "prof.projects": "Projets",
    "prof.articles": "Articles",
    "prof.badges": "Badges",
    "prof.loading": "Chargement du profil…",
    "prof.reputation": "Réputation",
    "prof.followers": "abonnés",
    "prof.follow": "Suivre",
    "prof.followingLabel": "Suivi",
    "prof.skills": "Compétences",
    "prof.languages": "Langues",
    "prof.joined": "Membre depuis",
    "prof.contributions": "contributions cette année",
    "prof.contributionsT": "Contributions",
    "prof.activity": "Activité",
    "prof.about": "À propos",
    "prof.mentor.t": "Ouvert au mentorat",
    "prof.mentor.d": "Partage son savoir via articles et tutoriels — et gagne en réputation.",
    "prof.challengesWon": "challenges gagnés",
    "prof.articlesCount": "articles publiés",
    "prof.contact": "Contacter",
    "prof.openChat": "Ouvrir la discussion",
    "prof.requestSent": "Demande envoyée…",
    "prof.availability": "Disponibilité",
    "prof.noProjects": "Aucun projet publié pour l'instant.",
    "prof.edit.cta": "Éditer mon profil",
    "prof.edit.title": "Éditer mon profil",
    "prof.edit.sub": "Ces informations sont visibles par la communauté et les recruteurs.",
    "prof.avatar.t": "Photo de profil",
    "prof.avatar.d": "PNG ou JPG, 4 Mo max. L'aperçu est immédiat.",
    "prof.avatar.pick": "Changer la photo",
    "prof.avatar.remove": "Retirer la photo",
    "prof.avatarTooBig": "Image trop lourde — 4 Mo maximum.",
    "prof.role": "Rôle / titre",
    "prof.bio": "Bio",
    "prof.skillsHint": "Séparées par des virgules — ex. React, Go, Figma",
    "prof.saved": "Profil mis à jour ✓",
    "prof.publish.title": "Publier un projet",
    "prof.publish.sub": "Il apparaîtra sur ton profil et dans la vitrine des projets.",
    "prof.publish.name": "Nom du projet",
    "prof.publish.tagline": "Accroche",
    "prof.publish.desc": "Description",
    "prof.publish.stack": "Stack (virgules)",
    "prof.publish.status": "Statut",
    "prof.publish.cta": "Publier",
    "prof.publish.done": "Projet publié — visible sur ton profil ✓",
    /* ---------- Divers ---------- */ "misc.cancel": "Annuler",
    "misc.save": "Enregistrer",
    /* ---------- Palette ---------- */ "palette.placeholder": "Tapez une commande ou cherchez…",
    "palette.nav": "Navigation",
    "palette.actions": "Actions",
    "palette.theme": "Basculer sombre / clair",
    "palette.lang": "Passer en anglais",
    "palette.lang.fr": "Passer en français",
    "palette.logout": "Se déconnecter",
    "palette.go": "Aller à",
    /* ---------- Divers ---------- */ "misc.comingSoon": "Bientôt",
    "misc.now": "maintenant",
    "misc.points": "pts",
    "misc.verified": "vérifié"
};
const en = {
    "nav.product": "Features",
    "nav.community": "Community",
    "nav.roadmap": "Roadmap",
    "nav.enter": "Enter",
    "nav.openApp": "Open the app",
    "nav.cmdk": "to navigate",
    "nav.menu": "Menu",
    "hero.badge": "The platform for African devs",
    "hero.t1": "Here, African devs",
    "hero.t2": "build together",
    "hero.t3": "and get noticed.",
    "hero.sub": "A living portfolio profile, real projects, real-time messaging validated by both sides, challenges and opportunities. Your whole dev life, one place.",
    "hero.live": "Live from the platform",
    "hero.stat.devs": "registered devs",
    "hero.stat.projects": "projects published",
    "hero.stat.posts": "feed posts",
    "hero.stat.countries": "countries represented",
    "hero.stat.online": "online now",
    "hero.cta1": "Create my account",
    "hero.cta2": "Explore the platform",
    "hero.fx": "Background FX",
    "hero.fxOn": "on",
    "hero.fxOff": "off",
    "term.title": "nora — demo session",
    "term.line1": "the dev daily, from concept to deployment",
    "ticker.devs": "registered devs",
    "ticker.projects": "published projects",
    "ticker.posts": "feed posts",
    "ticker.countries": "countries represented",
    "ticker.channels": "public rooms",
    "ticker.1": "local communities",
    "ticker.2": "real-time rooms",
    "ticker.3": "code challenges",
    "ticker.4": "Mobile Money gigs",
    "ticker.5": "living portfolio profile",
    "ticker.6": "one-click hackathons",
    "ticker.7": "AI code agents",
    "ticker.8": "verifiable reputation",
    "africa.kicker": "01 — The ground",
    "africa.title": "One community, one continent.",
    "africa.sub": "Meetups by city, rooms by stack, a feed that talks about your stack. The online link starts where you are.",
    "africa.hub": "active hub",
    "africa.cities": "Active cities this week",
    "africa.note": "Beta: communities open city by city.",
    "africa.mapAlt": "Map of Africa made of the flags of the 54 countries",
    "africa.mapCaption": "54 countries · one dev network",
    "africa.memberWord": "active members",
    "africa.countriesWord": "countries represented",
    "africa.photoTitle": "Local communities, for real.",
    "bento.kicker": "02 — The product",
    "bento.title": "The dev daily, in a single grid.",
    "bento.sub": "Not ten tools. One space that follows code from idea to deployment.",
    "activity.kicker": "01bis — Live",
    "activity.title": "The latest project, the latest post.",
    "activity.project.badge": "latest project",
    "activity.project.cta": "All projects",
    "activity.post.badge": "latest feed post",
    "activity.post.cta": "Open the feed",
    "activity.empty": "First publications are on their way.",
    "activity.star": "Star",
    "activity.strip": "Live projects",
    "bento.ai.t": "NORA AI",
    "bento.ai.d": "An agent that suggests fixed code, with syntax highlighting, one-click copy and ready-to-use prompts.",
    "bento.profile.t": "Living portfolio profile",
    "bento.profile.d": "Skills, projects, verifiable reputation. What recruiters and peers see first.",
    "bento.editor.t": "Editor + AI agents",
    "bento.editor.d": "Build, test, iterate from the browser. The agent proposes a diff, you approve.",
    "bento.salons.t": "Real-time rooms",
    "bento.salons.d": "Thematic and private rooms, Discord-style. Code travels fast there.",
    "bento.hackathon.t": "Hackathon mode",
    "bento.hackathon.d": "Team formed on the fly: room, shared repo and environment generated in one click.",
    "bento.challenges.t": "Challenges & ranking",
    "bento.challenges.d": "Peer duels, points, streaks. Progress becomes visible.",
    "bento.missions.t": "Paid gigs",
    "bento.missions.d": "Small contracts paid via Mobile Money. A real reason to come back.",
    "bento.cities.t": "Local communities",
    "bento.cities.d": "Country and city groups to organize meetups.",
    "bento.reputation.t": "Verifiable reputation",
    "bento.reputation.d": "Score based on real projects, challenges won and contributions — useful to recruiters.",
    "bento.explore": "Explore",
    "diff.kicker": "03 — AI assistance",
    "diff.title": "The agent proposes. You approve.",
    "diff.sub": "Every fix goes through a readable diff: removed lines in orange, added ones in green.",
    "diff.before": "before",
    "diff.after": "after",
    "diff.removed": "removed",
    "diff.added": "added",
    "diff.apply": "Apply the diff",
    "diff.applied": "Diff applied",
    "roadmap.kicker": "04 — The path",
    "roadmap.title": "What we build, commit by commit.",
    "roadmap.sub": "From beta to the continent: what comes next for the product.",
    "roadmap.now": "in progress",
    "cta.title": "Your profile deserves better than a PDF résumé.",
    "cta.sub": "Join the beta, publish your first project, find your next team.",
    "cta.b1": "Create my account",
    "cta.b2": "Log in",
    "footer.tag": "Built by African devs, for African devs.",
    "footer.product": "Product",
    "footer.community": "Community",
    "footer.stack": "Stack",
    "footer.p1": "Portfolio profile",
    "footer.p2": "Real-time rooms",
    "footer.p3": "Editor + AI",
    "footer.p4": "Gigs",
    "footer.c1": "Local communities",
    "footer.c2": "Mentorship",
    "footer.c3": "Hackathons",
    "footer.c4": "Newsletter",
    "footer.s1": "React + TypeScript",
    "footer.s2": "Tailwind CSS",
    "footer.s3": "Go backend",
    "footer.s4": "REST + OpenAPI",
    "footer.rights": "Crafted by team dev42.",
    "footer.cmdk": "Tip: Cmd/Ctrl + K to navigate fast.",
    "auth.login.kicker": "Back to code",
    "auth.login.title": "Log in",
    "auth.login.sub": "No account yet?",
    "auth.register.kicker": "Join NORA",
    "auth.register.title": "Sign up",
    "auth.register.sub": "Already a member?",
    "auth.email": "Email or username",
    "auth.password": "Password",
    "auth.name": "Full name",
    "auth.username": "Username",
    "auth.city": "City",
    "auth.submitLogin": "Log in",
    "auth.submitRegister": "Create my account",
    "auth.requiredToast": "Sign in to access the platform.",
    "auth.perk1.t": "Your portfolio, alive",
    "auth.perk1.d": "A profile that shows code, not just words.",
    "auth.perk2.t": "Teams formed on the fly",
    "auth.perk2.d": "Room, repo and environment generated in one click.",
    "auth.perk3.t": "Local and continental visibility",
    "auth.perk3.d": "Verifiable reputation, rankings, paid gigs.",
    "auth.back": "Back",
    "app.dashboard": "Dashboard",
    "app.dashboard.short": "Home",
    "app.studio": "Studio",
    "app.studio.short": "Studio",
    "app.feed": "Feed",
    "app.feed.short": "Feed",
    "app.projects": "Projects",
    "app.devs": "Developers",
    "app.salons": "Messages",
    "app.challenges": "Challenges",
    "app.missions": "Gigs",
    "app.profile": "My profile",
    "app.profile.short": "Profile",
    "app.search": "Search…",
    "app.theme.dark": "Dark theme",
    "app.theme.light": "Light theme",
    "app.lang": "Language",
    "app.logout": "Log out",
    "app.home": "Home",
    "app.group.workspace": "Workspace",
    "app.group.create": "Create",
    "app.group.discover": "Discover",
    "app.group.grow": "Grow",
    /* ---------- Topbar ---------- */ "top.notif": "Notifications",
    "top.notif.title": "Notifications",
    "top.notif.live": "live",
    "top.notif.empty": "All quiet — your notifications will show up here.",
    "top.notif.contact": "wants to connect with you",
    "top.notif.like": "liked your post",
    "top.notif.star": "starred your project",
    "top.notif.message": "sent you a message",
    "top.account": "My account",
    "top.settings": "Settings",
    /* ---------- Settings panel ---------- */ "settings.title": "Settings",
    "settings.sub": "Appearance, language and integrations — applied instantly.",
    "settings.appearance": "Appearance",
    "settings.language": "Language",
    "settings.github": "GitHub",
    "settings.github.d": "Load your real public repositories and import them as NORA projects in one click.",
    "settings.github.load": "Load",
    "settings.github.import": "Import",
    "settings.github.imported": "Imported",
    /* ---------- Studio (IDE) ---------- */ "studio.kicker": "Code studio",
    "studio.title": "NORA Studio",
    "studio.explorer": "Explorer",
    "studio.newFile": "New file",
    "studio.noFiles": "No file yet — create the first one.",
    "studio.filesCount": "files",
    "studio.noOpenFile": "No open file",
    "studio.pick": "Pick a file in the explorer",
    "studio.pickHint": "Your files are persisted server-side — they follow you between sessions.",
    "studio.console": "Console",
    "studio.clear": "Clear",
    "studio.consoleHint": "▸ Run a JavaScript file to see its output here.",
    "studio.run": "Run",
    "studio.runJsOnly": "In-browser execution is available for JavaScript (.js) files.",
    "studio.running": "Running",
    "studio.done": "Done",
    "studio.timeout": "⏱ Timeout — execution stopped (5 s max).",
    "studio.save": "Save",
    "studio.saved": "File saved ✓",
    "studio.saveError": "Could not save",
    "studio.fileCreated": "File created ✓",
    "studio.fileError": "Could not create",
    "studio.fileDeleted": "File deleted",
    "studio.deleteFile": "Delete (2 clicks)",
    "studio.ai.title": "NORA AI",
    "studio.ai.hint": "Ask for an algorithm, a fix, a component — then insert the code into your file.",
    "studio.ai.thinking": "is thinking…",
    "studio.ai.insert": "Insert",
    "studio.ai.placeholder": "e.g. a quicksort in JS…",
    "studio.aiError": "NORA is temporarily unavailable.",
    "studio.inserted": "Code inserted into the file ✓",
    "studio.sandboxNote": "sandboxed run, 5 s max",
    /* ---------- Dashboard v2 ---------- */ "dash.greeting": "Hey",
    "dash.today": "Here is what's moving today.",
    "dash.hero.hello": "Hello",
    "dash.hero.tag": "Connect. Learn. Build.",
    "dash.hero.sub": "Join a vibrant community of African developers — projects, rooms, challenges and gigs in one place.",
    "dash.hero.cta": "Explore NORA",
    "dash.featured": "featured profiles",
    "dash.stats.posts": "Feed posts",
    "dash.stats.channels": "Public rooms",
    "dash.profile.t": "Your profile",
    "dash.profile.d": "Complete your profile to get more visibility from recruiters and peers!",
    "dash.profile.cta": "Complete",
    "dash.stats.devs": "Developers",
    "dash.stats.projects": "Published projects",
    "dash.stats.challenges": "Challenges solved",
    "dash.stats.paid": "FCFA paid to devs",
    "dash.trend.t": "Trending projects",
    "dash.team.t": "Join a team",
    "dash.seeAll": "See all",
    "dash.activity.t": "Your recent activity",
    "dash.editor.t": "NORA Studio",
    "dash.editor.d": "Code right in your browser: persisted files, sandboxed execution and an AI agent next to it.",
    "dash.editor.cta": "Open the Studio",
    "dash.build.t": "Together, let's make African talent shine.",
    "dash.build.tag": "#BuildAfrica",
    "dash.hackathon.t": "Upcoming hackathon",
    "dash.hackathon.cta": "Form a team",
    "feed.compose": "Share a project, a question, a win…",
    "feed.post": "Post",
    "feed.all": "All",
    "feed.projects": "Projects",
    "feed.code": "Code",
    "feed.articles": "Articles",
    "feed.follow": "Follow",
    "feed.following": "Following",
    "feed.like": "Like",
    "feed.comment": "Comment",
    "feed.comment.soon": "Comments — coming soon",
    "feed.share": "Share",
    "feed.viewProject": "View project",
    "projects.title": "Published projects",
    "projects.sub": "The continent's storefront. Star, fork, join.",
    "projects.all": "All",
    "projects.status.production": "In production",
    "projects.status.dev": "In development",
    "projects.status.equipe": "Teamed up",
    "projects.status.idee": "Idea",
    "projects.roles": "Open roles",
    "projects.join": "Join",
    "progress": "Progress",
    "devs.title": "Developers",
    "devs.sub": "Living portfolios, not static résumés.",
    "devs.online": "online",
    "devs.offline": "offline",
    "devs.availability.ouverte": "Available",
    "devs.availability.hackathon": "Looking for a hackathon",
    "devs.availability.mentorat": "Mentor",
    "devs.availability.missions": "Open to gigs",
    "devs.availability.occupe": "Busy",
    "devs.viewProfile": "View profile",
    "devs.message": "Message",
    "devs.filter.all": "All profiles",
    /* ---------- Salons / Messagerie v2 ---------- */ "msg.title": "Messages",
    "msg.sub": "Private chats and themed rooms — in real time.",
    "msg.search": "Search a conversation…",
    "msg.discussions": "Chats",
    "msg.channels": "Rooms",
    "msg.empty": "Pick a conversation to start.",
    "msg.placeholder": "Write a message…",
    "msg.sending": "Sending…",
    "msg.requestNeeded": "The conversation opens once your contact request is validated.",
    "msg.send": "Send",
    "msg.request.t": "Contact request",
    "msg.request.d": "wants to chat with you. Accept to open the conversation.",
    "msg.accept": "Accept",
    "msg.decline": "Decline",
    "msg.pending": "Pending",
    "msg.acceptedToast": "accepted your request — the chat is open!",
    "msg.requestSentToast": "Request sent — you'll know once the dev accepts.",
    "msg.incomingToast": "wants to chat with you — check your inbox.",
    "msg.nora.t": "NORA",
    "msg.nora.d": "Your AI code agent — available 24/7",
    "msg.nora.sug1": "Explain NORA's lite mode",
    "msg.nora.sug2": "How to fetch the Go API on 2G?",
    "msg.nora.sug3": "Generate a project card component",
    "msg.newChat": "Message a dev",
    "msg.typing": "typing…",
    "msg.today": "Today",
    "chal.title": "Challenges",
    "chal.sub": "Short duels, real points, an honest ranking.",
    "chal.daily": "Daily",
    "chal.weekly": "Weekly",
    "chal.participate": "Join in",
    "chal.endsIn": "Ends",
    "chal.successRate": "success",
    "chal.participants": "participants",
    "chal.board": "Monthly leaderboard",
    "chal.streak": "streak",
    "chal.you": "you",
    "chal.difficulty.Facile": "Easy",
    "chal.difficulty.Moyen": "Medium",
    "chal.difficulty.Difficile": "Hard",
    "chal.difficulty.Expert": "Expert",
    "chal.by": "by",
    "missions.title": "Paid gigs",
    "missions.sub": "Small contracts, Mobile Money payouts, zero friction.",
    "missions.budget": "Budget",
    "missions.duration": "Duration",
    "missions.apply": "Apply",
    "missions.applied": "Application sent",
    "missions.paidVia": "Paid via",
    "missions.urgency.Immédiat": "Immediate",
    "missions.urgency.Cette semaine": "This week",
    "missions.urgency.Flexible": "Flexible",
    "missions.match": "match",
    "prof.overview": "Overview",
    "prof.projects": "Projects",
    "prof.articles": "Articles",
    "prof.badges": "Badges",
    "prof.loading": "Loading profile…",
    "prof.reputation": "Reputation",
    "prof.followers": "followers",
    "prof.follow": "Follow",
    "prof.followingLabel": "Following",
    "prof.skills": "Skills",
    "prof.languages": "Languages",
    "prof.joined": "Member since",
    "prof.contributions": "contributions this year",
    "prof.contributionsT": "Contributions",
    "prof.activity": "Activity",
    "prof.about": "About",
    "prof.mentor.t": "Open to mentorship",
    "prof.mentor.d": "Shares knowledge through articles and tutorials — and earns reputation.",
    "prof.challengesWon": "challenges won",
    "prof.articlesCount": "articles published",
    "prof.contact": "Message",
    "prof.openChat": "Open chat",
    "prof.requestSent": "Request sent…",
    "prof.availability": "Availability",
    "prof.noProjects": "No published project yet.",
    "prof.edit.cta": "Edit profile",
    "prof.edit.title": "Edit my profile",
    "prof.edit.sub": "This information is visible to the community and recruiters.",
    "prof.avatar.t": "Profile photo",
    "prof.avatar.d": "PNG or JPG, 4 MB max. Instant preview.",
    "prof.avatar.pick": "Change photo",
    "prof.avatar.remove": "Remove photo",
    "prof.avatarTooBig": "Image too large — 4 MB max.",
    "prof.role": "Role / title",
    "prof.bio": "Bio",
    "prof.skillsHint": "Comma-separated — e.g. React, Go, Figma",
    "prof.saved": "Profile updated ✓",
    "prof.publish.title": "Publish a project",
    "prof.publish.sub": "It will appear on your profile and in the project showcase.",
    "prof.publish.name": "Project name",
    "prof.publish.tagline": "Tagline",
    "prof.publish.desc": "Description",
    "prof.publish.stack": "Stack (commas)",
    "prof.publish.status": "Status",
    "prof.publish.cta": "Publish",
    "prof.publish.done": "Project published — visible on your profile ✓",
    "palette.placeholder": "Type a command or search…",
    "palette.nav": "Navigation",
    "palette.actions": "Actions",
    "palette.theme": "Toggle dark / light",
    "palette.lang": "Switch to French",
    "palette.lang.fr": "Switch to French",
    "palette.logout": "Log out",
    "palette.go": "Go to",
    /* ---------- Divers ---------- */ "misc.cancel": "Cancel",
    "misc.save": "Save",
    "misc.comingSoon": "Soon",
    "misc.now": "now",
    "misc.points": "pts",
    "misc.verified": "verified"
};
const dicts = {
    fr,
    en
};
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function LanguageProvider({ children }) {
    _s();
    const [lang, setLangState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fr");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = window.localStorage.getItem("nora-lang");
            if (saved === "fr" || saved === "en") {
                // restauration différée d'un frame : cohérence avec le rendu serveur
                const id = requestAnimationFrame({
                    "LanguageProvider.useEffect.id": ()=>setLangState(saved)
                }["LanguageProvider.useEffect.id"]);
                return ({
                    "LanguageProvider.useEffect": ()=>cancelAnimationFrame(id)
                })["LanguageProvider.useEffect"];
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LanguageProvider.useCallback[setLang]": (l)=>{
            setLangState(l);
            window.localStorage.setItem("nora-lang", l);
            document.documentElement.lang = l;
        }
    }["LanguageProvider.useCallback[setLang]"], []);
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LanguageProvider.useCallback[t]": (key)=>dicts[lang][key] ?? dicts.fr[key] ?? key
    }["LanguageProvider.useCallback[t]"], [
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: {
            lang,
            setLang,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/i18n.tsx",
        lineNumber: 913,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "tv9xg/DfPt0aQ/22ZL/XidWcBdo=");
_c = LanguageProvider;
function useLang() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
    return ctx;
}
_s1(useLang, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/nora/fx/lenis.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NORA_JUMP",
    ()=>NORA_JUMP,
    "SmoothScroll",
    ()=>SmoothScroll
]);
/* ============================================================
   NORA — Défilement cinétique (Lenis)
   Smooth scroll avec easing physique. La navigation SPA émet
   l'événement « nora:jump-top » pour remonter instantanément.
   Respecte prefers-reduced-motion (boucle non démarrée).
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const NORA_JUMP = "nora:jump-top";
function SmoothScroll() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) return;
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                duration: 1.15,
                easing: {
                    "SmoothScroll.useEffect": (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t))
                }["SmoothScroll.useEffect"],
                smoothWheel: true,
                touchMultiplier: 1.6
            });
            let raf = 0;
            const loop = {
                "SmoothScroll.useEffect.loop": (time)=>{
                    lenis.raf(time);
                    raf = requestAnimationFrame(loop);
                }
            }["SmoothScroll.useEffect.loop"];
            raf = requestAnimationFrame(loop);
            const onJump = {
                "SmoothScroll.useEffect.onJump": ()=>lenis.scrollTo(0, {
                        immediate: true
                    })
            }["SmoothScroll.useEffect.onJump"];
            window.addEventListener(NORA_JUMP, onJump);
            return ({
                "SmoothScroll.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener(NORA_JUMP, onJump);
                    lenis.destroy();
                }
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], []);
    return null;
}
_s(SmoothScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6415016c._.js.map