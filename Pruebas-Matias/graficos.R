library(scatterplot3d)

# Ejecutar primero el archivo usuarios_dataframe.R para obtener el df de partida df_users


group_tweet_type <- df_users$tweet_type
group_url <- df_users$url_tweets_ratio
group <- group_tweet_type

#grafico
sd3 <- scatterplot3d(x=df_users$tweets, y=log10(df_users$followers_friends_ratio),z=log10(df_users$postsXyear), color = as.numeric(group), pch = 19, xlab = "Tweets", ylab = "Log10(followers_friends_ratio)", zlab = "Log10(postsXyear)", main= "Actividad, Popularidad y cantidad de Tweets\nCategorizado por tipo de tweet")

#legend
legend(sd3$xyz.convert(10, 15, 1), pch = 19, yjust=0,
       legend = levels(group), col = seq_along(levels(group)), cex = 0.7)


# Falta anlasis univariado de las variables, ruido, outlier, Normalizacion


#summary(df_users$postsXyear)
#summary(log10(df_users$postsXyear))
#hist(log(df_users$postsXyear))
#boxplot(log10(df_users$postsXyear))

#summary(df_users$followers_friends_ratio)
#summary(log(df_users$followers_friends_ratio))
#hist(log(df_users$followers_friends_ratio))
#boxplot(log(df_users$followers_friends_ratio))

#summary(df_users$tweets)
#hist(df_users$tweets)
#boxplot((df_users$tweets))


#norm_zscore_tweets <- scale(df_users$tweets, center=TRUE,  scale=TRUE)
#summary(norm_zscore_tweets)
#hist(norm_zscore_tweets)
#boxplot((norm_zscore_tweets)

#norm_minmax_tweets = scale(df_users$tweets, center=min(df_users$tweets),  scale=max(df_users$tweets) - min(df_users$tweets)))
#summary(norm_minmax_tweets)
#hist(norm_minmax_tweets)
#boxplot(norm_minmax_tweets)

#norm_median_iqr_tweets <- scale(df_users$tweets, center=median(df_users$tweets),  scale=IQR(df_users$tweets))
#median(df_users$tweets)
#IQR(df_users$tweets)
#summary(norm_median_iqr_tweets)
#hist(norm_median_iqr_tweets)
#boxplot(norm_median_iqr_tweets)

