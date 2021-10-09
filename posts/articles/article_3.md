---
layout: unique layout stufff
title: FB 3 Define meaningful social interactions in FB?
description: this is a description
summary: this id my summary
tags: [css]
---
#  

https://www.productmanagementexercises.com/6092/define-meaningful-interaction-facebook-metrics-evaluate

https://www.1point3acres.com/bbs/thread-796041-1-1.html

https://www.fastcompany.com/90679444/this-is-whats-really-behind-the-great-resignation

https://animoto.com/blog/business/facebook-explains-news-feed-update



Hints: define business problem ; define metric ; 

`Why fail`not know where to start.

First of all, clarify the goal. It looks like it is just define metrics but it actually , and must involvs with some business problem ! Put your self in to the situation that CEO is actually ask you this quesiton. Would you just do it?

No ! You must discuss with him why even ask this question. Understand the business problem behind this.

> So first of all I would like to clarify what is the busiss problems that we want to address before we define the meaningful social interactions here.

Can you take a guess.

> It is likely that without a meanifing social interaction as our goal, we may have too many non-meaningful like interaction with ads, impression with ads etc. It is violating with FB mission!! that is why.

**https://www.quora.com/How-do-news-feed-algorithms-work/answer/Abhinav-Sharma: emergence of clickbait as a problem. Now, one can make the naïve argument that maximizing click => maximizing impressions => maximizing advertising dollars, and this is how the industry has more or less operated for a while.**** 如果你知道这个本质 那么下面的问题就更容易了**But burnout is real and the most money is in high intent advertising (travel, wedding, etc.) and not just any clicks so companies are trying to find ways to optimize long-term metrics over short term metrics. The problem with long term metrics is that they’re too nebulous and sparse to perform effective machine learning on, e.g. a satisfaction survey or a qualitative feedback report, or worse, a user dropping off your product for good.**



After that you would know what to answer. You want to quantify it! Always put it as at least two side: customer perspective and company perspective. 

From company perspective, the meaningful is always involve profit and actually it is related to long/short term performance.

From customer perspective, it is if user is happy about the product!! in busienss is it like engagement etc.

> I would like to define the what is meaningful here and then quantify it. THe quantification would be direct measurement or proxy and I’ll try to measure it from different perspective if necessary.
>
> Now meaningful: I would define it as “meant to keep you connected to the people, places and things that you care about, starting with your friends and family”

Now, it seems at least some part of it can be quanitied, like connect frineds etcs.

> So on high level: our metric would be.
>
> 1. Engagement with friends or family
>
> To define a more specific one.
>
> Engagement would be 
>
> 1. likes
> 2. comments
>
> There is something here as what is family or friends. Well, it is the social graph. related.

Let’s skip this first.

You would ask so what! right. How we use this metric? It actually can be used in the model training procedures!

This is why we need to definition first!

`Wrong answer`: User a combined metric : use the weights:regression for predict active users by likes, … etc.

This is very wrong!!! You have to know why it is wrong. For example, if you regress likes and other things to active users, then why you even want to use the prediction or correlation here. why not just user active user!

The reason is becasue you havn’t think through what is needed.

There is no right or worng, it is about judgement call.

这里如果真的有predict 一定是long term/short term metric 的trade off！https://www.quora.com/How-do-news-feed-algorithms-work/answer/Abhinav-Sharma

You can even framing the problem to be a ML problem! for 



# FB高频题 https://www.1point3acres.com/bbs/thread-697741-1-1.html





FB Case 1 Detect Spam Requests

hints:  ml model, spam, fraud related.

Why fail: not understand why to even do it. Friction Design in Product

First of all, we need to frame the problem. But before that we even want to understand the use case! That’s how we know what kind of model we need and when the model can be used to address the business problem.

> So, I am thinking this i like a modeling question but before we deepdive into it. I want to understand the business problem first which would help us to choose the right model and techniques to address the problem.
>
> If I am undertand it correctly, we want to detect a spam request to a FB user. And the spam is likely due to some not good user that send out a lot of Friend request. And at that time of request we want to prevent it happening or stop it happning.
>
> For the SPAM, let’s say it is request level. but not user level, right?

Then the interviewer would tell you what kind of that is.

Now here comes another question, is this a supervised or non supervised model?



“There is a question of who can send you friend requests, and it's strongly suggested that you change it to "Friends of Friends.”‘

* this person profile history recent change
* mutual friends
* if profile complete
* if image real
* if his frined makes sense
* spam behavior: ask to send money/ ask to send video



# FB Case 2 FB want to launch a new product called Portal. (virtual meeting) (1) identify potential users (2) how to know if the product meets the need (3) impact of Portal to FB overall (4) if entering Europian, can we drop the price?



hints: market sizing, product metrics, FB ecosystem, product pricing. 

Common failure: not organized thinking and not reachable.

1) Market sizing: similar product, (approxy of the product bench mark); user needs ( who really need this product) ;  from data perpective, we can use internal data or external data. 

2) Product needs is certainly the product metrics. We can track the health of the product itself. Ladder of engagement is more important here. It is about the user journey and lifecycle of the product.  

   Even the need itself can be general needs or specific needs

   Also, recommended go from user direct feedback: such as tickets. complaints, forums to understand the data. Even , user resarch if we have it.

3) Yes, this is just metric of other. But we can think of scenarios that will have some canibonism or thynergy!

4) This is about pricing elasticity.





# FB 3 What is the impact of parent’s presence on Facebook?















# Solve problem is less important, it is about the methodology-> What problem to solve first!! This is the goal!!!



# Google

https://www.1point3acres.com/bbs/thread-779954-1-1.html

一个假象的case，说你有一个客户来找你 想问你城市A/B 居民的身高是否有差别 你准备怎么来帮助客户回答这个问题。 然后又这个问题进行了延展 比如说，做调研，找online 数据， 随机选人来测量他们的身高。 每个方法快问快答了一下你觉得的优缺点
然后说假设AB test 做的话 哪些因素会影响你的sample size。每一个因素用通俗的语句和客户讲解。 其中有一个follow up是如果estimate 年龄的standard deviation
后面问了linear model的有哪些assumption，怎么检查违背了怎么办， VIF 具体是怎么算的， Multi collinearity 会有什么问题.. etc  

# Google [Statistics] How to compare heights of two cities

**Hint** Stats driven. Benchmark statistical methods. 