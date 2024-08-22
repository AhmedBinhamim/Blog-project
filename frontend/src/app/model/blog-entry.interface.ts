import { User } from "../services/authentication service/authentication.service";

export interface BlogEntry {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: User;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}