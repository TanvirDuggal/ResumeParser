import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MessageService } from "./messageservice";

@Component({
  selector: "app-root",
  providers: [MessageService],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private messageService: MessageService) { }
  title = "Smart resume";

  items: MenuItem[];
  activeIndex: number = 0;

  ngOnInit() {
    this.items = [
      {
        label: "Personal Info",
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({
            severity: "info",
            summary: "First Step",
            detail: event.item.label
          });
        }
      },
      {
        label: "Documents",
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({
            severity: "info",
            summary: "Seat Selection",
            detail: event.item.label
          });
        }
      },

      {
        label: "Education",
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({
            severity: "info",
            summary: "Seat Selection",
            detail: event.item.label
          });
        }
      },

      {
        label: "Experience",
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({
            severity: "info",
            summary: "Pay with CC",
            detail: event.item.label
          });
        }
      },

      {
        label: "Terms and Conditions",
        command: (event: any) => {
          this.activeIndex = 5;
          this.messageService.add({
            severity: "info",
            summary: "Last Step",
            detail: event.item.label
          });
        }
      }
    ];
  }
}
