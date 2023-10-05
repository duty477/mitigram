import {Component, Input} from '@angular/core';
import {MenuItem} from "../../utils/interfaces";

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent {
  @Input() menu?: MenuItem;
  @Input() active = false;
}
