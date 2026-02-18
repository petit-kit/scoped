import { define } from '@petit-kit/scoped';
import content from '../content/parts';
import markdownit from 'markdown-it';

function removeLeadingBr(str: string): string {
  const brRegex = /^\s*<br\s*\/?>/i;
  return str.replace(brRegex, '');
}

define('c-content', {}, () => {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  });

  const parts = content.reduce(
    (acc, item: any) => {
      acc.push(item);
      if (item.children) {
        acc.push(...item.children);
      }
      return acc;
    },
    [] as { title: string; content: string; slug: string }[]
  );

  return () => /*html*/ `
    <div class="max-w-[calc(100vw-20px)]">
      ${parts
        .map(
          (item: { title: string; content: string; slug: string }) => /*html*/ `
        <div class="content" id="${item.slug}">
          ${md.render(item.content.trim())}
        </div>
      `
        )
        .join('<br />')}
    </div>
  `;
});
