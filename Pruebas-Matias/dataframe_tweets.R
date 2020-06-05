library("ggplot2")
library("readr")
library("dplyr")
library("highcharter")
library("treemap")
library("modeest")
library("GGally")
library("tidyverse")
library("hrbrthemes")
library("tidyr")
library("VIM")
library("e1071")
library("mice")
library("mongolite")
library("SnowballC")
library("tm")
library("twitteR")
library("syuzhet")
library("tidyverse")
library("lubridate")
library("RColorBrewer")

#collection se puede ver como esta estructurada en Vistas
tweets <- mongo(collection = "tweetsCollection", db = "DMUBA")
df_tweets <- tweets$find()
View(df_tweets)
#names(df_tweets)

# creo las columnas is_quote  y is_tweet 
df_tweets$is_tweet <- (!df_tweets$is_quote & !df_tweets$is_retweet)
df_tweets$is_ret_quote <- (df_tweets$is_quote & df_tweets$is_retweet)


# creo la variable tipo factor tweet_type  
df_tweets$tweet_type<- ""
df_tweets[df_tweets$is_retweet & !df_tweets$is_quote,]$tweet_type <- "RT"
df_tweets[!df_tweets$is_retweet & df_tweets$is_quote,]$tweet_type <- "QT"
df_tweets[df_tweets$is_retweet & df_tweets$is_quote,]$tweet_type <- "QT/RT"
df_tweets[!df_tweets$is_retweet & !df_tweets$is_quote,]$tweet_type <- "TW"



# convierto la columna account_created_at a tipo Date
#class(df_tweets$account_created_at)
fecha_creacion_cuenta <- as.Date(df_tweets$account_created_at)
class(fecha_creacion_cuenta)

# Creo una columna nueva con el anio de creacion del usuario de cada tweet
year_creacion_cuenta <- as.numeric(format(fecha_creacion_cuenta, "%Y"))
df_tweets$created_at_year <- year_creacion_cuenta


# Creo la variable postXyear posteos por anio como medida de ACTIVIDAD
postsXyear <- df_tweets$statuses_count / (2021 - df_tweets$created_at_year)
df_tweets$postsXyear <- postsXyear
#summary(df_tweets$postsXyear)
#plot(sort(df_tweets$postsXyear))

# creo la variable followers_friends_ratio como medida de POPULARIDAD
#followers_friends_ratio <- as.numeric(df_tweets$followers_count + 1) / as.numeric(df_tweets$friends_count + 1)
followers_friends_ratio <- as.numeric(df_tweets$followers_count) / as.numeric(df_tweets$friends_count + 0.0001)
df_tweets$followers_friends_ratio <- followers_friends_ratio
#summary(df_tweets$followers_friends_ratio)
#plot(sort(df_tweets$followers_friends_ratio))

View(df_tweets)

# me quedo con subset de los tweets que son solo tweets
df_is_tweet <- df_tweets[df_tweets$is_tweet,]
#View(df_is_tweet)
#names(df_is_tweet)


#me quedo con las columnas que me interesan
df_is_tweet <- df_is_tweet[,c(2,3,14,15,16,17,18,20)]
names(df_is_tweet)

tweets_RT_totales <- nrow(df_is_tweet)
tweets_RT_totales

# porcentaje de tweets que tienen por lo menos 1 hashtag
df_is_tweet$hashtags_count != 0
percentage_hashtag_count <- length(which(df_is_tweet$hashtags_count != 0)) / tweets_RT_totales * 100
#percentage_hashtag_count

# porcentaje de tweets que tienen por lo menos 1 url
df_is_tweet$url_count != 0
percentage_url_count <- length(which(df_is_tweet$url_count != 0)) / tweets_RT_totales * 100
#percentage_url_count

# porcentaje de tweets que tienen por lo menos 1 url
df_is_tweet$media_count != 0
percentage_media_count <- length(which(df_is_tweet$media_count != 0)) / tweets_RT_totales * 100
#percentage_media_count

porcentajes <- c(percentage_hashtag_count, percentage_url_count, percentage_media_count)


coul <- brewer.pal(5, "Set2")
barplot(porcentajes, names.arg = c("hashtag", "url", "media"),col=coul, ylab= "Porcentaje", main = "TW_tweets")

###############
#Una posible conclusion es que notamos que mas del 60% de los TW tenian urls. Primera pista
###############
# Para este data frame falta analisis de ruido, outliers, normalizacion que se podria
# enriquecer si es necesario. Se le puede meter mas magia a las variables y hacer un anlisis mas profundo 


