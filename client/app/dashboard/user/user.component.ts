import {Component, OnInit, NgZone, Inject, EventEmitter, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {NgUploaderOptions, UploadedFile, NgUploaderService} from 'ngx-uploader';
import { ModalDirective } from 'ng2-bootstrap';

import {UserService} from './../../shared/user.service';

@Component({templateUrl: './user.component.html'})
export class UserComponent implements OnInit {

    user : any;
    previewData: any;
    error : string = '';
    
    inputUploadEvent: EventEmitter<string>;
    uploaderOptions : NgUploaderOptions;
    uploadProgress: number;
    sizeLimit: number = 5*1024*1024;
    uploadPromise: Promise<string>;

    loading: boolean = false;

    @ViewChild('uploadProfilePictureModal') public uploadProfilePictureModal:ModalDirective;

    constructor(
        private userService : UserService, 
        @Inject(NgZone)private zone : NgZone,
        private router : Router
    ) {
        this.uploadPromise = Promise.resolve("");
        this.inputUploadEvent = new EventEmitter<string>();
    }

    saveChanges() {
        var self = this;
        
        self.error = '';
    
        if (!self.user.username) {
            return self.error = 'Username can`t be empty';
        }
        if (!self.user.email) {
            return self.error = 'Email can`t be empty';
        }
        
        self.userService
            .changeDetails(self.user.username, self.user.email)
            .subscribe(res => {
                if (res.status) {
                    self.loading = false;
                    self.router.navigateByUrl('/dashboard');
                } else {
                    this.error = res.reason;
                }
            });
    }

    handleUpload(data : any) {
        var self = this;
        setTimeout(() => {
            this.zone
                .run(() => {
                    self.uploadProgress = data.progress.percent;
                    if (data && data.response && !self.loading) {
                        var serverResponse = JSON.parse(data.response);
                        self.uploadProgress = 0;
                        if(serverResponse.status) {
                            self.userService.changeProfilePicture(serverResponse.data).subscribe(()=>{});
                        }
                        else {
                            console.error(serverResponse.reason);
                        }
                        
                        self.uploadProfilePictureModal.hide();
                    }
                });
        });
    }

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.error = 'Can\'t upload file with size more than 5MB';
        }
    }

    uploadProfilePicture() {
        this.inputUploadEvent.emit('startUpload');
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    showProfilePictureModal() {
        this.previewData = null;
        this.uploaderOptions = new NgUploaderOptions({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            autoUpload: false,
            maxUploads: 1,
            previewUrl: true,
        });
        this.uploadProfilePictureModal.show()
    }

    ngOnInit() {
        var self = this;
        self
            .userService
            .getUser()
            .subscribe(user => {
                self.user = Object.assign({}, user);
            });
    }
}