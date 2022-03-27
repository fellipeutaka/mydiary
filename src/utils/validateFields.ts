export function validateName(name: string) {
  const minMax = [2, 46];
  const nameRegex = new RegExp(
    `^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{${minMax.toString()}}$`
  );
  return !nameRegex.test(name);
}

export function validateEmail(email: string) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !emailRegex.test(email);
}

export function validatePassword(password: string) {
  // Password must be 6-32 characters in length and must contain at least one lower case character, one upper case character and one number.
  const minMax = [6, 32];
  const passwordRegex = new RegExp(
    `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{${minMax.toString()}}$`
  );
  return !passwordRegex.test(password);
}
