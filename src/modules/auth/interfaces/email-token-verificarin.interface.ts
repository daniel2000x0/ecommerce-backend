export interface EmailTokenVerification { 
    sub:number;
    email: string;
    type: 'EmailVerification';
}

export interface PasswordResetTokenVerification {
    sub:number;
    email: string;
    type: 'PasswordReset';
}

