function parseDate(dateStr: string): Date {
  const [dia, mes, ano] = dateStr.split("/");
  return new Date(`${ano}-${mes}-${dia}`);
}

export default parseDate;