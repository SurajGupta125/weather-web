
let cityName = document.getElementById("cityName")
let btn = document.getElementById("btn")
let cityNameh1 = document.querySelector(".city-Name")
let countryCode = document.querySelector(".country-code")
let curtimeDate = document.querySelector(".curtime-Date")
let curDate = new Date().toDateString()
let curTime = new Date().toLocaleTimeString()
curtimeDate.innerText = `${curDate} ${curTime}`
let citytemp = document.querySelector(".city-temp")
let des = document.querySelector(".des")
let img = document.querySelector("img")
let Feels_like = document.querySelector(".Feels_like span")
let Humidity = document.querySelector(".Humidity span")
let Wind = document.querySelector(".wind span")
let Min_Temp = document.querySelector(".Min_Temp span")
let Max_Temp = document.querySelector(".Max_Temp span")
let Pressure = document.querySelector(".Pressure span")
let Visibility = document.querySelector(".Visibility span")
let Sunrise = document.querySelector(".Sunrise span")
let Sunset = document.querySelector(".Sunset span")

document.addEventListener("DOMContentLoaded", () => {
    let city = cityName.value
    if (city === "") {
        city = "mumbai"
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b1253db8aa3086552a97fd8a7f15c6c0&units=metric`)
        .then(res => res.json())
        .then(data => {
            cityNameh1.innerText = data.name;

            if (data.sys) {
                countryCode.innerText = data.sys.country;
            }

            let curDate = new Date().toDateString();
            let curTime = new Date().toLocaleTimeString();
            curtimeDate.innerText = `${curDate} ${curTime}`;

            if (data.main) {
                citytemp.innerText = data.main.temp;
                Feels_like.innerText = data.main.feels_like;
                Humidity.innerText = data.main.humidity;
                Wind.innerText = data.wind.speed;
                Min_Temp.innerText = data.main.temp_min;
                Max_Temp.innerText = data.main.temp_max;
                Pressure.innerText = `${data.main.pressure} Pha`;
                Visibility.innerText = `${(data.visibility / 1000).toFixed(1)} km`;
            }

            if (data.weather) {
                des.innerText = data.weather[0].description;
                img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }

            if (data.sys) {
                let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
                let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
                Sunrise.innerText = sunriseTime;
                Sunset.innerText = sunsetTime;
            }

            console.log(data);
        });
});




btn.addEventListener('click', () => {
    let cityInput = cityName.value
    if (cityInput === "") {
        alert("Enter valid city Name!!")
        return
    }

    if (!/^[a-zA-Z\s]+$/.test(cityInput)) {
        alert("Please enter a valid city name");
        return;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=b1253db8aa3086552a97fd8a7f15c6c0&units=metric`)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert("City not found! Please check spelling.");
                return;
            }
            cityNameh1.innerText = `${data.name}`
            if (data.sys) {
                let code = Object.values(data.sys)[0]
                countryCode.innerText = `${code}`
            }
            let curDate = new Date().toDateString()
            let curTime = new Date().toLocaleTimeString()
            curtimeDate.innerText = `${curDate} ${curTime}`

            if (data.main) {
                let temp = Object.values(data.main)[0]
                citytemp.innerText = `${temp}`
            }

            if (data.weather) {
                let weatherIcon = Object.values(data.weather)[0]
                let icon = Object.values(weatherIcon)[1]
                des.innerText = `${icon}`
            }

            let weatherIcon = data.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            img.src = `${iconUrl}`

            Feels_like.innerText = ` ${data.main.feels_like}`
            Humidity.innerText = ` ${data.main.humidity}`
            Wind.innerText = ` ${data.wind.speed}`
            Min_Temp.innerText = ` ${data.main.temp_min}`
            Max_Temp.innerText = ` ${data.main.temp_max}`
            Pressure.innerText = ` ${data.main.pressure} Pha`
            Visibility.innerText = ` ${(data.visibility / 1000).toFixed(1)} km`

            let Sun = 1759280098
            let curtime = new Date(Sun * 1000)
            Sunrise.innerText = curtime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

            let sun1 = 1759323443
            let curtime1 = new Date(sun1 * 1000)
            Sunset.innerText = curtime1.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            })

            console.log(data)
        }).catch("Inalid Resquest")
})




