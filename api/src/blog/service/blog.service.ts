import { Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/models/user.interface';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

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

    paginateAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>>{
        return from(paginate<BlogEntry>(this.blogRepository, options, {
            relations: ['author']
        })).pipe(
            map((blogEntries: Pagination<BlogEntry>) => blogEntries)
        )
    }

    paginateByUser(options: IPaginationOptions, userId: number): Observable<Pagination<BlogEntry>> {
        return from(paginate<BlogEntry>(this.blogRepository, options, {
            relations: ['author'],
            where: {
                author: { id: userId } as any  
            },
        })).pipe(
            map((blogEntries: Pagination<BlogEntry>) => blogEntries)
        )
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
        return from(this.blogRepository.update(id, blogEntry)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

    deleteOne(id: number): Observable<any>{
        return from(this.blogRepository.delete(id));
    }

    generateSlug(title: string): Observable<string>{
        return of(slugify(title));
    }
}
