import * as stripe from 'stripe'
import * as bodyParser from 'body-parser';
import express from 'express'

const app = express();
app.use(bodyParser.text());

const Stripe = stripe("sk_test_3F606THQrSI4olfkDT16YY3H00T5V71Th5");

app.post("http://ecommerce-hosting-bucket-ecoenviron.s3-website-ap-southeast-2.amazonaws.com/charge", async (req, res) => {
  try {
    let {status} = await Stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});


