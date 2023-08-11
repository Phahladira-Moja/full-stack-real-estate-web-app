import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://127.0.0.1:8000",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
