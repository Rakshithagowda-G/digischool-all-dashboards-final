import React, { useEffect, useRef, useState } from "react";
import "./LoginRegister.css";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaTimes,
  FaCheck
} from "react-icons/fa";

/** Role color map */
const ROLE_PALETTES = {
  Student: "#34d399",
  Teacher: "#60a5fa",
  Parent: "#f59e0b",
  Admin: "#fb7185"
};

const rolesList = [
  { key: "Student", icon: <FaUserGraduate /> },
  { key: "Teacher", icon: <FaChalkboardTeacher /> },
  { key: "Parent", icon: <FaUsers /> },
  { key: "Admin", icon: <FaUserShield /> }
];

const Toast = ({ message, onClose, visible }) => {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  if (!visible) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-message">{message}</span>
      <button className="toast-close" aria-label="Close notification" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

const CheckOverlay = ({ visible }) => {
  return (
    <div className={`check-overlay ${visible ? "show" : ""}`} aria-hidden={!visible}>
      <div className="check-bubble">
        <FaCheck className="check-icon" />
      </div>
    </div>
  );
};

/** Role-specific inline SVG illustrations */
const RoleIllustration = ({ role = "", size = 280 }) => {
  if (!role) return null;

  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 256 256",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    className: "role-svg"
  };

  switch (role) {
    case "Student":
      return (
        <div className="role-illustration-centered">
          <svg {...commonProps}>
            <path
              d="M128 36L28 80l100 44 100-44-100-44zm0 148V128m72-20v40c0 16.6-32.2 32-72 32s-72-15.4-72-32v-40"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M80 184s16 16 48 16 48-16 48-16"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case "Teacher":
      return (
        <div className="role-illustration-centered">
          <svg {...commonProps}>
            <rect
              x="36"
              y="60"
              width="184"
              height="120"
              rx="10"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
            />
            <line x1="56" y1="80" x2="200" y2="80" stroke="currentColor" strokeWidth="6" />
            <circle cx="70" cy="150" r="8" fill="currentColor" />
            <line
              x1="90"
              y1="150"
              x2="170"
              y2="150"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case "Parent":
      return (
        <div className="role-illustration-centered">
          <svg {...commonProps}>
            <circle cx="80" cy="100" r="18" fill="currentColor" />
            <circle cx="128" cy="90" r="22" fill="currentColor" />
            <circle cx="176" cy="100" r="18" fill="currentColor" />
            <path
              d="M40 176c0-22 20-40 44-40h88c24 0 44 18 44 40v16H40v-16z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>
      );

    case "Admin":
      return (
        <div className="role-illustration-centered">
          <svg {...commonProps}>
            <path
              d="M128 28l88 36v52c0 56-40 88-88 108-48-20-88-52-88-108V64l88-36z"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
            />
            <circle cx="128" cy="108" r="26" stroke="currentColor" strokeWidth="8" />
            <path
              d="M128 78v60m-20-30h40"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

const OTP_COOLDOWN_SECONDS = 60;

const LoginRegister = () => {
  const [view, setView] = useState("roles");
  const [selectedRole, setSelectedRole] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [otpRequested, setOtpRequested] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpCooldown, setOtpCooldown] = useState(0);
  const otpCooldownRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const emailRef = useRef(null);

  const roleColor = selectedRole ? ROLE_PALETTES[selectedRole] || "#60a5fa" : "#60a5fa";
  const showToast = (message) => setToast({ visible: true, message });
  const hideToast = () => setToast({ visible: false, message: "" });

  // Email validation function
  const validateEmail = (emailString) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailString.trim());
  };

  // Update email validation whenever email changes
  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  const resetLoginState = () => {
    setEmail("");
    setPassword("");
    setIsEmailValid(false);
    setOtpRequested(false);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpVerified(false);
    hideToast();
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    resetLoginState();
    setTimeout(() => setView("login"), 120);
  };

  const openRegister = (e) => {
    e?.preventDefault();
    resetLoginState();
    setView("register");
  };

  const openLogin = (e) => {
    e?.preventDefault();
    resetLoginState();
    setView("login");
  };

  useEffect(() => {
    if (view === "login" && !otpRequested) {
      setTimeout(() => emailRef.current?.focus(), 80);
    }
  }, [view, otpRequested]);

  useEffect(() => {
    return () => {
      if (otpCooldownRef.current) clearInterval(otpCooldownRef.current);
    };
  }, []);

  const startOtpCooldown = () => {
    setOtpCooldown(OTP_COOLDOWN_SECONDS);
    if (otpCooldownRef.current) clearInterval(otpCooldownRef.current);
    otpCooldownRef.current = setInterval(() => {
      setOtpCooldown((s) => {
        if (s <= 1) {
          clearInterval(otpCooldownRef.current);
          otpCooldownRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const maskEmail = (e) => {
    if (!e) return "";
    const [local, domain] = e.split("@");
    if (!domain) return e;
    const first = local.charAt(0);
    return `${first}***@${domain}`;
  };

  const handleRequestOtp = (e) => {
    e?.preventDefault();
    if (loading) return;

    // Validate email format
    if (!isEmailValid) {
      showToast("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      showToast("Please enter your password.");
      return;
    }

    if (otpCooldown > 0) {
      showToast(`Please wait ${otpCooldown}s before requesting another OTP.`);
      return;
    }

    showToast(`OTP sent to ${email}.`);
    setOtpRequested(true);
    setOtpDigits(["", "", "", "", "", ""]);
    startOtpCooldown();

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 140);
  };

  const getOtpValue = () => otpDigits.join("");

  const handleOtpInput = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, "").slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
      otpRefs.current[index + 1]?.select?.();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpDigits[index]) {
        setOtpDigits((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        setOtpDigits((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;

    setOtpDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < 6; i++) {
        next[i] = digits[i] || "";
      }
      return next;
    });

    const firstEmpty = digits.length >= 6 ? 5 : digits.length;
    setTimeout(() => otpRefs.current[firstEmpty]?.focus(), 10);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (otpRequested) {
      const otpValue = getOtpValue();
      if (otpValue.length !== 6) {
        showToast("Please enter the 6-digit OTP.");
        return;
      }
      setLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 1000));
        setOtpVerified(true);
        setTimeout(() => {
          setOtpVerified(false);
          showToast("OTP verified — logged in.");
          // Redirect based on role after OTP verification
          redirectToRoleApp();
        }, 800);
      } catch (err) {
        showToast("OTP verification failed.");
      } finally {
        setLoading(false);
      }
    } else {
      // Validate email before login
      if (!isEmailValid) {
        showToast("Please enter a valid email address.");
        return;
      }

      setLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 800));
        showToast("Logged in (simulated).");
        // Redirect based on role after login
        setTimeout(() => {
          redirectToRoleApp();
        }, 500);
      } catch (err) {
        showToast("Login failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to redirect to the appropriate application based on role
  const redirectToRoleApp = () => {
    const roleRedirects = {
      Student: "http://localhost:5173",    // 5th_grade
      Admin: "http://localhost:5174",      // ADMIN-DB
      Teacher: "http://localhost:5175",    // schoolManagementFrontend
      Parent: "http://localhost:5176"      // Parent
    };

    const redirectUrl = roleRedirects[selectedRole];
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  useEffect(() => hideToast(), [view]);

  // Check if OTP button should be disabled
  const isOtpButtonDisabled = loading || !isEmailValid || !password.trim() || otpCooldown > 0;

  return (
    <div
      className={`wrapper view-${view} ${view !== "roles" && selectedRole ? "wide" : ""}`}
      style={{ "--role-color": roleColor }}
    >
      <Toast visible={toast.visible} message={toast.message} onClose={hideToast} />
      <CheckOverlay visible={otpVerified} />
      <a href="/" className="back-home" aria-label="Back to home">← Back to Home</a>

      <div className="wrapper-logo">
        <img src="/logo.png" alt="EduVerse Logo" />
      </div>

      {/* ROLES */}
      <div
        className={`panel roles-panel ${view === "roles" ? "onscreen" : "offscreen-left"}`}
        inert={view !== "roles" ? true : undefined}
      >
        <div className="roles-inner">
          <h1 className="welcome-title">Welcome to <span>EduVerse.</span></h1>
          <h1 className="welcome-subtitle">Select your role</h1>
          <p className="roles-sub">Choose a role to continue</p>
          <div className="roles-grid">
            {rolesList.map(({ key, icon }) => (
              <button
                key={key}
                className={`role-item ${key === selectedRole ? "role-selected" : ""}`}
                onClick={() => handleRoleClick(key)}
                aria-label={`Sign in as ${key}`}
                type="button"
                style={{ "--role-color-button": ROLE_PALETTES[key] }}
              >
                <span className="role-icon" aria-hidden="true">{icon}</span>
                <span className="role-text">{key}</span>
              </button>
            ))}
          </div>
          <div className="roles-help"><small>Tap a role to open the login screen</small></div>
        </div>
      </div>

      {/* LOGIN */}
      <div
        className={`panel login-panel ${view === "login" ? "onscreen" : (view === "roles" ? "offscreen-right" : "offscreen-left")}`}
        inert={view !== "login" ? true : undefined}
      >
        <div className="panel-content">
          <div className="form-column">
            <div className="form-inner">
              <form onSubmit={handleLoginSubmit}>
                <h1>Login</h1>
                {selectedRole && <p className="selected-role">Role: {selectedRole}</p>}

                <div className="input-box">
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={email.length > 0 && !isEmailValid}
                  />
                  <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FaLock className="icon" />
                </div>

                {!otpRequested && (
                  <div className="otp-request-block">
                    <button
                      className="secondary"
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={isOtpButtonDisabled}
                      aria-disabled={isOtpButtonDisabled}
                      title={
                        !isEmailValid && email.length > 0
                          ? "Please enter a valid email address"
                          : !password.trim()
                            ? "Please enter your password"
                            : otpCooldown > 0
                              ? `Wait ${otpCooldown} seconds`
                              : "Click to request OTP"
                      }
                    >
                      {otpCooldown > 0 ? `Request again in ${otpCooldown}s` : "Request OTP"}
                    </button>
                  </div>
                )}

                {otpRequested && (
                  <>
                    <div className="otp-confirm">
                      <small>
                        OTP sent to <strong>{maskEmail(email)}</strong>
                      </small>
                    </div>

                    <div className="otp-boxes" onPaste={handleOtpPaste} aria-label="Enter 6-digit OTP">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpRefs.current[i] = el)}
                          inputMode="numeric"
                          pattern="\d"
                          maxLength={1}
                          className="otp-box"
                          value={otpDigits[i]}
                          onChange={(ev) => handleOtpInput(i, ev.target.value)}
                          onKeyDown={(ev) => handleOtpKeyDown(i, ev)}
                          aria-label={`OTP digit ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" name="remember" /> Remember me
                  </label>
                </div>
                <button
                  className="primary"
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  aria-disabled={loading}
                >
                  {loading ? "Please wait…" : otpRequested ? "Verify OTP" : "Login"}
                </button>
                <div className="register-link">
                  <p>
                    Don't have an account? <button type="button" className="link-button" onClick={openRegister}>Register</button>
                  </p>
                  <p>
                    <button
                      type="button"
                      className="link-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setView("roles");
                        resetLoginState();
                      }}
                    >
                      Back to roles
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className={`illustration-column ${selectedRole ? "visible" : "hidden"}`}>
            <div className="illustration-card" style={{ "--role-color": roleColor }}>
              <RoleIllustration role={selectedRole} />
              <div className="illustration-caption">{selectedRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTER */}
      <div
        className={`panel register-panel ${view === "register" ? "onscreen" : "offscreen-right"}`}
        inert={view !== "register" ? true : undefined}
      >
        <div className="panel-content">
          <div className="form-column">
            <div className="form-inner">
              <form onSubmit={(e) => { e.preventDefault(); console.log("Register clicked"); }}>
                <h1>Register</h1>
                <div className="input-box">
                  <input name="email" type="email" placeholder="Email ID" required />
                  <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                  <input name="password" type="password" placeholder="Password" required />
                  <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                  <label><input type="checkbox" name="remember" /> Remember me</label>
                </div>
                <button className="primary" type="submit">Register</button>
                <div className="register-link">
                  <p>Already have an account? <button type="button" className="link-button" onClick={openLogin}>Login</button></p>
                  <p><button type="button" className="link-button" onClick={(e) => { e.preventDefault(); setView("roles"); }}>Back to roles</button></p>
                </div>
              </form>
            </div>
          </div>

          <div className={`illustration-column ${selectedRole ? "visible" : "hidden"}`}>
            <div className="illustration-card" style={{ "--role-color": roleColor }}>
              <RoleIllustration role={selectedRole} />
              <div className="illustration-caption">{selectedRole}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
