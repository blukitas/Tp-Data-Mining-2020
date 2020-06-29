db.tweets_lower.aggregate( [
    {
        "$project": {
            "_id": "$_id",
            "user_id": "$user_id",
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
] )