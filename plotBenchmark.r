#!/usr/bin/Rscript

# Plots the most recently run benchmark OR the file supplied in the first argument
cat("In ur computar, plotting ur benchmarkz...\n")

library(ggplot2)

b = read.table("sweep.log", sep = "\t", header = T)

b$error = abs((b$hz - b$observed)/b$hz)

gg <- qplot(hz, error, data = b, log="x")
png(filename = "plot.png", width=800, height=400, units='px')
print(gg)

#ggsave(p, "p.pdf", width = 4, height = 4)

#cat("doin stuff")

#line <- readline(con="stdin", 1)
#l <- readline()

dev.off()
