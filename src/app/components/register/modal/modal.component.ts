import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/IUser';
import { RegisterComponent } from '../register.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface SelectModal {
  NewCompany: boolean;
  NewProvider: boolean;
  AddUserToCompant: boolean;
  AddUserToProvider: boolean;
}
export interface DataForm {
  companyName:string;
  phone:string;
  city:string;
  zipcode:string;
  isCompany: boolean;
  IsProvider: boolean;
  IsNew: boolean;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  public resp: IUser[] = []
  public datasend:DataForm ={
    companyName:"",
    city:"",
    phone:"",
    zipcode:"",
    isCompany: false,
    IsProvider: false,
    IsNew:false
  }
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectModal,) {
      console.log(JSON.stringify(data));
    this.userForm = new FormGroup({
      company_name: new FormControl("", [Validators.required,Validators.minLength(4)]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{13}")]),
      city: new FormControl("",[Validators.required,Validators.minLength(4)]),
      zipcode: new FormControl("",[Validators.required,Validators.minLength(4)]),
    })
  }

  onSubmit() {
    console.log( this.userForm.value.company_name);
    console.log( this.userForm.value.telephone);
    console.log( this.userForm.value.city);
    console.log( this.userForm.value.zipcode);
    this.datasend.IsProvider=this.data.NewProvider||this.data.AddUserToProvider;
    this.datasend.isCompany=this.data.NewCompany||this.data.AddUserToCompant;
    this.datasend.IsNew=this.data.NewCompany||this.data.NewProvider;
    this.datasend.companyName=this.userForm.value.company_name;
    this.datasend.city=this.userForm.value.city;
    this.datasend.zipcode= this.userForm.value.zipcode;
    this.datasend.phone=this.userForm.value.telephone;
    this.dialogRef.close(this.datasend)
   
    this.isFormSubmitted = true;
  }
}
