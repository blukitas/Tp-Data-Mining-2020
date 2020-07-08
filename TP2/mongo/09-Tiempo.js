var diasSemana = ["domingo", "lunes",  "martes",  "miercoles",  "jueves",  "viernes",  "sabado"]

db.tweets_lower.aggregate([
    {
        "$match": { is_retweet: { "$eq": true} }
    }, {
        "$group": {
            "_id": "$retweet_status_id",
            "retweet_status_id": { "$max": "$retweet_status_id" },
            
            "retweet_text": { "$max": "$retweet_text" },
            "retweet_source": { "$min": "$retweet_source" },
            "retweet_cant_caracteres":  { "$max": { "$strLenBytes": "$retweet_text" } },
            "retweet_followers_count": { "$max": "$retweet_followers_count" },
            "retweet_friends_count": { "$max": "$retweet_friends_count" },
            "retweet_favorite_count": { "$max": "$retweet_favorite_count" },
            "retweet_retweet_count": { "$max": "$retweet_retweet_count" },
            
            "fecha_inicio_T": { "$min": "$retweet_created_at"},
            "fecha_primer_RT": { "$min": "$created_at" },
            "fecha_ultimo_RT": { "$max": "$created_at" },
            "cant_RT": {
                $sum: 1
            },        
        },
    },
    {
        "$project": {
            "retweet_status_id": "$retweet_status_id",
            
            "fecha_inicio_T": "$fecha_inicio_T",
            "fecha_primer_RT": "$fecha_primer_RT",
            "fecha_ultimo_RT": "$fecha_ultimo_RT",
            "tiempo_primera_rpta_RT_m": { 
                "$round" : [ { 
                      "$divide": [
                        { "$subtract": ["$fecha_primer_RT", "$fecha_inicio_T"] },
                        60000
                    ] },
                   2 
                ]
            },
            "duracion_RT":{ 
                "$round" : [ { 
                      "$divide": [
                        { "$subtract": ["$fecha_ultimo_RT", "$fecha_primer_RT"] },
                        60000
                    ] },
                   2 
                ]
            }, 
            "vida_RT":{ 
                "$round" : [ { 
                      "$divide": [
                        { "$subtract": ["$fecha_ultimo_RT", "$fecha_inicio_T"] },
                        60000
                    ] },
                   2 
                ]
            }, 
            "cant_RT": "$cant_RT",
            
            
            "cat_retweet_source": "$retweet_source",
            "retweet_cant_caracteres": { "$round" : [ 
                                            { "$log": [ 
                                                {"$add": ["$retweet_cant_caracteres", 0.0001]}
                                                , 10] }
                                            , 1] },
            "cat_retweet_verified": "$retweet_verified",
            "retweet_dia_semana": { $arrayElemAt: [ diasSemana, {$dayOfWeek: "$fecha_inicio_T"} ] },
            "retweet_nro_dia": {$dayOfWeek: "$fecha_inicio_T"},
            "cat_retweet_es_finde": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$gt": [{$dayOfWeek: "$fecha_inicio_T"}, 1]},
                                        { "$lt": [{$dayOfWeek: "$fecha_inicio_T"}, 7]} 
                                        ]}, then: "Finde" },
                         { case: { $or: [
                                        { "$gt": [{$dayOfWeek: "$fecha_inicio_T"}, 6]},
                                        { "$lt": [{$dayOfWeek: "$fecha_inicio_T"}, 2]} 
                                        ]}, then: "Laborable" },
                      ],
                      default: null
                   }
                },
            "fecha_inicio_T_hora": {$hour: "$fecha_inicio_T"},
            "cat_fecha_inicio_T_momento": {
                $switch: {
                      branches: [
                         { case: { $and: [
                                        { "$gt": [{$hour: "$fecha_inicio_T"}, 5]},
                                        { "$lt": [{$hour: "$fecha_inicio_T"}, 13]} 
                                        ]}, then: "Mañana" },
                         { case: { $and: [
                                        { "$gt": [{$hour: "$fecha_inicio_T"}, 12]},
                                        { "$lt": [{$hour: "$fecha_inicio_T"}, 20]} 
                                        ]}, then: "Tarde" },
                         { case: { $or: [
                                        { "$gt": [{$hour: "$fecha_inicio_T"}, 19]},
                                        { "$lt": [{$hour: "$fecha_inicio_T"}, 6]} 
                                        ]}, then: "Noche" },
                      ],
                      default: "Otro"
                   }
                },
            "RT_followers_friends_ratio": { 
                    "$round" : [ 
                        { "$log": [ 
                            {"$add": [
                                { "$divide": ["$retweet_followers_count", {"$add": ["$retweet_friends_count", 0.0001]}]}
                                , 0.0001]}
                            , 10] }
                        , 1]
            }, 
            "retweet_favorite_count": { "$round" : [ 
                                            { "$log": [ 
                                                {"$add": ["$retweet_favorite_count", 0.0001]}
                                                , 10] }
                                            , 1] },
            "retweet_retweet_count": { "$round" : [ 
                                            { "$log": [ 
                                                {"$add": ["$retweet_retweet_count", 0.0001]}
                                                , 10] }
                                            , 1] },
        }
    }, 
    {
        $merge: "query_compleja_RT_Tiempos"
    }
]);
    
    db.query_compleja_RT_Tiempos.find()