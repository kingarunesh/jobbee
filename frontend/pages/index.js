import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios";

export default function Index({ data }) {
    return (
        <>
            <Layout>
                <Home data={data} />
            </Layout>
        </>
    );
}

export async function getServerSideProps({ query }) {
    //!     search
    const keyword = query.keyword || "";
    const location = query.location || "";

    //!     pagination
    const page = query.page || 1;

    //!     filter
    const jobType = query.jobType || "";
    const education = query.education || "";
    const experience = query.experience || "";
    let min_salary = "";
    let max_salary = "";

    if (query.salary) {
        const [min, max] = query.salary.split("-");

        min_salary = min;
        max_salary = max;
    }

    const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

    const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`);

    const data = res.data;

    return {
        props: {
            data,
        },
    };
}
