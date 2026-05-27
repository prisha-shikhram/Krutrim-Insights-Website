// import components
import { FieldError } from "./FieldError";
import Upload from "../../projectForm/Upload";

// import icons
import { ShieldCheck, AlertCircle, FileText, ChevronDown } from "lucide-react";

// identity section component
export default function IdentitySection({
    sectionTitleCls, PRIMARY, labelCls, labelStyle, inputCls, errors, formData, selectCls, fp,
    uploadError, preview, dragOver, setDragOver, focused, setFocused, onDrop, handleFileSelect, fileRef,
}) {
    return (
        <section className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
            <h2
                className={sectionTitleCls}
                style={{ color: PRIMARY }}
            >
                <ShieldCheck size={20} /> Identity Proof
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID Type */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("idType")}
                    >
                        ID Type
                    </label>

                    <div className="relative select-group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("idType")}
                            className={selectCls}
                            value={formData.idType}
                        >
                            {["Aadhaar Card", "PAN Card", "Driving Licence", "Voter ID", "Other"].map(id => (
                                <option
                                    key={id}
                                    value={id}
                                >
                                    {id}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none 
                            transition-transform duration-200"
                        />
                    </div>
                </div>

                {/* Other ID Type */}
                {formData.idType === "Other" && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <label
                            className={labelCls}
                            style={labelStyle("otherIdType")}
                        >
                            Specify Identity Proof
                        </label>

                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                            <input
                                {...fp("otherIdType")}
                                required
                                className={inputCls}
                                placeholder="e.g. Passport"
                                value={formData.otherIdType}
                            />
                        </div>

                        <FieldError msg={errors.otherIdType} />
                    </div>
                )}

                {/* ID Number */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("idNumber")}
                    >
                        Proof / ID Number
                    </label>

                    <div className="relative">
                        <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("idNumber")}
                            required
                            className={inputCls}
                            placeholder="Enter your ID Number"
                            value={formData.idNumber}
                        />
                    </div>

                    <FieldError msg={errors.idNumber} />
                </div>

                {/* Upload */}
                <div className="md:col-span-2">
                    <section className="bg-blue-50/30 p-6 rounded-3xl border border-blue-100/50">
                        <Upload
                            preview={preview}
                            error={uploadError || errors.idProof}
                            dragOver={dragOver}
                            setDragOver={setDragOver}
                            onDrop={onDrop}
                            onFileSelect={handleFileSelect}
                            fileRef={fileRef}
                            PRIMARY={PRIMARY}
                            labelCls={labelCls}
                            focused={focused}
                            setFocused={setFocused}
                            text="Identity Proof Image"
                        />
                    </section>
                </div>
            </div>
        </section>
    )
}