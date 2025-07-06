import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag, LogOut } from "lucide-react";
import { ChatDialog } from "./ChatDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-4 w-full">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="163"
            height="38"
            viewBox="0 0 163 38"
          >
            <g id="Logo" transform="translate(-260 -51)">
              <g id="Logo-2" data-name="Logo" transform="translate(260 51)">
                <g id="Elements">
                  <path
                    id="Path_1429"
                    data-name="Path 1429"
                    d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                    transform="translate(-270.155 -115.396)"
                    fill="#f29f05"
                  ></path>
                  <path
                    id="Path_1430"
                    data-name="Path 1430"
                    d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                    transform="translate(-264.176 -113.935)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1431"
                    data-name="Path 1431"
                    d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                    transform="translate(-266.247 -108.544)"
                    fill="#363636"
                  ></path>
                  <path
                    id="Path_1432"
                    data-name="Path 1432"
                    d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                    transform="translate(-264.027 -108.446)"
                    fill="#363636"
                  ></path>
                  <path
                    id="Path_1433"
                    data-name="Path 1433"
                    d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                    transform="translate(-271.815 -108.923)"
                    fill="#f29f05"
                  ></path>
                  <path
                    id="Path_1434"
                    data-name="Path 1434"
                    d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                    transform="translate(-264.154 -116.667)"
                    fill="#f29f05"
                  ></path>
                  <path
                    id="Path_1435"
                    data-name="Path 1435"
                    d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                    transform="translate(-270.84 -107.068)"
                    fill="#363636"
                  ></path>
                  <path
                    id="Path_1436"
                    data-name="Path 1436"
                    d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                    transform="translate(-269.379 -105.218)"
                    fill="#363636"
                  ></path>
                </g>
              </g>
              <text
                id="menubot"
                transform="translate(320 77)"
                fill="#363636"
                font-size="20"
                font-family="Poppins"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  MENU
                </tspan>
                <tspan y="0" fill="#f29f05">
                  BOT
                </tspan>
              </text>
            </g>
          </svg>
        </Link>
      </div>

      <div className="hidden lg:flex items-center space-x-8">
        <Link to="/" className="hover:text-orange-500 font-medium">
          Home
        </Link>
        <Link to="/about" className="hover:text-orange-500 font-medium">
          About Us
        </Link>
        <Link to="/restaurants" className="hover:text-orange-500 font-medium">
          Restaurants
        </Link>
        <Link to="/menu" className="hover:text-orange-500 font-medium">
          Menu
        </Link>
        <Link to="/contact" className="hover:text-orange-500 font-medium">
          Contact
        </Link>
        <Link to="/admin" className="hover:text-orange-500 font-medium">
          Admin
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <ShoppingBag className="h-6 w-6" />
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full flex items-center gap-2 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-orange-500 bg-white hover:text-orange-600"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Register
            </Button>
          </div>
        )}
        <Button
          onClick={() => setIsChatOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
        >
          ORDER NOW
        </Button>
      </div>

      <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
};

export default Navbar;
