import './Games.css';
interface GameProps {
  backgroundImage: string;
  link: string;
}

const Game = ({ backgroundImage, link }: GameProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="game-link">
      <div
        className="game-button"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </a>
  );
};

export default Game;