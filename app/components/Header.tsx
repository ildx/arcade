import headerImage from '../images/header.jpg'

export const Header = () => {
  return (
    <header>
      <div
        className="bg-cover h-screen bg-center bg-no-repeat relative max-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${headerImage.src})`,
        }}
      >
        <h1 className='text-8xl text-purple-dark font-black text-stroke-beige'>Arcade</h1>
      </div>
    </header>
  )
}