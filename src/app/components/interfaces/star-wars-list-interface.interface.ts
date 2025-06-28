import { IStarWarsFilms } from "./star-wars-films-interface.interface";
import { IStarWarsPeople } from "./star-wars-people-interface.interface";
import { IStarWarsStarship } from "./star-wars-starships-interface.interface";
import { IStarWarsVehicle } from "./star-wars-vehicles-interface.interface";

export interface IStarWarsList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
