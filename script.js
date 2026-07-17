const card = document.getElementById("card");
const cardTilt = document.getElementById("cardTilt");
const flipBtn = document.getElementById("flipBtn");
const flipBackBtn = document.getElementById("flipBackBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

const contactText = [
  "장유근",
  "(주)컬렉스 & (주)에렌델웍스 대표이사",
  "ykchang@collexx.io",
  "ykchang@earendelworks.com",
  "010-9990-8810",
].join("\n");

function toggleFlip() {
  const flipped = card.classList.toggle("is-flipped");
  cardTilt.classList.toggle("is-tilt-disabled", flipped);
  cardTilt.style.transform = "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

async function copyContact() {
  try {
    await navigator.clipboard.writeText(contactText);
    showToast("연락처가 클립보드에 복사되었습니다 ✓");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = contactText;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("연락처가 클립보드에 복사되었습니다 ✓");
  }
}

flipBtn.addEventListener("click", toggleFlip);
flipBackBtn.addEventListener("click", toggleFlip);
copyBtn.addEventListener("click", copyContact);

cardTilt.addEventListener("mousemove", (e) => {
  if (card.classList.contains("is-flipped")) return;

  const rect = cardTilt.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  cardTilt.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
});

cardTilt.addEventListener("mouseleave", () => {
  if (!card.classList.contains("is-flipped")) {
    cardTilt.style.transform = "";
  }
});
