import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccessPage = () => {
  const [orderID, setOrderId] = useState("");
  const [packageID, setPackageId] = useState("");
  const [packageNAME, setPackageName] = useState("");
  const [packageLIMIT, setPackageLimit] = useState("");
  const [packageICON, setPackageIcon] = useState("");
  const [packagePrice, setPackagePrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("id");
        setOrderId(orderId);

        const API_PORT = "http://localhost:4008";
        const response = await axios.get(
          `${API_PORT}/payment-success/${orderId}`
        );
        const data = response.data;
        const dataZero = response.data[0];
        const packageId = dataZero.packages.package_id;
        const packageName = dataZero.packages.name;
        const packageLimit = dataZero.packages.merry_limit;
        const packageIcon = dataZero.packages.iconurl;
        const packagePrice = dataZero.packages.price;
        setPackageId(packageId);
        setPackageName(packageName);
        setPackageLimit(packageLimit);
        setPackageIcon(packageIcon);
        setPackagePrice(packagePrice);

        const dataToSend = {
          package: packageName,
          merry_limit: packageLimit,
        };

        // const response2 = await axios.put(
        //   `${API_PORT}/userPackage/updatePackage/${packageId}`,
        //   dataToSend
        // );
        // console.log("Response2: ", response2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <p>
        Your order ID is: <span>{orderID} </span>
      </p>
      <p>
        Your Package ID is: <span>{packageID}</span>
      </p>
      <div className=" border border-solid border-[red] w-20 h-20">
        <img src={packageICON} />
      </div>
      <p>
        Your Package Name is: <span>{packageNAME}</span>
      </p>
      <p>
        Your Package Price is: <span>{packagePrice}</span>
      </p>
      <p>
        Your Package Limit is: <span>{packageLIMIT}</span>
      </p>
    </div>
  );
};

export default PaymentSuccessPage;
