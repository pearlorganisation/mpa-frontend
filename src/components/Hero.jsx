// import { ArrowRight, BookOpen } from "lucide-react";

// const Hero = () => {
//   return (
//     <div className="">
//       <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
//         {/* Left Content */}
//         <div className="flex flex-col">
//           <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-sm font-medium w-fit mb-8">
//             <BookOpen size={14} className="text-[#22C55E]" />
//             Open Access Research
//           </div>

//           {/* <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-[1.1]">
//             <span className="text-[#713F12] block">Advancing Scientific</span>
//             <span className="text-[#22C55E] block">Excellence</span>
//           </h1> */}
//           <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
//             <span className="text-[#713F12] block">
//               Advancing Scientific
//             </span>
//             <span className="text-[#22C55E] block">
//               Excellence
//             </span>
//           </h1>


//           <p className="text-[#854D0E] text-lg max-w-lg mb-10 leading-relaxed">
//             A premier platform for publishing cutting-edge research across
//             multiple disciplines. Peer-reviewed, open access, and committed to
//             scientific excellence worldwide.
//           </p>

//           <div className="flex flex-wrap gap-4 mb-16">
//             <button className="bg-[#22C55E] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#16a34a] transition-all shadow-lg shadow-green-200">
//               Submit Manuscript <ArrowRight size={18} />
//             </button>
//             <button className="bg-white text-[#713F12] px-8 py-4 rounded-xl font-semibold border border-green-100 hover:bg-green-50 transition-all shadow-sm">
//               Browse Articles
//             </button>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-3 gap-8 border-t border-green-100 pt-8">
//             <div>
//               <div className="text-3xl font-bold text-[#22C55E]">5000+</div>
//               <div className="text-sm text-[#854D0E] mt-1">
//                 Published Articles
//               </div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-[#22C55E]">98%</div>
//               <div className="text-sm text-[#854D0E] mt-1">Quality Rate</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-[#22C55E]">2.5</div>
//               <div className="text-sm text-[#854D0E] mt-1">Impact Factor</div>
//             </div>
//           </div>
//         </div>

//         {/* Right Graphic Content */}
//         <div className="relative">
//           {/* Background Decorative Shapes */}
//           <div className="absolute -inset-4 bg-[#86EFAC]/30 blur-2xl rounded-full -z-10 transform -rotate-6"></div>

//           {/* Main Card Graphic */}
//           <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
//             {/* Abstract Document UI Mockup */}
//             <div className="space-y-4">
//               <div className="h-4 w-3/4 bg-[#BBF7D0] rounded-full"></div>
//               <div className="h-4 w-full bg-[#BBF7D0] rounded-full opacity-60"></div>
//               <div className="h-4 w-2/3 bg-[#BBF7D0] rounded-full opacity-60"></div>

//               <div className="mt-8 aspect-video bg-[#DCFCE7] rounded-xl flex items-center justify-center">
//                 <div className="w-12 h-16 border-4 border-[#86EFAC] rounded flex flex-col items-center justify-end pb-1">
//                   <div className="w-8 h-4 border-t-4 border-[#86EFAC]"></div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6">
//                 <div className="flex gap-2">
//                   <div className="w-6 h-6 rounded-full bg-[#4ADE80]"></div>
//                   <div className="w-6 h-6 rounded-full bg-[#4ADE80] opacity-80"></div>
//                   <div className="w-6 h-6 rounded-full bg-[#4ADE80] opacity-60"></div>
//                 </div>
//                 <div className="h-8 w-20 bg-[#22C55E] rounded-md"></div>
//               </div>
//             </div>

//             {/* Tilt Overlay Effect */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
//           </div>

//           {/* Secondary Layered Card behind */}
//           <div className="absolute -top-4 -right-2 -z-10 w-full h-full bg-[#86EFAC] rounded-3xl transform rotate-3 opacity-60"></div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;








import { ArrowRight, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-sm font-medium w-fit mb-6">
            <BookOpen size={14} className="text-[#22C55E]" />
            Open Access Research
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            <span className="text-[#713F12] block">
              Advancing Scientific
            </span>
            <span className="text-[#22C55E] block">
              Excellence
            </span>
          </h1>

          <p className="text-[#854D0E] text-lg max-w-lg mb-8 leading-relaxed">
            A premier platform for publishing cutting-edge research across
            multiple disciplines. Peer-reviewed, open access, and committed to
            scientific excellence worldwide.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-[#22C55E] text-white px-7 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#16a34a] transition-all shadow-md">
              Submit Manuscript <ArrowRight size={18} />
            </button>
            <button className="bg-white text-[#713F12] px-7 py-3 rounded-xl font-semibold border border-green-100 hover:bg-green-50 transition-all shadow-sm">
              Browse Articles
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 border-t border-green-100 pt-6">
            <div>
              <div className="text-2xl font-bold text-[#22C55E]">5000+</div>
              <div className="text-sm text-[#854D0E] mt-1">
                Published Articles
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#22C55E]">98%</div>
              <div className="text-sm text-[#854D0E] mt-1">Quality Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#22C55E]">2.5</div>
              <div className="text-sm text-[#854D0E] mt-1">Impact Factor</div>
            </div>
          </div>
        </div>

        {/* Right Graphic Content */}
        <div className="relative max-w-[480px] w-full mx-auto">

          {/* Background Decorative Shape */}
          <div className="absolute -inset-4 bg-[#86EFAC]/30 blur-2xl rounded-full -z-10 -rotate-6"></div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden min-h-[500px]">

            <div className="space-y-3">
              <div className="h-3 w-3/4 bg-[#BBF7D0] rounded-full"></div>
              <div className="h-3 w-full bg-[#BBF7D0] rounded-full opacity-60"></div>
              <div className="h-3 w-2/3 bg-[#BBF7D0] rounded-full opacity-60"></div>

              {/* Green Image Box */}
              <div className="mt-5 h-[170px] bg-[#DCFCE7] rounded-xl flex items-center justify-center">
                <div className="w-10 h-14 border-4 border-[#86EFAC] rounded flex flex-col items-center justify-end pb-1">
                  <div className="w-6 h-3 border-t-4 border-[#86EFAC]"></div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#4ADE80]"></div>
                  <div className="w-5 h-5 rounded-full bg-[#4ADE80] opacity-80"></div>
                  <div className="w-5 h-5 rounded-full bg-[#4ADE80] opacity-60"></div>
                </div>
                <div className="h-7 w-16 bg-[#22C55E] rounded-md"></div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Back Layer */}
          <div className="absolute -top-3 -right-2 -z-10 w-full h-full bg-[#86EFAC] rounded-3xl rotate-3 opacity-60"></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
