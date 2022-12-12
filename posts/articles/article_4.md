---
layout: unique layout stufff
title: How do you measure success of customer service experience?
description: measure a business with metrics
summary: this id my summary
tags: [css]
---
* Potential Source of Companies: {AirBnb}
* Technical Area: {Define Metrics} {Debug Metrics}
* Business Area: {Customer Service}
### Real Interview Question
(with some adjustment)

* How to measure success of customer service experience of Airbnb?
* If # customer service ticket goes up, what could it be?

### Pro Tips

Give a high level framework before you answer details!  
Don't go too far into details which weaken your framework.  
Make it a very structured conversation.

Follow-up question is a very general debug question.  
Find a framework to make sure you ideas is not pure random business intuition.

###  A recommended answer

> I would want to understand the business a bit more:  
what is the business problem that customer service try to resolve(original goal),  
and how it is solving the problem as of today(how it works)

* Assume interviewer gives you a very standard introduction on what this department do: customer submit tickets with issues & they mainly address tickets from customers
* Let's talk about the measurement framework to the interviewer

> So, based on the business goal of customer experience group,  
> I want to measure the success in the following two direction:
> 1. The effectiveness of the department/ program, defined as this metric
> * `case resolved rate`.
> 2. The efficiency of the department. For example, how fast can you resolve case, defined as this metric
> * `average time to resolve the case`.
>
> If the time to process case is long, then focus on **general funnel metrics** to resolve case to debug why it is taking too long,  
> for example if it is because there is not enough agent  
> (all too busy or agent not available out of work), or if just because,  
> the tickets is hard to resolve.
>
> 3.  Last but not least, the unit economics of this department.
> * `dollar cost per case resolved`

* I am not listing a long detailed conversation above. You should make it more conversational.
* Now the follow up question is about metric-deep-dive:

> For the follow up quesiton on why tickets would be higher like 10%,  
> I want to tackle this in three steps:
>
> 1. Make sure this is not false alarm from **bad data quality**
>
> I would double check data source, and visualize timeline trend of tickets.
>
> 2. Get initial **data insights** to come up with hypotheses:
>
> * find out when this happened from time-series.
> * Narrow down what category of tickets goes up, if data available.
> With this all ready, we are ready to both rull out or come up with some hypotheses.
>
> 3. I'll **list hypothesis and describe how to validate it with data**:
> a) external
> b) internal reasons
> c) data issue.
>
> External reasons could be
> * Holiday, which means it is seasonal on tickets. Metrics to check could be ...
> * Competitors
>
> Internal reasons could be:
> * did we make any change, like launch new product. Metrics to check could be ...
> * did we had any outage during the time
> * if the tickets is brough up by high booking volume as well: Metrics to check could be ...
>
> Other hypothesis like if the extra tickets is filed from certain user group,  
> which again can be validated by different segmentation analysis
>
> After understand what could be the main reason, we could be able to  
> **brainstorm** solutions to address the problem.  
> but I would also do **impact sizing** to understand the pros and cons to improve the metric