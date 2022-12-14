import { MdPlayCircleOutline, MdCode } from "react-icons/md";

const PortfolioCard = ({ title, link, text, technologies, img }) => {
  return (
    <div className="project-container right">
      <p className="pro-title">{title}</p>
      <div className="img-con">
        <img src={img} alt="" />
      </div>
      <div className="icon-con">
        <a className="icon-con" href={link} target="_blanck">
          <MdPlayCircleOutline />
        </a>
        <a className="icon-con">
          <MdCode />
        </a>
      </div>
      <div className="side-in from-right">
        <p>{text}</p>
      </div>
      <div className="side-in from-left">
        {technologies.map((tech, index) => {
          return <p key={index}>{tech}</p>;
        })}
      </div>
    </div>
  );
};

export default PortfolioCard;
