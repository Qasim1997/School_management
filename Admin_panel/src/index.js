import { createRoot } from 'react-dom/client';

// third party

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'index.css';
// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
// style + assets
import 'assets/scss/style.scss';
import config from './config';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter basename={config.basename}>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
