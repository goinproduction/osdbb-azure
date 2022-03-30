import { Request, Response } from 'express';
import { ISignUp, ISignIn } from '../interfaces';
import UserService from '../services/user.service';
import ResponseHelper from '../utils/response';

export default class UserController {
    private userService: UserService = new UserService();

    handleRegister = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            const clientData: ISignUp = {
                username: req.body.username,
                password: req.body.password,
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email
            };

            const registerResponseData = await this.userService.register(
                clientData
            );

            if (registerResponseData.success) {
                responseHelper.created(registerResponseData.message);
            } else {
                responseHelper.badRequest(
                    registerResponseData.message as string
                );
            }
        } catch (error) {
            responseHelper.internalServerError();
        }
    };

    handleConfirmation = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            const token = req.params.activateToken;
            const confirmationResponseData =
                await this.userService.confirmation(token);
            if (confirmationResponseData) {
                responseHelper.successVerify('Account has been activated');
            } else {
                responseHelper.notFound();
            }
        } catch (error) {
            responseHelper.internalServerError();
        }
    };

    handleLogin = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            const clientData: ISignIn = {
                username: req.body.username,
                password: req.body.password
            };
            const loginResponseData = await this.userService.login(clientData);
            if (loginResponseData.success) {
                responseHelper.ok(loginResponseData.data);
            } else {
                responseHelper.badRequest(loginResponseData.message as string);
            }
        } catch (error) {
            responseHelper.internalServerError();
        }
    };

    handleSuccessLogin = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            const data = req.user;
            const loginResponseData = await this.userService.successLogin(data);
            if (loginResponseData.success) {
                responseHelper.ok(loginResponseData.data);
            } else {
                responseHelper.badRequest(loginResponseData.message as string);
            }
        } catch (error) {
            responseHelper.internalServerError();
        }
    };

    handleFailedLogin = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            responseHelper.forbidden();
        } catch (error) {
            responseHelper.internalServerError();
        }
    };

    handleLogout = async (req: Request, res: Response) => {
        const responseHelper = new ResponseHelper(res);
        try {
            req.logout();
            res.redirect(process.env.CLIENT_URL as string);
        } catch (error) {
            responseHelper.internalServerError();
        }
    };
}
