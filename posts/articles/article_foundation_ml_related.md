---
layout: unique layout stufff
title: Machine Learning Common Must Prepared
description: measure a business with metrics
summary: this id my summary
tags: [css]
-----------

### Pro Tips
Unless you have a good memory, you must prepare these basic questions before interview!


### what is bias variance trade off?
I'll just quote it from Wiki directly
> The bias–variance dilemma or bias–variance problem is the conflict in trying to simultaneously minimize these two sources of error that prevent supervised learning algorithms from generalizing beyond their training set.
> The `bias error` is an error from erroneous assumptions in the learning algorithm.  
> High bias can cause an algorithm to miss the relevant relations between features and target outputs  
> (underfitting).
> Normally we say the model is not complicated enough to capture the true relationship.
>
> The `variance` is an error from sensitivity to small fluctuations in the training set.  
> High variance may result from an algorithm modeling the random noise in the training data  
> (overfitting).

> One example of bias-variance-dilemma: in regression, **regularization methond** itself is a trade off between bias and variance. This method introduce bias delibrately but reduce variances a lot, compared with **ordinary least squares method**

### What is the common metrics to evaluate bi-classification model?
Note: this is almost asked for most of the interviews if there is a ML model
> precision & recall
> ROC-AUC
> accuracy

### How to compare each model:
1. linear model
2. tree model
3. random forecast

###  What ML model you will choose or recommended to the team?

> Answer them from both technical and system cost perspective.
>
> From business perspective, remember a complex model could have a higher ROCAUC but
> it may not even translate to the final business metric improvement!
> We should always think about the cost associated with a ML in production.  
> A lot of times, even rule based model work pretty good.
>
> From technical perspective, we control quality from train/test data set that maximize/minimize our desired metrics.
