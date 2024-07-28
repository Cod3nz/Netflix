import app from "./app";
import { connect } from "./database";

app.listen(app.get("port"), async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + app.get("port"));
    } catch (e: any) {
        console.log(e);
        process.exit(1);
    }
});