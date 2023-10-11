import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-i6n4cukc2d01oilh.us.auth0.com"
      clientId="obeg7IYJXnsvmG2YuQpCiUWMuItCUfoK"
      authorizationParams={{
        redirect_uri: "https://tourdisq-dextroxe.vercel.app/",
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <MantineProvider >
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
