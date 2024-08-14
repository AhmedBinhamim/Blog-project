
export interface User{
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
}

export enum UserRole{
    ADMIN = 'admin',
    CHIEFEDITOR = 'chief',
    EDITOR = 'editor',
    USER = 'user',
}