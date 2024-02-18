const express = require('express')
const app = express()
const store = require('./Store/Store')
const cors = require('cors')
const route = require('./Routes/UserRouter')
const {connection} = require('./Config/db')

require('dotenv').config()
const port = process.env.PORT

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',route)
app.get('/', (req, res) => {
    return res.send(store)
})
app.get('/products/:productData', (req, res) => {
    let category = req.params.productData
    let data = store.filter(data => data.category === `${category}`)
    return res.send(data)
})
app.get('/product/:category/:id', (req, res) => {
    const { id } = req.params
    let data = store.filter(data => data.id === Number(id))
    return res.send(data)
});
app.get("/search/:searchedProd", async (request, response) => {
    const searchProd = request.params.searchedProd;
    let filterProductData = store.filter((item) => item.title.toLowerCase().includes(searchProd.toLowerCase()) || item.category.toLowerCase() === searchProd.toLowerCase() || item.category.toLowerCase().includes(searchProd.toLowerCase()) || item.brand.toLowerCase() === searchProd.toLowerCase());
    return response.send(filterProductData);
});

// ---------------------------------------------------------------------------------------------------------
// Payment Integration
// const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET} = process.env;
// const base = "https://api-m.sandbox.paypal.com";
// const generateAccessToken = async () => {
//   try {
//     if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
//       throw new Error("MISSING_API_CREDENTIALS");
//     }
//     const auth = Buffer.from(
//       PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
//     ).toString("base64");
//     const response = await fetch(`${base}/v1/oauth2/token`, {
//       method: "POST",
//       body: "grant_type=client_credentials",
//       headers: {
//         Authorization: `Basic ${auth}`,
//       },
//     });
    
//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error("Failed to generate Access Token:", error);
//   }
// };

// const createOrder = async ({cart, cartTotalAmount}) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;
//   const payload = {
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: cartTotalAmount,
//         },
//       },
//     ],
//   };
  
//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
//   console.log("ACCESS TOKEN CALLED")
//   return handleResponse(response);
// };
  
// async function handleResponse(response) {
//     // console.log(response)
//   try {
//     const jsonResponse = await response.json();
//     return {
//       jsonResponse,
//       httpStatusCode: response.status,
//     };
//   } catch (err) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }
  
// app.post("/orders", async (req, res) => {
//   try {
//     const { cart, cartTotalAmount } = req.body;
//     const { jsonResponse, httpStatusCode } = await createOrder({cart, cartTotalAmount});
//     console.log(jsonResponse);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });

// --------------------------------------------------------------------------------------------------------- 


app.listen(port, (req, res) => {
    try {
        console.log('server is running fine');
        connection()
    }
    catch (err) {
        console.error('Error:', err)
    }
})
