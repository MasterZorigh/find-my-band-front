import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandRoutingModule } from './band-routing.module';
import { BandComponent } from './band.component';
import { SharedModule } from '../shared/shared.module';
import { BandListComponent } from './pages/band-list/band-list.component';
import { BandService } from './services/band.service';
import { BandFormComponent } from './components/band-form/band-form.component';
import { BandDetailsComponent } from './pages/band-details/band-details.component';
import { BandCardComponent } from './components/band-card/band-card.component';

@NgModule({
  declarations: [
    BandComponent,
    BandListComponent,
    BandFormComponent,
    BandDetailsComponent,
    BandCardComponent,
  ],
  imports: [
    CommonModule,
    BandRoutingModule,
    SharedModule,
  ],

  providers: [
    BandService
  ]
})
export class BandModule { }
