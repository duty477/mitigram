import {Component, Inject} from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewUsersModalData,
    public dialogRef: MatDialogRef<NewUsersModalComponent>
  ) {
  }

  addEmail(newEmailInput: HTMLInputElement, newEmailModel: NgModel): void {
    if(!newEmailModel.valid) return;

    const newEmail = newEmailInput.value.trim();
    if (newEmail && this.emailsList.indexOf(newEmail) === -1) {
      this.emailsList.push(newEmail);
      newEmailInput.value = '';
    }
  }

  removeEmail(index: number): void {
    if (index >= 0 && index < this.emailsList.length) {
      this.emailsList.splice(index, 1);
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(form: NgForm): void {
    if (form.valid && this.emailsList.length) {
      this.dialogRef.close(this.emailsList);
    }
  }
}
