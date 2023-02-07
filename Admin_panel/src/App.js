/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
import Route from 'userroutes';
import Dashboardroutes from 'dashboardroute';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const type = sessionStorage.getItem('user_type');

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    {(() => {
                        if (type === 'admin') {
                            return <Routes />;
                        } else if (type === 'teacher') {
                            return <Route />;
                        } else {
                            return <Dashboardroutes />;
                        }
                    })()}
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
