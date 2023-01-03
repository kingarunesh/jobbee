import axios from "axios";
import JobsApplied from "../../components/job/JobsApplied";
import Layout from "../../components/layout/Layout";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function JobAppliedPage({ jobs }) {
    return (
        <>
            <Layout title="Jobs Applieds">
                <JobsApplied jobs={jobs} />
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

    const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const jobs = res.data;

    return {
        props: {
            jobs,
        },
    };
}
