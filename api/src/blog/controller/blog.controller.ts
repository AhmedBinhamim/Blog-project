import { Body, Controller, Post, Request } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';

@Controller('blog')
export class BlogController {

    constructor(private blogservice: BlogService){}

    @Post()
    create(@Body()blogEntry: BlogEntry, @Request() req): Observable<BlogEntry>{
        const user = req.user.user;
        return this.blogservice.create(user, blogEntry);
    }
}
