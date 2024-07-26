import session, { MemoryStore } from "express-session";
import { User } from "./types";

declare module "express-session" {
    export interface SessionData {
        // TODO: Voeg de benodigde properties toe aan de SessionData interface.
        user?: User
    }
}

const secret = process.env.Session_Secret;
if (!secret) {
    throw new Error("Session secret is not set in environment");
}

export default session({
    // TODO: Haal de secret uit de dotenv file. Gebruik hiervoor SESSION_SECRET.
    secret: secret,
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true
});