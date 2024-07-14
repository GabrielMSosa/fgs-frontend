import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem, IProduct } from '../../../interfaces/IProducts';
import { map, Observable } from 'rxjs';
import { ItemsService } from '../../../services/provider/items.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-declareproduct',
  templateUrl: './declareproduct.component.html',
  styleUrl: './declareproduct.component.css'
})
export class DeclareproductComponent {
  Roles: any = ['Admin', 'Author', 'Reader'];
  hide = true;
  valoreselect:string=""
  tipoUsuario:string[]=["Alimentos Materia Prima","Alimentos Procesados","Industrial","Tecnologias"];
  categoriaslist:string[]=["Alimentos Materia Prima","Alimentos Procesados","Industrial","Tecnologias"];
  unitslist:string[]=["g","Kg","T","l","m3","unid","m","cm","km"];
  selectUnit:string="";
 itemSearch: IItem={
    "category":"",
    "item_name":"",
    "quantity":0,
    "unit":""
   } 
   itemArray: IItem[]=[]
 product:IProduct=
 {
  "user_id":"",
  "items":[ ]
 }


   
  flagint:boolean=false;
  form: FormGroup;
  constructor(  private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private serviitem:ItemsService,private snackBar: MatSnackBar, private router: Router, ) {
    this.form = this.formBuilder.group({
      category:['', [Validators.required]],
      item_name:['', [Validators.required, Validators.minLength(3)]],
      quantity:['', [Validators.required, Validators.pattern("[+]?([0-9]*[.])?[0-9]+")]],
      unit:['', [Validators.required ]],
      tipousuerValue:['', [Validators.required ]]
      /* deviceInfo: this.formBuilder.group({
          deviceId:["123412341234"],
        deviceType:["DEVICE_TYPE_ANDROID"],
           notificationToken:["12341234werewrtw1234"] })*/
    })

  }

    
  container:string="";
  classblocklogin:string="mat-elevation-z8 blockfullscreen";
  butonclass:string="";
 
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.product  = response.items[0];
   
 
      console.log('PRODUCT FETCHED'+JSON.stringify( this.product));
    });
    
  }
 
  selectedCategory:string="";
  selectedUserType:string="";
  @Input() value: any 
  get NameFactory(){
  return this.form.get("nameFactory");
}

get Category(){
  return this.form.get("category");
}
get ItemName(){
  return this.form.get("item_name");
}
get Quantity(){
  return this.form.get("quantity");
}
get Unit(){
  return this.form.get("unit");
}

 

  get TipousuerValue(){
    return this.form.get('tipousuerValue');
  }
  mitipoUsuario:string="";

  functionName(valores:string){
console.log("el valor de some var vale"+valores);

  }

  IrLogin() {
   
  }
  selectcategory(){
    console.log("valorde selecto"+ this.selectedCategory);
  }

  selectUnitx(){
    console.log("valorde selecto"+ this.selectUnit);
  }
  select(){
    
//this.valoreselect=event;
console.log("valorde selecto"+ this.selectedUserType);


  }

  OpenSnackError(error: any) {

    this.snackBar.open(error, "Try!", {
      duration: 3000,
      panelClass: "error",
    });
  }


  openSuccess(error: any) {

    this.snackBar.open(error, "Success!", {
      duration: 3000,
      panelClass: "successful",
    });
  }

  SaveData(event:Event){
    console.log(JSON.stringify(this.product))
    this.itemArray=this.product.items;
    this.itemSearch.category=this.form.value.category;
    const idint=this.itemArray?.length+1;
    this.itemSearch.id=(this.product.id)+idint.toString()
    console.log(this.itemArray?.length)
    console.log(this.itemSearch)
    this.itemSearch.item_name=this.form.value.item_name;
    this.itemSearch.quantity=this.form.value.quantity;
    this.itemSearch.unit=this.form.value.unit;
    this.itemArray?.push(this.itemSearch);
   
    this.serviitem.PatchRolByID(this.product.id||"", this.itemArray).subscribe({                
    next: (v) => console.log(JSON.stringify(v)) ,
    error: (e) => this.OpenSnackError("Reintente!"),
    complete: () => {
      this.openSuccess("");
      this.router.navigate(['/home'])
    }
});    
  }


  data2ok:string="";

 





}
