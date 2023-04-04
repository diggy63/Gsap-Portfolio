import { useState } from "react";

function setToken(token:string) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function getToken(){
  let token = localStorage.getItem('token')
  if(token){
    return token
  }else{
    return false
  }
}

function isLoggedIn(){
  let token = localStorage.getItem('token')
  if(token){
    return true
  }else{
    return false
  }
}

  function removeToken(){
    localStorage.removeItem("token");
  }


const tokenServices = {
  setToken,
  getToken,
  removeToken,
  isLoggedIn,
}

export default tokenServices