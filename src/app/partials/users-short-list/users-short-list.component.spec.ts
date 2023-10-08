import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UsersShortListComponent} from './users-short-list.component';
import {User} from '../../models/user.model';

describe('UsersShortListComponent', () => {
  let component: UsersShortListComponent;
  let fixture: ComponentFixture<UsersShortListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersShortListComponent]
    });
    fixture = TestBed.createComponent(UsersShortListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table when contractors are provided', () => {
    component.contractors = [
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
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('table');
    expect(tableElement).toBeTruthy();
  });

  it('should display user data correctly', () => {
    component.contractors = [
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
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('table tbody tr');
    expect(tableRows.length).toBe(1);

    const [tableRow] = tableRows;
    expect(tableRow.querySelector('.name').textContent).toContain('John Doe');
    if (window.innerWidth > 1024)
      expect(tableRow.querySelector('.company').textContent).toContain('Acme Inc.');
    if (window.innerWidth > 767)
      expect(tableRow.querySelector('.email').textContent).toContain('john.doe@example.com');
    if (window.innerWidth > 1024)
      expect(tableRow.querySelector('.phone').textContent).toContain('+1 (123) 456-7890');
    if (window.innerWidth > 767) {
      const groupItems = tableRow.querySelectorAll('.groups li');
      expect(groupItems.length).toBe(1);
      expect(groupItems[0].textContent).toContain('Group A');
    }
  });

  it('should not display a table when contractors are empty', () => {
    component.contractors = [];
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('table');
    expect(tableElement).toBeFalsy();
  });
});
