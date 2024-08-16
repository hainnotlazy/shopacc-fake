import { Outlet } from "react-router-dom";

export function AdminDefaultLayout() {
    return (
        <div>
            <h1>Admin layout</h1>
            <Outlet />
        </div>
    );
}