import Stripe from "stripe";

const stripeKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51LRhLTBlFmnLdwGWiAMjQ9lY3WdUYRHlbdrKhqEoWaJp4bkJ2UGKn53hmD5QScUv5irPEmbmttczxmEhaK3yoAX800EBgWdQby";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2020-08-27",
});
