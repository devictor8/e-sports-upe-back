import { BaseError } from "./base-error";
import { HttpStatusCode } from "./http-status-codes";

export class BadGateway extends BaseError {
  constructor(description: string) {
    super("BAD GATEWAY", HttpStatusCode.BAD_GATEWAY, description);
  }
}
