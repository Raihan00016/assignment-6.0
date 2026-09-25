import Link from "next/link";
import { PiBarbellFill } from "react-icons/pi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
         
          <Link href="/" className="flex items-center gap-2">
            <PiBarbellFill className="text-lime-400" size={20} />
            <span className="text-white font-bold tracking-wide text-sm">
              FITLOG
            </span>
          </Link>

        
          <p className="text-zinc-500 text-xs text-center sm:text-right">
            © {year} FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;