import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';

export interface Tag {
  name: string;
} 
@Component({
  selector: 'app-forbiden',
  templateUrl: './forbiden.component.html',
  styleUrl: './forbiden.component.css'
})
export class ForbidenComponent {




}