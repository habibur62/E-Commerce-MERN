const sslcommerz= require('../../config/sslcommerz')

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
    const store_passwd = process.env.STORE_PASSWORD
    const is_live = false //true for live, false for sandbox

const paymentInit = async (req, res) => {
  const { totalAmount, customerName, email, phone, address} = req.body;

  const paymentData = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: `tran_${Date.now()}`, // Unique transaction ID
    success_url: `${process.env.FRONTEND_URL}/success`,
    fail_url: `${process.env.FRONTEND_URL}/fail`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    shipping_method: 'Courier',
    cus_name: customerName,
    cus_email: email,
    cus_phone: phone,
    cus_add1: address,
    product_name: "E-Commerce Product",
    product_category: "E-commerce",
    product_profile: "general",
    ship_name: customerName,
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh'
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id,store_passwd, is_live); // Set true in 3rd argument for sandbox mode
    const apiResponse = await sslcz.init(paymentData);
    console.log("SSLCommerz API Response:", apiResponse);

    if (!apiResponse.GatewayPageURL) {
      return res.status(400).json({ message: "Payment gateway initialization failed" });
    }

    res.status(200).json(apiResponse);

  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error });
  }
};

module.exports = paymentInit;

