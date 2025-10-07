import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import GenerateBtn from "../components/GenerateBtn";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen py-10">
      <Header />
      <Steps  />
      <Description />
      <GenerateBtn />
      <Footer />
    </div>
  );
}