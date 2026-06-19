import type { Lesson, Chapter } from "@/types/lesson";

const lessonCache = new Map<string, Lesson>();
const chapterCache = new Map<string, Chapter>();

export async function loadLesson(
  chapterSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const cacheKey = `${chapterSlug}/${lessonSlug}`;
  if (lessonCache.has(cacheKey)) {
    return lessonCache.get(cacheKey)!;
  }

  try {
    const data = await import(
      `@/../content/chapters/${chapterSlug}/lessons/${lessonSlug}/lesson.json`
    );
    const lesson = data.default as Lesson;
    lessonCache.set(cacheKey, lesson);
    return lesson;
  } catch {
    return null;
  }
}

export async function loadChapter(slug: string): Promise<Chapter | null> {
  if (chapterCache.has(slug)) {
    return chapterCache.get(slug)!;
  }

  try {
    const data = await import(
      `@/../content/chapters/${slug}/chapter.json`
    );
    const chapter = data.default as Chapter;
    chapterCache.set(slug, chapter);
    return chapter;
  } catch {
    return null;
  }
}

export async function loadChapterLessons(
  chapterSlug: string
): Promise<Lesson[]> {
  const lessons: Lesson[] = [];
  const lessonSlugs = getLessonSlugsForChapter(chapterSlug);

  for (const slug of lessonSlugs) {
    const lesson = await loadLesson(chapterSlug, slug);
    if (lesson) lessons.push(lesson);
  }

  return lessons.sort((a, b) => a.sortOrder - b.sortOrder);
}

function getLessonSlugsForChapter(chapterSlug: string): string[] {
  const chapterLessons: Record<string, string[]> = {
    "01-first-steps": ["01-hello-coco"],
  };
  return chapterLessons[chapterSlug] || [];
}
