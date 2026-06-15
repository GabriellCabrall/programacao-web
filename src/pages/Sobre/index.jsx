import styles from './Sobre.module.css'
import PageWrapper from '../../components/PageWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import sol from '../../assets/sol.png'
import soldatarde from '../../assets/soldatarde.png'
import florest from '../../assets/florest.png'
import fundoVerde from '../../assets/fundo-verde.png'
import bluedark from '../../assets/bluedark.png'
import fundoAzul from '../../assets/fundo-azul.png'

function Sobre() {
  return (
    <PageWrapper>
      <Header />

      {/* ── Pilsen (Sol da Tarde) ── */}
      <section className={styles.secaoPilsen}>
        <img className={styles.sol} src={sol} alt="" aria-hidden="true" />
        <div className={styles.textosPilsen}>
          <p className={styles.titulo}>PILSEN (SOL DA TARDE)</p>
          <p className={styles.descricao}>
            O estilo de cerveja artesanal Pilsen ou Pilsner surgiu na República Tcheca.
            Como características marcantes, a bebida apresenta aroma e sabor acentuados
            pelo lúpulo, além da cor dourada. Seu teor alcoólico varia entre 4,6% e 5%
            em média. As mais famosas são a cerveja de origem Pilsner Urquell (primeira
            Pilsen produzida) e a German Pilsner.
          </p>
        </div>
        <img className={styles.imgPilsen} src={soldatarde} alt="Mars Beer Sol da Tarde" />
      </section>

      {/* ── Tripel (Florest) ── */}
      <section className={styles.secaoFlorest}>
        <img className={styles.fundoVerde} src={fundoVerde} alt="" aria-hidden="true" />
        <img className={styles.imgFlorest} src={florest} alt="Mars Beer Florest" />
        <div className={styles.textosFlorest}>
          <p className={styles.titulo}>TRIPEL (FLOREST)</p>
          <p className={styles.descricao}>
            Criada na Bélgica, no Mosteiro Trapista de Westmalle, a cerveja Tripel
            apresenta cor clara, sabor amargo cítrico e aroma frutado. Esse estilo de
            cerveja artesanal é bem carbonatado, o que lhe confere uma espuma bastante
            cremosa. Trata-se de uma cerveja forte, com malte acentuado e teor alcoólico
            em torno de 7,5% e 8,5%.
          </p>
        </div>
      </section>

      {/* ── Weizenbier (Blue Dark) ── */}
      <section className={styles.secaoBlue}>
        <img className={styles.fundoAzul} src={fundoAzul} alt="" aria-hidden="true" />
        <div className={styles.textosBlue}>
          <p className={styles.titulo}>WEIZENBIER (BLUE DARK)</p>
          <p className={styles.descricao}>
            O estilo de cerveja Weizenbier, Weissbier ou Weiss surgiu na região Sul da
            Alemanha, mais especificamente na Baviera. O estilo apresenta 50% de malte
            de trigo (no mínimo). Sua cor é clara e opaca, com sabor e aroma frutados,
            lembrando banana e cravo. A bebida é refrescante, com teor alcoólico moderado
            (em torno de 5% a 6%).
          </p>
        </div>
        <img className={styles.imgBlue} src={bluedark} alt="Mars Beer Blue Dark" />
      </section>

      <hr className={styles.hr} />
      <Footer />
    </PageWrapper>
  )
}

export default Sobre
