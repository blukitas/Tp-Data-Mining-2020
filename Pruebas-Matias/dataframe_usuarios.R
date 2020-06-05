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

# Ejecutar primero el archivo tweets_dataframe.R para obtener el df de partida df_tweets
# deseo armar un dataframe a partir de diferentes agregaciones que me permita caracterizar a los usuarios
# con alguna variable de los tweets y analizar patrones

# agrego columna de 1 para poder calcular la cantidad de tweets por usuario
df_tweets$tweets <- 1

# Separo en dos las agregaciones porq quiero aplicar diferentes funciones
# voy a agregar por usuario y tipo de tweet

# aplico sum a ciertas variables de interes que vienen del anlisis de los TW_tweets
user_A <- aggregate(cbind(tweets,url_count, media_count ) ~ screen_name + tweet_type, data = df_tweets, sum)
#nrow(user_A)
#names(user_A)
#View(user_A)

# en la segunda agregacion aplico max para quedarme con el maximo valor ya que no quiero sumar
# sobre las variables "actividad" y "popularidad" creadas anteriormente
user_B <- aggregate(cbind(followers_friends_ratio,postsXyear) ~ screen_name + tweet_type, data = df_tweets, max)
#nrow(user_B)
#names(user2_B)
#View(user_B)

#nrow(user2_A) == nrow(user2_B)

# join para formar un unico dataframe
users <- right_join(user_A, user_B, by = c("screen_name", "tweet_type"))
#names(users)
#View(users)

# creo una nueva variable que refleja la cantidad de url por tweet y la convierto en factor
url_tweets_ratio <- floor(users$url_count / users$tweets)
users$url_tweets_ratio <- as.factor(url_tweets_ratio)

#convierto a tweet_type en factor
users$tweet_type <- as.factor(users$tweet_type)

#View(users)
