"use client";
import { useState } from "react";
import { useRegisterMutation } from "../../store/api/authApi";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [error, setError] = useState<string | null>(null);

  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({
        email,
        password,
        password_confirm: passwordConfirm,
        role,
      }).unwrap();

      // Muvaffaqiyatli registratsiyadan keyin login sahifaga yo'naltirish
      router.push("/login");
    } catch (err: any) {
      // Backend xato javobini chiqarish
      if (err?.data) setError(JSON.stringify(err.data));
      else setError("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "candidate" | "employer")}
        className="border p-2 rounded"
      >
        <option value="candidate">Candidate</option>
        <option value="employer">Employer</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
