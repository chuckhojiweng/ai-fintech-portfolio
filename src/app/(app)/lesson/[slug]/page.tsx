import { notFound } from "next/navigation";
import Link from "next/link";
import LessonPlayer from "@/components/lesson/LessonPlayer";
import LessonCoCo from "@/components/lesson/LessonCoCo";
import { loadChapterLessons } from "@/lib/content/loader";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ l?: string }>;
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);

  const lessons = await loadChapterLessons(slug);
  if (!lessons.length) {
    notFound();
  }

  const lessonIndex = Math.max(0, Math.min(parseInt((sp.l as string) ?? "0", 10), lessons.length - 1));
  const lesson = lessons[lessonIndex];
  const nextLesson = lessons[lessonIndex + 1];
  const nextLessonUrl = nextLesson ? `/lesson/${slug}?l=${lessonIndex + 1}` : null;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 80px)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/map"
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4L6 10L12 16" />
            </svg>
          </Link>
          <div>
            <h1 className="text-base font-extrabold text-gray-800 leading-tight">{lesson.title}</h1>
            <p className="text-xs text-gray-400">
              Lesson {lessonIndex + 1} of {lessons.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-lg">
          {[1, 2, 3].map((n) => (
            <span key={n} className="text-gray-300">☆</span>
          ))}
        </div>
      </header>

      {/* Lesson content */}
      <div className="flex-1 flex flex-col min-h-0">
        <LessonPlayer lesson={lesson} nextLessonUrl={nextLessonUrl} />
      </div>

      <LessonCoCo />
    </div>
  );
}
