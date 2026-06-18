import { User } from "../entities/user.entity";

export type UserDetails = {
    userfistname:string;
    userlastname: string;
    useremail: string;
    userpassword: string;
    userbirthdate: Date;
    usergender: number;
    userstatus? :boolean;

}


export type Done =  (err: Error | null, user?: User) => void;