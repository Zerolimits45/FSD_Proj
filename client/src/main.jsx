import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  palette: {
    primary: {
      main: '#150039',
    },
    secondary: {
      main: '#FFFFFF',
    },
    btn: {
      main: '#FF4E00',
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode >,
)
