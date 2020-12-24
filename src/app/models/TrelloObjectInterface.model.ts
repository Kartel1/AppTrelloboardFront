import { List } from './List.model';
import { Card } from './Card.model';

export interface TrelloObjectInterface {
  cards: Card;
  list: List;
}
