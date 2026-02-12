import { useMemo, useState } from "react";


export const playbooks = [
  {
    id: "phishing",
    title: "Phishing",
    subtitle: "User clicks malicious link; credentials/session may be compromised",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now (Immediate response)",
        steps: [
          {
            title: "Reset the user password",
            where:
              "Entra admin center → Users → select user → Reset password (or force password change).",
          },
          {
            title: "Revoke sessions / sign out everywhere",
            where:
              "Entra admin center → Users → select user → Revoke sessions (or sign out).",
          },
          {
            title: "Force MFA / verify MFA methods",
            where:
              "Entra admin center → Users → Authentication methods → check/remove suspicious methods; Conditional Access to require MFA.",
          },
          {
            title: "Check mailbox for suspicious rules/forwarding",
            where:
              "Microsoft 365 admin center / Exchange admin center → Mailboxes → Mailbox rules/Forwarding; remove malicious rules.",
          },
          {
            title: "Hunt for related alerts",
            where:
              "Microsoft Defender portal → Incidents & alerts → Search by user/email; review impacted devices.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable/require MFA with Conditional Access",
            where:
              "Entra admin center → Protection → Conditional Access → Policies → Require MFA for all users (with exclusions for break-glass).",
          },
          {
            title: "Block legacy authentication",
            where:
              "Entra admin center → Conditional Access → Create policy → Client apps → Block legacy auth.",
          },
          {
            title: "Enable Safe Links / Safe Attachments (if licensed)",
            where:
              "Microsoft Defender portal → Email & collaboration → Policies & rules → Threat policies.",
          },
          {
            title: "Turn on SmartScreen + Network protection",
            where:
              "Intune admin center → Endpoint security → Attack surface reduction → Create policy (Microsoft Defender for Endpoint) → Network protection + SmartScreen settings.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee (What to tell them)",
        steps: [
          {
            title: "Tell them: Don’t enter passwords after clicking links",
            where:
              "Script: “If you clicked a link and it asks for login, STOP. Close it and call IT.”",
          },
          {
            title: "Teach 3 quick checks (sender, URL, urgency)",
            where:
              "Script: “Check sender domain, hover to see URL, and be suspicious of urgent threats.”",
          },
          {
            title: "Reporting flow",
            where:
              "Script: “Forward suspicious email to IT/SOC or use the Report button.”",
          },
        ],
      },
    ],
  },
  {
    id: "malware-download",
    title: "Malware Download",
    subtitle: "User downloads an infected file or installer",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate the device",
            where:
              "Microsoft Defender portal → Devices → select device → Take action → Isolate device.",
          },
          {
            title: "Run antivirus scan and collect evidence",
            where:
              "Defender portal → Device → Take action → Run antivirus scan; review alerts & timeline.",
          },
          {
            title: "Quarantine/remove the file",
            where:
              "Defender portal → Action center / Alerts → Quarantine; confirm remediation.",
          },
          {
            title: "Check if other devices downloaded the same file",
            where:
              "Defender portal → Advanced hunting (if available) / Search file hash; or Alerts → similar incidents.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable ASR rules for common malware techniques",
            where:
              "Intune admin center → Endpoint security → Attack surface reduction → Create policy → ASR rules.",
          },
          {
            title: "Use standard user accounts (no local admin)",
            where:
              "Intune admin center → Endpoint security → Account protection → Local user group membership.",
          },
          {
            title: "Control app installs (WDAC / App control strategy)",
            where:
              "Intune admin center → Endpoint security → Application control (or deploy WDAC policies if using).",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "No cracked software or unknown installers",
            where:
              "Script: “If it’s not from IT-approved sources, don’t install it.”",
          },
          {
            title: "If something was downloaded by mistake, report immediately",
            where:
              "Script: “Don’t try to fix it. Tell IT right away.”",
          },
        ],
      },
    ],
  },
  {
    id: "zero-day",
    title: "Zero‑Day Malware",
    subtitle: "Unknown file; no signature; detected by behavior/ML",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate device and stop spread",
            where:
              "Defender portal → Devices → select device → Isolate device.",
          },
          {
            title: "Investigate timeline & suspicious processes",
            where:
              "Defender portal → Device page → Timeline; review process tree + alerts.",
          },
          {
            title: "Contain indicators (block hash/URL/IP)",
            where:
              "Defender portal → Settings → Indicators → Add indicator (file hash / URL / IP) → Block.",
          },
          {
            title: "Patch + reimage if required",
            where:
              "Intune → Devices → Windows → Update rings / Feature updates; if compromised deeply, reimage device.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Cloud-delivered protection + Automatic sample submission",
            where:
              "Intune → Endpoint security → Antivirus (Defender) policy → Cloud protection + Sample submission.",
          },
          {
            title: "Turn on tamper protection",
            where:
              "Microsoft Defender portal → Settings → Endpoints → Advanced features → Tamper protection.",
          },
          {
            title: "Keep update compliance high",
            where:
              "Intune → Reports → Windows updates; enforce update rings / deadlines.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Explain why updates matter",
            where:
              "Script: “Updates close security holes. Don’t delay restart requests.”",
          },
        ],
      },
    ],
  },
  {
    id: "office-macro",
    title: "Office Macro Attack",
    subtitle: "Macro triggers PowerShell or downloads payload",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate impacted device",
            where:
              "Defender portal → Devices → select device → Isolate device.",
          },
          {
            title: "Locate the document and its source",
            where:
              "Defender portal → Device timeline → find Office process → identify file path + URL/email attachment.",
          },
          {
            title: "Quarantine attachment / block file hash",
            where:
              "Defender portal → Indicators → add file hash → Block; Email security → quarantine message if applicable.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Block macros from the internet",
            where:
              "Intune → Configuration profiles → Settings catalog → Microsoft Office/Administrative Templates → Block VBA macros from Internet.",
          },
          {
            title: "Enable ASR rule: Block Office child processes",
            where:
              "Intune → Endpoint security → Attack surface reduction → ASR rules → Block Office from creating child processes.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Never click “Enable Content/Enable Macros” for external files",
            where:
              "Script: “If a file asks to enable macros, close it and contact IT.”",
          },
        ],
      },
    ],
  },
  {
    id: "script-based",
    title: "Script‑Based Attack (PowerShell/WMI)",
    subtitle: "Abuse built-in tools to execute malicious commands",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate device",
            where:
              "Defender portal → Devices → Isolate device.",
          },
          {
            title: "Investigate process tree (PowerShell/WMI)",
            where:
              "Defender portal → Device timeline → check parent process (Office/browser/service).",
          },
          {
            title: "Block indicators (script, URL, IP)",
            where:
              "Defender portal → Indicators → add relevant IoCs and block.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Configure ASR rules to reduce script abuse",
            where:
              "Intune → Endpoint security → ASR rules (block credential stealing, block executable content from email/webmail, etc.).",
          },
          {
            title: "Limit local admin + restrict scripting where appropriate",
            where:
              "Intune → Account protection → Local user group membership; consider PowerShell Constrained Language Mode (advanced).",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Report unusual popups/terminal windows immediately",
            where:
              "Script: “If you see PowerShell/Command Prompt flash, notify IT.”",
          },
        ],
      },
    ],
  },
  {
    id: "credential-theft",
    title: "Credential Theft (LSASS dump)",
    subtitle: "Attacker tries to dump credentials from LSASS memory",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Disable/Reset compromised account + revoke sessions",
            where:
              "Entra admin center → Users → Disable sign-in / Reset password → Revoke sessions.",
          },
          {
            title: "Isolate device and investigate",
            where:
              "Defender portal → Devices → Isolate device; review timeline for dumping tools.",
          },
          {
            title: "Rotate privileged credentials (if admin exposed)",
            where:
              "If local admin creds may be exposed: rotate using LAPS; for cloud admin, change passwords & require MFA.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Credential Guard",
            where:
              "Intune → Endpoint security → Account protection / Device configuration → enable Windows Defender Credential Guard.",
          },
          {
            title: "Deploy LAPS (Windows LAPS)",
            where:
              "Intune → Endpoint security → Account protection → Local admin password solution (LAPS).",
          },
          {
            title: "Use phishing-resistant MFA / passwordless where possible",
            where:
              "Entra → Authentication methods → enable FIDO2 / WHfB; CA to require strong auth.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Never approve unexpected MFA prompts",
            where:
              "Script: “If you get an MFA prompt you didn’t trigger, deny it and call IT.”",
          },
        ],
      },
    ],
  },
  {
    id: "pass-the-hash",
    title: "Pass‑the‑Hash",
    subtitle: "Reuse stolen hashes to authenticate without the password",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Contain: isolate affected devices and disable suspicious accounts",
            where:
              "Defender portal → Devices → Isolate; Entra → Users → Disable sign-in.",
          },
          {
            title: "Review sign-in logs for lateral attempts",
            where:
              "Entra admin center → Sign-in logs → filter by user/device/IP; identify spread.",
          },
          {
            title: "Rotate local admin passwords",
            where:
              "Intune LAPS → rotate immediately; ensure unique local admin passwords per device.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Credential Guard + protect admin credentials",
            where:
              "Intune policies → Credential Guard; separate admin accounts (no daily use).",
          },
          {
            title: "Use LAPS + remove shared local admin",
            where:
              "Intune → LAPS policy; audit local admin group membership.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Admins: never browse/email with admin account",
            where:
              "Script for IT: “Use separate admin account only for admin tasks.”",
          },
        ],
      },
    ],
  },
  {
    id: "ransomware",
    title: "Ransomware",
    subtitle: "Encrypt files silently; demands payment",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate the device immediately",
            where:
              "Defender portal → Devices → Isolate device.",
          },
          {
            title: "Identify impact and stop encryption spread",
            where:
              "Defender portal → Incidents → view impacted devices/users; isolate any additional devices.",
          },
          {
            title: "Recover files from known-good backups",
            where:
              "Use your org backup solution; validate restore point before restoring.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Controlled folder access",
            where:
              "Intune → Endpoint security → Antivirus (Defender) policy → Controlled folder access.",
          },
          {
            title: "Enable ASR rules for ransomware techniques",
            where:
              "Intune → Endpoint security → ASR rules (block executable content from email/webmail; block persistence, etc.).",
          },
          {
            title: "Ensure backups are offline/immutable + tested",
            where:
              "Policy/process: run restore tests regularly; keep offline copies.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Don’t open unknown attachments or enable macros",
            where:
              "Script: “If you’re not expecting it, don’t open it—report it.”",
          },
        ],
      },
    ],
  },
  {
    id: "unknown-exe",
    title: "Unknown Executable",
    subtitle: "Portable malware runs / untrusted app execution",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Quarantine and block the executable",
            where:
              "Defender portal → Alerts/Action center → Quarantine; add file hash indicator to block.",
          },
          {
            title: "Isolate device if suspicious",
            where:
              "Defender portal → Devices → Isolate.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Implement Application Control (WDAC strategy)",
            where:
              "Intune → Endpoint security → Application control (or deploy WDAC policies).",
          },
          {
            title: "Use least privilege and restrict installs",
            where:
              "Intune → Account protection → remove local admin; require IT for installs.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Install only from Company Portal / approved sources",
            where:
              "Script: “Request apps through IT/Company Portal only.”",
          },
        ],
      },
    ],
  },
  {
    id: "browser-exploit",
    title: "Browser Exploit",
    subtitle: "Malicious website attacks the browser",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Close the session, scan device, review browser extensions",
            where:
              "Defender portal → run scan; on device check browser extensions; remove suspicious add-ons.",
          },
          {
            title: "Check web activity indicator/URL",
            where:
              "Defender portal → Alerts/Timeline → find URL; block indicator if needed.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Application Guard (where supported)",
            where:
              "Intune → Endpoint security / Device configuration → enable Microsoft Defender Application Guard.",
          },
          {
            title: "Enforce browser updates and hardening",
            where:
              "Intune → Update rings; Configuration profiles for Edge security settings.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Avoid risky sites on work devices",
            where:
              "Script: “Use work devices for work sites only; report suspicious popups.”",
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "Command & Control (C2)",
    subtitle: "Device calls attacker server for instructions",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate device and block destination",
            where:
              "Defender portal → Devices → Isolate; Settings → Indicators → block IP/URL/domain.",
          },
          {
            title: "Investigate root cause (initial entry)",
            where:
              "Defender portal → Incident graph → identify patient zero; check email/web downloads.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Network protection and web filtering",
            where:
              "Intune → Endpoint security → ASR/Defender policies → Network protection; configure web content filtering if available.",
          },
          {
            title: "Harden endpoints (ASR + least privilege)",
            where:
              "Intune → ASR rules; remove local admin.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Report unusual slowdowns/popups immediately",
            where:
              "Script: “If device behaves weird, stop work and contact IT.”",
          },
        ],
      },
    ],
  },
  {
    id: "lateral-movement",
    title: "Lateral Movement",
    subtitle: "Attacker spreads inside the network",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Isolate impacted devices and disable compromised accounts",
            where:
              "Defender portal → Isolate devices; Entra → disable sign-in for suspicious accounts.",
          },
          {
            title: "Review sign-in logs + device timeline for spread",
            where:
              "Entra → Sign-in logs; Defender → Incident graph/timeline.",
          },
          {
            title: "Contain admin pathways",
            where:
              "Remove shared local admin; rotate passwords (LAPS); restrict admin logons.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Deploy LAPS + separate admin accounts",
            where:
              "Intune → LAPS; create admin accounts used only for admin tasks.",
          },
          {
            title: "Enforce Conditional Access + compliance",
            where:
              "Entra → Conditional Access → require compliant device + MFA for sensitive apps.",
          },
          {
            title: "Strengthen endpoint controls (Credential Guard + ASR)",
            where:
              "Intune → enable Credential Guard; ASR rules.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Basic guidance: report quickly; don’t “try fixes”",
            where:
              "Script: “If something looks off, tell IT immediately.”",
          },
        ],
      },
    ],
  },
  {
    id: "priv-esc",
    title: "Privilege Escalation",
    subtitle: "Attacker gains admin rights (user → admin)",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Remove unexpected admin membership",
            where:
              "Intune → Account protection (local groups) or on device → remove user from local Administrators.",
          },
          {
            title: "Investigate how admin rights were obtained",
            where:
              "Defender portal → Device timeline → look for UAC bypass, service creation, scheduled tasks.",
          },
          {
            title: "Reset credentials and review privileged sign-ins",
            where:
              "Entra → Sign-in logs; reset affected accounts; enforce MFA.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Implement Least Privilege + separate admin accounts",
            where:
              "Policy: everyday accounts are standard users; admin accounts used only when needed.",
          },
          {
            title: "Use PIM (if available) for privileged roles",
            where:
              "Entra → Privileged Identity Management → make admin roles JIT (just-in-time).",
          },
          {
            title: "Deploy LAPS and lock down local admin",
            where:
              "Intune → LAPS; ensure no shared local admin credentials.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Employees should not request admin installs casually",
            where:
              "Script: “Request apps through IT; never bypass security prompts.”",
          },
        ],
      },
    ],
  },
  // Additional playbooks (data exfiltration, USB malware, boot-level malware, stolen laptop, unpatched vuln, suspicious behavior, APT)
  {
    id: "data-exfiltration",
    title: "Data Exfiltration",
    subtitle: "Sending company data outside (email/personal cloud/USB)",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Disable account or block sharing temporarily (if required)",
            where:
              "Entra → Users → Disable sign-in; M365/SharePoint admin → stop external sharing if actively leaking.",
          },
          {
            title: "Review audit logs for what was shared and where",
            where:
              "Microsoft Purview / M365 compliance (if available) → Audit; review SharePoint/OneDrive sharing events.",
          },
          {
            title: "Contain device if malware-related",
            where:
              "Defender portal → Isolate device if exfiltration linked to compromise.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Deploy DLP policies (if available)",
            where:
              "Microsoft Purview → Data loss prevention → Policies (block sharing of sensitive info).",
          },
          {
            title: "Use sensitivity labels + restrictions",
            where:
              "Purview → Information protection → Labels; enforce encryption/permissions.",
          },
          {
            title: "Limit external sharing",
            where:
              "SharePoint admin center → Policies → Sharing; restrict anonymous links.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Explain: no sending company data to personal email/cloud",
            where:
              "Script: “Use approved tools only (OneDrive/SharePoint/Teams). Personal Gmail/WhatsApp is not allowed.”",
          },
        ],
      },
    ],
  },
  {
    id: "usb-malware",
    title: "USB Malware",
    subtitle: "Infected removable drive introduced to endpoint",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Disconnect USB and scan device",
            where:
              "User action: remove USB; Defender portal → run scan; review alerts.",
          },
          {
            title: "Isolate device if suspicious activity",
            where:
              "Defender portal → Devices → Isolate.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Block or restrict removable storage",
            where:
              "Intune → Configuration profiles → Settings catalog → Device restrictions → Removable storage access.",
          },
          {
            title: "Disable AutoRun/AutoPlay for removable media",
            where:
              "Intune → Settings catalog → AutoPlay/AutoRun policies.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "No unknown USB drives",
            where:
              "Script: “Only use company-approved encrypted USB drives.”",
          },
        ],
      },
    ],
  },
  {
    id: "boot-level",
    title: "Boot‑Level Malware",
    subtitle: "Rootkit before OS loads / bootkits",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Take device offline; reimage if needed",
            where:
              "Containment: remove from network; rebuild from clean image if integrity is uncertain.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enable Secure Boot + TPM",
            where:
              "BIOS/UEFI settings (device side) + compliance checks via Intune device compliance.",
          },
          {
            title: "Enable BitLocker",
            where:
              "Intune → Endpoint security → Disk encryption → BitLocker policy.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Do not bypass security boot prompts",
            where:
              "Script: “If device shows unusual boot warnings, stop and contact IT.”",
          },
        ],
      },
    ],
  },
  {
    id: "stolen-laptop",
    title: "Stolen Laptop",
    subtitle: "Offline data access risk",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Remote wipe / retire the device",
            where:
              "Intune admin center → Devices → select device → Wipe (or Retire for BYOD).",
          },
          {
            title: "Disable device + reset user credentials",
            where:
              "Entra → Devices → disable device; Entra → Users → reset password + revoke sessions.",
          },
          {
            title: "Review sign-ins after theft time",
            where:
              "Entra → Sign-in logs → look for unusual locations/IPs.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Enforce BitLocker with key escrow",
            where:
              "Intune → Disk encryption → BitLocker; ensure recovery keys stored in Entra.",
          },
          {
            title: "Require device compliance for access",
            where:
              "Entra → Conditional Access → require compliant device for M365 apps.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Report loss immediately",
            where:
              "Script: “If lost/stolen, call IT within 10 minutes so we can wipe.”",
          },
        ],
      },
    ],
  },
  {
    id: "unpatched",
    title: "Unpatched Vulnerability",
    subtitle: "Exploit old software/OS",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Patch urgently + isolate if exploitation is active",
            where:
              "Intune → Windows updates → deploy urgent updates; Defender → isolate compromised devices.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Use update rings + deadlines",
            where:
              "Intune → Windows updates → Update rings → set deadlines and restart behavior.",
          },
          {
            title: "Track update compliance",
            where:
              "Intune → Reports → Windows updates; remediate non-compliant devices.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Don’t postpone restarts indefinitely",
            where:
              "Script: “Restart requests are security requirements, not optional.”",
          },
        ],
      },
    ],
  },
  {
    id: "suspicious-behavior",
    title: "Suspicious Behavior",
    subtitle: "File acts abnormally; behavior-based alerts",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Triage the alert and isolate if needed",
            where:
              "Defender portal → Alerts → review; Devices → isolate if high severity.",
          },
          {
            title: "Run investigation/scan",
            where:
              "Defender portal → Automated investigation (if available) or run antivirus scan.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Turn on Defender protections (cloud, tamper, ASR)",
            where:
              "Intune/Defender settings → ensure cloud protection, tamper protection, ASR rules are enabled.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Report unusual device behavior quickly",
            where:
              "Script: “Popups/slowdowns/unknown apps = report to IT immediately.”",
          },
        ],
      },
    ],
  },
  {
    id: "apt",
    title: "Advanced Persistent Threat (APT)",
    subtitle: "Stealth long-term attack",
    sections: [
      {
        key: "stop",
        title: "🚨 Stop it now",
        steps: [
          {
            title: "Escalate to incident response + contain affected assets",
            where:
              "Process step: declare incident; Defender → isolate; Entra → disable accounts; preserve evidence.",
          },
          {
            title: "Review identity + cloud activity",
            where:
              "Entra → sign-in logs + risky sign-ins; Defender → incidents across endpoints.",
          },
        ],
      },
      {
        key: "prevent",
        title: "🛡 Prevent next time",
        steps: [
          {
            title: "Adopt Zero Trust: MFA + compliant devices + least privilege",
            where:
              "Entra → Conditional Access; Intune compliance; remove standing admin; use PIM.",
          },
          {
            title: "Strengthen monitoring & hunting",
            where:
              "Defender portal → set alerting, integrate SIEM if used; schedule threat hunts.",
          },
        ],
      },
      {
        key: "train",
        title: "👨‍🏫 Train the employee",
        steps: [
          {
            title: "Security awareness program + regular phishing simulations",
            where:
              "Process: quarterly training; track completion; simulate phishing and coach users.",
          },
        ],
      },
    ],
  },
];


export default function MDETab() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Microsoft Defender for Endpoint</h1>
        <p className="mt-1 text-sm text-gray-600">
          Quick reference for incident response flows that often appear in MD-102-style scenarios.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Core workflows you use most">
          <ul className="list-disc ml-6 space-y-1">
            <li><b>Isolate device</b> (contain spread)</li>
            <li><b>Run antivirus scan</b> (quick triage)</li>
            <li><b>Device timeline</b> (root cause)</li>
            <li><b>Indicators</b> (block hash / URL / IP)</li>
            <li><b>Incident view</b> (scope + impacted users/devices)</li>
          </ul>
        </Card>

        <Card title="Real scenario (interview style)">
          <div className="space-y-2">
            <div className="font-semibold text-gray-900">User clicked malware link → device shows alerts</div>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Defender portal → Devices → <b>Isolate device</b></li>
              <li>Open Incident → confirm other impacted endpoints</li>
              <li>Device timeline → identify initial process (browser/office)</li>
              <li>Add Indicators → block IoCs</li>
              <li>Validate remediation + release device when clean</li>
            </ol>
          </div>
        </Card>
      </div>

      <Card title="Good practice (enterprise)">
        <ul className="list-disc ml-6 space-y-1">
          <li>Keep update compliance high (reduces exploit success)</li>
          <li>Use ASR rules (block common techniques)</li>
          <li>Least privilege + LAPS (limits lateral movement)</li>
          <li>Conditional Access: require compliant device + MFA for sensitive apps</li>
        </ul>
      </Card>
    </div>
  );
}

