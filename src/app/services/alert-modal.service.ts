import {Injectable} from '@angular/core';
import {AlertModalComponent} from "../partials/alert-modal/alert-modal.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertModalData} from "../utils/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  private dialogRef?: MatDialogRef<AlertModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  /**
   * Opens an alert modal dialog.
   * @param {AlertModalData} data - The data to pass to the modal.
   * @returns {Promise<void>} - A promise that resolves when the modal is closed.
   */
  openAlertModal(data: AlertModalData): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dialogRef = this.dialog.open(AlertModalComponent, {
        width: '500px',
        data,
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.dialogRef = undefined;
        resolve();
      });
    });
  }
}
