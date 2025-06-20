import { BaseError } from "./base-error";
import { HttpStatusCode } from "./http-status-codes";

export class ServiceUnavailable extends BaseError {
  constructor(description: string) {
    super(
      "SERVICE UNAVAILABLE",
      HttpStatusCode.SERVICE_UNAVAILABLE,
      description
    );
  }
}
