// import components
import SectionHeader from "../../components/utils/SectionHeader";
import CollageGrid from '../../components/college/CollageGrid';

// seminar images data
const seminarImages = [
    {
        src: "/images/college/college1.jpeg",
        sub: "Bridging the gap between talent and next-gen technology.",
        span: "col-span-1 h-[380px]"
    },
    {
        src: "/images/college/college2.jpeg",
        sub: "Scaling human potential through advanced engineering workflows.",
        span: "col-span-1 md:col-span-2 h-[380px]"
    },
    {
        src: "/images/college/college3.jpeg",
        sub: "Shift perspective from replacement to professional elevation.",
        span: "col-span-1 md:col-span-2 h-[380px]"
    },
    {
        src: "/images/college/college4.jpeg",
        sub: "Building a future where human intuition meets machine scale.",
        span: "col-span-1 h-[380px]"
    },
    {
        src: "/images/college/college5.jpeg",
        sub: "How intelligence transformation is reshaping modern engineering roles.",
        span: "col-span-1 h-[380px]"
    },
    {
        src: "/images/college/college6.jpeg",
        sub: "Equipping student communities with real-world industry tools.",
        span: "col-span-1 md:col-span-2 h-[380px]"
    }
];

// seminar section
export default function SeminarSection() {
    return (
        <section
            id='seminar'
            className="py-24 px-6 bg-slate-50/50 overflow-hidden scroll-mt-10"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <SectionHeader
                    title="On-Campus"
                    highlight="Seminars & Workshops"
                    description="Glance through our latest academic engagements where we decode engineering frameworks and AI paradigms for student groups."
                />

                {/* Grid Collage */}
                <CollageGrid seminarImages={seminarImages} />
            </div>
        </section>
    );
}