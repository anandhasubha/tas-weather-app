/**
 * @fileoverview App
 */

import React from 'react'
import { createMuiTheme, Container, ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import WeatherContainer from './container/WeatherContainer'

const theme = createMuiTheme({
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: 14,
    h5: {
      fontWeight: 600
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <WeatherContainer/>
      </Container>
    </ThemeProvider>
  )
}

export default App
