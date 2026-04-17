import React, { useMemo, useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzMljAmamA80qLQdyZYws81-X9hgkRYUh-2LZwx52ZBDbD4xMLT8cW2VjQjZXZmi1cN3Q/exec";

const surveyTitle = "<아고라(Agora)> 수강 신청 및 수업 참여 방식 조사";

const surveyDescription = [
  "2025년부터 서울과학종합대학원(aSSIST University) 박사과정에서는 ‘연구주도학습(Research-driven learning) 비전을 실현하기 위해 교수님 및 재학생분들께서 강의를 개설하고 학생과 함께 연구를 완성하실 수 있는 ‘아고라(Agora)’ 수업을 개설하고 있습니다.",
  "이번 아고라 수강신청 대상은 총 30개 과목이며, 최대 3학점까지 선택적으로 이수하실 수 있습니다.",
  "아래 설문에 포함된 수업 계획을 참고하시어 희망 과목을 선택하시되, 수업 일정을 참고하시어 수강 가능한 경우 신청해주시기 바랍니다.",
  "각 아고라 일정별로 전체 순위를 필수로 선택 부탁 드립니다.",
  "박사님들께서 신청하신 결과에 따라 15명 이상이 신청한 과목이 개설됩니다. 더불어 박사님들께서 희망하시는 과목을 최대한 많이 개설하기 위하여 1순위에서 개설 기준을 충족하지 못한 경우 후순위(2, 3순위 등) 득표수를 추가로 집계하여 개설 확정 과목을 결정할 예정입니다.",
  "(이에 따라 1순위로 선택하신 과목으로 수강이 확정되지 않을 수도 있는 점 양해 부탁 드립니다.)",
  "원활한 수업진행을 위해 반드시 기한 내 설문에 응답하여 주시기 바랍니다.",
  "아고라 수업일정 : 1개 수업은 1일(7.5시간)+1일(7.5시간)로 1학점 구성",
  "5월 2일(토), 5월 9일(토)",
  "5월 3일(일), 5월 16일(토)",
  "5월 10일(일), 5월 17일(일)",
  "수강 신청 설문 기한: 4/22(수)까지",
];

const programs = ["석사과정", "박사과정", "대박사과정"];

const schedules = [
  {
    id: "schedule1",
    sectionTitle: "첫 번째 수업 참석 방식 (5월 2일 + 5월 9일)",
    attendanceQuestion: "5월 2일(토), 5월 9일(토)에 수업에 참석하실 방식을 선택하여 주시기 바랍니다.",
    attendanceOptions: [
      "전체 오프라인",
      "전체 온라인",
      "2일 오프라인 / 9일 온라인",
      "2일 온라인 / 9일 오프라인",
      "비희망",
    ],
    rankingQuestion: "5월 2일(토), 5월 9일(토)에 진행되는 강의를 최대 7순위까지 신청할 수 있습니다.",
    maxRank: 7,
    instructors: ["송현희", "조민수", "박승재", "박수현", "윤여훈", "박영준", "오성호"],
  },
  {
    id: "schedule2",
    sectionTitle: "첫 번째 수업 참석 방식 (5월 3일 + 5월 16일)",
    attendanceQuestion: "5월 3일(일), 5월 16일(토)에 수업에 참석하실 방식을 선택하여 주시기 바랍니다.",
    attendanceOptions: [
      "전체 오프라인",
      "전체 온라인",
      "3일 오프라인 / 16일 온라인",
      "3일 온라인 / 16일 오프라인",
      "비희망",
    ],
    rankingQuestion: "5월 3일(일), 5월 16일(토)에 진행되는 강의를 최대 6순위까지 신청할 수 있습니다.",
    maxRank: 6,
    instructors: ["임현성", "선영택", "임기범", "서성균", "김경석", "오서현"],
  },
  {
    id: "schedule3",
    sectionTitle: "첫 번째 수업 참석 방식 (5월 10일 + 5월 17일)",
    attendanceQuestion: "5월 10일(일), 5월 17일(일)에 수업에 참석하실 방식을 선택하여 주시기 바랍니다.",
    attendanceOptions: [
      "전체 오프라인",
      "전체 온라인",
      "10일 오프라인 / 17일 온라인",
      "10일 온라인 / 17일 오프라인",
      "비희망",
    ],
    rankingQuestion: "5월 10일(일), 5월 17일(일)에 진행되는 강의를 최대 9순위까지 신청할 수 있습니다.",
    maxRank: 9,
    instructors: ["김명수", "이병욱", "이민호", "송동근", "김임환", "박수진", "신호상", "임선경", "현한나"],
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    color: "#000000",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    padding: "28px",
    border: "1px solid #e2e8f0",
    color: "#000000",
  },
  title: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "12px",
    lineHeight: 1.25,
    color: "#000000",
  },
  desc: {
    fontSize: "15px",
    lineHeight: 1.8,
    color: "#000000",
    margin: "0 0 8px 0",
  },
  infoBox: {
    marginTop: "16px",
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    lineHeight: 1.6,
    color: "#000000",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: 700,
    color: "#000000",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    boxSizing: "border-box",
    color: "#000000",
    background: "#ffffff",
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#000000",
  },
  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "vertical",
    color: "#000000",
    background: "#ffffff",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  section: {
    marginTop: "28px",
    padding: "22px",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    background: "#ffffff",
    color: "#000000",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: 800,
    margin: "0 0 16px 0",
    color: "#000000",
  },
  questionText: {
    fontSize: "15px",
    color: "#000000",
    marginBottom: "10px",
    fontWeight: 600,
  },
  radioWrap: {
    display: "grid",
    gap: "10px",
    marginBottom: "20px",
  },
  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "12px 14px",
    color: "#000000",
  },
  rankBox: {
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "14px",
    background: "#fff",
  },
  progressMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "22px",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#000000",
  },
  progressBar: {
    width: "100%",
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: (progress) => ({
    width: `${progress}%`,
    height: "100%",
    background: "#2563eb",
    transition: "width 0.2s ease",
  }),
  error: {
    color: "#b91c1c",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "12px",
  },
  success: {
    color: "#166534",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "12px",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  button: {
    padding: "12px 18px",
    borderRadius: "16px",
    border: "none",
    background: "#000000",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "12px 18px",
    borderRadius: "16px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#000000",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  successIcon: {
    width: "68px",
    height: "68px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#dcfce7",
    color: "#000000",
    fontSize: "30px",
    fontWeight: 800,
    margin: "0 auto 16px auto",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  summaryBox: {
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "14px",
    color: "#000000",
    background: "#ffffff",
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#000000",
    marginBottom: "6px",
  },
};

function isUnique(values) {
  const filtered = values.filter(Boolean);
  return new Set(filtered).size === filtered.length;
}

function getProgressCount(formData) {
  let count = 0;
  if (formData.program) count += 1;
  if (formData.name.trim()) count += 1;
  if (formData.email.trim()) count += 1;

  schedules.forEach((schedule) => {
    if (formData.attendance[schedule.id]) count += 1;
    schedule.instructors.forEach((name) => {
      if (formData.rankings[schedule.id]?.[name]) count += 1;
    });
  });

  return count;
}

function flattenPayload(formData) {
  const row = {
    timestamp: new Date().toLocaleString("ko-KR"),
    program: formData.program,
    name: formData.name,
    email: formData.email,
    note: formData.note,
  };

  schedules.forEach((schedule, index) => {
    const prefix = `schedule${index + 1}`;
    row[`${prefix}_attendance`] = formData.attendance[schedule.id] || "";

    schedule.instructors.forEach((instructor) => {
      row[`${prefix}_${instructor}`] = formData.rankings[schedule.id]?.[instructor] || "";
    });
  });

  return row;
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    program: "",
    name: "",
    email: "",
    note: "",
    attendance: {
      schedule1: "",
      schedule2: "",
      schedule3: "",
    },
    rankings: {
      schedule1: {},
      schedule2: {},
      schedule3: {},
    },
  });

  const totalCount = 3 + schedules.reduce((sum, schedule) => sum + 1 + schedule.instructors.length, 0);
  const progress = Math.round((getProgressCount(formData) / totalCount) * 100);

  const rankingValidity = useMemo(() => {
    return schedules.every((schedule) => {
      const selected = schedule.instructors.map((name) => formData.rankings[schedule.id]?.[name] || "");
      return selected.every(Boolean) && isUnique(selected);
    });
  }, [formData]);

  const attendanceValidity = schedules.every((schedule) => Boolean(formData.attendance[schedule.id]));
  const basicValidity = Boolean(formData.program && formData.name.trim() && formData.email.trim());
  const canSubmit = basicValidity && attendanceValidity && rankingValidity && !isSubmitting;

  const setRanking = (scheduleId, name, value) => {
    setFormData((prev) => ({
      ...prev,
      rankings: {
        ...prev.rankings,
        [scheduleId]: {
          ...prev.rankings[scheduleId],
          [name]: value,
        },
      },
    }));
  };

  const setAttendance = (scheduleId, value) => {
    setFormData((prev) => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [scheduleId]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
      setSubmitError("Google Sheets 연동 URL이 아직 설정되지 않았습니다. App.jsx 상단의 APPS_SCRIPT_URL에 Apps Script 웹앱 주소를 넣어주세요.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const payload = {
      title: surveyTitle,
      submittedAt: new Date().toISOString(),
      response: formData,
      flatRow: flattenPayload(formData),
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || "Google Sheets 저장에 실패했습니다.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || "제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError("");
    setFormData({
      program: "",
      name: "",
      email: "",
      note: "",
      attendance: {
        schedule1: "",
        schedule2: "",
        schedule3: "",
      },
      rankings: {
        schedule1: {},
        schedule2: {},
        schedule3: {},
      },
    });
  };

  const handleDownload = () => {
    const payload = {
      title: surveyTitle,
      submittedAt: new Date().toLocaleString(),
      response: formData,
      flatRow: flattenPayload(formData),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agora-survey-response.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.successIcon}>✓</div>
            <h1 style={{ ...styles.title, textAlign: "center" }}>설문이 제출되었습니다</h1>
            <p style={{ ...styles.desc, textAlign: "center" }}>응답 내용이 Google Sheets로 전송되도록 구성되어 있습니다. 아래에서 제출 내용을 다시 확인할 수 있습니다.</p>

            <div style={styles.summaryGrid}>
              <div style={styles.summaryBox}>
                <div style={styles.summaryLabel}>과정</div>
                <div>{formData.program}</div>
              </div>
              <div style={styles.summaryBox}>
                <div style={styles.summaryLabel}>성함</div>
                <div>{formData.name}</div>
              </div>
              <div style={styles.summaryBox}>
                <div style={styles.summaryLabel}>이메일</div>
                <div>{formData.email}</div>
              </div>
            </div>

            {schedules.map((schedule) => (
              <div key={schedule.id} style={styles.section}>
                <h2 style={styles.sectionTitle}>{schedule.sectionTitle}</h2>
                <div style={styles.summaryBox}>
                  <div style={styles.summaryLabel}>참석 방식</div>
                  <div>{formData.attendance[schedule.id]}</div>
                </div>
                <div style={{ ...styles.grid2, marginTop: "16px" }}>
                  {schedule.instructors.map((name) => (
                    <div key={name} style={styles.summaryBox}>
                      <div style={styles.summaryLabel}>{name}</div>
                      <div>{formData.rankings[schedule.id]?.[name]}순위</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {formData.note && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>추가 메모</h2>
                <div>{formData.note}</div>
              </div>
            )}

            <div style={styles.buttonRow}>
              <button style={styles.buttonSecondary} onClick={handleDownload}>응답 JSON 저장</button>
              <button style={styles.buttonSecondary} onClick={handleReset}>다시 작성</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>{surveyTitle}</h1>
          {surveyDescription.map((line, idx) => (
            <p key={idx} style={styles.desc}>{line}</p>
          ))}

          <div style={styles.infoBox}>
            이 버전은 Google Sheets 연동용입니다. App.jsx 상단의 <strong>APPS_SCRIPT_URL</strong> 자리에 Google Apps Script 웹앱 URL을 넣으면 제출 시 시트로 저장됩니다.
          </div>

          <div style={styles.progressMeta}>
            <span>작성 진행률</span>
            <span>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(progress)} />
          </div>

          <div style={styles.grid3}>
            <div>
              <label style={styles.label}>현재 소속된 과정을 선택해주시기 바랍니다. *</label>
              <select
                style={styles.select}
                value={formData.program}
                onChange={(e) => setFormData((prev) => ({ ...prev, program: e.target.value }))}
              >
                <option value="">선택하세요</option>
                {programs.map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>성함을 쓰시오 *</label>
              <input
                style={styles.input}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="성함을 입력하세요"
              />
            </div>

            <div>
              <label style={styles.label}>이메일을 쓰시오 *</label>
              <input
                style={styles.input}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>

          {schedules.map((schedule) => {
            const selectedRanks = schedule.instructors.map((name) => formData.rankings[schedule.id]?.[name] || "");
            const hasDuplicate = !isUnique(selectedRanks);
            const rankOptions = Array.from({ length: schedule.maxRank }, (_, i) => String(i + 1));

            return (
              <div key={schedule.id} style={styles.section}>
                <h2 style={styles.sectionTitle}>{schedule.sectionTitle}</h2>

                <div style={styles.questionText}>{schedule.attendanceQuestion}</div>
                <div style={styles.radioWrap}>
                  {schedule.attendanceOptions.map((option) => (
                    <label key={option} style={styles.radioItem}>
                      <input
                        type="radio"
                        name={`attendance-${schedule.id}`}
                        value={option}
                        checked={formData.attendance[schedule.id] === option}
                        onChange={(e) => setAttendance(schedule.id, e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                <div style={styles.questionText}>{schedule.rankingQuestion}</div>
                <div style={styles.grid2}>
                  {schedule.instructors.map((name) => (
                    <div key={name} style={styles.rankBox}>
                      <label style={styles.label}>{name}</label>
                      <select
                        style={styles.select}
                        value={formData.rankings[schedule.id]?.[name] || ""}
                        onChange={(e) => setRanking(schedule.id, name, e.target.value)}
                      >
                        <option value="">순위를 선택하세요</option>
                        {rankOptions.map((rank) => (
                          <option key={rank} value={rank}>{rank}순위</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {!formData.attendance[schedule.id] && (
                  <div style={styles.error}>참석 방식을 선택해 주세요.</div>
                )}
                {hasDuplicate && (
                  <div style={styles.error}>같은 일정 안에서는 순위를 중복해서 선택할 수 없습니다.</div>
                )}
              </div>
            );
          })}

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>추가 메모</h2>
            <textarea
              style={styles.textarea}
              value={formData.note}
              onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
              placeholder="필요한 경우 추가 의견을 입력해 주세요"
            />
          </div>

          {!basicValidity && <div style={styles.error}>과정, 성함, 이메일은 필수입니다.</div>}
          {!attendanceValidity && <div style={styles.error}>각 일정의 참석 방식을 모두 선택해 주세요.</div>}
          {!rankingValidity && <div style={styles.error}>각 일정 안의 강의 순위는 빠짐없이, 중복 없이 선택해 주세요.</div>}
          {submitError && <div style={styles.error}>{submitError}</div>}
          {!submitError && APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") && (
            <div style={styles.success}>Google Sheets 연동 URL이 설정되었습니다.</div>
          )}

          <div style={styles.buttonRow}>
            <button
              style={{ ...styles.button, ...(canSubmit ? {} : styles.buttonDisabled) }}
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? "제출 중..." : "제출하기"}
            </button>
            <button style={styles.buttonSecondary} onClick={handleReset}>초기화</button>
            <button style={styles.buttonSecondary} onClick={handleDownload}>테스트용 JSON 저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}
