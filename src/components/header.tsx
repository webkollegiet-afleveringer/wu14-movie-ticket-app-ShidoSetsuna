import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import SearchTool from './search';
import ProfileIcon from './profile-icon';
import { Bookmark, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  welcome?: string;
  search?: boolean;
  profile?: boolean;
  back?: boolean;
  bookmark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, search, welcome, profile, back, bookmark }) => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between p-4 h-16">

      {/* Left side */}
      <div>
        {back && (
          <button onClick={() => router.history.back()}>
            <ArrowLeft />
          </button>
        )}
        {welcome && <p>Welcome back, <span className="font-bold">{welcome}</span></p>}
      </div>

      {/* Center */}
      {title && <h1 className="absolute left-1/2 -translate-x-1/2">{title}</h1>}

      {/* Right side */}
      <div className="flex gap-2 items-center">
        {bookmark && <Bookmark />}
        {profile && <ProfileIcon />}
        {search && <SearchTool open={searchOpen} onToggle={() => setSearchOpen(prev => !prev)} />}
      </div>

    </header>
  );
};

export default Header;
