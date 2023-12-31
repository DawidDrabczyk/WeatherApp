import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationDto } from './models/station-dto.model';
import { WeatherItemDto } from './models/weather-item-dto.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private url: string = 'https://danepubliczne.imgw.pl/api/data';

  private apiKey: string = '1b99f2272edc02a59db20170fb27bc32';
  private ulrCurrentWeather: string =
    'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  public getStationList(): Observable<Array<StationDto>> {
    return this.http.get<Array<StationDto>>(this.url + '/synop');
  }

  public getStationById(stationId: string): Observable<StationDto> {
    return this.http.get<StationDto>(`${this.url}/synop/id/${stationId}`);
  }

  public getWeatherByCityName(
    city: string,
    tempUnit: string
  ): Observable<WeatherItemDto> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('lang', 'pl')
      .set('units', tempUnit);

    return this.http.get<WeatherItemDto>(`${this.ulrCurrentWeather}`, {
      params: params,
    });
  }
}
