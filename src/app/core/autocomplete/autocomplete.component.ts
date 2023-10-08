import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['../input/input.component.scss', './autocomplete.component.scss'],
})
export class AutocompleteComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() options: string[] = [];
  @Input() model = '';
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();
  control = new FormControl();
  filteredOptions$?: Observable<string[]>;

  /**
   * Detects changes in input properties and updates the filtered options.
   * @param {SimpleChanges} changes - Object containing changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.control.setValue(this.model);
      this.filteredOptions$ = this.control.valueChanges.pipe(
        startWith(this.model),
        map(value => this.filter(value || '')),
      );
    }
  }

  /**
   * Filters options based on the input value.
   * @param {string} value - The input value to filter options.
   * @returns {string[]} - The filtered options.
   */
  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    if (filterValue === '') {
      this.modelChange.emit('');
    }
    return this.options.filter(option => this.normalizeValue(option).includes(filterValue));
  }

  /**
   * Normalizes a string value by converting it to lowercase and removing spaces.
   * @param {string} value - The input value to normalize.
   * @returns {string} - The normalized value.
   */
  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /**
   * Emits the selected value when a selection is made.
   * @param {string} value - The selected value.
   */
  getSelection(value: string): void {
    this.modelChange.emit(value);
  }
}
