import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-users-short-list',
  templateUrl: './users-short-list.component.html',
  styleUrls: ['./users-short-list.component.scss']
})
export class UsersShortListComponent {
  @Input() contractors: User[] = [];
}
