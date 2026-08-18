import HomeContent from "./home-content";
import { JsonLd } from "./components/json-ld";
import { homeStructuredData } from "./seo-content";

export default function Page() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <HomeContent />
    </>
  );
}
