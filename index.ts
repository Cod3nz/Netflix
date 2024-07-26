import app from "./app";

app.listen(app.get("port"), async() => {
    // TODO: Zorg ervoor dat de connectie met de database wordt gemaakt. Gebruik hiervoor de connect functie uit de database module.
    // TODO: Zorg ervoor dat de server stopt als er een error optreedt bij het maken van de connectie met de database.
    console.log("Server started on http://localhost:" + app.get("port"));
});