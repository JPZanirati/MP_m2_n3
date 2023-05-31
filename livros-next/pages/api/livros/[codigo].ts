import { NextApiRequest, NextApiResponse } from "next";
import ControleLivro from "../../../classes/controle/ControleLivros";

const controleLivro = new ControleLivro();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const { codigo } = req.query;
      controleLivro.excluir(Number(codigo));
      res.status(200).json({ mensagem: "Livro excluído com sucesso." });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).end();
  }
}
