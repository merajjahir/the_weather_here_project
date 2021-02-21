

//getting the geolocation .
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( async (position) => {


        let lat,long,weather_main_obj,air;
        
        try{

            
            lat = position.coords.latitude;
            long  = position.coords.longitude;
    
            //appending the latitude and longitude value to the.
            // html elements.
            document.getElementById("lat").textContent = lat;
            document.getElementById("long").textContent = long;
            

            const api_url = `/weather/${lat},${long}`;
            const weather_res = await fetch(api_url);
            //const weather_res = await fetch(`/weather`);
            const weather_json = await weather_res.json();

            //the code for gettins the data from the api and doing stuff with it.
        
            // const main_but_not_and_is_obj = weather_json.weather[0];
            // const main = main_but_not_and_is_obj.description;

            // document.getElementById("name").textContent = weather_json. name;
            // document.getElementById("summery").textContent = main;

            // document.getElementById("temperature").textContent = weather_json.main.temp;
            // ^^^^^up there is the old way of doing things .
            
             weather_main_obj = weather_json.weather;
            //in the previous line the first weather is the name of the obj which is the main 
            //obj that the api would return . and the second one is the obj in the api(old stuff).


            //this section will do the work for the weather api 
            const weather_description = weather_main_obj.weather[0].description;
            const weather_name = weather_main_obj.name;
            const weather_temp = weather_main_obj.main.temp

            
            document.getElementById("name").textContent = weather_name;
            document.getElementById("summery").textContent = weather_description;
            document.getElementById("temperature").textContent = weather_temp;



            //this section will do the work for the air api.
            air = weather_json.air_quality;
            const air_data_all = air.data.indexes.baqi;

            const air_category = air_data_all.category;
            const air_color = air_data_all.color;
            const air_pollutant = air_data_all.dominant_pollutant; 
            
            document.getElementById("category").textContent = air_category;
            const air_color_span = document.getElementById("color");
            air_color_span.style.background = `${air_color}`;

            document.getElementById("pollutant").textContent = air_pollutant;
            
            
            console.log(weather_json.air_quality);
                

        
    

            
        }
        
        //the fucntion for submiting the whole page 
        //by the button.
        // btn.onclick = async () => {
               //const btn = document.getElementById("btn");
        //     //const input = document.getElementById("input").value;
         
        //     const exported_data = {lat,long,};// the input was one of the obj that was carring expered_data variable but now it is disabled.
             
        //     const options = {
        //         method : "post",
        //         headers:{
        //             "Content-Type":"application/json",
                    
        //         },
        //         body :JSON.stringify(exported_data),
        //     }
 
        //     const res = await fetch("/api",options);
        //     const server_data = await res.json();
        //     console.log(server_data);
        //  }
        // }


        //cahing the error for litarraly the whole code.
        catch(error){
            console.log("something went wrong");
            document.getElementById("pollutant").textContent ="no reading available ";
            document.getElementById("category").textContent = "no reading available";
            const air_color_span = document.getElementById("color");
            air_color_span.textContent = "no avilable right now sorry";
            air_color_span.style.display = "none";
            air = {value:-1};






        }

        
        //the the whole btn situation is handeled here in the current module it is module 3.3
        const exported_data = {lat,long,weather_main_obj,air};// the input was one of the obj that was carring expered_data variable but now it is disabled.
                
        const options = {
            method : "post",
            headers:{
                "Content-Type":"application/json",
                
            },
            body :JSON.stringify(exported_data),
        }

    
        const res = await fetch("/api",options); // this is the line that sends the datas to the server.
        const server_data = await res.json();
        console.log(server_data);
 
    })
 }
 
 else{console.log("location is not available!")}