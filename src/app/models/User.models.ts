import { Organization } from './Organization.model';

export class User {

    constructor(public first_name: string,
                public last_name: string,
                public email: string,
                public trelloId: string,
                public username: string,
                public isAuthenticated: boolean,
                public organizations: Organization[],
                public slug: string,
                public has_random_password: boolean,
                public token?: string) {
    }
}
