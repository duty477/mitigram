import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {
  }

  get users(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

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

  deleteUsers(users: User[]): Observable<{ success: boolean, deletedUsers: User[] }> {
    const existingUsersJSON = localStorage.getItem('contractors');
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    const deletedUsers: User[] = [];

    for (const user of users) {
      existingUsers.splice(existingUsers.indexOf(user), 1);
      deletedUsers.push(user);
    }

    try {
      localStorage.setItem('contractors', JSON.stringify(existingUsers));
      return of({success: true, deletedUsers});
    } catch (error) {
      return throwError(() => error)
    }
  }

  private userExists(user: User, existingUsers: User[]): boolean {
    return existingUsers.some((existingUser: User) => {
      return existingUser.id === user.id && existingUser.email === user.email;
    });
  }
}
