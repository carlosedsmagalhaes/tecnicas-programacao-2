import fs from "fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";

const arquivo: string = "./docs/emails.csv";
const readCSV = (arquivo: string): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const dados: Object[] = [];

    fs.createReadStream(arquivo)
      .pipe(parse({ delimiter: ";", columns: (header: string[]) =>
    header.map((col) => col.replace(/^\uFEFF/, "").trim().toLowerCase()), skip_empty_lines: true }))
      .on("data", (row) => {    
        dados.push({nome: row.nome, email: row.email, data_nasc: row.nasc,});
      })
      .on("end", () => {
        resolve(dados);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};


(async () => {
  try {
    let dados = await readCSV(arquivo);    
    console.log(dados)
    console.log("CSV lido com sucesso.");
  } catch (err) {
    console.error("Erro:", err);
  }
})();




