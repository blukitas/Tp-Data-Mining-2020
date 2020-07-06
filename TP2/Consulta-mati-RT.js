var diasSemana = ["domingo", "lunes",  "martes",  "miercoles",  "jueves",  "viernes",  "sabado"]

// db.vista_mati.drop();
// db.createView(
//    "vista_mati",
//    "tweets_lower",
    db.tweets_lower.aggregate(
    [{
        "$match": { is_retweet: { "$eq": true} }
    }, {
        "$project": {
            "status_id": "$status_id",
            "text": "$text",
            "retweet_text": "$retweet_text",
            "retweet_verified": 1,
            "retweet_favorite_count": 1,
            "retweet_retweet_count": 1,
            "is_retweet": "$is_retweet",
            "location": 1,
            "country": 1,
            "retweet_location": 1,
            "user_id": 1,
            "followers_count": 1,
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
            "retweet_created_at": 1,
            "retweet_created_at_dia": { $arrayElemAt: [ diasSemana, {$dayOfWeek: "$retweet_created_at"} ] },
            "retweet_created_at_hora": {$hour: "$retweet_created_at"},
            "retweet_created_at_momento": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$gt": [{$hour: "$retweet_created_at"}, 5]},
                                        { "$lt": [{$hour: "$retweet_created_at"}, 13]} 
                                        ]}, then: "Mañana" },
                         { case: { $and: [
                                        { "$gt": [{$hour: "$retweet_created_at"}, 12]},
                                        { "$lt": [{$hour: "$retweet_created_at"}, 20]} 
                                        ]}, then: "Tarde" },
                         { case: { $or: [
                                        { "$gt": [{$hour: "$retweet_created_at"}, 19]},
                                        { "$lt": [{$hour: "$retweet_created_at"}, 6]} 
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
            // "hashtag": "$hashtags",
            "postsXyear": {
                "$divide": [
                    "$statuses_count", 
                        { "$subtract": [2021, {$year: "$account_created_at"}]}
                ]
            },
            "followers_friends_ratio": {
                "$divide": ["$followers_count", {"$add": ["$friends_count", 0.0001]}]
            },
            "RT_followers_friends_ratio": {
                "$divide": ["$retweet_followers_count", {"$add": ["$retweet_friends_count", 0.0001]}]
            }
        }
    // }, {
//         "$unwind": "$hashtag"
//     }, {
//         "$match": { "hashtag": { "$ne": null } }
//     },{
//         "$match": { "$and": [
//                     { 'hashtag': { "$not": /.*covid*./ } }, 
//                     { 'hashtag': { "$not": /.*corona*./ }}, 
//                     { 'hashtag': { "$not": /.*coronavirus*./ }},  
//                     { 'hashtag': { "$not": /.*cuarentena*./ }}, 
//                     { 'hashtag': { "$not": /.*casa*./ }}, 
//                     ]
//                    }                    
    }, {
        "$project": {
            "status_id": 1,
            //"cat_tipo": "$tipo",
            //"is_retweet": 1,
            "text": 1,
            "retweet_text": 1,
            "cat_retweet_verified": "$retweet_verified",
            "retweet_favorite_count": 1,
            "retweet_retweet_count": 1,
            "retweet_location": 1,
            "location": 1,
            "country": 1,
            "user_id": 1,
            "created_at": 1,
            "created_at_hora": "$created_at_hora",
            "created_at_dia": "$created_at_dia",
            "created_at_momento": "$created_at_momento",
            "retweet_created_at": "$retweet_created_at",
            "retweet_created_at_hora": "$retweet_created_at_hora",
            "cat_retweet_created_at_dia": "$retweet_created_at_dia",
            "cat_retweet_created_at_momento": "$retweet_created_at_momento",
            "dateDifference_m": { 
                "$round" : [ { 
                      "$divide": [
                        { "$subtract": ["$created_at", "$retweet_created_at"] },
                        60000
                    ] },
                   0 
                ]
            },
            // "cat_hashtag": "$hashtag",
            // "postsXyear": 1,
            // "followers_friends_ratio": 1,            
            "postsXyear": { "$round" : [ 
                                { "$log": [ 
                                    {"$add": ["$postsXyear", 0.0001]}
                                    , 10] }
                                , 1] },
            "followers_count": { "$round" : [ 
                                    { "$log": [ 
                                        {"$add": ["$followers_count", 0.0001]}
                                        , 10] }
                                    , 1] },
            "followers_friends_ratio": { "$round" : [ 
                                            { "$log": [ 
                                                {"$add": ["$followers_friends_ratio", 0.0001]}
                                                , 10] }
                                            , 1] },
            "RT_followers_friends_ratio": { "$round" : [ 
                                            { "$log": [ 
                                                {"$add": ["$followers_friends_ratio", 0.0001]}
                                                , 10] }
                                            , 1] },
        }
    }, 
    {
        $merge: "query_compleja_RT"
    }
    ])
// db.query_compleja_RT.find({status_id:'1256443202162380807'} );
// db.query_compleja_RT.aggregate([{'$match': {status_id:'1256443202162380807'}}]);
// db.query_compleja_RT.find({})
// db.query_compleja_RT.find({text_limpio: {"$exists" : true, "$ne" : ""}} ).count();
// db.query_compleja_RT.find({text_limpio: {"$exists" : false}} ).count();
         
    // 73629 - 9.58
    // 75343 - 10.00
 // db.query_compleja_RT.update({
 // status_id: '1256443202162380807'
 // }, {
 // $set: {
 // 'text2': 'test1'
 // }
 // }, {
 // multi: true
 // })