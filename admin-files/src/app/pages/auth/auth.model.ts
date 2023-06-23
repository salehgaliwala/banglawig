export interface Auth {
        username: string;
        password: string;
        remember?: boolean;
}

export interface User {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        type: string;
        profileImage: string;
        verified: boolean;
        roleId: number;
        createdAt: string;
        updatedAt: string;
        userRole: any;
}

export interface UserRes {
        success: boolean;
        result: {
                user: User;
                token: string;
        };
        message: string;
}