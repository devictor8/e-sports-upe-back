import { BaseError } from "./base-error";
import { HttpStatusCode } from "../http-status-codes";

export class MethodNotAllowed extends BaseError {
  constructor(description: string) {
    super("METHOD NOT ALLOWED", HttpStatusCode.METHOD_NOT_ALLOWED, description);
  }
}
