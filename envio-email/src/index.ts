import readCSV from "./ExtractDataCSV";
import formatHTML from "./FormatHTML";
import sendEmail from "./SendEmail";
import Dado from "../interfaces/IDados";

(async () => {
  try {
    const dados: Dado[] = (await readCSV("./docs/emails.csv")) as Dado[];
    const dadosComHTML: Dado[] = await formatHTML(dados);
    await sendEmail(dadosComHTML);
    console.log("Processo concluído.");
  } catch (err) {
    console.error("Erro no processo:", err);
  }
})();
