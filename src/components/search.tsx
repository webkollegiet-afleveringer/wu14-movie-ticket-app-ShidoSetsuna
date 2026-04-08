import { Search } from 'lucide-react';

interface SearchProps {
  open: boolean;
  onToggle: () => void;
}

const SearchTool: React.FC<SearchProps> = ({ open, onToggle }) => {
  return (
    <>
      <button onClick={onToggle}>
        <Search />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 px-4 py-2 bg-bg z-10">
          <div className="flex items-center gap-2 bg-component-bg rounded-full px-4 py-2">
            <Search className="text-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search your favourite movie"
              className="bg-transparent text-text placeholder:text-text-secondary outline-none w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchTool;
