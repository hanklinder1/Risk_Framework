import type { EscalationFlagResult } from '../engine/scoring'

interface Props {
  flag: EscalationFlagResult
  onConfirm: (id: string, confirmed: boolean) => void
}

export default function EscalationBanner({ flag, onConfirm }: Props) {
  if (!flag.fired) return null

  return (
    <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg mb-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <div className="font-bold text-sm uppercase tracking-wide">
              ESCALATION FLAG: {flag.name}
            </div>
            <div className="text-sm mt-0.5 opacity-90">
              {flag.matchedLevel && <span className="font-medium">[{flag.matchedLevel}] </span>}
              Detected: "{flag.matchedPhrase}"
            </div>
            <div className="text-xs mt-1 opacity-75">
              Analyst confirmation required before final report generation.
            </div>
          </div>
        </div>

        {flag.confirmed === null && (
          <div className="flex gap-2 shrink-0 ml-4">
            <button
              onClick={() => onConfirm(flag.id, true)}
              className="px-3 py-1.5 bg-white text-red-700 rounded font-semibold text-sm hover:bg-red-50 cursor-pointer"
            >
              Confirm
            </button>
            <button
              onClick={() => onConfirm(flag.id, false)}
              className="px-3 py-1.5 bg-red-800 text-white rounded font-semibold text-sm hover:bg-red-900 cursor-pointer"
            >
              Deny
            </button>
          </div>
        )}

        {flag.confirmed === true && (
          <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded">CONFIRMED</span>
        )}
        {flag.confirmed === false && (
          <span className="text-sm font-bold bg-green-600 px-3 py-1 rounded">DENIED</span>
        )}
      </div>
    </div>
  )
}
