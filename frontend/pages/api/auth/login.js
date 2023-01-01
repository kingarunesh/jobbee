import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            const response = await axios.post(
                `${process.env.API_URL}/api/token/`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.access) {
                res.setHeader("Set-Cookie", [
                    cookie.serialize("access", response.data.access, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 15,
                        sameSite: "lax",
                        path: "/",
                    }),
                ]);

                return res.status(200).json({
                    success: true,
                });
            } else {
                res.status(response.status).json({
                    error: "Authentication Failed",
                });
            }
        } catch (error) {
            console.log(error.response);
            res.status(500).json({
                error: error.response && error.response.data.error,
            });
        }
    }
};
