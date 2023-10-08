import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertModalData} from "../../utils/interfaces";

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertModalData,
    public dialogRef: MatDialogRef<AlertModalComponent>
  ) {
  }

  /**
   * Closes the current dialog or modal.
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
