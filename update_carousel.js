const fs = require('fs');
const file = 'app/results/page.tsx';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

const newCarousel = `        {/* High-End Editorial Borderless Carousel (Phase 23) */}
        <div 
          className="relative w-full max-w-6xl mx-auto mt-16 md:mt-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 pb-24" 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Body: Enormous Quote */}
          <div className="w-full lg:w-3/4 flex flex-col justify-center relative z-20">
            <div key={\`\${animKey}-text\`} className="animate-cinematic-drift opacity-0 [animation-fill-mode:forwards]">
              {/* Massive subtle quote mark behind text */}
              <div className="text-[180px] md:text-[240px] font-sans text-white/5 leading-none absolute -top-16 md:-top-24 -left-8 md:-left-16 -z-10 select-none">"</div>
              
              <h2 className="text-4xl md:text-5xl lg:text-[72px] font-sans font-medium italic text-white leading-[1.05] tracking-tight mb-12 relative z-10 text-balance drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                "{activeStory.quote}"
              </h2>

              <div className="flex flex-col md:flex-row md:items-center gap-3 text-navy-200">
                <div className="text-2xl font-black text-white">{activeStory.name}</div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-cyber opacity-80"></div>
                <div className="text-lg font-medium tracking-wide">{activeStory.role} {activeStory.source ? \`at \${activeStory.source}\` : ''}</div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="text-sm font-semibold text-accent-cyber tracking-widest uppercase">{activeStory.tag}</div>
              </div>

              {/* Minimalist Dot Indicators */}
              <div className="flex gap-3 mt-16">
                {filteredStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={\`h-1.5 rounded-full transition-all duration-700 ease-out \${i === carouselIndex ? 'w-16 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'w-6 bg-white/20 hover:bg-white/40'}\`}
                    aria-label={\`Go to story \${i + 1}\`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Photo Layout: Pure CSS Silhouette Pop-Out */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end relative pointer-events-none mt-12 lg:mt-0">
            <div key={\`\${animKey}-avatar\`} className="animate-cinematic-drift opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '300ms' }}>
              
              <div className="css-avatar-base">
                 {/* Radial base glow anchoring it to canvas */}
                 <div className={\`css-avatar-glow \${getAvatarGradient(carouselIndex).glow}\`}></div>
                 
                 {/* The Pop-Out Silhouette Geometry */}
                 <div className="css-avatar-person">
                   <div className={\`css-avatar-head bg-gradient-to-br \${getAvatarGradient(carouselIndex).base}\`}></div>
                   <div className={\`css-avatar-body bg-gradient-to-tr \${getAvatarGradient(carouselIndex).base}\`}></div>
                 </div>
              </div>

            </div>
          </div>

        </div>`;

// Lines 242-308 are index 241 through 307
const before = lines.slice(0, 241);
const after = lines.slice(308);

fs.writeFileSync(file, [...before, newCarousel, ...after].join('\n'));
console.log('Successfully updated the carousel structure!');
