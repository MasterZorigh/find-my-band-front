import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Band } from '../models/band';

@Injectable()
export class BandService {
  getBand(bandId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  get(): Observable<Band[]> {
    return this.http.get<Band[]>(environment.findMyBandBaseUrl + '/band');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(
      environment.findMyBandBaseUrl + '/band/' + id
    );
  }

  update(band: Band): Observable<string> {
    return this.http.put<string>(
      environment.findMyBandBaseUrl + '/band/' + band.id,
      band
    );
  }

  create(band: Band): Observable<string> {
    return this.http.post<string>(
      environment.findMyBandBaseUrl + '/band',
      band
    );
  }

  getById(id: number): Observable<Band> {
    return this.http.get<Band>(environment.findMyBandBaseUrl + '/band/' + id);
  }
}
