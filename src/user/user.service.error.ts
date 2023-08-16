export class UserAlreadyExists extends Error {
  constructor(public message: string) {
    super();
  }
  name: string;
}
