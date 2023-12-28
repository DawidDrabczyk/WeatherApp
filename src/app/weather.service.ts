import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationDto } from './station-list/station-dto.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getStationList(): Observable<Array<StationDto>> {
    return this.http.get<Array<StationDto>>(
      'https://danepubliczne.imgw.pl/api/data/synop'
    );
  }
}
