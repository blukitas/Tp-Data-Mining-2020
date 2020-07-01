var diasSemana = ["domingo", "lunes",  "martes",  "miercoles",  "jueves",  "viernes",  "sabado"]

db.vista_mati.drop();
db.createView(
    "vista_mati",
    "tweets_lower",
    [{
        "$project": {
            "_id": 1,
            "user_id": 1,
            "followers_count": 1,
            "user_popularity": {
                               $switch: {
                                  branches: [
                                     { case: { $lt: [ "$followers_count", 1001] }, then: "Impopular" },
                                     { case: { $and: [
                                                    { "$gt": ["$followers_count", 1000]},
                                                    { "$lt": ["$followers_count", 3501 ]} 
                                                    ]}, then: "Normal" },
                                     { case: { "$gt": ["$followers_count", 3500] }, then: "Populares" }
                                  ]
                               }
                            },
            "location": 1,
            "country": 1,
            "created_at": 1,
            "created_at_dia": { $arrayElemAt: [ diasSemana, {$dayOfWeek: "$created_at"} ] },
            "created_at_hora": {$hour: "$created_at"},
            "created_at_momento": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$gt": [{$hour: "$created_at"}, 5]},
                                        { "$lt": [{$hour: "$created_at"}, 13]} 
                                        ]}, then: "Mañana" },
                         { case: { $and: [
                                        { "$gt": [{$hour: "$created_at"}, 12]},
                                        { "$lt": [{$hour: "$created_at"}, 20]} 
                                        ]}, then: "Tarde" },
                         { case: { $or: [
                                        { "$gt": [{$hour: "$created_at"}, 19]},
                                        { "$lt": [{$hour: "$created_at"}, 6]} 
                                        ]}, then: "Noche" },
                      ],
                      default: "Otro"
                   }
                },
            "tipo": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$eq": ["$is_retweet", true]},
                                        { "$eq": ["$is_quote", true]} 
                                        ]}, then: "RT/QT" },
                         { case: { $and: [
                                        { "$eq": ["$is_retweet", true]},
                                        { "$eq": ["$is_quote", false]} 
                                        ]}, then: "RT" },
                         { case: { $and: [
                                        { "$eq": ["$is_retweet", false]},
                                        { "$eq": ["$is_quote", true]} 
                                        ]}, then: "QT" },
                         { case: { $and: [
                                        { "$eq": ["$is_retweet", false]},
                                        { "$eq": ["$is_quote", false]} 
                                        ]}, then: "TW" },
                      ],
                      default: "Otro"
                   }
                },
            "hashtag": "$hashtags",
            "postsXyear": {
                "$divide": [
                    "$statuses_count", 
                        { "$subtract": [2021, {$year: "$created_at"}]}
                ]
            },
            "followers_friends_ratio": {
                "$divide": ["$followers_count", {"$add": ["$friends_count", 0.0001]}]
            }
        }
    }, {
        "$unwind": "$hashtag"
    }, {
        "$match": { "hashtag": { "$ne": null } }
    },{
        "$match": { "$and": [
                    { 'hashtag': { "$not": /.*covid*./ } }, 
                    { 'hashtag': { "$not": /.*corona*./ }}, 
                    { 'hashtag': { "$not": /.*coronavirus*./ }},  
                    { 'hashtag': { "$not": /.*cuarentena*./ }}, 
                    { 'hashtag': { "$not": /.*casa*./ }}, 
                    ]
                   }                    
    }, {
        "$project": {
            "_id": 1,
            "user_id": 1,
            "followers_count": 1,
            "cat_user_popularity": "$user_popularity",
            "location": 1,
            "country": 1,
            "created_at": 1,
            "cat_created_at_dia": "$created_at_dia",
            "created_at_hora": "$created_at_hora",
            "cat_created_at_momento": "$created_at_momento",
            "cat_tipo": "$tipo",
            "hashtag": 1,
            "postsXyear": 1,
            "followers_friends_ratio": 1            
        }
    }, {
        "$limit": 10000
    }
    ])
db.vista_mati.find({});
