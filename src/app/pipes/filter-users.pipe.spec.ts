import {FilterUsersPipe} from './filter-users.pipe';
import {User} from '../models/user.model';

describe('FilterUsersPipe', () => {
  let pipe: FilterUsersPipe;

  beforeEach(() => {
    pipe = new FilterUsersPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return users unfiltered when no filter queries provided', () => {
    const users: User[] = [
      new User({
        id: '1',
        picture: '',
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john.doe@example.com',
        company: 'Company A',
        phone: '+1 (123) 456-7890',
        groups: ['Group A', 'Group B']
      })
    ];
    const result = pipe.transform(users, '', '', '', '', '');
    expect(result).toEqual(users);
  });

  it('should filter users by name', () => {
    const users: User[] = [
      new User({
        id: '1',
        picture: '',
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john.doe@example.com',
        company: 'Company A',
        phone: '+1 (123) 456-7890',
        groups: ['Group A', 'Group B']
      }),
      new User({
        id: '2',
        picture: '',
        name: {
          first: 'Alice',
          last: 'Smith'
        },
        email: 'alice.smith@example.com',
        company: 'Company B',
        phone: '+1 (234) 567-8901',
        groups: ['Group C']
      }),
    ];
    const result = pipe.transform(users, 'John', '', '', '', '');
    expect(result.length).toBe(1);
    expect(result[0].name.first).toBe('John');
  });

  it('should filter users by group', () => {
    const users: User[] = [
      new User({
        id: '1',
        picture: '',
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john.doe@example.com',
        company: 'Company A',
        phone: '+1 (123) 456-7890',
        groups: ['Group A', 'Group B']
      }),
      new User({
        id: '2',
        picture: '',
        name: {
          first: 'Alice',
          last: 'Smith'
        },
        email: 'alice.smith@example.com',
        company: 'Company B',
        phone: '+1 (234) 567-8901',
        groups: ['Group C']
      }),
    ];
    const result = pipe.transform(users, '', '', '', '', 'Group A');
    expect(result.length).toBe(1);
    expect(result[0].groups?.includes('Group A')).toBe(true);
  });
});
