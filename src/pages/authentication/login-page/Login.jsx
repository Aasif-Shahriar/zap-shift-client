import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../social-login/SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const { logIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log(data);
    logIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successful");
        navigate(from)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
 <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-md space-y-4">
  <h2 className="text-2xl font-bold text-center">Login</h2>

  {/* Email */}
  <div>
    <label className="label">
      <span className="label-text">Email</span>
    </label>
    <input
      type="email"
      {...register("email", { required: true })}
      className="input input-bordered w-full"
      placeholder="Email"
    />
    {errors.email?.type === "required" && (
      <p className="text-red-500 text-sm mt-1">Please enter your email</p>
    )}
  </div>

  {/* Password */}
  <div>
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input
      type="password"
      {...register("password", { required: true, minLength: 6 })}
      className="input input-bordered w-full"
      placeholder="Password"
    />
    {errors.password?.type === "required" && (
      <p className="text-red-500 text-sm mt-1">Please enter password</p>
    )}
    {errors.password?.type === "minLength" && (
      <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
    )}
    <div className="text-right mt-1">
      <a className="link link-hover text-sm">Forgot password?</a>
    </div>
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary text-black w-full">
    Login
  </button>

  {/* Switch to Register */}
  <p className="text-center text-sm">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="font-medium text-primary hover:underline "
    >
      Register
    </Link>
  </p>

  {/* Social Login */}
 
  <SocialLogin />
</form>

  );
};

export default Login;
