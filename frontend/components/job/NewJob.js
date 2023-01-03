import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import JobContext from "../../context/JobContext";

const NewJob = ({ access_token }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [jobType, setJobType] = useState("");
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");
    const [positions, setPositions] = useState("");
    const [company, setCompany] = useState("");

    const { error, clearErrors, loading } = useContext(JobContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            email,
            address,
            jobType,
            education,
            industry,
            experience,
            salary,
            positions,
            company,
        };

        // newJob(data, access_token);
    };

    return (
        <>
            <div className="newJobcontainer">
                <div className="formWrapper">
                    <div className="headerWrapper">
                        <div className="headerLogoWrapper"></div>
                        <h1>
                            <i aria-hidden className="fas fa-copy mr-2"></i> POST A JOB
                        </h1>
                    </div>
                    <form className="form">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="inputWrapper">
                                    <div className="inputBox">
                                        <i aria-hidden className="fab fa-tumblr"></i>
                                        <input type="text" placeholder="Enter Job Title" required />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-file-medical-alt"></i>
                                        <textarea
                                            className="description"
                                            type="text"
                                            placeholder="Enter Job Description"
                                            required
                                        />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-envelope"></i>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            pattern="\S+@\S+\.\S+"
                                            title="Your email is invalid"
                                            required
                                        />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-map-marker-alt"></i>
                                        <input type="text" placeholder="Enter Address" required />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-dollar-sign"></i>
                                        <input type="number" placeholder="Enter Salary Range" required />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-users"></i>
                                        <input type="number" placeholder="Enter No. of Positions" required />
                                    </div>
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-building"></i>
                                        <input type="text" placeholder="Enter Company Name" required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                                <div className="boxWrapper">
                                    <h4>Job Types:</h4>
                                    <div className="selectWrapper">
                                        <select className="classic">
                                            <option>Business</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="boxWrapper">
                                    <h4>Education:</h4>
                                    <div className="selectWrapper">
                                        <select className="classic">
                                            <option>Masters</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="boxWrapper">
                                    <h4>Industry:</h4>
                                    <div className="selectWrapper">
                                        <select className="classic">
                                            <option>Business</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="boxWrapper">
                                    <h4>Experience:</h4>
                                    <div className="selectWrapper">
                                        <select className="classic">
                                            <option>No Experience</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col text-center mt-3">
                                <button className="createButton">Create Job</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewJob;
