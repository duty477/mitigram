import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmailsListData} from "../../utils/interfaces";

@Component({
  selector: 'app-emails-list-modal',
  templateUrl: './emails-list-modal.component.html',
  styleUrls: ['./emails-list-modal.component.scss']
})
export class EmailsListModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailsListData,
    public dialogRef: MatDialogRef<EmailsListModalComponent>
  ) {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    this.dialogRef.close(true);
  }
}
