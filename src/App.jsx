import { useState } from "react";

export default function App() {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWQD-rUvbG-i4CZeBWZGLSjD5fXEALT_eXPRlCbJKxKghMYayfLr9RAObVsyJpVN2Lfw/exec";

  const [form, setForm] = useState({
    program: "",
    name: "",
    email: "",
    participation: "",
    subject: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      setSubmitted(true);

      setForm({
        program: "",
        name: "",
        email: "",
        participation: "",
        subject: "",
      });
    } catch (error) {
      alert("제출 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          아고라 수강 신청 및 수업 참여 방식 조사
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          아래 문항에 응답해 주세요.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              1. 현재 소속된 과정
            </label>

            <label style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="radio"
                name="program"
                value="석사"
                checked={form.program === "석사"}
                onChange={handleChange}
                required
              />{" "}
              석사
            </label>

            <label style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="radio"
                name="program"
                value="박사"
                checked={form.program === "박사"}
                onChange={handleChange}
              />{" "}
              박사
            </label>

            <label style={{ display: "block" }}>
              <input
                type="radio"
                name="program"
                value="대박사"
                checked={form.program === "대박사"}
                onChange={handleChange}
              />{" "}
              대박사
            </label>
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              2. 성함
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="성함을 입력해 주세요"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              3. 이메일
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력해 주세요"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              4. 수업 참여 방식
            </label>

            {[
              "오프라인",
              "온라인",
              "1차 오프라인, 2차 온라인",
              "1차 온라인, 2차 오프라인",
              "비희망",
            ].map((option) => (
              <label
                key={option}
                style={{ display: "block", marginBottom: "8px" }}
              >
                <input
                  type="radio"
                  name="participation"
                  value={option}
                  checked={form.participation === option}
                  onChange={handleChange}
                  required
                />{" "}
                {option}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              5. 희망하는 과목 선택
            </label>

            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            >
              <option value="">선택해 주세요</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#94a3b8" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "제출 중..." : "제출하기"}
          </button>
        </form>

        {submitted && (
          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              backgroundColor: "#ecfdf5",
              borderRadius: "12px",
              border: "1px solid #a7f3d0",
            }}
          >
            제출이 완료되었습니다. Google Sheets에 누적 저장됩니다.
          </div>
        )}
      </div>
    </div>
  );
}