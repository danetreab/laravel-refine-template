
export const auth = {
    login: "/auth/login",
    logout: "/auth/logout",
    check: "/auth/check",
    checkAuthorization: ({resourceName, action}: {resourceName?: string, action:string}) => {
        const params = new URLSearchParams();
        params.append("resource", resourceName || "");
        params.append("action", action);
      return `/auth/check-authorize-resource?${params.toString()}`;
    },
    checkRolePermission: '/auth/check-role-permission',
}