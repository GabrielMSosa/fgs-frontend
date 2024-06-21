import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomerootComponent } from './components/home/homeroot/homeroot.component';
import { HomepreviewComponent } from './components/home/homepreview/homepreview.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: RegisterComponent },
  { path: 'home', component:HomerootComponent,title:"Home About",children:[
    { path: 'preview',component:HomepreviewComponent   }
  ]}
  
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
