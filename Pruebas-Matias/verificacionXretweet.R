library(mongolite)
library(jsonlite)
library(sqldf)
options(gsubfn.engine="R")


retweets <- mongo(db = "DMUBA", collection = "retweets")
df_retweets = retweets$find()
#nrow(df_retweets)

# me quedo con los retweet_screen_name presentes en el dataset con el cual trabajamos
df_retweets_screen_name <- df_retweets[df_retweets$retweet_screen_name %in% df_users$screen_name,]

# cantidad retweets por usuario
stringsql1 = "select retweet_screen_name, count(*) as total from df_retweets_screen_name group by retweet_screen_name"
autorarg = sqldf(stringsql1)
#view(autorarg)

# los ordeno de manera decreciente y tomo los primeros 133 usuarios mas retweeteados 
user_retweet_top133 <- autorarg[order(autorarg$total, decreasing = TRUE), ]
#nrow(user_retweet_top133)
#user_retweet_top133 <- user_retweet_top133[1:133,]
#user_retweet_top1532 <- user_retweet_top133[1:1532,]
#user_retweet_top124 <- user_retweet_top133[1:124,]
user_retweet_top1213 <- user_retweet_top133[1:1213,]

# cruzo con la tabla de los perfiles "generados de contenido" data_filtrada_2, sin estar filtrado por url
#a1 <- user_retweet_top133
#a1 <- user_retweet_top1532
#a1 <- user_retweet_top124
a1 <- user_retweet_top1213
nrow(a1)
#a2 <- data_filtrada_2
#a2 <-data_filtrada_2_b
#a2 <-data_filtrada_3
a2 <-data_filtrada_3_b
#nrow(a1)
nrow(a2)
# c/url



a1NotIna2 <- sqldf('SELECT  retweet_screen_name FROM a1 EXCEPT SELECT screen_name FROM a2')
#And the rows which are in both data frames:
a1Ina2 <- sqldf('SELECT retweet_screen_name FROM a1 INTERSECT SELECT screen_name FROM a2')

#nrow(a1NotIna2)
#porcentage_positivos <- nrow(a1Ina2) / 133 * 100
#porcentage_positivos <- nrow(a1Ina2) / 1532 * 100
#porcentage_positivos <- nrow(a1Ina2) / 124 * 100
porcentage_positivos <- nrow(a1Ina2) / 1213 * 100
porcentage_positivos

