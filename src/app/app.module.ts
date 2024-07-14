import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
 
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from "ngx-loading";
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import { ModalComponent } from './components/register/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { HomerootComponent } from './components/home/homeroot/homeroot.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomepreviewComponent } from './components/home/homepreview/homepreview.component';
import { ForbidenComponent } from './components/errorpages/forbiden/forbiden.component';
import { HomeasociateComponent } from './components/asociate/homeasociate/homeasociate.component';
import {MatTableModule} from '@angular/material/table';
import { HomereportComponent } from './components/reports/homereport/homereport.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { DeclareproductComponent } from './components/declarehome/declareproduct/declareproduct.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    HomerootComponent,
    HomepreviewComponent,
    ForbidenComponent,
    HomeasociateComponent,
    HomereportComponent,
    DeclareproductComponent
  ],
  imports: [
    BrowserModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
     ReactiveFormsModule,
     NgxLoadingModule,
     MatCardModule,
     MatDatepickerModule,
     MatDividerModule,
     MatDialogModule,
     MatTooltipModule,
     MatListModule,
     MatSnackBarModule,
     MatSelectModule,
     MatSidenavModule,
     MatTableModule,
     MatAutocompleteModule,
     MatChipsModule,
     MatInputModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
