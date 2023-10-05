import {User} from "../models/user.model";

export interface MenuItem {
  text: string,
  url: string,
  icon?: string
}

export interface AlertModalData {
  title: string,
  message: string,
  additionalData?: string,
  emails?: string[],
  type: 'error' | 'success' | 'warning'
}

export interface EmailsListData {
  title: string,
  message: string,
  emails: string[],
  disabledSubmitBtn?: boolean
}

export interface NewUsersModalData {
  title: string,
  message: string
}
