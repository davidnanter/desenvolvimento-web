

const Article = (props) => {
    return (
        <article className="post-blog">
            <h2>{props.titulo}</h2>
            <p className="data-post">Publicado em: {props.data} por {props.autor}</p>
            <div className="conteudo-texto">
                {props.conteudo}
            </div>
        </article>
    );
}

export default Article;