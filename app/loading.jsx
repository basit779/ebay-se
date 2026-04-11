export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
          <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-b-neon-purple" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>
        <p className="text-xs font-medium text-white/30 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
