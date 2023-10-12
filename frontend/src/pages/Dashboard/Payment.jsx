import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import useCart from "../../hooks/useCart";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [cart] = useCart();

  const total = cart?.data?.reduce((sum, item) => item.price + sum, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full px-10">
      <Helmet>
        <title>Restaurant || My Cart</title>
      </Helmet>
      <SectionTitle heading={"Payment"} subHeading={"Please Process"} />
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
