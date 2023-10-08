import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AlertModalService} from "../../services/alert-modal.service";
import {EmailsListModalService} from "../../services/emails-list-modal.service";
import {AlertModalData} from "../../utils/interfaces";
import {LoaderComponent} from "../../partials/loader/loader.component";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss']
})
export class InvitationsPage implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  alertModalData: AlertModalData = {
    title: 'No users selected',
    message: 'Please select at least one user to continue',
    type: 'warning'
  }
  windowWidth = window.innerWidth;

  constructor(
    private userService: UserService,
    private alertModalService: AlertModalService,
    private emailsListModalService: EmailsListModalService,
  ) {
  }

  /**
   * Initializes the component when it is first created by calling getAllUsers().
   */
  ngOnInit() {
    this.getAllUsers();
  }

  /**
   *get all active users
   */
  getAllUsers(): void {
    this.userService.contractors.subscribe((users: User[]) => {
      this.users = users;
      LoaderComponent.toggleDisplay(false);
    });
  }

  /**
   * Sets the selected users based on the provided array of User objects.
   */
  getSelectedUsers(selectedUsers: User[]): void {
    this.selectedUsers = selectedUsers;
  }

  ///EVENTS

  /**
   * Handles the deletion of selected users.
   */
  deleteUsers(): void {
    if (this.selectedUsers.length) {
      this.emailsListModalService.openEmailsListModal({
        title: 'Selected users',
        message: 'Please confirm that you want to remove the following users',
        emails: this.selectedUsers.map((user: User) => user.email),
      }).then((result: boolean) => {
        if (result) {
          this.userService.deleteUsers(this.selectedUsers).subscribe((response: {
            success: boolean,
            deletedUsers: User[]
          }) => {
            if (response.success) {
              this.alertModalData = {
                title: 'Users deleted',
                message: 'The selected users have been deleted successfully',
                additionalData: 'Deleted users:',
                emails: response.deletedUsers.map((user: User) => user.email),
                type: 'success'
              }
              this.alertModalService.openAlertModal(this.alertModalData);
              this.getAllUsers(); ///get all users form local storage
              this.selectedUsers = []; ///empty selected users
            } else {
              this.alertModalData = {
                title: 'Error',
                message: 'An error occurred while deleting the selected users',
                type: 'error'
              }
              this.alertModalService.openAlertModal(this.alertModalData);
            }
          });
        }
      });
    } else {
      this.alertModalData = {
        title: 'No users selected',
        message: 'Please select at least one user to continue',
        type: 'warning'
      }
      this.alertModalService.openAlertModal(this.alertModalData);
    }
  }

  /**
   *Listens for the window resize event and updates the windowWidth property.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
  }
}
