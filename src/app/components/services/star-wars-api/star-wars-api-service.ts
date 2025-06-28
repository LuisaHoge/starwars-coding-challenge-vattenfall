import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStarWarsList } from '../../interfaces/star-wars-list-interface.interface';
import { IStarWarsFilms } from '../../interfaces/star-wars-films-interface.interface';
import { IStarWarsPeople } from '../../interfaces/star-wars-people-interface.interface';
import { IStarWarsStarship } from '../../interfaces/star-wars-starships-interface.interface';
import { IStarWarsVehicle } from '../../interfaces/star-wars-vehicles-interface.interface';

/**
 * Service for Star Wars API
 */
@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  /**
   * Base URL for the Star Wars API
   */
  private readonly baseUrl = 'https://swapi.py4e.com/api';

  /**
   * Constructor
   * 
   * @param {HttpClient} http HttpClient instance for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Search for Star Wars Films
   * 
   * @returns {Observable<IStarWarsList<IStarWarsFilms>>} Observable of IStarWarsList<IStarWarsFilms>
   */
  public searchFilms(): Observable<IStarWarsList<IStarWarsFilms>> {
    return this.http.get<IStarWarsList<IStarWarsFilms>>(`${this.baseUrl}/films/`);
  }

  /**
   * Search for Star Wars People
   * 
   * @param {string} query searched query string
   * @returns {Observable<IStarWarsList<IStarWarsPeople>>} Observable of IStarWarsList<IStarWarsPeople>
   */
  public searchPeople(query: string): Observable<IStarWarsList<IStarWarsPeople>> {
    return this.http.get<IStarWarsList<IStarWarsPeople>>(`${this.baseUrl}/people/?search=${query}`);
  }

  /**
   * Search for Star Wars Starships
   * 
   * @param {string} query searched query string
   * @returns {Observable<IStarWarsList<IStarWarsStarship>>} Observable of IStarWarsList<IStarWarsStarship>
   */
  public searchStarships(query: string): Observable<IStarWarsList<IStarWarsStarship>> {
    return this.http.get<IStarWarsList<IStarWarsStarship>>(`${this.baseUrl}/starships/?search=${query}`);
  }

  /**
   * Search for Star Wars Vehicles
   * 
   * @param query searched query string
   * @returns {Observable<IStarWarsList<IStarWarsVehicle>>} Observable of IStarWarsList<IStarWarsVehicle>
   */
  public searchVehicles(query: string): Observable<IStarWarsList<IStarWarsVehicle>> {
    return this.http.get<IStarWarsList<IStarWarsVehicle>>(`${this.baseUrl}/vehicles/?search=${query}`);
  }
  
}
