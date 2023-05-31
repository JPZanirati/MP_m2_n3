import Editora from "../modelo/Editora";

const editoras: Editora[] = [
  { codEditora: 1, nome: "Alta Books" },
  { codEditora: 2, nome: "Pearson" },
  { codEditora: 3, nome: "Novatec Editora" },
];

class ControleEditora {
  getEditoras(): Editora[] {
    return editoras;
  }

  getNomeEditora(codEditora: number): string {
    const editoraEncontrada = editoras.filter(
      (editora) => editora.codEditora === codEditora
    );

    if (editoraEncontrada.length > 0) {
      return editoraEncontrada[0].nome;
    }

    return "Editora não encontrada";
  }
}

export default ControleEditora;
