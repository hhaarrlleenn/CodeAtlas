import {
  HiOutlineCodeBracket,
  HiOutlineCircleStack,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
} from "react-icons/hi2";

function About() {
  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* Heading */}

      <section className="px-12 pt-24">

        <h1 className="text-white text-6xl font-bold text-center">
          About CodeAtlas
        </h1>

        <p className="text-gray-400 text-2xl text-center mt-8 max-w-5xl mx-auto leading-relaxed">
          CodeAtlas is a software visualization platform that transforms
          OpenAPI specifications and SQL schema files into interactive
          architecture and database diagrams, helping developers
          understand complex software systems quickly and efficiently.
        </p>

      </section>

      {/* Mission */}

      <section className="px-12 mt-28">

        <div className="max-w-6xl mx-auto bg-[#1E293B] border border-gray-700 rounded-3xl p-12">

          <h2 className="text-white text-4xl font-bold">
            Our Mission
          </h2>

          <p className="text-gray-400 text-2xl mt-6 leading-relaxed">
            To simplify software architecture visualization by converting
            technical specifications into clear, interactive diagrams
            that improve understanding, collaboration and productivity.
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="px-12 mt-28">

        <h2 className="text-white text-5xl font-bold text-center mb-16">
          Why Choose CodeAtlas
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-10">

          <div className="bg-[#1E293B] border border-gray-700 rounded-3xl p-10">
            <HiOutlineCodeBracket className="text-blue-500 text-5xl mb-6" />

            <h3 className="text-white text-3xl font-bold">
              API Visualization
            </h3>

            <p className="text-gray-400 text-xl mt-5 leading-relaxed">
              Convert OpenAPI specifications into clean and
              understandable architecture diagrams.
            </p>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-3xl p-10">
            <HiOutlineCircleStack className="text-purple-500 text-5xl mb-6" />

            <h3 className="text-white text-3xl font-bold">
              Database Analysis
            </h3>

            <p className="text-gray-400 text-xl mt-5 leading-relaxed">
              Visualize SQL schemas, table relationships,
              primary keys and foreign keys.
            </p>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-3xl p-10">
            <HiOutlineCpuChip className="text-green-500 text-5xl mb-6" />

            <h3 className="text-white text-3xl font-bold">
              Interactive Diagrams
            </h3>

            <p className="text-gray-400 text-xl mt-5 leading-relaxed">
              Explore generated architecture diagrams with
              a clean and user-friendly interface.
            </p>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-3xl p-10">
            <HiOutlineDocumentText className="text-yellow-500 text-5xl mb-6" />

            <h3 className="text-white text-3xl font-bold">
              Faster Understanding
            </h3>

            <p className="text-gray-400 text-xl mt-5 leading-relaxed">
              Reduce the time required to understand
              unfamiliar software systems and databases.
            </p>
          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="px-12 mt-28">

        <h2 className="text-white text-5xl font-bold text-center">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto mt-16 bg-[#1E293B] border border-gray-700 rounded-3xl p-12">

          <div className="flex justify-between text-center">

            <div>
              <h3 className="text-white text-2xl font-semibold">
                Upload
              </h3>

              <p className="text-gray-400 mt-3">
                OpenAPI & SQL Files
              </p>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">
                Parse
              </h3>

              <p className="text-gray-400 mt-3">
                Process Specifications
              </p>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">
                Generate
              </h3>

              <p className="text-gray-400 mt-3">
                Architecture Diagrams
              </p>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">
                Explore
              </h3>

              <p className="text-gray-400 mt-3">
                Interactive Visualization
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Technologies */}

      <section className="px-12 mt-28 pb-24">

        <h2 className="text-white text-5xl font-bold text-center mb-14">
          Technologies Used
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">

          {[
            "React",
            "Vite",
            "Tailwind CSS",
            "Flask",
            "OpenAPI",
            "SQL",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl py-8 text-center"
            >
              <p className="text-white text-2xl font-semibold">
                {tech}
              </p>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default About;