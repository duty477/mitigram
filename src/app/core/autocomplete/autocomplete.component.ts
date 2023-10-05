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
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();
  control = new FormControl();
  filteredOptions$?: Observable<string[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptions$ = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (filterValue === '') {
      this.modelChange.emit('');
    }
    return this.options.filter(option => this._normalizeValue(option).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getSelection(value: string): void {
    this.modelChange.emit(value);
  }
}
