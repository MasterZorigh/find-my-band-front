import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'band',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'band',
    pathMatch: 'full',
  },
  {
    path: 'band',
    loadChildren: () => import('./band/band.module').then((m) => m.BandModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
