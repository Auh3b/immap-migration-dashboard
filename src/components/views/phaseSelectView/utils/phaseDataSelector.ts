type Phase = number;
type PhaseData<T = unknown> = Record<Phase, T>;

export default function phaseDataSelector<T = unknown>(
  phase: Phase,
  data: PhaseData<T>,
): unknown | null {
  return phase ? data[phase] : null;
}
