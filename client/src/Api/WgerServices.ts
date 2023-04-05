const BASEAPIURL = "https://wger.de/api/v2/"
const LANG = "&language=2"


function searchQ(data:string){
    return fetch(`https://wger.de/api/v2/${data}`,{
        method:"GET"
    }).then((resp) =>{
        if(resp.ok) return resp.json()
        throw new Error("api isnt not repsonding")
    })
}


function searchMuscleGroup(data:number|string){
    return fetch(`${BASEAPIURL}exercise/?muscles=${data}${LANG}`,{
        method:"GET"
    }).then((resp) =>{
        if(resp.ok) return resp.json()
        throw new Error("api isnt not repsonding")
    })

}

function basicGet(data:string|null){
    return fetch(`${data}`,{
        method:"GET"
    }).then((resp) =>{
        if(resp.ok) return resp.json()
        throw new Error("api isnt not repsonding")
    })
}

function basicGetDetails(data:number){
    return fetch(`${BASEAPIURL}exerciseinfo/${data}`,{
        method:"GET"
    }).then((resp) =>{
        if(resp.ok) return resp.json()
        throw new Error("api is not responding")
    })
}
const wgerServices = {
    searchQ,
    searchMuscleGroup,
    basicGet,
    basicGetDetails,
}

export default wgerServices


