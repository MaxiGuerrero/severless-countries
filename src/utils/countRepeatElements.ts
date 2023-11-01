export function countElementRepeat(arr: any[], labels: string[]) {
  if (arr.length === 0) {
    return arr;
  }
  const count = {};
  labels.forEach((l) => (count[l] = 0));
  for (let e of arr) {
    if (count[e]) {
      count[e]++;
    } else {
      count[e] = 1;
    }
  }
  const amount: number[] = Object.values(count);
  return amount;
}
