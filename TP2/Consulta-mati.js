db.tweets_lower.aggregate([{
        "$project": {
            "_id": 1,
            "location": 1,
            "country": 1,
            "created_at": 1,
            "created_at_dia": {$dayOfWeek: "$created_at"},
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
            "hashtag": "$hashtags"
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
    }
])