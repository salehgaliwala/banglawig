export interface usersRes {
        success: boolean;
        result: {
                count: number;
                rows: Users[];
        };
        message: string;
}

export interface UsersSingleRes {
        success: boolean;
        result: Users;
        message: string;
}

export interface Users {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        type: string;
        profileImage: string;
        verified: boolean,
        resetCode: string;
        resetExpiresIn: string;
        createdAt: string;
        updatedAt: string;
        roleId?: number;
        userRole?: UsersRole
}

export interface UsersRole {
        id: number;
        title: string;
        description: string;
}