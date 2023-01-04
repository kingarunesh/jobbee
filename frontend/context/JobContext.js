import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [created, setCreated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);
    const [deleted, setDeleted] = useState(null);

    //!     new job
    const newJob = async (data, access_token) => {
        try {
            setLoading(true);

            const res = await axios.post(`${process.env.API_URL}/api/jobs/new/`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            if (res.data) {
                setLoading(false);
                setCreated(true);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!     update job
    const updateJob = async (id, data, access_token) => {
        try {
            setLoading(true);

            const res = await axios.put(`${process.env.API_URL}/api/jobs/${id}/update/`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            if (res.data) {
                setLoading(false);
                setUpdated(true);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!     apply to job
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true);

            const res = await axios.post(
                `${process.env.API_URL}/api/jobs/${id}/apply/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            if (res.data.applied === true) {
                setLoading(false);
                setApplied(true);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!    check job applied
    const checkJobApplied = async (id, access_token) => {
        try {
            setLoading(true);

            const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            setLoading(false);
            setApplied(res.data);
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!    stats
    const getTopicStats = async (topic) => {
        try {
            setLoading(true);

            const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`);

            setLoading(false);
            setStats(res.data);
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!     delete job
    const deleteJob = async (id, access_token) => {
        try {
            setLoading(true);

            const res = await axios.delete(`${process.env.API_URL}/api/jobs/${id}/delete/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            setLoading(false);
            setDeleted(true);
        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    //!     clear error
    const clearErrors = () => {
        setError(null);
    };

    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                setUpdated,
                clearErrors,
                applyToJob,
                checkJobApplied,
                getTopicStats,
                stats,
                newJob,
                created,
                setCreated,
                updateJob,
                deleted,
                setDeleted,
                deleteJob,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export default JobContext;
//
