import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_35%)]" />

      <section className="relative z-10 max-w-xl text-center">
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            404
          </h1>

          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 -z-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page not found
        </h2>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. It may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-all duration-200 shadow-lg shadow-white/10"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}