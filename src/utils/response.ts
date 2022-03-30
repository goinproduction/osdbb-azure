import { Response } from "express";
import http from "http";

export default class ResponseHelper {
  public res: Response;

  constructor(initValue: Response) {
    this.res = initValue;
  }

  // @ts-ignore
  ok(data, message?: string) {
    return this.res.status(200).json({
      data,
      message,
    });
  }

  successVerify(message: string) {
    return this.res.status(200).json({
      message,
    });
  }

  created(message?: string) {
    return this.res.status(201).json({
      message,
    });
  }

  badRequest(error: string) {
    return this.res.status(400).json({
      error,
    });
  }

  forbidden(error: string = http.STATUS_CODES[403] as string) {
    return this.res.status(403).json({
      error,
    });
  }

  notFound(error: string = http.STATUS_CODES[404] as string) {
    return this.res.status(400).json({
      error,
    });
  }

  internalServerError(error: string = http.STATUS_CODES[500] as string) {
    return this.res.status(500).json({
      error,
    });
  }

  unauthorized(error: string) {
    return this.res.status(403).json({
      error,
    });
  }
}
