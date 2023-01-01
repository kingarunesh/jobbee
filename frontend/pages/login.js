import React from "react";
import Login from "../components/auth/Login";
import Layout from "../components/layout/Layout";

export default function LoginPage() {
    return (
        <>
            <Layout title="Search Your Dream Job">
                <Login />
            </Layout>
        </>
    );
}
