// Validation helpers
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BATCH_CODE_RE = /^KRUT-\d{4}-[A-Z0-9]{4}-\d{3}$/i;

// validate form
export function validateForm(formData, selectedFile) {
    const errs = {};

    // --- Personal Information Validation ---
    if (!formData.fullName?.trim())
        errs.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 3)
        errs.fullName = "Name must be at least 3 characters";

    if (!formData.dob)
        errs.dob = "Date of birth is required";
    else {
        const age = Math.floor((Date.now() - new Date(formData.dob)) / 31_557_600_000);
        if (age < 14) errs.dob = "Student must be at least 14 years old";
        if (age > 60) errs.dob = "Please enter a valid date of birth";
    }

    if (!formData.gender) errs.gender = "Please select a gender";

    if (!formData.studentPhone?.trim())
        errs.studentPhone = "Phone number is required";
    else if (!PHONE_RE.test(formData.studentPhone.replace(/\s/g, "")))
        errs.studentPhone = "Enter a valid 10-digit Indian mobile number";

    if (!formData.studentEmail?.trim())
        errs.studentEmail = "Email is required";
    else if (!EMAIL_RE.test(formData.studentEmail))
        errs.studentEmail = "Enter a valid email address";

    if (!formData.address?.trim())
        errs.address = "Address is required";
    else if (formData.address.trim().length < 10)
        errs.address = "Please provide a complete address";

    // --- Academic Details Validation ---
    if (!formData.collegeName?.trim())
        errs.collegeName = "College name is required";

    if (!formData.course) errs.course = "Please select a degree";

    if (formData.course === "Other" && !formData.otherCourse?.trim())
        errs.otherCourse = "Please specify your degree name";

    if (!formData.year) errs.year = "Please select your year of study";
    if (!formData.enrollingFor) errs.enrollingFor = "Please select a program";

    // --- Identity Proof Validation ---
    if (formData.idType === "Other" && !formData.otherIdType?.trim())
        errs.otherIdType = "Please specify your identity proof";

    if (!formData.idNumber?.trim())
        errs.idNumber = "ID number is required";
    else if (formData.idNumber.trim().length < 4)
        errs.idNumber = "Enter a valid ID number";

    if (!selectedFile) errs.idProof = "Please upload your identity proof";

    // --- Guardian Details Validation ---
    if (!formData.parentName?.trim())
        errs.parentName = "Guardian name is required";

    if (!formData.parentPhone?.trim())
        errs.parentPhone = "Guardian phone is required";
    else if (!PHONE_RE.test(formData.parentPhone.replace(/\s/g, "")))
        errs.parentPhone = "Enter a valid 10-digit mobile number";

    if (
        formData.emergencyContact &&
        formData.emergencyContact.trim() &&
        !PHONE_RE.test(formData.emergencyContact.replace(/\s/g, ""))
    )
        errs.emergencyContact = "Enter a valid 10-digit mobile number";

    // --- Payment Structure Validation ---
    if (!formData.batchEnrolledIn?.trim())
        errs.batchEnrolledIn = "Batch code is required";

    if (!formData.enrollmentDate)
        errs.enrollmentDate = "Enrollment date is required";

    if (!formData.totalFeeAgreed)
        errs.totalFeeAgreed = "Total agreed fee is required";
    else if (Number(formData.totalFeeAgreed) <= 0)
        errs.totalFeeAgreed = "Total fee must be greater than 0";

    if (!formData.registrationFees)
        errs.registrationFees = "Registration fee is required";
    else if (Number(formData.registrationFees) < 0)
        errs.registrationFees = "Registration fee cannot be negative";
    else if (Number(formData.registrationFees) > Number(formData.totalFeeAgreed || 0))
        errs.registrationFees = "Registration fee cannot exceed total agreed fee";

    if (!formData.assignedCounsellor)
        errs.assignedCounsellor = "Please select an assigned counsellor";

    if (!formData.numberOfInstallments)
        errs.numberOfInstallments = "Please select number of installments";

    // --- Dynamic Installment Rows & Math Balance Check ---
    const installments = formData.installments || [];
    if (installments.length === 0) {
        errs.installments = "At least one installment row is required";
    } else {
        installments.forEach((ins, idx) => {
            if (!ins.amount || Number(ins.amount) <= 0) {
                errs[`installment_amount_${idx}`] = `Installment #${idx + 1} requires a valid amount`;
            }
            if (!ins.dueDate) {
                errs[`installment_dueDate_${idx}`] = `Installment #${idx + 1} requires a due date`;
            }
        });

        // Verify total installments sum matches total agreed minus registration
        const totalAgreed = Number(formData.totalFeeAgreed) || 0;
        const regFee = Number(formData.registrationFees) || 0;
        const expectedBalance = Math.max(0, totalAgreed - regFee);

        const allocatedSum = installments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

        if (allocatedSum !== expectedBalance) {
            errs.installmentsBalance = `Total installment allocation (₹${allocatedSum}) must equal remaining balance (₹${expectedBalance})`;
        }
    }

    return errs;
}