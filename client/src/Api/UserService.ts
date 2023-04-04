import React from "react";

import tokenServices from "../Util/TokenServices";

const BASEURL = '/api/auth'



function findUser(){
    return fetch(`${BASEURL}/get`,{
        method:"GET",
        headers:{
            Authorization: "Bearer " + tokenServices.getToken(),
        }
    }).then((resp) =>{
        if(resp.ok) return resp.json();
        throw new Error("could not find user")
    })
}

const userServices = {
    findUser,
}


export default userServices