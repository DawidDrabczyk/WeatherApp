export interface CityItemDto {
  country: string;
  lat: number;
  local_names: LocalNames;
  lon: number;
  name: string;
  state: string;
}

interface LocalNames {
  de: string;
  ja: string;
  pl: string;
  ru: string;
}
