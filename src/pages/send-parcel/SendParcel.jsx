import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const { user } = useAuth();
  const warehouses = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Get unique districts for select options
  const getUniqueDistricts = () => {
    const seen = new Set();
    return warehouses.filter((w) => {
      if (!seen.has(w.district)) {
        seen.add(w.district);
        return true;
      }
      return false;
    });
  };

  // Get covered areas (warehouses) array by district name
  const getCoveredAreasByDistrict = (district) => {
    return warehouses
      .filter((w) => w.district === district)
      .flatMap((w) => w.covered_area);
  };

  // Calculate cost and breakdown HTML for Swal
  const calculateCostBreakdown = (data) => {
    const isSameDistrict = data.senderRegion === data.receiverRegion;
    const weight = parseFloat(data.weight) || 0;
    const type = data.type;

    let baseRate = 0;
    let extraWeightFee = 0;
    let deliveryFee = 0;
    let total = 0;
    let breakdownHTML = "";

    if (type === "document") {
      baseRate = isSameDistrict ? 60 : 80;
      total = baseRate;
      breakdownHTML = `
        <p><b>Parcel Type:</b> Document</p>
        <p><b>Delivery:</b> ${
          isSameDistrict ? "Within City" : "Outside City"
        }</p>
        <p><b>Base Cost:</b> ৳${baseRate}</p>
      `;
    } else {
      if (weight <= 3) {
        baseRate = isSameDistrict ? 110 : 150;
        total = baseRate;
        breakdownHTML = `
          <p><b>Parcel Type:</b> Non-Document</p>
          <p><b>Weight:</b> ${weight} kg (≤ 3kg)</p>
          <p><b>Delivery:</b> ${
            isSameDistrict ? "Within City" : "Outside City"
          }</p>
          <p><b>Base Cost:</b> ৳${baseRate}</p>
        `;
      } else {
        baseRate = isSameDistrict ? 110 : 150;
        const extraWeight = Math.ceil(weight - 3);
        extraWeightFee = extraWeight * 40;
        deliveryFee = isSameDistrict ? 0 : 40;
        total = baseRate + extraWeightFee + deliveryFee;

        breakdownHTML = `
          <p><b>Parcel Type:</b> Non-Document</p>
          <p><b>Weight:</b> ${weight} kg (> 3kg)</p>
          <p><b>Delivery:</b> ${
            isSameDistrict ? "Within City" : "Outside City"
          }</p>
          <p><b>Base Cost (first 3kg):</b> ৳${baseRate}</p>
          <p><b>Extra Weight Fee:</b> ${extraWeight}kg × 40 = ৳${extraWeightFee}</p>
          ${
            deliveryFee
              ? `<p><b>Outside District Fee:</b> ৳${deliveryFee}</p>`
              : ""
          }
        `;
      }
    }

    return {
      total,
      breakdownHTML: `
        <div style="text-align: left; font-size: 16px">
          ${breakdownHTML}
          <hr style="margin: 10px 0;" />
          <p style="font-size: 18px"><b>Total Delivery Cost: <span style="color: green">৳${total}</span></b></p>
        </div>
      `,
    };
  };

  // Submit handler with Swal confirmation modal
  const onSubmit = async (data) => {
    const { total, breakdownHTML } = calculateCostBreakdown(data);

    const result = await Swal.fire({
      title: "Confirm Parcel Booking",
      html: breakdownHTML,
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Modify Details",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      handleConfirm(data, total);
    }
  };

  // Handle final parcel saving
  const handleConfirm = (data, cost) => {
    const parcel = {
      ...data,
      deliveryCost: cost, // <-- Save the calculated cost here
      createdAt: new Date().toISOString(),
      createdBy: user?.email || "unknown",
      delivery_status: "pending",
      paymentStatus: "unpaid",
      tracking_id: generateTrackingID(),
    };

    console.log("Saving parcel:", parcel);
    // TODO: Save parcel via API call
    axiosSecure
      .post("/parcels", parcel)
      .then((res) => {
        if (res.data.insertedId) {
          //here will add the redirect route to payment page: Later

          Swal.fire({
            title: "Success!",
            text: "Parcel Booking Confirmed!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">Add New Parcel</h2>
      <p className="text-gray-500 mb-6">
        Fill out the form to schedule a parcel delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Parcel Details</h3>

          <div className="mb-4 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("type", { required: "Parcel type is required" })}
                className="radio"
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("type", { required: "Parcel type is required" })}
                className="radio"
              />
              Non-Document
            </label>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName", {
                  required: "Parcel name is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm">
                  {errors.parcelName.message}
                </p>
              )}
            </div>

            {parcelType === "non-document" && (
              <div className="flex-1">
                <label className="label mt-4 md:mt-0">Parcel Weight (kg)</label>
                <input
                  type="number"
                  step="any"
                  {...register("weight", { required: "Weight is required" })}
                  className="input input-bordered w-full"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Sender Details</h3>

            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName", {
                required: "Sender name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.senderName && (
              <p className="text-red-500 text-sm">
                {errors.senderName.message}
              </p>
            )}

            <label className="label mt-4">Sender Contact</label>
            <input
              type="tel"
              {...register("senderContact", {
                required: "Contact number is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.senderContact && (
              <p className="text-red-500 text-sm">
                {errors.senderContact.message}
              </p>
            )}

            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress", {
                required: "Address is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.senderAddress && (
              <p className="text-red-500 text-sm">
                {errors.senderAddress.message}
              </p>
            )}

            <label className="label mt-4">Sender Region</label>
            <select
              {...register("senderRegion", { required: "Region is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {getUniqueDistricts().map((w, i) => (
                <option key={i} value={w.district}>
                  {w.district}
                </option>
              ))}
            </select>
            {errors.senderRegion && (
              <p className="text-red-500 text-sm">
                {errors.senderRegion.message}
              </p>
            )}

            <label className="label mt-4">Sender Warehouse</label>
            <select
              {...register("senderWarehouse", {
                required: "Warehouse is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Warehouse</option>
              {getCoveredAreasByDistrict(senderRegion).map((area, i) => (
                <option key={i} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {errors.senderWarehouse && (
              <p className="text-red-500 text-sm">
                {errors.senderWarehouse.message}
              </p>
            )}

            <label className="label mt-4">Pickup Instruction</label>
            <textarea
              {...register("pickupInstruction", {
                required: "Instruction is required",
              })}
              className="textarea textarea-bordered w-full"
            />
            {errors.pickupInstruction && (
              <p className="text-red-500 text-sm">
                {errors.pickupInstruction.message}
              </p>
            )}
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Receiver Details</h3>

            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName", {
                required: "Receiver name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.receiverName && (
              <p className="text-red-500 text-sm">
                {errors.receiverName.message}
              </p>
            )}

            <label className="label mt-4">Receiver Contact</label>
            <input
              type="tel"
              {...register("receiverContact", {
                required: "Contact is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.receiverContact && (
              <p className="text-red-500 text-sm">
                {errors.receiverContact.message}
              </p>
            )}

            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress", {
                required: "Address is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.receiverAddress && (
              <p className="text-red-500 text-sm">
                {errors.receiverAddress.message}
              </p>
            )}

            <label className="label mt-4">Receiver Email (optional)</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input input-bordered w-full"
              placeholder="receiver@example.com"
            />

            {/* Receiver Region & Warehouse - responsive layout */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="label mt-4">Receiver Region</label>
                <select
                  {...register("receiverRegion", {
                    required: "Region is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {getUniqueDistricts().map((w, i) => (
                    <option key={i} value={w.district}>
                      {w.district}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverRegion.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="label mt-4">Receiver Warehouse</label>
                <select
                  {...register("receiverWarehouse", {
                    required: "Warehouse is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Warehouse</option>
                  {getCoveredAreasByDistrict(receiverRegion).map((area, i) => (
                    <option key={i} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.receiverWarehouse && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverWarehouse.message}
                  </p>
                )}
              </div>
            </div>

            <label className="label mt-4">Delivery Instruction</label>
            <textarea
              {...register("deliveryInstruction", {
                required: "Instruction is required",
              })}
              className="textarea textarea-bordered w-full"
            />
            {errors.deliveryInstruction && (
              <p className="text-red-500 text-sm">
                {errors.deliveryInstruction.message}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          * Pickup Time: <b>4pm–7pm</b> Approx.
        </p>

        <button type="submit" className="btn btn-primary text-black mt-4">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
