import axios from "axios";

export async function compactarImagem(file: File) {
  const formData = new FormData();
  formData.append("file_name", file.name);
  formData.append("qlt", "80");
  formData.append("token", import.meta.env.VITE_SQUEEZE_API_KEY);
  formData.append("method", "compress");
  formData.append("file", file);

  const response = await axios.post(
    "https://api.squeezeimg.com/plugin",
    formData,
    {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (response.status !== 200) {
    return;
  }

  return response.data;
}
