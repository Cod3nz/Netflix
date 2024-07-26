import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Series, User } from "./types";
import bcrypt from "bcrypt";

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const client = new MongoClient(MONGODB_URI);

const db = client.db("ExamenWebOntwikkeling");

const saltRounds = 10;

// TODO: Maak de nodige collections aan.

export const serieCollection: Collection<Series> = db.collection<Series>("Series");
export const userCollection: Collection<User> = db.collection<User>("Users");


async function seedDatabase() {
    // TODO: Spreek de API aan om alle series binnen te halen en vervolgens in de database te steken. Doe dit alleen als er nog geen series in de database zitten. De API Url is https://raw.githubusercontent.com/similonap/json/master/netflix.json
    // TODO: Maak ook twee gebruikers aan als er nog geen gebruikers in de database zitten.
    // TODO: Zorg ervoor dat de wachtwoorden van de gebruikers gehasht worden voordat ze in de database gestoken worden.
    try {
        if (await serieCollection.countDocuments() === 0) {
            const data = await fetch("https://raw.githubusercontent.com/similonap/json/master/netflix.json");
            const json = await data.json();
            await serieCollection.insertMany(json);
        }
        if (await userCollection.countDocuments() > 0) {
            return;
        }
        const u1_mail = process.env.U1_EMAIL;
        const u1_pass = process.env.U1_PASSW;
        const u2_mail = process.env.U2_EMAIL;
        const u2_pass = process.env.U2_PASSW;
        if (!u1_mail || !u1_pass || !u2_mail || !u2_pass) {
            throw new Error("Initial user env variables not set");
        }
        await userCollection.insertMany([{ email: u1_mail, password: await bcrypt.hash(u1_pass, saltRounds) }, { email: u2_mail, password: await bcrypt.hash(u2_pass, saltRounds) }]);
    } catch (e: any) {
        console.log(e);
    }
}

export function getSeries(q: string, sortField: string, direction: number) {
    // TODO: Geef alle series terug waarvan de naam overeenkomt met de query `q`. Sorteer de series op basis van het veld `sortField` in de richting `direction`.
    return [];
}

export async function login(email: string, password: string) {
    // TODO: Controleer of de gebruiker bestaat en of het wachtwoord overeenkomt met het gehashte wachtwoord in de database.
    // TODO: Geef de gebruiker terug als alles in orde is.
    // TODO: Gooi een error als de gebruiker niet bestaat of als het wachtwoord niet overeenkomt.
    if (email === "" || password === "") {
        throw new Error("E-mail and password are required");
    }
    let user: User | null = await userCollection.findOne<User>({ email : email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Password incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}

export function getUser(email: string) {
    // TODO: Geef de gebruiker terug die overeenkomt met het emailadres.
    return [];
}

export function createSeries(series: Series) {
    // TODO: Voeg de meegegeven serie toe aan de database.
}

export function getSeriesById() {
    // TODO: ...
}

export function saveUser() {
    // TODO: ...
}



export async function connect() {
    // TODO: Maak de connectie met de database
    // TODO: Zorg ervoor dat de seedDatabase functie wordt aangeroepen.
    // TODO: Zorg ervoor dat de verbinding met de database wordt afgesloten als het proces wordt afgesloten (SIGINT)
    try {
        await client.connect();
        await seedDatabase();
        process.on("SIGINT", client.close); 
    } catch (e: any) {
        console.log(e);
        client.close();
    }
}