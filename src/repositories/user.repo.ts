import db from "../db";
import DatabaseError from "../Models/db.error";
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
        try {
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (error) {
            console.log(error);
            throw new DatabaseError("Erro na consulta por ID", error);
        }
    }

    async createUser(user: User): Promise<string> {
        const query = `
            INSERT INTO application_user (username, password)
            VALUES ( $1, crypt($2, '46c80be9e2805730fb9b1eb2f20d829cda256564'))
            RETURNING uuid;    
        `;

        const values = [user.name, user.password];

        const { rows } = await db.query<{ uuid: string }>(query, values);

        const [newUser] = rows;

        return newUser.uuid;
    }

    async editUser(user: User): Promise<void> {
        const query = `
            UPDATE application_user 
            SET 
                username = $1,
                password = crypt($2, '46c80be9e2805730fb9b1eb2f20d829cda256564')
            WHERE uuid = $3
        `;

        const values = [user.name, user.password, user.uuid];

        await db.query(query, values);
    }

    async remove(uuid: string): Promise<void> {
        const query = `
            DELETE 
            FROM application_user
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(query, values);
    }
}
export default new UserRepository();
