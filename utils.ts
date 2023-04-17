export const validateCardYearMonth = (value: string) => {
  if (value.length !== 5) {
    return "Wproawdź datę w formacie MM/RR";
  }

  const [month, year] = value.split("/");

  if (Number(month) < 1 || Number(month) > 12) {
    return "Wprowadź poprawny miesiąc";
  }

  return true;
};
