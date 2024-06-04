import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  protected props: UserProps;

  protected constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);

    return user;
  }
}
