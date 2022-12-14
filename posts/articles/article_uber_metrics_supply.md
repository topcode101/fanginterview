---
layout: unique layout stufff
title: for Uber, what metrics define enough supply?
description: measure a business with metrics
summary: this id my summary
tags: [css]
-----------


* Potential Source of Companies: {Uber}{Doordash}{Lyft}{Didi}
* Technical Area: {Define Metrics}
* Business Area: {Marketplace}
### Real Interview Question
(with some adjustment)

* for Uber/Didi, what metrics define enough supply?

### Pro Tips

 If you never think about this question before,  
 it is probably harder to get to the point.  
 Let me give a starter:  
 think about what is supply and demand,  
 and what happens to user experience when there is truly no supply or no demand.

###  A recommended answer

* To start with, you have to clarify the questions in some details.
* It is ok that you are not familiar with this question, but it is a good
* idea to talk about how you want to tackle this.

> **Let's understand the business**
> first so we would be able to know how to measure what.
> Supply here means the drivers,
> they receive request to ride and choose to accept.
> so corresonding demand means rider who open app to request.
> As our focus is to **define** **enough**,
> it is a relative term, and it should be relative to demand.
> So I want to **think out loud by study the following matrix of metrics.**

* then you can talk it through.

> First thing first,  
> the way we can define supply and demand metric here is:
> * `app-session opened` and
> * `available drivers`
>
> Hypothetically **think about the extreme scenario to understand what could happen**  
> and what to monitor.
>
> **When there is no car or driven**, every one is requesting the car but no one will get the service:  
> This is the first metric:
> * `request fulfill rate`.
> A low fulfill rate could indicate that there is not enough driver.
> But of course, it could be other issues like system issue.
> So I would also monitor
> * `total number of supply` or
> * `online drivers/rider-app-session ratio`
> to double check if it truely different.

* Please note here, as I am talking through my metrics, I also captured a pitfall that original metric cannot cover. So I adjusted it accordingly.
* It is much better to do it by yourself than the interviewer tells you.
* **It is totally ok to have flaws in your answers but it is much better you are also aware of it and talk about it!**

> Then if you think deeper about this scenario,  
> price would be high, (which is surge).  
> There would be zero car shows at rider app.  
> So, from rider perspective,
> * `zero-car rate` is also a metric to show there is not enough supply.  
> Finally, as a driver,
> * `ETA from requst to fulfill`, `ETA from fulfill to pick up` could all be longer.
>
> Now, **let's go from the other side, there is too many supply**.
> of course, the metrics mentioned above, would perform perfectly,
> lke request fulfilll rate is almost 100%, eta is low, zero rate is low.
> But, on driver side, things get worse:
> The `request per driver` is too low,
> * `driver idel time` will be significantly higher.
> Eventually, driver could have **less income** because of low demand,
>
> and driver could even **churn**.
> These are more of longer term impact. This could be the worst case.
> If there is no driver, we can increase price to get more drivers,
> but if there is no demand, there is a problem with the business itself.

