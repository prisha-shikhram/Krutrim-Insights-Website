// import usestate
import { useState } from 'react';

// FAQ data
const faqData = [
    {
        question: "Who is this course for?",
        answer: "This course is designed for students, fresh graduates, and working professionals who want to build practical, job-relevant AI skills. Beginners are welcome."
    },
    {
        question: "What will I learn in this course?",
        answer: "You will learn web fundamentals, data handling, machine learning, and applied AI workflows through hands-on projects and real-world use cases."
    },
    {
        question: "What if I miss a live lecture?",
        answer: "Recorded sessions will be available, allowing you to catch up at your own pace. Additionally you can also take an extra class from the instructor."
    },
    {
        question: "What kind of projects will I work on?",
        answer: "You will work on industry-inspired projects like Smart Traffic Monitoring, Hand movement detection, SaaS websites, LLM(like ChatGpt and Gemini) that help you build a strong portfolio and get your dream job."
    },
    {
        question: "Do I need prior coding or AI experience?",
        answer: "Not any coding experience is needed at all. We start with the basics and guide you step-by-step through every concept. This training is completely begineer friendly — You will be able to follow along and build powerful projects and skills that will help you to grow in your career."
    },
    {
        question: "How do I get support during the course?",
        answer: "You'll get access to a private learner community for discussions and doubt-solving, along with direct mentorship from the instructor throughout the course."
    },
    {
        question: "Is the course theoretical or practical?",
        answer: "The course is primarily practical, with a strong focus on hands-on exercises, projects, and real-world applications."
    },
];

// import components
import FAQItem from '../../components/home/FAQItem';
import SectionHeader from "../../components/utils/SectionHeader";

// FAQ Section Component
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-white py-20 px-6">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <SectionHeader
                        highlight="Frequently Asked Questions"
                        description="Get answers to common questions about our AI training program"
                    />
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}