import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Controller('blogs')
export class BlogController {

    constructor(private blogservice: BlogService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()blogEntry: BlogEntry, @Request() req): Observable<BlogEntry>{
        const user = req.user.user;
        return this.blogservice.create(user, blogEntry);
    }
}
