import Background from "../components/Background";
import { AiOutlineDisconnect } from "react-icons/ai";

export default function NotFound() {
  return (
    <Background>
      <div className="w-full flex items-center justify-center text-[#f6f6f8]">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Ícone */}
          <AiOutlineDisconnect fontSize={100} className="text-[#135bec]" />

          {/* Textos */}
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-[-0.033em]">
              404
            </h1>

            <h2 className=" text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
              Página não encontrada
            </h2>

            <p className="mt-2 max-w-md mx-auto  text-base sm:text-lg font-normal leading-normal text-[#979eaa]">
              Desculpe, a página que você está procurando não existe ou foi
              movida.
            </p>
          </div>

          {/* Botão */}
          <a
            href="/"
            className="flex min-w-[84px] max-w-[480px] h-12 px-8 items-center justify-center 
                       rounded-lg bg-[#135bec] text-white font-bold text-base tracking-[0.015em]
                       hover:bg-[#135bec]/90 transition-colors cursor-pointer 
                       focus:outline-none focus:ring-2 focus:ring-[#3C7CFF]/40 
                       focus:ring-offset-2 mt-4"
          >
            <span className="truncate">Voltar para a página inicial</span>
          </a>
        </div>
      </div>
    </Background>
  );
}
