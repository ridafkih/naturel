import type { NextApiRequest, NextApiResponse } from "next";
import { Translator } from "deepl-node";
import { z } from "zod";

export type TranslateResponseSchema = {
  original: string;
  candidate: string;
  complete: string;
};

export const TranslateRequestSchema = z.object({
  prospect: z.string().max(500),
});

const confirmRequestBody = async (body: unknown) => {
  const response = await TranslateRequestSchema.safeParse(body);

  if (response.success) return response.data;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TranslateResponseSchema>
) => {
  const translator = new Translator(process.env.DEEPL_AUTH_KEY!);

  const body = await confirmRequestBody(req.body);
  if (!body) return res.status(400).end();

  const { prospect: original } = body;

  const { text: candidate } = await translator.translateText(original, "fr", "en-US", {
    formality: "prefer_less",
  });

  const { text: complete } = await translator.translateText(candidate, "en", "fr", {
    formality: "prefer_less",
  });

  res.status(200).json({
    original,
    candidate,
    complete,
  });
};

export default handler;
