const { Star } = require("lucide-react");

export default function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < full ? "fill-amber-400 text-amber-400" : i === full && half ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          style={i === full && half ? { clipPath: "inset(0 50% 0 0)", fill: "#fbbf24" } : {}}
        />
      ))}
    </div>
  );
}