import { Navbar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar fluid rounded className="shadow-md">
        <Navbar.Brand as={Link}>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-emerald-700">
            I hate PDF
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>

      <Outlet />
    </>
  );
}
