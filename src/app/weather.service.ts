import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { StationDto } from './models/station-dto.model';
import { WeatherItemDto } from './models/weather-item-dto.model';
import { WeatherForecastItemDto } from './models/weather-forecast-item-dto.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private url: string = 'https://danepubliczne.imgw.pl/api/data';

  private apiKey: string = '1b99f2272edc02a59db20170fb27bc32';
  private ulrCurrentWeather: string = 'https://api.openweathermap.org';

  public favouritePlacesArray = new ReplaySubject<Array<WeatherItemDto>>(1);
  public favouriteItems: Array<WeatherItemDto> = [];

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

    return this.http.get<WeatherItemDto>(
      `${this.ulrCurrentWeather}/data/2.5/weather`,
      {
        params: params,
      }
    );
  }

  public getWeatherForecastByCityName(
    city: string,
    tempUnit: string
  ): Observable<WeatherForecastItemDto> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('lang', 'pl')
      .set('units', tempUnit);

    return this.http.get<WeatherForecastItemDto>(
      `${this.ulrCurrentWeather}/data/2.5/forecast`,
      {
        params: params,
      }
    );
  }

  public getCityByCoordinate(city: string, limit: number): Observable<any> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.ulrCurrentWeather}/geo/1.0/direct`, {
      params: params,
    });
  }

  public getAirPollution(lat: number, lon: number): Observable<any> {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey);

    return this.http.get<any>(`${this.ulrCurrentWeather}/data/2.5/air_pollution`, {
      params: params,
    });
  }
}
