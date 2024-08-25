import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog service/blog.service';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-create-blog-entry',
  templateUrl: './create-blog-entry.component.html',
  styleUrl: './create-blog-entry.component.scss'
})
export class CreateBlogEntryComponent implements OnInit {

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
  ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [{value: null, disabled: true}],
        title: [null, [Validators.required]],
        slug: [{value: null, disabled: true}],
        description: [null, [Validators.required]],
        body: [null, [Validators.required]],
        headerImage: [null, [Validators.required]]
      })
  }

  post(){
    this.blogService.post(this.form.getRawValue()).subscribe();
  }

  onClick(){

  }

  uploadFile(){
    
  }
}
