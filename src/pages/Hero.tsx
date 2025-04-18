import { FaMarkdown, FaDownload, FaRocket } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import usePopupBackDrop from "../hooks/usePopupBackdrop";
import Auth from "./Auth";

export default function Hero() {
  const navigate = useNavigate();
  const {
    BackDrop: AuthBackDrop,
    openPopup: openAuthLay,
    closePopup: closeAuthLay,
  } = usePopupBackDrop({ animate: false });

  return (
    <>
      <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12 relative isolate">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle ,rgba(0, 0, 0, 0.1) 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="absolute top-7 right-7">
          <button
            onClick={openAuthLay}
            className="bg-indigo-500 text-sm text-white px-5 py-2.5 rounded-2xl font-medium shadow hover:bg-indigo-600 transition flex items-center gap-2 border border-transparent hover:border-indigo-500 hover:bg-transparent hover:text-indigo-500"
          >
            Login/Register
          </button>
        </div>

        <div className="max-w-4xl text-center font-outfit">
          <div className="text-indigo-500 mb-4 inline-flex justify-center items-center gap-2 text-4xl">
            <FaMarkdown />
            <h1 className="font-bold">InkMark</h1>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-neutral-700 mb-4">
            Create, Edit, Organize, and Export Your
            <span className="block mt-2">Markdown Files</span>
          </h2>

          <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            A powerful markdown workspace built for developers and writers.
            Save, track, and export your notes with ease—anytime, anywhere.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/md/create")}
              className="bg-indigo-500 text-white px-6 py-3 rounded-2xl font-medium shadow hover:bg-indigo-600 transition flex items-center gap-2"
            >
              <FiFileText />
              Create Markdown
            </button>

            <button
              onClick={() => navigate("/md/create")}
              className="border border-indigo-500 text-indigo-500 px-6 py-3 rounded-2xl font-medium hover:bg-indigo-50 transition flex items-center gap-2"
            >
              <FaDownload />
              Export Docs
            </button>
          </div>

          <div className="mt-10 text-sm text-neutral-500 flex justify-center items-center gap-2">
            <FaRocket className="text-indigo-400" />
            <span>Fast. Minimal. Developer Friendly.</span>
          </div>
        </div>
      </section>
      <AuthBackDrop>
        <Auth closeAuthLay={closeAuthLay} />
      </AuthBackDrop>
    </>
  );
}
