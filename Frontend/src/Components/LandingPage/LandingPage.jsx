import Navbar from "../Navbar/navbar";
import Clear from "./sun.png";
import humidity from "./humidity.png";
import axios from "axios";
import wind from "./wind.png";
import Clouds from "./cloudy.png";
import Rain from "./heavy-rain.png";
import Drizzle from "./drizzel.png";
import Mist from "./mist.png";

import { useEffect, useState } from "react";

function LandingPage() {
  const [city, setCity] = useState("Bengaluru");
  const [temp, setTemp] = useState();
  const [Humidity, setHumidity] = useState();
  const [weather, setWeather] = useState();

  const [Wind, setwind] = useState();
  let cname = city;
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const search = async () => {
    cname = city;
    if (city) {
      const firstLetter = cname.charAt(0);

      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = cname.slice(1);
      cname = firstLetterCap + remainingLetters;
      setCity(cname);
    }

    let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d943369e3024be3d3696b88f6175e4b&units=metric`;

    try {
      const data = await axios.get(link);
      console.log(data.data);
      setHumidity(data.data.main.humidity);
      setTemp(data.data.main.temp);
      setwind(data.data.wind.speed);
      if (data.data.weather[0].main == "Clouds") {
        setWeather(Clouds);
      } else if (data.data.weather[0].main == "Clear") {
        setWeather(Clear);
      } else if (data.data.weather[0].main == "Rain") {
        setWeather(Rain);
      } else if (data.data.weather[0].main == "Drizzle") {
        setWeather(Drizzle);
      } else if (data.data.weather[0].main == "Mist") {
        setWeather(Mist);
      }
      console.log(data.data.weather[0].main);
    } catch (error) {
      console.log(error.message);
      setCity("Bengaluru");
      link = `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=2d943369e3024be3d3696b88f6175e4b&units=metric`;
      const data = await axios.get(link);

      setHumidity(data.data.main.humidity);
      setTemp(data.data.main.temp);
      setwind(data.data.wind.speed);
      setWeather(data.data.weather[0].main);
    }
  };
  console.log("weather is : ", weather);

  useEffect(() => {
    setCity();
    async function Initial() {
      let link = `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=2d943369e3024be3d3696b88f6175e4b&units=metric`;
      const data = await axios.get(link);
      setHumidity(data.data.main.humidity);
      setTemp(data.data.main.temp);
      setwind(data.data.wind.speed);
    }
    Initial();
  }, []);
  return (
    <div className="landingpage">
      <Navbar />
      <div className="landingpagecontainer">
        <div className="welcomecontent">
          <h1>Take Your Farm to the Next Level!</h1>
          <p>
            Join Krushika Mitra today and revolutionize your farming journey!
            Sign up now for exclusive access to expert advice, market insights,
            innovative techniques, and a supportive community dedicated to
            empowering farmers like you. Let's grow together!
          </p>
          <p>
            "Start Growing Together! Sign in now to join our farmer-friendly
            community."
          </p>
          <a href="/signin">
            <button>Sign In</button>
          </a>
        </div>
        <div className="weathercontent">
          <div className="weathercard">
            <div className="search">
              <input
                type="text"
                placeholder="Enter city name"
                onChange={handleCity}
                spellCheck="false"
              />
              <div className="searchicon" onClick={search}>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className="weather">
              <img src={weather} className="weather-icon" />
              <h1 className="temp">{temp}°C</h1>
              <h2 className="city">{cname ? cname : "Bengaluru"}</h2>
              <div className="detail">
                <div className="col">
                  <img src={humidity} />
                  <div>
                    <p className="humidity">{Humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>

                <div className="col">
                  <img src={wind} />
                  <div>
                    <p className="wind">{Wind} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
