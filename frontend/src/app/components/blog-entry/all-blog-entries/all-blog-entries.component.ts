import { Component, Input, OnInit, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BlogEntriesPageable } from '../../../model/blog-entry.interface';
import { Router } from '@angular/router';
import { WINDOW } from '../../../window-token';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  origin: string = '';
  @Input() blogEntries: BlogEntriesPageable | null = null;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  pageEvent: PageEvent | undefined;

  constructor(
    private router: Router,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.origin = this.window.location.origin;
    } else {
      this.origin = '';
    }
  }
  

  onPaginateChange(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.paginate.emit(event);
  }

  navigate(id: any) {
    this.router.navigateByUrl('blog-entries/' + id);
  }
}
