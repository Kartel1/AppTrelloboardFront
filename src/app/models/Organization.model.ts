import { User } from './User.models';
import { Board } from './Board.model';
export class Organization {
  constructor(
    public organization_trello_id: string,
    public organization_name: string,
    public users?: User[],
    public boards?: Board[]
  ) {}
}
