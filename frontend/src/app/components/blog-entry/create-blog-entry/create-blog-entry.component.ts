import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog service/blog.service';
import { catchError, map, of, tap } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { WINDOW } from '../../../window-token';
import { isPlatformBrowser } from '@angular/common';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-create-blog-entry',
  templateUrl: './create-blog-entry.component.html',
  styleUrls: ['./create-blog-entry.component.scss']
})
export class CreateBlogEntryComponent implements OnInit {

  origin: string = ''; // Initialize origin as an empty string
  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      title: [null, [Validators.required]],
      slug: [{ value: null, disabled: true }],
      description: [null, [Validators.required]],
      body: [null, [Validators.required]],
      headerImage: [null, [Validators.required]]
    });

    // Set the origin based on the platform
    if (isPlatformBrowser(this.platformId)) {
      this.origin = this.window.location.origin;
    } else {
      this.origin = '';
    }
  }

  post() {
    this.blogService.post(this.form.getRawValue()).pipe(
      tap(() => this.router.navigate(['../']))
    ).subscribe();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.blogService.uploadHeaderImage(formData).pipe(
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed, try again');
      })
    ).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        this.form.patchValue({ headerImage: event.body.filename });
      }
    });
  }
}
