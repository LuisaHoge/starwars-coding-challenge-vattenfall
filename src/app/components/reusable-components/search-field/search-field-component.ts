import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

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
  /* Previous implementation:   
  public get placeholderText(): string {
    return this.control?.validator ? `${this.label} *` : this.label;
  } */
  public get placeholderText(): string {
    const validator = this.control?.validator?.({} as AbstractControl);
    const isRequired = validator?.['required'];

    return isRequired ? `${this.label} *` : this.label;
  }
}
