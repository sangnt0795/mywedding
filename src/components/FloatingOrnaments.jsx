const ornaments = [
  { left: '8%', top: '18%', size: 10, delay: 0 },
  { left: '86%', top: '16%', size: 14, delay: 0.8 },
  { left: '14%', top: '68%', size: 13, delay: 1.4 },
  { left: '78%', top: '76%', size: 9, delay: 0.3 },
  { left: '48%', top: '10%', size: 8, delay: 1.1 },
  { left: '58%', top: '88%', size: 12, delay: 0.5 },
];

const FloatingOrnaments = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {ornaments.map((item) => (
        <span
          key={`${item.left}-${item.top}`}
          className="floating-ornament absolute rounded-full border border-roseblue/35 bg-white/45 will-change-transform"
          style={{
            left: item.left,
            top: item.top,
            width: item.size,
            height: item.size,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrnaments;
