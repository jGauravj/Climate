const Skeleton = () => {
  return (
    <div className="bg-zinc-950  space-y-6">
      {/* Top Horizontal Cards */}
      <div className="flex gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-[300px] h-[100px] bg-zinc-800 animate-pulse rounded-lg" />
        ))}
      </div>

      {/* Middle Section */}
      <div className="flex gap-6">
        <div className="w-[40%] h-[300px] bg-zinc-800 animate-pulse rounded-lg" />
        <div className="w-[60%] h-[300px] bg-zinc-800 animate-pulse rounded-lg" />
      </div>

      {/* Bottom Section */}
      <div className="flex gap-6">
        <div className="w-[60%] h-[300px] bg-zinc-800 animate-pulse rounded-lg" />
        <div className="w-[40%] h-[300px] bg-zinc-800 animate-pulse rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
