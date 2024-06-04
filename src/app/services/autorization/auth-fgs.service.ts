import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthFGSService {
  urluser="http://localhost:3000/users"
  constructor(private http:HttpClient) { }
 GetUserById(id:number):Observable<IUser[]>{
  const miurl= `${this.urluser}/${id}`;
  return this.http.get<IUser[]>(miurl);
 }
}
