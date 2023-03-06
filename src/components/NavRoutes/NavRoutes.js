import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Root from "../../containers/Root/Root";
import Details from "../../containers/Details/Details";
// const Details = lazy(() => import('../../containers/Details/Details'));

function NavRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Root />} />
            <Route exact path="/details" element={<Details />} />
            <Route path="*" element={
                <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                </main>
            }
            />
        </Routes>
    );
}

export default NavRoutes;
