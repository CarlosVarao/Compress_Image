import { IoImages } from "react-icons/io5";

interface typesProps {
  titleMenu?: string;
  navsmenu?: string[];
}

export default function Header({
  titleMenu = "Nome_Site",
  navsmenu,
}: typesProps) {
  return (
    <div className="text-[#f6f6f8] flex items-center justify-between whitespace-nowrap border-b border-gray-200/80 dark:border-white/10 px-6 sm:px-10 lg:px-20 py-4 font-primary">
      <div className="flex items-center gap-3 ">
        <IoImages color="#3C7CFF" fontSize={30} />
        <p className="text-xl font-bold leading-tight tracking-[-0.015em]">
          {titleMenu}
        </p>
      </div>
      <div className="flex gap-6">
        {navsmenu?.map((item, index) => (
          <a
            href={item}
            className="text-[#979eaa] hover:bg-color-blue text-sm font-medium cursor-pointer hover:text-[#3C7CFF]"
            key={index}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
