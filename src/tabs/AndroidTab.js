import React, { useMemo, useState } from "react";

import Section from "../Cards/Section";
// الأفضل تطلعه في ملف لوحده بعدين.

export default function AndroidTab() {

  const androidPlaybook = {
    title: "Android Management Playbook",
    subtitle: "Enterprise workflow for managing Android devices in Intune",
    sections: [
      {
        key: "enrollment",
        title: "📱 Enrollment",
        steps: [
          {
            title: "Connect Android Enterprise",
            where:
              "Intune Admin Center → Devices → Android → Android enrollment → Connect Google account.",
          },
          {
            title: "Choose Enrollment Type",
            where:
              "Fully Managed (Corporate) / Corporate-Owned Work Profile / BYOD Work Profile / Dedicated.",
          },
          {
            title: "Configure Zero-touch or QR enrollment",
            where:
              "Use Zero-touch for large deployments or QR for manual setup.",
          },
          {
            title: "Assign device to Azure AD group",
            where:
              "Always target Pilot devices before broad deployment.",
          },
        ],
      },
      {
        key: "configuration",
        title: "⚙️ Configuration",
        steps: [
          {
            title: "Create Device Restrictions policy",
            where:
              "Devices → Android → Configuration profiles → Device restrictions.",
          },
          {
            title: "Deploy Wi-Fi profile",
            where:
              "Auto-connect devices without exposing passwords.",
          },
          {
            title: "Configure VPN",
            where:
              "Required for secure access to internal apps.",
          },
          {
            title: "Deploy certificates",
            where:
              "Use SCEP or PKCS for WiFi and VPN authentication.",
          },
        ],
      },
      {
        key: "compliance",
        title: "✅ Compliance Policy",
        steps: [
          {
            title: "Require PIN / password",
            where:
              "Compliance policies → Device lock settings.",
          },
          {
            title: "Enforce encryption",
            where:
              "Block devices that are not encrypted.",
          },
          {
            title: "Set minimum OS version",
            where:
              "Prevent outdated Android versions from accessing company data.",
          },
          {
            title: "Integrate with Conditional Access",
            where:
              "Allow access only for compliant devices.",
          },
        ],
      },
      {
        key: "monitoring",
        title: "📊 Monitoring & Troubleshooting",
        steps: [
          {
            title: "Check device compliance reports",
            where:
              "Intune → Reports → Device compliance.",
          },
          {
            title: "Review enrollment failures",
            where:
              "Devices → Monitor → Enrollment failures.",
          },
          {
            title: "Track device health",
            where:
              "Identify inactive or non-compliant devices.",
          },
          {
            title: "Remote actions when needed",
            where:
              "Retire / Wipe / Sync / Restart devices.",
          },
        ],
      },
    ],
  };

  const initialState = useMemo(() => {
    const state = {};
    androidPlaybook.sections.forEach((sec) => {
      state[sec.key] = Array(sec.steps.length).fill(false);
    });
    return state;
  }, []);

  const [progress, setProgress] = useState(initialState);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          {androidPlaybook.title}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {androidPlaybook.subtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {androidPlaybook.sections.map((sec) => (
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
