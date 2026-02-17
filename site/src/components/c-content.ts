import { define } from '@petit-kit/scoped';
import content from '../content/index';

define('c-content', {}, () => {
  const parts = content.reduce(
    (acc, item: any) => {
      acc.push(item);
      if (item.children) {
        acc.push(...item.children);
      }
      return acc;
    },
    [] as { Title: string; content: string; slug: string }[]
  );

  return () => /*html*/ `
    <div class="max-w-[calc(100vw-20px)]">
      ${parts
        .map(
          (item: { Title: string; content: string; slug: string }) => /*html*/ `
        <div class="content" id="${item.slug}">
          <h2 class="sub-title">
            ${item.Title}
          </h2>
          <br />
          <div>${item.content}</div>
        </div>
      `
        )
        .join('<br />')}
    </div>
  `;
});
