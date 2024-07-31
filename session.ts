import session, { MemoryStore } from "express-session";
import { User } from "./types";

const secret = process.env.Session_Secret;
if (!secret) {
    throw new Error("Session secret is not set in environment");
}

declare module "express-session" {
    export interface SessionData {
        user?: User
    }
}


export default session({
    secret: secret,
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true
});