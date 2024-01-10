import { Coord } from './coord.model';

export interface AirPollutionDto {
  coord: Coord;
  list: Array<AirPollutionData>;
}

interface AirPollutionData {
  components: AirPollutionInfo;
  dt: number;
  main: {
    aqi: number;
  };
}

export interface AirPollutionInfo {
  co: number;
  nh3: number;
  no: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
  so2: number;
}
