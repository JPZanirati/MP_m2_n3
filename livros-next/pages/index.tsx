import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Menu from "../components/Menu";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
