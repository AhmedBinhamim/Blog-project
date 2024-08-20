import { Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/models/user.interface';

const slugify = require('slugify');

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntryEntity) private readonly blogRepository: Repository<BlogEntry>,
        private userService: UserService
    ){}

    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry>{
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry))
            })
        )
    }

    findAll(): Observable<BlogEntry[]>{
        return from(this.blogRepository.find({relations: ['author']}));
    }

    findByUser(userId: number): Observable<BlogEntry[]>{
        return from(
            this.blogRepository.find({
                where: {
                    author: { id: userId } as any  
                },
                relations: ['author']
            })).pipe(
                map((blogEntries: BlogEntry[]) => blogEntries)
            )
    }

    findOne(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({
            where: { id },
            relations: ['author']
        }));
    }

    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>{
        return 
    }

    generateSlug(title: string): Observable<string>{
        return of(slugify(title));
    }
}
