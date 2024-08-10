import Layout from "@/Components/Layouts/Layout";
import React from "react";

const myApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default myApp;
