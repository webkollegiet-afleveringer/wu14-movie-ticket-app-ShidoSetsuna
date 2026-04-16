import defaultIcon from '../assets/user.png';
import { Link } from '@tanstack/react-router';

const ProfileIcon: React.FC = () => {
  return (
    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
      <Link to="/settings">
        <img src={defaultIcon} alt="Profile" className='p-1'/>
      </Link>
    </div>
  );
};

export default ProfileIcon;