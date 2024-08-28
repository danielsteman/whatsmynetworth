import { IoIosLink } from "react-icons/io";
import MenuItem from "../components/MenuItem";
import { MdAccountCircle } from "react-icons/md";

const Settings = () => {
  return (
    <div className="flex flex-row p-4">
      <div className="flex flex-col">
        <MenuItem
          label="Account"
          icon={MdAccountCircle}
          active={false}
          href="settings/account"
        />
        <MenuItem
          label="Connections"
          icon={IoIosLink}
          active={true}
          href="connections"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Settings;
