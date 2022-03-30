import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';

export const middlewares = [
    express.json(),
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY as string]
    }),
    passport.initialize(),
    passport.session(),
    morgan('combined'),
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
];
