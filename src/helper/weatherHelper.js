/**
 * @fileoverview Interface to retrieve data from the weather API
 */

export function getWeather(city) {
  return fetch(`${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
    .then((response) => handleResponse(response, city))
    .then((data) => {
      return weatherMapper(data)
    })
}

function handleResponse(response, city) {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error(`Error: City '${city}' ${response.statusText.toLowerCase()}`)
  }
}

function weatherMapper(data) {
  const weather = {
    city: data.name,
    country: data?.sys?.country,
    date: data.dt * 1000,
    humidity: data?.main?.humidity,
    iconId: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    windSpeed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    condition: data.cod
  }

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    weather.dt_txt = data.dt_txt
  }

  if (data.weather[0].icon) {
    weather.icon = data.weather[0].icon
  }

  if (data.main.temp_min && data.main.temp_max) {
    weather.max = data.main.temp_max
    weather.min = data.main.temp_min
  }

  return weather
}
