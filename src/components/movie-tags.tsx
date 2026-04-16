interface MovieTagsProps {
  genres: string[]
  runtime: number
}

const MovieTags: React.FC<MovieTagsProps> = ({ genres, runtime }) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {genres.map(genre => (
        <span
          key={genre}
          className="px-3 py-1 rounded-lg text-text-secondary text-sm bg-[#252932]"
        >
          {genre}
        </span>
      ))}
      <span className="px-3 py-1 rounded-lg text-text-secondary text-sm bg-[#252932]">
        {hours}h {minutes}m
      </span>
    </div>
  )
}

export default MovieTags
