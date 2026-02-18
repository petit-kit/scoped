## Event Delegation

`delegate` lets you efficiently handle events on descendants matching a selector:

```typescript
({ onMount, delegate }) => {
  onMount(() => {
    delegate('click', '.item', (e, target) => {
      console.log('Clicked item:', target.textContent);
      target.classList.toggle('active');
    });
  });

  return () => `
    <ul>
      <li class="item">Apple</li>
      <li class="item">Banana</li>
      <li class="item">Cherry</li>
    </ul>
  `;
};
```
