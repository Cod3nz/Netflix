import { Collection, Filter, MongoClient, Sort, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Series, User } from "./types";
import bcrypt from "bcrypt";

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const client = new MongoClient(MONGODB_URI);

const db = client.db("ExamenWebOntwikkeling");

const saltRounds = 10;

export const serieCollection: Collection<Series> = db.collection<Series>("Series");
export const userCollection: Collection<User> = db.collection<User>("Users");

async function seedDatabase() {
    try {
        if (await serieCollection.countDocuments() === 0) {
            const data = await fetch("https://raw.githubusercontent.com/similonap/json/master/netflix.json");
            const json = await data.json();
            await serieCollection.insertMany(json)
        }
        if (await userCollection.countDocuments() > 0) {
            return;
        }
        const u1_mail = process.env.U1_EMAIL
        const u1_pass = process.env.U1_PASSW
        const u2_mail = process.env.U2_EMAIL
        const u2_pass = process.env.U2_PASSW
        if (!u1_mail || !u1_pass || !u2_mail || !u2_pass) {
            throw new Error("Initial user env variables not set")
        }
        await userCollection.insertMany([{ email: u1_mail, password: await bcrypt.hash(u1_pass, saltRounds) }, { email: u2_mail, password: await bcrypt.hash(u2_pass, saltRounds) }])
    } catch (e: any) {
        console.log(e);
    }
}

export async function getSeries(q: string, sortField: string, direction: number) {
    const sortDirection: SortDirection | undefined = direction === -1 ? -1 : direction === 1 ? 1 : undefined;
    const sort: Sort = sortField;
    const filter: Filter<Series> = q === "undefined" || q === "" ? {} : { name: new RegExp(q, "i")};
    return await serieCollection.find(filter).sort(sort, sortDirection).toArray();
}

export async function login(email: string, password: string) {
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

export async function getUser(email: string) {
    try {
        const user = await userCollection.findOne({ email: email });
        return user; // This will be `null` if no user is found.
    } catch (e: any) {
        console.error("Error fetching user:", e);
        throw e;
    }
}

export async function createSeries(series: Series) {
    await serieCollection.insertOne(series);
}

export async function connect() {
    try {
        await client.connect();
        await seedDatabase();
        process.on("SIGINT", client.close); 
    } catch (e: any) {
        console.log(e);
        client.close();
    }
}