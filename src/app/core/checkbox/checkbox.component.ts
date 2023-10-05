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

  change(newValue: boolean): void {
    this.model = newValue;
    this.modelChange.emit(this.model);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
  }
}
