module.exports = [
"[project]/src/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* ============================================================
   NORA — Client HTTP typé (aucune donnée en dur).
   Toutes les données viennent du backend REST :
   · par défaut  → l'API Next interne (Prisma + SQLite)
   · NEXT_PUBLIC_API_URL → le backend de l'équipe (Go dev42)
   ============================================================ */ __turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api,
    "loadToken",
    ()=>loadToken,
    "setToken",
    ()=>setToken
]);
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";
class ApiError extends Error {
    status;
    constructor(status, message){
        super(message);
        this.status = status;
    }
}
let token = null;
function setToken(t) {
    token = t;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function loadToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return token;
}
async function http(path, init) {
    const t = loadToken();
    const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...t ? {
                Authorization: `Bearer ${t}`
            } : {},
            ...init?.headers
        }
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) {
        throw new ApiError(res.status, data.error ?? `Erreur ${res.status}`);
    }
    return data;
}
const api = {
    /* auth */ register: (p)=>http("/auth/register", {
            method: "POST",
            body: JSON.stringify(p)
        }),
    login: (p)=>http("/auth/login", {
            method: "POST",
            body: JSON.stringify(p)
        }),
    me: ()=>http("/auth/me"),
    updateMe: (patch)=>http("/auth/me", {
            method: "PATCH",
            body: JSON.stringify(patch)
        }),
    /* données */ devs: ()=>http("/devs"),
    dev: (username)=>http(`/devs/${encodeURIComponent(username)}`),
    follow: (username)=>http(`/devs/${encodeURIComponent(username)}/follow`, {
            method: "POST"
        }),
    projects: ()=>http("/projects"),
    publishProject: (p)=>http("/projects", {
            method: "POST",
            body: JSON.stringify(p)
        }),
    toggleStar: (id)=>http(`/projects/${id}/star`, {
            method: "POST"
        }),
    joinProject: (id)=>http(`/projects/${id}/join`, {
            method: "POST"
        }),
    posts: ()=>http("/posts"),
    createPost: (p)=>http("/posts", {
            method: "POST",
            body: JSON.stringify(p)
        }),
    toggleLike: (id)=>http(`/posts/${id}/like`, {
            method: "POST"
        }),
    channels: ()=>http("/channels"),
    channelMessages: (id)=>http(`/channels/${encodeURIComponent(id)}/messages`),
    sendChannelMessage: (id, content)=>http(`/channels/${encodeURIComponent(id)}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content
            })
        }),
    challenges: ()=>http("/challenges"),
    missions: ()=>http("/missions"),
    hackathons: ()=>http("/hackathons"),
    stats: ()=>http("/stats"),
    /* messagerie privée */ threads: ()=>http("/dms"),
    sendDm: (username, content)=>http(`/dms/${encodeURIComponent(username)}`, {
            method: "POST",
            body: JSON.stringify({
                content
            })
        }),
    requestContact: (username)=>http(`/contact-requests`, {
            method: "POST",
            body: JSON.stringify({
                username
            })
        }),
    answerContact: (username, action)=>http(`/contact-requests/${encodeURIComponent(username)}`, {
            method: "POST",
            body: JSON.stringify({
                action
            })
        }),
    /* IA */ askNora: (prompt)=>http("/ai/chat", {
            method: "POST",
            body: JSON.stringify({
                prompt
            })
        }),
    /* notifications (réelles, calculées serveur) */ notifications: ()=>http("/notifications"),
    /* Studio — fichiers de code persistés */ workspace: ()=>http("/workspace"),
    saveWorkspaceFile: (p)=>http("/workspace", {
            method: "POST",
            body: JSON.stringify(p)
        }),
    deleteWorkspaceFile: (path)=>http(`/workspace?path=${encodeURIComponent(path)}`, {
            method: "DELETE"
        }),
    /* GitHub — dépôts publics réels */ githubRepos: (user)=>http(`/github/repos?user=${encodeURIComponent(user)}`)
};
}),
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "devByUsername",
    ()=>devByUsername,
    "useNora",
    ()=>useNora
]);
/* ============================================================
   NORA — Store global (zustand)
   Toutes les données passent par l'API REST (aucune donnée
   locale). Auth par token, messagerie privée validée par le
   destinataire, profil éditable, publication de projets.
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
"use client";
;
;
const useNora = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        devs: [],
        projects: [],
        posts: [],
        channels: [],
        channelMessages: [],
        challenges: [],
        missions: [],
        hackathons: [],
        stats: {
            devs: 0,
            projects: 0,
            posts: 0,
            channels: 0,
            countries: 0
        },
        workspaceFiles: [],
        workspaceLoaded: false,
        notifications: [],
        lastSeenNotif: "",
        view: "landing",
        authed: false,
        booting: true,
        commandOpen: false,
        webgl: true,
        profileOf: "",
        me: null,
        editProfileOpen: false,
        publishOpen: false,
        settingsOpen: false,
        activeChannel: null,
        activeDm: null,
        dmRequests: {},
        incomingRequest: null,
        dmThreads: {},
        /* ---------- session ---------- */ bootstrap: async ()=>{
            /* reprendre le marqueur « notifications vues » */ if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadToken"])()) {
                set({
                    booting: false
                });
                await get().loadPublic();
                return;
            }
            try {
                const { dev } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].me();
                set({
                    authed: true,
                    me: dev,
                    booting: false
                });
                await Promise.all([
                    get().loadPublic(),
                    get().refreshThreads(),
                    get().loadNotifications()
                ]);
            } catch  {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(null);
                set({
                    booting: false
                });
                await get().loadPublic();
            }
        },
        loadPublic: async ()=>{
            try {
                const [a, b, c, d, e, f, g, h] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].devs(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].projects(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].posts(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].channels(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].challenges(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].missions(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].hackathons(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].stats()
                ]);
                set({
                    devs: a.devs,
                    projects: b.projects,
                    posts: c.posts,
                    channels: d.channels,
                    challenges: e.challenges,
                    missions: f.missions,
                    hackathons: g.hackathons,
                    stats: h.stats
                });
            } catch (err) {
                console.error("[nora] chargement public", err);
            }
        },
        login: async (email, password)=>{
            const { token, dev } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].login({
                email,
                password
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(token);
            set({
                authed: true,
                me: dev,
                view: "dashboard"
            });
            await Promise.all([
                get().loadPublic(),
                get().refreshThreads(),
                get().loadNotifications()
            ]);
        },
        register: async (p)=>{
            const { token, dev } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].register(p);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(token);
            set({
                authed: true,
                me: dev,
                view: "dashboard"
            });
            await Promise.all([
                get().loadPublic(),
                get().refreshThreads(),
                get().loadNotifications()
            ]);
        },
        logout: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(null);
            set({
                authed: false,
                me: null,
                view: "landing",
                dmThreads: {},
                dmRequests: {},
                incomingRequest: null,
                activeDm: null,
                workspaceFiles: [],
                workspaceLoaded: false,
                notifications: [],
                editProfileOpen: false,
                publishOpen: false,
                settingsOpen: false
            });
            get().loadPublic();
        },
        /* ---------- navigation ---------- */ navigate: (v)=>{
            set({
                view: v,
                commandOpen: false
            });
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        viewProfile: (username)=>{
            set({
                profileOf: username,
                view: "profile",
                commandOpen: false
            });
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        /* le profil en bas à gauche = MON profil, jamais celui d'un autre */ openMyProfile: ()=>{
            const me = get().me;
            if (!me) return;
            set({
                profileOf: me.username,
                view: "profile",
                commandOpen: false
            });
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        setCommandOpen: (v)=>set({
                commandOpen: v
            }),
        setWebgl: (v)=>set({
                webgl: v
            }),
        /* ---------- interactions (réelles, persistées) ---------- */ toggleFollow: async (username)=>{
            try {
                const { following, followers } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].follow(username);
                set((s)=>({
                        devs: s.devs.map((d)=>d.username === username ? {
                                ...d,
                                following,
                                followers
                            } : d)
                    }));
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 401) set({
                    view: "login"
                });
            }
        },
        toggleLike: async (postId)=>{
            try {
                const { post } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].toggleLike(postId);
                set((s)=>({
                        posts: s.posts.map((p)=>p.id === post.id ? post : p)
                    }));
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 401) set({
                    view: "login"
                });
            }
        },
        toggleJoin: async (projectId)=>{
            try {
                const { project } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].joinProject(projectId);
                set((s)=>({
                        projects: s.projects.map((p)=>p.id === project.id ? project : p)
                    }));
            /* un post d'équipe est créé côté front lors de la première demande */ } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 401) set({
                    view: "login"
                });
            }
        },
        toggleStar: async (projectId)=>{
            try {
                const { project } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].toggleStar(projectId);
                set((s)=>({
                        projects: s.projects.map((p)=>p.id === project.id ? {
                                ...p,
                                stars: project.stars
                            } : p)
                    }));
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 401) set({
                    view: "login"
                });
            }
        },
        createPost: async (p)=>{
            const { post } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].createPost(p);
            set((s)=>({
                    posts: [
                        post,
                        ...s.posts
                    ]
                }));
            get().loadPublic();
        },
        /* ---------- notifications réelles ---------- */ loadNotifications: async ()=>{
            try {
                const { notifications } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].notifications();
                set({
                    notifications
                });
            } catch  {
            /* silencieux : la cloche reste vide si l'API est indisponible */ }
        },
        markNotificationsSeen: ()=>{
            const iso = new Date().toISOString();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            set({
                lastSeenNotif: iso
            });
        },
        /* ---------- studio ---------- */ loadWorkspace: async ()=>{
            try {
                const { files } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].workspace();
                set({
                    workspaceFiles: files,
                    workspaceLoaded: true
                });
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 401) set({
                    view: "login"
                });
            }
        },
        saveWorkspaceFile: async ({ path, content, language })=>{
            const { file } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].saveWorkspaceFile({
                path,
                content,
                language
            });
            set((s)=>{
                const exists = s.workspaceFiles.some((f)=>f.path === file.path);
                return {
                    workspaceFiles: exists ? s.workspaceFiles.map((f)=>f.path === file.path ? file : f) : [
                        ...s.workspaceFiles,
                        file
                    ]
                };
            });
        },
        createWorkspaceFile: async (path)=>{
            const { file } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].saveWorkspaceFile({
                path,
                content: ""
            });
            set((s)=>({
                    workspaceFiles: s.workspaceFiles.some((f)=>f.path === file.path) ? s.workspaceFiles : [
                        ...s.workspaceFiles,
                        file
                    ].sort((a, b)=>a.path.localeCompare(b.path))
                }));
            return file;
        },
        deleteWorkspaceFile: async (path)=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].deleteWorkspaceFile(path);
            set((s)=>({
                    workspaceFiles: s.workspaceFiles.filter((f)=>f.path !== path)
                }));
        },
        /* ---------- profil & projets ---------- */ setEditProfileOpen: (v)=>set({
                editProfileOpen: v
            }),
        setSettingsOpen: (v)=>set({
                settingsOpen: v
            }),
        saveProfile: async (patch)=>{
            const { dev } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].updateMe(patch);
            set((s)=>({
                    me: dev,
                    devs: s.devs.map((d)=>d.username === dev.username ? {
                            ...d,
                            ...dev
                        } : d),
                    editProfileOpen: false
                }));
        },
        setPublishOpen: (v)=>set({
                publishOpen: v
            }),
        publishProject: async (p)=>{
            const { project } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].publishProject(p);
            set((s)=>({
                    projects: [
                        project,
                        ...s.projects
                    ],
                    me: s.me ? {
                        ...s.me,
                        projectsCount: s.me.projectsCount + 1
                    } : s.me,
                    publishOpen: false
                }));
            // un post accompagne la publication
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].createPost({
                content: `Nouveau projet publié : ${project.name} — ${project.tagline}`,
                type: "project",
                projectId: project.id
            }).catch(()=>undefined);
            await get().loadPublic();
        },
        /* ---------- salons ---------- */ selectChannel: async (id)=>{
            set({
                activeChannel: id
            });
            try {
                const { messages } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].channelMessages(id);
                set({
                    channelMessages: messages
                });
            } catch (err) {
                console.error("[nora] messages salon", err);
            }
        },
        sendChannelMessage: async (id, content)=>{
            const { message } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].sendChannelMessage(id, content);
            set((s)=>({
                    channelMessages: [
                        ...s.channelMessages,
                        message
                    ]
                }));
        },
        /* ---------- messagerie privée ---------- */ refreshThreads: async ()=>{
            try {
                const t = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].threads();
                const dmRequests = {
                    nora: "accepted"
                };
                for (const c of t.contacts)dmRequests[c] = "accepted";
                for (const o of t.outgoing)dmRequests[o.username] = "pending";
                set({
                    dmRequests,
                    dmThreads: t.threads,
                    incomingRequest: t.incoming[0] ?? null
                });
            } catch (err) {
                console.error("[nora] threads", err);
            }
        },
        requestContact: async (username)=>{
            if (get().dmRequests[username]) return;
            set((s)=>({
                    dmRequests: {
                        ...s.dmRequests,
                        [username]: "pending"
                    }
                }));
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].requestContact(username);
            } catch (err) {
                console.error("[nora] demande contact", err);
            }
        },
        acceptRequest: async (username)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].answerContact(username, "accept");
            } catch (err) {
                console.error("[nora] accept contact", err);
            }
            set((s)=>({
                    incomingRequest: null,
                    dmRequests: {
                        ...s.dmRequests,
                        [username]: "accepted"
                    },
                    activeDm: username
                }));
            await get().refreshThreads();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        declineRequest: async (username)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].answerContact(username, "decline");
            } catch (err) {
                console.error("[nora] decline contact", err);
            }
            set({
                incomingRequest: null
            });
            await get().refreshThreads();
        },
        openDm: (username)=>set({
                activeDm: username
            }),
        sendDm: async (username, content)=>{
            if (!content.trim()) return;
            const optimistic = {
                id: `opt-${Date.now()}`,
                author: get().me?.username ?? "me",
                time: new Date().toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit"
                }),
                content: content.trim()
            };
            set((s)=>({
                    dmThreads: {
                        ...s.dmThreads,
                        [username]: [
                            ...s.dmThreads[username] ?? [],
                            optimistic
                        ]
                    }
                }));
            try {
                const { messages, aiCode } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].sendDm(username, content.trim());
                set((s)=>{
                    const thread = (s.dmThreads[username] ?? []).filter((m)=>m.id !== optimistic.id);
                    for (const m of messages)thread.push(m);
                    if (aiCode) {
                        thread.push({
                            id: `ai-${Date.now()}`,
                            author: username,
                            time: new Date().toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit"
                            }),
                            content: "",
                            kind: "code",
                            code: aiCode
                        });
                    }
                    return {
                        dmThreads: {
                            ...s.dmThreads,
                            [username]: thread
                        }
                    };
                });
            } catch (err) {
                // rollback optimiste
                set((s)=>({
                        dmThreads: {
                            ...s.dmThreads,
                            [username]: (s.dmThreads[username] ?? []).filter((m)=>m.id !== optimistic.id)
                        }
                    }));
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && err.status === 403) {
                    set((s)=>({
                            dmRequests: {
                                ...s.dmRequests,
                                [username]: "none"
                            }
                        }));
                }
                throw err;
            }
        }
    }));
const devByUsername = (u)=>useNora.getState().devs.find((d)=>d.username === u);
}),
"[project]/src/lib/content.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* ============================================================
   NORA — Contenu éditorial du site (images, listes de villes).
   Ce ne sont PAS des données utilisateurs : celles-ci vivent
   exclusivement en base et passent par l'API.
   ============================================================ */ __turbopack_context__.s([
    "IMAGES",
    ()=>IMAGES,
    "citiesMarquee",
    ()=>citiesMarquee,
    "cityCards",
    ()=>cityCards
]);
const IMAGES = {
    heroSavanna: "/images/hero-savanna.jpg",
    hackathon: "/images/event-hackathon.jpg",
    conference: "/images/event-conference.jpg",
    buildAfrica: "/images/build-africa.jpg",
    devKid: "/images/dev-kid.jpg",
    devFocus: "/images/dev-focus.jpg",
    devHands: "/images/dev-hands.jpg",
    techNetwork: "/images/tech-network.jpg",
    africaFlags: "/images/africa-flags.png"
};
const cityCards = [
    {
        city: "Cotonou",
        country: "Bénin",
        flag: "🇧🇯",
        image: "/images/city-cotonou.jpg"
    },
    {
        city: "Abidjan",
        country: "Côte d'Ivoire",
        flag: "🇨🇮",
        image: "/images/city-abidjan.jpg"
    },
    {
        city: "Dakar",
        country: "Sénégal",
        flag: "🇸🇳",
        image: "/images/city-dakar.jpg"
    },
    {
        city: "Accra",
        country: "Ghana",
        flag: "🇬🇭",
        image: "/images/city-accra.jpg"
    }
];
const citiesMarquee = [
    "Abidjan",
    "Lagos",
    "Dakar",
    "Nairobi",
    "Cotonou",
    "Accra",
    "Kigali",
    "Casablanca",
    "Douala",
    "Kinshasa",
    "Bamako",
    "Ouagadougou",
    "Lomé",
    "Le Caire",
    "Kampala",
    "Johannesburg",
    "Porto-Novo",
    "Khartoum",
    "Antananarivo",
    "Addis-Abeba"
];
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/* ============================================================
   NORA — Point d'entrée de l'application (SPA client-side).
   · Session réelle : bootstrap() recharge le compte via le token.
   · Accès gardé : la plateforme (dashboard, fil, projets, devs,
     salons, challenges, missions, profils) exige un compte.
     Seules la landing et les pages d'authentification sont publiques.
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/palette.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$landing$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/nora/landing.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/auth.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/shell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$feed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/feed.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$explore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/explore.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$profile$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/profile.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$studio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/studio.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$salons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/salons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$extra$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/views/extra.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$shared$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nora/shared.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const EASE = [
    0.22,
    1,
    0.36,
    1
];
function Home() {
    const { view, authed, booting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNora"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLang"])();
    const authToastShown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isAuthPage = view === "login" || view === "register";
    /* garde d'accès : aucune vue de la plateforme sans compte */ const needsAuth = !authed && !isAuthPage && view !== "landing";
    /* session au premier rendu */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNora"].getState().bootstrap();
        /* rafraîchissement léger : demandes de contact + présence */ const id = setInterval(()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNora"].getState().authed) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNora"].getState().refreshThreads();
        }, 15000);
        return ()=>clearInterval(id);
    }, []);
    /* redirection vers la connexion + message sobre, une seule fois */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!needsAuth) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNora"].setState({
            view: "login"
        });
        if (!authToastShown.current) {
            authToastShown.current = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])(t("auth.requiredToast"));
        }
    }, [
        needsAuth,
        t
    ]);
    if (booting) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-svh place-items-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$shared$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                        size: 34
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "size-5 animate-spin rounded-full border-2 border-flare/30 border-t-flare"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this);
    }
    const inApp = !needsAuth && view !== "landing" && !isAuthPage;
    const viewFor = ()=>{
        switch(view){
            case "landing":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$landing$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LandingPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 75,
                    columnNumber: 30
                }, this);
            case "login":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 76,
                    columnNumber: 28
                }, this);
            case "register":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 77,
                    columnNumber: 31
                }, this);
            case "feed":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$feed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 78,
                    columnNumber: 27
                }, this);
            case "projects":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$explore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProjectsView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 79,
                    columnNumber: 31
                }, this);
            case "devs":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$explore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DevsView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 80,
                    columnNumber: 27
                }, this);
            case "salons":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$salons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SalonsView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 81,
                    columnNumber: 29
                }, this);
            case "challenges":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$salons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChallengesView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 82,
                    columnNumber: 33
                }, this);
            case "missions":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$extra$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MissionsView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 31
                }, this);
            case "profile":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$profile$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProfileView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 84,
                    columnNumber: 30
                }, this);
            case "studio":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$studio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StudioView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 85,
                    columnNumber: 29
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$views$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardView"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 86,
                    columnNumber: 23
                }, this);
        }
    };
    const inner = needsAuth ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginPage"], {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 90,
        columnNumber: 29
    }, this) : viewFor();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 14
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.32,
                        ease: EASE
                    },
                    children: inApp ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppShell"], {
                        children: inner
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 102,
                        columnNumber: 20
                    }, this) : inner
                }, inApp ? `app-${view}` : view, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nora$2f$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandPalette"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_1e53e705._.js.map