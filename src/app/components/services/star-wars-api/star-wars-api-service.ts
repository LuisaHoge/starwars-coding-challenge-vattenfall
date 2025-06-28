import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStarWarsList } from '../../interfaces/star-wars-list-interface.interface';
import { IStarWarsFilms } from '../../interfaces/star-wars-films-interface.interface';
import { IStarWarsPeople } from '../../interfaces/star-wars-people-interface.interface';
import { IStarWarsStarship } from '../../interfaces/star-wars-starships-interface.interface';
import { IStarWarsVehicle } from '../../interfaces/star-wars-vehicles-interface.interface';

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  private readonly baseUrl = 'https://swapi.py4e.com/api';

  constructor(private http: HttpClient) {}

  public searchFilms(): Observable<IStarWarsList<IStarWarsFilms>> {
    return this.http.get<IStarWarsList<IStarWarsFilms>>(`${this.baseUrl}/films/`);
  }

  public searchPeople(query: string): Observable<IStarWarsList<IStarWarsPeople>> {
    return this.http.get<IStarWarsList<IStarWarsPeople>>(`${this.baseUrl}/people/?search=${query}`);
  }

  public searchStarships(query: string): Observable<IStarWarsList<IStarWarsStarship>> {
    return this.http.get<IStarWarsList<IStarWarsStarship>>(`${this.baseUrl}/starships/?search=${query}`);
  }

  public searchVehicles(query: string): Observable<IStarWarsList<IStarWarsVehicle>> {
    return this.http.get<IStarWarsList<IStarWarsVehicle>>(`${this.baseUrl}/vehicles/?search=${query}`);
  }
}
