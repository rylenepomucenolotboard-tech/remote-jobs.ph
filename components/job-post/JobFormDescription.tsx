'use client';

interface JobFormDescriptionProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function JobFormDescription({ formData, handleChange }: JobFormDescriptionProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-navy-900 uppercase tracking-wider">Job Description</label>
                        <span className="text-xs text-navy-400 font-medium">Character count: {formData.description.length}</span>
                    </div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input-field min-h-[250px] resize-none leading-relaxed"
                        placeholder="Describe the role and responsibilities..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Requirements</label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="input-field min-h-[150px] resize-none leading-relaxed"
                        placeholder="List the skills and qualifications needed..."
                    />
                </div>
            </div>
        </div>
    );
}
