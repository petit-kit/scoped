import {
  define,
  pointerPlugin,
  windowPlugin,
  lerpPlugin,
  timerPlugin,
} from '@petit-kit/scoped';
import { clamp } from '../lib/utils';

const eyelip = [
  { x: 260, y: 420 },
  { x: 310, y: 420 },
  { x: 355, y: 420 },
  { x: 400, y: 420 },
  { x: 450, y: 420 },
  { x: 489, y: 420 },
  { x: 489, y: 420 },
  { x: 450, y: 420 },
  { x: 400, y: 420 },
  { x: 355, y: 420 },
  { x: 310, y: 420 },
  { x: 260, y: 420 },
  { x: 260, y: 420 },
];
const closedEyelip = [
  { x: 260, y: 420 },
  { x: 310, y: 420 },
  { x: 355, y: 420 },
  { x: 400, y: 420 },
  { x: 450, y: 420 },
  { x: 489, y: 420 },
  { x: 489, y: 550 },
  { x: 450, y: 580 },
  { x: 400, y: 600 },
  { x: 355, y: 600 },
  { x: 310, y: 580 },
  { x: 260, y: 550 },
  { x: 260, y: 550 },
];

define(
  'c-header',
  {
    plugins: [pointerPlugin(), windowPlugin(), lerpPlugin(), timerPlugin()],
  },
  ({
    refs,
    onPointerMove,
    onWindowScroll,
    actions,
    createLerp,
    runLerp,
    onMount,
    timer,
    onWindowResize,
  }) => {
    let pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };

    const draw = () => {
      if (refs.left) {
        const left: any = refs.left;
        const bb = left.getBoundingClientRect();
        const rad = Math.atan2(pointer.y - bb.top, pointer.x - bb.left);
        const dx = pointer.x - bb.left;
        const dy = pointer.y - bb.top;
        const dd = Math.sqrt(dx * dx + dy * dy);
        let radius = dd / 10;
        radius = clamp(0, radius, 90);
        const nX = Math.cos(rad) * radius;
        const nY = Math.sin(rad) * radius;
        left.style.transform = `translate(${nX}px, ${nY}px)`;
      }

      if (refs.right) {
        const right: any = refs.right;
        const bb = right.getBoundingClientRect();
        const rad = Math.atan2(pointer.y - bb.top, pointer.x - bb.left);
        const dx = pointer.x - bb.left;
        const dy = pointer.y - bb.top;
        const dd = Math.sqrt(dx * dx + dy * dy);
        let radius = dd / 10;
        radius = clamp(0, radius, 90);
        const nX = Math.cos(rad) * radius;
        const nY = Math.sin(rad) * radius;
        right.style.transform = `translate(${nX}px, ${nY}px)`;
      }
    };

    onPointerMove(({ x, y }) => {
      pointer = { x, y };
      draw();
    });

    onWindowScroll(() => draw());

    const eyelipLerp = createLerp({
      from: 0,
      to: 0,
      lerp: 0.4,
    });

    const rightEyelip = eyelip.map((d) => ({
      ...d,
      x: d.x + 355,
      y: d.y - 20,
    }));
    const closedRightEyelip = closedEyelip.map((d) => ({
      ...d,
      x: d.x + 355,
      y: d.y - 20,
    }));

    runLerp(eyelipLerp, (value) => {
      const left = refs['eyelip-left'] as HTMLElement;
      const right = refs['eyelip-right'] as HTMLElement;

      if (left && right) {
        const currentEyelip = interpolateCoordinates(
          eyelip,
          closedEyelip,
          value
        );
        left.setAttribute('d', smoothCoordinatesToSvgPath(currentEyelip));
        const currentRightEyelip = interpolateCoordinates(
          rightEyelip,
          closedRightEyelip,
          value
        );
        right.setAttribute('d', smoothCoordinatesToSvgPath(currentRightEyelip));
      }
    });

    let isMobile = false;

    onMount(() => {
      window.addEventListener('pointerdown', actions.close);
      window.addEventListener('pointerup', () => {
        if (isMobile) return;
        actions.open();
      });

      timer.setTimeout(() => {
        actions.close();
        timer.setTimeout(() => {
          actions.open();
        }, 250);
      }, 750);
      randomBlink();
    });

    const randomBlink = () => {
      const delay = Math.random() * 500 + 5500;
      timer.setTimeout(() => {
        actions.close();
        timer.setTimeout(() => {
          actions.open();
          randomBlink();
        }, 250);
      }, delay);
    };

    onWindowResize(() => {
      isMobile = window.innerWidth < 768;

      if (refs['left-path']) {
        refs['left-path'].setAttribute(
          'd',
          forgeHandPath([
            { x: 50, y: 833 },
            { x: -5000, y: 3300 },
            { x: -5000, y: 4300 },
            { x: 187, y: 938 },
            { x: 140, y: 820 },
          ])
        );
      }
      if (refs['right-path']) {
        refs['right-path'].setAttribute(
          'd',
          forgeHandPath([
            { x: 1083, y: 769 },
            { x: 6000, y: 2500 },
            { x: 6000, y: 3500 },
            { x: 953, y: 886 },
            { x: 1030, y: 770 },
          ])
        );
      }
    });

    actions.close = (e) => {
      eyelipLerp.setTarget(1);
      if (isMobile) {
        timer.setTimeout(() => {
          actions.open();
        }, 250);
      }
    };

    actions.open = (e) => {
      eyelipLerp.setTarget(0);
    };

    return () => /*html*/ `
      <svg
        width="1142" height="966"
        viewBox="0 0 1142 966" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="
          overflow-visible
          relative left-[50vw] -translate-x-1/2 
          -translate-y-[20%]
          scale-25 -translate-y-[30%]
          sm:scale-25 sm:-translate-y-[30%]
          md:scale-30 md:-translate-y-[32%]
          lg:scale-40 lg:-translate-y-[30%]
          2xl:scale-55 2xl:-translate-y-[23%]
          3xl:scale-65 3xl:-translate-y-[18%]
        "
      >
        <defs>
          <clipPath id="clip-left">
            <path d="M299.447 569.92C290.805 564.327 274.135 550.114 276.583 538.004C279.642 522.866 290.731 502.862 310.628 481.327C359 428.973 316.5 436.473 421.417 477.566C450.312 484.252 469.759 481.912 489.67 478.543C491.309 478.231 492.991 477.941 494.717 477.675C493.027 477.968 491.347 478.259 489.67 478.543C430.347 489.852 426.628 530.768 427.213 538.61C417.557 543.167 410.116 562.035 395.795 572.206C381.475 582.377 359.5 579.973 352.068 589.793C338.46 586.329 308.885 577.505 299.447 569.92Z"/>
          </clipPath>
          <clipPath id="clip-right">
            <path d="M798.779 541.4C806.412 534.666 820.651 518.288 816.539 506.641C811.4 492.082 796.319 475.457 775.26 455.263C731.655 413.45 746.499 417.649 666.65 466.898C639.832 477.358 626.964 479.19 613.592 478.69C612.239 478.547 610.876 478.473 609.503 478.473C610.881 478.565 612.239 478.639 613.592 478.69C644.247 481.927 669.148 520.402 669.685 528.122C679.753 531.294 689.698 548.937 705.115 557.018C720.533 565.1 737.503 557.018 750.275 568.364C763.057 563.05 790.651 550.216 798.779 541.4Z"/>
          </clipPath>
        </defs>

        <path d="M275.661 70.7904C288.809 83.7198 309.523 110.654 284.749 143.777C270.67 162.601 254.47 178.415 249.736 178.415C243.635 199.86 226.03 242.996 210.677 259.351C195.324 275.706 193.228 298.347 194.1 307.623C193.327 339.297 190.478 390.116 183.47 421.795C189.731 403.048 198.369 383.743 206.929 353.358C222.021 299.791 253.495 267.403 285.268 258.49C310.686 251.359 387.651 210.224 424.958 188.333C428.63 200.805 430.896 220.207 412.479 240.65C405.514 248.381 383.97 259.352 379.4 258.809C372.267 271.023 359.01 285.333 335.537 299.396C312.063 313.459 284.622 314.14 284.176 322.029C276.049 355.061 278.457 395.652 247.97 444.295C274.47 413.599 305.438 392.96 324.371 386.403C348.036 378.206 389.183 399.297 406.697 413.598C424.211 427.899 492.88 447.105 508.808 448.349C524.407 449.567 520.287 469.267 506.093 474.013C522.147 475.677 531.957 485.743 523.746 486.83C515.334 487.944 500.545 516.429 489.113 532.445C489.274 546.595 479.877 583.095 433.184 626.937C386.49 670.778 375.608 677.511 361.158 678.449C352.295 757.492 227.438 911.871 188.878 935.124C157.964 953.766 100.671 849.913 47.2835 835.463L47.7169 835.186C71.2154 820.127 156.63 765.389 123.538 665C91.9123 569.06 41.6735 369.598 34.8032 341.406C27.765 312.524 62.4183 205.311 61.9757 124.657C71.0597 125.171 86.7242 124.381 93.064 159.469C103.856 219.197 95.8479 210.381 92.1925 218.33C92.4458 237.128 94.7615 279.758 84.2204 315.72L84.2712 315.825C90.9907 329.822 111.983 373.552 110.47 391.796C108.575 414.655 126.277 247.373 187.852 177.992C235.79 123.978 270.028 85.3516 275.661 70.7904ZM421.417 477.566C316.501 436.473 359 428.973 310.628 481.327C290.731 502.862 279.642 522.866 276.583 538.004C274.136 550.114 290.806 564.327 299.447 569.919C308.886 577.505 338.461 586.329 352.068 589.793C359.501 579.973 381.476 582.377 395.796 572.206C410.116 562.034 417.557 543.167 427.213 538.61C426.628 530.767 430.347 489.852 489.67 478.543C469.76 481.912 450.313 484.251 421.417 477.566Z" fill="#222730" stroke="#222730" stroke-width="2" />
        <path d="M750.932 44.0808C739.947 58.7005 723.574 88.2312 752.456 117.581C768.87 134.26 780.503 142.473 791.542 147.011C800.546 167.391 823.861 207.646 841.166 221.705C858.471 235.764 863.738 257.882 864.208 267.184C869.47 298.427 881.076 357.041 892.422 387.425C883.645 369.738 870.879 343.117 858.203 314.23C835.855 263.302 800.542 235.61 768.278 231.192C742.467 227.657 661.533 197.612 622.023 181.117C620.217 193.971 620.768 213.489 641.643 231.169C649.538 237.855 675.438 248.946 676.497 244.558C685.194 255.658 700.163 267.983 725.064 278.648C749.965 289.313 776.83 286.183 778.389 293.93C791.019 325.497 797.517 374.961 834.181 418.88C806.417 396.099 767.744 367.084 748.342 363.218C724.089 358.385 686.953 384.965 671.903 401.548C656.854 418.13 592.601 446.658 577.24 450.097C566.602 452.479 564.35 467.09 570.769 473.457C561.921 475.77 565.233 487.971 571.503 491.973C595.003 506.973 594.992 516.336 608.423 530.604C610.281 544.631 627.771 575.384 676.433 616.375C727.003 658.973 740.003 667.973 757.003 670.973C776.9 747.979 917.698 869.872 958.624 887.542C991.434 901.708 1032.54 790.975 1082.56 769.272L1082.1 769.057C1057.04 757.41 965.921 715.073 983.912 611.123C1001.11 511.78 1021.72 307.395 1024.41 278.539C1027.17 248.976 978.101 147.664 967.052 67.7737C958.263 69.5418 941.679 70.9015 941.679 106.54C941.679 151.973 946.211 157.316 950.909 164.678C953.337 183.318 957.146 225.834 972.548 259.966C968.023 274.631 960.2 310.863 964.283 328.755C969.386 351.12 921.793 198.15 851.85 138.014C797.398 91.1979 758.5 57.7121 750.932 44.0808ZM666.649 466.899C746.498 417.649 731.655 413.451 775.259 455.264C796.319 475.458 811.4 492.083 816.539 506.642C820.651 518.289 806.412 534.667 798.779 541.401C790.651 550.217 763.057 563.051 750.276 568.366C737.503 557.02 720.533 565.101 705.115 557.019C689.698 548.937 679.753 531.294 669.684 528.123C669.147 520.402 644.247 481.928 613.592 478.691C612.239 478.64 610.881 478.565 609.503 478.474C610.876 478.474 612.24 478.548 613.592 478.691C626.964 479.191 639.832 477.359 666.649 466.899Z" fill="#222730" stroke="#222730" stroke-width="2" />

        <g clip-path="url(#clip-left)" style="transform: translate(0%, 0%)">
          <g ref="right">
            <ellipse cx="48.982" cy="64.5623" rx="49" ry="42.5" transform="rotate(3.23944 48.982 64.5623) translate(330, 410)" fill="#222730"/>
            <ellipse cx="${330 + 48.982}" cy="${410 + 64.5623}" rx="5" ry="7" fill="white"/>
          </g>
        </g>
        <g clip-path="url(#clip-right)" style="transform: translate(0%, 0%)">
          <g ref="left">
            <ellipse cx="48.982" cy="64.5623" rx="49" ry="42.5" transform="rotate(3.23944 48.982 64.5623) translate(685, 375)" fill="#222730"/>
            <ellipse cx="${685 + 48.982}" cy="${375 + 84.5623}" rx="5" ry="7" fill="white"/>
          </g>
        </g>

        <path ref="eyelip-left" clip-path="url(#clip-left)" d="" fill="#2C333F" />
        <path ref="eyelip-right" clip-path="url(#clip-right)" d="" fill="#2C333F" />

        <path ref="left-path" fill="#222730" />
        <path ref="right-path" fill="#222730" />

      </svg>
    `;
  }
);

function coordinatesToSvgPath(coords: { x: number; y: number }[]): string {
  if (!coords.length) return '';

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    d += ` L ${coords[i].x} ${coords[i].y}`;
  }
  return d;
}

function smoothCoordinatesToSvgPath(
  coords: { x: number; y: number }[],
  closed: boolean = false
): string {
  if (!coords.length) return '';
  if (coords.length === 1) return `M ${coords[0].x} ${coords[0].y}`;

  let points = coords;
  let d = '';

  // If closed, duplicate ends for smoothness
  if (closed && points.length > 2) {
    points = [coords[coords.length - 2], ...coords, coords[1]];
  } else if (points.length < 4) {
    // Not enough points to smooth, fallback to straight lines
    d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  }

  // Catmull-Rom to Bezier spline
  d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 3; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    const p3 = points[i + 3];

    // Calculate control points
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  if (closed) d += ' Z';
  return d;
}

function interpolateCoordinates(
  fromCoords: { x: number; y: number }[],
  toCoords: { x: number; y: number }[],
  t: number
): { x: number; y: number }[] {
  if (
    fromCoords.length !== toCoords.length ||
    fromCoords.length === 0 ||
    toCoords.length === 0
  ) {
    throw new Error(
      'Coordinate arrays must be non-empty and of the same length'
    );
  }
  return fromCoords.map((fromPt, i) => {
    const toPt = toCoords[i];
    return {
      x: fromPt.x + (toPt.x - fromPt.x) * t,
      y: fromPt.y + (toPt.y - fromPt.y) * t,
    };
  });
}

function forgeHandPath(coords: { x: number; y: number }[]): string {
  const angle1 = Math.atan2(
    coords[1].y - coords[0].y,
    coords[1].x - coords[0].x
  );
  const angle2 = Math.atan2(
    coords[2].y - coords[3].y,
    coords[2].x - coords[3].x
  );
  const projectedPoint1 = {
    x: coords[0].x + Math.cos(angle1) * window.innerWidth * 2,
    y: coords[0].y + Math.sin(angle1) * window.innerWidth * 2,
  };
  const projectedPoint2 = {
    x: coords[2].x + Math.cos(angle2) * window.innerWidth * 2,
    y: coords[2].y + Math.sin(angle2) * window.innerWidth * 2,
  };

  return coordinatesToSvgPath([
    coords[0],
    projectedPoint1,
    projectedPoint2,
    coords[3],
    coords[4],
  ]);
}
