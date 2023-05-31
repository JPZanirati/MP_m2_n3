import React, { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

function LinhaLivro(props) {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);

    return (
        <tr>
            <td className="d-flex flex-column align-items-start text-left">
                {props.livro.titulo}
                <button type="button" className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
            </td>
            <td className='col-6 text-left'>{props.livro.resumo}</td>
            <td className='text-left'>{nomeEditora}</td>
            <td className='text-left'>
                <ul className="list-group">
                    {props.livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}

function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado] = useState(true);
    const controleLivro = new ControleLivros();

    useEffect(() => {
        const obterLivros = async () => {
            const livrosObtidos = await controleLivro.obterLivros();
            setLivros(livrosObtidos);
            carregado(false);
        };

        obterLivros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const excluir = async (codigoLivro) => {
        const index = livros.findIndex((livro) => livro.codigo === codigoLivro);

        if (index !== -1) {
            const livroExcluido = livros[index];
            const novosLivros = [...livros];
            novosLivros.splice(index, 1);
            setLivros(novosLivros);

            try {
                await controleLivro.excluir(livroExcluido.codigo);
                console.log('Livro excluído com sucesso');
            } catch (error) {
                console.error('Erro ao excluir livro:', error);
            }
        }
    };

    return (
        <main className="container">
            <h1 className="col-7 row">Catálogo de Livros</h1>
            <table className="col-12 table table-striped">
                <thead className='table-dark text-left'>
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
    );
}

export default LivroLista;