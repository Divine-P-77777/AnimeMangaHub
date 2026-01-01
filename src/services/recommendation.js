import BLOGS from "@/constants";
import { getUserHistory } from "@/lib/analytics";
import { buildPreferenceProfile } from "@/lib/preferenceBuilder";

export async function getRecommendation() {
    const history = getUserHistory();
    const pref = buildPreferenceProfile(BLOGS, history);

    if (!pref) {
        return { title: "Death Note", reason: "Popular starter anime." };
    }

    const res = await fetch("http://localhost:8000/surprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pref),
    });

    return await res.json();
}
