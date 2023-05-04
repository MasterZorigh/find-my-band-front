import { BandService } from '../../services/band.service';
import { Band } from '../../models/band';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface BandFormData {
  isCreateForm: boolean;
  band: Band;
}

@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrls: ['./band-form.component.scss'],
})
export class BandFormComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  bandGenres: string[] = [
    'Rock',
    'Pop',
    'Jazz',
    'Metal',
    'Musique Populaire',
    'Autre',
  ];

  bandForm = this.fb.group({
    id: [0, [Validators.required]],
    bandName: ['', [Validators.required]],
    bandCountry: ['', [Validators.required]],
    bandGenre: ['', [Validators.required]],
    bandMembers: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    bandTopSong: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<BandFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BandFormData,
    private fb: FormBuilder,
    private bandService: BandService,
    private _snackBar: MatSnackBar
  ) {
    if (!data.isCreateForm) {
      this.setBandForm(data.band);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setBandForm(band: Band) {
    this.bandForm.setValue({
      id: band.id,
      bandName: band.bandName,
      bandCountry: band.bandCountry,
      bandGenre: band.bandGenre,
      bandMembers: band.bandMembers,
      dateOfBirth: band.dateOfBirth,
      bandTopSong: band.bandTopSong,
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit() {
    if (this.bandForm.valid) {
      this.bandForm.value.dateOfBirth = new Date(
        this.bandForm.value.dateOfBirth
      ).toISOString();
      if (this.data.isCreateForm) {
        this.bandForm.value.id = Date.now() + Math.random();
        this.bandService
          .create(this.bandForm.value as Band)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success'],
            });

            this.dialogRef.close(true);
          });
      } else {
        this.bandService
          .update(this.bandForm.value as Band)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success'],
            });
            this.dialogRef.close(true);
          });
      }
    }
  }
}
