import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomerootComponent } from './components/home/homeroot/homeroot.component';
import { HomepreviewComponent } from './components/home/homepreview/homepreview.component';
import { guardfgsGuard } from './guards/guardfgs.guard';
import { ForbidenComponent } from './components/errorpages/forbiden/forbiden.component';
import { HomeasociateComponent } from './components/asociate/homeasociate/homeasociate.component';
import { ROL } from './interfaces/IRoles';
 

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: RegisterComponent },
  { path: 'forbidden',component:ForbidenComponent   },
  { path: 'home', component:HomerootComponent,title:"Home About"
    , canActivate: [guardfgsGuard],
    data: {
      allowedRoles: [ROL.COLABORATOR.toString()],
    } ,children:[
    { path: 'preview',component:HomepreviewComponent , canActivate: [guardfgsGuard],
      data: {
        allowedRoles: [ROL.COLABORATOR.toString()],
      }   },
      {path: 'asociate',component:HomeasociateComponent , canActivate: [guardfgsGuard],
        data: {
          allowedRoles: [ROL.COLABORATOR.toString(),ROL.MANAGER.toString()],
        }

        
      }
    
  ]}
  
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
