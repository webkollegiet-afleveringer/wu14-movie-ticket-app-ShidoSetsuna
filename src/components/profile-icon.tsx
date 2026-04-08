import defaultIcon from '../assets/user.png';

const ProfileIcon: React.FC = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <img src={defaultIcon} alt="Profile" />
    </div>
  );
};

export default ProfileIcon;
