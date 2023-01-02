import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function UpdateProfilePage() {
    return (
        <>
            <Layout title="Profile">
                <UpdateProfile />
            </Layout>
        </>
    );
}

export async function getServerSideProps({ req }) {
    const access_token = req.cookies.access;

    const user = await isAuthenticatedUser(access_token);

    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            access_token,
        },
    };
}
