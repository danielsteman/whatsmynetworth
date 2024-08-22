"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./newAccountMenuSlice";
import NewAccountOverlay from "./NewAccountOverlay";
import NewAccountMenu from "./NewAccountMenu";
import { Session } from "next-auth";

export interface CurrentUserSessionProps {
  currentUser: Session;
}

const NewAccountButton: React.FC<CurrentUserSessionProps> = ({
  currentUser,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.newAccountMenu.open);
  return (
    <>
      <button onClick={() => dispatch(toggleMenu())}>
        <div className="flex flex-row gap-1 p-2 pr-3 bg-darkgray font-medium text-sm text-white rounded-lg hover:opacity-85">
          <FiPlus size={20} />
          <div>New Account</div>
        </div>
      </button>
      {open && (
        <NewAccountOverlay>
          <NewAccountMenu currentUser={currentUser} />
        </NewAccountOverlay>
      )}
    </>
  );
};

export default NewAccountButton;
