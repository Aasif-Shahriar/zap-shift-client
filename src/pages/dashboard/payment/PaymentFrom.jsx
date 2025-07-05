import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared-component/loading/Loading";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState("");

  //step-2: get parcel data
  const { data: parcel = {}, isPending } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  console.log(parcel);
  if (isPending) return <Loading />;

  const amount = parcel.deliveryCost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // step-1: create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      console.log("[paymentMethod]", paymentMethod);

      //step-3: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        setErrorMessage("");
        if (result.paymentIntent.status === "succeeded") {
          console.log(result);
          const transactionId = result.paymentIntent.id;

          //step-4: mark parcel as paid and create payment history
          const paymentInfo = {
            parcelId,
            email: user?.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types[0],
          };

          const paymentRes = await axiosSecure.post("/payments", paymentInfo);
          if (paymentRes.data.insertedId) {
            Swal.fire({
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> ${transactionId}`,
            icon: "success",
            confirmButtonText: "Go to My Parcels",
          }).then(() => {
            navigate("/dashboard/my-parcels");
          });
          }
        }
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border border-gray-400 rounded" />
        <button
          className="btn btn-primary text-black w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PaymentFrom;
