// upload component
export default function Upload({ preview, error, dragOver, setDragOver, onDrop, onFileSelect, fileRef, PRIMARY, labelCls, focused, setFocused, text }) {
    return (
        <div style={{ animation: "slideUp 0.5s .34s both" }}>
            <label
                className={labelCls}
                style={{ color: dragOver || focused === "screenshot" ? PRIMARY : "#9ca3af" }}
            >
                {text}
            </label>

            <div
                onClick={() => fileRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onFocus={() => setFocused("screenshot")}
                onBlur={() => setFocused(null)}
                className="relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden"
                style={{
                    borderColor: error ? "#ef4444" : dragOver ? PRIMARY : "#d1d5db",
                    background: dragOver ? "rgba(1,137,199,0.04)" : "#fafafa",
                    minHeight: preview ? "auto" : "130px",
                }}
            >
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full rounded-xl object-cover max-h-48"
                        />

                        <div
                            className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100
                            transition-opacity duration-200"
                            style={{ background: "rgba(0,0,0,0.42)" }}
                        >
                            <span className="text-white text-sm font-semibold">Click to replace</span>
                        </div>

                        <div
                            className="absolute top-2 right-2 px-2.5 py-0.5 rounded-md text-xs font-semibold text-white"
                            style={{ background: PRIMARY }}
                        >
                            ✓ Uploaded
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 gap-2">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-200"
                            style={{
                                background: dragOver ? "rgba(1,137,199,0.1)" : "rgba(1,137,199,0.05)",
                                border: `1px solid ${dragOver ? PRIMARY : "rgba(1,137,199,0.2)"}`,
                                transform: dragOver ? "scale(1.12)" : "scale(1)",
                            }}
                        >
                            📸
                        </div>

                        <p className="text-gray-500 text-sm">
                            <span style={{ color: PRIMARY, fontWeight: 600 }}>Click to upload</span> or drag & drop
                        </p>

                        <p className="text-gray-400 text-xs">PNG, JPG, WEBP supported</p>
                    </div>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => onFileSelect(e.target.files[0])}
                />
            </div>

            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
        </div>
    )
}