import { List } from './List.model';
import { Card } from './Card.model';
export class TrelloObject {
  constructor(public cards: Card, public list: List) {}
}
