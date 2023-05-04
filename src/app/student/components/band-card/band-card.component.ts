import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Band } from '../../models/band';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.sass'],
})
export class BandCardComponent implements OnInit {
  @Input() selectedBand: Band;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.received.emit(true);
  }
}
