import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/data/users.json';
  private selectAllSubject = new BehaviorSubject<boolean>(false);
  selectAll$ = this.selectAllSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves a list of users from the API.
   * @returns {Observable<User[]>} - An observable of user data.
   */
  get users(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  /**
   * Retrieves a list of contractors from local storage.
   * @returns {Observable<User[]>} - An observable of contractor data.
   */
  get contractors(): Observable<User[]> {
    const contractorsJSON = localStorage.getItem('contractors');
    if (contractorsJSON) {
      return new Observable<User[]>(observer => {
        const invitations = JSON.parse(contractorsJSON);
        observer.next(invitations);
        observer.complete();
      });
    } else {
      return new Observable<User[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  /**
   * Sets contractors in local storage and returns success status and existing users.
   * @param {User[]} users - The list of users to set as contractors.
   * @returns {Observable<{ success: boolean, existingUsers: User[] }>} - An observable with success status and existing users.
   */
  setContractors(users: User[]): Observable<{ success: boolean, existingUsers: User[] }> {
    const existingInvitationsJSON = localStorage.getItem('contractors');
    const existingUsers = existingInvitationsJSON ? JSON.parse(existingInvitationsJSON) : [];
    const usersThatAlreadyExist: User[] = [];

    for (const newUser of users) {
      if (!this.userExists(newUser, existingUsers)) {
        existingUsers.push(newUser);
      } else {
        usersThatAlreadyExist.push(newUser);
      }
    }

    try {
      localStorage.setItem('contractors', JSON.stringify(existingUsers));
      return of({success: true, existingUsers: usersThatAlreadyExist});
    } catch (error) {
      return throwError(() => error)
    }
  }

  /**
   * Deletes selected users from contractors in local storage.
   * @param {User[]} users - The list of users to delete.
   * @returns {Observable<{ success: boolean, deletedUsers: User[] }>} - An observable with success status and deleted users.
   */
  deleteUsers(users: User[]): Observable<{ success: boolean, deletedUsers: User[] }> {
    const existingUsersJSON = localStorage.getItem('contractors');
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    const deletedUsers: User[] = [];

    for (const user of users) {
      const index = existingUsers.findIndex((existingUser: User) => existingUser.id === user.id);
      if (index !== -1) {
        existingUsers.splice(index, 1);
        deletedUsers.push(user);
      }
    }

    try {
      localStorage.setItem('contractors', JSON.stringify(existingUsers));
      return of({success: true, deletedUsers});
    } catch (error) {
      return throwError(() => error)
    }
  }

  /**
   * Sets the selectAllSubject's value to control the select all behavior.
   * @param {boolean} selectAll - The new selectAll value.
   */
  setSelectAll(selectAll: boolean): void {
    this.selectAllSubject.next(selectAll);
  }

  /**
   * Checks if a user exists in the list of existing users.
   * @param {User} user - The user to check.
   * @param {User[]} existingUsers - The list of existing users.
   * @returns {boolean} - True if the user exists, otherwise false.
   */
  private userExists(user: User, existingUsers: User[]): boolean {
    return existingUsers.some((existingUser: User) => {
      return existingUser.id === user.id && existingUser.email === user.email;
    });
  }
}
