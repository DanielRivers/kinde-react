import ReactDOM from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
      callbacks={
        {
          onSuccess: async(user, state, context) => {
            console.log("onSuccess", user, state, context)
            console.log("claims", await context.getClaims())
          },
          onEvent: (event, state) => console.log("onEvent", event, state),
          onError: (error, state) => console.log("onError", error, state),
        }
      }
    >
      <App />
    </KindeProvider>
);
