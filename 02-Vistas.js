
db.tweet_type.drop();
db.createView(
    "tweet_type",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "is_quote": "$is_quote",
                "is_retweet": "$is_retweet",
                "verified": "$verified",
            }
        }
    ])
db.tweet_type.find({});

db.fechas.drop();
db.createView(
    "fechas",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "created_at": "$created_at",
                "retweet_created_at": "$retweet_created_at",
                "quoted_created_at": "$quoted_created_at",
            }
        }
    ])
db.fechas.find({});
	
db.user_estadisticas.drop();
db.createView(
    "user_estadisticas",
    "users_mongo_covid19",
    [{
            $project: {
                "_id": "$_id",
                "statuses_count": "$statuses_count",
                "favourites_count": "$favourites_count",
                "listed_count": "$listed_count",
                "friends_count": "$friends_count",
                "followers_count": "$followers_count",
                "verified": "$verified"
            }
        }
    ])
db.user_estadisticas.find({});

db.tweet_estadisticas.drop();
db.createView(
    "tweet_estadisticas",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "favorite_count": "$favorite_count",
                "quote_count": "$quote_count",
                "retweet_count": "$retweet_count",
                "reply_count": "$reply_count",
                "is_quote": "$is_quote",
                "is_retweet": "$is_retweet",
                "verified": "$verified"
            }
        }
    ]);
db.tweet_estadisticas.find({});

db.tweet_original_estadisticas.drop();
db.createView(
    "tweet_original_estadisticas",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "quoted_favorite_count": "$quoted_favorite_count",
                "quoted_retweet_count": "$quoted_retweet_count",
                "retweet_favorite_count": "$retweet_favorite_count",
                "retweet_retweet_count": "$retweet_retweet_count",
                "retweet_verified": "$retweet_verified",
                "quoted_verified": "$quoted_verified"
            }
        }
    ]);
db.tweet_original_estadisticas.find({});

db.tweet_completo_estadisticas.drop();
db.createView(
    "tweet_completo_estadisticas",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "favorite_count": "$favorite_count",
                "quote_count": "$quote_count",
                "retweet_count": "$retweet_count",
                "reply_count": "$reply_count",
                "is_quote": "$is_quote",
                "is_retweet": "$is_retweet",
                "verified": "$verified",
                "quoted_favorite_count": "$quoted_favorite_count",
                "quoted_retweet_count": "$quoted_retweet_count",
                "retweet_favorite_count": "$retweet_favorite_count",
                "retweet_retweet_count": "$retweet_retweet_count",
                "retweet_verified": "$retweet_verified",
                "quoted_verified": "$quoted_verified"
            }
        }
    ]);
db.tweet_completo_estadisticas.find({});


db.tweet_users_original.drop();
db.createView(
    "tweet_users_original",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "retweet_user_id": "$retweet_user_id",
                "quoted_user_id": "$quoted_user_id",
                "quoted_followers_count": "$quoted_followers_count",
                "quoted_friends_count": "$quoted_friends_count",
                "quoted_statuses_count": "$quoted_statuses_count",
                "retweet_followers_count": "$retweet_followers_count",
                "retweet_friends_count": "$retweet_friends_count",
                "retweet_statuses_count": "$retweet_statuses_count"
            }
        }
    ]);
db.tweet_users_original.find({});


db.tweet_hashtags.drop();
db.createView(
    "tweet_hashtags",
    "tweets_lower",
    [{
            $project: {
                "_id": "$_id",
                "user_id": "$user_id",
                "hashtags": "$hashtags"
            }
        }, {
            $unwind: "$hashtags"
        }
    ]);
db.tweet_hashtags.find({});


db.tweet_count_hashtags.drop();
db.createView(
    "tweet_count_hashtags",
    "tweets_lower",
    [{
            $unwind: "$hashtags"
        }, {
            "$match": {
                "hashtags": {
                    "$ne": null
                }
            }
        }, {
            $group: {
                _id: "$hashtags",
                hashtag: { $min: "$hashtags" },
                count: {
                    $sum: 1
                },
            }
        }, {
            $sort: {
                count: -1
            }
        }
    ]);
db.tweet_count_hashtags.find({});

/* Vistas usadas para nube de palabras */
db.tweet_cuba.drop();
db.createView(
    "tweet_cuba",
    "tweets_lower",
    [{"$match": { 'text' :/.cuba./}}]
    );
db.tweet_cuba.find({});

db.tweet_mx.drop();
db.createView(
    "tweet_mx",
    "tweets_lower",
    [{"$match": { 'text' :/.m*xico./}}]
    );
db.tweet_mx.find({});


db.tweet_vz.drop();
db.createView(
    "tweet_vz",
    "tweets_lower",
    [{"$match": { 'text' :/.venezuela./}}]
    );
db.tweet_vz.find({});