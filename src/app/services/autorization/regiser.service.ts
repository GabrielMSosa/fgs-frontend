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
}
