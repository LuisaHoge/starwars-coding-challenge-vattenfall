import { Component } from '@angular/core';
import { StarwarsMainComponent } from './components/starwars-main/starwars-main/starwars-main-component';

@Component({
  selector: 'app-root',
  imports: [StarwarsMainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'starwars-coding-challenge';
}
