import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthFGSService {
  //podemos pasar query params a las url
  urluser="http://localhost:3000/users?email"
  constructor(private http:HttpClient) { }
 GetUserById(email:string):Observable<IUser[]>{
  const miurl= `${this.urluser}=${email}`;
  console.log(miurl)
  return this.http.get<IUser[]>(miurl);
 }
}
