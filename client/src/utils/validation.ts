export const validateEmail = (Email: string) => {
  if (Email.length < 1 || Email.length > 10) {
    return;
  }
};

export const validatePsw = (Password: string) => {
  if (Password.length < 1 || Password.length > 100) {
    return;
  }
};

export const confirmPassword = (psw: string, confirmPassword: string) => {
  if (psw === confirmPassword) {
    return;
  }
};
