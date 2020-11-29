import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EsncardPageComponent } from './pages/esncard-page/esncard-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'esncard',
    pathMatch: 'full',
    component: EsncardPageComponent,
  },
  {
    path: 'events',
    pathMatch: 'full',
    component: EventsPageComponent,
  },
  {
    path: 'for-members',
    pathMatch: 'full',
    component: MembersPageComponent,
  },
  {
    path: 'team',
    pathMatch: 'full',
    component: TeamPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
