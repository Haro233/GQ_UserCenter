import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import { configureStore } from './configureStore.js';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './pages/registerServiceWorker';


export const history = createHistory();

// export const {persistor, store} = configureStore(history);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
