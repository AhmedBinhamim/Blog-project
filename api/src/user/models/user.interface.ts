
import { BlogEntryEntity } from "src/blog/model/blog-entry.entity"; // Ensure this import is correct

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
    blogEntries?: BlogEntryEntity[]; // Make sure this type matches your entity
}

export enum UserRole{
    ADMIN = 'admin',
    CHIEFEDITOR = 'chief',
    EDITOR = 'editor',
    USER = 'user',
}