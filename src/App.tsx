import { useState, useCallback, useRef, useEffect } from 'react'
import { scoreText, type ScoringResult, type EscalationFlagResult } from './engine/scoring'
import AttributeCard from './components/AttributeCard'
import EscalationBanner from './components/EscalationBanner'
import ScoreSummary from './components/ScoreSummary'
import Report from './components/Report'

const DEMO_SCENARIOS = [
  {
    name: 'Validation Example (expect 59.0)',
    text: 'A red forklift enters the frame carrying stacked boxes while a worker manually places boxes on a shelf. Another worker measures the distance between two shelving units and places caution tape across the aisle. The two workers stand together inspecting the area and recording notes on a clipboard.',
  },
  {
    name: 'Scenario 1 — Low Risk',
    text: 'An automated conveyor belt moves sealed boxes through an empty aisle. No workers are visible. No human activity. The area is clear with standard industrial equipment running autonomously.',
  },
  {
    name: 'Scenario 2 — Moderate Risk',
    text: 'Two workers in a general assembly area. One uses a measuring tape while the other records on a clipboard. Workers stand side by side reviewing the same item. Standard industrial equipment visible including a forklift and conveyor belt. Worker follows procedure with step-by-step actions.',
  },
  {
    name: 'Scenario 3 — High Risk',
    text: 'Multiple workers and suited visitors on a busy final assembly line. A worker demonstrates a proprietary calibration process to the visitors using custom BMW fixtures. Guided tour in progress with external consultant on floor. Multiple parallel assembly steps visible simultaneously. BMW-specific tooling visible. Full crew visible with hands-on demonstration. Supervisor demonstrating technique with shoulder to shoulder instruction. Complete assembly sequence observable end-to-end.',
  },
]

export default function App() {
  const [vssText, setVssText] = useState('')
  const [result, setResult] = useState<ScoringResult | null>(null)
  const [overrides, setOverrides] = useState<Map<number, number>>(new Map())
  const [activeAttributes, setActiveAttributes] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [escalationFlags, setEscalationFlags] = useState<EscalationFlagResult[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(t => clearTimeout(t))
    timerRef.current = []
  }, [])

  const runScoring = useCallback((text: string) => {
    clearTimers()
    setOverrides(new Map())
    setIsComplete(false)
    setIsRunning(true)
    setActiveAttributes(0)

    const scoringResult = scoreText(text)
    setResult(scoringResult)
    setEscalationFlags(scoringResult.escalationFlags)

    // Animate attributes appearing one by one
    for (let i = 0; i < 6; i++) {
      const timer = setTimeout(() => {
        setActiveAttributes(i + 1)
        if (i === 5) {
          setIsComplete(true)
          setIsRunning(false)
        }
      }, (i + 1) * 400)
      timerRef.current.push(timer)
    }
  }, [clearTimers])

  const handleOverride = useCallback((id: number, value: number) => {
    setOverrides(prev => {
      const next = new Map(prev)
      next.set(id, value)
      return next
    })
  }, [])

  // Recalculate when overrides change
  useEffect(() => {
    if (vssText && overrides.size > 0) {
      const newResult = scoreText(vssText, overrides)
      // Preserve escalation flag confirmations
      newResult.escalationFlags = newResult.escalationFlags.map(f => {
        const existing = escalationFlags.find(ef => ef.id === f.id)
        return existing ? { ...f, confirmed: existing.confirmed } : f
      })
      setResult(newResult)
    }
  }, [overrides, vssText, escalationFlags])

  const handleFlagConfirm = useCallback((flagId: string, confirmed: boolean) => {
    setEscalationFlags(prev =>
      prev.map(f => f.id === flagId ? { ...f, confirmed } : f)
    )
  }, [])

  const handleSubmit = () => {
    if (!vssText.trim()) return
    runScoring(vssText.trim())
  }

  const handleDemo = (text: string) => {
    setVssText(text)
    runScoring(text)
  }

  const handleReset = () => {
    clearTimers()
    setVssText('')
    setResult(null)
    setOverrides(new Map())
    setActiveAttributes(0)
    setIsRunning(false)
    setIsComplete(false)
    setEscalationFlags([])
  }

  // Build partial result for running total display
  const displayResult = result
    ? {
        ...result,
        escalationFlags,
        finalScore: isComplete
          ? result.finalScore
          : Math.round(
              result.attributes
                .slice(0, activeAttributes)
                .reduce((sum, a) => sum + a.weightedContribution, 0) * 1000
            ) / 10,
      }
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Risk Framework Tab</h1>
              <p className="text-sm text-gray-400 mt-0.5">BMW x Clemson VSS · Data Valuation Project</p>
            </div>
            <div className="flex items-center gap-3">
              {result && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
              <div className="text-xs text-gray-500">Confidential</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Input Section */}
        {!result && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-lg mb-1">VSS Text Input</h2>
            <p className="text-sm text-gray-500 mb-4">
              Paste the VSS scene description below, or select a demo scenario to test the scoring engine.
            </p>

            <textarea
              value={vssText}
              onChange={(e) => setVssText(e.target.value)}
              placeholder="Enter VSS text output here..."
              className="w-full h-36 px-4 py-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleSubmit}
                disabled={!vssText.trim()}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Score VSS Text
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Demo Scenarios</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_SCENARIOS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleDemo(s.text)}
                    className="text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm cursor-pointer"
                  >
                    <div className="font-medium text-gray-800">{s.name}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{s.text}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VSS Text Display when active */}
        {result && (
          <details className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
              VSS Input Text
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-700 whitespace-pre-wrap">{vssText}</div>
          </details>
        )}

        {/* Escalation Flags */}
        {escalationFlags.filter(f => f.fired).map(flag => (
          <EscalationBanner key={flag.id} flag={flag} onConfirm={handleFlagConfirm} />
        ))}

        {/* Score Summary */}
        {displayResult && (
          <ScoreSummary
            result={displayResult}
            isRunning={isRunning}
            isComplete={isComplete}
            activeCount={activeAttributes}
          />
        )}

        {/* Attribute Cards */}
        {result && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3">
              Attribute Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.attributes.map((attr, i) => (
                <AttributeCard
                  key={attr.id}
                  result={attr}
                  isActive={i < activeAttributes}
                  onOverride={handleOverride}
                />
              ))}
            </div>
          </div>
        )}

        {/* Report */}
        {isComplete && result && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-3 mt-8">
              BMW Risk Assessment Report
            </h2>
            <Report result={{ ...result, escalationFlags }} />
          </div>
        )}

        {/* Waiting state */}
        {!result && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-sm">Enter VSS text or select a demo scenario to begin risk scoring.</p>
          </div>
        )}
      </main>
    </div>
  )
}
