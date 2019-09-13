import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import {MessageService} from  "primeng/api";
import { saveAs } from 'file-saver';

import { HttpClient } from "@angular/common/http";
import { Router, RoutesRecognized } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-view-n-apply-jobs',
  templateUrl: './view-n-apply-jobs.component.html',
  styleUrls: ['./view-n-apply-jobs.component.css']
})
export class ViewNApplyJobsComponent implements OnInit {

  title = 'Infinity Jobs';
  baseUrl = "http://localhost:8080";

  viewAllJobsRes:any = [] ;
  candidatesForJobRes : any =[] ;
  selectedJobDesc : String;
  appliedJobsRes :any = [] ;
  applyJobRes : any =[] ;

  constructor(private messageService : MessageService , private httpClient :HttpClient , private router : Router) {}

  ngOnInit() {



    let path  = "/viewjobs"
    this.httpClient
      .post(this.baseUrl + path,{})
      .subscribe(
        data => {
           console.log("POST Request is successful ", data);
           this.viewAllJobsRes = data ;
           console.log (this.viewAllJobsRes["1"].jobId);

            this.messageService.add({
            key: "myKey3",
            severity: "success",
            summary: "Successfully added",
            detail:  this.viewAllJobsRes.message

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
            detail:  this.viewAllJobsRes.message

          });
        }
      );







   path  = "/appliedjobs"
    this.httpClient
      .post(this.baseUrl + path,{
        email : localStorage.getItem("email")

      })
      .subscribe(
        data => {
           console.log("POST Request is successful ", data);
           this.appliedJobsRes = data ;
          // console.log (this.viewAllJobsRes["1"].jobId);

            this.messageService.add({
            key: "myKey3",
            severity: "success",
            summary: "Successfully added",
            detail:  this.appliedJobsRes.message

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
            detail:  this.viewAllJobsRes.message

          });
        }
      );



  }

  viewJobDesc(jobDescription : any){
          this.selectedJobDesc =jobDescription  ;
  }

  applyJob(jobId : any) {

   let path  = "/applyjob"
   this.httpClient
     .post(this.baseUrl + path,{
       email : sessionStorage.getItem("email"),
       jobId : jobId

     })
     .subscribe(
       data => {
          console.log("POST Request is successful ", data);
        //  this.applyJobRes = data ;
         // console.log (this.viewAllJobsRes["1"].jobId);

           this.messageService.add({
           key: "myKey3",
           severity: "success",
           summary: "Successfully added",
           detail:  "you have applied to job successsfully "

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
           detail:  this.applyJobRes.message

         });
       }
     );



  }



}
