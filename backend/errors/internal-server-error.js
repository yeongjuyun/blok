import { CustomError } from "./";

// 400 code
class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

export { InternalServerError };
