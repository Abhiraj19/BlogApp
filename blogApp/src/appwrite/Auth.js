import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client=new Client ();
    account;
    constructor(){
        this.client.setEndpoint("conf.appwriteUrl")
        this.client.setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);


    }
    async CreateAccount({email,password,name}){
        try {
            const UserAccount= await this.account.create(ID.unique(),email,password,name);
            if (UserAccount) {
                // call another method 
                return this.login({email,password});
                
            } else {
                return UserAccount
            }
        } catch (error) {
            throw error
        }
    }
    async login({}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.getCurrentUser();
            
        } catch (error) {
            throw error
        }
        return null;
} 

    async logout(){
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            throw error
        }
    }
};
const authService=new AuthService();

export default authService;

