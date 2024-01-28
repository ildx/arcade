import headerImage from '../images/header.jpg';

export const Header = () => {
  return (
    <header>
      <div
        className="relative flex h-screen max-h-[500px] items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${headerImage.src})`,
        }}
      >
        <h1 className="arc-text-stroke text-8xl font-black text-arc-purple-dark">
          Arcade
        </h1>
      </div>
    </header>
  );
};
