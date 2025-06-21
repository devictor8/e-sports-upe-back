import { BaseError } from "./base-error";
import { HttpStatusCode } from "../http-status-codes";

export class Conflict extends BaseError {
  constructor(description: string) {
    super("CONFLICT", HttpStatusCode.CONFLICT, description);
  }
}
