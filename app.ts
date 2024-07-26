import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import loginRouter from "./router/loginRouter";
import rootRouter from "./router/rootRouter";
import session from "./session";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
// TODO: Voeg missende session middleware toe
app.use(session);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

// TODO: Voeg de routers toe met bijbehorende middleware.
// TODO: Zorg dat de 404 pagina wordt getoond als de gebruiker een onbekende route bezoekt.

app.use(loginRouter());
app.use(rootRouter());

app.all("*", (req, res) => {
    res.render("404");
});
// 404 Handling: By using this handler, any request that,
// does not match a previously defined route will be rendered with the "404" page.

export default app;