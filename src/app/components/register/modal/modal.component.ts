import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/IUser';
import { RegisterComponent } from '../register.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegiserService } from '../../../services/autorization/regiser.service';
import { IUserBussiness } from '../../../interfaces/IUserBussiness';
export interface SelectModal {
  NewCompany: boolean;
  NewProvider: boolean;
  AddUserToCompant: boolean;
  AddUserToProvider: boolean;
}
export interface DataForm {
  companyName: string;
  phone: string;
  city: string;
  zipcode: string;
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
export class ModalComponent implements OnInit {
  public company: IUserBussiness[] = []
  public compselect: IUserBussiness = {
    email_user: "",
    name_user: "",
    company_name: "",
    zipcode_user: "",
    isProvider: false,
    isCompany: false,
    isNew: false,
    phone: "",
    city_user: "",
    isValidateForOwner: false
  }

  public resp: IUser[] = []
  public datasend: DataForm = {
    companyName: "",
    city: "",
    phone: "",
    zipcode: "",
    isCompany: false,
    IsProvider: false,
    IsNew: false
  }
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectModal, private serviregis: RegiserService) {
    console.log("el valor en el modal es "+JSON.stringify(data));
    this.userForm = new FormGroup({
      company_name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{13}")]),
      city: new FormControl("", [Validators.required, Validators.minLength(4)]),
      zipcode: new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    if (this.data.AddUserToCompant) {
      this.serviregis.GetAllByCompanyNew().subscribe({
        next: (v) => this.company = v,
        error: (e) => console.log(e),
        complete: () => console.log(JSON.stringify(this.company))
      })

    }
    if (this.data.AddUserToProvider) {
      this.serviregis.GetAllByProviderNew().subscribe({
        next: (v) => this.company = v,
        error: (e) => console.log(e),
        complete: () => console.log(JSON.stringify(this.company))
      })



    }
  }
  onSubmit() {
    console.log("el valor del selecto en submit vale"+JSON.stringify(this.data))
    console.log(this.userForm.value.company_name.company_name);
    console.log(this.userForm.value.telephone);
    console.log(this.userForm.value.city);
    console.log(this.userForm.value.zipcode);
    if (this.data.AddUserToCompant || this.data.AddUserToProvider) {
      console.log("EL VALOR DE COMPANY NAME ES "+this.userForm.value.company_name.company_name);
      this.datasend.companyName = this.userForm.value.company_name.company_name;
      this.datasend.IsNew = false;
    }

    if (this.data.NewProvider || this.data.NewCompany) {
      console.log("EL VALOR DE COMPANY NAME2 ES "+this.userForm.value.company_name);
      this.datasend.companyName = this.userForm.value.company_name;
      this.datasend.IsNew = this.data.NewCompany||this.data.NewProvider;
    }
    this.datasend.IsProvider = this.data.NewProvider || this.data.AddUserToProvider;
    this.datasend.isCompany = this.data.NewCompany || this.data.AddUserToCompant;
    console.log("el valor del selecto en submit2 vale"+JSON.stringify(this.data))
  
       this.datasend.city = this.userForm.value.city;
    this.datasend.zipcode = this.userForm.value.zipcode;
    this.datasend.phone = this.userForm.value.telephone;
    console.log("el valor de json es "+JSON.stringify(this.datasend))
    this.dialogRef.close(this.datasend)

    this.isFormSubmitted = true;

  }
}
