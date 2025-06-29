import { Link } from 'react-router-dom';
interface NavLink {
  name: string;
  href: string;
  isExternal: boolean;
}
interface NavbarCenterLinksProps {
  centerNavLinks: NavLink[];
}
const NavbarCenterLinks = ({
  centerNavLinks
}: NavbarCenterLinksProps) => {
  return <div className="hidden md:flex justify-center w-3/5">
      <div className="flex space-x-8 mx-auto">
        {centerNavLinks.map(link => link.href.startsWith('#') ? <a key={link.name} href={link.href} className="font-manrope group flex items-center space-x-1 relative transition-colors duration-300 cursor-pointer text-white hover:text-white">
              
            </a> : <Link key={link.name} to={link.href} className="text-white hover:text-white transition-colors duration-300 font-manrope group flex items-center space-x-1 relative">
              <span className="relative">
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gloria-primary origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>)}
      </div>
    </div>;
};
export default NavbarCenterLinks;