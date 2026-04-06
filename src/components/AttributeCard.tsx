import { useState } from 'react'
import type { AttributeResult } from '../engine/scoring'

const SCORE_COLORS: Record<string, string> = {
  'No Signal': 'bg-gray-100 border-gray-300 text-gray-600',
  'Not Public': 'bg-green-50 border-green-400 text-green-800',
  'Confidential': 'bg-yellow-50 border-yellow-400 text-yellow-800',
  'Strictly Confidential': 'bg-orange-50 border-orange-400 text-orange-800',
  'Secret': 'bg-red-50 border-red-400 text-red-800',
}

const DOT_COLORS: Record<string, string> = {
  'No Signal': 'bg-gray-400',
  'Not Public': 'bg-green-500',
  'Confidential': 'bg-yellow-500',
  'Strictly Confidential': 'bg-orange-500',
  'Secret': 'bg-red-500',
}

interface Props {
  result: AttributeResult
  isActive: boolean
  onOverride: (id: number, value: number) => void
}

export default function AttributeCard({ result, isActive, onOverride }: Props) {
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState(result.signalScore.toString())

  const colorClass = isActive ? (SCORE_COLORS[result.iclLevel] || SCORE_COLORS['No Signal']) : 'bg-gray-50 border-gray-200 text-gray-400'
  const dotColor = isActive ? (DOT_COLORS[result.iclLevel] || DOT_COLORS['No Signal']) : 'bg-gray-300'

  const handleSubmit = () => {
    const val = parseFloat(inputVal)
    if (!isNaN(val) && val >= 0 && val <= 1) {
      onOverride(result.id, val)
    }
    setEditing(false)
  }

  return (
    <div className={`rounded-lg border-2 p-4 transition-all duration-300 ${colorClass} ${!isActive ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${dotColor}`} />
          <h3 className="font-semibold text-sm">{result.name}</h3>
        </div>
        <span className="text-xs font-mono bg-white/60 px-2 py-0.5 rounded">
          w = {result.weight.toFixed(2)}
        </span>
      </div>

      {isActive && (
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Signal Score:</span>
            {editing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-16 px-1 py-0.5 border rounded text-center text-sm"
                  autoFocus
                  onBlur={handleSubmit}
                />
              </form>
            ) : (
              <button
                onClick={() => { setInputVal(result.signalScore.toString()); setEditing(true) }}
                className="font-bold text-lg hover:underline cursor-pointer"
                title="Click to override"
              >
                {result.signalScore.toFixed(1)}
                {result.isOverridden && <span className="text-xs ml-1 text-blue-600">(override)</span>}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">ICL Level:</span>
            <span className="font-medium">{result.iclLevel}</span>
          </div>

          {result.matchedPhrase && (
            <div className="text-xs text-gray-500 mt-1">
              <span className="font-medium">Matched:</span>{' '}
              <span className="italic">"{result.matchedPhrase}"</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm pt-2 border-t border-current/10">
            <span className="text-gray-600">Weighted Contribution:</span>
            <span className="font-mono font-bold">{result.weightedContribution.toFixed(4)}</span>
          </div>
        </div>
      )}

      {!isActive && (
        <div className="text-xs text-gray-400 mt-2 italic">Pending...</div>
      )}
    </div>
  )
}
