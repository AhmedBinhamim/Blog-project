import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication service/authentication.service';
import { UserService } from '../../services/user service/user.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { User } from '../../model/user.interface';
import { WINDOW } from '../../window-token';
import { isPlatformBrowser } from '@angular/common';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  origin: string = '';

  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.origin = this.window.location.origin;
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      profileImage: [null]
    });

    this.authService.getUserId().pipe(
      switchMap((id: number | null) => {
        if (id === null) {
          return of(null);
        }
        return this.userService.findOne(id).pipe(
          tap((user: User) => {
            this.form.patchValue({
              id: user.id,
              name: user.name,
              username: user.username,
              profileImage: user.profileImage
            });
          })
        );
      })
    ).subscribe();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      }
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.userService.uploadProfileImage(formData).pipe(
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
        this.form.patchValue({ profileImage: event.body.profileImage });
      }
    });
  }

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
