
export class UsersList
{

    orgId?: string;
    /**
     * Constructor
     *
     * @param userlist
     */
    constructor(userlist?)
    {
        userlist = userlist || {};
        this.orgId = userlist.orgId || '';
    }
}