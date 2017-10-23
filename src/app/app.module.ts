import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';

import { UploadFileService } from './upload-file/shared/upload.service';
import { SizeConvectorService } from './upload-file/shared/size-convector.service';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { ReportComponent } from './report/report.component';
import { ShareComponent } from './share/share.component';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { FooterComponent } from './footer/footer.component';
import { BackupComponent } from './backup/backup.component';
import { UploadFormComponent } from './upload-file/upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    ReportComponent,
    ShareComponent,
    UploadModalComponent,
    FooterComponent,
    BackupComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    Angular2FontawesomeModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  entryComponents: [
    ShareComponent,
    UploadModalComponent,
    BackupComponent
  ],
  providers: [ 
    UploadFileService,
    SizeConvectorService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
