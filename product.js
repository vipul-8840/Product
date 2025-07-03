function processData(data) {
  const normalizedValidCodes = [];
  let validCount = 0;
  let invalidCount = 0;

  for (let code of data) {
    if (typeof code !== 'string' || code.length !== 7) {
      invalidCount++;
      continue;
    }

    const letters = code.slice(0, 3);
    const digits = code.slice(3);

    let isValid = true;

    // Check first 3 characters are letters
    for (let i = 0; i < 3; i++) {
      const char = letters[i];
      if (!(char >= 'A' && char <= 'Z') && !(char >= 'a' && char <= 'z')) {
        isValid = false;
        break;
      }
    }

    // Check last 4 characters are digits and  increasing
    if (isValid) {
      for (let i = 0; i < 4; i++) {
        const ch = digits[i];
        if (!(ch >= '0' && ch <= '9')) {
          isValid = false;
          break;
        }
        if (i > 0 && digits[i] < digits[i - 1]) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      normalizedValidCodes.push(letters.toUpperCase() + digits);
      validCount++;
    } else {
      invalidCount++;
    }
  }

  normalizedValidCodes.sort();

  return {
    totalCodes: data.length,
    validCodes: validCount,
    invalidCodes: invalidCount,
    normalizedValidCodes
  };
}

module.exports = { processData };
