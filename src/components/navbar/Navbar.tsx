import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between border-b-2 border-secondary border-opacity-80 pb-3 ">
      <ul className="flex flex-row gap-6">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/">About</NavItem>
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/">Projects</NavItem>
      </ul>
      <ul className="mr-3 flex flex-row gap-6 ">
        <NavItem href="/">GitHub</NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
