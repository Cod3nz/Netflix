import express from "express";
import { getSeries, getUser, createSeries } from "../database";
import { User, Series } from "../types";
import { loginMiddleware } from "../middleware/loginMiddleware";

export default function rootRouter() {
    const router = express.Router();

    router.use(loginMiddleware);

    router.get("/", async(req, res) => {
        const q: string = `${req.query.q}`;
        const sortField: string = `${req.query.sortField}`;
        const series: Series[] = await getSeries(q, sortField, 1);

        res.render("index", {
            series: series,
            q: q === "undefined" ? "" : q,
            sortField: sortField
        });
    });

    router.get("/create", (req, res) => {
        let categories : string[] = [
            "Supernatural",
            "Fantasy",
            "Science Fiction",
            "Drama",
            "Crime",
            "Animation",
            "Superhero",
            "Horror",
            "Thriller",
            "Documentary",
            "Romance",
            "Comedy",
            "Mystery",
            "Adventure",
            "Historical",
            "Action",
            "Biography",
            "Musical",
            "Family",
            "Western"
        ];
        res.render("create", {
            categories: categories
        });
    });
    
    router.post("/create", async (req, res) => {
        try {
            const { name, link, summary, score, category } = req.body;
            await createSeries({ name, link, summary, score, category });
            res.redirect("/");
        } catch (error) {
            console.error("Error creating series:", error);
            res.status(500).send("Internal Server Error");
        }
    });    

    return router;
}