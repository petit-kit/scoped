import { define } from '@petit-kit/scoped';

define(
  'c-logo',
  {
    props: {
      size: { type: Number, default: 100 },
    },
  },
  () => {
    return () => /*html*/ `
      <div class="relative z-10 scale-75 md:scale-100">
        <svg
          width="300"
          height="300"
          viewBox="0 0 749 749"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.00098"
            y="3.00195"
            width="744"
            height="744"
            rx="15"
            fill="#222730"></rect>
          <circle cx="374.5" cy="374.5" r="374.5" fill="#F0F6FC"></circle>
        </svg>

        <h1
          class="big-title leading-none tracking-tighter mt-5"
          style="font-family: var(--font-poppins); font-size: 85px;"
        >
          Scoped
        </h1>
      </div>
    `;
  }
);
