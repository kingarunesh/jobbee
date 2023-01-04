import Link from "next/link";
import DataTable from "react-data-table-component";

const JobCandidates = ({ candidatesApplied }) => {
    console.log(candidatesApplied);
    const columns = [
        {
            name: "Job Name",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "User ID",
            sortable: true,
            selector: (row) => row.id,
        },
        {
            name: "Candidate Resume",
            sortable: true,
            selector: (row) => row.resume,
        },

        {
            name: "Applied At",
            sortable: true,
            selector: (row) => row.appliedAt,
        },
    ];

    const data = [];

    candidatesApplied &&
        candidatesApplied.forEach((item) => {
            data.push({
                title: item.job.title,
                id: item.user,
                salary: item.salary,
                resume: (
                    <Link href={`https://jobbeeresume.s3.ap-south-1.amazonaws.com/${item.resume}`} target="_blank">
                        <span className="text-success text-center ml-4" rel="noreferrer">
                            <b>
                                <i aria-hidden className="fas fa-download"></i> View Resume
                            </b>
                        </span>
                    </Link>
                ),
                appliedAt: item.createdAt.substring(0, 10),
            });
        });

    return (
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5">
                    <h4 className="my-5">{candidatesApplied && `${candidatesApplied.length} candidates applied to job`}</h4>
                    <DataTable columns={columns} data={data} />
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
};

export default JobCandidates;
