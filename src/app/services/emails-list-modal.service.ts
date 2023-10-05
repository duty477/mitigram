import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmailsListData, NewUsersModalData} from "../utils/interfaces";
import {EmailsListModalComponent} from "../partials/emails-list-modal/emails-list-modal.component";
import {NewUsersModalComponent} from "../partials/new-users-modal/new-users-modal.component";

@Injectable({
  providedIn: 'root'
})
export class EmailsListModalService {
  private dialogRef?: MatDialogRef<EmailsListModalComponent>;
  private dialogRefAddEmails?: MatDialogRef<NewUsersModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  openEmailsListModal(data: EmailsListData): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.dialogRef = this.dialog.open(EmailsListModalComponent, {
        width: '600px',
        data,
      });

      this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = undefined;
        resolve(result);
      });
    });
  }

  openNewUsersModal(data: NewUsersModalData): Promise<boolean | string[]> {
    return new Promise<boolean | string[]>((resolve, reject) => {
      this.dialogRefAddEmails = this.dialog.open(NewUsersModalComponent, {
        width: '600px',
        data,
      });

      this.dialogRefAddEmails.afterClosed().subscribe(result => {
        this.dialogRef = undefined;
        resolve(result);
      });
    });
  }
}
