import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BlogEntriesPageable } from '../../../model/blog-entry.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent {

  @Input() blogEntries!: BlogEntriesPageable;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();


  
  pageEvent: PageEvent | undefined;

  constructor(private router: Router) {}

  

  onPaginateChange(event: PageEvent){
    event.pageIndex = event.pageIndex + 1
    this.paginate.emit(event);
  }

  navigate(id: any){
    this.router.navigateByUrl('blog-entries/' + id);
  }
}
