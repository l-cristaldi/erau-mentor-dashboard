document.addEventListener("DOMContentLoaded", function () {
  console.log("ERAU COMPASS Dashboard initializing...");
  initializeNavigation();
  initializeEmailTemplates();
  initializeSidebar();
  initializeIntakeForm();
  initializeNotifications();
  initializeBlueprintFeatures();
  initializeResourceCopy();
});

function scrollToWithOffset(el, offset = 96) {
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function initializeNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      showSection(targetSection);
      navButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const section = document.getElementById(targetSection);
      if (section) {
        const navH = document.querySelector(".sticky-nav")?.offsetHeight || 0;
        scrollToWithOffset(section, navH + 25);
      }
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  const targetSection = document.getElementById(sectionId);
  if (targetSection) targetSection.classList.add("active");
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}
window.showSection = showSection;

function initializeSidebar() {
  const openBtn = document.getElementById("open-intake-sidebar");
  const sidebar = document.getElementById("intake-sidebar");
  const closeBtn = document.getElementById("close-intake-sidebar");
  const body = document.body;

  if (!openBtn || !sidebar || !closeBtn) return;

  openBtn.addEventListener("click", function () {
    sidebar.classList.remove("hidden");
    body.classList.add("sidebar-open");
    setTimeout(() => {
      sidebar.querySelector("input, select, textarea")?.focus();
    }, 400);
  });

  closeBtn.addEventListener("click", function () {
    sidebar.classList.add("hidden");
    body.classList.remove("sidebar-open");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !sidebar.classList.contains("hidden")) {
      sidebar.classList.add("hidden");
      body.classList.remove("sidebar-open");
    }
  });
}

function initializeBlueprintFeatures() {
  const pillarBullets = document.querySelectorAll(
    "#three-pillars .pillar-section li"
  );
  pillarBullets.forEach((item) => {
    item.style.cursor = "pointer";
    item.title = "Click to copy";
    item.addEventListener("click", async function () {
      const text = this.textContent;
      try {
        await copyToClipboard(text);
        const originalBg = this.style.background;
        const originalColor = this.style.color;
        this.style.background = "var(--color-erau-gold)";
        this.style.color = "var(--color-erau-blue)";
        showNotification("Item copied!");
        setTimeout(() => {
          this.style.background = originalBg;
          this.style.color = originalColor;
        }, 1500);
      } catch (err) {
        console.error("Failed to copy item:", err);
        showNotification("Failed to copy item", "error");
      }
    });
  });

  const starterItems = document.querySelectorAll(".starter-item");
  starterItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.title = "Click to copy";
    item.addEventListener("click", async function () {
      const text = this.textContent.replace(/^"/, "").replace(/"$/, "");
      try {
        await copyToClipboard(text);
        const originalBg = this.style.background;
        const originalColor = this.style.color;
        this.style.background = "var(--color-erau-gold)";
        this.style.color = "var(--color-erau-blue)";
        showNotification("Conversation starter copied!");
        setTimeout(() => {
          this.style.background = originalBg;
          this.style.color = originalColor;
        }, 1500);
      } catch (err) {
        console.error("Failed to copy text:", err);
        showNotification("Failed to copy text", "error");
      }
    });
  });

  const questionCategories = document.querySelectorAll(".question-category li");
  questionCategories.forEach((item) => {
    item.style.cursor = "pointer";
    item.title = "Click to copy";
    item.addEventListener("click", async function () {
      const text = this.textContent;
      try {
        await copyToClipboard(text);
        const originalBg = this.style.background;
        const originalColor = this.style.color;
        this.style.background = "var(--color-erau-gold)";
        this.style.color = "var(--color-erau-blue)";
        showNotification("Question copied!");
        setTimeout(() => {
          this.style.background = originalBg;
          this.style.color = originalColor;
        }, 1500);
      } catch (err) {
        console.error("Failed to copy question:", err);
        showNotification("Failed to copy question", "error");
      }
    });
  });
}

function initializeResourceCopy() {
  const nodes = document.querySelectorAll("#resource-links .copyable");
  nodes.forEach((el) => {
    el.style.cursor = "pointer";
    const toCopy = el.getAttribute("data-copy") || el.textContent.trim();
    el.title = "Click to copy";
    el.addEventListener("click", async () => {
      try {
        await copyToClipboard(toCopy);
        showNotification("Copied to clipboard!");
      } catch (err) {
        console.error("Copy failed", err);
        showNotification("Failed to copy", "error");
      }
    });
  });
}

function initializeEmailTemplates() {
  const templateButtons = document.querySelectorAll(".copy-template");
  templateButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      const templateType = this.getAttribute("data-template");
      const templateContent = getTemplateContent(templateType);
      try {
        await copyToClipboard(templateContent);
        const originalText = this.textContent;
        this.classList.add("copied");
        this.textContent = "Copied!";
        showNotification("Email template copied to clipboard!");
        setTimeout(() => {
          this.classList.remove("copied");
          this.textContent = originalText || "Copy Template";
        }, 1500);
      } catch (err) {
        console.error("Failed to copy template:", err);
        showNotification("Failed to copy template", "error");
      }
    });
  });
}

function getTemplateContent(templateType) {
  const templates = {
    "initial-contact": `Subject: Welcome to ERAU COMPASS Mentorship - Let's Get Started!

Hi [Student Name]!

Welcome to the ERAU COMPASS mentorship program! I'm [Your Name], and I'm excited to be your mentor this semester.

COMPASS is designed to help you navigate your academic journey and prepare for your career in aerospace. Together, we'll work on:
• Academic success strategies
• Career planning and networking
• Personal and professional development
• Making the most of your ERAU experience

I'd love to schedule our first meeting to get to know you better and understand your goals. Are you available [Date Options] for a 60-minute conversation? We'll follow our Initial Meeting Blueprint to make the most of our time together.

Looking forward to working with you!

Best regards,
[Your Name]
[Your Title]
[Contact Information]`,

    "meeting-confirmation": `Subject: COMPASS Mentorship Meeting Confirmation - [Date]

Hi [Student Name],

This confirms our mentorship meeting scheduled for:

Date: [Date]
Time: [Time]
Location: [Location/Zoom Link]

Please bring:
• Your current class schedule
• Any questions or concerns you'd like to discuss
• Your career interests and goals

For our first meeting, we'll be following the Initial Meeting Blueprint, which includes completing your intake form together and setting up your personalized mentorship plan.

If you need to reschedule, please let me know at least 24 hours in advance.

Looking forward to our conversation!

Best regards,
[Your Name]`,

    "follow-up": `Subject: Great meeting you today - Action Items & Next Steps

Hi [Student Name],

It was great meeting with you today! I enjoyed learning more about your goals and interests.

Summary of what we discussed:
• [Key Point 1]
• [Key Point 2]
• [Key Point 3]

Your action items:
• [Action Item 1] - Due: [Date]
• [Action Item 2] - Due: [Date]

Resources mentioned:
• [Resource 1 with link]
• [Resource 2 with link]

Our next meeting is scheduled for [Next Meeting Date]. Please reach out if you have any questions before then!

Keep up the great work!

Best regards,
[Your Name]`,

    "mid-semester-checkin": `Subject: Mid-Semester COMPASS Check-in - Let's Celebrate Your Progress!

Hi [Student Name],

Can you believe we're already halfway through the semester? Time for our comprehensive mid-semester check-in!

I'd like to schedule a special 60-minute session using our Mid-Semester Check-in Blueprint to:
• Celebrate your achievements so far
• Assess progress on your goals
• Address any challenges strategically
• Plan for a strong finish to the semester

Please come prepared to discuss:
• Your academic performance and how you feel about it
• Which goals you've made progress on
• Any new challenges or opportunities
• What support you need for the rest of the semester

Are you available [Date Options] for this important check-in?

Looking forward to celebrating your growth!

Best regards,
[Your Name]`,

    "final-transition": `Subject: Our Final COMPASS Session - Celebrating Your Journey!

Hi [Student Name],

It's hard to believe, but it's time for our final COMPASS mentorship session. What an incredible journey it's been!

For our final 60-minute meeting, we'll follow the Final Transition Blueprint and focus on:
• Reflecting on how much you've grown
• Celebrating all your achievements
• Planning for your continued success
• Connecting you with ongoing resources and networks

Please come ready to share:
• What you're most proud of accomplishing
• How you've grown since our first meeting
• Your goals for the next phase of your journey
• Any questions about transitioning to independence

Are you available [Date Options] for this celebration and transition session?

I'm so proud of everything you've achieved, and I'm excited to send you off with confidence!

Best regards,
[Your Name]`,

    "progress-update": `Subject: COMPASS Progress Update - [Month]

Hi [Student Name],

I wanted to check in and see how you're doing with the goals we set during our mentorship sessions.

Progress on your goals:
• Goal 1: [Progress Update]
• Goal 2: [Progress Update]
• Goal 3: [Progress Update]

Celebrate your wins:
[Highlight recent achievements and positive progress]

Areas to focus on:
[Gentle guidance on areas needing attention]

Remember, I'm here to support you. Don't hesitate to reach out if you need help or want to schedule an additional meeting.

You're doing great — keep it up!

Best regards,
[Your Name]`,
  };
  return templates[templateType] || "";
}

function initializeIntakeForm() {
  const generatePdfBtn = document.getElementById("generate-pdf-btn");
  const clearFormBtn = document.getElementById("clear-form-btn");

  if (generatePdfBtn) {
    generatePdfBtn.addEventListener("click", function (e) {
      e.preventDefault();
      generateIntakePDF();
    });
  }

  if (clearFormBtn) {
    clearFormBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearIntakeForm();
    });
  }
}

function generateIntakePDF() {
  const data = {
    name: document.getElementById("intake-name")?.value?.trim() || "",
    erauEmail:
      document.getElementById("intake-erau-email")?.value?.trim() || "",
    alternateEmail:
      document.getElementById("intake-alternate-email")?.value?.trim() || "",
    major: document.getElementById("intake-major")?.value?.trim() || "",
    minor: document.getElementById("intake-minor")?.value?.trim() || "",
    classification:
      document.getElementById("intake-classification")?.value || "",
    estimatedGraduation:
      document.getElementById("intake-graduation")?.value || "",
    explanation:
      document.getElementById("intake-explanation")?.value?.trim() || "",
  };

  const btn = document.getElementById("generate-pdf-btn");
  btn.classList.add("loading");
  btn.disabled = true;

  try {
    if (typeof window.jspdf === "undefined")
      throw new Error("PDF library not loaded");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const line = 18;
    let y = margin;

    doc.setFillColor(0, 84, 159);
    doc.rect(0, 0, pageWidth, 80, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Embry-Riddle Aeronautical University", pageWidth / 2, 30 + 14, {
      align: "center",
    });
    doc.setFontSize(16);
    doc.text(
      "COMPASS Mentorship Program — Intake Form",
      pageWidth / 2,
      52 + 14,
      { align: "center" }
    );
    y = 80 + 24;

    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    function section(label) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 33, 33);
      doc.text(label, margin, y);
      doc.setFont("helvetica", "normal");
      y += 14;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1);
      doc.line(margin, y, pageWidth - margin, y);
      y += 22;
    }

    function field(label, value) {
      const val = value || "Not provided";
      doc.setFontSize(11);
      doc.setTextColor(33, 33, 33);
      doc.setFont("helvetica", "bold");
      const labelText = `${label}:`;
      const labelWidth = doc.getTextWidth(labelText);
      const colGap = 14;
      const available = pageWidth - margin * 2;

      doc.text(labelText, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 51, 51);
      const prepared = doc.splitTextToSize(
        val,
        available - labelWidth - colGap
      );

      if (
        labelWidth + colGap + doc.getTextWidth(val) < available &&
        prepared.length === 1
      ) {
        doc.text(val, margin + labelWidth + colGap, y);
        y += line;
      } else {
        y += line;
        doc.text(prepared, margin, y);
        y += prepared.length * line;
      }
      y += 3;
      if (y > pageHeight - 72) newPage();
    }

    function fieldMultiline(label, value) {
      const val = value || "Not provided";
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 33, 33);
      doc.text(`${label}:`, margin, y);
      y += line;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 51, 51);
      const prepared = doc.splitTextToSize(val, pageWidth - margin * 2);
      doc.text(prepared, margin, y);
      y += prepared.length * line + 5;
      if (y > pageHeight - 72) newPage();
    }

    function newPage() {
      doc.addPage();
      y = margin + 24;
    }

    function formatMonthYear(ymString) {
      if (!ymString) return "";
      const [year, month] = ymString.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    }

    section("Student Information");
    field("Name", data.name);
    field("ERAU Email", data.erauEmail);
    field("Alternate Email", data.alternateEmail);

    section("Academic Details");
    field("Major", data.major);
    field("Minor", data.minor);
    field("Classification", data.classification);
    field(
      "Estimated Graduation",
      data.estimatedGraduation ? formatMonthYear(data.estimatedGraduation) : ""
    );

    section("Statement");
    fieldMultiline("Interest in COMPASS Mentorship", data.explanation);

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      const footerText = `COMPASS Intake • Generated ${timestamp} • Page ${i} of ${totalPages}`;
      doc.text(footerText, pageWidth / 2, pageHeight - 24, { align: "center" });
    }

    const sanitizedName = (data.name || "Student").replace(
      /[^a-zA-Z0-9]/g,
      "_"
    );
    const isoDate = now.toISOString().split("T")[0];
    const filename = `ERAU_COMPASS_Intake_${sanitizedName}_${isoDate}.pdf`;

    doc.save(filename);
    showNotification("PDF generated and downloaded successfully!");

    setTimeout(() => {
      clearIntakeForm();
      const sidebar = document.getElementById("intake-sidebar");
      if (sidebar) sidebar.classList.add("hidden");
    }, 1000);
  } catch (error) {
    console.error("Error generating PDF:", error);
    showNotification("Error generating PDF. Please try again.", "error");
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

function clearIntakeForm() {
  const form = document.getElementById("intake-form-data");
  if (form) {
    form.reset();
    showNotification("Form cleared successfully", "info");
  }
}

function initializeNotifications() {
  const notification = document.getElementById("notification");
  if (notification) {
    const closeBtn = notification.querySelector(".notification__close");
    if (closeBtn) closeBtn.addEventListener("click", hideNotification);
  }
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const textElement = notification?.querySelector(".notification__text");
  const contentElement = notification?.querySelector(".notification__content");
  if (!notification || !textElement || !contentElement) return;

  textElement.textContent = message;
  const colors = {
    success: "#00549F",
    error: "#CC0000",
    warning: "#FFC423",
    info: "#333333",
  };
  contentElement.style.backgroundColor = colors[type] || colors.success;
  notification.classList.remove("hidden");
  setTimeout(hideNotification, 3500);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  if (notification) notification.classList.add("hidden");
}

async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
