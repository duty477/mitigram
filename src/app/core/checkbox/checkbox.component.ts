import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() modifier = '';
  @Input() isDisabled = false;
  @Input() isReadOnly = false;
  @Input() model = false;
  @Output() modelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Updates the model value and emits the updated value.
   * @param {boolean} newValue - The new value to set for the model.
   */
  change(newValue: boolean): void {
    this.model = newValue;
    this.modelChange.emit(this.model);
  }

  /**
   * Prevents the click event from propagating further.
   * @param {Event} event - The click event.
   */
  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
  }
}
