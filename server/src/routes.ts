import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUser,
  getLog,
  updateUserHandler,
} from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
  googleOauthHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductHandler,
  getProductHandler,
  updateProductHandler,
  getAllUserProductHandler,
} from "./controller/product.controller";
import {
  addConversationHandler,
  createChatHandler,
  getAllUserChatHandler,
  getAllUserSentChatHandler,
} from "./controller/chat.controller";
import { uploadImageHandler } from "./controller/image.controller";
import multerUpload from "./middleware/multerMiddleware";
import { searchProductHandler } from "./controller/search.controller";
import { createCharacter, getCharacter } from "./controller/test.controller";

function routes(app: Express) {
  // app.options("*", (req, res) => {
  //   // console.log("Preflight Request Headers:", req.headers);
  //   res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  //   res.header(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PUT, DELETE, OPTIONS"
  //   );
  //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //   // res.sendStatus(200);
  // });

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //NOTE - USERS
  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/me", requireUser, getCurrentUser);
  app.put(
    "/api/users/:userId",
    // validateResource(updateUserSchema),
    updateUserHandler
  );

  //NOTE - IMAGE
  app.post(
    "/api/imageUpload",
    // requireUser,
    multerUpload.single("image"),
    uploadImageHandler
  );

  //NOTE - SESSIONS
  /**
   * @openapi
   * '/api/sessions':
   *  get:
   *    tags:
   *    - Session
   *    summary: Get all sessions
   *    responses:
   *      200:
   *        description: Get all sessions for current user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetSessionResponse'
   *      403:
   *        description: Forbidden
   *  post:
   *    tags:
   *    - Session
   *    summary: Create a session
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateSessionInput'
   *    responses:
   *      200:
   *        description: Session created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      401:
   *        description: Unauthorized
   *  delete:
   *    tags:
   *    - Session
   *    summary: Delete a session
   *    responses:
   *      200:
   *        description: Session deleted
   *      403:
   *        description: Forbidden
   */
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.get("/api/sessions/oauth/google", googleOauthHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  app.get("/api/sessions/getLog", requireUser, getLog);

  //NOTE - PRODUCTS
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
  app.get("/api/products", getAllProductHandler);
  app.get("/api/userproducts", requireUser, getAllUserProductHandler);

  //NOTE - CHAT
  app.post("/api/chat", requireUser, createChatHandler);
  app.get("/api/chat/received", requireUser, getAllUserChatHandler);
  app.get("/api/chat/sent", requireUser, getAllUserSentChatHandler);
  app.post("/api/chat/:chatId", requireUser, addConversationHandler);
  app.get("/api/search", searchProductHandler);

  //SECTION -

  app.post("/api/character", createCharacter);
  app.get("/api/character", getCharacter);
}

export default routes;
