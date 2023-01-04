import Link from "next/link";
import DataTable from "react-data-table-component";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import JobContext from "../../context/JobContext";
import { useRouter } from "next/router";

const MyJobs = ({ jobs, access_token }) => {
    const { error, clearErrors, loading, deleted, setDeleted, deleteJob } = useContext(JobContext);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }

        if (deleted) {
            setDeleted(false);
            toast.success("Job Delete Successfully");
            router.push(router.asPath);
        }
    }, [error, deleted]);

    const deleteHandler = (id) => {
        deleteJob(id, access_token);
    };

    const columns = [
        {
            name: "Job ID",
            sortable: true,
            selector: (row) => row.id,
        },
        {
            name: "Job Name",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
        },

        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action,
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((job) => {
            data.push({
                id: job.id,
                title: job.title,
                salary: job.salary,
                action: (
                    <>
                        <Link href={`/jobs/${job.id}`}>
                            <span className="btn btn-primary">
                                <i aria-hidden className="fa fa-eye"></i>
                            </span>
                        </Link>

                        <Link href={`/employeer/jobs/candidates/${job.id}`}>
                            <span className="btn btn-success my-2 mx-1">
                                <i aria-hidden className="fa fa-users"></i>
                            </span>
                        </Link>

                        <Link href={`/employeer/jobs/${job.id}`}>
                            <span className="btn btn-warning my-2 mx-1">
                                <i aria-hidden className="fa fa-pencil"></i>
                            </span>
                        </Link>

                        <button className="btn btn-danger mx-1" onClick={() => deleteHandler(job.id)}>
                            <i aria-hidden className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

    return (
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5">
                    <h4 className="my-5">Job Applied</h4>
                    <DataTable columns={columns} data={data} />
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
};

export default MyJobs;
