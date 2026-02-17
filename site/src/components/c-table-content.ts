import { define } from '@petit-kit/scoped';
import content from '../content/index';

define('c-table-content', {}, () => {
  return () => /*html*/ `
    <div class="flex flex-col gap-2 w-[170px] mt-5">
      ${content
        .map(
          (item: {
            Title: string;
            content: string;
            children?: { Title: string; content: string }[];
          }) => /*html*/ `
        <div>
          <a href="#${item.Title}">${item.Title}</a>
          ${
            item.children
              ? item.children
                  .map(
                    (child) => /*html*/ `
            <div class="ml-5 mt-2">
              <a href="#${child.Title}">${child.Title}</a>
            </div>
          `
                  )
                  .join('')
              : ''
          }
        </div>
      `
        )
        .join('')}
      </div>
    `;
});
