export default class Meteo {
  Date: string;
  Time: string;
  Temp_C: number;
  Hum_percent: number;
  Press_Bar: number;
  TempCabine_C: number;
  Charge: number;
  SR_Wm2: number;
  WindPeak_ms: number;
  WindSpeed_Inst: number;
  WindSpeed_Avg: number;
  WindDir_Inst: number;
  WindDir_Avg: number;

  constructor(data: {
    Date: string;
    Time: string;
    Temp_C: number;
    Hum: number;
    Press_Bar: number;
    TempCabine_C: number;
    Charge: number;
    SR_Wm2: number;
    WindPeak_ms: number;
    WindSpeed_Inst: number;
    WindSpeed_Avg: number;
    WindDir_Inst: number;
    WindDir_Avg: number;
  }) {
    this.Date = data.Date;
    this.Time = data.Time;
    this.Temp_C = data.Temp_C;
    this.Hum_percent = data.Hum;
    this.Press_Bar = data.Press_Bar;
    this.TempCabine_C = data.TempCabine_C;
    this.Charge = data.Charge;
    this.SR_Wm2 = data.SR_Wm2;
    this.WindPeak_ms = data.WindPeak_ms;
    this.WindSpeed_Inst = data.WindSpeed_Inst;
    this.WindSpeed_Avg = data.WindSpeed_Avg;
    this.WindDir_Inst = data.WindDir_Inst;
    this.WindDir_Avg = data.WindDir_Avg;
  }
}
