export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none">
      <div className="w-full h-full bg-[url('/Map/Junk.webp')] bg-top bg-cover" />
      <div className="absolute bottom-0 w-full h-full bg-linear-to-t from-black/80 via-black/70 to-black/60" />
    </div>
  );
}
