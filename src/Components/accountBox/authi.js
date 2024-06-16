import React from "react";
import { jwtDecode } from "jwt-decode";

function aJwtDecode() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export default aJwtDecode