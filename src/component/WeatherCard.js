/**
 * @fileoverview Card to display weather information for the selected city
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import IconsLookup from '../data/IconsLookup'

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 600
  },
  error: {
    color: 'red',
    padding: '10px'
  },
  fullList: {
    width: 'auto'
  },
  wi: {
    color: '#a2da87',
    fontSize: '20px'
  }
}))

const WeatherCard = (props) => {
  const classes = useStyles()
  const {
    currentWeather: { city, country, date, description, humidity, iconId, temperature, windSpeed },
    error
  } = props
  const subheader = `${dayjs(date).format('dddd')}, ${dayjs(date).format('h:mm')} ${dayjs(date).format(
    'A'
  )}, ${description}`
  const iconName = IconsLookup[iconId] ? IconsLookup[iconId].iconName : ''

  return error ? (
    <div className={classes.error}>{error}</div>
  ) : (
    <Card className={classes.card}>
      <CardHeader title={city + ', ' + country} />
      <CardHeader subheader={subheader}></CardHeader>
      <CardContent>
        <CardMedia
          className={`wi wi-${iconName} ${classes.wi}`}
          src={iconName}
          style={{ fontSize: '128px', float: 'right' }}
        />
        <Typography variant='h2' className='big-temp' color='textPrimary' component='h2' style={{ paddingTop: '30px' }}>
          {Math.round(temperature)}&deg;C
        </Typography>
        <Typography variant='subtitle2' color='textSecondary' gutterBottom>
          <span className={`wi wi-strong-wind ${classes.wi}`}>&nbsp;</span>
          {windSpeed} km/h Winds
        </Typography>
        <Typography variant='subtitle2' color='textSecondary' gutterBottom>
          <span className={`wi wi-humidity ${classes.wi}`}>&nbsp;</span>
          {humidity}% Humidity
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
