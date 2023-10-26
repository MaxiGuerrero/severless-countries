export function countElementRepeat(arr: any[]) {
  const count = {};
  for (const e of arr) {
    if (count[e]) {
      count[e]++;
    } else {
      count[e] = 1;
    }
  }
  const amount: number[] = Object.values(count);
  return amount;
}
