import { FaMarkdown, FaReact, FaCodeBranch } from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";

const About = () => {
  const buildWith = [
    { icon: <FaReact className="text-sky-500" />, name: "React" },
    { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript" },
    { icon: <SiTailwindcss className="text-cyan-500" />, name: "Tailwind CSS" },
    {
      icon: <FaMarkdown className="text-indigo-500" />,
      name: "React-markdown",
    },
  ];
  return (
    <section className="min-h-screen px-6 py-12 bg-neutral-50 text-neutral-800 font-outfit">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-500">
          About InkMark
        </h1>
        <p className="text-lg mb-10">
          <span className="font-semibold">InkMark</span> is your personal
          playground for writing, editing, and managing markdown with ease.
          Whether you're a student jotting down notes, a developer crafting
          documentation, or a writer drafting articles — InkMark gives you the
          clean, distraction-free canvas you need.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-2">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-neutral-200">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaMarkdown className="text-indigo-500" /> Features
          </h2>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>Create, edit, view and delete markdown files</li>
            <li>Track full history: created, updated, or deleted</li>
            <li>
              Export your work in <strong>.md</strong> or <strong>.pdf</strong>
            </li>
            <li>Live preview + split view markdown editor</li>
            <li>Organized file storage</li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-neutral-200">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FaCodeBranch className="text-indigo-500" /> Built With
          </h2>
          <ul className="flex flex-col gap-2 justify-center text-neutral-700 text-lg">
            {buildWith.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 text-center text-neutral-600 text-sm">
        Built with 💙 by Hp. Your markdown, your way.
      </div>
    </section>
  );
};

export default About;
