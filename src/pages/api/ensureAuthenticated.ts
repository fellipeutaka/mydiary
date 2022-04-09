import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const token = authToken.split(" ")[1];
  const response = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  );
  const publicKeys = await response.json();
  const header64 = token.split(".")[0];
  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  if (!isJsonString(Buffer.from(header64, "base64").toString("ascii"))) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const header = JSON.parse(Buffer.from(header64, "base64").toString("ascii"));
  try {
    verify(token, publicKeys[header.kid], {
      algorithms: ["RS256"],
    });
    return res.status(200).json({ message: "Valid token" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
