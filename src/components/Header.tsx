import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Title & GitHub */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-100">DX</h1>
            <a
              href="https://github.com/Anonymous961/dx-client"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub size={30} />
            </a>
          </div>

          {/* Right section - Connect Button */}
          <div className="flex items-center">
            <ConnectButton
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
