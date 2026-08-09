import { useLayoutEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  const containerRef = useRef(null);
  const authRef = useRef(null);
  const userRef = useRef(null);
  const usersDbRef = useRef(null);
  const ordersDbRef = useRef(null);

  const [lines, setLines] = useState([]);

  const calcLines = () => {
    if (
      !containerRef.current ||
      !authRef.current ||
      !userRef.current ||
      !usersDbRef.current ||
      !ordersDbRef.current
    )
      return;

    const container = containerRef.current.getBoundingClientRect();
    const inset = 3; // gap between line end and box edge, in pixels along the line

    const getCenter = (ref) => {
      const r = ref.current.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - container.left,
        y: r.top + r.height / 2 - container.top,
        halfW: r.width / 2,
        halfH: r.height / 2,
      };
    };

    // Given two box centers, find where a straight line between them
    // crosses each box's rectangular edge, then pull back by `inset`.
    const connect = (fromRef, toRef) => {
      const a = getCenter(fromRef);
      const b = getCenter(toRef);

      const dx = b.x - a.x;
      const dy = b.y - a.y;

      // Parametric scale to hit the edge of box `a` (rectangle clip)
      const clipScale = (box, dx, dy) => {
        const scaleX = dx !== 0 ? box.halfW / Math.abs(dx) : Infinity;
        const scaleY = dy !== 0 ? box.halfH / Math.abs(dy) : Infinity;
        return Math.min(scaleX, scaleY);
      };

      const tA = clipScale(a, dx, dy);
      const tB = clipScale(b, dx, dy);

      const len = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / len;
      const uy = dy / len;

      // Point on edge of box a, then pulled back by inset
      const x1 = a.x + dx * tA + ux * inset;
      const y1 = a.y + dy * tA + uy * inset;

      // Point on edge of box b, then pulled back by inset
      const x2 = b.x - dx * tB - ux * inset;
      const y2 = b.y - dy * tB - uy * inset;

      return { x1, y1, x2, y2 };
    };

    setLines([
      connect(authRef, userRef),
      connect(userRef, usersDbRef),
      connect(userRef, ordersDbRef),
    ]);
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(calcLines);
    });

    const ro = new ResizeObserver(calcLines);
    ro.observe(containerRef.current);
    [authRef, userRef, usersDbRef, ordersDbRef].forEach((ref) => {
      if (ref.current) ro.observe(ref.current);
    });

    window.addEventListener("resize", calcLines);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calcLines);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* ================= NAVBAR ================= */}
      <nav className="h-[108px] bg-[#1E293B] flex items-center justify-between px-12">
        <h1 className="text-white text-[40px] font-bold">CodeAtlas</h1>
        <div className="flex items-center gap-16">
          <Link
  to="/"
  className="text-white text-xl font-semibold hover:text-blue-400 transition"
>
  Home
</Link>

<Link
  to="/upload"
  className="text-white text-xl font-semibold hover:text-blue-400 transition"
>
  Upload
</Link>

<Link
  to="/about"
  className="text-white text-xl font-semibold hover:text-blue-400 transition"
>
  About
</Link>
        </div>
      </nav>
{/* ================= HERO ================= */}
<section className="px-12 pt-20 pb-16 flex justify-between items-start">

  {/* Left */}
  <div className="max-w-xl">
    <h1 className="text-white text-7xl font-bold leading-tight">
      Understand
      <br />
      Software
      <br />
      Visually
    </h1>

    <p className="text-gray-400 text-2xl mt-8">
      Upload OpenAPI specifications and SQL schemas to instantly
      visualize software architecture and database relationships.
    </p>

    <Link
  to="/upload"
  className="inline-block mt-12 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-2xl font-medium px-10 py-5 rounded-2xl transition"
>
  Upload Files
</Link>
  </div>

  {/* Right: Diagram Card */}
  <div
    ref={containerRef}
    className="w-[700px] h-[520px] bg-[#1E293B] rounded-3xl border border-gray-600 relative flex flex-col justify-between py-12"
  >
    {/* SVG Lines */}
    <svg
      className="absolute inset-0 pointer-events-none"
      width="700"
      height="520"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>

    {/* Auth API */}
    <div className="flex justify-center">
      <div
        ref={authRef}
        className="bg-[#3B82F6] text-white font-semibold text-xl px-10 py-5 rounded-2xl"
      >
        Auth API
      </div>
    </div>

    {/* User Service */}
    <div className="flex justify-center">
      <div
        ref={userRef}
        className="bg-[#10B981] text-white font-semibold text-xl px-10 py-5 rounded-2xl"
      >
        User Service
      </div>
    </div>

    {/* Databases */}
    <div className="flex justify-between px-20">
      <div
        ref={usersDbRef}
        className="bg-[#8B5CF6] text-white font-semibold text-lg px-8 py-4 rounded-2xl"
      >
        Users DB
      </div>

      <div
        ref={ordersDbRef}
        className="bg-[#8B5CF6] text-white font-semibold text-lg px-8 py-4 rounded-2xl"
      >
        Orders DB
      </div>
    </div>
  </div>

</section>

     {/* ================= FEATURES ================= */}

<section className="px-12 py-28">

  {/* Heading */}

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

{/* ================= FOOTER ================= */}

<footer className="bg-[#0F172A] border-t border-gray-700 mt-20">

  <div className="max-w-7xl mx-auto px-12 py-10 flex justify-between items-start">

    {/* Left */}

    <div>
      <h2 className="text-white text-4xl font-bold mb-6">
        CodeAtlas
      </h2>

      <p className="text-gray-400 text-xl leading-10">
        Visualize.
        <br />
        Understand.
        <br />
        Build Better.
      </p>
    </div>

    {/* Right */}

    <div>
      <h3 className="text-white text-4xl font-bold mb-6">
        Connect
      </h3>

      <div className="space-y-5">

        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-gray-400 hover:text-white transition"
        >
          <FaGithub className="text-3xl" />
          <span className="text-2xl">GitHub</span>
        </a>

        <a
          href="mailto:your@email.com"
          className="flex items-center gap-4 text-gray-400 hover:text-white transition"
        >
          <MdEmail className="text-3xl" />
          <span className="text-2xl">Email</span>
        </a>

      </div>
    </div>

  </div>

  <div className="border-t border-gray-700 py-5">
    <p className="text-center text-gray-500 text-lg">
      © 2026 CodeAtlas. All rights reserved.
    </p>
  </div>

</footer>

    </div>
  );
}

export default Home;