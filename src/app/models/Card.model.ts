import { List } from './List.model';
export class Card {
  constructor(
    public card_name: string,
    public card_trello_id: string,
    public start_processing: string,
    public effort: number,
    public effort_done: number,
    public closed: string,
    public list: List
  ) {}
}
