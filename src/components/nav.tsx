import { Home, Compass, Bookmark, User } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const Nav: React.FC = () => {

  return (
    <nav className="bg-bg flex fixed bottom-0 w-full h-16 items-center">
      <ul className="flex justify-around w-full">
        <li><Link activeProps={{ className: 'text-text-blue' }} inactiveProps={{ className: 'text-nav-buttons' }} className="ease-in-out duration-420" to="/"><Home size={24}/></Link></li>
        <li><Link activeProps={{ className: 'text-text-blue' }} inactiveProps={{ className: 'text-nav-buttons' }} className="ease-in-out duration-420" to="/explore"><Compass size={24}/></Link></li>
        <li><Link activeProps={{ className: 'text-text-blue' }} inactiveProps={{ className: 'text-nav-buttons' }} className="ease-in-out duration-420" to="/saved"><Bookmark size={24}/></Link></li>
        <li><Link activeProps={{ className: 'text-text-blue' }} inactiveProps={{ className: 'text-nav-buttons' }} className="ease-in-out duration-420" to="/settings"><User size={24}/></Link></li>
      </ul>
    </nav>
  );
};
 
export default Nav;
