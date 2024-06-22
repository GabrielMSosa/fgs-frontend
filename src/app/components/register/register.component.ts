import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthGoogleService } from '../../services/googleauth/auth-google.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthFGSService } from '../../services/autorization/auth-fgs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../interfaces/IUser';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { IUserBussiness } from '../../interfaces/IUserBussiness';
import { RegiserService } from '../../services/autorization/regiser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
 

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';
interface Alert {
  type: string;
  message: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

export interface DataForm {
  companyName:string;
  phone:string;
  city:string;
  zipcode:string;
  isCompany: boolean ,
  IsProvider: boolean;
  IsNew: boolean;
}
export interface SelectModal {
  NewCompany: boolean;
  NewProvider: boolean;
  AddUserToCompant: boolean;
  AddUserToProvider: boolean;
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
  public loading = true;//en true corre el spinner
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = true;
  public loadingTemplate!: TemplateRef<any>;
  public returnDialog:boolean=false;
  public userbusines:IUserBussiness[]=[];
  public roles:string[]=[];
  public dataselect: SelectModal = {
    NewCompany: false,
    NewProvider: false,
    AddUserToCompant: false,
    AddUserToProvider: false,
  }
public selectinfo:DataForm={
  companyName:"",
  phone:"",
  city:"",
  zipcode:"",
  isCompany:false,
  IsProvider:false,
  IsNew:false,
}

public SendDatas:IUserBussiness={
  email_user: "",
  name_user: "",
  company_name: "",
  zipcode_user:"",
  isProvider:false,
  isCompany:false,
  isNew:false,
  phone:"",
  city_user:"",
  isValidateForOwner:false,
}

  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

  alerts: Alert[] = [];

  constructor(private authGoogleService: AuthGoogleService, 
    private authorifgs: AuthFGSService, private serviregister: RegiserService,
    public dialog: MatDialog,private snackBar: MatSnackBar,private router: Router) {
  
    this.reset();
  }
   OpenSnackError(error:any){
    
    this.snackBar.open(error, "Try!", {
      duration: 3000,
      panelClass:"error",
    });
  }


  openSuccess(error:any){
    
    this.snackBar.open(error, "Success!", {
      duration: 3000,
      panelClass:"successful",
    });
  }

  ngOnInit() {
 
    const data = this.authGoogleService.getProfile();
  console.log(JSON.stringify(data))
    sessionStorage.setItem("name",data["given_name"]+" "+data["family_name"]);
    sessionStorage.setItem("picture",data["picture"]); 
    this.authorifgs.GetUserById(data["email"]).subscribe({
      next: data => {
        console.log('JSON Data:', JSON.stringify(data))
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
    }
    );

    this.serviregister.GetBussinessByEmail(data["email"]).subscribe({
      next: (v) => this.userbusines=v,
      error: (e) => this.OpenSnackError(""),
      complete: () =>  { 
       console.log("POR EMAIL"+JSON.stringify(this.userbusines) ) ;
        
        if(this.userbusines.length==0){
        this.loading=false;
      }else{
        if(this.userbusines[0].isValidateForOwner==false){
          this.router.navigate(['/forbidden'])
        }else{
          this.roles[0]="VALIDATE_OWNER";
          if(this.userbusines[0].isNew=true){
            this.roles[1]="PRINCIPAL_OWNER";
          }
          //PARA MEJORAR MANDAR UNJSON.
          sessionStorage.setItem("ROL",this.roles.toString())
          console.log(this.userbusines.length);
          this.router.navigate(['/home'])
        }
      }
      }
    });
  }


  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
  showData() {
    console.log(this.authGoogleService.getProfile() )
    const data = this.authGoogleService.getProfile();
    sessionStorage.setItem("name",data["name"]);
 console.log(data["name"]);
  }

  getToken() {
    const data = this.authGoogleService.getToken();
    console.log(data);
  }


  //Bloque de codigo del modal
  openDialog(datax: string): void {
  this.dataselect  = {
      NewCompany: false,
      NewProvider: false,
      AddUserToCompant: false,
      AddUserToProvider: false,
    }
     this.selectinfo={
      companyName:"",
      phone:"",
      city:"",
      zipcode:"",
      isCompany:false,
      IsProvider:false,
      IsNew:false,
    }
    this.SendDatas={
      email_user: "",
      name_user: "",
      company_name: "",
      zipcode_user:"",
      isProvider:false,
      isCompany:false,
      isNew:false,
      phone:"",
      city_user:"",
      isValidateForOwner:false,
    }
    if (datax == 'Newcompany') {
this.dataselect.NewCompany=true;
this.dataselect.AddUserToCompant=false;
this.dataselect.NewProvider=false;
this.dataselect.AddUserToProvider=false;
    }
    if (datax == 'Newprovider') {
      this.dataselect.NewCompany=false;
      this.dataselect.AddUserToCompant=false;
      this.dataselect.NewProvider=true;
      this.dataselect.AddUserToProvider=false;
    }
    if (datax == 'addCompany') {
      this.dataselect.NewCompany=false;
      this.dataselect.AddUserToCompant=true;
      this.dataselect.NewProvider=false;
      this.dataselect.AddUserToProvider=false;
    }
    if (datax == 'addProvider') {
      this.dataselect.NewCompany=false;
      this.dataselect.AddUserToCompant=false;
      this.dataselect.NewProvider=false;
      this.dataselect.AddUserToProvider=true;
    }


    const dialogRef = this.dialog.open(ModalComponent, {
      data:this.dataselect,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("el valorde resul vale "+JSON.stringify(result))  ;
      if (result!=undefined){
        this.selectinfo=result
      }
      
      this.returnDialog=true
      console.log("el valr de info es "+JSON.stringify(this.selectinfo))
    });
    //debemos limpiar las variables porque quedan guardadas con el valor actual...
  
  }


  SaveChanges(){
   this.SendDatas.email_user=this.authGoogleService.getProfile()["email"];
    this.SendDatas.company_name=this.selectinfo.companyName;
    this.SendDatas.city_user=this.selectinfo.city;
    this.SendDatas.isCompany=this.selectinfo.isCompany;
    this.SendDatas.isNew=this.selectinfo.IsNew;
    this.SendDatas.isProvider=this.selectinfo.IsProvider;
    this.SendDatas.isValidateForOwner=this.selectinfo.IsNew;//si es nuevo siempre en true
    this.SendDatas.phone=this.selectinfo.phone;
    this.SendDatas.zipcode_user=this.selectinfo.zipcode;
    this.SendDatas.name_user=this.authGoogleService.getProfile()["given_name"]+" "+this.authGoogleService.getProfile()["family_name"];

    this.serviregister.CreateUserbussiness(this.SendDatas).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.OpenSnackError(""),
      complete: () =>  {this.openSuccess("");
        this.router.navigate(['/home'])
      }
    }
    )


    console.log(JSON.stringify(this.SendDatas))
 
  }
}
