import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';

/*Third party modules*/
import { LottieAnimationViewModule } from 'ng-lottie';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { InterviewsComponent } from './Pages/interviews/interviews.component';
import { GroupsComponent } from './Pages/groups/groups.component';
import { FeedsComponent } from './Pages/feeds/feeds.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    InterviewsComponent,
    GroupsComponent,
    FeedsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieAnimationViewModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
