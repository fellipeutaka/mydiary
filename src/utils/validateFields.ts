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
  const minMax = [6, 20];
  const passwordRegex = new RegExp(
    `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{${minMax.toString()}}$`
  );
  return !passwordRegex.test(password);
}
