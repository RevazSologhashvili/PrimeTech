import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen bg-[url('/assets/wide-servers-setup.jpg')] bg-cover bg-no-repeat bg-center"
    >
      {/* Dark overlay with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Content inside the hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-5">
        <Image
          src={"/assets/logo_transparent.png"}
          sizes="cover"
          alt="logo"
          width={400}
          height={200}
        />
        <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          თუ გსურთ ჩვენი აიტი მომსახურება, დაგვიკავშირდით.
        </p>
        <Link href={"/contact"}>
          <button className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
            დაგვიკავშირდით
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
