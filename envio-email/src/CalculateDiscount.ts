const calculateDiscount = (dataNasc: Date):number => {
    const today:Date = new Date()
    const diff:number = today.getTime() - dataNasc.getTime() ; 
    const idade:number = diff / (1000 * 60 * 60 * 24 * 365.25);
    const discount:number = Math.floor(idade);
    return discount;
}


export default calculateDiscount;



const dataNasc:Date = new Date('2003-09-10')
const discount = calculateDiscount(dataNasc);
console.log(discount);


