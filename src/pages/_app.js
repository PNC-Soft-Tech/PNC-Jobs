import Layout from "@/Components/Layouts/Layout";
import { wrapper } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";


const MyApp = ({ Component, pageProps }) => {
  const { store, props } = wrapper.useWrappedStore(pageProps)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
