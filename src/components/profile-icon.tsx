import defaultIcon from '../assets/user.png';
import { Link } from '@tanstack/react-router';

const ProfileIcon: React.FC = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <Link to="/settings">
        <img src={defaultIcon} alt="Profile" />
      </Link>
    </div>
  );
};

export default ProfileIcon;