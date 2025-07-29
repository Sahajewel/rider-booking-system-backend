import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

 export const generateToken = (payload: JwtPayload, secret:string, expiresIn?:SignOptions)=>{

   return jwt.sign(payload, secret, expiresIn);
};
export const verifyToken = (token: string, secret:string)=>{
    return jwt.verify(token, secret)
}
