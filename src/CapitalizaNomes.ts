import fs from "fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";

const arquivo: string = "./docs/nomes.csv";
const arquivoSaida: string = "./docs/nomes_capitalizados.csv";

const lerCSV = (arquivo: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const nomes: string[] = [];

    fs.createReadStream(arquivo)
      .pipe(parse({ skip_empty_lines: true }))
      .on("data", (row) => {
        nomes.push(row[0]);
      })
      .on("end", () => {
        resolve(nomes);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const capitalizarNome = (nomes: string[]): string[] => {
  const excecao: string[] = ["DA", "DE", "DO", "DAS", "DOS", "E"];

  return nomes.map((nome) => {
    return nome
      .split(" ")
      .map((parte) =>
        excecao.includes(parte.toUpperCase())
          ? parte.toLowerCase()
          : parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()
      )
      .join(" ");
  });
};

const escreverCSV = (nomes: string[], arquivo: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    stringify(
      nomes.map((nome) => [nome]),
      (err, output) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFile(arquivo, output, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      }
    );
  });
};

(async () => {
  try {
    let nomes = await lerCSV(arquivo);
    nomes = capitalizarNome(nomes);
    await escreverCSV(nomes, arquivoSaida);
    console.log("CSV capitalizado gerado com sucesso!");
  } catch (err) {
    console.error("Erro:", err);
  }
})();
