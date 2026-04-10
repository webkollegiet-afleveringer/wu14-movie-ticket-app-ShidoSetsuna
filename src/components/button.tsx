interface ButtonProps {
  link: string;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ link, title }) => {
  return (
    <a href={link} className="bg-accent text-text py-4 px-4 flex justify-center rounded-lg hover:bg-accent-hover transition-colors">
      {title}
    </a>
  );
};

export default Button;