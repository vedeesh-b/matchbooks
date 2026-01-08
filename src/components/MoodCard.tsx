import "./components.css";

type MoodCardProps = {
  imgSrc: string;
  title: string;
};

export default function MoodCard({ imgSrc, title }: MoodCardProps) {
  return (
    <div className="mood-card-container">
      <img src={imgSrc} alt={title} />
      <div className="mood-card-title">{title}</div>
    </div>
  );
}
