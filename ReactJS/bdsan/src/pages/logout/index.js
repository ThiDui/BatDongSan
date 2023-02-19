import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();
    localStorage.removeItem("user");
    window.location.href='/';
    navigate("/"); 
  }