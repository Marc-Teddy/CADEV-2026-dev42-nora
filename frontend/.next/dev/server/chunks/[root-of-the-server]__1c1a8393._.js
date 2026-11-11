module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/server/helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* ============================================================
   NORA — Helpers serveur : auth, hash, sérialisation API.
   ============================================================ */ __turbopack_context__.s([
    "clockTime",
    ()=>clockTime,
    "hashPassword",
    ()=>hashPassword,
    "newToken",
    ()=>newToken,
    "parseJson",
    ()=>parseJson,
    "relTime",
    ()=>relTime,
    "requireDev",
    ()=>requireDev,
    "serDev",
    ()=>serDev,
    "serMessage",
    ()=>serMessage,
    "serPost",
    ()=>serPost,
    "serProject",
    ()=>serProject,
    "threadKey",
    ()=>threadKey,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
function hashPassword(pw) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    return `${salt}:${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scryptSync"])(pw, salt, 32).toString("hex")}`;
}
function verifyPassword(pw, stored) {
    const [salt, hex] = stored.split(":");
    if (!salt || !hex) return false;
    const a = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scryptSync"])(pw, salt, 32);
    const b = Buffer.from(hex, "hex");
    return a.length === b.length && (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b);
}
function newToken() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(24).toString("hex");
}
async function requireDev(req) {
    const header = req.headers.get("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : req.nextUrl.searchParams.get("token") ?? "";
    if (!token) return null;
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.findUnique({
        where: {
            id: token
        },
        include: {
            dev: true
        }
    });
    return session?.dev ?? null;
}
const parseJson = (raw, fallback)=>{
    if (!raw) return fallback;
    try {
        return JSON.parse(raw);
    } catch  {
        return fallback;
    }
};
function serDev(d, opts) {
    const base = {
        id: d.username,
        username: d.username,
        name: d.name,
        role: d.role,
        city: d.city,
        country: d.country,
        flag: d.flag,
        bio: d.bio,
        skills: parseJson(d.skillsJson, []),
        reputation: d.reputation,
        badges: parseJson(d.badgesJson, []),
        projectsCount: d.projectsCount,
        followers: d.followers,
        following: opts?.following ?? false,
        online: d.online,
        availability: d.availability,
        gradient: parseJson(d.gradientJson, [
            "#8b5cf6",
            "#22d3ee"
        ]),
        articles: d.articles,
        challengesWon: d.challengesWon,
        langs: parseJson(d.langsJson, []),
        joined: d.joined,
        avatarUrl: d.avatarUrl ?? undefined
    };
    return opts?.private ? {
        ...base,
        email: d.email
    } : base;
}
function serProject(p, starredByMe = false) {
    return {
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        domain: p.domain,
        stack: parseJson(p.stackJson, []),
        status: p.status,
        stars: p._count?.starsGiven != null ? p.starsBase + p._count.starsGiven : p.starsBase,
        forks: p.forks,
        owner: p.owner,
        team: parseJson(p.teamJson, []),
        openRoles: parseJson(p.openRolesJson, []),
        progress: p.progress,
        gradient: parseJson(p.gradientJson, [
            "#8b5cf6",
            "#22d3ee"
        ]),
        icon: p.icon,
        cover: p.cover ?? undefined,
        updated: relTime(p.updatedAt),
        repo: p.repo,
        createdAtIso: p.createdAt.toISOString(),
        starredByMe
    };
}
function serPost(p, me) {
    return {
        id: p.id,
        author: p.author,
        time: relTime(p.createdAt),
        type: p.type,
        content: p.content,
        tags: parseJson(p.tagsJson, []),
        likes: p._count?.likedBy != null ? p.likesBase + p._count.likedBy : p.likesBase,
        comments: p.comments,
        shares: p.shares,
        liked: me ? (p.likedBy ?? []).some((l)=>l.username === me) : false,
        code: p.codeLang ? {
            lang: p.codeLang,
            title: p.codeTitle ?? "",
            snippet: p.codeSnippet ?? ""
        } : undefined,
        projectId: p.projectId ?? undefined,
        createdAtIso: p.createdAt.toISOString()
    };
}
function serMessage(m) {
    return {
        id: m.id,
        author: m.author,
        time: clockTime(m.createdAt),
        content: m.content,
        kind: m.kind ?? "text",
        code: m.codeLang ? {
            lang: m.codeLang,
            snippet: m.codeSnippet ?? ""
        } : undefined,
        createdAtIso: m.createdAt.toISOString()
    };
}
function relTime(d) {
    const s = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
    if (s < 60) return "à l'instant";
    const m = Math.floor(s / 60);
    if (m < 60) return `il y a ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `il y a ${h} h`;
    const j = Math.floor(h / 24);
    if (j < 30) return `il y a ${j} j`;
    const mo = Math.floor(j / 30);
    return `il y a ${mo} mois`;
}
function clockTime(d) {
    return d.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function threadKey(a, b) {
    return [
        a,
        b
    ].sort().join("|");
}
}),
"[project]/src/app/api/missions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/helpers.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].mission.findMany();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        missions: rows.map((m)=>({
                ...m,
                skills: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJson"])(m.skillsJson, []),
                id: m.id
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c1a8393._.js.map