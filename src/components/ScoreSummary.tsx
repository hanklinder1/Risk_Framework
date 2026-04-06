import type { ScoringResult } from '../engine/scoring'

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-600',
}

const BORDER_MAP: Record<string, string> = {
  green: 'border-green-500',
  yellow: 'border-yellow-500',
  orange: 'border-orange-500',
  red: 'border-red-600',
}

const TEXT_MAP: Record<string, string> = {
  green: 'text-green-700',
  yellow: 'text-yellow-700',
  orange: 'text-orange-700',
  red: 'text-red-700',
}

interface Props {
  result: ScoringResult
  isRunning: boolean
  isComplete: boolean
  activeCount: number
}

export default function ScoreSummary({ result, isRunning, isComplete, activeCount }: Props) {
  const icl = result.finalICL
  const colorBg = COLOR_MAP[icl.color] || 'bg-gray-400'
  const borderColor = BORDER_MAP[icl.color] || 'border-gray-400'
  const textColor = TEXT_MAP[icl.color] || 'text-gray-700'

  return (
    <div className={`rounded-xl border-2 ${borderColor} bg-white p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500 font-medium">
            {isComplete ? 'Final Risk Score' : isRunning ? `Running Total (${activeCount}/6 attributes)` : 'Awaiting VSS Input'}
          </div>
          <div className={`text-5xl font-bold mt-1 ${textColor}`}>
            {result.finalScore.toFixed(1)}
          </div>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${colorBg} text-white font-bold text-lg`}>
            {icl.name}
          </div>
          <div className="text-sm text-gray-500 mt-2">{icl.damage}</div>
          <div className="text-sm text-gray-500">{icl.protection}</div>
        </div>
      </div>

      {result.maximumPrincipleTriggered && (
        <div className="mt-3 px-4 py-2 bg-red-50 border border-red-300 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-sm font-bold text-red-700">Maximum Principle Triggered</span>
          </div>
          <div className="text-xs text-red-600 mt-1">
            ICL escalated from <strong>{result.baseICL.name}</strong> to <strong>{result.finalICL.name}</strong>.
            Triggered by: {result.maximumPrincipleAttributes.join(', ')}.
          </div>
        </div>
      )}

      {result.escalationFlags.some(f => f.fired && f.confirmed === true) && (
        <div className="mt-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
          <strong>Escalation Flag(s) Confirmed</strong> — immediate escalation required per BMW ICL process.
        </div>
      )}
    </div>
  )
}
