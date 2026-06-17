import { useState, useEffect } from "react";
import Menu from "../assets/menu.svg";
import Close from "../assets/close.svg";
import Logo from "../assets/logo.svg";
import Check from "../assets/check.svg";
import HeroRectangleOne from "../assets/rectangleOne.png";
import HeroRectangleTwo from "../assets/rectangleTwo.png";
import Champion from "../assets/champion.svg";
import ProfileOne from "../assets/elon_ma.png";
import ProfileTwo from "../assets/jonh_cena.png";
import ProfileThree from "../assets/ryan_goslin.png";
import Button from "../components/Button";
import SolutionCard from "../components/SolutionCard";
import TestimonialCard from "../components/TestimonialCard";
import "../styles/hero.css";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/header.css";
import "../styles/pricing.css";
import "../styles/contact.css";

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("//.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao enviar a mensagem.");
      }

      alert("Mensagem enviada com sucesso! Verifique o painel do Ethereal.");
      
      setEmail("");
      setMessage("");
    } catch (error: any) {
      alert(error.message ?? "Falha ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = showMobileMenu ? "hidden" : "auto";
    }
  }, [showMobileMenu]);

  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <img src={Logo} alt="EliteDraft" />
          </div>

          <div className="desktop-only">
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a onClick={() => setShowMobileMenu(false)} href="#solution">Soluções</a></li>
              <li><a onClick={() => setShowMobileMenu(false)} href="#testimonials">Depoimentos</a></li>
              <li><a href="#pricing">Preços</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>

          <div className="desktop-only">
            <div className="nav-auth">
              <a className="login-link ml-lg" href="">Login</a>
              <Button text="Cadastre-se" />
            </div>
          </div>

          <div className="mobile-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span>
              <img src={showMobileMenu ? Close : Menu} alt="Menu" width={24} height={24} />
            </span>
          </div>

          {showMobileMenu && (
            <div className="mobile-menu-content">
              <ul>
                <li><a onClick={() => setShowMobileMenu(false)} href="#">Home</a></li>
                <li><a onClick={() => setShowMobileMenu(false)} href="#solution">Soluções</a></li>
                <li><a onClick={() => setShowMobileMenu(false)} href="#testimonials">Depoimentos</a></li>
                <li><a onClick={() => setShowMobileMenu(false)} href="#pricing">Preços</a></li>
                <li><a onClick={() => setShowMobileMenu(false)} href="#contact">Contato</a></li>
                <li><a onClick={() => setShowMobileMenu(false)} href="#">Login</a></li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section id="hero">
          <img src={HeroRectangleOne} alt="" />
          <span className="desktop-only">
            <img src={HeroRectangleTwo} alt="" />
          </span>

          <div className="hero-content">
            <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Olá</p>
            <h1>TRANSFORME SUAS IDEIAS EM REALIDADE DIGITAL</h1>
            <p>Desenvolvimento web de alto nível para empresas que buscam performance e design impecável.</p>
            <div className="flex gap-1 justify-center">
              <Button text="Cadastre-se" />
              <Button text="Veja mais" secondary />
            </div>
          </div>
        </section>

        <section className="container" id="solution">
          <header>
            <span>
              <h2 style={{ color: 'var(--primary-color)', fontSize: '1rem', marginBottom: '0.5rem' }}>Soluções</h2>
              <h2>Sob medida para você</h2>
            </span>
            <p>Inovação é com a gente! A <strong>EliteDraft</strong> já protegeu diversos sistemas.</p>
          </header>
          <div className="even-columns">
            <SolutionCard image={Champion} title="Produto Vencedor" description="Ideia matadora, nosso time já ganhou diversos eventos." />
            <SolutionCard image={Champion} title="Segurança Elite" description="Proteção avançada para seus dados e sistemas." />
            <SolutionCard image={Champion} title="Design Premium" description="Interfaces modernas focadas na experiência do usuário." />
          </div>
        </section>

        <section id="testimonials">
          <header>
            <span>
              <p className="desktop-only">Conselho de quem conhece</p>
              <h2>Cada cliente importa!</h2>
            </span>
            <p>Acompanhe abaixo os testemunhos de quem já aprovou nossos serviços.</p>
          </header>

          <section className="carousel">
            <div className="carousel-content">
              <TestimonialCard imagemPerfil={ProfileOne} quantidadeEstrelas={5} nome="Elon Ma" cargo="CEO BING CHILLING" testemunho="Certamente o mercado de cibersegurança está bombando." />
              <TestimonialCard imagemPerfil={ProfileTwo} quantidadeEstrelas={4} nome="Jonh Cena" cargo="WWE CHAMPION" testemunho="Incrível! O sistema ficou blindado." />
              <TestimonialCard imagemPerfil={ProfileThree} quantidadeEstrelas={5} nome="Ryan Gosling" cargo="AgroTech Founder" testemunho="Layout limpo e alta performance." />
              
              <TestimonialCard imagemPerfil={ProfileOne} quantidadeEstrelas={5} nome="Elon Ma" cargo="CEO BING CHILLING" testemunho="Certamente o mercado de cibersegurança está bombando." />
              <TestimonialCard imagemPerfil={ProfileTwo} quantidadeEstrelas={4} nome="Jonh Cena" cargo="WWE CHAMPION" testemunho="Incrível! O sistema ficou blindado." />
              <TestimonialCard imagemPerfil={ProfileThree} quantidadeEstrelas={5} nome="Ryan Gosling" cargo="AgroTech Founder" testemunho="Layout limpo e alta performance." />
            </div>
          </section>
        </section>

        <section id="pricing" className="container">
          <header>
              <p className="desktop-only">Planos e preços</p>
              <h2>Nossos planos</h2>
          </header>

          <section className="even-columns gap-1.5">
              <div className="pricing-card">
                  <span className="plan">
                      <h3>Básico</h3>
                      <p>Baixe a ferramenta e comece a utilizar agora mesmo!</p>
                  </span>
                  <span className="price">
                      <h2>Grátis</h2>
                  </span>
                  <Button text="Baixar agora" secondary key="free" />
                  <span className="hr" />
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Com anúncios</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Até 10 produtos por dia</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Utilize sem limitação X</p>
                  </div>
              </div>

              <div className="pricing-card premium">
                  <span className="bonus">
                      <p>1º MÊS GRÁTIS</p>
                  </span>
                  <span className="plan">
                      <h3>Premium</h3>
                      <p>Para quem deseja utilizar nossa ferramenta sem limitações!</p>
                  </span>
                  <span className="price">
                      <h2>R$ 19,90</h2>
                      <p>/mês</p>
                  </span>
                  <Button text="Experimente de graça" key="premium" />
                  <span className="hr" />
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Sem interrupção de anúncios</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Utilize quantas vezes quiser</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Utilize todos os produtos disponíveis</p>
                  </div>
              </div>

              <div className="pricing-card">
                  <span className="plan">
                      <h3>Empresarial</h3>
                      <p>Utilize nossa solução na sua empresa. Aprimore seu fluxo.</p>
                  </span>
                  <span className="price">
                      <h2>R$ 12,90</h2>
                      <p>/mês por dev</p>
                  </span>
                  <Button text="Baixar agora" secondary key="enterprise" />
                  <span className="hr" />
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Com anúncios</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Até 10 produtos por dia</p>
                  </div>
                  <div className="features">
                      <img src={Check} alt="check" width={24} height={24} />
                      <p>Utilize sem limitação X</p>
                  </div>
              </div>
          </section>
        </section>

        <section id="contact" className="container">
          <header>
            <p>Envie sua dúvida</p>
            <h2>Entre em contato</h2>
            <p className="description">
              Entre em contato, estamos dispostos a tirar qualquer dúvida, seja um orçamento, 
              uma dúvida técnica de algum de nossos produtos. Estamos à disposição para responder.😎
            </p>
          </header>

          <form onSubmit={handleSubmit} className="contact-form">
            <input 
              type="email" 
              name="email" 
              placeholder="Seu melhor Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />
            <textarea 
              name="message" 
              placeholder="Motivo do contato. Ex: Gostei muito do produto X, poderia me enviar um orçamento?" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={loading}
            ></textarea>
            
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-brand">
              <h3>EliteDraft</h3>
              <div className="footer-socials">
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="Facebook">🔵</a>
                <a href="#" aria-label="YouTube">🔴</a>
              </div>
            </div>

            <div className="footer-nav">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Faça parte do time</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-nav">
              <h4>Funcionalidades</h4>
              <ul>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Análise de dados</a></li>
                <li><a href="#">Boot discord</a></li>
              </ul>
            </div>

            <div className="footer-nav">
              <h4>Recursos</h4>
              <ul>
                <li><a href="#">iOS & Android</a></li>
                <li><a href="#">Teste a Demo</a></li>
                <li><a href="#">Clientes</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Feito com amor na aula de Programação Web💙 ©2026 EliteDraft - Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}