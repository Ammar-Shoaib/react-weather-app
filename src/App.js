import React, { useState } from 'react'

const api = {
  key:"d8d847d78aa41e85b1c44406484cb826",
  base:"https://api.openweathermap.org/data/2.5/"
}

const App = () => {

  const [weather, setWeather] = useState([])
  const [query, setQuery] = useState("")

  const search = e => {
    if(e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(results => {
        setWeather(results)
        setQuery("")
      })
    }
  }

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October, November", "December"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const date = d.getDate()
    const day = days[d.getDay()]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${date} ${day} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined" ? (weather.main.temp > 16 ? "app warm" : "app") : "app")}>
      <main>
        <div className="searchbox">
          <input 
            type="text" 
            name="query" 
            className="searchbar"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined" ? 
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.floor(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        : (""))}
      </main>
    </div>
  )
}

export default App
