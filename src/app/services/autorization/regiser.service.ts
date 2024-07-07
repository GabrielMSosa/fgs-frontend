import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserBussiness } from '../../interfaces/IUserBussiness';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegiserService {
  urluserbussiness="http://localhost:3000/userbussiness"
  constructor(private http:HttpClient) { }

  CreateUserbussiness(data:IUserBussiness):Observable<IUserBussiness> {
    return this.http.post<IUserBussiness>(this.urluserbussiness,data );
   }

   GetAllByProviderNew():Observable<IUserBussiness[]>{
    const url= `${this.urluserbussiness}?isProvider=true&isNew=true`
    return this.http.get<IUserBussiness[]>(url)
   }
   GetAllByCompanyNew():Observable<IUserBussiness[]>{
    const url= `${this.urluserbussiness}?isCompany=true&isNew=true`
    return this.http.get<IUserBussiness[]>(url)
   }
   GetBussinessByEmail(email: string): Observable<IUserBussiness[]> {
    const miurl = `${this.urluserbussiness}?email_user=${email}`;
    console.log(miurl)
    return this.http.get<IUserBussiness[]>(miurl);
  }
  GetBussinessByCompany(company: string): Observable<IUserBussiness[]> {
    const miurl = `${this.urluserbussiness}?isNew=false&company_name=${company}`;
    console.log(miurl)
    return this.http.get<IUserBussiness[]>(miurl);
  }
  

  PatchUserBussinessByID(id: string,owner:boolean):Observable<IUserBussiness>{
    var body: any = {};
    body.isValidateForOwner = owner;
    const url= `${this.urluserbussiness}/${id}`;
    return this.http.patch<IUserBussiness>(url,body) 
   }


}
