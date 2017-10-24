import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';

import { UploadFileService } from '../upload-file/shared/upload.service';
import { Upload } from '../upload-file/shared/upload';

import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { ShareComponent } from '../share/share.component';
import { BackupComponent } from '../backup/backup.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  uploads: Observable<Upload[]>;
  showSpinner = true;
  totalSize: any = 0;
  totalFiles: any;
  audio: any = {
    size: 0,
    percent: 0
  }
  video: any = {
    size: 0,
    percent: 0
  }
  photo: any = {
    size: 0,
    percent: 0
  }

  public modalRef: BsModalRef;
  public selectedComponent: any;

  constructor( 
    private modalService: BsModalService, 
    private uploadFileService: UploadFileService 
  ) {}

  public percentFinder(bytes: any, total:any){
    return Math.floor((bytes / total) * 100);
  }

  ngOnInit() {
    this.uploads = this.uploadFileService.getUploads();
    
      this.uploads.subscribe((value) => {
      let audioFile = value.filter((file) => {
        return file.type.indexOf('audio') !== -1;
      })
      audioFile.forEach(element => {
        this.audio.size = this.audio.size + element.size;
      });
      
      let videoFile = value.filter((file) => {
        return file.type.indexOf('video') !== -1;
      })
      videoFile.forEach(element => {
        this.video.size = this.video.size + element.size;
      });

      let photoFile = value.filter((file) => {
        return file.type.indexOf('image') !== -1;
      })
      photoFile.forEach(element => {
        this.photo.size = this.photo.size + element.size;
      });

      let allFiles = this.audio.size + this.video.size + this.photo.size

      this.audio.percent = this.percentFinder(this.audio.size, allFiles);
      this.video.percent = this.percentFinder(this.video.size, allFiles);
      this.photo.percent = this.percentFinder(this.photo.size, allFiles);
    })
  }

  public openModal(component) {
    // console.log(component)
    switch(component) {
      case 'backup':
        this.selectedComponent = BackupComponent;
        break;
      case 'upload':
        this.selectedComponent = UploadModalComponent;
        break;
      case 'share':
        this.selectedComponent = ShareComponent;
        break;
  }
    this.modalRef = this.modalService.show(this.selectedComponent);
  }
}
