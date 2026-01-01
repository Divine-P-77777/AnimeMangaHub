export function buildPreferenceProfile(blogs, history) {
    let total = 0;

    let pref = {
        episodes: 0,
        members: 0,
        genres: {},
        type: {},
    };

    blogs.forEach((blog) => {
        const clicks = history.clicks[blog.id] || 0;
        const readMin = (history.readTimes[blog.id] || 0) / 60;
        const weight = clicks + readMin * 2;

        if (weight === 0) return;

        total += weight;
        pref.episodes += blog.anime.episodes * weight;
        pref.members += blog.anime.members * weight;

        blog.anime.genres.forEach(g => {
            pref.genres[g] = (pref.genres[g] || 0) + weight;
        });

        pref.type[blog.anime.type] =
            (pref.type[blog.anime.type] || 0) + weight;
    });

    if (total === 0) return null;

    return {
        episodes: Math.round(pref.episodes / total),
        members: Math.round(pref.members / total),
        genres: Object.entries(pref.genres)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([g]) => g),
        type: Object.entries(pref.type)
            .sort((a, b) => b[1] - a[1])[0][0],
    };
}
