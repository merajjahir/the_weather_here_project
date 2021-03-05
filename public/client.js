

//getting the geolocation .
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( async (position) => {


        let lat,long,weather_main_obj,air,air_color,air_concern;
        
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

            
            

            weather_main_obj = weather_json.weather;
            //this section will do the work for the weather api 
            const weather_description = weather_main_obj.weather[0].description;
            const weather_name = weather_main_obj.name;
            const weather_temp = weather_main_obj.main.temp

            
            document.getElementById("name").textContent = weather_name;
            document.getElementById("summery").textContent = weather_description;
            document.getElementById("temperature").textContent = weather_temp;


            
            air = weather_json.air_quality;
            //this section will do the work for the air api.

           
            function c_c(){
                let air_cn = air.data.current.pollution.aqius;
                let air_us = air.data.current.pollution.aqicn;
                let color ;
                let concern;
                if(0 <=air_cn||air_us<=50){
                   color = "#2EC467";  //green
                   concern = "good";
                }
                else if(51<=air_cn||air_us<=100){
                    color = "#CECC09"; //yellow
                    concern = "moderate";
                }
                else if(101<=air_cn||air_us<=150){
                    color = "#FF9C29";  // qrange
                    concern = "unhealty for sensitive groups";
                }
                else if(151<=air_cn||air_us<=200){
                    color = "#FF1616";  // red
                    concern = "unhealthy";
                }
                else if(201<=air_cn||air_us<=300){
                    color = "#8A00A8";  // purple
                    concern = "very unhealthy";
                }
                else if(301<=air_cn||air_us<=500){
                    color = "#8A00A8";  // maroon;
                    concern = "hazardous";
                };
                let info ={color,concern};
                return info;
            }
            console.log(c_c().color);
             
            
            air_color = c_c().color;
            air_concern = c_c().concern;
            const air_pollutant = air.data.current.pollution.maincn||air.data.curernt.pollution.mainus; 
            


            
            document.getElementById("concern").textContent = air_concern;
            const air_color_span = document.getElementById("color");
            air_color_span.style.background = `${air_color}`;

            document.getElementById("pollutant").textContent = air_pollutant;
            
            
                

        
    

            
        }
        

        //cahing the error for litarraly the whole code.
        catch(error){
            console.log("something went wrong");
            document.getElementById("pollutant").textContent ="no reading available ";
            document.getElementById("concern").textContent = "no reading available";
            const air_color_span = document.getElementById("color");
            air_color_span.textContent = "not avilable right now sorry";
            air_color_span.style.display = "none";
            air = {value:-1};






        }

        
        //the the whole btn situation is handeled here in the current module it is module 3.3
        const exported_data = {lat,long,weather_main_obj,air,air_color,air_concern};// the input was one of the obj that was carring expered_data variable but now it is disabled.
                
        const options = {
            method : "post",
            headers:{
                "Content-Type":"application/json",
                
            },
            body :JSON.stringify(exported_data),
        }

    
        const res = await fetch("/api",options); // this is the line that sends the datas to the server.
        const server_data = await res.json();
 
    })
 }
 
 else{console.log("location is not available!")}