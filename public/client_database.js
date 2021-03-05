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
            txt += `And the air condition is ${item.air_concern}and the color that represent it is${item.air_color} and the dominant pollutant is ${item.air.data.current.pollution.maincn||item.air.data.curernt.pollution.mainus}`;
        }


        L.marker([item.lat,item.long]).addTo(datamap).bindPopup(txt);


     

        

        

    }
    
    
};


