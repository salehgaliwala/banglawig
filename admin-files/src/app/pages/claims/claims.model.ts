import { User } from '../auth/auth.model';

export interface StatusRes {
        success: boolean;
        result: string[];
        message: string;
}

export interface Claim {
        id: number;
        productId: number;
        title: string;
        description: string;        
        createdAt: string;
        updatedAt: string;
       
}
export interface ClaimAdd {
        productId: number;
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
}

export interface claimsDetail {
        id: number;
        productId: number;
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
}

export interface ClaimRes{
        success: boolean;
        result: {
                count: number;
                rows: Claim[];
        };
        message: string;
}