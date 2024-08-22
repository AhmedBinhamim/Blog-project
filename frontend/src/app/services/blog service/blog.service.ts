import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from '../../model/blog-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  indexAll(page: number, size: number): Observable<BlogEntriesPageable>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get<BlogEntriesPageable>('/api/blog-entries', {params});
  }
}
