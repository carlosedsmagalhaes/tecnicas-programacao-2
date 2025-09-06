import fs from "fs";
import calculateDiscount from "./CalculateDiscount";
import nextMonthFull from "./NextMonthFull";
import Dado from "../interfaces/IDados";


const formatHTML = async (dados: Dado[]): Promise<Dado[]> => {
  const caminho = "./docs/Mensagem.html";
  const htmlString = fs.readFileSync(caminho, "utf8");

  const dadosComHtml: Dado[] = [];
  let itemHtml = "";

  dados.forEach((e) => {
    itemHtml = htmlString.replace("{{nome}}", e.nome);
    itemHtml = itemHtml.replace("{{percdesc}}", calculateDiscount(e.data_nasc).toString());
    itemHtml = itemHtml.replace("{{mesquevem}}", nextMonthFull(e.data_nasc).toString());
    dadosComHtml.push({ ...e, arquivoHTML: itemHtml });
  });

  return dadosComHtml;
};


export default formatHTML;


/* (async () => {
  const lista: Dado[] = [
    { nome: "João", email: "joao@email.com", data_nasc: new Date("2000-01-01"), arquivoHTML: "" },
    { nome: "Maria", email: "maria@email.com", data_nasc: new Date("1995-05-05"), arquivoHTML: "" },
  ];

  const resultado = await formatHTML(lista);

  console.log(resultado);
})(); */

