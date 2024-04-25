import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} color="green" size={50} defaultRating={5} />

    <StarRating
      maxRating={4}
      color="grey"
      defaultRating={3}
      messages={["Horrível", "Mais-ou-Menos", "Bom", "Excelente"]}
    />

    <StarRating
      defaultRatin={1}
      maxRating={3}
      messages={["😠", "😐", "😃"]}
      defaultRating={2}
      size={70}
    />
  </React.StrictMode>,
);
