import Background from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Background
        header={
          <Header
            titleMenu="ImageCompressor"
            navsmenu={["Home", "Preços", "Contatos"]}
          />
        }
        footer={<Footer />}
      ></Background>
    </>
  );
}
