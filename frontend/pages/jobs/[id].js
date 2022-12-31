import axios from "axios";
import Layout from "../../components/layout/Layout";

export default function JobDetailPage({ job, candidates }) {
    console.log(job);
    console.log(candidates);

    return (
        <Layout>
            <h1>JobDetailPage</h1>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`);

    const job = res.data.job;
    const candidates = res.data.candidates;

    return {
        props: {
            job,
            candidates,
        },
    };
}
