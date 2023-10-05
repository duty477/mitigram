export interface NotificationConstructor {
  _id: number;
  header: string;
  body: string;
}

export class Notification {
  private _id: number;
  header: string;
  body: string;

  constructor(
    notification: NotificationConstructor
  ) {
    this._id = notification._id;
    this.header = notification.header;
    this.body = notification.body;
  }

  get notificationID(): number {
    return this._id;
  }
}
