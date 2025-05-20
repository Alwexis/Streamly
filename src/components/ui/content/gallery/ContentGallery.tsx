import { ContentBase } from "@/lib/types";
import { Frown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ContentCard from "./ContentCard";

type ContentGalleryProps = {
  type: "movie" | "serie";
  callback: () => Promise<ContentBase[] | undefined>;
  pagination?: {
    next?: string; // slug
    previous?: string; // slug
    current: number;
  };
}

export default async function ContentGallery({ type, callback, pagination }: ContentGalleryProps) {
  const data = await callback();

  if (!data || data.length === 0) return (
    <div className="flex flex-col justify-center items-center h-full">
      <Frown className="w-10 h-10 text-gray-200" />
      <h2 className="text-gray-200 text-2xl font-bold">No se encontraron resultados</h2>
    </div>
  );

  return (
    <section className="max-w-dvw select-none">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-1 gap-y-4">
        {
          data.map((item) => {
            return (
              <ContentCard key={item.id} type={type} item={item} />
            )
          })
        }
      </div>
      
      {pagination && (
        <div className="w-full grid grid-cols-3 justify-items-center gap-4 mt-8 text-white">
          {pagination.previous && pagination ? (
            <Link href={pagination.previous} className="flex items-center gap-2">
              <ChevronLeft width={20} height={20} />
              Anterior
            </Link>
          ) : <span></span> }
          <span className="text-white">
            Página {pagination.current}
          </span>
          {pagination.next && data.length >= 30 ? (
            <Link href={pagination.next} className="flex items-center gap-2">
              Siguiente
              <ChevronRight width={20} height={20} />
            </Link>
          ) : <span></span> }
        </div>
      )}
    </section>
  )
}