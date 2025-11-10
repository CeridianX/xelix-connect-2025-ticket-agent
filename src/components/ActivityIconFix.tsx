import { useEffect } from "react";
import { Zap, Timer, Paperclip, List, MessageSquare, Sparkles } from "lucide-react";
import { createRoot } from "react-dom/client";

export default function ActivityIconFix() {
  useEffect(() => {
    const iconMap: Record<string, any> = {
      'bolt': Zap,
      'stopwatch': Timer,
      'PAPERCLIP': Paperclip,
      'list': List,
      'comment': MessageSquare,
      'sparkles': Sparkles,
    };

    const replaceActivityIcons = () => {
      // Find all paragraphs that contain icon text
      document.querySelectorAll('p').forEach(p => {
        const text = p.textContent?.trim();
        if (text && iconMap[text]) {
          // Check if this hasn't been replaced already
          if (!p.dataset.iconReplaced) {
            p.dataset.iconReplaced = 'true';
            
            // Find the parent container (should be the purple circle container)
            const parent = p.parentElement;
            if (parent) {
              // Hide the text
              p.style.display = 'none';
              
              // Create a container for the React icon
              const iconContainer = document.createElement('div');
              iconContainer.className = 'absolute inset-0 flex items-center justify-center';
              iconContainer.dataset.iconContainer = 'true';
              
              parent.appendChild(iconContainer);
              
              // Render the React icon
              const Icon = iconMap[text];
              
              // Determine icon color based on text color
              const textColor = window.getComputedStyle(p).color;
              const isWhiteText = textColor === 'rgb(255, 255, 255)' || p.classList.toString().includes('text-white');
              const iconColor = isWhiteText ? 'text-white' : 'text-[#501899]';
              
              const root = createRoot(iconContainer);
              root.render(<Icon className={iconColor} size={14} strokeWidth={2.5} />);
            }
          }
        }
      });
    };

    // Run immediately
    replaceActivityIcons();
    
    // Run again after a short delay to catch any late renders
    const timeout = setTimeout(replaceActivityIcons, 100);
    const timeout2 = setTimeout(replaceActivityIcons, 300);
    
    // Observe DOM changes to handle dynamic content
    const observer = new MutationObserver((mutations) => {
      // Only run if we see new activity items being added
      let shouldReplace = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            if (element.querySelector('p') || element.tagName === 'P') {
              shouldReplace = true;
            }
          }
        });
      });
      
      if (shouldReplace) {
        replaceActivityIcons();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      observer.disconnect();
    };
  }, []);

  return null;
}