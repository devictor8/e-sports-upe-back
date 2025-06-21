import { BaseError } from "./base-error";
import { HttpStatusCode } from "../http-status-codes";

export class Forbidden extends BaseError {
  constructor(description: string) {
    super("FORBIDDEN", HttpStatusCode.FORBIDDEN, description);
  }
}
