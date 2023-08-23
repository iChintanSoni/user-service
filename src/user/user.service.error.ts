export class UserAlreadyExists extends Error {
  constructor(public message: string) {
    super();
  }
  name = 'UserAlreadyExistsError';
}

export class UserDoesNotExist extends Error {
  constructor(public message: string) {
    super();
  }
  name = 'UserDoesNotExistError';
}
