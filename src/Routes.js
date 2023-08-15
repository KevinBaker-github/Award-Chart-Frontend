import { Route, Switch, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Profile from "./pages/Profile";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter } from "react-router-dom";
import Wellcome from "./pages/Wellcome";
import AwardChart from "./pages/AwardChart";
import Calculation from "./pages/Calculation";
import FullScreenSpinner from "./components/general/FullScreenSpinner";
import IdleManagement from "./components/general/IdleManagement";
import Properties from "./pages/Properties";

const oktaAuth = new OktaAuth(oktaConfig);

const Routes = ({isLoading, setIsLoading}) => {
	const history = useHistory();
	
	const originalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
	};

	return (
		<BrowserRouter>
			<Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri}>
				<AppNavbar />
				<FullScreenSpinner isLoading={isLoading}/>
				<IdleManagement />
				<Switch>
					<SecureRoute path="/" exact={true} component={Wellcome} />
					<SecureRoute path="/awardChart" exact={true} render={(props) => <AwardChart {...props} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
					<SecureRoute path="/calculation" exact={true} render={(props) => <Calculation {...props} setIsLoading={setIsLoading}/>} />
					<SecureRoute path="/properties" exact={true} render={(props) => <Properties {...props} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
					<SecureRoute path="/profile" component={Profile} />
					<Route path="/login/callback" component={LoginCallback} />
				</Switch>				
			</Security>
		</BrowserRouter>
	);
};

export default Routes;