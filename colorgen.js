const generateBtn = document.getElementById("button");

// Function to calculate contrasting color (black or white) based on background
function getContrastColor(hex) {
  hex = hex.replace("#", "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((h) => h + h)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? "#111111" : "#FFFFFF";
}

// Convert HSL to HEX
function hslToHex(hsl) {
  const [h, s, l] = hsl.match(/\d+/g).map(Number);
  const a = (s * Math.min(l, 100 - l)) / 100;

  function f(n) {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(color * 2.55)
      .toString(16)
      .padStart(2, "0");
  }

  return `#${f(0)}${f(8)}${f(4)}`;
}

// Analogous palette
function generateAnalogousPalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 50;
  const palette = [];
  const offsets = [-30, -15, 0, 15, 30];

  offsets.forEach((offset) => {
    let hue = (baseHue + offset + 360) % 360;
    palette.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  });

  return palette;
}

// Complementary palette
function generateComplementaryPalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 50;

  const palette = [
    `hsl(${baseHue}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 180) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 170) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 190) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 10) % 360}, ${saturation}%, ${lightness}%)`,
  ];

  return palette;
}

// Triadic palette
function generateTriadicPalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 50;

  const palette = [
    `hsl(${baseHue}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 120) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 240) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 110) % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${(baseHue + 250) % 360}, ${saturation}%, ${lightness}%)`,
  ];

  return palette;
}

// Generate palette with a random color theory rule
function generatePalette() {
  const rule = Math.floor(Math.random() * 3); // 0 = analogous, 1 = complementary, 2 = triadic

  if (rule === 0) return generateAnalogousPalette();
  else if (rule === 1) return generateComplementaryPalette();
  else return generateTriadicPalette();
}

// Event listener for generate button
generateBtn.addEventListener("click", function () {
  const palette = generatePalette();

  for (let i = 1; i <= 5; i++) {
    const colorHSL = palette[i - 1];
    const colorHEX = hslToHex(colorHSL);

    const preview = document.getElementById(`color-card-${i}`);
    const hexText = document.getElementById(`hex-${i}`);
    const copyIcon = document
      .getElementById(`copy-${i}`)
      .querySelector(".material-symbols-outlined");

    // Apply background color
    preview.style.backgroundColor = colorHEX;

    // Update hex text
    hexText.textContent = colorHEX;

    // Compute contrast and apply to text and icon
    const contrastColor = getContrastColor(colorHEX);
    hexText.style.color = contrastColor;
    copyIcon.style.color = contrastColor;
  }
});

// Clipboard logic for copy buttons
for (let i = 1; i <= 5; i++) {
  const copyBtn = document.getElementById(`copy-${i}`);
  const hexText = document.getElementById(`hex-${i}`);

  copyBtn.addEventListener("click", () => {
    const color = hexText.textContent.trim();

    navigator.clipboard.writeText(color).then(() => {
      const icon = copyBtn.querySelector(".material-symbols-outlined");
      icon.textContent = "check";

      setTimeout(() => {
        icon.textContent = "content_copy";
      }, 1000);
    });
  });
}
