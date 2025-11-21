import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

export default function Footler() {
  return (
    <div className="w-full border-t border-gray-200/80 dark:border-white/10 font-primary text-sm font-normal text-[#979eaa]">
      <div className="max-w-4xl mx-auto p-10 flex flex-col gap-3">
        <div className="flex justify-between">
          <a className="cursor-pointer hover:underline">Privacy Policy</a>
          <a className="cursor-pointer hover:underline">Terms of Service</a>
        </div>
        <div className="flex justify-center gap-5">
          <a href="https://github.com/CarlosVarao" target="_blank">
            <BsGithub
              fontSize={25}
              className="cursor-pointer hover:text-[#3C7CFF]"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/carlosvaraofrontend"
            target="_blank"
          >
            <BsLinkedin
              fontSize={25}
              className="cursor-pointer hover:text-[#3C7CFF]"
            />
          </a>
        </div>
        <p className="text-center">
          © 2025 ImageCompressor. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
