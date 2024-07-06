// const { stringify } = require("querystring");
const key = "a50354433aba4e55b10235551240407";

async function geolocation(){
    const res = await fetch('https://ipapi.co/json');
    val = await res.json();
    return val;
}


async function apicall(apikey){
    let val = {};
    const res = await fetch(apikey);
    val = await res.json();
    return val;
}

document.addEventListener('DOMContentLoaded', async ()=>{
    const icon = document.querySelector('.icon img');
    let val = await geolocation();
    // let cityname = val.city;
    let lat = val.latitude;
    let long = val.longitude;
    // console.log(val);
    const apikey = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat}, ${long}`;
    console.log(val.latitude);
    console.log(val.longitude);
    let apival = await apicall(apikey);
    console.log(JSON.stringify(apival, null, 2));
    console.log(apival.location.localtime);
    icon.setAttribute('src', apival.forecast.forecastday[0].day.condition.icon);
    // document.getElementById('viewport').innerHTML = apival.current.temp_c;
})
