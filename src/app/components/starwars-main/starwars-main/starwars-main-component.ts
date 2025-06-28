import { Component, signal } from '@angular/core';
import { SearchFieldComponent } from '../../reusable-components/search-field/search-field-component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StarWarsApiService } from '../../services/star-wars-api/star-wars-api-service';
import { take } from 'rxjs';
import { IStarWarsFilms } from '../../interfaces/star-wars-films-interface.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';


/**
 * Star Wars Main Component
 */
@Component({
  selector: 'app-starwars-main',
  imports: [SearchFieldComponent, ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './starwars-main-component.html',
  styleUrls: ['./starwars-main-component.css'],
  animations: [
    trigger('flyIn', [
      transition(':enter', [
        style({ transform: 'translateY(-5px) scale(0.8)', opacity: 0 }),
        animate('500ms ease-in', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateY(-5px)', opacity: 0 }))
      ])
    ])
  ]
})
export class StarwarsMainComponent {

  /**
   * List of all Star Wars Films
   */
  public starWarsFilms = signal<IStarWarsFilms[]>([]);
  /**
   * Search Form
   */
  public searchForm = new FormGroup<{
    people: FormControl<string | null>;
    starship: FormControl<string | null>;
    vehicle: FormControl<string | null>;
  }>({
    people: new FormControl('', [Validators.required]),
    starship: new FormControl('', [Validators.required]),
    vehicle: new FormControl('', [Validators.required])
  });

  /**
   * Show No Result Message
   */
  public showNoResultMessage = signal(false);

  /**
   * Highlighted Films URL Strings
   */
  public highlightedFilms = signal<string[]>([]);

  /**
   * Vehicle Control Getter
   */
  get vehicleControl(): FormControl<string | null> {
    return this.searchForm.get('vehicle') as FormControl<string | null>;
  }

  /**
   * People Control Getter
   */
  get peopleControl(): FormControl<string | null> {
    return this.searchForm.get('people') as FormControl<string | null>;
  }

  /**
   * Starship Control Getter
   */
  get starshipControl(): FormControl<string | null> {
    return this.searchForm.get('starship') as FormControl<string | null>;
  }

  /**
   * Activate Search
   */
  get activateSearch(): boolean {
    const filledField = [this.peopleControl, this.starshipControl, this.vehicleControl].find(
      field => field.value !== null && field.value.length >= 3
    );
    return !!filledField;
  }


  /**
   * Konstruktor
   * 
   * @param {StarWarsApiService} starWarsAPIService StarWarsAPI Service
   */
  public constructor(private starWarsAPIService: StarWarsApiService) { }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.setSearchFieldValidators();
    this.starWarsAPIService.searchFilms().pipe(take(1)).subscribe(films => {
      if (!!films.results && films.results.length > 0) {
        this.starWarsFilms.set(films.results);
        console.log('Star Wars Films loaded:', this.starWarsFilms());
      }
    });
  }

  /**
   * Set SearchFields Validators
   */
  public setSearchFieldValidators() {
    const searchFields = [this.peopleControl, this.starshipControl, this.vehicleControl];

    searchFields.forEach((field, index) => {
      field.valueChanges.subscribe(value => {
        if (!!value && value.length > 0) {
          //set active field required, inactive ones clear validators
          searchFields.forEach((otherFields, otherIdx) => {
            if (otherIdx !== index) {
              otherFields.setValue('');
              otherFields.clearValidators();
              otherFields.updateValueAndValidity({ emitEvent: false });
            } else {
              field.setValidators([Validators.required]);
              field.updateValueAndValidity({ emitEvent: false });
            }
          });
        } else {
          //if all fields are empty -> set required
          const emptyFields = searchFields.every(field => !field.value || field.value.length === 0);

          if (emptyFields) {
            searchFields.forEach(field => {
              field.setValidators([Validators.required]);
              field.updateValueAndValidity({ emitEvent: false });
            });
          }
        }
      });
    });
  }

  public search(): void {
    const searchValues = this.searchForm.value;

    const filledField = Object.entries(searchValues).find(
      ([, value]) => !!value?.trim()
    );
    console.log('Active Query:', filledField);

    if (filledField?.[0] === 'people' && !!filledField[1]) {
      this.starWarsAPIService.searchPeople(filledField[1]).pipe(take(1)).subscribe(people => {
        if (!people || people.results.length === 0) {
          this.showNoResultMessage.set(true);
          setTimeout(() => this.showNoResultMessage.set(false), 5000);
        }
        else if (people.results.length === 1) {
          console.log(people.results[0].films);
          this.highlightedFilms.set(people.results[0].films);
        }
      });
    } else if (filledField?.[0] === 'starship' && !!filledField[1]) {
      this.starWarsAPIService.searchStarships(filledField[1]).pipe(take(1)).subscribe(starship => {
        if (!starship || starship.results.length === 0) {
          this.showNoResultMessage.set(true);
          setTimeout(() => this.showNoResultMessage.set(false), 5000);
        }
        else if (starship.results.length === 1) {
          console.log(starship.results[0].films);
          this.highlightedFilms.set(starship.results[0].films);
        }
        console.log('Starship Search Result:', starship);
      });
    } else if (filledField?.[0] === 'vehicle' && !!filledField[1]) {
      this.starWarsAPIService.searchVehicles(filledField[1]).pipe(take(1)).subscribe(vehicle => {
        if (!vehicle || vehicle.results.length === 0) {
          this.showNoResultMessage.set(true);
          setTimeout(() => this.showNoResultMessage.set(false), 5000);
        }
        else if (vehicle.results.length === 1) {
          console.log(vehicle.results[0].films);
          this.highlightedFilms.set(vehicle.results[0].films);
        }
        console.log('Vehicle Search Result:', vehicle);
      });
    }
  }
}
