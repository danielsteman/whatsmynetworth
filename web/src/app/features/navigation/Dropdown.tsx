"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";

interface DropdownProps {
  children: ReactNode;
}

interface DropdownItemProps {
  label: string;
  logo: ReactNode;
  href?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  logo,
  href,
  buttonProps,
}) => {
  const content = (
    <div className="flex flex-row gap-2 items-center rounded-md py-1 px-2 hover:bg-neutral-300">
      {logo}
      <span className="font-medium text-sm text-left">{label}</span>
    </div>
  );
  return href ? (
    <Link href={href}>{content}</Link>
  ) : (
    <button className="font-medium text-sm text-left" {...buttonProps}>
      {content}
    </button>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSignout = () => signOut();

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      <div onClick={() => setToggle(!toggle)}>{children}</div>
      {toggle && (
        <div className="flex flex-col gap-2 absolute top-10 w-fit bg-neutral-200 p-2 rounded-md min-w-32">
          <DropdownItem
            label="Settings"
            logo={<FiSettings />}
            href="/settings"
          />
          <DropdownItem
            label="Connections"
            logo={<IoIosLink />}
            href="/settings"
          />
          <DropdownItem
            label="Sign out"
            logo={<FiLogOut />}
            buttonProps={{ onClick: handleSignout }}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
