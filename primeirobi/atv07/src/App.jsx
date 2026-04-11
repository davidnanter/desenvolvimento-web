import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  const dadosPost = {
    titulo: "Descobrindo as Praias do Nordeste",
    autor: "Pedro",
    data: "15 de agosto de 2025",
    conteudo: "O litoral nordestino é um dos destinos mais procurados do Brasil, oferecendo águas cristalinas."
  };

  return (
    <div className="container-geral">
      <Header />
      <Navigation />
      <main>
        <Article 
          titulo={dadosPost.titulo}
          autor={dadosPost.autor}
          data={dadosPost.data}
          conteudo={dadosPost.conteudo}
        />
      </main>
      <Sidebar />
      <Footer />
    </div>
  )
}

export default App