
import { UsersMaster } from './users-model';
export class UsersResultBean{
    
    success: boolean;
    usersMasterBean:UsersMaster;
    usersMasterDetails: [];
    roleList:[];
    roles:[];
    dropdownList:[];
    roleListForPopUp:[];
}