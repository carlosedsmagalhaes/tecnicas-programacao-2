const nextMonthFull = (dataNasc: Date):string => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const month:number = dataNasc.getMonth();
    const nextMonthFull:string = months[month < 11 ? month + 1 : 0]; //Se o mês de entrada for dezembro [11], o índice será 0, que corresponde ao mês de Janeiro

    return nextMonthFull;


}


export default nextMonthFull;


/* const dataNasc:Date = new Date('2003-09-10')
const discount = nextMonthFull(dataNasc);
console.log(discount); */