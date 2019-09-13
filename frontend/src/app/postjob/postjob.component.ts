import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import {MessageService} from  "primeng/api";
import { saveAs } from 'file-saver';

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  title = 'Infinity Jobs';
  jobTitle : String ;
  jobDesc : String ;
  baseUrl = "http://localhost:8080";
  emptyString : String =  "" ;
  addJobRes :any =  { message : "" , object: {jobId : "" , jobTitle : "" , jobDescription : "" }};

  constructor(private messageService : MessageService , private httpClient :HttpClient , private router : Router) { }

  ngOnInit() {
  }

  addJob(){

    if ( this.jobTitle == "" ) {
      this.messageService.add({
        key: "myKey3",
        severity: "error",
        summary: "Validation",
        detail: "JobTitle is required fields,"
      });
      return;
    }
    let path  = "/addjob"
    this.httpClient
      .post(this.baseUrl + path, {
        jobTitle: this.jobTitle,
        jobDescription: this.jobDesc
      })
      .subscribe(
        data => {
           console.log("POST Request is successful ", data);
           this.addJobRes = data ;

            this.messageService.add({
            key: "myKey3",
            severity: "success",
            summary: "Successfully added",
            detail:  this.addJobRes.message

          });
          // console.log("POST Request is successful ", );
          // this.userProfile = data;
          // this.email = this.userProfile.email;

          // this.password = "";
          // if(this.userProfile.role == "recruiter" ){
          //   this.isRecruiter = true ;
          // }else{
          //   this.isRecruiter = false ;
          // }
          // this.messageService.add({
          //   key: "myKey1",
          //   severity: "success",
          //   summary: "Successful Login",
          //   detail:
          //     this.userProfile.firstName +
          //     " is logged in as " +
          //     userType +
          //     " with name " +
          //     this.userProfile.firstName +
          //     " in system."
          // });
          // if(this.userProfile.object ){
          // sessionStorage.setItem("userProfile", JSON.stringify(data));
          // sessionStorage.setItem("role", this.userProfile.object.role);
          // sessionStorage.setItem("email", this.userProfile.object.email);
          // sessionStorage.setItem("message", this.userProfile.message );

          //   if(this.userProfile.object.role == "recruiter"){
          //     this.router.navigateByUrl("/postjob");

          //   }else {

          //     this.router.navigateByUrl("/update_applicant_profile");
          //   }
          //}


        },
        error => {
          console.log("Error", error);
          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "Successful Login",
            detail:  this.addJobRes.message

          });
        }
      );

  }


  navToAllJobs(){
    this.router.navigateByUrl("/viewalljobs");
  }
}
