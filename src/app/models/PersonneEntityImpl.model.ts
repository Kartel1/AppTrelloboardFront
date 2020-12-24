import { PersonneEntity } from './../interfaces/user-login-infos';
class PersonneEntityImpl implements PersonneEntity {
  id: number;
  user_infos: string;
  slug: string;
  organizations?: number[] | null;
  trello_id: string;
  has_random_password: boolean;
}
