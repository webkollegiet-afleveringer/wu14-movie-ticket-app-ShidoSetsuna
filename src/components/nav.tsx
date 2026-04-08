import '../styles/main.css';

const Nav: React.FC = () => {
  return (
    <nav className="color-bg">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/explore">Explore</a></li>
        <li><a href="/saved">Saved</a></li>
        <li><a href="/settings">settings</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
