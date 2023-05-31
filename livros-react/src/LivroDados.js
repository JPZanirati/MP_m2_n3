import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ControleLivros from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

function LivroDados() {
    const controleLivro = new ControleLivros();
    const controleEditora = new ControleEditora();

    const opcoes = controleEditora.getEditoras().map((editora) => ({
        value: editora.codEditora,
        text: editora.nome,
    }));

    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    const navigate = useNavigate();

    const tratarCombo = (event) => {
        const { value } = event.target;
        setCodEditora(Number(value));
    };

    const incluir = (event) => {
        event.preventDefault();

        const livro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split("\n"),
            codEditora,
        };

        controleLivro.incluir(livro);
        navigate("/livroLista");
    };

    return (
        <main className="container">
            <h1>Cadastro de Livro</h1>
            <form onSubmit={incluir}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">
                        Título
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={titulo}
                        onChange={(event) => setTitulo(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumo" className="form-label">
                        Resumo
                    </label>
                    <textarea
                        className="form-control"
                        id="resumo"
                        value={resumo}
                        onChange={(event) => setResumo(event.target.value)}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="editora" className="form-label">
                        Editora
                    </label>
                    <select
                        className="form-select"
                        id="editora"
                        value={codEditora}
                        onChange={tratarCombo}
                    >
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">
                        Autores (1 por linha)
                    </label>
                    <textarea
                        className="form-control"
                        id="autores"
                        value={autores}
                        onChange={(event) => setAutores(event.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Incluir
                </button>
            </form>
        </main>
    );
}

export default LivroDados;