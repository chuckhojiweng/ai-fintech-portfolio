import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 p-6">
      {/* Hero */}
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 animate-bounce">🦎</div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
          Code<span className="text-indigo-600">Critters</span>
        </h1>
        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
          Learn to code with your new best friend, CoCo the chameleon!
        </p>

        <div className="space-y-3">
          <Link
            href="/map"
            className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Adventure!
          </Link>
          <Link
            href="/sandbox"
            className="block w-full bg-white text-indigo-600 text-lg font-bold py-3 px-8 rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
          >
            Free Sandbox
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 max-w-md mt-12">
        <div className="text-center">
          <div className="text-3xl mb-2">🧩</div>
          <p className="text-xs font-bold text-gray-600">Drag & Drop Blocks</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🤖</div>
          <p className="text-xs font-bold text-gray-600">AI Tutor</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🌟</div>
          <p className="text-xs font-bold text-gray-600">Earn Stars</p>
        </div>
      </div>

      {/* Age badge */}
      <div className="mt-8 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-500">
        Designed for ages <span className="font-bold text-indigo-600">6-8</span>
      </div>
    </div>
  );
}
