get_the_juice()

   
async function  get_the_juice (){
        const datamap = L.map("datamap").setView([0,0],3);
            
    // adding tiles to the map
    const tilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = L.tileLayer( tilesUrl, {attribution});
    
    tiles.addTo(datamap);
    //a poop up or down!
    
    const res = await  fetch("/get_data");
    const data = await res.json();
    console.log(data);

    for (item of data){

        //the text for the map popup.
        let txt = `Here in  ${(item.weather_main_obj.name)} and longitude probebaly have with a temperatue of ${item.weather_main_obj.main.temp} degrees farenheit.`
        
        

        //the error handeling
        if(item.air.value < 0){
              txt +=  "No air quality reading.";

        }else{
            txt += `And the air condition is ${item.air.data.indexes.baqi.category}and the color that represent it is${item.air.data.indexes.baqi.color} and the dominant pollutant is ${item.air.data.indexes.baqi.dominant}`;
        }

        L.marker([item.lat,item.long]).addTo(datamap).bindPopup(txt);


        //this section is for the elements that get's pushed.
        // const root = document.createElement("div");
        // const mood = document.createElement("p");
        // const geo = document.createElement("p");
        // const date = document.createElement("p");
        // const air_info = document.createElement("p");
        // const weather_info = document.createElement("p"); 
        
            
        // // mood.textContent = `mood: ${(item.input)}`;
        // //this section is for latitude and longitude section the old way of doing thing's.
        // geo.textContent = `${(item.lat)}`,`${(item.long)}`;
        // const dateString = new Date(item.timestamp).toLocaleString();
        // date.textContent = dateString;

        

        // //this section is for the apis .
        // weather_info.textContent = `Here in  ${(item.weather_main_obj.name)} and longitude probebaly have with a temperatue of ${item.weather_main_obj.main.temp} degrees farenheit. `;
        // air_info.textContent = `And the air condition is ${item.air.data.indexes.baqi.category}and the color that represent it is${item.air.data.indexes.baqi.color} and the dominant pollutant is ${item.air.data.indexes.baqi.dominant} `;
        
        
        // //appending the elements to the root div.
        // root.append(mood,geo,date,air_info,weather_info,);
        // root.style.backgroundColor = "lightgray";
        // root.style.borderRadius = "2%";
        // root.style.padding = "2%";
        // root.style.marginTop = "1%";
        
        // //appending the root to the document body.
        // document.body.append(root);

    }
    
    
};


