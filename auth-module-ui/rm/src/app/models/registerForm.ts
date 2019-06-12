export class RegisterForm{

    /*first_name: string;
    last_name: string;
    
    
    skype: string;
    tel: string;
    role: string[];*/
    password: string;
    username: string;
    email: string;

    constructor(username: string, password: string, email: string) {
               this.username = username;
        this.password = password;
        this.email = email;
    }

    /*constructor(first_name: string, last_name: string, username: string, email: string, tel: string, skype: string, password: string, roles: string[]) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.tel = tel;
        this.skype = skype;
        this.password = password;
        this.role = roles;
    }*/
}