import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import {MatMenuModule} from '@angular/material/menu';




import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';



import {MatGridListModule} from '@angular/material/grid-list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatButtonModule} from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SignupComponent } from './signup/signup.component';
import { AbcAttaComponent } from './abc-atta/abc-atta.component';
import { FormAltaComponent } from './form-alta/form-alta.component';


import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    IntroComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    SignupComponent,
    AbcAttaComponent,
    FormAltaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,

    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
