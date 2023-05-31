import React, { useState, useEffect } from "react";
import ControleEditora from "../classes/controle/ControleEditora";

const LinhaLivro = (props: any) => {
  const controleEditora = new ControleEditora();
  const [nomeEditora, setNomeEditora] = useState("");

  useEffect(() => {
    const obterNomeEditora = async () => {
      const nome = await controleEditora.getNomeEditora(props.livro.codEditora);
      setNomeEditora(nome);
    };

    obterNomeEditora();
  }, [props.livro.codEditora]);

  const excluirLivro = (codigoLivro: any) => {
    props.excluir(codigoLivro);
  };

  return (
    <tr>
      <td>
        <td className="d-flex flex-column align-items-start text-left text-light">
          {props.livro.titulo}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => excluirLivro(props.livro.codigo)}>
            Excluir
          </button>
        </td>
      </td>
      <td className="col-6 text-left text-light">{props.livro.resumo}</td>
      <td className="text-left text-light">{nomeEditora}</td>
      <td className="text-left text-light">
        <ul className="list-group">
          {props.livro.autores.map((autor: string, index: number) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default LinhaLivro;
