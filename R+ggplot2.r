install.packages("ggplot2") library("ggplot2") ggplot(cars_sample, aes(x=Weight, y=MPG)) + geom_point()
//size mapping 
ggplot(cars_sample, aes(x=Weight, y=MPG)) + geom_point(aes(size=Weight))
//color mapping ggplot
(cars_sample, aes(x=Weight, y=MPG)) + geom_point(aes(size=Weight,color=Manufacturer))
//change opacity ggplot
cars_sample, aes(x=Weight, y=MPG)) + geom_point(aes(size=Weight,color=Manufacturer,alpha=0.5))
//add regression line 
geom_point(aes(size=Weight,color=Manufacturer,alpha=0.5))+geom_smooth(method=lm)
