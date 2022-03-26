import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';


const routes: Routes = [
  {path: 'login', component: LandingPageComponent},
  {path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
