import BLOGS from "@/constants/index";
import { getUserHistory } from "@/lib/analytics";
import { buildPreferenceProfile } from "@/lib/preferenceBuilder";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : (process.env.NEXT_PUBLIC_RECOMMENDATION_API_URL );

export async function getRecommendation(manualPreference = null) {
    let preference;

    if (manualPreference) {
        console.log(" Using manual preference:", manualPreference);
        preference = manualPreference;
    } else {
        const history = getUserHistory();
        preference = buildPreferenceProfile(BLOGS, history);
    }

    if (!preference) {
        console.warn(" Not enough user activity & no manual input");
        alert("Please read and click on some blogs to get recommendations!");
        return null;
    }


    console.log("Sending preference to API:", preference);

    const res = await fetch(`${API_URL}/surprise`, {
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
        return data.results.slice(0, 5);
    }


    return null;
}
