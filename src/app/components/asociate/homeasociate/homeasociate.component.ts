 
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { RegiserService } from '../../../services/autorization/regiser.service';
import { IUserBussiness } from '../../../interfaces/IUserBussiness';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {LiveAnnouncer} from '@angular/cdk/a11y';
 
import {ChangeDetectionStrategy, Component, computed, inject, model, signal, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ROL } from '../../../interfaces/IRoles';
import { RoluserService } from '../../../services/autorization/roluser.service';
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
  readonly rol = signal([ROL.COLABORATOR.toString()]);
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

  constructor(private serviregiste: RegiserService,private servirol:RoluserService) { }

  ngOnInit() {
    const rol='ROL_MASTER'
    const rols=[];
    rols.push(rol);
    this.servirol.PatchRolByID("1ag",rols).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => console.log("finshi")
    });
    this.serviregiste.GetBussinessByCompany("Company S.A").subscribe({
      next: (v) => this.users = v,
      error: (e) => console.log(e),
      complete: () => console.log(JSON.stringify(this.users))
    });


  }

}

