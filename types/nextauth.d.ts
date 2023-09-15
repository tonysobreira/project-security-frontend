import { DefaultSession, DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
    email?: string;
    username?: string;
    roles?: Array<string>;
    accessToken?: string;
}

declare module 'next-auth' {
    interface User extends IUser {}
    interface Session {
        user?: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends IUser {
        refreshTokenExpires?: number;
        accessTokenExpires?: number;
        accessToken?: string;
        tokenType: string;
        iat?: number;
        exp?: number;
        jti?: string;
    }
}
