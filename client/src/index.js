import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./styles/theme"
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

