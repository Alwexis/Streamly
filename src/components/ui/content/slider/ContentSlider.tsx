import { geistSans, inter } from "@/lib/fonts";
import Link from "next/link";
import { ContentBase } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import SliderCard from "./SliderCard";

type ContentGalleryProps<T extends ContentBase> = {
  title: string;
  type: "movie" | "serie";
  callback: () => Promise<T[]>;
  viewMoreTitle?: string;
  viewMoreSlug?: string;
}

export default async function ContentGallery<T extends ContentBase>({ title, type, callback, viewMoreSlug, viewMoreTitle }: ContentGalleryProps<T>) {
  const data = await callback();

  return (
    <section className="px-4 md:px-6 max-w-dvw">
      <h2 className={`text-2xl font-semibold text-white mb-4 ${geistSans.className}`}>
        {title}
      </h2>
      {
        data.length > 0 ? (
          <div className="flex items-center h-80 gap-4 pb-2.5 overflow-x-auto [&::-webkit-scrollbar-thumb]:bg-neutral-900 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-2">
            {
              data.map((item) => {
                return (
                  <SliderCard key={item.id} type={type} item={item} />
                )
              })
            }
            {
              viewMoreSlug && (
                <Link href={viewMoreSlug}>
                  <article className="relative flex flex-col items-center justify-center text-white bg-neutral-900/50 hover:bg-neutral-900 transition-all w-48 h-72 max-h-72 px-3 py-3 text-center rounded-md">
                    <ArrowRight width={32} height={32} />
                    <h4>Ver más de <strong>{viewMoreTitle}</strong></h4>
                  </article>
                </Link>
              )
            }
          </div>
        ) : (
          <p className="text-white">No data found</p>
        )
      }
    </section>
  )
}