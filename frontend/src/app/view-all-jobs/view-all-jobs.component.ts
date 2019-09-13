import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import {MessageService} from  "primeng/api";
import { saveAs } from 'file-saver';

import { HttpClient } from "@angular/common/http";
import { Router, RoutesRecognized } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';


class Job{
   public jobId : "" ;
   public  jobTitle : "" ;
   public jobDescription : "";
  }

@Component({
  selector: 'app-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.css']
})
export class ViewAllJobsComponent implements OnInit {
job : any ={jobId : "" , jobTitle : "" , jobDescription : ""}
 // viewAllJobsRes:  Array<Job>;
  viewAllJobsRes:any = [] ;
  candidatesForJobRes : any =[] ;

  //[{"jobId":"1","jobTitle":"Student ","jobDescription":"vcvc"},{"jobId":"2","jobTitle":"dfsdf","jobDescription":"sdfsd"}];
  title = 'Infinity Jobs';
  baseUrl = "http://localhost:8080";
  selectedJobDesc : String;

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
  }

  viewJobDesc(jobDescription : any){
          this.selectedJobDesc =jobDescription  ;
  }

  viewJobCandidates(jobId : any){


    let path  = "/candidatesforjob"
    this.httpClient
      .post(this.baseUrl + path,{
        jobId : jobId
      })
      .subscribe(
        data => {
           console.log("POST Request is successful ", data);
           this.candidatesForJobRes = data ;
          let resTempforLength = new Array(this.candidatesForJobRes) ;



           for( let i = 0 ; i < resTempforLength.length ; i++ ){
              let  name  =  this.candidatesForJobRes[i+""].name;
              name = name.substring(0, name.indexOf('_'));
              if(name !="" ){
                this.candidatesForJobRes[i+""].name = name   ;
              }


           }
          //   if(this.candidatesForJobRes[i+""]){}
          //     let splitName =  this.candidatesForJobRes[i+""].name.split("_");
          //     this.candidatesForJobRes[i+""].name = splitName["0"]+" "+splitName["1"];

          //  }


         //  console.log (this.viewAllJobsRes["1"].jobId);




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

  viewCandidateProfile(candidate : any){
    sessionStorage.setItem("recruiterViewing" , candidate.email+'' );
    this.router.navigateByUrl("/update_applicant_profile");
  }

}
