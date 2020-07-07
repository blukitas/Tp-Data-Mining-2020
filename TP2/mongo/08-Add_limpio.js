db.tweets_lower.update({}, {
    $set: {
        "text_limpio": null,
        "sentiment": null
    }
}, {
    upsert: false,
    multi: true
});
