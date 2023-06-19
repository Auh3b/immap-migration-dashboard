export interface Values {
  name: string;
  start: number;
  end: number;
  intervalValue: number;
  children?: Record<string, Values>;
}
