import jwt from 'jsonwebtoken';
import {Keys} from '../config';

export const generarTokenAcceso = (userId: string) => {
  return jwt.sign({ userId }, Keys.JWT.JWT_Secret, { expiresIn: Keys.JWT.JWT_Expires_In });
};

export const generarRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, Keys.JWT.JWT_Refresh_Secret, { expiresIn: Keys.JWT.JWT_Refresh_Expires_In });
};

export const verificarTokenAcceso = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, Keys.JWT.JWT_Secret) as jwt.JwtPayload & { userId: string };
    return { userId: decoded.userId };
  } catch (error) {
    return null;
  }
};

export const verificarRefreshToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, Keys.JWT.JWT_Refresh_Secret) as jwt.JwtPayload & { userId: string };
    return { userId: decoded.userId };
  } catch (error) {
    return null;
  }
};
