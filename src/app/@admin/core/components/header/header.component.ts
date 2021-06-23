import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginPublicService } from 'src/app/@public/pages/login/login-public.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggledValue = true;
  @Output() toggleChange = new EventEmitter<boolean>();
  constructor(public authService: LoginPublicService) { }

  ngOnInit(): void {
  }
  toggled(){
    if(this.toggledValue === undefined){
      this.toggledValue = true;
    }
    this.toggledValue = !this.toggledValue;
    console.log(this.toggledValue);    
    this.toggleChange.emit(this.toggledValue);
  }
}
