import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().toLocaleDateString()} Aman Chouhan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

