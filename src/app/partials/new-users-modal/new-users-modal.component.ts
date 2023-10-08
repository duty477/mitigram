import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NewUsersModalData} from "../../utils/interfaces";
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-new-users-modal',
  templateUrl: './new-users-modal.component.html',
  styleUrls: ['../../core/input/input.component.scss', './new-users-modal.component.scss']
})
export class NewUsersModalComponent {
  emailsList: string[] = [];
  windowWidth: number = window.innerWidth;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewUsersModalData,
    public dialogRef: MatDialogRef<NewUsersModalComponent>
  ) {
  }

  /**
   * Adds a new email to the emailsList array if it is valid and not already in the list.
   * @param {HTMLInputElement} newEmailInput - The input element for entering a new email.
   * @param {NgModel} newEmailModel - The NgModel instance for validating the new email.
   */
  addEmail(newEmailInput: HTMLInputElement, newEmailModel: NgModel): void {
    if (!newEmailModel.valid) return;

    const newEmail = newEmailInput.value.trim();
    if (newEmail && this.emailsList.indexOf(newEmail) === -1) {
      this.emailsList.push(newEmail);
      newEmailInput.value = '';
    }
  }

  /**
   * Removes an email from the emailsList array at the specified index.
   * @param {number} index - The index of the email to be removed.
   */
  removeEmail(index: number): void {
    if (index >= 0 && index < this.emailsList.length) {
      this.emailsList.splice(index, 1);
    }
  }

  /**
   * Cancels or rejects the current dialog or modal by closing it with a 'false' result.
   */
  cancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Submits or accepts the current dialog or modal by closing it with the emailsList as a 'true' result if the form is valid and there are emails in the list.
   * @param {NgForm} form - The NgForm instance for validating the form.
   */
  submit(form: NgForm): void {
    if (form.valid && this.emailsList.length) {
      this.dialogRef.close(this.emailsList);
    }
  }

  /**
   * Listens for the window resize event and updates 'windowWidth' accordingly.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
  }
}
