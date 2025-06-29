import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../social-login/SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const { logIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    logIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success('Logged in successful')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-100 p-5">
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email")}
          className="input w-full"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input w-full "
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p role="alert">Please enter password</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">password must be 6 characters long.</p>
        )}
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <button className="btn btn-primary text-black mt-4">Login</button>
        <p className="text-center">
          <small>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary transition duration-300 hover:underline"
            >
              Register
            </Link>
          </small>
        </p>
        <SocialLogin></SocialLogin>
      </fieldset>
    </form>
  );
};

export default Login;
