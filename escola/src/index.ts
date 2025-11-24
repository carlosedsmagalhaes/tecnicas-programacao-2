import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import connect from "./models/connection";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connect();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
