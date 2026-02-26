import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .vf-root {
    background: #0a0a0a;
    min-height: 100vh;
    padding: 60px 20px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
    color: #f0ede8;
    box-sizing: border-box;
  }

  .vf-root *, .vf-root *::before, .vf-root *::after { box-sizing: border-box; }

  .vf-container { width: 100%; max-width: 680px; }

  .vf-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.2rem;
    letter-spacing: 0.06em;
    line-height: 1;
    color: #f0ede8;
    margin: 0;
  }
  .vf-logo span { color: #ff4d00; }
  .vf-tagline {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    color: #555;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 8px;
    margin-bottom: 52px;
  }

  .vf-card {
    background: #111;
    border: 1px solid #222;
    padding: 36px;
    margin-bottom: 16px;
    position: relative;
  }
  .vf-card::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 16px; height: 16px;
    border-top: 2px solid #ff4d00;
    border-left: 2px solid #ff4d00;
  }

  .vf-card-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #ff4d00;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .vf-card-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #222;
  }
  .vf-card-label .num { color: #555; }

  .vf-optional {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    color: #555;
    border: 1px solid #222;
    padding: 2px 7px;
    text-transform: uppercase;
    margin-left: 8px;
  }

  .vf-field-label {
    display: block;
    font-size: 0.82rem;
    color: #888;
    margin-bottom: 10px;
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .vf-input {
    width: 100%;
    background: #0a0a0a;
    border: 1px solid #222;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.88rem;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  .vf-input:focus { border-color: #ff4d00; }

  .vf-input-num {
    width: 160px;
    background: #0a0a0a;
    border: 1px solid #222;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.88rem;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  .vf-input-num:focus { border-color: #ff4d00; }

  .vf-textarea {
    width: 100%;
    background: #0a0a0a;
    border: 1px solid #222;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.88rem;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }
  .vf-textarea:focus { border-color: #ff4d00; }

  .vf-duration-row { display: flex; align-items: center; gap: 12px; }
  .vf-duration-unit {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    color: #555;
    letter-spacing: 0.1em;
  }

  .vf-checkbox-row {
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    user-select: none;
  }
  .vf-custom-checkbox {
    width: 22px; height: 22px;
    border: 1px solid #222;
    background: #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .vf-custom-checkbox:hover { border-color: #ff4d00; }
  .vf-custom-checkbox.checked {
    background: #ff4d00;
    border-color: #ff4d00;
  }
  .vf-check-mark {
    width: 5px; height: 10px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(45deg) translate(-1px, -1px);
  }
  .vf-checkbox-text { font-size: 0.88rem; color: #f0ede8; font-weight: 300; }
  .vf-checkbox-text em { color: #ff4d00; font-style: normal; font-weight: 500; }
  .vf-gifted-note {
    margin-top: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    color: #555;
    padding-left: 36px;
    line-height: 1.5;
  }

  .vf-btn {
    width: 100%;
    background: #ff4d00;
    color: #fff;
    border: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.35rem;
    letter-spacing: 0.12em;
    padding: 22px;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .vf-btn:hover:not(:disabled) { background: #ff8c42; }
  .vf-btn:disabled { background: #2a1500; color: #ff4d00; cursor: not-allowed; }

  .vf-spinner {
    width: 18px; height: 18px;
    border: 2px solid #ff4d00;
    border-top-color: transparent;
    border-radius: 50%;
    animation: vf-spin 0.7s linear infinite;
  }
  @keyframes vf-spin { to { transform: rotate(360deg); } }

  .vf-error {
    background: #1a0a0a;
    border: 1px solid #3d1212;
    padding: 20px 24px;
    margin-top: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    color: #f44336;
  }

  .vf-output {
    background: #0d1a0a;
    border: 1px solid #1a3d12;
    padding: 36px;
    margin-top: 8px;
    animation: vf-fadeup 0.4s ease;
    position: relative;
  }
  .vf-output::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 16px; height: 16px;
    border-top: 2px solid #4caf50;
    border-left: 2px solid #4caf50;
  }
  @keyframes vf-fadeup {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .vf-output-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .vf-output-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #4caf50;
  }
  .vf-copy-btn {
    background: none;
    border: 1px solid #1a3d12;
    color: #4caf50;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .vf-copy-btn:hover { background: #1a3d12; }

  .vf-output-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.05rem;
    line-height: 1.8;
    color: #f0ede8;
    font-weight: 300;
    white-space: pre-wrap;
  }

  .vf-output-meta {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #1a3d12;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .vf-meta-item {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    color: #4caf50;
    letter-spacing: 0.1em;
  }
  .vf-meta-item span { color: #555; margin-right: 6px; }
`;

export default function VoiceForge() {
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("30");
  const [gifted, setGifted] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState(null);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  async function generate() {
    setError("");
    setOutput(null);

    if (!url.trim()) return setError("Please enter an Amazon product URL.");
    if (!url.includes("amazon")) return setError("URL does not appear to be an Amazon link.");
    if (!duration || isNaN(duration) || parseInt(duration) < 5)
      return setError("Please enter a valid duration (minimum 5 seconds).");

    setLoading(true);

    try {
      const secs = parseInt(duration);
      const wordsNeeded = Math.round((secs / 60) * 150);

      const notesSection = notes.trim()
        ? `\n\nExtra details or notes to work in:\n${notes.trim()}`
        : "";

      const giftedOpener = gifted
        ? `Open with "I was gifted this [Product Name]" and then immediately jump into personal experience`
        : `Open by jumping straight into personal experience with the product — no stiff intro or disclosure`;

      const prompt = `You write product review voiceover scripts in a very specific personal style. Study this real example review to understand the exact voice, tone, and structure to replicate:

EXAMPLE (do NOT copy this content — only copy the style):
"I was gifted this KitchenStar 16-inch Pizza Stone, and I finally tried it out with our go-to homemade pizza recipe. I was honestly pleasantly surprised! The crust came out nice and crisp on the bottom, but still soft on the inside — exactly how we like it. It's 5/8-inch thick natural cordierite and heat resistant up to 1800 degrees, so it works great in the oven or on the grill. I also love that it has handles, plus it comes with a stainless steel rack and a scraper tool for easy cleanup. Just make sure to read the instructions before using so you prep and heat it properly. Definitely a solid addition to our pizza nights!"

STYLE RULES — follow every one:
1. ${giftedOpener}
2. Use "I", "we", "our" — real person sharing with a friend, not a presenter
3. Share a genuine, slightly surprised positive reaction ("I was honestly pleasantly surprised!")
4. Describe results in sensory or practical terms — no marketing language
5. Naturally weave in 2–3 specific product specs mid-sentence (material, dimensions, what's included, ratings, etc.) — don't list them separately
6. Include one "I also love that..." or "what I really like is..." moment
7. End with one helpful heads-up or tip ("just make sure to...", "one thing to note...")
8. Close with a short, warm low-key recommendation — NOT a big CTA (e.g. "Definitely a solid addition to..." / "Really happy with this one.")
9. Conversational rhythm — short to medium sentences, em dashes, casual punctuation are all fine
10. Sound like someone actually talking, not reading a script

Product URL: ${url}
Target length: ${secs} seconds (~${wordsNeeded} words at 150 words/minute)
${notesSection}

Use placeholders like [Product Name], [Material], [Key Spec] if you don't have specific product details.
IMPORTANT: Your script must be EXACTLY ${wordsNeeded} words. Count carefully — do not go over or under by more than 3 words.
Write ONLY the spoken words — no labels, no stage directions, no formatting.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const script = data.content?.[0]?.text?.trim();
      if (!script) throw new Error("No script was generated.");

      const wordCount = script.split(/\s+/).filter(Boolean).length;
      const estSecs = Math.round((wordCount / 150) * 60);

      setOutput({ script, wordCount, wordsNeeded, targetSecs: secs, estSecs });
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
    } catch (e) {
      setError("Something went wrong: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  function copyScript() {
    if (!output) return;
    navigator.clipboard.writeText(output.script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <style>{styles}</style>
      <div className="vf-root">
        <div className="vf-container">
          <div>
            <h1 className="vf-logo">Voice<span>Forge</span></h1>
            <p className="vf-tagline">Amazon Product Review → Voiceover Script</p>
          </div>

          {/* URL */}
          <div className="vf-card">
            <div className="vf-card-label"><span className="num">01</span> Product Link</div>
            <label className="vf-field-label">Paste the Amazon product URL</label>
            <input
              className="vf-input"
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && generate()}
              placeholder="https://www.amazon.com/dp/..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          {/* Duration */}
          <div className="vf-card">
            <div className="vf-card-label"><span className="num">02</span> Duration</div>
            <label className="vf-field-label">Target voiceover length</label>
            <div className="vf-duration-row">
              <input
                className="vf-input-num"
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min="5"
                max="300"
                placeholder="30"
              />
              <span className="vf-duration-unit">SECONDS</span>
            </div>
          </div>

          {/* Gifted */}
          <div className="vf-card">
            <div className="vf-card-label"><span className="num">03</span> Disclosure</div>
            <div className="vf-checkbox-row" onClick={() => setGifted(g => !g)}>
              <div className={`vf-custom-checkbox ${gifted ? "checked" : ""}`}>
                {gifted && <div className="vf-check-mark" />}
              </div>
              <span className="vf-checkbox-text">This product was <em>gifted to me</em></span>
            </div>
            <div className="vf-gifted-note">When checked, your voiceover will open with a natural gifted disclosure per FTC guidelines.</div>
          </div>

          {/* Notes */}
          <div className="vf-card">
            <div className="vf-card-label"><span className="num">04</span> Notes <span className="vf-optional">Optional</span></div>
            <label className="vf-field-label">Any specific details, tone, or things to highlight</label>
            <textarea
              className="vf-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Emphasize the warranty, mention it's great for families, highlight the price..."
            />
          </div>

          <button className="vf-btn" onClick={generate} disabled={loading}>
            {loading && <div className="vf-spinner" />}
            {loading ? "GENERATING..." : "GENERATE VOICEOVER"}
          </button>

          {error && <div className="vf-error">⚠ {error}</div>}

          {output && (
            <div className="vf-output" ref={outputRef}>
              <div className="vf-output-header">
                <div className="vf-output-label">✦ Generated Voiceover</div>
                <button className="vf-copy-btn" onClick={copyScript}>
                  {copied ? "Copied!" : "Copy Script"}
                </button>
              </div>
              <div className="vf-output-text">{output.script}</div>
              <div className="vf-output-meta">
                <div className="vf-meta-item"><span>WORDS</span>{output.wordCount} / {output.wordsNeeded} target</div>
                <div className="vf-meta-item"><span>TARGET</span>{output.targetSecs}s</div>
                <div className="vf-meta-item"><span>EST. DURATION</span>{output.estSecs}s</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
