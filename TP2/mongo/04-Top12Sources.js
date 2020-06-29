// -------------- SOURCE CATEGORICO -------------------- //
var top12Sources = db.tweets_mongo_covid19.aggregate([{
                "$group": {
                    "_id": "$source",
                    count: {
                        $sum: 1
                    }
                }
            }, {
                "$match": {
                    count: {
                        "$gt": 1.0
                    }
                }
            }, {
                "$sort": {
                    count: -1
                }
            }, {
                "$limit": 12
            }, {
                "$project": {
                    _id: "$_id"
                }
            }
        ]).toArray();

db.tweets_lower.update({}, {
    $set: {
        "source_categorico": "NuevoCampo"
    }
}, {
    upsert: false,
    multi: true
});

db.tweets_mongo_covid19.aggregate([{
            "$project": {
                "_id": "$_id",
                "text": "$text",
                "source": "$source"
            }
        }, {
            "$match": {
                source: {
                    "$nin": [top12Sources[0]._id, top12Sources[1]._id, top12Sources[2]._id, top12Sources[3]._id, top12Sources[4]._id, top12Sources[5]._id, top12Sources[6]._id, top12Sources[7]._id, top12Sources[8]._id, top12Sources[9]._id, top12Sources[10]._id, top12Sources[11]._id, ]
                }
            }
        }
    ]).forEach(function (doc) {
    db.tweets_lower.update({
        _id: doc._id
    }, {
        $set: {
            'source_categorico': 'Otros'
        }
    }, {
        multi: true
    })
});
db.tweets_mongo_covid19.aggregate([{
            "$project": {
                "_id": "$_id",
                "text": "$text",
                "source": "$source"
            }
        }, {
            "$match": {
                source: {
                    "$in": [top12Sources[0]._id, top12Sources[1]._id, top12Sources[2]._id, top12Sources[3]._id, top12Sources[4]._id, top12Sources[5]._id, top12Sources[6]._id, top12Sources[7]._id, top12Sources[8]._id, top12Sources[9]._id, top12Sources[10]._id, top12Sources[11]._id, ]
                }
            }
        }
    ]).forEach(function (doc) {
    db.tweets_lower.update({
        _id: doc._id
    }, {
        $set: {
            'source_categorico': doc.source
        }
    }, {
        multi: true
    })
}); 

// -------------- FIN SOURCE CATEGORICO -------------------- //