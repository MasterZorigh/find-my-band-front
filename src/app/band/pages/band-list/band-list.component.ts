import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { BandFormComponent } from '../../components/band-form/band-form.component';
import { Band } from '../../models/band';
import { BandService } from '../../services/band.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.sass'],
})
export class BandListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  band$: Observable<Band[]>;
  displayedColumns: string[] = [
    'bandName',
    'bandCountry',
    'bandGenre',
    'bandMembers',
    'dateOfBirth',
    'bandTopSong',
    'update',
    'delete',
  ];

  constructor(
    private bandService: BandService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchData() {
    this.band$ = this.bandService.get();
  }

  openBandForm(band?: Band) {
    const dialogRef = this.dialog.open(BandFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: band ? false : true,
        band: band ? band : undefined,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer ce groupe ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.bandService
            .delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success'],
              });
              this.fetchData();
            });
        }
      });
  }

  showBandDetails(bandId: number) {
    this.router.navigate(['/band/' + bandId]);
  }
}
