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
    const cel = document.querySelector('.cel');
    const freh = document.querySelector('.freh');

    let val = await geolocation();
    let lat = val.latitude;
    let long = val.longitude;

    const apikey = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}`;
    let apival = await apicall(apikey);
    // console.log(apival.location.localtime);

    function showval(jsonval){
        icon.setAttribute('src', jsonval.condition.icon);
        temp_C.innerHTML = jsonval.temp_c + '<sup>o</sup>C';
        temp_f.innerHTML = jsonval.temp_f + '<sup>o</sup>F';
        localtime.innerHTML = apival.location.localtime.split(" ")[0] + "<br>" + apival.location.localtime.split(" ")[1];
        weathertxt.innerHTML = jsonval.condition.text;
        humidity.innerHTML = 'Humidity: ' + jsonval.humidity + 'g/m<sup>3</sup>';
        windSpeed.innerHTML = 'Wind Speed: ' + jsonval.wind_kph + ' Km/h';
        pressure.innerHTML = 'Pressure: ' + jsonval.pressure_mb + ' Millibar';
        uv.innerHTML = 'UV: ' + jsonval.uv + 'mW/cm<sup>2</sup>';
    }

    showval(apival.current);

    // icon.setAttribute('src', apival.current.condition.icon);
    // temp_C.innerHTML = apival.current.temp_c + '<sup>o</sup>C';
    // temp_f.innerHTML = apival.current.temp_f + '<sup>o</sup>F';
    // localtime.innerHTML = apival.location.localtime.split(" ")[0] + "<br>" + apival.location.localtime.split(" ")[1];
    // weathertxt.innerHTML = apival.current.condition.text;
    // humidity.innerHTML = 'Humidity: ' + apival.current.humidity + 'g/m<sup>3</sup>';
    // windSpeed.innerHTML = 'Wind Speed: ' + apival.current.wind_kph + ' Km/h';
    // pressure.innerHTML = 'Pressure: ' + apival.current.pressure_mb + ' Millibar';
    // uv.innerHTML = 'UV: ' + apival.current.uv + 'mW/cm<sup>2</sup>';

    // console.log(apival.forecast.forecastday[0].hour.length);

    for(let i = 0; i<apival.forecast.forecastday[0].hour.length; i = i + 4){
        forecast.append(document.createElement('div'));
    }

    let h = 0;
    let arr = Array.from(forecast.children);
    arr.forEach((element) => {
        element.setAttribute("data-val", `${JSON.stringify(apival.forecast.forecastday[0].hour[h] , null, )}`);
        // console.log(element.getAttribute('data-val'));
        element.innerHTML = '<img src="'+apival.forecast.forecastday[0].hour[h].condition.icon + '" alt="'+ apival.forecast.forecastday[0].hour[h].condition.text +'">';
        element.insertAdjacentHTML('beforeend', `<p> ${apival.forecast.forecastday[0].hour[h].condition.text}</p>`);
        element.insertAdjacentHTML('afterbegin', `<p>${apival.forecast.forecastday[0].hour[h].time.split(" ")[1]}</p>`);
        h = h+4;
    })

    const hourly = document.querySelectorAll('.forecast-wrap div');
    for(let i = 0; i<hourly.length; i++){
        hourly[i].addEventListener('click', () => {
            console.log(JSON.parse(hourly[i].getAttribute('data-val')));
            showval(JSON.parse(hourly[i].getAttribute('data-val')));
        })
    }
    // console.log(hourly);

    freh.addEventListener('click',()=>{
        temp_f.style.display = "block";
        temp_C.style.display = 'none';
        cel.style.color = "#777";
        freh.style.color = "#fff";
    })

    cel.addEventListener('click',()=>{
        temp_f.style.display = "none";
        temp_C.style.display = 'block';
        freh.style.color = "#777";
        cel.style.color = "#fff";
    })
})
