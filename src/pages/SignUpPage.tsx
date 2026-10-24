import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

	function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		// Add authentication handling here.
        if(!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        if(!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if(password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }       
        alert("Login successful");
        
	}

    function validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z+]{2,}$/;
        return emailRegex.test(email);
    }
	const inputStyle: React.CSSProperties = {
		width: "100%",
		boxSizing: "border-box",
		padding: "12px 14px",
		border: "1px solid #d1d5db",
		borderRadius: 8,
		fontSize: 15,
	};

	return (
		<main
			style={{
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				padding: 24,
				boxSizing: "border-box",
				background: "#f3f4f6",
				fontFamily: "system-ui, sans-serif",
			}}
		>
			<section
				aria-labelledby="login-title"
				style={{
					width: "100%",
					maxWidth: 400,
					padding: 32,
					boxSizing: "border-box",
					borderRadius: 12,
					background: "white",
					boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
				}}
			>
				<h1 id="login-title" style={{ margin: "0 0 8px", color: "#111827", fontSize: 28 }}>
					Create an Account
				</h1>
				<p style={{ margin: "0 0 28px", color: "#6b7280" }}>Create a new account</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email" style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="you@example.com"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						style={{ ...inputStyle, marginBottom: 20 }}
					/>

					<label htmlFor="password" style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						placeholder="Enter your password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						style={inputStyle}
					/>

                    <label htmlFor="confirm-password" style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
                        Confirm Password
                    </label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        style={inputStyle}
                    />

					<button
						type="submit"
						style={{
							width: "100%",
                            marginTop: 4,

							padding: 13,
							border: 0,
							borderRadius: 8,
							background: "#000000",
							color: "white",
							fontSize: 15,
							fontWeight: 600,
							cursor: "pointer",
						}}
					>
						Sign in
					</button>
				</form>

				<p style={{ margin: "24px 0 0", color: "#6b7280", textAlign: "center", fontSize: 14 }}>
					Already have an account?{" "}
					<Link to="/login" style={{ color: "#000000", fontWeight: 600, textDecoration: "none" }}>
						Sign in
					</Link>
				</p>
			</section>
		</main>
	);
}
