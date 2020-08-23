import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 



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
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';




// servicios
import { UsersService } from './services/user.service'


import {MatPaginatorModule} from '@angular/material/paginator';

// libreria Anzen
import { AnzenComponentsModule } from 'anzen-components';


// sort
// import {MatSortModule} from '@angular/material/sort';
import { RightNavbarComponent } from './right-navbar/right-navbar.component';

import {MatChipsModule} from '@angular/material/chips';



// panel
import {MatExpansionModule} from '@angular/material/expansion';

// tootip
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatCardModule} from '@angular/material/card';




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
    RightNavbarComponent,
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
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    FormsModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    
    AnzenComponentsModule,
    
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })

  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
