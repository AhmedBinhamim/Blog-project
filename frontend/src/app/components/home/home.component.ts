import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from '../../model/blog-entry.interface';
import { BlogService } from '../../services/blog service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  blogEntries$: Observable<BlogEntriesPageable> | undefined;
  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogEntries$ = this.blogService.indexAll(1, 10);
  }

  onPaginateChange(event: PageEvent){
    this.blogEntries$ = this.blogService.indexAll(event.pageIndex, event.pageSize);
  }
}
