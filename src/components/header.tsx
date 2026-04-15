import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import SearchTool from './search';
import ProfileIcon from './profile-icon';
import { Bookmark, ArrowLeft, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  welcome?: string;
  search?: boolean;
  profile?: boolean;
  back?: boolean;
  bookmark?: boolean;
  bookmarked?: boolean;
  onBookmark?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, search, welcome, profile, back, bookmark, bookmarked, onBookmark }) => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="flex flex-col">

      {/* Top row */}
      <div className="relative flex items-center justify-between p-4 h-16">

        {/* Left side */}
        <div>
          {back && (
            <button onClick={() => router.history.back()}>
              <ArrowLeft />
            </button>
          )}
          {welcome && (
            <div className="flex flex-col leading-tight">
              <span>Welcome back,</span>
              <span className="font-bold">{welcome}</span>
            </div>
          )}
        </div>

        {/* Center */}
        {title && <h1 className="absolute left-1/2 -translate-x-1/2">{title}</h1>}

        {/* Right side */}
        <div className="flex gap-2 items-center">
          {bookmark && (
            <button onClick={onBookmark}>
              <Bookmark size={22} className={bookmarked ? 'text-accent fill-accent' : 'text-text'} />
            </button>
          )}
          {profile && <ProfileIcon />}
          {search && (
            <button onClick={() => setSearchOpen(prev => !prev)}>
              <Search />
            </button>
          )}
        </div>

      </div>

      {/* Search bar */}
      {search && searchOpen && <SearchTool />}

    </header>
  );
};

export default Header;
