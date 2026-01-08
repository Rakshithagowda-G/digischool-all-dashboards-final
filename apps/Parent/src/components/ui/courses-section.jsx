import React from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "AI in cyber security: Foundational principles",
    university: "Harvard University",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
  },
];

export const CoursesSection = () => {
  return (
    <section className="w-full h-full flex flex-col gap-6">
      <div className="px-2" />

      <div className="relative flex-1 w-full rounded-[40px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-[32px] bg-white shadow-[0_15px_30px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden flex flex-col"
            >
              <div className="h-32 w-full bg-slate-200">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  {course.university}
                </p>
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {course.title}
                </h3>
                <div className="mt-auto pt-2">
                  <Link
                    to="/courses-detail"
                    className="inline-flex w-full justify-center rounded-full bg-[#1D8CF8] text-white text-sm font-semibold py-2 shadow-[0_10px_20px_rgba(29,140,248,0.25)]"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
