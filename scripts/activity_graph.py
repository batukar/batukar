import json
import os
import sys
import urllib.request
from datetime import datetime, timedelta, timezone

USER = os.environ.get("GH_USER", "batukar")
TOKEN = os.environ.get("GITHUB_TOKEN")
DAYS = 31

BG = "#0d1117"
TEXT = "#8b949e"
LINE = "#58a6ff"
POINT = "#e6edf3"
AREA = "#1f6feb"
GRID = "#21262d"

W, H = 900, 260
PAD_L, PAD_R, PAD_T, PAD_B = 48, 24, 40, 40

QUERY = """
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    contributionsCollection(from:$from, to:$to) {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}
"""


def fetch():
    to = datetime.now(timezone.utc)
    frm = to - timedelta(days=DAYS + 7)
    body = json.dumps({
        "query": QUERY,
        "variables": {
            "login": USER,
            "from": frm.strftime("%Y-%m-%dT00:00:00Z"),
            "to": to.strftime("%Y-%m-%dT23:59:59Z"),
        },
    }).encode()
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=body,
        headers={"Authorization": f"bearer {TOKEN}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as r:
        data = json.load(r)
    if "errors" in data:
        sys.exit(data["errors"])
    weeks = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
    days = [d for w in weeks for d in w["contributionDays"]]
    return days[-DAYS:]


def render(days):
    counts = [d["contributionCount"] for d in days]
    maxc = max(max(counts), 1)
    steps = max(1, (maxc + 4) // 5)
    ymax = ((maxc + steps - 1) // steps) * steps

    plot_w = W - PAD_L - PAD_R
    plot_h = H - PAD_T - PAD_B
    n = len(days)

    def x(i):
        return PAD_L + i * plot_w / (n - 1)

    def y(c):
        return PAD_T + plot_h - c * plot_h / ymax

    pts = [(x(i), y(c)) for i, c in enumerate(counts)]
    line = " ".join(f"{px:.1f},{py:.1f}" for px, py in pts)
    area = f"{pts[0][0]:.1f},{y(0):.1f} {line} {pts[-1][0]:.1f},{y(0):.1f}"

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
        f'<rect width="{W}" height="{H}" rx="6" fill="{BG}"/>',
        f'<text x="{PAD_L}" y="24" fill="{LINE}" font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif" font-size="15" font-weight="600">Contribution Graph</text>',
    ]

    for k in range(0, ymax + 1, steps):
        gy = y(k)
        out.append(f'<line x1="{PAD_L}" y1="{gy:.1f}" x2="{W - PAD_R}" y2="{gy:.1f}" stroke="{GRID}" stroke-width="1"/>')
        out.append(f'<text x="{PAD_L - 8}" y="{gy + 4:.1f}" fill="{TEXT}" font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif" font-size="11" text-anchor="end">{k}</text>')

    out.append(f'<polygon points="{area}" fill="{AREA}" fill-opacity="0.25"/>')
    out.append(f'<polyline points="{line}" fill="none" stroke="{LINE}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>')

    for px, py in pts:
        out.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="3" fill="{POINT}"/>')

    for i, d in enumerate(days):
        if i % 3 == 0 or i == n - 1:
            label = datetime.strptime(d["date"], "%Y-%m-%d").strftime("%d %b")
            out.append(f'<text x="{x(i):.1f}" y="{H - 14}" fill="{TEXT}" font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif" font-size="11" text-anchor="middle">{label}</text>')

    out.append("</svg>")
    return "\n".join(out) + "\n"


if __name__ == "__main__":
    if not TOKEN:
        sys.exit("GITHUB_TOKEN missing")
    svg = render(fetch())
    with open("activity-graph.svg", "w", encoding="utf-8") as f:
        f.write(svg)
