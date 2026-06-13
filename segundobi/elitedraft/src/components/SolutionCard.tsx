interface ISolutionCardProps {
    image: string;
    title: string;
    description: string;
}

export default function SolutionCard({ image, title, description }: ISolutionCardProps) {
    return (
        <div className="card">
            <span>
                <img src={image} alt={title} width={64} height={64} />
            </span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <hr />
            </div>
        </div>
    );
}