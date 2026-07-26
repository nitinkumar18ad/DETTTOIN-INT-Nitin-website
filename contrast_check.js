// WCAG 2.1 contrast ratio calculator
// Run with: node contrast_check.js

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  // Footer: sandstone text on maroon background
  { name: "Footer body text (sandstone-200 on maroon-900)", fg: "#e7d2ad", bg: "#3f0d0f" },
  { name: "Footer heading (sandstone-50 on maroon-900)", fg: "#fffaf2", bg: "#3f0d0f" },
  { name: "Footer copyright (sandstone-300 ~#d4b684 on maroon-950 ~#2a0809)", fg: "#d4b684", bg: "#2a0809" },

  // Maroon buttons: white text on maroon-700
  { name: "Maroon button (white on maroon-700)", fg: "#ffffff", bg: "#681416" },
  { name: "Maroon button hover (white on maroon-500)", fg: "#ffffff", bg: "#8f1f22" },

  // Category labels: maroon-700 on white
  { name: "Category label (maroon-700 on white)", fg: "#681416", bg: "#ffffff" },

  // Body text: ink-700 on white
  { name: "Body text (ink-700 on white)", fg: "#4a403b", bg: "#ffffff" },
  { name: "Body text (ink-900 on sandstone-50)", fg: "#211b18", bg: "#fffaf2" },

  // Hero captions: ink-700 on white panel
  { name: "Hero caption (ink-700 on white)", fg: "#4a403b", bg: "#ffffff" },

  // Value wheel labels: maroon-700 icon on white button
  { name: "Value wheel label (ink-700 on white)", fg: "#4a403b", bg: "#ffffff" },
  { name: "Value wheel icon (maroon-700 on white)", fg: "#681416", bg: "#ffffff" },

  // Focus ring: maroon-500 outline
  { name: "Focus ring (maroon-500 on white)", fg: "#8f1f22", bg: "#ffffff" },
  { name: "Focus ring (maroon-500 on sandstone-50)", fg: "#8f1f22", bg: "#fffaf2" },

  // Footer links: sandstone-200 on maroon-900
  { name: "Footer nav links (sandstone-200 on maroon-900)", fg: "#e7d2ad", bg: "#3f0d0f" },
  
  // Instagram overlay: white on maroon-900/80
  { name: "Instagram overlay (white on maroon-900)", fg: "#ffffff", bg: "#3f0d0f" },
];

console.log("WCAG AA Contrast Ratio Check");
console.log("============================");
console.log("AA minimum: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)");
console.log("");

let allPass = true;
for (const pair of pairs) {
  const ratio = contrastRatio(pair.fg, pair.bg);
  const passAA = ratio >= 4.5;
  const passLargeAA = ratio >= 3.0;
  const status = passAA ? "PASS" : passLargeAA ? "PASS (large text only)" : "FAIL";
  if (!passAA) allPass = false;
  console.log(`${status}  ${ratio.toFixed(2)}:1  ${pair.name}`);
}

console.log("");
console.log(allPass ? "ALL CHECKS PASSED" : "SOME CHECKS NEED REVIEW (see above)");
