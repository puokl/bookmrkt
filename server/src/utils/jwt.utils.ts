import jwt from "jsonwebtoken";

const privateKey: string = `${process.env.PRIVATEKEY}`;
const publicKey: string = `${process.env.PUBLICKEY}`;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options), // we spread (if options exists) to provide an alg option
    // algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.log("error inside verifyJwt", e);
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
}
