import Meteo from "./models/meteo";
import * as fs from 'fs'; 
import * as path from 'path';

type RawData = { [key: string]: any };

let rawMeteoData: RawData[] = [];

try {
  const csvFilePath = path.join(__dirname, '..', 'docs', 'Desafio_Dados_Meteorologicos.csv');
  
  const rawCSVString = fs.readFileSync(csvFilePath, 'utf-8');

  rawMeteoData = parseCSVData(rawCSVString);

} catch (error) {
  console.error("Não foi possível ler o arquivo CSV.", error);
  
}

function parseCSVData(csvString: string): RawData[] {
  const linhas = csvString.trim().split('\n');
  if (linhas.length <= 1) return []; 

  const cabeçalhos = linhas[0].split(';');
  const dados: RawData[] = [];

  const stringKeys = ['Date', 'Time'];

  for (let i = 1; i < linhas.length; i++) {
    const valores = linhas[i].split(';');
    if (valores.length !== cabeçalhos.length) {
      console.warn(` Linha ${i + 1} ignorada devido a número incorreto de colunas. Esperado: ${cabeçalhos.length}, Encontrado: ${valores.length}`);
      continue;
    }

    const item: RawData = {};
    for (let j = 0; j < cabeçalhos.length; j++) {
      const chave = cabeçalhos[j].trim();
      const valor = valores[j].trim();

      if (stringKeys.includes(chave)) {
        item[chave] = valor;
        continue;
      }
      
      const sanitizedValor = valor.replace(',', '.'); 
      const numValor = parseFloat(sanitizedValor);
      item[chave] = isNaN(numValor) ? valor : numValor;
    }
    dados.push(item);
  }

  return dados;
}

const meteoData: Meteo[] = rawMeteoData.map(data => new Meteo(data as any));

function calcularMedia(array: number[]): number {
  if (array.length === 0) return 0;
  const soma = array.reduce((acc, val) => acc + val, 0);
  return soma / array.length;
}



function rankingTemperaturas() {
  console.log("\n(c) 5 Dias com as mais altas temperaturas:");

  const sortedByTemp = [...meteoData].sort((a, b) => {
    if (b.Temp_C !== a.Temp_C) {
      return b.Temp_C - a.Temp_C;
    }

    return a.Date.localeCompare(b.Date);
  });

  const top5Temperatures: { temp: number, items: Meteo[] }[] = [];
  let currentTemp = -Infinity;
  let count = 0;

  for (const item of sortedByTemp) {
    if (item.Temp_C > currentTemp) {
      if (count < 5) {
        top5Temperatures.push({ temp: item.Temp_C, items: [item] });
        currentTemp = item.Temp_C;
        count++;
      }
    } else if (item.Temp_C === currentTemp && top5Temperatures.length > 0) {
      top5Temperatures[top5Temperatures.length - 1].items.push(item);
    } else {
      if (count < 5) {
        top5Temperatures.push({ temp: item.Temp_C, items: [item] });
        currentTemp = item.Temp_C;
        count++;
      }
    }
  }

  const topResults = top5Temperatures.flatMap(group => group.items)
    .sort((a, b) => b.Temp_C - a.Temp_C || a.Date.localeCompare(b.Date));


  let resultCount = 0;
  topResults.forEach(item => {
    if (resultCount < 5 || item.Temp_C === topResults[4]?.Temp_C) {
        console.log(`  Data: ${item.Date} | Hora: ${item.Time} | Temperatura: ${item.Temp_C}°C`);
        resultCount++;
    }
  });

  if (topResults.length === 0) {
    console.log("  Nenhum dado encontrado.");
  }
}

function mediaTemperaturas() {
  const todasTemps = meteoData.map(d => d.Temp_C);
  const mediaTemps = calcularMedia(todasTemps);

  console.log(`\n(d) Média de todas as temperaturas cadastradas:`);
  console.log(`  Média: ${mediaTemps.toFixed(2)}°C`);
}

function mediaVentos() {
  const todasWindSpeedsAvg = meteoData.map(d => d.WindSpeed_Avg);
  const mediaDasMediasDeVento = calcularMedia(todasWindSpeedsAvg);

  console.log(`\n(e) Média geral das médias de vento cadastradas (WindSpeed_Avg):`);
  console.log(`  Média Geral: ${mediaDasMediasDeVento.toFixed(2)} m/s`);
}

function rankingPressaoAtmosferica() {
  console.log("\n(f) 3 dias com as maiores medições de pressão atmosférica:");

  const sortedByPress = [...meteoData].sort((a, b) => {
    if (b.Press_Bar !== a.Press_Bar) {
      return b.Press_Bar - a.Press_Bar;
    }
    return a.Date.localeCompare(b.Date);
  });

  const top3Pressures: { press: number, items: Meteo[] }[] = [];
  let currentPress = -Infinity;
  let count = 0;

  for (const item of sortedByPress) {
    if (item.Press_Bar > currentPress) {
      if (count < 3) {
        top3Pressures.push({ press: item.Press_Bar, items: [item] });
        currentPress = item.Press_Bar;
        count++;
      }
    } else if (item.Press_Bar === currentPress && top3Pressures.length > 0) {
      top3Pressures[top3Pressures.length - 1].items.push(item);
    } else {
      if (count < 3) {
        top3Pressures.push({ press: item.Press_Bar, items: [item] });
        currentPress = item.Press_Bar;
        count++;
      }
    }
  }

  const topResults = top3Pressures.flatMap(group => group.items)
    .sort((a, b) => b.Press_Bar - a.Press_Bar || a.Date.localeCompare(b.Date));

  let resultCount = 0;
  topResults.forEach(item => {
    if (resultCount < 3 || item.Press_Bar === topResults[2]?.Press_Bar) {
      console.log(`  Data: ${item.Date} | Hora: ${item.Time} | Pressão: ${item.Press_Bar} Bar`);
      resultCount++;
    }
  });

  if (topResults.length === 0) {
    console.log("Nenhum dado encontrado.");
  }
}

function mediaUmidadeAr() {
  const todasUmidades = meteoData.map(d => d.Hum_percent);
  const mediaUmidade = calcularMedia(todasUmidades);

  console.log(`\n(g) Média geral do percentual de umidade do ar:`);
  console.log(`  Média: ${mediaUmidade.toFixed(2)}%`);
}

function main() {
  if (meteoData.length === 0) {
    console.log("Nenhum dado meteorológico carregado.");
    return;
  }
  
  rankingTemperaturas();
  mediaTemperaturas();
  mediaVentos();
  rankingPressaoAtmosferica();
  mediaUmidadeAr();

  console.log("\n===================================================================");
}

main();