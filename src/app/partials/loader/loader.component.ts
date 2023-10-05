import {Component, EventEmitter} from '@angular/core';
import {fadeOutAnimation} from "../../utils/animations";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [fadeOutAnimation]
})
export class LoaderComponent {
  display = true;
  private static emitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    LoaderComponent.emitter.subscribe((res: boolean): void => {
      if (res && !this.display) {
        this.display = true;
      } else if (!res && this.display) {
        setTimeout(() => {
          this.display = false;
        }, 500); //on static data, the loader closes too fast :)
      }
    });
  }

  static toggleDisplay(state: boolean): void {
    this.emitter.emit(state);
  }
}
