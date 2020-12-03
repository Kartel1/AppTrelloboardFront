import { Board } from './Board.model';
import { List } from './List.model';
import { Card } from './Card.model';
import { Organization } from './Organization.model';

export interface TrelloObjectInterface {
    cards: Card;
    list: List;
}
