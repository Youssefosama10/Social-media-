import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useContext , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from '../context/AuthContext'
import img1 from '../assets/images/images3.png'




export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function MyNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userToken , clearUserToken } = useContext(authContext)

  const navigate = useNavigate()

  const isUserLoggedIn = !!userToken
  


function handleLogout()
{
  localStorage.removeItem('tkn')
  clearUserToken()
  navigate('/login')
}


const menuItems = isUserLoggedIn ? [
  "Profile",
  "HOME" , 
] : [ "Register" , "Login" ];



  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>

<NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">social</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
     
     {!isUserLoggedIn && <>
     
      <NavbarItem>
          <Link color="foreground" to="/Register">
            Register
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" to="/Login">
            Login
          </Link>
        </NavbarItem>
     
     </>}

      {isUserLoggedIn &&   <NavbarItem>
          <Link color="foreground" to="/Home">
            Home
          </Link>
        </NavbarItem>}


      </NavbarContent>




    {isUserLoggedIn &&   <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <img
              isBordered
              as="button"
              className="transition-transform w-12 rounded-full"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={img1}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
    
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>

          </DropdownMenu>
        </Dropdown>
      </NavbarContent>}





      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>


    </Navbar>
  );
}
