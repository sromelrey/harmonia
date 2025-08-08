"use client";

import styles from "./rocket.module.css";

/** CSS-driven rocket + stars (no Math.random → no hydration risk) */
export default function RocketAnimation() {
  return (
    <div className='relative h-80 w-full overflow-hidden'>
      {/* starfield layers */}
      <div className={`${styles.stars} ${styles.parallaxA}`} aria-hidden />
      <div className={`${styles.stars} ${styles.parallaxB}`} aria-hidden />

      {/* orbital rings */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div className={`${styles.ring} ${styles.spinSlow}`} />
        <div className={`${styles.ringLarge} ${styles.spinReverse}`} />
      </div>

      {/* rocket (SVG + CSS glow) */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <svg width='120' height='120' viewBox='0 0 120 120' aria-hidden>
          {/* body */}
          <ellipse
            cx='60'
            cy='70'
            rx='12'
            ry='35'
            className={styles.rocketBody}
          />
          {/* tip */}
          <ellipse
            cx='60'
            cy='40'
            rx='8'
            ry='15'
            className={styles.rocketTip}
          />
          {/* fins */}
          <polygon points='48,85 45,100 55,95' className={styles.fin} />
          <polygon points='72,85 75,100 65,95' className={styles.fin} />
          {/* window */}
          <circle cx='60' cy='55' r='6' className={styles.windowOuter} />
          <circle cx='60' cy='55' r='4' className={styles.windowInner} />
          {/* flame */}
          <ellipse
            cx='60'
            cy='105'
            rx='8'
            ry='12'
            className={styles.flameOuter}
          />
          <ellipse
            cx='60'
            cy='108'
            rx='5'
            ry='8'
            className={styles.flameInner}
          />
        </svg>
        {/* thruster glow */}
        <div className={styles.thrusterGlow} aria-hidden />
      </div>
    </div>
  );
}
