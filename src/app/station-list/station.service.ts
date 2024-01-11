import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationDto } from '../models/station-dto.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private url: string = 'https://danepubliczne.imgw.pl/api/data';

  constructor(private http: HttpClient) {}

  public getStationList(): Observable<Array<StationDto>> {
    return this.http.get<Array<StationDto>>(this.url + '/synop');
  }

  public getStationById(stationId: string): Observable<StationDto> {
    return this.http.get<StationDto>(`${this.url}/synop/id/${stationId}`);
  }
}
