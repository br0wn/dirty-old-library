import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'url-search-params-polyfill';
import * as serviceWorker from '../serviceWorker';
import './asset/stlye/index.css';
import { createStore } from './redux/store';
import { App } from './view/app';

/*
 * Create Redux store
 */
const store = createStore();

/*
 * Customize material UI theme
 */
declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {
		navbarLeft: {
			width: number;
		};
	}

	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		navbarLeft?: {
			width?: number;
		};
	}
}

const theme = createMuiTheme({
	navbarLeft: {
		width: 240,
	},
});

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App/>
		</ThemeProvider>
	</Provider>
	,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
