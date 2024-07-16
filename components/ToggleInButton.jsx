import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

function ToggleInButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-15 text-lg">
        <Button variant="icon">
          <FaUserCircle style={{fontSize: "1.5rem"}}></FaUserCircle>
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start" sideOffset={25}>
        <DropdownMenuItem>
          <Link
            href="/"
            className="flex align-center gap-x-2 text-lg"
          >
            SignOut
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ToggleInButton;
