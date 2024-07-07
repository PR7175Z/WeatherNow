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
    const temp_C = document.querySelector('.temp .temp_c');
    const temp_f = document.querySelector('.temp .temp_f');
    const localtime = document.querySelector('.time .localtime');
    const weathertxt = document.querySelector('.weathertext');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.windspeed');
    const pressure = document.querySelector('.pressure');
    const uv = document.querySelector('.uv');
    const forecast = document.querySelector('.forecast-wrap');

    let val = await geolocation();
    let lat = val.latitude;
    let long = val.longitude;

    const apikey = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat}, ${long}`;
    let apival = await apicall(apikey);

    // console.log(JSON.stringify(apival, null, 2));
    // console.log(apival.location.localtime);
    icon.setAttribute('src', apival.current.condition.icon);
    temp_C.innerHTML = apival.current.temp_c + '<sup>o</sup>C';
    temp_f.innerHTML = apival.current.temp_f + '<sup>o</sup>F';
    localtime.innerHTML = apival.location.localtime;
    weathertxt.innerHTML = apival.current.condition.text;
    humidity.innerHTML = 'Humidity: ' + apival.current.humidity + 'g/m<sup>3</sup>';
    windSpeed.innerHTML = 'Wind Speed: ' + apival.current.wind_kph + ' Km/h';
    pressure.innerHTML = 'Pressure: ' + apival.current.pressure_mb + ' Millibar';
    uv.innerHTML = 'UV: ' + apival.current.uv + 'mW/cm<sup>2</sup>';

    // console.log(apival.forecast.forecastday[0].hour.length);

    for(let i = 0; i<apival.forecast.forecastday[0].hour.length; i = i + 4){
        forecast.append(document.createElement('div'));
    }

    let h = 0;
    let arr = Array.from(forecast.children);
    arr.forEach((element) => {
        element.innerHTML = '<img src="'+apival.forecast.forecastday[0].hour[h].condition.icon + '" alt="'+ apival.forecast.forecastday[0].hour[h].condition.text +'">';
        h = h+4;
    })
})
