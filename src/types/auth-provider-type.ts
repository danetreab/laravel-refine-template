export interface LoginType {
    email: string;
    password: string;
}

export interface LoginResponseType {
    code:    number;
    message: string;
    data:    Data;
    errors:  any[];
}

export interface Data {
    token: string;
    user:  User;
}

export interface User {
    id:              number;
    name:            string;
    email:           string;
}
export interface AuthenticatedUser {
    code:    number;
    message: string;
    data:    Data;
    errors:  any[];
}

export interface Data {
    user: User;
}

export interface User {
    id:              number;
    name:            string;
    email:           string;
    province_name:   null;
    district_name:   null;
    commune_name:    null;
    village_name:    null;
    adr_province_id: null;
    adr_district_id: null;
    adr_commune_id:  null;
    adr_village_id:  null;
    created_at:      Date;
    admin_role:      AdminRole;
}

export interface AdminRole {
    id:          number;
    name:        string;
    company_id:  null;
    description: string;
    is_active:   number;
    created_by:  string;
    updated_by:  null;
    created_at:  Date;
    updated_at:  Date;
}


export interface CheckAuthorizationResponseType {
    code:    number;
    message: string;
    data:    Data;
    errors:  any[];
}

export interface Data {
    authorize: boolean;
}


export interface CheckRolePermissionResponseType {
    code:    number;
    message: string;
    data:    Data;
    errors:  any[];
}

export interface Data {
    role:        string[];
    permissions: Permission[];
}

export interface Permission {
    id:         number;
    name:       string;
    guard_name: GuardName;
    created_at: Date;
    updated_at: Date;
    pivot:      Pivot;
}

export enum GuardName {
    Web = "web",
}

export interface Pivot {
    role_id:       number;
    permission_id: number;
}

export interface CheckErrorResponse {
    code:    number;
    message: string;
    data:    null;
    error:   null;
}
