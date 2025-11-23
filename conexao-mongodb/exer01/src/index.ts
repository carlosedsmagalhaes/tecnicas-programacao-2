import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import connect from "./models/connection";

dotenv.config();

const app = express();
app.use(express.json());

connect();

app.use("/api", routes);

const port = process.env.PORT || process.env.APP_PORT || 3000;

app.listen(Number(port), () => {
	console.log(`Server listening on port ${port}`);
});

export default app;
