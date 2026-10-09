export function formatPhoneInput(value) {
  if (!value) return "";

  let digits = String(value).replace(/\D/g, "");

  if (digits.length === 0) return "";

  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  } else if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }

  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = "+7";

  if (rest.length >= 1) {
    result += " (" + rest.slice(0, 3);
    if (rest.length >= 3) {
      result += ")";
    }
    if (rest.length >= 4) {
      result += " " + rest.slice(3, 6);
    }
    if (rest.length >= 7) {
      result += " " + rest.slice(6, 8);
    }
    if (rest.length >= 9) {
      result += " " + rest.slice(8, 10);
    }
  }

  return result;
}

export function isValidPhone(value) {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 0) return false;
  let normalized = digits;
  if (normalized.startsWith("8")) normalized = "7" + normalized.slice(1);
  else if (!normalized.startsWith("7")) normalized = "7" + normalized;
  return normalized.length === 11;
}
