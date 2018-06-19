import Big from 'big.js';

function getSymbolForCurrency(currency) {
  if (currency === 'USD') {
    return '$';
  } else if (currency === 'EUR') {
    return '€';
  } else if (currency === 'GBP') {
    return '£';
  } else if (currency === 'INR') {
    return '₹';
  }
  return '$';
}

/**
 * Will convert a valid number or string representation of a number to a Big.js object
 * Edge conditions:
 * - If input is already a Big, it will just return that.
 * - If none of the above, and defaultValue is provided, it will be returned
 * - If none of the above, the original input will be returned.
 * @param {*} input Value to convert
 * @param {Big} defaultValue (optional) Value to use if cannot convert
 * @returns {*} See above
 */
function convertToBig(input, defaultValue) {
  if (input instanceof Big) {
    return input;
  } else if (!Number.isNaN(parseFloat(input)) && Number.isFinite(parseFloat(input))) {
    return Big(parseFloat(input));
  } else if (defaultValue) {
    return defaultValue;
  }

  return input;
}

export {
  getSymbolForCurrency,
  convertToBig
};
