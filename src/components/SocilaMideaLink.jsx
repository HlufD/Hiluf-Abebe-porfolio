function SocilaMideaLink({ linkto, Icon }) {
  return (
    <a href={linkto} className="social-icon-containare">
      <Icon className="social-icon" />
    </a>
  );
}

export default SocilaMideaLink;
