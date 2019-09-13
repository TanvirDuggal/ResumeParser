import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UpdateApplicantProfileComponent } from './update-applicant-profile/update-applicant-profile.component';

import { RegLoginComponent } from './reg-login/reg-login.component';

import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
//import {MessageService} from './messageservice';
import {MessageService} from 'primeng/api';


import {PasswordModule} from 'primeng/password';
import {ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload'
import {RadioButtonModule} from 'primeng/radiobutton';
import { PostjobComponent } from './postjob/postjob.component';
import { ViewAllJobsComponent } from './view-all-jobs/view-all-jobs.component';
import { ViewNApplyJobsComponent } from './view-n-apply-jobs/view-n-apply-jobs.component';


@NgModule({
  declarations: [
    AppComponent,
    UpdateApplicantProfileComponent,
    RegLoginComponent,
    PostjobComponent,
    ViewAllJobsComponent,
    ViewNApplyJobsComponent
  ],
  imports: [

    BrowserModule ,
    StepsModule ,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    StepsModule,
    MenuModule,
    MenubarModule,
    InputSwitchModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessagesModule,
    AppRoutingModule,
    FileUploadModule,
    RadioButtonModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
