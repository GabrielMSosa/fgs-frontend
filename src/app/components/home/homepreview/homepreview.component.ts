import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homepreview',
  templateUrl: './homepreview.component.html',
  styleUrl: './homepreview.component.css'
})
export class HomepreviewComponent {
  name:any;
  icon:string="";
constructor( ){
 
  if(sessionStorage.getItem("name")!=null){
    this.name=sessionStorage.getItem("name");
  }

  console.log("open homepreview")
}
}
