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

const Header: React.FC<HeaderProps> = ({title, search, welcome, profile, back, bookmark}) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 h-16">
      {welcome && <p>Welcome back, <h2>{welcome}</h2></p>}
      {back && (
        <button onClick={() => router.history.back()}>
          <ArrowLeft />
        </button>
      )}

      {title && (<h1 className="absolute left-1/2 -translate-x-1/2">{title}</h1>)}

      <div className="flex gap-2">
        {bookmark && <Bookmark />}
        {profile && <ProfileIcon />}
        {search && <SearchTool />}
      </div>

    </header>
  );
};

export default Header;