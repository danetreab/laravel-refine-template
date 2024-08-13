import type { AuthProvider } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
} from "@refinedev/core/dist/contexts/auth/types";
import { AuthenticatedUser, CheckRolePermissionResponseType, LoginResponseType, LoginType } from "@/types/auth-provider-type";
import { auth } from "@/api/auth";
import { LOCAL_USER_KEY, LOCAL_ACCESS_TOKEN, LOCAL_PERMISSIONS_KEY } from "@/config/local-storage-key";
import { axiosInstance } from "@/providers/rest-data-provider/utils";
import { API_URL } from "@/config/env-config";
import _ from "lodash";

export const authProvider: AuthProvider = {
    // required methods
    login: async ({ email, password }: LoginType): Promise<AuthActionResponse> => {

        const { data } = await axiosInstance.post<LoginResponseType>(
            API_URL+auth.login,
            {
                email,
                password,
            }
        );

        if (data.code === 200) {

            localStorage.setItem(LOCAL_ACCESS_TOKEN, data.data.token);
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data.data.user));


            return {
                success: true,
                user: {
                    email: data.data.user.email,
                    id: data.data.user.id,
                },
            };
        }


        return {
            success: false,
            error: {
                message: "Login Error",
                name: "Invalid email or password",
            },
        };
    },
    logout: async (params: any): Promise<AuthActionResponse> => {
        try {
            await axiosInstance.get<LoginResponseType>(
                API_URL + auth.logout,
            );
        } catch (error) {
            console.error('Logout request failed:', error);
        }
    
        if (localStorage.getItem(LOCAL_ACCESS_TOKEN)) {
            localStorage.removeItem(LOCAL_ACCESS_TOKEN);
        }
    
        return {
            success: true,
            redirectTo: "/login",
        };
    },

    check: async (params?: any): Promise<CheckResponse> => {
        try {
            const { data: userData } = await axiosInstance.get<AuthenticatedUser>(
                API_URL + auth.check,
            );
    
            // const { data: permissionData } = await axiosInstance.get<CheckRolePermissionResponseType>(
            //     API_URL + auth.checkRolePermission
            // );
    
            // if (permissionData.code === 200) {
            //     const permissions = permissionData.data.permissions.map((p) => {
            //         const [action, resource] = p.name.split(" ");
            //         return { resource, action };
            //     });
    
            //     localStorage.setItem(LOCAL_PERMISSIONS_KEY,JSON.stringify(permissions));
            // }
    
            if(userData.data && userData.data.user 
                // && permissionData.data.permissions
            ) {
                return {
                    authenticated: true
                }
            }
        } catch (error) {
            console.error(error);
        }
    
        return {
            authenticated: false
        }
    },
    
    onError: function (error: any): Promise<OnErrorResponse> {
        return Promise.resolve({
            success: false,
            error: {
                message: error.message,
                name: error.name,
            },
        });
    },

    getIdentity: async() => {
        const { data } = await axiosInstance.get<AuthenticatedUser>(
            API_URL + auth.check,
        );

        return data.data.user;

    }

};