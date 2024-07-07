
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, timer } from 'rxjs';
import { RegiserService } from '../../../services/autorization/regiser.service';
import { IUserBussiness } from '../../../interfaces/IUserBussiness';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { ChangeDetectionStrategy, Component, computed, inject, model, signal, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { IRoles, ROL } from '../../../interfaces/IRoles';
import { RoluserService } from '../../../services/autorization/roluser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homeasociate',
  templateUrl: './homeasociate.component.html',
  styleUrl: './homeasociate.component.css'
})
export class HomeasociateComponent implements OnInit {
  selectedx: IUserBussiness = {
    email_user: "",
    name_user: "",
    company_name: "",
    zipcode_user: "",
    isProvider: false,
    isCompany: false,
    isNew: false,
    phone: "",
    city_user: "",
    isValidateForOwner: false,
  };
  users: IUserBussiness[] = [];
  //variables para el chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentRol = model('');
   rol = signal([ROL.COLABORATOR.toString()]);
  roles: IRoles[] = [];
  rol_show:IRoles={
    id:"",
    isNew:false,
    roles:[]
  }
  myarray: string[] = [];
  readonly allFruits: string[] = [
    ROL.COLABORATOR.toString(),
    ROL.OPERATOR_READER.toString(),
    ROL.OPERATOR_WRITTER.toString(),
    ROL.SUPERVISOR_WRITTER.toString(),
    ROL.SUPERVISOR_READER.toString(),
    ROL.MANAGER.toString()];
  readonly filteredFruits = computed(() => {
    const currentRol = this.currentRol().toLowerCase();
    return currentRol
      ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentRol))
      : this.allFruits.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.rol.update(fruits => [...fruits, value]);
    }

    // Clear the input value
    this.currentRol.set('');
  }

  remove(fruit: string): void {
    this.rol.update(rol => {
      const index = rol.indexOf(fruit);
      if (index < 0) {
        return rol;
      }

      rol.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...rol];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.rol.update(rol => [...rol, event.option.viewValue]);
    this.currentRol.set('');
    event.option.deselect();
  }

  flag: boolean = false;
  ChangeEvent(value:any) {
    this.roles.forEach(element => {
      if(element.id==value.id.toString()){
        this.rol_show=element;
        this.rol.update(x=>element.roles);
      }
    });
    this.rol.update

    console.log(JSON.stringify(value))
    this.flag = !this.flag;
  }

  constructor(private router: Router,private serviregiste: RegiserService, private servirol: RoluserService,private snackBar: MatSnackBar) {


  }



  ngOnInit() {
    let usrbs = sessionStorage.getItem('userbussiness');
    let usrjson = JSON.parse(usrbs || "");
    this.serviregiste.GetBussinessByCompany(usrjson.company_name).subscribe({
      next: (v) => this.users = v,
      error: (e) => console.log(e),
      complete: () => console.log(JSON.stringify(this.users))
    });
    timer(1000).subscribe(x => {
      console.log(JSON.stringify(this.users));
      this.users.forEach(item => {
        timer(100).subscribe(x => {
          this.servirol.SearchRolByID((item.id || 0).toString()).subscribe({
            next: (v) => { this.roles.push(v[0]) },
            error: (e) => console.log(e),
            complete: () => console.log(JSON.stringify(this.roles))
          });
        })
      });
    });


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

  SaveChanges() {
    if (this.selectedx.name_user == "") {
      alert("Debe seleccionar un usuario antes de guardar.")
    }
    let id_str = "";
    this.roles.forEach(element => {
      let id_string = (this.selectedx.id || 0).toString();
      if (element.id == id_string) {
        id_str = id_string;
      }
    });
    console.log(id_str)
    console.log(JSON.stringify(this.selectedx));
    console.log(JSON.stringify(this.roles))

    const flag:boolean=false;
    this.myarray = [];
    const myrol = this.rol.toString();
    const modifiedString = myrol.replace("Signal: ", "");
    const noarray1 = modifiedString.replace("[", "");
    const noarray2 = noarray1.replace("]", "");
    const array_rol = noarray2.split(",")
    this.myarray = removeDuplicatesUsingSet(array_rol);
    this.servirol.PatchRolByID(id_str,this.myarray).subscribe({
      next: (v) => {console.log(JSON.stringify(v))},
      error: (e) => console.log(e),
      complete: () =>  {
        
        this.serviregiste.PatchUserBussinessByID(id_str,this.myarray.includes(ROL.COLABORATOR)).subscribe({
          next: (v) => {console.log(JSON.stringify(v))},
          error: (e) => console.log(e),
          complete: () =>  {
        this.openSuccess("");  
        this.router.navigate(['/home']);
      }});
  }});
      
 



    console.log(this.myarray); // Outputs: "123"

  }
}

function removeDuplicatesUsingSet<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}