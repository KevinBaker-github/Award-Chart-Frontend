import { Route, Switch, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { oktaConfig } from "./config";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter } from "react-router-dom";
import Wellcome from "./pages/Wellcome";
import AwardChart from "./pages/AwardChart";

const oktaAuth = new OktaAuth(oktaConfig);

const Routes = () => {
	const history = useHistory();
	
	const originalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
	};

	return (
		<BrowserRouter>
			<Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri}>
				<AppNavbar />
				<Switch>
					<Route path="/" exact={true} component={Wellcome} />
					<SecureRoute path="/awardChart" exact={true} component={AwardChart} />
					<SecureRoute path="/profile" component={Profile} />
					<Route path="/login/callback" component={LoginCallback} />
				</Switch>				
			</Security>
		</BrowserRouter>
	);
};

export default Routes;