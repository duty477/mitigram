import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() model = '';
  @Input() name = '';
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  changeModel(value: string): void {
    this.modelChange.emit(this.model);
  }
}
