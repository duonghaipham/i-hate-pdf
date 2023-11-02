import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="p-16">
      <div className="mb-12">
        <h1 className="mb-2 font-semibold text-center">Homemade PDF tools</h1>
        <p className="text-center">
          A completely frontend PDF toolset, no data is sent to any server. All
          the processing is done in your browser.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center items-center gap-2">
        <Link to="merge_pdf" className="p-6 bg-white shadow-lg rounded">
          <h2 className="mb-2 font-semibold text-2xl text-gray-700">
            Merge PDF
          </h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </Link>
        <div className="p-6 bg-white shadow-lg rounded">
          <h2 className="mb-2 font-semibold text-2xl">Split PDF</h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded">
          <h1 className="mb-2 font-semibold text-2xl">Compress PDF</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded">
          <h1 className="mb-2 font-semibold text-2xl">JPG to PDF</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded">
          <h1 className="mb-2 font-semibold text-2xl">PDF to JPG</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded">
          <h1 className="mb-2 font-semibold text-2xl">Make PDF scanned</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante
            libero, commodo non mollis vel, porttitor et nibh
          </p>
        </div>
      </div>
    </section>
  );
}
