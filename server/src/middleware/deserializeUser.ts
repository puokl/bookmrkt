import { get } from "lodash"; // it makes a bit safer to access a property that we don't know if it exists or not
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// we use this middleware to add the user to the req object
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.headers inside deserializeUser", req.headers);
  console.log("req.cookies inside deserializeUser", req.cookies);
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, ""); // replace bearer with an empty string

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  console.log("accessToken inside deserializeUser", accessToken);
  console.log("refreshToken inside deserializeUser", refreshToken);
  const { decoded } = verifyJwt(accessToken);

  console.log("decoded inside deserializeUser", decoded);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (!accessToken && refreshToken) {
    console.log("EXPIRED");
    const newAccessToken = await reIssueAccessToken({ refreshToken }); // we check if refresh token is valid and we issue a new access toke

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken); // we set the new access token on the header
      res.cookie("accessToken", newAccessToken, {
        maxAge: 9000000, // 15min
        httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
        // domain: process.env.DOMAIN,
        path: "/",
        sameSite: "none",
        secure: true, // change to true in production (only https)
      });
    }

    const result = verifyJwt(newAccessToken as string); // we decode that access token

    res.locals.user = result.decoded; // we attach the user back to res.locals
    // if they send a request with an expired access token the req flow is just going to continue as if they sent the req with a
    // valid access token given that the refresh token was valid

    console.log("new accesstoken created");
    return next();
  }
  if (!refreshToken) {
    console.log("No Refresh Token", refreshToken);
    return next();
  }
  return next();
};

export default deserializeUser;
