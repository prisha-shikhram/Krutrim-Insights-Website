// import components
import { FieldError } from "./FieldError";

// import icons
import { Calendar, ChevronDown, School, BookOpen, Clock, CheckCircle2 } from "lucide-react";

// academic section component
export default function AcademicSection({ sectionTitleCls, PRIMARY, labelCls, labelStyle, inputCls, errors, formData, selectCls, fp }) {
    return (
        <section>
            <h2
                className={sectionTitleCls}
                style={{ color: PRIMARY }}
            >
                <School size={20} /> Academic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* College Name */}
                <div className="md:col-span-2">
                    <label
                        className={labelCls}
                        style={labelStyle("collegeName")}
                    >
                        College / Institution Name
                    </label>

                    <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("collegeName")}
                            required
                            className={inputCls}
                            placeholder="e.g. Stanford University"
                            value={formData.collegeName}
                        />
                    </div>

                    <FieldError msg={errors.collegeName} />
                </div>

                {/* Course */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("course")}
                    >
                        Course / Programme
                    </label>

                    <div className="relative select-group">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("course")}
                            className={selectCls}
                            required
                            value={formData.course}
                        >
                            <option value="">Select Course</option>

                            {["BCA", "MCA", "Btech", "Mtech", "BBA", "MBA", "Other"].map(c => (
                                <option
                                    key={c}
                                    value={c}
                                >
                                    {c}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none 
                            ransition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.course} />
                </div>

                {/* Conditional Other Course Field */}
                {formData.course === "Other" && (
                    <div>
                        <label className={labelCls} style={labelStyle("otherCourse")}>Specify Course</label>

                        <div className="relative">
                            <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                            <input
                                {...fp("otherCourse")}
                                required
                                className={inputCls}
                                placeholder="Enter your course name"
                                value={formData.otherCourse}
                            />
                        </div>

                        <FieldError msg={errors.otherCourse} />
                    </div>
                )}

                {/* Year */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("year")}
                    >
                        Year of Study
                    </label>

                    <div className="relative select-group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("year")}
                            className={selectCls}
                            required
                            value={formData.year}
                        >
                            <option value="">Select Year</option>

                            {[1, 2, 3, 4].map(y => (
                                <option
                                    key={y}
                                    value={y}
                                >
                                    Year {y}
                                </option>
                            ))}

                            <option value="Pass out">Pass out</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                            pointer-events-none transition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.year} />
                </div>

                {/* Enrolling For */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("enrollingFor")}
                    >
                        Programme Enrolling For
                    </label>

                    <div className="relative select-group">
                        <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("enrollingFor")}
                            className={selectCls}
                            required
                            value={formData.enrollingFor}
                        >
                            <option value="">Select Enrollment Program</option>

                            {[
                                "Agentic AI with Data Analysis",
                                "Data Analysis powered by Next GenAI",
                                "Web Development with AI",
                                "AI for Business and Management",
                            ].map(p => (
                                <option
                                    key={p}
                                    value={p}
                                >
                                    {p}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none 
                            transition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.enrollingFor} />
                </div>

                {/* Duration */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("duration")}
                    >
                        Duration (Years)
                    </label>

                    <div className="relative select-group">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("duration")}
                            className={selectCls}
                            required
                            value={formData.duration}
                        >
                            <option value="">Select Duration</option>

                            {[1, 2, 3, 4].map(d => (
                                <option
                                    key={d}
                                    value={d}
                                >
                                    {d} Year{d > 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none
                            transition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.duration} />
                </div>
            </div>
        </section>
    )
}