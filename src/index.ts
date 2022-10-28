import { AppDataSource } from "./data-source";
import express from "express";
import routes from "./infra/routes";

var cors = require('cors');

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors())
  app.use(express.json());

  app.use(routes);

  return app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}.`)
    console.log(`Banco de dados "${process.env.DB_NAME}" conectado.`)
  });
}).catch((error) => console.log(error))
