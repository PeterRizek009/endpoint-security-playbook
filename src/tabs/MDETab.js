

import { playbooks } from "../data/playbooks";
import Card from "../Cards/Card";



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

