import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { authSettings } from "./AuthSettings";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={authSettings.domain}
      clientId={authSettings.clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>

  </React.StrictMode>
);

