import express from "express";
import { login } from "../database";
import { User } from "../types";

export default function loginRouter() {
    const router = express.Router();

    router.get("/login", (req, res) => {
        res.render("login");
    });

    router.post("/login", async(req, res) => {
        // TODO: Implementeer de login functionaliteit. Als de gebruiker succesvol is ingelogd, moet de gebruiker worden doorgestuurd naar de homepagina. Als de gebruiker niet succesvol is ingelogd, moet de gebruiker worden doorgestuurd naar de login pagina met een foutmelding. Gebruik flash messages om de foutmelding door te geven.
        const email: string = req.body.email;
        const password: string = req.body.pasword;
        try {
            let user: User = await login(email, password);
            delete user.password;
            req.session.user = user;
            res.redirect("/");
        } catch (e: any) {
            console.log(e);
            res.redirect("/login");
        }
    });

    router.get("/logout", async (req, res) => {
        // TODO: Implementeer de logout functionaliteit.
        req.session.destroy(() => {
            res.redirect("/login");
        })
    });

    return router;
}