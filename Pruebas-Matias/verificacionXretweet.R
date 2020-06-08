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
user_retweet_top133 <- user_retweet_top133[1:133,]

# cruzo con la tabla de los perfiles "generados de contenido" data_filtrada_2, sin estar filtrado por url
a1 <- user_retweet_top133
a2 <- data_filtrada_2
#nrow(a1)
#nrow(a2)


a1NotIna2 <- sqldf('SELECT  retweet_screen_name FROM a1 EXCEPT SELECT screen_name FROM a2')
And the rows which are in both data frames:
a1Ina2 <- sqldf('SELECT retweet_screen_name FROM a1 INTERSECT SELECT screen_name FROM a2')

#nrow(a1NotIna2)
porcentage_positivos <- nrow(a1Ina2) / 133 * 100


