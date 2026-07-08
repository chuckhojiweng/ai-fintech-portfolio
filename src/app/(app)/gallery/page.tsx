"use client";

export default function GalleryPage() {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="text-4xl mr-2">🖼️</span>
          My Creations
        </h1>
        <p className="text-gray-500 text-sm">
          Your awesome projects will appear here!
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-gray-200">
          <span className="text-6xl block mb-4">🎨</span>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No projects yet!
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Head to the Sandbox to create your first masterpiece!
          </p>
          <a
            href="/sandbox"
            className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-colors"
          >
            Start Creating
          </a>
        </div>
      </div>
    </div>
  );
}
