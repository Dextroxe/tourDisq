import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
audience:"http://localhost:8000",
issuerBaseURL: "https://dev-i6n4cukc2d01oilh.us.auth0.com",
tokenSigningAlgortihm: "RS256"
});

export default jwtCheck;