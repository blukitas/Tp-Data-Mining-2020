
db.tweets_lower.aggregate([{
        "$project": {
            "_id": 1,
            "is_retweet": 1,
            "is_quote": 1,
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
        }
    }
]).forEach(function (doc) {
    db.tweets_lower.update(
    {_id: doc._id
    }, 
    {$set: {
        "tipo": doc.tipo
        }
    },{
        upsert: false,
        multi: true
    })
});