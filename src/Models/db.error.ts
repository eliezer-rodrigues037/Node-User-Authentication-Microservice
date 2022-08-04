class DatabaseError extends Error {
    constructor(public message: string, public error?: unknown) {
        super(message);
    }
}

export default DatabaseError;
