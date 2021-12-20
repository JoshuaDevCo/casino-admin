import React from 'react';
import ReactDOM from 'react-dom';

// Import Providers
import { MuiTheme as ThemeProvider} from "./theme";
import { Styles as StyleProvider } from "./theme";
import { SnackbarProvider } from "notistack";
import { Provider as ReduxProvider } from "react-redux";
import { NotificationProvider } from "./theme";
import { PRE } from "./hooks";
import configureStore from "./redux/store";

import App from './App';
import report from './report';

const renderApp = preloadedStates => {
    const store = configureStore(preloadedStates);
    ReactDOM.render(
        <ReduxProvider store={store}>
            <ThemeProvider>
                <StyleProvider>
                    <SnackbarProvider>
                        <NotificationProvider>
                            <App />
                        </NotificationProvider>
                    </SnackbarProvider>
                </StyleProvider>
            </ThemeProvider>
        </ReduxProvider>,
        document.getElementById('app-root')
    );
    report();
}
(async () => renderApp(await PRE.sessionCheck()))();
