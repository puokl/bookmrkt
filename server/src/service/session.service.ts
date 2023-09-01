import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

// FilterQuery is a generic that takes the sessiondocument
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
  // .lean() means that is not going to return all the functions on the object. it just returns the plain object. similar to .toJSON()
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  // return SessionModel.updateOne(query, update);
  return SessionModel.deleteMany(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false; // is throwing error because we haven't added <sessionDocument> to the model

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    {
      ...user,
      session: session._id, // the session is a promise, but we need it to be an object
    },

    { expiresIn: `${process.env.ACCESSTOKENTTL}` } // 1d
  );
  console.log("accessToken", accessToken);
  return accessToken;
}
