import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { AuthenticatedLayout } from "@/components/pages/auth/components/authenticated-layout";
import DashBoardPage from "@/pages/dashboard/list";
import { AuthPage } from "@/components/pages/auth";
import { ErrorComponent } from "@refinedev/antd";


export const AppRoutes = () => (
    <Routes>
        <Route
            element={
                <Authenticated key="authenticated-routes" redirectOnFail="/login">
                    <AuthenticatedLayout>
                        <Outlet />
                    </AuthenticatedLayout>
                </Authenticated>
            }
        >
            <Route index element={<DashBoardPage />} />
        </Route>
        <Route element={
            <Authenticated key="auth-pages" fallback={<Outlet />}>
                <Navigate to="/" />
            </Authenticated>
        }
        >
            <Route path="/login" element={
                <AuthPage type="login" />
            }
            />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
    </Routes>
)