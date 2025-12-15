import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Block Lovable script injection
const originalAppendChild = Element.prototype.appendChild;
Element.prototype.appendChild = function(node: any) {
  if (node.nodeType === 1) { // Element node
    if (
      node.id?.includes('lovable') ||
      node.className?.includes('lovable') ||
      node.getAttribute?.('data-lovable') ||
      (node.src && node.src.includes('lovable')) ||
      (node.innerHTML && node.innerHTML.includes('lovable'))
    ) {
      return node; // Don't actually append
    }
  }
  return originalAppendChild.call(this, node);
};

// Aggressively hide all Lovable elements
const hideAllLovaBleBadges = () => {
  // Hide by ID
  const badge = document.getElementById("lovable-badge");
  if (badge) {
    badge.remove();
  }

  // Hide by attribute selectors
  document.querySelectorAll('[data-lovable-widget], [data-lovable], .lovable-badge, [id*="lovable"], [class*="lovable"], [src*="lovable"]').forEach(el => {
    (el as HTMLElement).remove();
  });

  // Override any inline styles trying to show it
  const style = document.createElement('style');
  style.setAttribute('data-purpose', 'lovable-blocker');
  style.textContent = `
    #lovable-badge, [data-lovable-widget], [data-lovable], .lovable-badge, [id*="lovable"], [class*="lovable"], iframe[src*="lovable"] {
      display: none !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
    }
  `;
  document.head.appendChild(style);
};

// Hide on initial load
hideAllLovaBleBadges();

// Monitor for any injected badges and remove them immediately
const observer = new MutationObserver(() => hideAllLovaBleBadges());
observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeOldValue: true });
observer.observe(document.head, { childList: true, subtree: true });

// Also run cleanup on window load and periodically
window.addEventListener('load', hideAllLovaBleBadges);
setInterval(hideAllLovaBleBadges, 500);

createRoot(document.getElementById("root")!).render(<App />);
