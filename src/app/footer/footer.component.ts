import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { ShareComponent } from '../share/share.component';
import { BackupComponent } from '../backup/backup.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public modalRef: BsModalRef;
  public selectedComponent: any;
  constructor( private modalService: BsModalService ) {}

  ngOnInit() {
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
