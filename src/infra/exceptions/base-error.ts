export class BaseError extends Error {
  httpCode: number;

  constructor(name: string, httpCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
  }
}
