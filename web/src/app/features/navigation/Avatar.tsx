import React from "react";

interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  const firstLetter = Array.from(username)[0].toUpperCase();
  return (
    <div className="text-white w-9 h-9 bg-neutral-400 rounded-full flex items-center justify-center text-lg uppercase cursor-pointer">
      {firstLetter}
    </div>
  );
};

export default Avatar;
