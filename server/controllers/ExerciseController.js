const Exercise = require("../models/Exercise");

module.exports = {
  testApi,
  basicSearch,
  dbFill,
};

function testApi(req, res) {
  return res.status(200).json({ msg: "we have connection" });
}

async function basicSearch(req, res) {
    console.log(req.body)
    const search = await Exercise.find({"bodyPart":req.body.q})
    console.log(search.length)
  return res.status(200).json(search);
}

async function dbFill(req, res) {
    // const check = await Exercise.find()
    // console.log(check.length)
    for(let i = 0; i <=20;i++){
        const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "8eb3b9c801mshc90da59d2b30751p1abc02jsna910b2ca3d0f",
              "X-RapidAPI-Host": "exercises2.p.rapidapi.com",
            },
          };
        
          const ApiCall = await fetch(
            `https://exercises2.p.rapidapi.com/?count=100`,
            options
          );
          const data = await ApiCall.json();
           await data.forEach((item) => {
            Exercise.findOne({'name':item.name}).then((resp) =>{
                if(!resp){
                    try {
                        const new_ex = new Exercise({...item})
                        new_ex.save()
                    } catch (error) {
                      console.log(error)
                    }
                }
            })
        });

    }

  return res.status(200).json({ msg: "filling db" });
}
