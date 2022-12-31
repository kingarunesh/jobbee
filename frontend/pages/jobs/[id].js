import axios from "axios";
import Layout from "../../components/layout/Layout";

export default function JobDetailPage({ job }) {
    console.log(job);

    return (
        <Layout>
            <h1>JobDetailPage</h1>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`);

    const job = res.data;

    return {
        props: {
            job,
        },
    };
}
