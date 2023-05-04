import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandDetailsComponent } from './pages/band-details/band-details.component';
import { BandListComponent } from './pages/band-list/band-list.component';

const routes: Routes = [
  {
    path: '',
    component: BandListComponent,
  },
  {
    path: ':id',
    component: BandDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BandRoutingModule {}
