import React from "react";
import AlertBS from "react-bootstrap/Alert";
import "./alert.css";

const Alert = ({ message, variant }) => {
  return (
    <AlertBS variant={variant}>
      <p>{message}</p>
    </AlertBS>
  );
};

export default Alert;
