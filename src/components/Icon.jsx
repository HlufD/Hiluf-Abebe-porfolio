import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowUpRight,
  FiArrowRight,
  FiDownload,
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiFileText,
  FiLayers,
  FiSend,
  FiCheck,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const map = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
  mapPin: FiMapPin,
  phone: FiPhone,
  arrowUpRight: FiArrowUpRight,
  arrowRight: FiArrowRight,
  download: FiDownload,
  menu: FiMenu,
  close: FiX,
  home: FiHome,
  user: FiUser,
  resume: FiFileText,
  work: FiLayers,
  send: FiSend,
  check: FiCheck,
  sun: FiSun,
  moon: FiMoon,
};

export default function Icon({ name, className }) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden="true" />;
}
