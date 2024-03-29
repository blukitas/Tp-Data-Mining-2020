library(infotheo)
names(df_users)

# Distribucion y Escalado

#nota: a todas se les suma un numero e, para evitar Log10(0)

# Sin transformacion: LOG10
# postXyear
summary(df_users$postsXyear)
plot(sort(df_users$postsXyear))
hist(df_users$postsXyear, xlab = "posteosXa�o", ylab ="Frecuencia", main="Distribuci�n de la variable \n SIN transformaci�n")
boxplot(df_users$postsXyear)

e <- 0.000001 

df_users$followers_friends_ratio_log <- log10(df_users$followers_friends_ratio + e)
df_users$postsXyear_log <- log10(df_users$postsXyear + e)
df_users$friends_count_log <-log10(df_users$friends_count + e)
df_users$followers_count_log <- log10(df_users$followers_count + e)
df_users$statuses_count_log <-log10(df_users$statuses_count + e)

# con transformacion log10
summary(df_users$postsXyear_log)
plot(df_users$postsXyear_log)
plot(sort(df_users$postsXyear_log), ylab = "Log10(posteosXa�o)", xlab = "Observaciones", main="Actividad SIN discretizar")
hist(df_users$postsXyear_log, xlab = "Log10(posteosXa�o)", ylab ="Frecuencia", main="Distribuci�n de la variable \n CON transformaci�n")
boxplot(df_users$postsXyear_log,ylab="log10(postsXyear)", main ="Actividad SIN discretizar")

# statuses_count
summary(df_users$statuses_count_log)
plot(sort(df_users$statuses_count_log))
hist(df_users$statuses_count_log)
boxplot(df_users$statuses_count_log)

# followers_count
summary(df_users$followers_count_log)
plot(sort(df_users$followers_count_log))
hist(df_users$followers_count_log)
boxplot(df_users$followers_count_log)

# friends_count
summary(df_users$friends_count_log)
plot(sort(df_users$friends_count_log))
hist(df_users$friends_count_log)
boxplot(df_users$friends_count_log)

# con transformacion log10
summary(df_users$followers_friends_ratio_log)
plot(df_users$followers_friends_ratio_log)
plot(sort(df_users$followers_friends_ratio_log))
hist(df_users$followers_friends_ratio_log, xlab = "Log10(posteosXa�o)", ylab ="Frecuencia", main="Distribuci�n de la variable \n CON transformaci�n")
boxplot(df_users$followers_friends_ratio_log)

# chequeo de correlacion s/ Log10
#names(df_users)
#pairs(df_users[,c(3,6,7,8,9,10)])
#cor(df_users[,c(3,6,7,8,9,10)], use = 'complete.obs')

# c/ log10
#cor(df_users[,c(3,11,12,13,14,15)], use = 'complete.obs')
#pairs(df_users[,c(3,11,12,13,14,15)], use = 'complete.obs')

##### Binning eqwidth/eqfreq/Floor

# Floor
#df_users$followers_friends_ratio_log_s <- floor(df_users$followers_friends_ratio_log)
#df_users$postsXyear_log_s <- floor(df_users$postsXyear_log)
#df_users$friends_count_log_s <-floor(df_users$friends_count_log)
#df_users$followers_cont_log_s <- floor(df_users$followers_count_log)
#df_users$statuses_count_log_s <-floor(df_users$statuses_count_log)

# pruebo con df_users$postsXyear_log
#plot(sort(df_users$postsXyear_log) , type = "l", col="red", ylab = "postsXyear", xlab = "Observaciones", main = "Dato original vs suavizado_floor")
#lines(sort(df_users$postsXyear_log_s),type = "l", col="blue")
#legend("topleft", legend=c("Original", "Suavizado"), col=c("red", "blue"), lty=1)

# corr c/floor
#cor(df_users[,c(3,11,12,13,14,15)], use = 'complete.obs')
#pairs(df_users[,c(3,11,12,13,14,15)], use = 'complete.obs')

# binning
# eqwidth/eqfreq

#nbins<- sqrt(nrow(df_users))
nbins<- nrow(df_users) ^ (1/3) 
#nbins

# Discretize recibe el atributo, el m�todo de binning y la cantidad de bins
bin_eq_width_postsXyear_log <- discretize(df_users$postsXyear_log,disc="equalwidth", nbins = nbins)



# Por cada bin calculamos la media y reemplazamos en el atributo suavizado
for(bin in 1:nbins){
  bin_eq_width$suavizado_postsXyear_log[bin_eq_width_postsXyear_log$X==bin] = mean(df_users$postsXyear_log[bin_eq_width_postsXyear_log$X==bin])
}

bin_eq_width_followers_friends_ratio_log <- discretize(df_users$followers_friends_ratio_log,disc="equalwidth", nbins = nbins)

for(bin in 1:nbins){
  bin_eq_width$suavizado_followers_friends_ratio_log[bin_eq_width_followers_friends_ratio_log$X==bin] = mean(df_users$followers_friends_ratio_log[ bin_eq_width_followers_friends_ratio_log$X==bin])
}

#View(bin_eq_width)

plot(sort(df_users$postsXyear_log) , type = "l", col="red", ylab = "log10(postsXyear)", xlab = "Observaciones", main = "Actividad")
#plot(sort(df_users$followers_friends_ratio_log) , type = "l", col="red", ylab = "log10(followers_friends_ratio)", xlab = "Observaciones", main = "Popularidad")

# Agrego la serie de la variable media 
lines(sort(bin_eq_width$suavizado_postsXyear_log),type = "l", col="blue")
legend("topleft", legend=c("Original", "Suavizado"), col=c("red", "blue"), lty=1)

#lines(sort(bin_eq_width$suavizado_followers_friends_ratio_log),type = "l", col="blue")
#legend("topleft", legend=c("Original", "Suavizado"), col=c("red", "blue"), lty=1)

df_users$followers_friends_ratio_log_s <- bin_eq_width$suavizado_followers_friends_ratio_log
df_users$postsXyear_log_s <-  bin_eq_width$suavizado_postsXyear_log
#df_users$friends_count_log_s <- 
#df_users$statuses_count_log_s <- 
#df_users$followers_count_log_s <- 

#summary(data)
plot(df_users$postsXyear_log_s)
plot(sort(df_users$postsXyear_log_s), ylab = "Log10(posteosXa�o)", xlab = "Observaciones", main="Actividad discretizada \n en bins de igual ancho")
hist(df_users$postsXyear_log_s)
boxplot(df_users$postsXyear_log_s, ylab="log10(postsXyear)", main ="Actividad discretizada n\ en bins de igual ancho")

# correlacion con variables suavizadas
#cor(df_users[,c(3,17,18,19,20,21)], use = 'complete.obs')
#pairs(df_users[,c(3,17,18,19,20,21)], use = 'complete.obs')





# variables redundantes


# outliers  no lo use pero lo probe

#saco los datos correspondientes al bin inferior de una de las varoiables
#data <- df_users
#min(df_users$followers_friends_ratio_log_s)
#data <- data[data$followers_friends_ratio_log_s>min(df_users$followers_friends_ratio_log_s),]
#nrow(data)
#nrow(df_users)

# filtrado

sp <- ggplot(data=df_users, aes(x=postsXyear_log_s, y=followers_friends_ratio_log_s), xlab="Actividad (log10(postsXyear)", ylab="Popularidad (log10(followers/friends))") + geom_point()
# Add horizontal line at y = 2O
sp + geom_hline(yintercept=3)
# Change line type and color
sp <- sp + geom_hline(yintercept=3, linetype="dashed", color = "red",  
                      color = "red", size=1.5)
# Change line size
#sp <- sp + geom_hline(yintercept=3, linetype="dashed", 
#color = "red", size=1.5)
sp + geom_vline(xintercept = 3)
# Change line type, color and size
sp <- sp + geom_vline(xintercept = 3, linetype="dashed", 
                      color = "red", size=1.5)

sp <- sp +  
  geom_point(colour="blue") +
  geom_point(data=df_users[df_users$postsXyear_log_s > 3 & df_users$followers_friends_ratio_log_s > 3,], aes(x=postsXyear_log_s, y=followers_friends_ratio_log_s), colour="black")

sp

plot(df_users$postsXyear_log_s, df_users$followers_friends_ratio_log_s, xlab="Actividad", ylab="Popularidad")
abline(h =3, untf = FALSE)
abline(v =3, untf = FALSE)

# x actividad y Popularidad
data_filtrada_1 <-  df_users[df_users$postsXyear_log_s > 3 & df_users$followers_friends_ratio_log_s > 3,]
casos_1 <- nrow(data_filtrada_1)
casos_1

# X tipo de tweet
data_filtrada_2 <- data_filtrada_1[data_filtrada_1$tweet_type == "TW",]
nrow(data_filtrada_2)

# X presencia de urls
data_filtrada_3 <- data_filtrada_2[as.numeric(data_filtrada_2$url_tweets_ratio) >= 1, ]
nrow(data_filtrada_3)
names(data_filtrada_3)
#view(data_filtrada_3)
data_filtrada_3[["screen_name"]]
