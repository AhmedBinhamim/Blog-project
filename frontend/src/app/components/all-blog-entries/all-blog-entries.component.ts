import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from '../../model/blog-entry.interface';
import { BlogService } from '../../services/blog service/blog.service';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  dataSource!: Observable<BlogEntriesPageable>;
  
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.dataSource = this.blogService.indexAll(1, 10);
  }

  onPaginateChange(){
    
  }
}
