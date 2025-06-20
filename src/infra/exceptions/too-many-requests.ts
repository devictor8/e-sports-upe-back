import { HttpStatusCode } from "./http-status-codes";
import { BaseError } from "./base-error";

export class TooManyRequest extends BaseError {
  constructor(description: string) {
    super("TOO MANY REQUEST", HttpStatusCode.TOO_MANY_REQUEST, description);
  }
}
