import Livro from "../modelo/Livros";

let livros: Livro[] = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: "Use a Cabeça: Java",
    resumo:
      "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (00) e Java.",
    autores: ["Bert Bates", "Kathy Sierra"],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: "Java, como Programar",
    resumo:
      "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software.com os livros Deitel.",
    autores: ["Paul Deitel", "Harvey Deitel"],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: "Padrões JavaScript",
    resumo:
      "Qual é a melhor maneira de desenvolver uma aplicação em JavaScript? Este livro, ao apresentar inúmeros padrões e as melhores práticas no JavaScript, vai ajudá-lo a responder a essa pergunta.",
    autores: ["Stoyan Stefanov"],
  },
];

class ControleLivros {
  obterLivros(): Livro[] {
    return livros;
  }

  incluir(livro: Livro): void {
    const proximoCodigo = Math.max(...livros.map((l) => l.codigo)) + 1;
    livro.codigo = proximoCodigo;
    livros.push(livro);
  }

  excluir(codigo: number): void {
    const indice = livros.findIndex((livro) => livro.codigo === codigo);
    if (indice !== -1) {
      livros.splice(indice, 1);
    }
  }
}

export default ControleLivros;
