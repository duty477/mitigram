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

  /**
   * Cancels or rejects the current dialog or modal by closing it with a 'false' result.
   */
  cancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Submits or accepts the current dialog or modal by closing it with a 'true' result.
   */
  submit(): void {
    this.dialogRef.close(true);
  }
}
