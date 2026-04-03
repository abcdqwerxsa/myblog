import { getProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="px-8 md:px-24 bg-surface-container-low min-h-screen">
      <div className="pt-24 pb-8">
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[2px] w-12 bg-primary" />
          <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Specimens
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
          项目展示
        </h1>
      </div>

      {projects.length === 0 ? (
        <div className="pb-20 text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">
            code
          </span>
          <p className="font-[family-name:var(--font-headline)] text-xl text-on-surface-variant">
            暂无项目
          </p>
          <p className="font-[family-name:var(--font-body)] text-sm text-outline mt-2">
            请在 content/projects/ 目录中添加 .mdx 文件
          </p>
        </div>
      ) : (
        <div className="pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-surface-container-lowest rounded-[var(--radius-xl)] shadow-tactile ghost-border overflow-hidden"
            >
              {project.coverImage && (
                <div className="h-48 bg-surface-container overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight text-on-surface">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="status-lens">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${
                          project.status === "active"
                            ? "bg-green-500"
                            : project.status === "wip"
                            ? "bg-amber-500"
                            : "bg-outline-variant"
                        }`}
                      />
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="font-[family-name:var(--font-body)] text-sm text-on-surface-variant mb-4">
                    {project.description}
                  </p>
                )}
                {project.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inner-milled bg-surface-container px-2 py-0.5 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-wider text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-button px-4 py-2 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-xs text-on-primary"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Demo
                      </span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inner-milled bg-surface-container px-4 py-2 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-xs text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">code</span>
                        Source
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
