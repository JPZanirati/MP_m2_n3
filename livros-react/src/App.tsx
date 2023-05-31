import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LivroLista from "./LivroLista";
import LivroDados from "./LivroDados";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/LivroLista">
                Lista de Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dados">
                Novo
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/LivroLista" element={<LivroLista />} />
        <Route path="/dados" element={<LivroDados />} />
      </Routes>
    </Router>
  );
}

export default App;
