import clsx from 'clsx';

const sizeClass = {
  hero: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
  cover: 'text-[2.2rem] sm:text-[3.3rem]',
  section: 'text-[clamp(2.8rem,11vw,5.6rem)]',
  card: 'text-[clamp(1.9rem,8vw,3rem)]',
};

const layoutClass = {
  hero: 'flex-wrap whitespace-normal text-center',
  cover: 'flex-col whitespace-normal text-center sm:flex-row sm:whitespace-nowrap',
  default: 'whitespace-nowrap',
};

const CoupleNames = ({ brideName, groomName, size = 'section', className = '' }) => {
  return (
    <span
      className={clsx(
        'inline-flex max-w-full items-center justify-center font-display leading-none tracking-[-0.055em] text-ink',
        sizeClass[size],
        layoutClass[size] || layoutClass.default,
        className,
      )}
    >
      <span>{groomName}</span>
      <span
        className={clsx(
          'align-middle text-[0.45em] font-normal tracking-normal text-nude',
          size === 'cover' ? 'my-1 mx-0 sm:my-0 sm:mx-[0.18em]' : 'mx-[0.18em]',
        )}
      >
        &
      </span>
      <span>{brideName}</span>
    </span>
  );
};

export default CoupleNames;
