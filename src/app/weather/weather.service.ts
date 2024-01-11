import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { WeatherForecastItemDto } from '../models/weather-forecast-item-dto.model';
import { CityItemDto } from '../models/city-item-dto.models';
import { AirPollutionDto } from '../models/air-pollution-dto.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = '1b99f2272edc02a59db20170fb27bc32';
  private ulrCurrentWeather: string = 'https://api.openweathermap.org';

  public favouritePlacesArray = new ReplaySubject<Array<WeatherItemDto>>(1);
  public favouriteItems: Array<WeatherItemDto> = [];

  constructor(private http: HttpClient) {}

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

  public getCityByCoordinate(
    city: string,
    limit: number
  ): Observable<Array<CityItemDto>> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('limit', limit.toString());

    return this.http.get<Array<CityItemDto>>(
      `${this.ulrCurrentWeather}/geo/1.0/direct`,
      {
        params: params,
      }
    );
  }

  public getAirPollution(
    lat: number,
    lon: number
  ): Observable<AirPollutionDto> {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey);

    return this.http.get<AirPollutionDto>(
      `${this.ulrCurrentWeather}/data/2.5/air_pollution`,
      {
        params: params,
      }
    );
  }
}
