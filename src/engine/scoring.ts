import { ATTRIBUTES, ESCALATION_FLAGS, ICL_LEVELS, type AttributeDefinition, type EscalationFlagDefinition } from '../data/keywords'

export interface AttributeResult {
  id: number
  name: string
  weight: number
  signalScore: number
  matchedPhrase: string | null
  iclLevel: string
  weightedContribution: number
  isOverridden: boolean
}

export interface EscalationFlagResult {
  id: string
  name: string
  fired: boolean
  matchedPhrase: string | null
  matchedLevel: string | null
  confirmed: boolean | null // null = not yet confirmed, true = confirmed, false = denied
}

export interface ScoringResult {
  attributes: AttributeResult[]
  rawScore: number
  finalScore: number
  baseICL: typeof ICL_LEVELS[number]
  finalICL: typeof ICL_LEVELS[number]
  maximumPrincipleTriggered: boolean
  maximumPrincipleAttributes: string[]
  escalationFlags: EscalationFlagResult[]
}

function scanForAttribute(text: string, attr: AttributeDefinition): { score: number; phrase: string | null; iclLevel: string } {
  const lowerText = text.toLowerCase()
  // Scan from highest score downward
  for (const band of attr.keywords) {
    for (const phrase of band.phrases) {
      if (lowerText.includes(phrase.toLowerCase())) {
        return { score: band.score, phrase, iclLevel: band.iclLevel }
      }
    }
  }
  return { score: 0.0, phrase: null, iclLevel: 'No Signal' }
}

function scanForEscalationFlag(text: string, flag: EscalationFlagDefinition): { fired: boolean; phrase: string | null; level: string | null } {
  const lowerText = text.toLowerCase()
  for (const category of flag.categories) {
    for (const phrase of category.phrases) {
      if (lowerText.includes(phrase.toLowerCase())) {
        return { fired: true, phrase, level: category.level }
      }
    }
  }
  return { fired: false, phrase: null, level: null }
}

export function getICLLevel(score: number): typeof ICL_LEVELS[number] {
  const rounded = Math.round(score)
  for (const level of ICL_LEVELS) {
    if (rounded >= level.min && rounded <= level.max) return level
  }
  return ICL_LEVELS[ICL_LEVELS.length - 1]
}

export function escalateICL(current: typeof ICL_LEVELS[number]): typeof ICL_LEVELS[number] {
  const idx = ICL_LEVELS.findIndex(l => l.name === current.name)
  if (idx < ICL_LEVELS.length - 1) return ICL_LEVELS[idx + 1]
  return current // already Secret
}

export function scoreText(text: string, overrides?: Map<number, number>): ScoringResult {
  const attributes: AttributeResult[] = ATTRIBUTES.map(attr => {
    const { score, phrase, iclLevel } = scanForAttribute(text, attr)
    const overriddenScore = overrides?.get(attr.id)
    const finalScore = overriddenScore !== undefined ? overriddenScore : score
    return {
      id: attr.id,
      name: attr.name,
      weight: attr.weight,
      signalScore: finalScore,
      matchedPhrase: phrase,
      iclLevel: overriddenScore !== undefined ? getICLLevelForSignal(overriddenScore) : iclLevel,
      weightedContribution: finalScore * attr.weight,
      isOverridden: overriddenScore !== undefined,
    }
  })

  const rawSum = attributes.reduce((sum, a) => sum + a.weightedContribution, 0)
  const rawScore = Math.round(rawSum * 1000) / 10 // round to 1 decimal: 100 * sum

  const baseICL = getICLLevel(rawScore)

  // Maximum principle check
  const maxPrincipleAttrs = attributes.filter(a => a.signalScore >= 0.85)
  const maximumPrincipleTriggered = maxPrincipleAttrs.length > 0
  const finalICL = maximumPrincipleTriggered ? escalateICL(baseICL) : baseICL

  // Escalation flags
  const escalationFlags: EscalationFlagResult[] = ESCALATION_FLAGS.map(flag => {
    const result = scanForEscalationFlag(text, flag)
    return {
      id: flag.id,
      name: flag.name,
      fired: result.fired,
      matchedPhrase: result.phrase,
      matchedLevel: result.level,
      confirmed: null,
    }
  })

  return {
    attributes,
    rawScore,
    finalScore: rawScore,
    baseICL,
    finalICL,
    maximumPrincipleTriggered,
    maximumPrincipleAttributes: maxPrincipleAttrs.map(a => a.name),
    escalationFlags,
  }
}

function getICLLevelForSignal(score: number): string {
  if (score >= 1.0) return 'Secret'
  if (score >= 0.8) return 'Strictly Confidential'
  if (score >= 0.5) return 'Confidential'
  if (score >= 0.2) return 'Not Public'
  return 'No Signal'
}
