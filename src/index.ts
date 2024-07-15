const primeFactorsOf = (n: number): Record<number, number> => {
  const factorToPower: Record<number, number> = {};
  let remaining = n;
  let divisor = 2;

  while (remaining > 1) {
    if (remaining % divisor === 0) {
      factorToPower[divisor] = (factorToPower[divisor] || 0) + 1;
      remaining /= divisor;
    } else divisor++;
  }

  return factorToPower;
};

/**
 * @returns the smallest positive number that is evenly
 * divisible by all numbers from 1 to @param n
 */
const minPosNumEvenlyDivByAllNumsFrom1To = (n: number): number => {
  const m: Record<number, number> = {};
  for (let x = 2; x <= n; x += 1)
    for (const [factor, power] of Object.entries(primeFactorsOf(x)))
      m[+factor] = Math.max(~~m[+factor], power);

  return Object.entries(m).reduce(
    (product, [factor, power]) => Number(factor) ** power * product,
    1
  );
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("gets the prime factors of a number", () => {
    expect(primeFactorsOf(1)).toEqual({});
    expect(primeFactorsOf(2)).toEqual({ 2: 1 });
    expect(primeFactorsOf(3)).toEqual({ 3: 1 });
    expect(primeFactorsOf(4)).toEqual({ 2: 2 });
    expect(primeFactorsOf(5)).toEqual({ 5: 1 });
    expect(primeFactorsOf(13195)).toEqual({
      5: 1,
      7: 1,
      13: 1,
      29: 1,
    });
    expect(primeFactorsOf(600851475143)).toEqual({
      71: 1,
      839: 1,
      1471: 1,
      6857: 1,
    });
  });
  it("gets the smallest positive number evenly divisible by all numbers from 1 to n", () => {
    expect(minPosNumEvenlyDivByAllNumsFrom1To(1)).toBe(1);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(2)).toBe(2);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(3)).toBe(6);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(4)).toBe(12);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(5)).toBe(60);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(6)).toBe(60);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(7)).toBe(420);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(8)).toBe(840);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(10)).toBe(2520);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(20)).toBe(232792560);
    expect(minPosNumEvenlyDivByAllNumsFrom1To(99)).toBe(6.972037522971249e40);
  });
}
