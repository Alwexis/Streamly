export default function GallerySkeleton() {
  const articles = Array.from({ length: 30 }, (_, index) => index);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-1 gap-y-4">
      {
        articles.map((article) => (
          <div key={article} className="w-48 h-72 max-h-72 bg-neutral-900 rounded-md animate-pulse"></div>
        ))
      }
    </div>
  )
}