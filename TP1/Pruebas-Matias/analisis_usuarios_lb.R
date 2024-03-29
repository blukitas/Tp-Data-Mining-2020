---
title: "R Notebook"
output: html_notebook
---


```{r}
library(infotheo)
  names(df_users)
  
  # Distribucion y Escalado
  
  #nota: a todas se les suma un numero e, para evitar Log10(0)
  
  # Sin transformacion: LOG10
  # postXyear
  summary(df_users$postsXyear)
  plot(sort(df_users$postsXyear))
  hist(df_users$postsXyear, xlab = "posteosXaño", ylab ="Frecuencia", main="Distribución de la variable \n SIN transformación")
  
  aux <- data.frame(table(df_users$postsXyear))
  
  boxplot(df_users$postsXyear)
```

```{r}
e <- 0.000001 
  
  df_users$followers_friends_ratio_log <- log10(df_users$followers_friends_ratio + e)
  df_users$postsXyear_log <- log10(df_users$postsXyear + e)
  df_users$friends_count_log <-log10(df_users$friends_count + e)
  df_users$followers_count_log <- log10(df_users$followers_count + e)
  df_users$statuses_count_log <-log10(df_users$statuses_count + e)
```

```{r}
# con transformacion log10
  summary(df_users$postsXyear_log)
  plot(df_users$postsXyear_log)
  plot(sort(df_users$postsXyear_log), ylab = "Log10(posteosXaño)", xlab = "Observaciones", main="Actividad SIN discretizar")
  hist(df_users$postsXyear_log, xlab = "Log10(posteosXaño)", ylab ="Frecuencia", main="Distribución de la variable \n CON transformación")
  boxplot(df_users$postsXyear_log,ylab="log10(postsXyear)", main ="Actividad SIN discretizar")
```

```{r}
 # statuses_count
  summary(df_users$statuses_count_log)
  plot(sort(df_users$statuses_count_log))
  hist(df_users$statuses_count_log)
  boxplot(df_users$statuses_count_log)
```

```{r}
# followers_count
  summary(df_users$followers_count_log)
  plot(sort(df_users$followers_count_log))
  hist(df_users$followers_count_log)
  boxplot(df_users$followers_count_log)
```


```{r}
# friends_count
  summary(df_users$friends_count_log)
  plot(sort(df_users$friends_count_log))
  hist(df_users$friends_count_log)
  boxplot(df_users$friends_count_log)
```

```{r}
# con transformacion log10
  summary(df_users$followers_friends_ratio_log)
  plot(df_users$followers_friends_ratio_log)
  plot(sort(df_users$followers_friends_ratio_log))
  hist(df_users$followers_friends_ratio_log, xlab = "Log10(posteosXaño)", ylab ="Frecuencia", main="Distribución de la variable \n CON transformación")
  boxplot(df_users$followers_friends_ratio_log)
```


```{r}

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
  
```

# Discretizado
```{r}

  # binning
  # eqwidth/eqfreq
  
  #nbins<- sqrt(nrow(df_users))
  nbins<- nrow(df_users) ^ (1/3) 
  #nbins
  
  # Discretize recibe el atributo, el método de binning y la cantidad de bins
  bin_eq_width_postsXyear_log <- discretize(df_users$postsXyear_log,disc="equalwidth", nbins = nbins)
  
  
  # Por cada bin calculamos la media y reemplazamos en el atributo suavizado
  for(bin in 1:nbins){
    bin_eq_width_postsXyear_log$suavizado_postsXyear_log[bin_eq_width_postsXyear_log$X==bin] = mean(df_users$postsXyear_log[bin_eq_width_postsXyear_log$X==bin])
  }
  
  bin_eq_width_followers_friends_ratio_log <- discretize(df_users$followers_friends_ratio_log,disc="equalwidth", nbins = nbins)
  
  for(bin in 1:nbins){
    bin_eq_width_postsXyear_log$suavizado_followers_friends_ratio_log[bin_eq_width_followers_friends_ratio_log$X==bin] = mean(df_users$followers_friends_ratio_log[ bin_eq_width_followers_friends_ratio_log$X==bin])
  }
  
  #View(bin_eq_width)
  
  plot(sort(df_users$postsXyear_log) , type = "l", col="red", ylab = "log10(postsXyear)", xlab = "Observaciones", main = "Actividad")
  #plot(sort(df_users$followers_friends_ratio_log) , type = "l", col="red", ylab = "log10(followers_friends_ratio)", xlab = "Observaciones", main = "Popularidad")
  
  # Agrego la serie de la variable media 
  lines(sort(bin_eq_width_postsXyear_log$suavizado_postsXyear_log),type = "l", col="blue")
  legend("topleft", legend=c("Original", "Suavizado"), col=c("red", "blue"), lty=1)
  
  #lines(sort(bin_eq_width$suavizado_followers_friends_ratio_log),type = "l", col="blue")
  #legend("topleft", legend=c("Original", "Suavizado"), col=c("red", "blue"), lty=1)
  
```

```{r}

  df_users$followers_friends_ratio_log_s <- bin_eq_width_postsXyear_log$suavizado_followers_friends_ratio_log
  df_users$postsXyear_log_s <-  bin_eq_width_postsXyear_log$suavizado_postsXyear_log
  #df_users$friends_count_log_s <- 
  #df_users$statuses_count_log_s <- 
  #df_users$followers_count_log_s <- 
  
  #summary(data)
  plot(df_users$postsXyear_log_s)
  plot(sort(df_users$postsXyear_log_s), ylab = "Log10(posteosXaño)", xlab = "Observaciones", main="Actividad discretizada \n en bins de igual ancho")
  hist(df_users$postsXyear_log_s)
  boxplot(df_users$postsXyear_log_s, ylab="log10(postsXyear)", main ="Actividad discretizada n\ en bins de igual ancho")
  
```


  
  # variables redundantes
  
  
  # outliers  no lo use pero lo probe
  
```{r}

  #saco los datos correspondientes al bin inferior de una de las varoiables
  #data <- df_users
  #min(df_users$followers_friends_ratio_log_s)
  #data <- data[data$followers_friends_ratio_log_s>min(df_users$followers_friends_ratio_log_s),]
  #nrow(data)
  #nrow(df_users)
```
  
  
  # filtrado
```{r}

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
  data_filtrada_3 <- data_filtrada_2[as.numeric(data_filtrada_2$followers_friends_ratio_log_s) >= 3, ]
  nrow(data_filtrada_3)
  #view(data_filtrada_3)
  data_filtrada_3 %>% select(screen_name, followers_friends_ratio_log_s, postsXyear_log_s, url_tweets_ratio,) %>% arrange(desc(followers_friends_ratio_log_s)) 
```
  
  