import {Component, OnInit} from '@angular/core';
import {User, UserConstructor} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AlertModalService} from "../../services/alert-modal.service";
import {EmailsListModalService} from "../../services/emails-list-modal.service";
import {AlertModalData, NewUsersModalData} from "../../utils/interfaces";
import {LoaderComponent} from "../../partials/loader/loader.component";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss']
})
export class AddressBookPage implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  alertModalData: AlertModalData = {
    title: 'No users selected',
    message: 'Please select at least one user to continue',
    type: 'warning'
  }
  newUsersModalData: NewUsersModalData = {
    title: 'Add new users',
    message: 'Please enter the email addresses of the users you want to add',
  }

  constructor(
    private userService: UserService,
    private alertModalService: AlertModalService,
    private emailsListModalService: EmailsListModalService,
  ) {
  }

  ngOnInit(): void {
    this.userService.users.subscribe((users: User[]) => {
      this.users = users;
      LoaderComponent.toggleDisplay(false);
    });
  }

  ///get selected users
  getSelectedUsers(selectedUsers: User[]): void {
    this.selectedUsers = selectedUsers.map(user => ({...user, selected: false}));
  }

  ///events
  subscribeSelectedUsers(): void {
    this.userService.setContractors(this.selectedUsers).subscribe((result: {
      success: boolean,
      existingUsers: User[]
    }) => {
      if (result.success) {
        if (result.existingUsers.length) {
          this.alertModalService.openAlertModal({
            title: 'Users added',
            message: 'The selected users have been added to your address book',
            additionalData: 'List of users who have not been added because they already exist',
            emails: result.existingUsers.map((user: User) => user.email),
            type: 'success'
          });
        } else {
          this.alertModalService.openAlertModal({
            title: 'Users added',
            message: 'The selected users have been added to your address book',
            type: 'success'
          });
        }
      } else {
        this.alertModalService.openAlertModal({
          title: 'Error',
          message: 'There was an error adding the selected users to your address book',
          type: 'error'
        });
      }
      this.users.forEach((user: User) => {
        user.selected = false;
      });
    });
  }

  submitUsers(): void {
    if (this.selectedUsers.length) {
      this.emailsListModalService.openEmailsListModal({
        title: 'Selected users',
        message: 'Please confirm the following users to continue',
        emails: this.selectedUsers.map((user: User) => user.email),
      }).then((result: boolean) => {
        if (result) {
          this.subscribeSelectedUsers();
        }
      });
    } else {
      this.alertModalService.openAlertModal(this.alertModalData);
    }
  }

  addNewUsers(): void {
    this.emailsListModalService.openNewUsersModal(this.newUsersModalData).then((emails: boolean | string[]) => {
      if(Array.isArray(emails)) {
        this.emailsListModalService.openEmailsListModal({
          title: 'Selected users',
          message: 'Please confirm the following users to continue',
          emails: emails,
        }).then((result: boolean) => {
          if(result){
            for (const email of emails) {
              const userData: UserConstructor = {
                id: '',
                picture: '',
                name: {
                  first: 'User not',
                  last: 'on the lists',
                },
                company: '',
                email: email,
                phone: ''
              }
              const user: User = new User(userData);
              this.selectedUsers.push(user);
            }

            this.subscribeSelectedUsers();
          }
        });
      }
    });
  }
}
