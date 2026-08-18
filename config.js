// 打刻・スタッフ・管理者、それぞれ別々のApps Scriptプロジェクトとしてデプロイした
// ウェブアプリURL(.../exec)を、対応する変数に貼り付けてください。
// (使わないページの変数は空のままでも構いません)

const PUNCH_API_URL = "ここに打刻用スクリプトのURLを貼り付け";
const STAFF_API_URL = "ここにスタッフ用スクリプトのURLを貼り付け";
const ADMIN_API_URL = "ここに管理者用スクリプトのURLを貼り付け";

async function apiCall(url, action, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload: payload || {} }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "unknown error");
  return json.data;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function yen(n) {
  return "¥" + Math.round(Number(n) || 0).toLocaleString("ja-JP");
}
function toMin(hhmm) {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
