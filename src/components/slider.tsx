interface SliderProps {
  title?: string
  seeMore?: boolean
  children: React.ReactNode
}

const Slider: React.FC<SliderProps> = ({ title, seeMore, children }) => {
  return (
    <div>

      {/* Section header */}
      {(title || seeMore) && (
        <div className="flex items-center justify-between px-4 mb-3">
          {title && <h2 className="font-bold text-text text-lg">{title}</h2>}
          {seeMore && <button className="text-text-secondary text-sm">See more</button>}
        </div>
      )}

      {/* Scrollable row with snap */}
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x m-4">
        {children}
      </div>

    </div>
  )
}

export default Slider