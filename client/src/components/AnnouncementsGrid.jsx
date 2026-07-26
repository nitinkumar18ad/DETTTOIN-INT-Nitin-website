import SectionShell from "./SectionShell.jsx";
import { formatDisplayDate } from "../utils/date.js";

export default function AnnouncementsGrid({ announcements = [], isLoading = false, error = null }) {
  const visibleAnnouncements = announcements.slice(0, 3);

  return (
    <SectionShell id="announcements" className="bg-sandstone-50">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
          Announcements
        </p>
        <h2 className="mt-4">Notices for the school community.</h2>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="min-h-56 animate-pulse rounded-heritage border border-sandstone-200 bg-white p-6 shadow-soft"
            >
              <div className="h-4 w-24 rounded bg-sandstone-200" />
              <div className="mt-6 h-8 w-4/5 rounded bg-sandstone-200" />
              <div className="mt-5 h-4 w-full rounded bg-sandstone-200" />
              <div className="mt-3 h-4 w-2/3 rounded bg-sandstone-200" />
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-heritage border border-maroon-100 bg-white p-6 text-maroon-700 shadow-soft">
          Announcements could not be loaded. Please try again later.
        </div>
      ) : null}

      {!isLoading && !error && visibleAnnouncements.length === 0 ? (
        <div className="rounded-heritage border border-sandstone-200 bg-white p-6 text-ink-700 shadow-soft">
          No announcements are available right now.
        </div>
      ) : null}

      {!isLoading && !error && visibleAnnouncements.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-3">
          {visibleAnnouncements.map((announcement) => (
            <article
              key={announcement.id}
              className="flex min-h-64 flex-col rounded-heritage border border-sandstone-200 bg-white p-6 shadow-soft"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
                  {announcement.category}
                </p>
                <h3 className="mt-4">{announcement.title}</h3>
                <p className="mt-3 font-semibold text-maroon-700">
                  {formatDisplayDate(announcement.date)}
                </p>
                <p className="mt-4 text-ink-700">{announcement.summary}</p>
              </div>
              <a className="mt-auto pt-6 font-semibold text-maroon-700" href={announcement.href}>
                Read notice
              </a>
            </article>
          ))}
        </div>
      ) : null}
    </SectionShell>
  );
}
