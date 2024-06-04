import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthGoogleService } from '../../services/googleauth/auth-google.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthFGSService } from '../../services/autorization/auth-fgs.service';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';
interface Alert {
	type: string;
	message: string;
}

const ALERTS: Alert[] = [
	{
		type: 'success',
		message: 'This is an success alert',
	},
	{
		type: 'info',
		message: 'This is an info alert',
	},
	{
		type: 'warning',
		message: 'This is a warning alert',
	},
	{
		type: 'danger',
		message: 'This is a danger alert',
	},
	{
		type: 'primary',
		message: 'This is a primary alert',
	},
	{
		type: 'secondary',
		message: 'This is a secondary alert',
	},
	{
		type: 'light',
		message: 'This is a light alert',
	},
	{
		type: 'dark',
		message: 'This is a dark alert',
	},
];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate!: TemplateRef<any>;
  @ViewChild('emptyLoadingTemplate', { static: false })
  emptyLoadingTemplate!: TemplateRef<any>;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = true;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

	alerts: Alert[]=[];
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(private authGoogleService: AuthGoogleService,private authorifgs:AuthFGSService ) { 
    this.userForm =  new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("",[Validators.required,Validators.minLength(4)]),
      userName:  new FormControl("",[Validators.required,Validators.email]),
      city: new FormControl(""),
      state: new FormControl(""),
      zipcode: new FormControl(""),
      isAgree: new FormControl(false)
    })
 
    this.reset();}

 
    ngOnInit() {

      this.authorifgs.GetUserById(1).subscribe((data)=>{
        console.log(JSON.stringify( data))
      })
    }
	close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}
  onSubmit() {
    const isFormValid = this.userForm.valid;
    debugger;
    this.isFormSubmitted =  true;
  }
	reset() {
		this.alerts = Array.from(ALERTS);
	}
 showData(){
 

const data = JSON.stringify(this.authGoogleService.getProfile())

console.log(data);
 }

 
 getToken(){
  const data = this.authGoogleService.getToken() ;
  console.log(data);
 }


}
