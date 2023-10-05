import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {UsersListComponent} from './users-list.component';
import {User} from '../../models/user.model';
import {InputComponent} from "../../core/input/input.component";
import {AutocompleteComponent} from "../../core/autocomplete/autocomplete.component";
import {FilterUsersPipe} from "../../pipes/filter-users.pipe";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CheckboxComponent} from "../../core/checkbox/checkbox.component";
import {provideAngularSvgIcon, SvgIconComponent} from "angular-svg-icon";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, NgModelGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  template: `
    <app-users-list [users]="users"></app-users-list>
  `,
})
class TestHostComponent {
  users: User[] = [
    new User({
      id: '1',
      picture: '',
      name: {first: 'John', last: 'Doe'},
      company: 'Acme Inc.',
      email: 'john.doe@example.com',
      phone: '+1 (123) 456-7890',
      groups: ['Group A']
    })
  ];
}

describe('UsersListComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let usersListComponent: UsersListComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent, TestHostComponent, InputComponent, AutocompleteComponent, FilterUsersPipe, CheckboxComponent],
      imports: [MatAutocompleteModule, HttpClientModule, SvgIconComponent, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      providers: [provideAngularSvgIcon(), FilterUsersPipe]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(UsersListComponent));
    usersListComponent = debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(usersListComponent).toBeTruthy();
  });

  it('should display user data', () => {
    const userRows = debugElement.queryAll(By.css('.table tbody tr'));
    expect(userRows.length).toEqual(testHost.users.length);

    for (let i = 0; i < userRows.length; i++) {
      const userRow = userRows[i];
      const userData = testHost.users[i];

      // Test user name
      const userName = userRow.query(By.css('.name')).nativeElement.textContent;
      expect(userName).toContain(userData.name.first);
      expect(userName).toContain(userData.name.last);

      // Test company, email, phone, and groups
      expect(userRow.query(By.css('.company')).nativeElement.textContent).toContain(userData.company);
      expect(userRow.query(By.css('.email')).nativeElement.textContent).toContain(userData.email);
      expect(userRow.query(By.css('.phone')).nativeElement.textContent).toContain(userData.phone);
      const groupItems = userRow.queryAll(By.css('.groups li'));
      if (userData.groups) {
        expect(groupItems.length).toEqual(userData.groups.length);
        for (let j = 0; j < groupItems.length; j++) {
          const groupItem = groupItems[j];
          expect(groupItem.nativeElement.textContent).toContain(userData.groups[j]);
        }
      }
      // Test checkbox
      const checkbox = userRow.query(By.css('app-checkbox')).componentInstance;
      expect(checkbox.model).toBe(userData.selected);
    }
  });

  it('should emit selected users when checkboxes are clicked', () => {
    spyOn(usersListComponent.selectedUsers, 'emit');
    const userRows = debugElement.queryAll(By.css('.table tbody tr'));
    for (let i = 0; i < userRows.length; i++) {
      const userRow = userRows[i];
      const checkbox = userRow.query(By.css('app-checkbox')).componentInstance;
      checkbox.model = true;
      userRow.triggerEventHandler('click', null);
    }
    expect(usersListComponent.selectedUsers.emit).toHaveBeenCalledWith(testHost.users);
  });
});
