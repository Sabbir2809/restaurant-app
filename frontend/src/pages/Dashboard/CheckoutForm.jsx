import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import "./../../styles/chekoutForm.css";

const CheckoutForm = ({ price, cart }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState();
  const [transactionId, setTransactionId] = useState("");
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axios
        .post(
          "http://localhost:8000/api/create-payment-intent",
          { price },
          {
            headers: { token: token },
          }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // error
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    // confirmCardPayment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "unknown",
          name: user?.displayName || "anonymous",
        },
      },
    });
    // display confirm card error
    if (confirmError) {
      console.log(confirmError);
    }
    // display confirm card success
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        cartItems: cart?.map((item) => item._id),
        menuItemId: cart?.map((item) => item.menuItemId),
        itemNames: cart?.map((item) => item.name),
        status: "pending",
      };
      axios
        .post("http://localhost:8000/api/payments", payment, {
          headers: { token: token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${paymentIntent.id} Successful Payment`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary btn-sm mt-4">
          Pay
        </button>
        {cardError && <p className="text-red-500">{cardError}</p>}
        {transactionId && (
          <p className="text-green-500">Transaction Complete with transactionId:{transactionId}</p>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
