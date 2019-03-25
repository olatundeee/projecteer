export interface Login {
    token: string;
    error: string;
    user: {
        role: string;
        _id: string;
        username: string;
    };
}
