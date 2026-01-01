import BLOGS from "@/constants/index";
import { getUserHistory } from "@/lib/analytics";
import { buildPreferenceProfile } from "@/lib/preferenceBuilder";

export async function getRecommendation() {
    const history = getUserHistory();
    const preference = buildPreferenceProfile(BLOGS, history);

    if (!preference) {
        console.warn("⚠️ Not enough user activity for recommendation");
        return null;
    }

    console.log("📤 Sending preference to API:", preference);

    const res = await fetch("http://localhost:8000/surprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preference),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error(" API Error:", err);
        throw new Error("Surprise API failed");
    }

    const data = await res.json();
    console.log(" Recommendation received:", data);

    if (data.results && data.results.length > 0) {
        return data.results[0];
    }

    return null;
}
