---
layout: unique layout stufff
title: Numbers of search for events increased 10%? What could be the reason
description: this is a description
summary: this id my summary
tags: [css]
---


**`A Common Failed Reason`**: Lacking a framework to walk us through the diagnose process and cannot come up with proper hypothesis. 

`why fail`: random segmentation analysis and do not sounds like you have real experience. You communication matters a lot here.

**Solution:**

This categorized as a ‘diagnose a metrics’. This is super common question for DS, especially if you are analytical track. This is the simplest question that is focusing on business sense and ability to use data to find and locate the real business problem.
let’s `generate insights with data in a more systematic way`.

`Tip` The key to this question is a organized answer! There is no right or wrong! It is about your communication. You goal is a reall do the investigation and find the root cause. 

There are many ways to organize this answer, I’ll provide mine! I normally would just talk through and make it  more like a tree based diagnose.


Step 1: First of all, clarify the exact definition of the metric. This cannot be more important. The definition is left blurred on purpose! In the real world, it is likely just a PM call out on the metric and ask why. 

> (interviewee)Before we deep dive into what’s going on, let’s clarify the definition of the metric here. What do you mean numbers of search, as of how do you define a search here? Then when you say increasing 10%, what is the benchmark.
>
> (after the conversation with interviewer…) It is actually the daily number of search button click on FB dropped by 10%, compared to the number from last week.

Some other tips can really give you plus score that makes you very experienced! You can tell a story

> (interviewee)I would also make sure to validate if the metric truly dropped. What I’ve learned is to cross validate the drop of metric with different source of data! I’ve encounter problems where PM calls out a metric drop on google anlayics but turns out it is false alarm. Our internal dashboard is totally fine. There was some data pipeline issues.

Step 2: understand the metric more and benchmark with several other metrics.
This is really to understand the metric more and help generate hypotheses later on. Here is something we can do: 

> (interviewee)We will visualize and plot the time series of the search # over the past X months. We should focus on
>
> 1. if the drop is a sudden drop or slow drop over the time
> 2. if the drop is correlated with other possible engagement metrics like app DAU etc. 
> 3. slide and dice for common factors: user cohort, user demographic, user platform. These common factors can help us quickly identify or ruleout potential hypothesis later on.

Step 3: generate hypothesis. I am more focusing on hypothesise.
Here are the common hypothesis.

> (interviewee)we should try to think about these hypeses base on the basic learnings above.
>
> 1. Data issues
> 2. Internal outage
> 3. Internal product launch
> 4. External factor driven

Here is another tip that would make you looks like experienced data scientist.

> (interviewee) I’ll use the resources in your team and in the company. It is very likely about something happened that I or even my team do not know. I would communicate this with all possible stakeholders to collect feedbacks on hypothese.

Step 4: Quantification after hypothesis. This might be the hardest part. A lot of times, a drop can be from several factors. It is also important to have a ballpark estimation on each hypothesis.

> (interviewee) Here is what I would do for quantification.
> The idea is this: find any cause that might impact the search metric and estimate the counterfactuals if we don’t have the cause.
>
> For example, there is a product launch that changed the search algorithm. After we check the report on the search algorithm, we know that is might have a 1% drop on overall search, so the attribution of search algorithm change is 1%/10%, which is 10% attribution.
>
> Then we also notice that the user DAU also dropps. I would user the formula
> Search  = active users * search rate to attribute the impact of active users. 

Eventually, we’ll give recommendations according to the findings above.

> (interviewee) We’ll try to come up with different suggestions for different root causes.
> It could be fix a bug. or even make some product change.
> Luckly we just quantified the issues and attribted the impact, we can prioritize the actional plans accordingly!
