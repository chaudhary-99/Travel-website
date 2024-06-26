import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import backimg from '../images/background.jpg';


const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (

        <div className={styles.fullhome}>
            <div className={styles.home}>
                <div className={styles.upperhome}>
                    <img src={backimg} className={styles.img} alt="background" />
                </div>
                <div className={styles.lowerhome}>
                    {/* Empty div to allow lowerhome to take space */}
                </div>
                <div className={styles.signupFull}>
                    <div className={styles.signup_container}>
                        <div className={styles.signup_form_container}>
                            <div className={styles.left}>
                                <h1>Welcome Back</h1>
                                <Link to="/login">
                                    <button type="button" className={styles.white_btn}>
                                        Sign in
                                    </button>
                                </Link>
                            </div>
                            <div className={styles.right}>
                                <form className={styles.form_container} onSubmit={handleSubmit}>
                                    <h1>Create Account</h1>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        onChange={handleChange}
                                        value={data.firstName}
                                        required
                                        className={styles.input}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={data.lastName}
                                        required
                                        className={styles.input}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                        value={data.email}
                                        required
                                        className={styles.input}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        value={data.password}
                                        required
                                        className={styles.input}
                                    />
                                    {error && <div className={styles.error_msg}>{error}</div>}
                                    <button type="submit" className={styles.green_btn}>
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cross}>

                    </div>
                </div>

            </div>
        </div>


    );
};

export default Signup;
