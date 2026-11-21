export function init() {
  const form = document.getElementById("consult-form");
  const feedback = document.getElementById("form-feedback");
  if (form && feedback) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("lead-name")?.value.trim() || "bạn";
      const pkg = document.getElementById("lead-package")?.value || "giải pháp";
      feedback.textContent = `Cảm ơn ${name}! Yêu cầu tư vấn về "${pkg}" đã được ghi nhận trong bản demo. Form chưa kết nối máy chủ.`;
      form.reset();
    });
  }
}
