import { BaseError } from "./base-error";
import { HttpStatusCode } from "./http-status-codes";

export class GatewayTimeout extends BaseError {
  constructor(description: string) {
    super("GATEWAY TIMEOUT", HttpStatusCode.GATEWAY_TIMEOUT, description);
  }
}
