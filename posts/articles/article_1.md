---
layout: unique layout stufff
title: FB finds teenagers are less active if their parents are facebook users. How to measure it? And how to address the problem?
description: this is a description
summary: this id my summary
tags: [css]
---


**`A Common Failed Reason`** Correlation is not causality. The measurement is a bit tricky here …

**Solution:** 
First of all, always ask why we need to do this? In here it is why we want to understand this question. Clarify with the interviewer. 
You can say something like this:

>  (interviewee)To clarify the problem and goals, we are here to `validate a hypothesis` : which is `teenagers with parents on facebook are less likely to engage`. After we validate this is true, we would like to address the business problem.

You can see there are actually two problems to solve here. This is really common. You have an hypothesis, prove it with data and then it becomes the known insight. With this known fact,  you can brainstorm solutions to address the issue.

Let’s do it one by one.

First of all , how to prove the  `teenagers with parents on facebook are less likely to engage` and if possible, quantify the impact? A common `bad answer`  only mentionl the cohort but didn’t mention problems of correlation and causation. Note this might be a serious problem as you are a data science which supposes to know the pitfalls!

An example answer could be:

> (interviewee)There are multiple ways to validate this hypothesis with data. The major challenge should be correlation & causation when we try to do analysis with observational data.
>
> Let’s do two steps. 
>
> Step 1. Check the correlation. We can compare the engagement metrics( Note: you can give some example here) between users who has parents or don’t have parents on facebook. We shoud see a significant drop engagement for users with parents. However, the cause might not be parents. It is also likely to be the fact that users with parents on FB and users with lower engagement share the same cofounder: Very younger users don’t have time to use FB and their parents also like FB as well. (Note:  mentions some cofounder is a good habid when do interview, it demonstrate the business accumen)
>
> 
>
> In the Step 2, we should do some more regious analysis to prove the fact. There are multiple ways to do so: for example, probablity score matching ( where you will predict is a users has parents on FB or not with all possible cofounders) or regression based analysis (just bring in all possible cofounder)
>
>
> There is a third way to do actually: we can always design a experimentation. The idea is simple: in treatment group, we can change the backend algorithm that make parents and children easier or harder to be matched. 

As you can see, we just talked about three ways to validate the hyposise from data. Highly recommend to briefly talk about the pros and cons in the end. This actually proves that you are a qualified experienced data scientist : )

> Correlation anlaysis is quick but may suffer issues of correlation and causation. Causal analysis is theoretically more accurate but still takes time to find the true cofounder. The final result is very likely biased with causal analysis on observational data. Experimentation based study is most accurate but it really takes a lot of resource to do it.



OK, until now, we addressed the first problem: we validate it is true that users with parents on FB is likely to have less engagemnt.

One follow up question here:

> (interviewers) What metrics are you thinking of here?

This by no means is a subquesiton to test if you can structure the answers. 

> (interviewee) We need to measure the impact and let’s define the measurement. We can try to understand the measurement on this categories.
>
> 1. company level OKR metric: for example avg DAU, avg user Revenue. If the problem is large enough, we are likely to have significant drop of thse metrics and we definitely  need to come up with strategies to adress this problem.
>
>    It is likley the move ment is not stats sig for overall metric, so for the same metric, we will centainly do some segmentation. Very likely these segment is to be new/old users, young and older users, etc. There could be different hypotheses on the change of these metrics, but I’ll skip this first. So this is the most important metric
>
> 2. Other user behavior metrics. This set of metrics is trying to measure more secondary things. Some hypothesis could be : yong  would have different behavior with parents like more or less interactions. The corresponding metric could be comments, time spend on app. interactions with parents and non-parents., even time changes.
>
> 3. Heterogenious effect: this impact would be different for different cohort. like country/culture/education !! We would segment on these users!



So what we can do? 

It is important to clarify the goal again. For example, is the goal to improve younger user engagement ? do we really want younger users not to have parents on FB? These are more likely to be stratigic decision and it is correlated with the goal.

Let’s say the goal is simple: improve the engagement.

> (interviewee)Since our goal is to improve engagement, and we also know the insight that younger users with parents on FB is hard the metric, we can trainstorm some idea:
>
> 1. change the matching or recommendation algorithms that do not focus on matching parents.
> 2. if matched, we can provide a product that can mask another people or hide from another people(which is likely to be the concern of younger users)

At this point, we actually bring storms some product change, and you should know there is always a qualitative way to test or bring storm ideas:

> (interviewee) We can actually do some user researech to understand the idea. We can have some interviews with users actually have parents on FB and ask them about the their concerns. 

The above ansewer will make you pass the interview for this question : ) 