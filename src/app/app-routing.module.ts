import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EsncardPageComponent } from './pages/esncard-page/esncard-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { StatutesPageComponent } from './pages/statutes-page/statutes-page.component';
import { IncomingsPageComponent } from './pages/incomings-page/incomings-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { CocPageComponent } from './pages/coc-page/coc-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'esncard',
    component: EsncardPageComponent,
  },
  {
    path: 'events',
    component: EventsPageComponent,
  },
  {
    path: 'for-members',
    component: MembersPageComponent,
  },
  {
    path: 'team',
    component: TeamPageComponent,
  },
  {
    path: 'for-incomings',
    component: IncomingsPageComponent,
  },
  {
    path: 'imprint',
    component: ImprintPageComponent,
  },
  {
    path: 'statutes',
    component: StatutesPageComponent,
  },
  {
    path: 'coc',
    component: CocPageComponent,
  },
  {
    path: 'error',
    title: 'Oopsie - ESN Germany',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
