// Validation helpers
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validate form
export function validateForm(formData, selectedFile) {
    const errs = {};

    if (!formData.fullName.trim())
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

    if (!formData.studentPhone.trim())
        errs.studentPhone = "Phone number is required";
    else if (!PHONE_RE.test(formData.studentPhone.replace(/\s/g, "")))
        errs.studentPhone = "Enter a valid 10-digit Indian mobile number";

    if (!formData.studentEmail.trim())
        errs.studentEmail = "Email is required";
    else if (!EMAIL_RE.test(formData.studentEmail))
        errs.studentEmail = "Enter a valid email address";

    if (!formData.address.trim())
        errs.address = "Address is required";
    else if (formData.address.trim().length < 10)
        errs.address = "Please provide a complete address";

    if (!formData.collegeName.trim())
        errs.collegeName = "College name is required";

    if (!formData.course) errs.course = "Please select a course";
    if (!formData.year) errs.year = "Please select your year of study";
    if (!formData.enrollingFor) errs.enrollingFor = "Please select a program";
    if (!formData.duration) errs.duration = "Please select duration";

    if (formData.idType === "Other" && !formData.otherIdType.trim())
        errs.otherIdType = "Please specify your identity proof";

    if (!formData.idNumber.trim())
        errs.idNumber = "ID number is required";
    else if (formData.idNumber.trim().length < 4)
        errs.idNumber = "Enter a valid ID number";

    if (!selectedFile) errs.idProof = "Please upload your identity proof";

    if (!formData.parentName.trim())
        errs.parentName = "Guardian name is required";

    if (!formData.parentPhone.trim())
        errs.parentPhone = "Guardian phone is required";
    else if (!PHONE_RE.test(formData.parentPhone.replace(/\s/g, "")))
        errs.parentPhone = "Enter a valid 10-digit mobile number";

    if (
        formData.emergencyContact &&
        formData.emergencyContact.trim() &&
        !PHONE_RE.test(formData.emergencyContact.replace(/\s/g, ""))
    )
        errs.emergencyContact = "Enter a valid 10-digit mobile number";

    return errs;
}