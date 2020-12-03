export interface TrelloCard {
    card_name: string;
    card_trello_id: string;
    start_processing: string;
    effort?: null;
    effort_done?: null;
    closed: boolean;
    list: List;
    sprint?: (SprintEntity)[] | null;
    isEdited: boolean;
    cardtracking?: (CardTracking) [] | null;
}
export interface List {
    list_name: string;
    board: Board;
}
export interface Board {
    board_name: string;
}
export interface SprintEntity {
    id: number;
    sprint_number: number;
    start_date: string;
    end_date: string;
    number_of_tasks: number;
}


export interface CardTracking{
    effort_remaining: number;
    day_of_sprint: number;
}