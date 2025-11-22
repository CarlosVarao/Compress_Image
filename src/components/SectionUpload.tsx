import { useState, type ChangeEvent } from "react";
import { HiDocumentArrowUp, HiDocumentArrowDown } from "react-icons/hi2";
import { compactarImagem } from "../services/compressApi";
import { SyncLoader } from "react-spinners";
import { VscBracketError } from "react-icons/vsc";

// ------------------------ UTILITÁRIOS ------------------------

function formatarTamanho(bytes: number) {
  const KB = 1024;
  const MB = KB * 1024;
  if (bytes < MB) return `${(bytes / KB).toFixed(2)} KB`;
  return `${(bytes / MB).toFixed(2)} MB`;
}

function calcularReducaoPercentual(original: number, novo: number) {
  if (!original || !novo) return "—";
  const reducao = ((original - novo) / original) * 100;
  return `${reducao.toFixed(2)}%`;
}

// ------------------------ TYPES ------------------------

type ImgItem = {
  original: File;
  compressed?: File;
};

// ------------------------ COMPONENTE ------------------------

export default function SectionUpload() {
  const [imagens, setImagens] = useState<ImgItem[]>([]);
  const [openSectionImgs, setOpenSectionImgs] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [errorMensage, setErrorMensage] = useState<string | null>(null);
  const fewImages = imagens.length <= 2;

  // Entrada de arquivos
  function valuesInputFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const lista = files.map((file) => ({ original: file }));
    setImagens(lista);
    setOpenSectionImgs(false);
    setErrorMensage(null);
  }

  async function compactarImgs() {
    if (imagens.length === 0) {
      return alert("Faça upload de imagens para poder convertê-las.");
    }

    setSpinner(true);
    setErrorMensage(null);
    const listaAtualizada: ImgItem[] = [];

    try {
      for (const item of imagens) {
        const resposta = await compactarImagem(item.original);

        if (typeof resposta === "string") {
          setErrorMensage(resposta);
          return;
        }

        const fileConvertido = new File([resposta], item.original.name, {
          type: item.original.type,
        });

        listaAtualizada.push({
          original: item.original,
          compressed: fileConvertido,
        });
      }
      setImagens(listaAtualizada);
    } catch (error) {
      setErrorMensage(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    } finally {
      setSpinner(false);
    }
  }

  function downloadImagens(files: ImgItem[]) {
    files.forEach((item) => {
      const file = item.compressed || item.original;
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex flex-col gap-10 py-13">
      <div className="flex flex-col gap-7">
        {/* -------------------- TÍTULOS -------------------- */}
        <div>
          <h1 className="text-[#f6f6f8] text-4xl font-black leading-tight tracking-[-0.033em]">
            Comprima suas imagens de forma rápida e fácil.
          </h1>
          <p className="text-[#979eaa] mt-4 max-w-2xl mx-auto text-md text-center">
            Reduza o tamanho do arquivo sem perder qualidade. Perfeito para
            páginas da web, redes sociais e muito mais.
          </p>
        </div>

        {/* -------------------- ÁREA PRINCIPAL -------------------- */}
        <div className="relative max-w-[1000px] h-[400px] flex flex-col justify-center items-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/10 px-4 py-5">
          {openSectionImgs ? (
            <div className="flex flex-col items-center gap-6">
              <HiDocumentArrowUp color="#3C7CFF" fontSize={50} />
              <p className="text-[#f6f6f8] text-lg font-bold text-center max-w-[480px]">
                Arraste e solte suas imagens aqui.
              </p>
              <p className="text-[#979eaa] text-sm text-center max-w-[480px]">
                Suporta Smart AVIF, WebP, PNG e JPEG. Máx 20 imagens / 5MB.
              </p>
              <label
                htmlFor="fileInput"
                className="z-99 inline-flex items-center justify-center h-8 px-4 rounded-md bg-[#111827] text-gray-300 text-sm cursor-pointer hover:bg-[#1f2937] transition"
              >
                Select Files
              </label>
              <input
                id="fileInput"
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                multiple
                onChange={valuesInputFiles}
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              {/* Spinner */}
              {spinner && (
                <div className="absolute inset-0 flex justify-center items-center bg-[#0d121c] z-50">
                  <SyncLoader color="#3C7CFF" size={10} />
                </div>
              )}

              {/* Mensagem de erro */}
              {errorMensage && (
                <div className="absolute inset-0 flex justify-center items-center bg-[#0d121c] z-50 flex-col gap-2">
                  <VscBracketError color="#3C7CFF" size={90} />
                  <span className="text-[#f6f6f8]">{errorMensage}</span>
                </div>
              )}

              {/* Lista de imagens */}
              <div
                className={`text-[#f6f6f8] flex w-full h-full  gap-5 ${
                  fewImages
                    ? "justify-center"
                    : "justify-start overflow-x-scroll"
                }`}
              >
                {imagens.map((item, index) => {
                  const original = item.original;
                  const compressed = item.compressed;

                  return (
                    <div
                      key={index}
                      className="p-5 border-dashed bg-black/10 flex flex-col gap-4 items-center rounded-lg"
                    >
                      <img
                        src={URL.createObjectURL(original)}
                        alt="preview"
                        className="h-50 object-cover rounded-sm"
                      />
                      <div className="flex items-center justify-between w-70 text-sm">
                        <p className="max-w-[200px] truncate">
                          {original.name}
                        </p>
                        <div className="flex items-center gap-1 bg-[#1f2937] px-3 py-1 rounded-sm">
                          <HiDocumentArrowDown fontSize={19} />
                          <p>.{original.type.split("/").pop()}</p>
                        </div>
                      </div>
                      <div className="flex text-xs justify-between w-full gap-4">
                        <div>
                          <span className="font-medium">Peso Atual:</span>
                          <p>{formatarTamanho(original.size)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Peso Compress:</span>
                          <p>
                            {compressed
                              ? formatarTamanho(compressed.size)
                              : "—"}
                          </p>
                        </div>
                        <div
                          className={
                            compressed && compressed.size < original.size
                              ? "text-green-500 font-semibold"
                              : "text-gray-300"
                          }
                        >
                          <span className="font-medium">Redução:</span>
                          <p>
                            {compressed
                              ? calcularReducaoPercentual(
                                  original.size,
                                  compressed.size
                                )
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* -------------------- BOTÕES -------------------- */}
        <div className="flex gap-5 justify-center items-center">
          {/* Botão Compactar */}
          <button
            className="w-[200px] h-10 cursor-pointer text-[#f6f6f8] px-6 rounded-lg bg-[#3C7CFF] font-semibold hover:bg-[#3C7CFF]/80 transition-all duration-200"
            onClick={compactarImgs}
          >
            Compactar
          </button>

          <button
            className="w-[200px] h-10 cursor-pointer text-[#f6f6f8] px-6 rounded-lg bg-green-600 font-semibold hover:bg-green-500 transition-all duration-200"
            onClick={() => downloadImagens(imagens)}
          >
            Baixar Imagens
          </button>
        </div>
      </div>
    </div>
  );
}
