import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoles } from '../../interfaces/IRoles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoluserService {
  urluserbussiness="http://localhost:3000/roles"
  constructor(private http:HttpClient) { }

  CreateRol(data:IRoles):Observable<IRoles> {
    return this.http.post<IRoles>(this.urluserbussiness,data );
   }

   SearchRolByID(id: string):Observable<IRoles[]>{
    const url= `${this.urluserbussiness}?id=${id}`;
    console.log(url);
    return this.http.get<IRoles[]>(url)
   }

   PatchRolByID(id: string,roles:string[]):Observable<IRoles[]>{
    var body: any = {};
    body.roles = roles;
    const url= `${this.urluserbussiness}/${id}`;
    return this.http.patch<IRoles[]>(url,body)
   }
 
}
