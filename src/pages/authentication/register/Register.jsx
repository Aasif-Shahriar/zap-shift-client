import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../social-login/SocialLogin";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        setLoading(false);
        toast.success('logged in successful')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero">
      <div className="card w-full shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Create An Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Please enter your email</p>
              )}
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Please enter password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Minimum characters 6</p>
              )}
              <button className="btn btn-primary text-black mt-4">
                Register
              </button>
            </fieldset>
            <p className="text-center">
              <small>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary transition duration-300 hover:underline"
                >
                  Login
                </Link>
              </small>
            </p>
          <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
