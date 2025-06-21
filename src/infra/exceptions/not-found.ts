import { BaseError } from "./base-error";
import { HttpStatusCode } from "../http-status-codes";

export class NotFound extends BaseError {
  constructor(description: string) {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, description);
  }
}
