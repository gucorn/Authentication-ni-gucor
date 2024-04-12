import { useState } from "react";
import { useForm } from "react-hook-form";
import "../component_styles/SignupForm.css";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

function SignupForm() {
  const [passwordStrength, setPasswordStrength] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkPasswordStrength = (password) => {
    let strength = "";
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (strongRegex.test(password)) {
      strength = "Strong";
    } else if (mediumRegex.test(password)) {
      strength = "Medium";
    } else {
      strength = "Weak";
    }
    setPasswordStrength(strength);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="signup-container" style={{ borderColor: "#5AB1FF" }}>
      
      {/* Form */}
      <h2 style={{ color: "#5AB1FF" }}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group email">
          <label htmlFor="email" className="text-primary">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              validate: validateEmail,
            })}
            className={`form-control email-input ${
              errors.email ? "is-invalid" : ""
            }`}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="password-placeholder">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            onChange={(e) => checkPasswordStrength(e.target.value)}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="password-strength">
          Password Strength: {passwordStrength}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
