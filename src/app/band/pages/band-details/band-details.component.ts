import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Band } from '../../models/band';
import { BandService } from '../../services/band.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.sass'],
})
export class BandDetailsComponent implements OnInit {
  bandId: number;
  band$: Observable<Band>;

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService,
    private location: Location
  ) {
    this.bandId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.bandId) {
      this.band$ = this.bandService.getById(this.bandId);
    }
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
