import cors from "cors";
import express, { Request } from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cookieParser from "cookie-parser";
import cloudinaryConfig from "../config/cloudinary";

function createServer() {
  const app = express();
  //SECTION -
  const allowlist = ["https://marktbook.vercel.app", "http://localhost:5173"];
  const corsOptionsDelegate = function (req: Request, callback: any) {
    var corsOptions;
    if (allowlist.indexOf(req.header("Origin") as string) !== -1) {
      console.log("inside allowlistr.index");
      corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      console.log("inside corsoptions false");
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  //SECTION -

  app.use(
    cors({
      origin: process.env.ORIGIN,
      preflightContinue: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  // app.use(cors(corsOptionsDelegate));
  // app.use(cors({ credentials: true }));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser); // to add the user to the req object

  cloudinaryConfig();
  routes(app);
  console.log("routes", routes);
  return app;
}

export default createServer;
