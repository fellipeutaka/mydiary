import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { response: captchaToken },
    method,
  } = req;

  if (!captchaToken) {
    return res.status(401).json({ message: "Captcha token is missing" });
  } else if (method !== "POST") {
    return res.status(401).json({ message: "Please, use method POST" });
  }

  const captchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    { method: "POST" }
  );
  const captcha = await captchaResponse.json();
  if (captcha.success) {
    return res.status(200).json({ message: "Valid captcha token" });
  } else {
    return res.status(401).json({ message: "Invalid captcha token" });
  }
}
