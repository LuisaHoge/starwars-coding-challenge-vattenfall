import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Search Field Component
 */
@Component({
  selector: 'app-search-field',
  imports: [ReactiveFormsModule],
  templateUrl: './search-field-component.html',
  styleUrl: './search-field-component.css'
})
export class SearchFieldComponent {

  /**
   * Input Label
   */
  @Input() label!: string;
  
  /**
   * Input FormControl
   */
  @Input() control!: FormControl;

  /**
   * Placeholder text for the input field.
   */
  public get placeholderText(): string {
    return this.control?.validator ? `${this.label} *` : this.label;
  }

}
