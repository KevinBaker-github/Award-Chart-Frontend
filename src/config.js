export const oktaConfig = {
	issuer: `https://dev-24876482.okta.com/oauth2/default`,
	clientId: "0oaa9faljmhBelRjv5d7",
	redirectUri: `${window.location.origin}/login/callback`,
	scopes: ["openid", "profile", "email"],
	pkce: true,
};