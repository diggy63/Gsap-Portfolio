const BASEURL:string = "/api/auth"


interface loginData {
    email:string,
    password:string
}
interface signUpData {
    email:string,
    username:string,
    password:string,
}


function login(data:loginData){
    return fetch(`${BASEURL}/login`,{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((resp) =>{
        if(resp.ok) return resp.json();
        throw new Error("could not log in")
    })
}

function signup(data:signUpData){
    return fetch(`${BASEURL}/signup`,{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((resp) =>{
        if(resp.ok) return resp.json();
        throw new Error("could sign up")
    })
}



const authServices = {
    login,
    signup,
}

export default authServices