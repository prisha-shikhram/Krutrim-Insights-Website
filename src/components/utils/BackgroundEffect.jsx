// background effect
export default function Background() {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1,137,199,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1,137,199,0.1) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(1,137,199,0.18), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(0,198,255,0.15), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
    </>
  );
}