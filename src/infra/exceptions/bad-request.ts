import { BaseError } from "./base-error.js";
import { HttpStatusCode } from "./http-status-codes";

export class BadRequest extends BaseError {
  constructor(description: string) {
    super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, description);
  }
}
