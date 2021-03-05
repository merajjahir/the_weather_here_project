
// declearing the dependencies to a variable.
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const Database = require("nedb");
require("dotenv").config();



//the serving files.
app.use(express.static("public"));

//setting up the database.
const database = new Database("module.3_database.db");
database.loadDatabase();

// setting up the port and confermation massage of the server .
const port = process.env.PORT || 3000;
app.listen(port,() => {console.log(`The server is up at ${port}`)});

//the parser to handel the json datas.
app.use(express.json({limit:"1mb"}));


//the date function.
const timestamp = Date.now();

//adding the route for the fetch fucntion.
app.post("/api",(req,res) =>{ 
    
    const imported_data = req.body;
    imported_data.timestamp = timestamp;
    database.insert(imported_data);
    console.log("got a request");
    
    
    //the response.
    res.json(imported_data);
})

app.get("/get_data",(req,res) => {
    //the database.find fuction takes two perameters one
    // for query (in this case all the files has been requested)
    // and the other one is for err and data
    database.find( {} , (err,info) => {
    
        if(err){
            res.end(); 
            return;
        }
        res.json(info);
        console.log(info);
    })
})

app.get("/weather/:latlong",async (request,response) =>{
    

        const latlong= request.params.latlong.split(",");
        console.log(request.params);
        console.log(latlong);
        const lon =latlong[1];
        const lat = latlong[0];

        


        //the weather data
        const weather_key =process.env.API_KEY ;
        const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${weather_key}`;
        const weather_res = await fetch(weather_url);
        const weather_data = await weather_res.json();
        
        
        //the air quality url .
        const air_key = process.env.API_KEY_TWO ;
        const air_url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${air_key}`;
        const air_res = await fetch(air_url);
        const air_data = await air_res.json();

        weather_res.json(air_data);
        
        // console.log(air_data);
        
        const all_data = {
            weather:weather_data,
            air_quality:air_data,
        };
        response.json(all_data);

})