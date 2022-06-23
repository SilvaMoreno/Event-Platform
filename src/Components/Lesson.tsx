import { format, isPast } from "date-fns";
import { CheckCircle, Lock } from "phosphor-react";
import { Link } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, availableAt, type, slug }: LessonProps) {
  const isLessonAvailable = isPast(availableAt);
  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {format(availableAt, "EEEE' • 'd' de ' MMMM' • 'k'h'mm")}
      </span>
      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Released content
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Come soon
            </span>
          )}
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold uppercase">
            {type === "live" ? "Live" : "Practical"}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">{title}</strong>
      </div>
    </Link>
  );
}
