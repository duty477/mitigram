import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {User} from "../../models/user.model";
import {fadeInOutAnimation, menuAnimation} from "../../utils/animations";
import {FilterUsersPipe} from "../../pipes/filter-users.pipe";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [fadeInOutAnimation, menuAnimation]
})
export class UsersListComponent {
  @Input() users: User[] = [];
  @Output() selectedUsers: EventEmitter<User[]> = new EventEmitter<User[]>(); //emits selected users
  @ViewChild('tableWrap') tableWrap?: ElementRef;
  selectAll = false;
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
  showFiltersAnim = window.innerWidth >= 768;
  showFiltersBtn = window.innerWidth <= 767;
  windowWidth = window.innerWidth;
  addFirstColumnShadow = false;
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

  /**
   * Detects changes in input properties and updates the uniqueGroups list.
   * If the 'users' input changes and has a current value, the 'updateUsersByGroup' method is called.
   * @param {SimpleChanges} changes - Object containing changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.updateUsersByGroup();
    }
  }

  /**
   * Updates the uniqueGroups array based on the groups of the users.
   * Filters and reduces the user groups to obtain unique groups.
   */
  private updateUsersByGroup(): void {
    this.uniqueGroups = Array.from(
      new Set(this.users.map(user => user.groups || ["Without group"])
        .reduce((acc, current) => acc.concat(current), []))
    )
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  /**
   * Emits the selected users to the parent component using the selectedUsers EventEmitter.
   */
  emitSelectedUsers(): void {
    this.selectedUsers.emit(this.users.filter((user: User) => user.selected));
  }

  /**
   * Updates the selectAll flag based on whether all users are selected and emits selected users.
   */
  selectSingleUserDetector(): void {
    this.selectAll = this.users.every((user: User) => user.selected);
    this.emitSelectedUsers();
  }

  /**
   * Toggles the selected state of a user and updates selectAll flag accordingly.
   * @param {User} user - The user to select or deselect.
   */
  selectSingleUser(user: User): void {
    user.selected = !user.selected;
    this.selectAll = this.users.every((user: User) => user.selected);
    this.emitSelectedUsers();
  }

  /**
   * Selects or deselects all users based on the selectAll flag.
   * Applies filters and sorting to the users and emits selected users.
   */
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

  /**
   * Sorts the users by name in ascending or descending order.
   */
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

  /**
   * Sorts the users by company in ascending or descending order.
   */
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

  /**
   * Sorts the users by email in ascending or descending order.
   */
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

  /**
   * Updates the group selection and the selectAll flag.
   * @param {string} event - The selected group.
   */
  getGroupSelection(event: string): void {
    if (event === '' && this.selectAll) {
      this.selectAll = false;
    }
    this.groupsFilterQuery = event;
  }

  /**
   * Listens for the table scroll event and updates the addFirstColumnShadow flag based on scroll position.
   * @param {Event} event - The scroll event.
   */
  onTableScroll(event: Event): void {
    if (this.tableWrap)
      this.addFirstColumnShadow = this.tableWrap.nativeElement.scrollLeft > 0;
  }

  /**
   * Toggles the visibility of filters animation and button based on window width.
   */
  toggleFilters(): void {
    this.showFiltersAnim = !this.showFiltersAnim;
  }

  /**
   * Listens for the window resize event and updates 'windowWidth', 'showFiltersAnim', and 'showFiltersBtn' accordingly.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
    this.showFiltersAnim = window.innerWidth >= 768;
    this.showFiltersBtn = window.innerWidth <= 767;
  }
}
