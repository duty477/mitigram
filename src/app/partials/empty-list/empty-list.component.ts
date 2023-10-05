import {Component, Input} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent {
  @Input() label = 'No contractors found';
  @Input() modifier = '';
  lottieOptions: AnimationOptions = {
    path: 'assets/animations/empty_list.json',
  }
}
