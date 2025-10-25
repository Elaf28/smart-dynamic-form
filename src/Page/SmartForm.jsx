import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true, minLength: 6 },
    { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
    { name: "birthDate", label: "Birth Date", type: "date" },
    { name: "age", label: "Age", type: "number", required: true, min: 18 },
    { name: "gender", label: "Gender", type: "radio", options: ["Male", "Female"], required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "zipCode", label: "ZIP Code", type: "text" },
    { name: "skills", label: "Skills", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "occupation", label: "Occupation", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "role", label: "User Role", type: "select", options: ["User", "Admin", "Manager", "Developer"] },
    { name: "cv", label: "CV", type: "textarea" },
    { name: "experience", label: "Years of Experience", type: "number" },
    { name: "github", label: "GitHub Profile", type: "url" },
    { name: "linkedin", label: "LinkedIn Profile", type: "url" },
    ];

    const validateField = (name, value, field, formData) => {
    if (field.required && (value === undefined || value === "" || value === false))
        return `${field.label} is required.`;

    if (name === "confirmPassword" && value !== formData.password)
        return "Passwords do not match.";

    if (field.type === "email" && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
        return "Invalid email format.";

    if (field.min && value < field.min)
        return `${field.label} must be at least ${field.min}.`;

    if (field.minLength && value.length < field.minLength)
        return `${field.label} must be at least ${field.minLength} characters.`;

    return "";
    };

    export default function SmartForm() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        fields.forEach((field) => {
        const error = validateField(field.name, formData[field.name], field, formData);
        if (error) newErrors[field.name] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
        toast.success("Form submitted successfully!");
        console.log("Form Data:", formData);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 py-3" style={{ background: "#dae6fd" }}>
            <div className="card shadow-lg p-4 w-100"style={{ maxWidth: "850px", color: "#647FBC" }}>
                <h2 className="text-center mb-4 fw-bold">Smart Dynamic Form</h2>

                <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {fields.map((field) => (
                    <div key={field.name} className="col-md-6 col-sm-12">
                        {field.type === "textarea" ? (
                        <>
                            <label className="form-label fw-semibold">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                            </label>
                            <textarea
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                            />
                            {errors[field.name] && (
                            <div className="invalid-feedback">{errors[field.name]}</div>
                            )}
                        </>
                        ) : field.type === "select" ? (
                        <>
                            <label className="form-label fw-semibold">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                            </label>
                            <select
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className={`form-select ${errors[field.name] ? "is-invalid" : ""}`}
                            >
                            <option value="">-- Select Role --</option>
                            {field.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                            </select>
                            {errors[field.name] && (
                            <div className="invalid-feedback">{errors[field.name]}</div>
                            )}
                        </>
                        ) : field.type === "radio" ? (
                        <>
                            <label className="form-label fw-semibold d-block">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                            </label>
                            {field.options.map((option) => (
                            <div key={option} className="form-check form-check-inline">
                                <input
                                type="radio"
                                name={field.name}
                                value={option}
                                checked={formData[field.name] === option}
                                onChange={handleChange}
                                className={`form-check-input ${errors[field.name] ? "is-invalid" : ""}`}
                                id={`${field.name}-${option}`}
                                />
                                <label className="form-check-label" htmlFor={`${field.name}-${option}`}>
                                    {option}
                                </label>
                            </div>
                            ))}
                            {errors[field.name] && (
                                <div className="text-danger small">{errors[field.name]}</div>
                            )}
                        </>
                        ) : (
                        <>
                            <label className="form-label fw-semibold">
                                {field.label} {field.required && <span className="text-danger">*</span>}
                            </label>
                            <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                            />
                            {errors[field.name] && (
                                <div className="invalid-feedback">{errors[field.name]}</div>
                            )}
                        </>
                        )}
                    </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-success w-100 mt-4 py-2 fw-semibold">
                    Submit
                </button>
                </form>
            </div>

        <ToastContainer position="top-right" />
        </div>
    );
}
