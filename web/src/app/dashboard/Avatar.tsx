import React from "react";

interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  const firstLetter = Array.from(username)[0].toUpperCase();
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white text-xl font-medium">
      {firstLetter}
    </div>
  );
};

export default Avatar;
