import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationDto } from './station-list/station-dto.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private url: string = 'https://danepubliczne.imgw.pl/api/data/synop';

  constructor(private http: HttpClient) {}

  public getStationList(): Observable<Array<StationDto>> {
    return this.http.get<Array<StationDto>>(this.url);
  }

  public getStationById(stationId: string): Observable<StationDto> {
    return this.http.get<StationDto>(`${this.url}/id/${stationId}`);
  }
}
