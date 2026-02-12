import React, { useMemo, useState } from "react";
import AndroidTab from "./tabs/AndroidTab";
import MDETab from "./tabs/MDETab";

/**
 * Single-file React app (Tailwind)
 * ✅ Keeps your existing Playbooks experience (accordion + search + reset + progressive checklist)
 * ✅ Adds Tabs at the top: Playbooks | Windows Update | MDE
 * ✅ Windows Update tab includes: Create (policies), Monitor (reports), Troubleshoot + real scenarios
 *
 * NOTE:
 * - I left the playbooks array as a PLACEHOLDER below to keep this file manageable.
 * - Replace the playbooks constant with YOUR FULL playbooks array (the one you pasted). Everything else will work.
 */


// =====================
// 2) SMALL UTILS
// =====================
function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}



function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
      {children}
    </span>
  );
}

// =====================
// 3) PLAYBOOKS UI (YOUR EXISTING BEHAVIOR)
// =====================
function ProgressChecklist({ steps, value, onChange }) {
  // value is a boolean array
  const isUnlocked = (idx) => idx === 0 || value[idx - 1] === true;

  return (
    <div className="space-y-2">
      {steps.map((s, idx) => {
        const unlocked = isUnlocked(idx);
        const checked = value[idx] === true;
        return (
          <div
            key={idx}
            className={clsx(
              "rounded-xl border p-3",
              unlocked ? "bg-white" : "bg-gray-50 opacity-60"
            )}
          >
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5"
                disabled={!unlocked}
                checked={checked}
                onChange={(e) => {
                  const next = [...value];
                  next[idx] = e.target.checked;
                  // if unchecking, also lock everything after
                  if (!e.target.checked) {
                    for (let j = idx + 1; j < next.length; j++) next[j] = false;
                  }
                  onChange(next);
                }}
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{s.title}</div>
                <div className="mt-1 text-sm text-gray-600">{s.where}</div>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

function Section({ section, state, setState }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border bg-gray-50 overflow-hidden">
      
      {/* Header */}
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

      {/* Body */}
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


function PlaybooksTab() {
const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");

  const initialProgress = useMemo(() => {
    const p = {};
    for (const a of playbooks) {
      p[a.id] = {};
      for (const sec of a.sections) {
        p[a.id][sec.key] = Array(sec.steps.length).fill(false);
      }
    }
    return p;
  }, []);

  const [progress, setProgress] = useState(initialProgress);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return playbooks;
    return playbooks.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.sections.some((s) =>
          s.steps.some(
            (st) =>
              st.title.toLowerCase().includes(q) ||
              st.where.toLowerCase().includes(q)
          )
        )
    );
  }, [query]);

  const resetAll = () => {
    setProgress(initialProgress);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Attacks Response Cheatsheet
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Click an attack → follow the step-by-step checklist (next step
              unlocks only after you complete the previous).
            </p>
          </div>
          <button
            onClick={resetAll}
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-black"
          >
            Reset all checklists
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search attacks, steps, or locations…"
              className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="hidden md:block text-xs text-gray-500">
            Tip: search “isolate”, “LAPS”, “CA”, “BitLocker”…
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill>Intune</Pill>
          <Pill>Entra ID</Pill>
          <Pill>Defender</Pill>
          <Pill>MD-102 style</Pill>
        </div>
      </header>

      <main className="space-y-4">
        {filtered.map((attack) => (
          <AttackCard
            key={attack.id}
            attack={attack}
            openId={openId}
            setOpenId={setOpenId}
            progress={progress}
            setProgress={setProgress}
          />
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-white p-6 text-center text-sm text-gray-600">
            No results. Try another keyword.
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-xs text-gray-500 space-y-1">
        <div>
          Built for Intune + Entra ID + Microsoft Defender workflows (MD-102
          style). Customize the playbooks as your org policies change.
        </div>
        <div className="font-semibold text-gray-700">built by @peterrezik</div>
        <div>📧 Email: peter.s.rezik@gmail.com | 📞 Phone: +971-504858376</div>
      </footer>
    </div>
  );
}

// =====================
// 4) WINDOWS UPDATE TAB (INTUNE-ONLY)
// =====================
function WindowsUpdateTab() {
  const updatePlaybook = {
    title: "Windows Update Incident Playbook",
    subtitle: "Step-by-step admin workflow just like attack response",
    sections: [
      {
        key: "create",
        title: "🛠 Create Update Strategy",
        steps: [
          {
            title: "Create Update Rings",
            where:
              "Intune Admin Center → Devices → Windows → Update rings → Create ring (IT → Pilot → Production).",
          },
          {
            title: "Configure Deferral Periods",
            where:
              "Quality: 5–7 days | Feature: 60–120 days to avoid unstable releases.",
          },
          {
            title: "Set Deadlines",
            where:
              "Configure auto-install + forced restart to prevent users from delaying security patches.",
          },
          {
            title: "Assign Azure AD Groups",
            where:
              "Always deploy to IT first, then Pilot users, then Broad production.",
          },
          {
            title: "Pin Feature Version",
            where:
              "Devices → Feature updates → Select Windows version (ex: Windows 11 23H2).",
          },
        ],
      },
      {
        key: "monitor",
        title: "📊 Monitor Deployment",
        steps: [
          {
            title: "Check Update Compliance",
            where:
              "Intune → Reports → Windows Updates → Review compliance percentage.",
          },
          {
            title: "Identify Failed Devices",
            where:
              "Filter devices showing errors or pending restart.",
          },
          {
            title: "Validate Pilot Ring Health",
            where:
              "Never deploy globally before confirming pilot stability.",
          },
          {
            title: "Track Restart Status",
            where:
              "Most update failures are actually restart delays.",
          },
        ],
      },
      {
        key: "troubleshoot",
        title: "🚑 Troubleshoot Like a Senior Admin",
        steps: [
          {
            title: "Confirm Device Assignment",
            where:
              "Ensure the device is inside the correct Azure AD group.",
          },
          {
            title: "Force Intune Sync",
            where:
              "Devices → Select Device → Sync OR Company Portal → Sync.",
          },
          {
            title: "Check Policy Conflicts",
            where:
              "Avoid assigning multiple update rings to the same device.",
          },
          {
            title: "Review Windows Update Logs",
            where:
              "Event Viewer → Microsoft → Windows → WindowsUpdateClient → Operational.",
          },
          {
            title: "Verify Network Access",
            where:
              "Ensure device can reach Microsoft Update endpoints and is not blocked by firewall/VPN.",
          },
        ],
      },
      {
        key: "scenario",
        title: "🔥 Real Enterprise Scenario",
        steps: [
          {
            title: "Problem: Update broke the VPN client",
            where:
              "Pilot users report connectivity issues after a cumulative update.",
          },
          {
            title: "Pause Broad Deployment",
            where:
              "Remove production assignment temporarily.",
          },
          {
            title: "Keep Testing in Pilot",
            where:
              "Work with vendor or deploy patched version of the app.",
          },
          {
            title: "Resume Deployment Safely",
            where:
              "After validation, reassign production group.",
          },
        ],
      },
    ],
  };

  const initialState = useMemo(() => {
    const state = {};
    updatePlaybook.sections.forEach((sec) => {
      state[sec.key] = Array(sec.steps.length).fill(false);
    });
    return state;
  }, []);

  const [progress, setProgress] = useState(initialState);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          {updatePlaybook.title}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {updatePlaybook.subtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {updatePlaybook.sections.map((sec) => (
          <Section
            key={sec.key}
            section={sec}
            state={progress[sec.key]}
            setState={(nextArr) =>
              setProgress((prev) => ({
                ...prev,
                [sec.key]: nextArr,
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}

// =====================
// 5) MDE TAB (ABOUT PAGE)
// =====================

// =====================
// 6) APP SHELL (TABS)
// =====================
function TopBar({ tab, setTab }) {
  const tabs = [
    { id: "playbooks", label: "Attack Response using MDE" },
    { id: "windows-update", label: "Windows Update" },
     { id: "android", label: "Android" },
    { id: "mde", label: "MDE" },
  ];

  return (
    <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gray-900" />
            <div>
              <div className="text-sm font-black text-gray-900">MD-102 Knowledge Hub</div>
              <div className="text-xs text-gray-500">Intune • Entra • Defender</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={clsx(
                    "rounded-xl px-3 py-2 text-sm font-bold",
                    active
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


function AttackCard({ attack, openId, setOpenId, progress, setProgress }) {
  const isOpen = openId === attack.id;
  const sectionStates = progress[attack.id];

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Attack Header */}
      <button
        onClick={() => setOpenId(isOpen ? null : attack.id)}
        className="w-full text-left p-5 flex items-start justify-between hover:bg-gray-50 transition"
      >
        <div>
          <div className="text-lg font-extrabold text-gray-900">
            {attack.title}
          </div>

          <div className="mt-1 text-sm text-gray-600">
            {attack.subtitle}
          </div>
        </div>

        <span
          className={clsx(
            "transition-transform duration-200 font-bold",
            isOpen && "rotate-180"
          )}
        >
          ▼
        </span>
      </button>

      {/* Sections */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {attack.sections.map((sec) => (
            <Section
              key={sec.key}
              section={sec}
              state={sectionStates[sec.key]}
              setState={(nextArr) => {
                setProgress((prev) => ({
                  ...prev,
                  [attack.id]: {
                    ...prev[attack.id],
                    [sec.key]: nextArr,
                  },
                }));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [tab, setTab] = useState("playbooks");

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar tab={tab} setTab={setTab} />

      {tab === "playbooks" && <PlaybooksTab />}
      {tab === "windows-update" && <WindowsUpdateTab />}
      {tab === "android" && <AndroidTab />}
      {tab === "mde" && <MDETab />}
    </div>
  );
}
