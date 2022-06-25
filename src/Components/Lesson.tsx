import { format, isPast } from "date-fns";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, availableAt, type, slug }: LessonProps) {
  const { slug: videoSlug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(availableAt);

  const isActiveLesson = slug === videoSlug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {format(availableAt, "EEEE' • 'd' de ' MMMM' • 'k'h'mm")}
      </span>

      <div
        className={classnames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classnames(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-blue-500": !isActiveLesson,
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Released content
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Come soon
            </span>
          )}
          <span
            className={classnames(
              "text-xs rounded px-2 py-[0.125rem] text-white border  font-bold uppercase",
              {
                "border-green-300": !isActiveLesson,
                "border-white": isActiveLesson,
              }
            )}
          >
            {type === "live" ? "Live" : "Practical"}
          </span>
        </header>

        <strong
          className={classnames("mt-5 block", {
            "text-gray-200": !isActiveLesson,
            "text-white": isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
