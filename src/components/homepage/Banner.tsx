import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <div className="mx-4 sm:mx-6 mt-6">
      <div className="mx-auto max-w-7xl rounded-2xl bg-zinc-900 px-6 py-10 sm:px-10 sm:py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
     
          <div className="flex-1 text-center md:text-left">
            <p className="text-lime-400 text-xs sm:text-sm font-bold tracking-widest mb-3">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-white font-extrabold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              TRAIN WITH INTENT. LOG <br /> EVERY SET.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-md mx-auto md:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>

            <button className="mt-6 rounded-md bg-lime-400 px-6 py-3 text-sm font-bold text-black hover:bg-lime-300 transition-colors">
              BROWSE WORKOUTS
            </button>
          </div>

  
          <div className="flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-80">
            <Image
              src={banner}
              alt="Person working out on gym equipment"
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;