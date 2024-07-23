//array of routes accessible to the public - do not require authentication
export const publicRoutes = [
    "/profile"
];

//array of routes accessible to the public - for authentication
//These routes will redirect logged in users to settings
export const authRoutes = [
"/auth/login", "/auth/register"
];


//The prefix for API authentication routes
//Routes that start with this prefix will be used form API auth purposes;
export const authPrefix = "/api/auth"


//The default redirect path after logged in
export const DEFAULT_LOGIN_REDIRECT = "/settings";