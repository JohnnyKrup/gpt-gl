import { SiOpenaigym } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <SiOpenaigym className="w-8 h-8 text-primary" />
      <span className="text-md font-extrabold text-primary mr-auto">
        GPT-Graz
      </span>
      <ThemeToggle />
    </div>
  );
};
export default SidebarHeader;
