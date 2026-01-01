export function buildPreferenceProfile(blogs, history) {
    let totalWeight = 0;

    const acc = {
        episodes: 0,
        genres: {},
        types: {},
    };

    blogs.forEach((blog) => {
        const clicks = history.clicks[blog.id] || 0;
        const readSeconds = history.readTimes[blog.id] || 0;

        // stronger signal from reading than clicking
        const weight = clicks + (readSeconds / 60) * 2;

        if (weight <= 0) return;

        totalWeight += weight;
        acc.episodes += blog.anime.episodes * weight;

        blog.anime.genres.forEach((g) => {
            acc.genres[g] = (acc.genres[g] || 0) + weight;
        });

        acc.types[blog.anime.type] =
            (acc.types[blog.anime.type] || 0) + weight;
    });

    if (totalWeight === 0) return null;

    const topGenres = Object.entries(acc.genres)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([g]) => g);

    if (topGenres.length === 0) return null;

    return {
        genres: topGenres,
        preferred_episodes: Math.round(acc.episodes / totalWeight),
        type: Object.entries(acc.types).sort((a, b) => b[1] - a[1])[0][0],
        top_n: 10,
    };
}
