import Image from "next/image"

interface GPTCardProps {
  title: string
  description: string
  author: string
  imageSrc: string
  rank?: number
}

export function GPTCard({ title, description, author, imageSrc, rank }: GPTCardProps) {
  return (
    <div className="group relative bg-gray-800 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
      <div className="flex items-start gap-4">
        {rank && <span className="text-gray-400 text-sm font-medium">{rank}</span>}
        <div className="relative h-12 w-12 rounded-xl overflow-hidden">
          <Image src={imageSrc} alt={title} width={48} height={48} className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2 mt-1">{description}</p>
          <p className="text-xs text-gray-500 mt-2">By {author}</p>
        </div>
      </div>
    </div>
  )
}
