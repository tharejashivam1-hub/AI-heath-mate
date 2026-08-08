// Lucide icons
if (window.lucide) window.lucide.createIcons();

// Sticky nav shadow
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => links.classList.toggle("open"));
links?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Animated counters
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// Chat preview typing loop
const replies = [
  "Based on your sleep and hydration trends, try a 15-minute walk after lunch.",
  "Your screen time rose 22% this week — I scheduled two mindful breaks.",
  "Hydration is 40% below goal. I'll remind you every 90 minutes.",
];
const aiBubble = document.querySelector("[data-typing]");
let ri = 0;
const typeReply = () => {
  const text = replies[ri % replies.length];
  ri++;
  let i = 0;
  aiBubble.textContent = "";
  const timer = setInterval(() => {
    aiBubble.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(typeReply, 3200);
    }
  }, 22);
};
if (aiBubble) typeReply();

// =========================================
// PATIENT FOLLOW-UP STATUS
// =========================================

const followupStatus = document.getElementById("followup-status");
const followupNote = document.getElementById("followup-note");
const saveFollowup = document.getElementById("save-followup");
const followupBadge = document.getElementById("followup-badge");
const followupSaved = document.getElementById("followup-saved");


// Change badge appearance
function updateFollowupBadge(status) {

  if (!followupBadge) return;

  followupBadge.textContent = status;

  followupBadge.className = "followup-badge";

  if (status === "Upcoming") {

    followupBadge.classList.add("badge-upcoming");

  } else if (status === "Due Today") {

    followupBadge.classList.add("badge-due");

  } else if (status === "Overdue") {

    followupBadge.classList.add("badge-overdue");

  } else if (status === "Completed") {

    followupBadge.classList.add("badge-completed");

  }

}


// Load previously saved follow-up
function loadFollowup() {

  const savedData =
    localStorage.getItem("healthmateFollowup");

  if (!savedData) return;

  const data = JSON.parse(savedData);

  if (followupStatus) {

    followupStatus.value = data.status;

  }

  if (followupNote) {

    followupNote.value = data.note;

  }

  updateFollowupBadge(data.status);

}


// Save follow-up update
saveFollowup?.addEventListener("click", function () {

  const status = followupStatus.value;

  const note = followupNote.value.trim();

  const followupData = {

    status: status,

    note: note,

    updatedAt: new Date().toISOString()

  };


  // Save inside browser
  localStorage.setItem(
    "healthmateFollowup",
    JSON.stringify(followupData)
  );


  // Update visible badge
  updateFollowupBadge(status);


  // Show confirmation
  followupSaved.textContent =
    "✓ Follow-up update saved successfully";


  // Remove confirmation after 3 seconds
  setTimeout(function () {

    followupSaved.textContent = "";

  }, 3000);

});


// Load saved information when page opens
loadFollowup();



// =========================================
// HEALTH RECORD SEARCH + FILTERS
// =========================================

const recordSearch =
  document.getElementById("record-search");

const symptomFilter =
  document.getElementById("symptom-filter");

const riskFilter =
  document.getElementById("risk-filter");

const dateFilter =
  document.getElementById("date-filter");

const languageFilter =
  document.getElementById("language-filter");

const careFilter =
  document.getElementById("care-filter");

const resetFilters =
  document.getElementById("reset-record-filters");

const emptyReset =
  document.getElementById("empty-reset-btn");

const recordList =
  document.getElementById("health-record-list");

const emptyState =
  document.getElementById("record-empty");

const recordCount =
  document.getElementById("record-count");


// Get all health records
const healthRecords =
  document.querySelectorAll(".health-record");


// Main filter function
function filterHealthRecords() {

  const searchText =
    recordSearch.value.toLowerCase().trim();

  const selectedSymptom =
    symptomFilter.value;

  const selectedRisk =
    riskFilter.value;

  const selectedDate =
    dateFilter.value;

  const selectedLanguage =
    languageFilter.value;

  const selectedCare =
    careFilter.value;


  let visibleCount = 0;


  healthRecords.forEach(function (record) {

    const recordText =
      record.textContent.toLowerCase();

    const symptom =
      record.dataset.symptom;

    const risk =
      record.dataset.risk;

    const date =
      record.dataset.date;

    const language =
      record.dataset.language;

    const care =
      record.dataset.care;


    // Search condition
    const matchesSearch =
      searchText === "" ||
      recordText.includes(searchText);


    // Symptom condition
    const matchesSymptom =
      selectedSymptom === "all" ||
      symptom === selectedSymptom;


    // Risk condition
    const matchesRisk =
      selectedRisk === "all" ||
      risk === selectedRisk;


    // Date condition
    const matchesDate =
      selectedDate === "all" ||
      date === selectedDate;


    // Language condition
    const matchesLanguage =
      selectedLanguage === "all" ||
      language === selectedLanguage;


    // Medicine / screening condition
    const matchesCare =
      selectedCare === "all" ||
      care === selectedCare;


    // Final decision
    const shouldShow =
      matchesSearch &&
      matchesSymptom &&
      matchesRisk &&
      matchesDate &&
      matchesLanguage &&
      matchesCare;


    if (shouldShow) {

      record.style.display = "";

      visibleCount++;

    } else {

      record.style.display = "none";

    }

  });


  // Update result count
  recordCount.textContent =
    visibleCount +
    (visibleCount === 1
      ? " record found"
      : " records found");


  // Show empty state
  if (visibleCount === 0) {

    recordList.style.display = "none";

    emptyState.style.display = "block";

  } else {

    recordList.style.display = "grid";

    emptyState.style.display = "none";

  }

}


// Reset all filters
function resetHealthFilters() {

  recordSearch.value = "";

  symptomFilter.value = "all";

  riskFilter.value = "all";

  dateFilter.value = "all";

  languageFilter.value = "all";

  careFilter.value = "all";


  filterHealthRecords();

}


// Search while typing
recordSearch?.addEventListener(
  "input",
  filterHealthRecords
);


// Filter changes
symptomFilter?.addEventListener(
  "change",
  filterHealthRecords
);

riskFilter?.addEventListener(
  "change",
  filterHealthRecords
);

dateFilter?.addEventListener(
  "change",
  filterHealthRecords
);

languageFilter?.addEventListener(
  "change",
  filterHealthRecords
);

careFilter?.addEventListener(
  "change",
  filterHealthRecords
);


// Reset button
resetFilters?.addEventListener(
  "click",
  resetHealthFilters
);


// Empty-state reset button
emptyReset?.addEventListener(
  "click",
  resetHealthFilters
);


// Run once when page loads
filterHealthRecords();
// =========================================
// DOWNLOADABLE HEALTH SUMMARY
// =========================================

const downloadSummaryButton =
  document.getElementById("download-health-summary");

const downloadStatus =
  document.getElementById("download-status");


// Create readable health summary
function createHealthSummary() {

  const symptoms =
    document.getElementById("summary-symptoms")?.textContent.trim() || "Not provided";

  const guidance =
    document.getElementById("summary-guidance")?.textContent.trim() || "Not provided";

  const risk =
    document.getElementById("summary-risk")?.textContent.trim() || "Not provided";

  const nextStep =
    document.getElementById("summary-next-step")?.textContent.trim() || "Not provided";


  // Get medicine/reminder list
  const medicineItems =
    document.querySelectorAll("#summary-medicines li");

  let medicines = "";

  medicineItems.forEach(function(item) {

    medicines +=
      "- " +
      item.textContent.trim() +
      "\n";

  });


  // Get current date
  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );


  // Build readable export
  const summary =

`HEALTHMATE
AI HEALTH ASSISTANT — PERSONAL HEALTH SUMMARY
================================================

Generated: ${today}


SYMPTOMS
--------
${symptoms}


AI GUIDANCE
-----------
${guidance}


RISK LEVEL
----------
${risk}


MEDICINES & REMINDERS
---------------------
${medicines || "- No medicine or reminder information provided."}


RECOMMENDED NEXT STEP
---------------------
${nextStep}


MEDICAL DISCLAIMER
------------------
This summary is for informational and wellness purposes only.
AI-generated guidance is not a medical diagnosis and should not
replace advice, diagnosis or treatment from a qualified healthcare
professional.

If symptoms are severe, worsening, persistent, or concerning,
seek appropriate medical care from a qualified healthcare
professional.


NEXT STEPS
----------
1. Review the information in this summary.
2. Continue monitoring relevant symptoms.
3. Follow prescribed medicines and reminders as directed by
   your healthcare professional.
4. Seek professional medical advice when appropriate.

================================================
Generated by HealthMate AI Health Assistant
`;


  return summary;

}


// Download button
downloadSummaryButton?.addEventListener(
  "click",
  function() {

    const summary =
      createHealthSummary();


    // Create downloadable text file
    const file =
      new Blob(
        [summary],
        {
          type: "text/plain;charset=utf-8"
        }
      );


    // Create temporary download link
    const url =
      URL.createObjectURL(file);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "HealthMate-Health-Summary.txt";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    // Show confirmation
    if (downloadStatus) {

      downloadStatus.textContent =
        "✓ Health summary downloaded";

      setTimeout(function() {

        downloadStatus.textContent = "";

      }, 3000);

    }

  }
);

