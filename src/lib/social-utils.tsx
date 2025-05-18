import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

// Map platform names to icon components
export const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "github":
      return (
        <FaGithub className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    case "linkedin":
      return (
        <FaLinkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    case "twitter":
      return (
        <FaXTwitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    case "youtube":
      return (
        <FaYoutube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    case "instagram":
      return (
        <FaInstagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    case "facebook":
      return (
        <FaFacebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      );
    default:
      return null;
  }
};
