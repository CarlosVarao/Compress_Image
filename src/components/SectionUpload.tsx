import { useState, type ChangeEvent } from "react";
import { HiDocumentArrowUp, HiDocumentArrowDown } from "react-icons/hi2";

export default function SectionUpload() {
  const [dataValuesInput, setDataValuesInput] = useState<File[] | []>([]);

  function valuesInputFiles(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
    const files = Array.from(e.target.files || []);
    setDataValuesInput(files);
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-13">
          <div>
            <h1 className="text-[#f6f6f8] text-5xl font-black leading-tight tracking-[-0.033em]">
              Comprima suas imagens de forma rápida e fácil.
            </h1>
            <p className="text-[#979eaa] mt-4 max-w-2xl mx-auto  dark:text-gray-400 text-lg font-normal leading-normal text-center">
              Reduza o tamanho do arquivo sem perder qualidade. Perfeito para
              páginas da web, redes sociais e muito mais.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/10 px-6 py-14">
            <HiDocumentArrowUp color="#3C7CFF" fontSize={50} />
            <p className="text-[#f6f6f8] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
              Arraste e solte suas imagens aqui.
            </p>
            <p className="text-[#979eaa] text-sm font-normal leading-normal max-w-[480px] text-center">
              Suporta Smart AVIF, WebP, PNG e JPEG. Máximo de 20 imagens e
              máximo de 5 MB por imagem.
            </p>
            <div>
              <label
                htmlFor="fileInput"
                className="inline-flex items-center justify-center h-8 px-4 rounded-md bg-[#111827] text-gray-300 text-sm font-medium cursor-pointer hover:bg-[#1f2937] transition"
              >
                Select Files
              </label>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                multiple
                onChange={valuesInputFiles}
              />
            </div>
          </div>
        </div>

        <div className="text-[#f6f6f8] flex gap-5 justify-center">
          {dataValuesInput.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-sm p-4 border-dashed bg-black/10 flex items-center gap-20"
            >
              <div>
                <img
                  src={URL.createObjectURL(item)}
                  alt="sdsd"
                  className="w-17 rounded-sm"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p>{item.name}</p>
                <div className="flex items-center justify-center gap-1 bg-[#1f2937] px-3 py-1 rounded-sm">
                  <HiDocumentArrowDown fontSize={19} />
                  <p>{"." + item.type.split("/").pop()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
