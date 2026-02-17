import CandidateCard from './CandidateCard';

export default function FeaturedTalent() {
    return (
        <section className="py-20">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-2xl">
                    🏆
                </div>
                <div>
                    <h2 className="text-4xl font-black text-navy-950">Featured Elite Talent</h2>
                    <p className="text-navy-500 font-bold uppercase tracking-widest text-xs mt-1">Top 1% of Filipino Remote Professionals</p>
                </div>
            </div>

            <div className="space-y-6">
                <CandidateCard
                    name="John Doe"
                    title="Senior Full Stack Developer"
                    skills={['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL']}
                    isTopRated={true}
                />
                <CandidateCard
                    name="Jane Smith"
                    title="Lead UI/UX Designer"
                    skills={['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Web Design']}
                    isTopRated={true}
                />
                <CandidateCard
                    name="Michael Chen"
                    title="DevOps Architect"
                    skills={['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Azure']}
                    isTopRated={true}
                />
            </div>

            <div className="mt-12 text-center">
                <button className="btn-outline !px-12">
                    View All Elite Talent
                </button>
            </div>
        </section>
    );
}
