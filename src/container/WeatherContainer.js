/**
 * @fileoverview Container to render the weather component
 */

import React, { useState, useEffect } from 'react'
import useDebounce from '../helper/useDebounce';

import WeatherForm from '../component/WeatherForm'
import WeatherCard from '../component/WeatherCard'
import { getWeather } from '../helper/weatherHelper'

const WeatherContainer = () => {
  const [city, setCity] = useState('Denver')
  const [error, setError] = useState(null)
  const [currentWeather, setCurrentWeather] = useState({})

  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(city, 500);

  const handleCityChange = (city) => {
    setCity(city)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      getWeather(debouncedSearchTerm)
        .then((weather) => {
          setCurrentWeather(weather)
          setError(null)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [debouncedSearchTerm, error])

  
  return (
    <div>
      <WeatherForm onCityChange={handleCityChange} error={error} city={city} />
      {currentWeather && currentWeather.city && <WeatherCard currentWeather={currentWeather} error={error} />}
    </div>
  )
}

export default WeatherContainer
