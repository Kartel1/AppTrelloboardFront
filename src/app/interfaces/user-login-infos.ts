export interface UserLoginInfo {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    is_authenticated: boolean;
    personne?: (PersonneEntity)[] | null;
}
export interface PersonneEntity {
    id: number;
    user_infos: string;
    slug: string;
    organizations?: (number)[] | null;
    trello_id: string;
    has_random_password: boolean;
}
