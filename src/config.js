export const oktaConfig = {
	issuer: process.env.REACT_APP_OKTA_ISSUER,
	clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
	redirectUri: `${window.location.origin}/login/callback`,
	scopes: ["openid", "profile", "email"],
	pkce: true,
};