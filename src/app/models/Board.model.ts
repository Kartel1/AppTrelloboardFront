import { List } from './List.model';
export class Board {
  constructor(
    public board_name: string,
    public board_trello_id: string,
    public board_short_url: string
  ) {}
}
