function Features() {
  return (
    <section className="px-12 py-28">
      <h2 className="text-white text-6xl font-bold text-center">
        Features
      </h2>

      <p className="text-gray-400 text-2xl text-center mt-6 leading-snug">
        Everything you need to understand
        <br />
        our software architecture.
      </p>

      {/* Cards */}

  <div className="flex justify-center gap-20 mt-24">

    {/* Card 1 */}

    <div className="w-[400px] min-h-[390px] bg-[#1E293B] border border-gray-600 rounded-3xl px-12 py-10 flex flex-col hover:scale-105 transition duration-300">

      <h3 className="text-white text-5xl font-bold leading-tight">
        Open API
        <br />
        Parsing
      </h3>

      <p className="text-gray-400 text-2xl mt-auto leading-snug">
        Upload OpenAPI specs
        <br />
        and instantly generate
        <br />
        clean, interactive API
        <br />
        diagrams.
      </p>

    </div>

    {/* Card 2 */}

    <div className="w-[400px] min-h-[390px] bg-[#1E293B] border border-gray-600 rounded-3xl px-12 py-10 flex flex-col hover:scale-105 transition duration-300">

      <h3 className="text-white text-5xl font-bold leading-tight">
        SQL Schema
        <br />
        Support
      </h3>

      <p className="text-gray-400 text-2xl mt-auto leading-snug">
        Import SQL schemas
        <br />
        and visualize tables,
        <br />
        keys and relationships
        <br />
        effortlessly.
      </p>

    </div>

    {/* Card 3 */}

    <div className="w-[400px] min-h-[390px] bg-[#1E293B] border border-gray-600 rounded-3xl px-12 py-10 flex flex-col hover:scale-105 transition duration-300">

      <h3 className="text-white text-5xl font-bold leading-tight">
        Interactive
        <br />
        Diagrams
      </h3>

      <p className="text-gray-400 text-2xl mt-auto leading-snug">
        Explore architecture
        <br />
        and database
        <br />
        diagrams with zoom,
        <br />
        pan and explore.
      </p>

    </div>

  </div>
    </section>
  );
}

export default Features;