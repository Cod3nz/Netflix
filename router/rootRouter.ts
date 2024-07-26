import express from "express";
import { getSeries, getUser, getSeriesById, saveUser, createSeries } from "../database";
import { User, Series } from "../types";

export default function rootRouter() {
    const router = express.Router();

    router.get("/", async(req, res) => {
        // TODO: Gebruik een query `q` om te zoeken naar series waarvan de query voorkomt in de naam van de serie.
        // TODO: Gebruik een query `sortField` om te sorteren op een bepaald veld.
        // TODO: Gebruik/maak hiervoor de nodige functies in de `database.ts` file. We gebruiken dus database filtering en sorting via mongodb, dus geen JavaScript filtering en sorting.
        // TODO: Render de `index` view met de gevonden series, de zoekterm en de sorteerrichting.
        res.render("index");
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
        // TODO: Toon het formulier om een nieuwe serie toe te voegen via de `create` view.
        // TODO: Gebruik de `categories` array om de mogelijke categorieën in een dropdown te tonen.
        res.render("create");
    });
    
    router.post("/create", async(req, res) => {
        // TODO: Haal de nodige gegevens op uit de body van de request
        // TODO: Gebruik/maak hiervoor de nodige functies in de `database.ts` file.
        res.redirect("/");
    });

    return router;
}