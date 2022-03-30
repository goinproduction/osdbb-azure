import { ISignUp, ISignIn, IDataResponse } from "../interfaces";
import { User } from "../models/user.model";
import { getRepository } from "typeorm";
import { sendConfirmationEmail } from "../configs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS as string));

interface IUserService {
  register(data: ISignUp): Promise<IDataResponse>;
  confirmation(token: string): Promise<boolean>;
  login(data: ISignIn): Promise<IDataResponse>;
  successLogin(data: any): Promise<IDataResponse>;
}

export default class UserService implements IUserService {
  public async register(data: ISignUp) {
    return new Promise<IDataResponse>(async (resolve, reject) => {
      try {
        const userRepository = getRepository(User);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        const isEmailExisted = await userRepository.findOne({
          email: data.email,
        });
        const isUsernameExisted = await userRepository.findOne({
          username: data.username,
        });

        if (isEmailExisted || isUsernameExisted) {
          const error: IDataResponse = {
            message: "Email or username has already existed",
            success: false,
          };
          resolve(error);
        }

        const token = jwt.sign(
          {
            userId: data.email,
          },
          process.env.ACCESS_TOKEN_SECRET as string
        );

        const newUser = await userRepository.create({
          username: data.username,
          password: hashedPassword,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          activateToken: token,
        });

        userRepository
          .save(newUser)
          .then(() => {
            sendConfirmationEmail(data.fullName, data.email, token);
            const response: IDataResponse = {
              success: true,
              message: "Please verify your email address",
            };
            resolve(response);
          })
          .catch(() => {
            let error: IDataResponse = {
              success: false,
              message: "An error occured while saving data to database",
            };
            resolve(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public async confirmation(token: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const userRepository = getRepository(User);
        const isValidToken = await userRepository
          .createQueryBuilder()
          .select("users")
          .addSelect("users.activateToken")
          .from(User, "users")
          .where("users.activateToken = :activateToken", {
            activateToken: token,
          })
          .getOne();
        if (isValidToken) {
          await userRepository.update(
            { activateToken: token },
            { isActive: true }
          );
          resolve(true);
        }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async login(data: ISignIn) {
    return new Promise<IDataResponse>(async (resolve, reject) => {
      try {
        const userRepository = getRepository(User);
        const user = await userRepository
          .createQueryBuilder()
          .select("users")
          .addSelect("users.password")
          .from(User, "users")
          .where("users.username = :username", {
            username: data.username,
          })
          .getOne();

        if (!user) {
          const error: IDataResponse = {
            success: false,
            message: "Invalid username or password",
          };
          resolve(error);
        } else {
          if (!user.isActive) {
            const error: IDataResponse = {
              success: false,
              message: "Please verify your email address",
            };

            resolve(error);
          } else {
            const isValidPassword = bcrypt.compareSync(
              data.password,
              user.password
            );

            if (!isValidPassword) {
              let error: IDataResponse = {
                message: "Invalid username or password",
                success: false,
              };

              resolve(error);
            }

            const token = jwt.sign(
              { id: user.id },
              process.env.ACCESS_TOKEN_SECRET as string,
              { expiresIn: "1d" }
            );

            const serializeUser = {
              id: user.id,
              username: user.username,
              email: user.email,
              fullName: user.fullName,
              phoneNumber: user.phoneNumber,
              avatar: user.avatar,
              role: user.role,
              win: user.win,
              lose: user.lose,
              winRate: user.winRate,
              debt: user.debt,
              isActive: user.isActive,
              createdAt: user.createdAt,
            };

            const response: IDataResponse = {
              success: true,
              data: {
                accessToken: token,
                user: serializeUser,
              },
            };

            resolve(response);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public async successLogin(data: any) {
    return new Promise<IDataResponse>(async (resolve, reject) => {
      try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
          email: data.emails[0].value,
        });
        if (user) {
          const token = jwt.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "1d" }
          );
          const response: IDataResponse = {
            success: true,
            data: {
              accessToken: token,
              user,
            },
          };

          resolve(response);
        } else {
          const newUser = await userRepository.create({
            fullName: data.displayName,
            email: data.emails[0].value,
            avatar: data.photos[0].value,
            isActive: true,
          });

          await userRepository
            .save(newUser)
            .then(async () => {
              const dbUser = await userRepository.findOne({
                email: data.emails[0].value,
              });
              const token = jwt.sign(
                { id: dbUser?.id },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: "1d" }
              );
              const response: IDataResponse = {
                success: true,
                data: {
                  accessToken: token,
                  user: dbUser,
                },
              };

              resolve(response);
            })
            .catch((err) => {
              let error: IDataResponse = {
                success: false,
                message: "An error occured while saving data to database",
              };

              resolve(error);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
