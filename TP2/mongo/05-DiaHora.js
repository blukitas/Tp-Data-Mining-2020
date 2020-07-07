
// -----------------Fecha de Tweet -------------------- //

db.tweets_lower.aggregate([
    {
        "$project": {
            "_id": 1,
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
        }
    }
]).forEach(function (doc) {
    db.tweets_lower.update(
    {_id: doc._id
    }, 
    {$set: {
        "created_at_dia": doc.created_at_dia,
        "created_at_hora": doc.created_at_hora,
        "created_at_momento": doc.created_at_momento,
        }
    },{
        upsert: false,
        multi: true
    })
});
// -------------------------------------------------------- //

// -----------------Fecha de Retweet -------------------- //

db.tweets_lower.aggregate([
    {
        "$match": { 
            "is_retweet": { "$eq": true }
        }
    }, {
        "$project": {
            "_id": 1,
            "retweet_created_at": 1,
            "retweet_created_at_dia": {$dayOfWeek: "$retweet_created_at"},
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
        }
    }
]).forEach(function (doc) {
    db.tweets_lower.update(
    {_id: doc._id
    }, 
    {$set: {
        "retweet_created_at_dia": doc.created_at_dia,
        "retweet_created_at_hora": doc.created_at_hora,
        "retweet_created_at_momento": doc.created_at_momento,
        }
    },{
        upsert: false,
        multi: true
    })
});
// -------------------------------------------------------- //

// -----------------Fecha de Quote -------------------- //

db.tweets_lower.aggregate([
    {
        "$match": { 
            "is_quote": { "$eq": true }
        }
    }, {
        "$project": {
            "_id": 1,
            "quoted_created_at": 1,
            "quoted_created_at_dia": {$dayOfWeek: "$quoted_created_at"},
            "quoted_created_at_hora": {$hour: "$quoted_created_at"},
            "quoted_created_at_momento": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$gt": [{$hour: "$quoted_created_at"}, 5]},
                                        { "$lt": [{$hour: "$quoted_created_at"}, 13]} 
                                        ]}, then: "Mañana" },
                         { case: { $and: [
                                        { "$gt": [{$hour: "$quoted_created_at"}, 12]},
                                        { "$lt": [{$hour: "$quoted_created_at"}, 20]} 
                                        ]}, then: "Tarde" },
                         { case: { $or: [
                                        { "$gt": [{$hour: "$quoted_created_at"}, 19]},
                                        { "$lt": [{$hour: "$quoted_created_at"}, 6]} 
                                        ]}, then: "Noche" },
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
        "quoted_created_at_dia": doc.created_at_dia,
        "quoted_created_at_hora": doc.created_at_hora,
        "quoted_created_at_momento": doc.created_at_momento,
        }
    },{
        upsert: false,
        multi: true
    })
});
// -------------------------------------------------------- //
