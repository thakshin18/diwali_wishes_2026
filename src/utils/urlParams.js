/**
 * URL Parameters & Sharing Utilities for Diwali Moments
 */

export const RELATION_OPTIONS = [
  { value: 'Family', label: '👨‍👩‍👧‍👦 Family' },
  { value: 'Friend', label: '🤝 Dear Friend' },
  { value: 'Relative', label: '✨ Relative' },
  { value: 'Special Person', label: '💖 Someone Special' },
  { value: 'Colleague', label: '💼 Colleague' },
  { value: 'Bestie', label: '🌟 Best Friend' },
];

export const DEFAULT_GREETING = {
  sender: 'Thakshin',
  receiver: 'Beloved Family & Friends',
  relation: 'Family',
  customMessage: 'May this Diwali bring endless happiness, beautiful memories, good health, success, peace, and prosperity into your life.',
};

/**
 * Parses current URL query parameters
 */
export function getGreetingFromUrl() {
  if (typeof window === 'undefined') return { ...DEFAULT_GREETING };

  const params = new URLSearchParams(window.location.search);
  const sender = params.get('from') || params.get('sender') || DEFAULT_GREETING.sender;
  const receiver = params.get('to') || params.get('receiver') || DEFAULT_GREETING.receiver;
  const relation = params.get('rel') || params.get('relation') || DEFAULT_GREETING.relation;
  const customMessage = params.get('msg') || params.get('message') || DEFAULT_GREETING.customMessage;

  return {
    sender: sender.trim(),
    receiver: receiver.trim(),
    relation: relation.trim(),
    customMessage: customMessage.trim(),
  };
}

/**
 * Builds shareable URL with parameters
 */
export function buildShareableUrl(greetingData) {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.origin + window.location.pathname);
  if (greetingData.sender) url.searchParams.set('from', greetingData.sender);
  if (greetingData.receiver) url.searchParams.set('to', greetingData.receiver);
  if (greetingData.relation) url.searchParams.set('rel', greetingData.relation);
  if (greetingData.customMessage && greetingData.customMessage !== DEFAULT_GREETING.customMessage) {
    url.searchParams.set('msg', greetingData.customMessage);
  }
  return url.toString();
}

/**
 * Generates formatted WhatsApp Share link
 */
export function generateWhatsAppLink(greetingData) {
  const shareUrl = buildShareableUrl(greetingData);
  const receiverGreeting = greetingData.receiver ? `Dear ${greetingData.receiver}, ` : '';
  
  const text = 
`✨ *Happy Diwali 2026!* 🪔✨

${receiverGreeting}I have created a special magical Diwali surprise just for you! 🎁

May your life be illuminated with endless joy, wealth, health, and prosperity!

👉 *Click here to open your surprise:*
${shareUrl}

With love & warm wishes,
*${greetingData.sender || 'Your Well-wisher'}* ❤️`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Robust copy link function with clipboard API & textarea fallback
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  // Fallback using temporary textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy to clipboard failed:', err);
    return false;
  }
}

