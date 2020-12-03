import { Board } from './Board.model';
import { Card } from './Card.model';
export class List {
    constructor(public list_name: string,
                public list_trello_id: string,
                public creation_date: string,
                public closed: boolean,
                public board: Board) {

    }
}
