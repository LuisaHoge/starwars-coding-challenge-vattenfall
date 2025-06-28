import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  imports: [ReactiveFormsModule],
  templateUrl: './search-field-component.html',
  styleUrl: './search-field-component.css'
})
export class SearchFieldComponent {

  @Input() label!: string;
  @Input() control!: FormControl;

  get placeholderText(): string {
    return this.control?.validator ? `${this.label} *` : this.label;
  }

}
