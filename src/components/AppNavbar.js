import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Button } from "@material-tailwind/react";
import NavigationSelect from "./NavigationSelect";
import ProfileMenu from "./ProfileMenu";

const AppNavbar = () => {
	const { oktaAuth, authState } = useOktaAuth();
    const [menuOpen, setMenuOpen] = useState(false);

	const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: "/" });

	const loggingOut = async () => oktaAuth.signOut();

	return (
        <header>
            <nav className="w-full fixed top-0 left-0 right-0 z-10 bg-white text-black shadow-md shadow-gray-800">
                <div className="flex justify-between items-center px-4 py-4 2xl:px-8">
                    <div className="flex flex-grow basis-0">
                        <Link to="/wellcome">
                            <h2 className="text-2xl font-bold text-black hover:scale-105">Dynamic Pricing</h2>
                        </Link>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="flex gap-5">
                            <NavigationSelect label={'Actions'}/>
                            <NavigationSelect label={'Reports'}/>
                        </div>
                    </div>

                    <div className="flex flex-grow basis-0 justify-end">
                        {
                            authState?.isAuthenticated ? (
                                <ProfileMenu logOutHandler={loggingOut}/>
                            ) : (
                                <Button className="hidden md:block hover:scale-105 bg-black"
                                    onClick={loggingIn}>Sign In</Button>
                            )
					    }

                        <div className="md:hidden">
                            <button className="p-1 text-black hover:scale-125 cursor-pointer"
                                onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? (<GrClose size="1.5rem"/>) 
                                : (<GiHamburgerMenu size="1.5rem" />)}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className={menuOpen 
                ? "fixed left-0 top-0 w-full h-screen bg-black text-white px-10 py-20 ease-in duration-500" 
                : "fixed left-[-100%] top-0 w-full h-screen px-10 py-16 ease-in duration-500"}>
                <div className="flex flex-col items-center">
                    <ul className="flex flex-col gap-1 [&>*>li]:transition-colors [&>*>li]:duration-400 
                        [&>*>li]:text-current [&>*>li]:font-medium [&>*>li]:px-4 [&>*>li]:py-2
                        [&>*>li]:cursor-pointer">
                        <Link to="/">
                            <li className="border-white hover:text-white hover:scale-105 hover:border-b-2" 
                                onClick={() => setMenuOpen(!menuOpen)}>Menu 1</li>
                        </Link>
                        <Link to="/">
                            <li className="border-white hover:text-white hover:scale-105 hover:border-b-2"
                                onClick={() => setMenuOpen(!menuOpen)}>Menu 2</li>
                        </Link>
                        <Link to="/">
                            <li className="border-white hover:text-white hover:scale-105 hover:border-b-2"
                                onClick={() => setMenuOpen(!menuOpen)}>Menu 3</li>
                        </Link>
                    </ul>
                </div>
            </div>

        </header>
	);
};

export default AppNavbar;