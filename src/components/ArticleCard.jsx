import { useRouter } from "next/navigation";
import { Image as ImageIcon, Eye, Calendar } from "lucide-react";

export default function ArticleCard({ article }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/articles/${article._id}`)}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#10B981] transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100 group-hover:bg-[#FFFBEB] relative">
        <div className="w-full h-44 overflow-hidden relative">

          {article.files?.manuscriptImage ? (
            <img
              src={article.files.manuscriptImage}
              alt="manuscript"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
              <ImageIcon size={40} />
            </div>
          )}

          {/* Discipline badge */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[10px] font-semibold text-green-600 px-2 py-1 rounded shadow-sm uppercase">
            {article.discipline}
          </div>

        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[10px] font-bold text-[#10B981] px-2 py-1 rounded shadow-sm uppercase">
          {article.discipline}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] font-bold text-[#B45309] mb-2 flex justify-between uppercase">
          <span>{article.manuscriptType || "Article"}</span>
          <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
          {article.title}
        </h3>
        <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
          <p className="text-[11px] text-gray-500 truncate w-2/3">
            {article.authors?.map(a => a.name).join(", ")}
          </p>
          <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
            <Eye size={12} /> {article.views}
          </span>
        </div>
      </div>
    </div>
  );
}