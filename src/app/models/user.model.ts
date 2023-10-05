export interface UserConstructor {
  id: string;
  picture: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  groups?: string[];
}

export class User {
  id: string;
  picture: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  groups?: string[];
  selected: boolean;

  constructor(
    user: UserConstructor
  ) {
    this.id = user.id;
    this.picture = user.picture;
    this.name = user.name;
    this.company = user.company;
    this.email = user.email;
    this.phone = user.phone;
    this.groups = user.groups;
    this.selected = false;
  }
}
