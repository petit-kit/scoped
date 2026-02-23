export const last = <T>(array: T[]): T => array[array.length - 1];

export const first = <T>(array: T[]): T => array[0];

export const clamp = (min: number, input: number, max: number) =>
  Math.max(min, Math.min(input, max));

export const createVelocity = (value: number) => {
  let lastValue = value;
  let lastUpdateTime: number | undefined;

  return (value: number) => {
    if (!lastUpdateTime) {
      lastUpdateTime = performance.now();
    }
    const velocity = computeSpringVelocity(
      lastValue,
      value,
      performance.now() - lastUpdateTime
    );
    lastValue = value;
    lastUpdateTime = performance.now();

    return velocity;
  };
};

// Utility function to compute velocity of spring value changes
export function computeSpringVelocity(
  prevValue: number,
  currValue: number,
  deltaTime: number
): number {
  if (deltaTime === 0) return 0;
  return (currValue - prevValue) / deltaTime;
}
