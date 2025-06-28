import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStarWarsVehicle } from '../../interfaces/star-wars-vehicles-interface.interface';
import { IStarWarsPeople } from '../../interfaces/star-wars-people-interface.interface';
import { IStarWarsStarship } from '../../interfaces/star-wars-starships-interface.interface';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

/**
 * Selection Dialog Component
 */
@Component({
  selector: 'app-selection-dialog-component',
  imports: [CommonModule],
  templateUrl: './selection-dialog-component.html',
  styleUrl: './selection-dialog-component.css'
})
export class SelectionDialogComponent {

  /**
   * List of items to display in the dialog
   */
  @Input() items: IStarWarsVehicle[] | IStarWarsPeople[] | IStarWarsStarship[] = [];

  /**
   * Event emitter for item selection
   */
  @Output() selected = new EventEmitter<IStarWarsVehicle | IStarWarsPeople | IStarWarsStarship>();


  /**
   * Selects an item from the dialog and emits it
   * 
   * @param {IStarWarsVehicle | IStarWarsPeople | IStarWarsStarship} item selected item from the dialog
   */
  public selectItem(item: IStarWarsVehicle | IStarWarsPeople | IStarWarsStarship) {
    this.selected.emit(item);
    const modal = Modal.getInstance(document.getElementById('itemModal')!);
    modal?.hide();
  }
}

