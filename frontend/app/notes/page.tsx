import { getNotes } from "@/lib/content";
import { stripMarkdown } from "@/lib/content";

const MOOD_EMOJI: Record<string, string> = {
  idea: "💡",
  insight: "🤔",
  question: "❓",
  observation: "👀",
};

export default async function NotesPage() {
  const notes = getNotes();

  return (
    <section className="px-8 md:px-24 bg-surface-container-low min-h-screen">
      <div className="pt-24 pb-8">
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[2px] w-12 bg-primary" />
          <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Field Notes
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
          短笔记
        </h1>
      </div>

      {notes.length === 0 ? (
        <div className="pb-20 text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">
            edit_note
          </span>
          <p className="font-[family-name:var(--font-headline)] text-xl text-on-surface-variant">
            暂无笔记
          </p>
          <p className="font-[family-name:var(--font-body)] text-sm text-outline mt-2">
            请在 content/notes/ 目录中添加 .mdx 文件
          </p>
        </div>
      ) : (
        <div className="pb-20 space-y-4 max-w-3xl">
          {notes.map((note) => {
            const text = stripMarkdown(note.content).slice(0, 200);
            return (
              <div
                key={note.slug}
                className="bg-surface-container-lowest rounded-[var(--radius-xl)] p-6 shadow-tactile ghost-border"
              >
                <div className="flex items-start gap-4">
                  {note.mood && (
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {MOOD_EMOJI[note.mood] || "📝"}
                    </span>
                  )}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold tracking-tight text-on-surface mb-1">
                      {note.title}
                    </h3>
                    {text && (
                      <p className="font-[family-name:var(--font-body)] text-sm text-on-surface-variant mb-3 line-clamp-3">
                        {text}
                      </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-[family-name:var(--font-body)] text-xs text-outline">
                        {new Date(note.date).toLocaleDateString("zh-CN")}
                      </span>
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inner-milled bg-surface-container px-2 py-0.5 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-wider text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
