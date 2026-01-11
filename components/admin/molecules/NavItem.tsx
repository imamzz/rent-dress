import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-gray-200 font-bold"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}
