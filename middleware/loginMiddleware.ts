import { Request, Response, NextFunction } from "express";

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    // TODO: Implementeer deze middleware functie zodat deze controleert of de gebruiker is ingelogd.
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect("/login");
    }
}