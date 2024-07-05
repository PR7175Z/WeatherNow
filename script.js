// const { stringify } = require("querystring");

const cityname = "Bhaktapur";
const key = "a50354433aba4e55b10235551240407";
const api = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityname}`;


async function apicall(){
    let val = {};
    const res = await fetch(api);
    val = await res.json();
    return val;
}

document.addEventListener('DOMContentLoaded', async ()=>{
    let apival = await apicall();
    document.getElementById('viewport').innerHTML = JSON.stringify(apival, null, 2);
})

// const fields = "https://api.sportmonks.com/v3/core/countries/api_token=FcRWYYcAHFdGkronfEwUetN1r1P5biuvoyPDEYbBx2E2523EWeqyJDo7iN1Q";
// async function country_apicall(){
//     let val = {};
//     const res = await fetch(fields);
//     val = await res.json();
//     console.log(val);
// }
// country_apicall();


// fetch(api)
// .then(response=>response.json())
// .then(data => {
//     val = data;
// })
// .catch(error => console.error('Error', error))


// console.log(JSON.stringify(val, null, 2))