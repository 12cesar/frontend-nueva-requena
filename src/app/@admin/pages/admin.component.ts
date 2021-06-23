import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  toggledValue = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggled($event:any){
    this.toggledValue = $event;    
  }
}
