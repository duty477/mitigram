import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {User} from "../../models/user.model";
import {fadeInOutAnimation} from "../../utils/animations";
import {FilterUsersPipe} from "../../pipes/filter-users.pipe";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UsersListComponent {
  @Input() users: User[] = [];
  @Output() selectedUsers: EventEmitter<User[]> = new EventEmitter<User[]>(); //emits selected users
  selectAll: boolean = false;
  uniqueGroups: string[] = [];
  nameFilterQuery = '';
  lastNameFilterQuery = '';
  phoneFilterQuery = '';
  emailFilterQuery = '';
  groupsFilterQuery = '';
  sortByName = {
    asc: true,
    desc: false,
  }
  sortByCompany = {
    asc: false,
    desc: false,
  }
  sortByEmail = {
    asc: false,
    desc: false,
  }
  sortFunction: (a: User, b: User) => number = ((a, b) => {
    const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
    const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
    return this.sortByName.asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  constructor(private filterUsers: FilterUsersPipe, private userService: UserService) {
    this.userService.selectAll$.subscribe((selectAll: boolean) => {
      this.selectAll = selectAll;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.updateUsersByGroup();
    }
  }

  ///updates usersByGroup
  private updateUsersByGroup(): void {
    this.uniqueGroups = Array.from(
      new Set(this.users.map(user => user.groups || ["Without group"])
        .reduce((acc, current) => acc.concat(current), []))
    )
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  ///emits selected users
  emitSelectedUsers(): void {
    this.selectedUsers.emit(this.users.filter((user: User) => user.selected));
  }

  selectSingleUserDetector(): void {
    this.selectAll = this.users.every((user: User) => user.selected);
    this.emitSelectedUsers();
  }

  selectSingleUser(user: User): void {
    user.selected = !user.selected;
    this.selectAll = this.users.every((user: User) => user.selected);
    this.emitSelectedUsers();
  }

  selectAllUsers(): void {
    const filteredAndSortedUsers = this.filterUsers.transform(
      this.users,
      this.nameFilterQuery,
      this.lastNameFilterQuery,
      this.emailFilterQuery,
      this.phoneFilterQuery,
      this.groupsFilterQuery,
      this.sortFunction
    );
    filteredAndSortedUsers.forEach((user: User) => {
      user.selected = this.selectAll;
    });
    this.emitSelectedUsers();
  }

  ///sort functions
  sortUsersByName(): void {
    this.sortByName.asc = !this.sortByName.asc;
    this.sortByName.desc = !this.sortByName.asc;
    this.sortFunction = ((a, b) => {
      const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
      const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
      return this.sortByName.asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    ///disable other sort
    this.sortByCompany.asc = false;
    this.sortByCompany.desc = false;
    this.sortByEmail.asc = false;
    this.sortByEmail.desc = false;
  }

  sortUsersByCompany(): void {
    this.sortByCompany.asc = !this.sortByCompany.asc;
    this.sortByCompany.desc = !this.sortByCompany.asc;
    this.sortFunction = ((a, b) => {
      const companyA = a.company.toLowerCase();
      const companyB = b.company.toLowerCase();
      return this.sortByCompany.asc ? companyA.localeCompare(companyB) : companyB.localeCompare(companyA);
    });

    ///disable other sort
    this.sortByName.asc = false;
    this.sortByName.desc = false;
    this.sortByEmail.asc = false;
    this.sortByEmail.desc = false;
  }

  sortUsersByEmail(): void {
    this.sortByEmail.asc = !this.sortByEmail.asc;
    this.sortByEmail.desc = !this.sortByEmail.asc;
    this.sortFunction = ((a, b) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();
      return this.sortByEmail.asc ? emailA.localeCompare(emailB) : emailB.localeCompare(emailA);
    });

    ///disable other sort
    this.sortByName.asc = false;
    this.sortByName.desc = false;
    this.sortByCompany.asc = false;
    this.sortByCompany.desc = false;
  }

  ///events
  getGroupSelection(event: string): void {
    if (event === '' && this.selectAll) {
      this.selectAll = false;
    }
    this.groupsFilterQuery = event;
  }
}
