function getSymbolForCurrency(currency) {
  if (currency === 'USD') {
    return '$';
  } else if (currency === 'EUR') {
    return '€';
  }
  return '$';
}

export default getSymbolForCurrency;
