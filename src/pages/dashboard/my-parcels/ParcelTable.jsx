import React, { useState } from "react";
import { FaEye, FaMoneyCheckAlt, FaTimes } from "react-icons/fa";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const ParcelTable = ({ parcelsData }) => {
  const [parcels, setParcels] = useState(parcelsData);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle Pay
  const handlePay = (id) => {
    setParcels((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, paymentStatus: "paid" } : p
      )
    );
    toast.success("Payment successful!");
  };

  // Handle Cancel
  const handleCancel = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this parcel?");
    if (confirm) {
      setParcels((prev) => prev.filter((p) => p._id !== id));
      toast.success("Parcel cancelled.");
    }
  };

  // Handle View
  const handleView = (parcel) => {
    setSelectedParcel(parcel);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td className="capitalize">{parcel.type}</td>
                <td>{moment(parcel.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                <td>৳ {parcel.deliveryCost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    } text-white`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  <button
                    onClick={() => handlePay(parcel._id)}
                    disabled={parcel.paymentStatus === "paid"}
                    className="btn btn-sm btn-success text-white"
                  >
                    <FaMoneyCheckAlt className="mr-1" /> Pay
                  </button>
                  <button
                    onClick={() => handleCancel(parcel._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTimes className="mr-1" /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedParcel && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Parcel Details</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p><strong>Name:</strong> {selectedParcel.parcelName}</p>
              <p><strong>Type:</strong> {selectedParcel.type}</p>
              <p><strong>Tracking ID:</strong> {selectedParcel.tracking_id}</p>
              <p><strong>Sender:</strong> {selectedParcel.senderName} ({selectedParcel.senderContact})</p>
              <p><strong>Receiver:</strong> {selectedParcel.receiverName} ({selectedParcel.receiverContact})</p>
              <p><strong>Receiver Email:</strong> {selectedParcel.receiverEmail}</p>
              <p><strong>Cost:</strong> ৳ {selectedParcel.deliveryCost}</p>
              <p><strong>Status:</strong> {selectedParcel.delivery_status}</p>
              <p><strong>Payment:</strong> {selectedParcel.paymentStatus}</p>
              <p><strong>Created:</strong> {moment(selectedParcel.createdAt).format("LLLL")}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelTable;
