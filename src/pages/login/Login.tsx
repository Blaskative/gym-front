import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useAuth from "@/hooks/useAuth";

const Login: FC<any> = (): JSX.Element => {
  const { setAuth,auth } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const LOGIN_URL = "/login";

  const login = async (data: any) => {
    let params = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post(LOGIN_URL, params, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          const token = response?.data?.token;
          const roles = response?.data?.roles;
          setAuth({roles, token });
          localStorage.setItem("auth", response.data.token);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="card mb-3" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">Login Form</h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-none"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {/*errors.email.message*/}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {/*errors.password.message*/}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button className="btn btn-outline-primary text-center shadow-none mb-3" type="submit">
                      Submit
                    </button>
                    <p className="card-text pb-2">
                      Have an Account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
