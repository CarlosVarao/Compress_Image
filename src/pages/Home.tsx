import Background from "../components/Background";
import Header from "../components/Header";
import SectionUpload from "../components/SectionUpload";
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
      >
        <SectionUpload />
      </Background>
    </>
  );
}
