import { define, windowPlugin } from '@petit-kit/scoped';
import parts from '../content/parts';

define(
  'c-table-content',
  { plugins: [windowPlugin()] },
  ({ onWindowScroll }) => {
    onWindowScroll(() => {
      try {
        const contents = document.querySelectorAll('div.content');

        if (!contents.length) return;

        const current = Array.from(contents).reduce((acc, item) => {
          const rect = item.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            return item;
          }
          return acc;
        }, Array.from(contents)[0]);

        const links = document.querySelectorAll('a.link');
        links.forEach((link) => {
          link.classList.remove('nav-active');
        });

        const id = `a[id="${current.id + '-link'}"`;
        const link = document.querySelector(id);
        link?.classList.add('nav-active');
      } catch (error) {
        console.log(error);
      }
    });

    return () => /*html*/ `
    <div class="flex flex-col gap-2 w-[180px] mt-5">
      ${parts
        .map(
          (item: {
            slug: string;
            title: string;
            content: string;
            children?: { title: string; slug: string; content: string }[];
          }) => /*html*/ `
        <div>
          <a href="#${item.slug}" id="${item.slug + '-link'}" class="link hover:font-bold inline-block w-full">
            ${item.title}
          </a>
          ${
            item.children
              ? item.children
                  .map(
                    (child: {
                      title: string;
                      slug: string;
                      content: string;
                    }) => /*html*/ `
            <div class="ml-5 mt-2">
              <a href="#${child.slug}" id="${child.slug + '-link'}" class="link hover:font-bold inline-block w-full">
                ${child.title}
              </a>
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
  }
);
