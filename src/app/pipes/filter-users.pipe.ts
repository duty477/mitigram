import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../models/user.model";

@Pipe({
  name: 'filterUsers'
})

/**
 * Custom Angular Pipe for filtering and sorting User objects based on various criteria.
 */
export class FilterUsersPipe implements PipeTransform {

  /**
   * Transforms the input array of users based on filter queries and optional sorting function.
   * @param {User[]} users - The input array of User objects to filter and sort.
   * @param {string} nameFilterQuery - The query for filtering user names.
   * @param {string} lastNameFilterQuery - The query for filtering user last names.
   * @param {string} emailFilterQuery - The query for filtering user emails.
   * @param {string} phoneFilterQuery - The query for filtering user phone numbers.
   * @param {string} groupsFilterQuery - The query for filtering user groups.
   * @param {(a: User, b: User) => number} sortFunction - An optional sorting function.
   * @returns {User[]} - The filtered and sorted array of User objects.
   */
  transform(users: User[],
            nameFilterQuery: string,
            lastNameFilterQuery: string,
            emailFilterQuery: string,
            phoneFilterQuery: string,
            groupsFilterQuery: string,
            sortFunction?: (a: User, b: User) => number): User[] {

    let filteredUsers = users.filter(user => {
      const nameFilter = nameFilterQuery ? user.name.first.toLowerCase().includes(nameFilterQuery.toLowerCase()) : true;
      const lastNameFilter = lastNameFilterQuery ? user.name.last.toLowerCase().includes(lastNameFilterQuery.toLowerCase()) : true;
      const emailFilter = emailFilterQuery ? user.email.toLowerCase().includes(emailFilterQuery.toLowerCase()) : true;
      const phoneFilter = phoneFilterQuery ? user.phone.toLowerCase().includes(phoneFilterQuery.toLowerCase()) : true;

      const groups = user.groups || []; // Handling the case when groups do not exist or are null
      const groupFilter = (!groupsFilterQuery) ? true // No filter means no group filtering
        : groupsFilterQuery.toLowerCase() === 'without group' // Without group
          ? !groups.length // Without group
          : groups.some(group => group.toLowerCase() === groupsFilterQuery.toLowerCase()); // Different group

      user.selected = false;//clear selections

      return nameFilter && lastNameFilter && emailFilter && phoneFilter && groupFilter;
    });

    if (sortFunction) {
      filteredUsers = this.sortUsers(filteredUsers, sortFunction);
    }

    return filteredUsers;
  }

  /**
   * Sorts an array of users using the provided sorting function.
   * @param {User[]} users - The array of User objects to be sorted.
   * @param {(a: User, b: User) => number} sortFunction - The sorting function.
   * @returns {User[]} - The sorted array of User objects.
   */
  private sortUsers(users: User[], sortFunction: (a: User, b: User) => number): User[] {
    return users.sort(sortFunction);
  }
}
