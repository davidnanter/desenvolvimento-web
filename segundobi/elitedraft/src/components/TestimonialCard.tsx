import Star from "../assets/star.svg";
import StarOuter from "../assets/star_out.svg";

interface TestimonialCardProps {
  testemunho: string;
  imagemPerfil: string;
  quantidadeEstrelas: number;
  nome: string;
  cargo: string;
}

export default function TestimonialCard(props: TestimonialCardProps) {
  const arrayEstrelas = new Array(props.quantidadeEstrelas).fill(1);
  const arrayEstrelasVazias = new Array(5 - props.quantidadeEstrelas).fill(1);

  return (
    <div className="carousel-card">
      <img src={props.imagemPerfil} alt="Imagem perfil" />
      <span className="testimony">
        <p>{props.testemunho}</p>
      </span>
      <span className="rating">
        {arrayEstrelas.map((_, index) => (
          <img key={`full-${index}`} src={Star} alt="Estrela" />
        ))}
        {arrayEstrelasVazias.map((_, index) => (
          <img key={`empty-${index}`} src={StarOuter} alt="Estrela vazia" />
        ))}
      </span>
      <span className="names">
        <p>{props.nome}</p>
        <p>{props.cargo}</p>
      </span>
    </div>
  );
}