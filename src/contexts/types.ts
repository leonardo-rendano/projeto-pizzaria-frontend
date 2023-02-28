import { ReactNode } from "react";

export type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
}

export type SignInProps = {
    email: string;
    password: string
}

export type UserProps = {
    id: string;
    name: string;
    email: string;
}

export type AuthProviderProps = {
    children: ReactNode
}

export type SignUpProps = {
    name: string;
    email: string;
    password: string
}