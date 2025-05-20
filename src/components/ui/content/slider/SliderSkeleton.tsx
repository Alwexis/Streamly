import { geistSans } from "@/lib/fonts";

type SliderSkeletonProps = {
  title: string;
}

export default function SliderSkeleton({ title }: SliderSkeletonProps) {
  const articles = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="px-4 md:px-6 max-w-dvw">
      <h2 className={`text-2xl font-semibold text-white mb-4 ${geistSans.className}`}>
        {title}
      </h2>
      <div className="flex items-center h-80 gap-4 pb-2.5 overflow-x-auto [&::-webkit-scrollbar-thumb]:bg-neutral-900 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-2">
        {
          articles.map((item) => {
            return (
              <div key={item} className="w-48 h-72 max-h-72 bg-neutral-900 rounded-md animate-pulse"></div>
            )
          })
        }
      </div>
    </section>
  )
}