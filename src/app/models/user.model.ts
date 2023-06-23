export interface UserRes {
        success: boolean;
        result: {
                user: User;
                token?: string;
        };
        message: string;
}

export interface User {
        id: number;
        name: string;
        username: string;
        email: string;
        password: string;
        verified: boolean;
        roleId: number;
        updatedAt: string;
        createdAt: string;
}


