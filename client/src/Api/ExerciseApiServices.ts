function basicSearch(urlQ: string) {
    const query = {q: urlQ}
    return fetch("/api/exercise/find" , {
        method:"POST",
        body:JSON.stringify(query),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((res) =>{
        if(res.ok) return res.json()
        throw new Error("could not find search Q")
    })
}


function basictest(){
    return fetch("/api/exercise/get",{
        method:"GET"
    }).then(resp => console.log(resp.json()))
}

function dbFill(){
    return fetch("/api/exercise/dbFill",{
        method:"GET"
    }).then(resp => console.log(resp.json()))
}
const exerciseApiServices = {
  basicSearch,
  basictest,
  dbFill
};

export default exerciseApiServices;
