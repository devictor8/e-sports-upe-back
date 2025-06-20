import { BaseError } from "./base-error";
import { HttpStatusCode } from "./http-status-codes";

export class Unauthorized extends BaseError {
  constructor(description: string) {
    super("UNAUTHORIZED", HttpStatusCode.UNAUTHORIZED, description);
  }
}
