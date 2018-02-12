import {User} from '../dto/user';

export class BoardItemsFilterContainer {
  owner: User;

  constructor() {
    // default value
    this.owner = new User(-1, 'All', null, null);
  }
}
