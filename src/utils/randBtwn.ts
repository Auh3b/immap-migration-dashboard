export default function randBtwn(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
