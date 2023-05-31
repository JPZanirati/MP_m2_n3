import { NextApiRequest, NextApiResponse } from "next";
import ControleEditora from "../../../classes/controle/ControleEditora";

const controleEditora = new ControleEditora();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { codEditora } = req.query;
      const nomeEditora = await controleEditora.getNomeEditora(
        Number(codEditora)
      );
      res.status(200).json({ nome: nomeEditora });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).end();
  }
}
