import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
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
        const user = req.user;
        return this.blogservice.create(user, blogEntry);
    }

    @Get()
    findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]>{
        if(userId == null){
            return this.blogservice.findAll();
        }
        else {
            return this.blogservice.findByUser(userId);
        }
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<BlogEntry>{
        return this.blogservice.findOne(id)
    }
}
