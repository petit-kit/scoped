## Computed

Computed values are memoized values used to derive data from state or props and automatically update when their dependencies change.

```typescript
({ computed }) => {
  const fullName = computed(
    () => `${state.firstName} ${state.lastName}`, // getter
    () => [state.firstName, state.lastName] // dependencies
  );
  return () => `<p>Name: ${fullName()}</p>`;
};
```
