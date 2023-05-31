import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import ControleEditora from "../classes/controle/ControleEditora";
import Head from "next/head";
import Menu from "@/components/Menu";
import Livro from "../classes/modelo/Livros";

const LivroDados: NextPage = () => {
  const controleEditora = new ControleEditora();
  const baseURL = "http://localhost:3000/api/livros";
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);

  const router = useRouter();

  const incluirLivro = async (livro: Livro): Promise<boolean> => {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });
      const data = await response.json();
      return response.ok;
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
      return false;
    }
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCodEditora(Number(value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autores.split("\n"),
    };

    const success = await incluirLivro(livro);
    if (success) {
      router.push("/LivroLista");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="container">
        <h1>Cadastro de Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label className="form-label">Título:</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Resumo:</label>
            <input
              type="text"
              className="form-control"
              value={resumo}
              onChange={(event) => setResumo(event.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Editora:</label>
            <select
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Autores:</label>
            <textarea
              className="form-control"
              value={autores}
              onChange={(event) => setAutores(event.target.value)}></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Incluir
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
