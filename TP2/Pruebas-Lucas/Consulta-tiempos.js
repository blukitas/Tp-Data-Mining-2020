db.tweets_fechas_Stella.drop();
db.createView(
    "tweets_fechas_Stella",
    "tweets_lower",
    [{
        "$group": {
            "_id": "$retweet_status_id",
            "fecha_inicio_T": { "$min": "$retweet_created_at"},
            "fecha_primer_RT": { "$min": "$created_at" },
            "fecha_ultimo_RT": { "$max": "$created_at" },
            "cant_RT": {
                $sum: 1
            }
        }
    },
    {
        "$project": {
            retweet_status_id: "$retweet_status_id",
            fecha_inicio_T: "$fecha_inicio_T",
            fecha_primer_RT: "$fecha_primer_RT",
            fecha_ultimo_RT: "$fecha_ultimo_RT",
            tiempo_primera_rpta_RT: { "$subtract": ["$fecha_primer_RT", "$fecha_inicio_T"] },
            duracion_RT: { "$subtract": ["$fecha_ultimo_RT", "$fecha_primer_RT"] },
            vida_RT: { "$subtract": ["$fecha_ultimo_RT", "$fecha_inicio_T"] },
            "cant_RT": "$cant_RT",
        }
    }
]);
db.tweets_fechas_Stella.find({});