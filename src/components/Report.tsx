import type { ScoringResult } from '../engine/scoring'

interface Props {
  result: ScoringResult
}

export default function Report({ result }: Props) {
  const icl = result.finalICL
  const allFlagsHandled = result.escalationFlags.filter(f => f.fired).every(f => f.confirmed !== null)

  if (!allFlagsHandled && result.escalationFlags.some(f => f.fired)) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 text-center text-yellow-800">
        <strong>Report pending:</strong> Please confirm or deny all escalation flags above before the report is generated.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-200">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-800 text-white rounded-t-xl">
        <h2 className="text-lg font-bold">BMW Risk Assessment Report</h2>
        <p className="text-sm text-gray-300 mt-1">Structured pre-screening input for BMW ICL Process</p>
      </div>

      {/* Section 1: Classification Summary */}
      <div className="px-6 py-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3">Section 1 — Classification Summary</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="text-gray-600">Final Risk Score</div>
          <div className="font-bold">{result.finalScore.toFixed(1)}</div>
          <div className="text-gray-600">Base ICL Level</div>
          <div className="font-medium">{result.baseICL.name}</div>
          {result.maximumPrincipleTriggered && (
            <>
              <div className="text-gray-600">Adjusted ICL Level</div>
              <div className="font-bold text-red-600">{result.finalICL.name} (escalated)</div>
            </>
          )}
          <div className="text-gray-600">Damage Potential</div>
          <div className="font-medium">{icl.damage}</div>
          <div className="text-gray-600">Protection Class</div>
          <div className="font-medium">{icl.protection}</div>
          <div className="text-gray-600">Maximum Principle</div>
          <div className={result.maximumPrincipleTriggered ? 'text-red-600 font-bold' : 'text-green-600'}>
            {result.maximumPrincipleTriggered ? 'Triggered' : 'Not triggered'}
          </div>
          {result.escalationFlags.filter(f => f.fired && f.confirmed).map(f => (
            <div key={f.id} className="col-span-2 text-red-600 font-medium">
              Escalation Flag: {f.name} — CONFIRMED ({f.matchedLevel}: "{f.matchedPhrase}")
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Observed Signals */}
      <div className="px-6 py-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3">Section 2 — Observed Signals</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2 font-medium">Attribute</th>
              <th className="pb-2 font-medium text-center">Weight</th>
              <th className="pb-2 font-medium text-center">Signal</th>
              <th className="pb-2 font-medium text-center">Weighted</th>
              <th className="pb-2 font-medium">Matched Phrase</th>
              <th className="pb-2 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {result.attributes.map(attr => (
              <tr key={attr.id} className={`border-b last:border-0 ${attr.signalScore >= 0.85 ? 'bg-red-50' : ''}`}>
                <td className="py-2 font-medium">{attr.name}</td>
                <td className="py-2 text-center font-mono">{attr.weight.toFixed(2)}</td>
                <td className="py-2 text-center font-mono font-bold">{attr.signalScore.toFixed(1)}</td>
                <td className="py-2 text-center font-mono">{attr.weightedContribution.toFixed(4)}</td>
                <td className="py-2 text-gray-500 italic text-xs">{attr.matchedPhrase ? `"${attr.matchedPhrase}"` : '—'}</td>
                <td className="py-2 text-center">
                  {attr.signalScore >= 0.85 ? (
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">CRITICAL</span>
                  ) : (
                    <span className="text-xs text-gray-500">{attr.iclLevel}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Escalation Flags */}
      <div className="px-6 py-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3">Section 3 — Escalation Flags</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Maximum Principle: </strong>
            {result.maximumPrincipleTriggered ? (
              <span className="text-red-600">
                Triggered — attribute(s): {result.maximumPrincipleAttributes.join(', ')}.
                ICL escalated from {result.baseICL.name} to {result.finalICL.name}.
              </span>
            ) : (
              <span className="text-green-600">Not triggered. No individual signal score reached 0.85.</span>
            )}
          </div>
          {result.escalationFlags.map(flag => (
            <div key={flag.id}>
              <strong>{flag.name}: </strong>
              {flag.fired ? (
                <span className={flag.confirmed ? 'text-red-600' : 'text-gray-600'}>
                  Detected ({flag.matchedLevel}: "{flag.matchedPhrase}") —{' '}
                  {flag.confirmed === true
                    ? 'CONFIRMED by analyst. Immediate escalation required.'
                    : flag.confirmed === false
                      ? 'DENIED by analyst.'
                      : 'Awaiting analyst confirmation.'}
                </span>
              ) : (
                <span className="text-green-600">Not detected.</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Recommendation */}
      <div className="px-6 py-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3">Section 4 — Recommendation</h3>
        <div className="text-sm space-y-3 text-gray-700">
          <p>
            This report is a <strong>structured pre-screening input</strong> for BMW's Information Classification
            and Labeling (ICL) process. The suggested classification level of <strong>{icl.name}</strong> should
            be reviewed and confirmed by a qualified BMW risk analyst. Final authority rests with the designated
            Information Owner.
          </p>
          <div>
            <strong>Required Protection Measures ({icl.name}):</strong>
            <p className="mt-1 text-gray-600">{icl.measures}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 rounded-b-xl text-xs text-gray-400 text-center">
        BMW x Clemson Data Valuation Project · Risk Team · April 2026 · Confidential
      </div>
    </div>
  )
}
