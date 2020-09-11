import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AbcAttaComponent } from './abc-atta/abc-atta.component';
import { IntroComponent } from './intro/intro.component';
import { AbcAttaDashComponent } from './abc-atta-dash/abc-atta-dash.component';
import { SearchComponent } from './search/search.component';



const routes: Routes = [

  { path: 'intro', component: IntroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[ AuthGuard]},
  { path: 'abc-atta', component: AbcAttaDashComponent, canActivate:[ AuthGuard]},
  { path: 'abc-atta/createUser', component: AbcAttaComponent, canActivate:[ AuthGuard]},
  { path: 'search', component: SearchComponent, canActivate:[ AuthGuard]},
  // { path: 'heroe/:id', component: HeroeComponent},
  // { path: 'buscar/:termino', component: BuscadorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
