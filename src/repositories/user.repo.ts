import db from "../db";
import User from "../Models/user";

class UserRepository {
    async getUsers(): Promise<User[]> {
        const query = "SELECT uuid, username FROM application_user";

        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async getUser(id: string /*,password: string */): Promise<User> {
        const query = `
        SELECT uuid, username 
        FROM application_user 
        WHERE uuid = $1`; // WHERE password = $2

        const values = [id /*,password */]; // SQL injection prevetion.

        const { rows } = await db.query<User>(query, values);

        const [user] = rows;

        return user;
    }
}
export default new UserRepository();
