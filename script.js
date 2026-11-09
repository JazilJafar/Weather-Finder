const apiKey = "ef2d7f3e0d627ca8492cf92b6b4b583d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const wicon = document.querySelector(".weather-icon");
const temunit = document.querySelector("#temunit");
let currenttem = null;
function updatetemp(){
    let temp;
    if(temunit.value === "fahrenheit"){
        temp = (currenttem * 9/5) + 32;
    } else if(temunit.value === "kelvin"){
        temp = currenttem + 273.15;
    }
    else{
        temp = currenttem;
    }
    let symbol = temunit.value === "fahrenheit" ? "°F" : temunit.value === "kelvin" ? "K" : "°C";
    document.querySelector(".temperature").innerHTML = `${temp.toFixed(1)}${symbol}`;
}
async function checkWeather(city) {
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

    console.log(data);


    document.querySelector(".city").innerHTML = data.name;
    currenttem = data.main.temp;
    updatetemp();
    document.querySelector(".humi").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
          wicon.src = "./images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        wicon.src = "./images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        wicon.src = "./images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        wicon.src = "./images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        wicon.src = "./images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchbtn.addEventListener("click", ()=>{
    checkWeather(search.value);
})

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(search.value);
    }
});
temunit.addEventListener("change", updatetemp);