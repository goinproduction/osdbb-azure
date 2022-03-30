import UserValidator from "../validators/user.validator";
import { Request, Response, NextFunction } from "express";
import ResponseHelper from "../utils/response";

const userValidator = new UserValidator();

export async function registerValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const responseHelper = new ResponseHelper(res);
  try {
    const validated = await userValidator.registerSchema.validateAsync(
      req.body
    );
    req.body = validated;
    next();
  } catch (err) {
    responseHelper.badRequest("Invalid format, please try again");
  }
}
