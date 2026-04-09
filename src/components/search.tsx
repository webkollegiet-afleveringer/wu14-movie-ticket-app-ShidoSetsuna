import { Search } from 'lucide-react';

interface SearchProps {
  defaultOpen?: boolean;
}

const SearchTool: React.FC<SearchProps> = ({ defaultOpen = false }) => {
  return (
    <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-4 mx-4 mb-2">
      <Search className="text-text-secondary" size={18} />
      <input
        type="text"
        placeholder="Search your favourite movie"
        className="bg-transparent text-text placeholder:text-text-secondary outline-none w-full"
        autoFocus={!defaultOpen}
      />
    </div>
  );
};

export default SearchTool;
