
import React from "react";
import { Redirect } from "react-router-dom";

export function Logout() {

   window.sessionStorage.clear()

   return <Redirect to="/login" />;

}
