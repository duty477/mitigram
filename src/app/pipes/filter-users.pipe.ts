import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../models/user.model";

@Pipe({
  name: 'filterUsers'
})

// This pipe is responsible for filtering and sorting users based on various criteria.
export class FilterUsersPipe implements PipeTransform {
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

  private sortUsers(users: User[], sortFunction: (a: User, b: User) => number): User[] {
    return users.sort(sortFunction);
  }
}
