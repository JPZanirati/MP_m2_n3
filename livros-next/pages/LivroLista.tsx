import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Menu from "../components/Menu";
import Livro from "@/classes/modelo/Livros";
import LinhaLivro from "@/components/LinhaLivro";

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [, setCarregado] = useState(false);

  useEffect(() => {
    const obterLivros = async () => {
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        setLivros(data);
        setCarregado(true);
      } catch (error) {
        console.error("Erro ao obter livros:", error);
      }
    };

    obterLivros();
  }, []);

  const excluirLivro = async (codigo: number): Promise<boolean> => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      return false;
    }
  };

  const excluir = async (codigoLivro: number) => {
    const sucesso = await excluirLivro(codigoLivro);
    if (sucesso) {
      setCarregado(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Lista de Livros</title>
      </Head>
      <div></div>
      <Menu />
      <main className="container">
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
