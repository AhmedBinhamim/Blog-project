import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BlogEntry } from '../../../model/blog-entry.interface';
import { BlogService } from '../../../services/blog service/blog.service';
import { WINDOW } from '../../../window-token';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss']
})
export class ViewBlogEntryComponent implements OnInit {

  origin: string = '';
  blogEntry!: Observable<BlogEntry>;

  constructor(
    private activatedRouter: ActivatedRoute, 
    private blogService: BlogService,  
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.origin = this.window.location.origin;
    }
  }

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
