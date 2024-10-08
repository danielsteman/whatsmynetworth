import { IconType } from "react-icons";

type MenuItemProps =
  | {
      label: string;
      icon: IconType;
      active: boolean;
      href: string;
      clickHandler?: never;
    }
  | {
      label: string;
      icon: IconType;
      active: boolean;
      href?: never;
      clickHandler: () => void;
    };

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon: Icon,
  active,
  clickHandler,
  href,
}) => {
  const activeStyle =
    "flex flex-row items-center gap-1 p-2 rounded-lg bg-white border-2 shadow-md border-gray-50 cursor-pointer";
  const inActiveStyle =
    "text-neutral-500 flex flex-row items-center gap-1 p-2 border-2 border-transparent rounded-lg hover:bg-neutral-200 hover:border-gray-50 cursor-pointer";
  const content = (
    <>
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </>
  );
  if (clickHandler) {
    return (
      <div
        onClick={() => clickHandler()}
        className={active ? activeStyle : inActiveStyle}
      >
        {content}
      </div>
    );
  } else if (href) {
    return (
      <a href={href} className={active ? activeStyle : inActiveStyle}>
        {content}
      </a>
    );
  }
  return null;
};

export default MenuItem;
