// ═══════════════════════════════════════════════════════════════════════════
// Маска ввода телефона в российском формате: +7 (XXX) XXX XX XX
// ═══════════════════════════════════════════════════════════════════════════
//
// Принимает произвольный ввод (цифры, +, пробелы, скобки, дефисы), извлекает
// только цифры, нормализует код страны (8 → 7, отсутствие → 7) и форматирует.
//
// Примеры:
//   ""              → ""
//   "9"             → "+7 (9"
//   "935"           → "+7 (935"
//   "9352"          → "+7 (935) 2"
//   "9352314"       → "+7 (935) 231 4"
//   "93523145"       → "+7 (935) 231 45"
//   "9352314587"     → "+7 (935) 231 45 87"
//   "+79352314587"   → "+7 (935) 231 45 87"
//   "8 935 231 45 87" → "+7 (935) 231 45 87"
//
// Также доступна функция isValidPhone() для проверки, что телефон полностью введён.
// ═══════════════════════════════════════════════════════════════════════════

export function formatPhoneInput(value) {
  if (!value) return "";

  // Извлекаем только цифры
  let digits = String(value).replace(/\D/g, "");

  if (digits.length === 0) return "";

  // Нормализуем код страны:
  //   - Если первая цифра 8 (привычка набирать с восьмёрки) → меняем на 7
  //   - Если первая цифра не 7 и не 8 (пользователь начал с 9...) → prepend 7
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  } else if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }

  // Ограничиваем 11 цифрами (код страны + 10 цифр номера)
  digits = digits.slice(0, 11);

  // Собираем маску +7 (XXX) XXX XX XX
  const rest = digits.slice(1); // всё после кода страны (до 10 цифр)
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

// Проверяет, что телефон полностью введён (11 цифр, после нормализации)
export function isValidPhone(value) {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 0) return false;
  // Нормализуем как в formatPhoneInput, чтобы проверить итоговое количество
  let normalized = digits;
  if (normalized.startsWith("8")) normalized = "7" + normalized.slice(1);
  else if (!normalized.startsWith("7")) normalized = "7" + normalized;
  return normalized.length === 11;
}
