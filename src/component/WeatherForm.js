/**
 * @fileoverview Form that holds the search component
 */

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  cityLabel: {
    width: 'max-content'
  },
  margin: {
    margin: '20px 0'
  },
  error: {
    color: '#ff0000'
  }
}))

const WeatherForm = ({ city, onCityChange, error }) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setSearching] = useState(false)
  const hasError = error ? true : false

  const handleSearch = (e) => {
    setSearching(true)
    setSearchTerm(e.target.value)
  }
  useEffect(() => {
    onCityChange(searchTerm)
    setSearching(false)
  }, [onCityChange, searchTerm, isSearching])
  return (
    <div style={{ textAlign: 'center' }}>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor='city' className={classes.cityLabel}>
          Enter a city name:
        </InputLabel>
        <Input
          id='city'
          value={city}
          startAdornment={
            <InputAdornment position='start'>
              <label title='Optional: Enter a two-letter country code after the city name to make the search more precise. For example, London, GB.'>
                <SearchIcon />
              </label>
            </InputAdornment>
          }
          error={hasError}
          onChange={handleSearch}
          endAdornment={
            isSearching && (
              <InputAdornment position='end'>
                <CircularProgress size={20} />
              </InputAdornment>
            )
          }
        />
      </FormControl>
    </div>
  )
}

export default WeatherForm
