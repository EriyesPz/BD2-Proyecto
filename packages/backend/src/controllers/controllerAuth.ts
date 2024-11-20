import { Request, Response } from "express";
import { login } from "../auth/login";

export const ctlAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { tokenAcceso, tokenRefresco, usuario } = await login(email, password);

    res.cookie("accessToken", tokenAcceso, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", tokenRefresco, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      usuario,
    });
  } catch (error: any) {
    console.error("Error during login:", error.message);
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
