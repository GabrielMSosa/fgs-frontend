import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem, IProduct } from '../../interfaces/IProducts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  urluseritem="http://localhost:3000/product"
  constructor(private http:HttpClient) { }
  CreateProduct(data:IProduct):Observable<IProduct> {
    return this.http.post<IProduct>(this.urluseritem,data );
   }
   SearchProductByIdUser(id_user: string):Observable<IProduct>{
    const url= `${this.urluseritem}?user_id=${id_user}`;
    console.log(url);
    return this.http.get<IProduct>(url)
   }

   PatchRolByID(id: string,items:IItem[]):Observable<IProduct>{
    var body: any = {};
    body.items = items;
    const url= `${this.urluseritem}/${id}`;
    return this.http.patch<IProduct>(url,body)
   }


}
  