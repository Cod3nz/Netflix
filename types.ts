import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password?: string;
}

export interface Series {
    _id?: ObjectId;
    name: string;
    link: string;
    summary: string;
    score: number;
    category: string;
}