import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const CheckoutForm = ({ price }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState();
  const [transactionId, setTransactionId] = useState("");

  const token = localStorage.getItem("access-token");

  useEffect(() => {
    console.log(price);
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
  }, []);

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
