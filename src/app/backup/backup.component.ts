import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';

import { UploadFileService } from '../upload-file/shared/upload.service';
import { SizeConvectorService } from '../upload-file/shared/size-convector.service';
import { Upload } from '../upload-file/shared/upload';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  uploads: Observable<Upload[]>;

  constructor(
    public bsModalRef: BsModalRef,
    private uploadFileService: UploadFileService,
    private sizeConvectorService: SizeConvectorService
  ) {}

  ngOnInit() {
    this.uploads = this.uploadFileService.getUploads();
    this.uploads.subscribe((value) => {
      
    })
  }

}
