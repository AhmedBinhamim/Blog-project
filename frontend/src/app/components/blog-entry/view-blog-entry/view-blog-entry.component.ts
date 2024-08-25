import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BlogEntry } from '../../../model/blog-entry.interface';
import { BlogService } from '../../../services/blog service/blog.service';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss']
})
export class ViewBlogEntryComponent implements OnInit {
  
  blogEntry!: Observable<BlogEntry>;

  constructor(private activatedRouter: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogEntry = this.activatedRouter.params.pipe(
      switchMap((params: Params) => {
        const blogEntryId: number = parseInt(params['id']);
        return this.blogService.findOne(blogEntryId).pipe(
          map((blogEntry: BlogEntry) => blogEntry)
        );
      })
    );
  }
}
