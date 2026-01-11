"use client";

import Dashboard from "../../icons/Dashboard";
import Package from "../../icons/Package";
import Ruler from "../../icons/Ruler";
import Grid from "../../icons/Grid";
import Palette from "../../icons/Palette";
import ShoppingBag from "../../icons/ShoppingBag";
import Users from "../../icons/Users";
import FileBarChart from "../../icons/FileBarChart";
import NavItem from "../molecules/NavItem";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: <Dashboard /> },
  { href: "/products", label: "Products", icon: <Package /> },
  { href: "/categories", label: "Categories", icon: <Grid /> },
  { href: "/sizes", label: "Sizes", icon: <Ruler /> },
  { href: "/colors", label: "Colors", icon: <Palette /> },
  { href: "/orders", label: "Orders", icon: <ShoppingBag /> },
  { href: "/users", label: "Users", icon: <Users /> },
  { href: "/reports", label: "Reports", icon: <FileBarChart /> },
] as const;

const Sidebar = () => {
  return (
    <aside className="w-56 border-r border-gray-100 min-h-[calc(100vh-73px)]">
      <nav className="p-6">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
