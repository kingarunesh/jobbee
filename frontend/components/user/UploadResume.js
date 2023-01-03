import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UploadResume = ({ access_token }) => {
    const [resume, setResume] = useState(null);

    const { loading, error, user, clearErrors, uploaded, setUploaded, uploadResume } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }

        if (uploaded) {
            setUploaded(false);
            toast.success("Resume Uploaded Successfully.");
        }
    }, [error, uploaded]);

    const submitHandler = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("resume", resume);

        uploadResume(data, access_token);
    };

    const onChange = (e) => {
        setResume(e.target.files[0]);
    };

    return (
        <>
            <div className="modalMask">
                <div className="modalWrapper">
                    <div className="left">
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <Image
                                src="/images/resume-upload.svg"
                                alt="resume"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={true}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightContentWrapper">
                            <div className="headerWrapper">
                                <h3> UPLOAD RESUME </h3>
                            </div>
                            <form className="form" onSubmit={submitHandler}>
                                <div className="inputWrapper">
                                    <div className="inputBox">
                                        <i aria-hidden className="fas fa-upload"></i>
                                        <input
                                            type="file"
                                            name="resume"
                                            id="customFile"
                                            accept="application/pdf"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {user && user.resume && (
                                    <>
                                        <h4 className="text-center my-3">OR</h4>

                                        <Link
                                            href={`https://jobbeeresume.s3.ap-south-1.amazonaws.com/${user.resume}`}
                                            target="_blank"
                                        >
                                            <span className="text-success text-center ml-4" rel="noreferrer">
                                                <b>
                                                    <i aria-hidden className="fas fa-download"></i> Download Your Resume
                                                </b>
                                            </span>
                                        </Link>
                                    </>
                                )}

                                <div className="uploadButtonWrapper">
                                    <button type="submit" className="uploadButton">
                                        {loading ? "Uploading..." : "Upload"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadResume;
