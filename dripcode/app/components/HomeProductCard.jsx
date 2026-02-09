import Link from "next/link";
import Image from "next/image";

 const HomeProductCard = ({ data, priority = false }) => {
  const { id, name, price, colors } = data;

  return (
    <Link 
      href={`/details/${id}`} 
      className="group relative h-full w-full block overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-neutral-700"
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={colors[0].url}
          alt={name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Glassmorphic Label Bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between gap-3 bg-neutral-950/40 backdrop-blur-xl border border-white/10 p-2 pl-4 rounded-2xl shadow-2xl">
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-white text-sm font-semibold truncate leading-tight">
              {name}
            </h3>
            <span className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">
              Limited Edition
            </span>
          </div>
          <span className="bg-white text-black text-[12px] font-black py-2 px-3 rounded-xl whitespace-nowrap">
            ${price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HomeProductCard
