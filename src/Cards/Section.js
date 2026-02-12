import { useState } from "react";
import ProgressChecklist from "./ProgressChecklist";

function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Section({ section, state, setState }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border bg-gray-50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex justify-between items-center text-left font-bold text-gray-900 hover:bg-gray-100 transition"
      >
        {section.title}

        <span
          className={clsx(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="p-4 border-t">
          <ProgressChecklist
            steps={section.steps}
            value={state}
            onChange={setState}
          />
        </div>
      )}
    </div>
  );
}
