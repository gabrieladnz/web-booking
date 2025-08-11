export interface AuthLoginRequest {
    email: string;
    password: string;
}

export interface AuthLoginSuccessResponse {
    access_token: string;
    refresh_token: string;
}

export interface AuthLoginErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface AuthLogoutSuccessResponse {
    message: string;
}

export interface AuthLogoutErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface AuthRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
}

export interface AuthRegisterSuccessResponse {
    message: string;
}

export interface AuthRegisterErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}
