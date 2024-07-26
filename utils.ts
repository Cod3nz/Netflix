import { ObjectId } from "mongodb";
import { Series } from "./types";

export const TEST_SERIES_LIST : Series[] = [
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b3"),
        name: "Dummy Series 1",
        link: "https://www.dummyseries1.com",
        summary: "This is a dummy series 1",
        score: 8.5,
        category: "Action",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b4"),
        name: "Dummy Series 2",
        link: "https://www.dummyseries2.com",
        summary: "This is a dummy series 2",
        score: 7.5,
        category: "Biography",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b5"),
        name: "Dummy Series 3",
        link: "https://www.dummyseries3.com",
        summary: "This is a dummy series 3",
        score: 6.5,
        category: "Musical",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b6"),
        name: "Dummy Series 4",
        link: "https://www.dummyseries4.com",
        summary: "This is a dummy series 4",
        score: 9.5,
        category: "Family",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b7"),
        name: "Dummy Series 5",
        link: "https://www.dummyseries5.com",
        summary: "This is a dummy series 5",
        score: 8.0,
        category: "Western",
    }
];

// TODO: Implementeer deze functie aan de hand van een reduce functie.
export function getAverageScore(seriesList: Series[]): number {
    return 0;
}

// TODO: Implementeer deze functie aan de hand van een filter functie.
export function getSeriesByCategory(seriesList: Series[], category: string): Series[] {
    return [];
}