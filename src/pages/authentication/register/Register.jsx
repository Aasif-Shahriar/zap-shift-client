import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../social-login/SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, setLoading, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result);
        setLoading(false);
        toast.success("logged in successful");
        //update user info in the database
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_logged_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        if(userRes.data.insertedId){
          toast.success('user info saved ✔️')
        };

        //update user profile in firebase
        const profileInfo = {
          displayName: data.name,
          photoURL: profilePhoto,
        };
        updateUserProfile(profileInfo)
          .then(() => {
            toast.success("Profile updated");
            navigate(from);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
    }
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );

    setProfilePhoto(res.data.data.url);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">
            Create An Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter your name
                </p>
              )}
            </div>

            {/* image */}
            <div>
              <label className="label">
                <span className="label-text">Upload image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="w-32 h-32 mt-2 object-cover rounded"
                />
              )}
            </div>

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
                <p className="text-red-500 text-sm mt-1">
                  Please enter your email
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  Please enter password
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Minimum 6 characters required
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 text-black"
            >
              Register
            </button>

            {/* Link to Login */}
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline "
              >
                Login
              </Link>
            </p>

            {/* Social Login */}

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
