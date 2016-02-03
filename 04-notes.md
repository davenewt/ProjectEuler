# Problem 4: Largest Palindrome

> A palindromic number reads the same both ways.

> The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

> Find the largest palindrome made from the product of two 3-digit numbers.

## Workings

Started by thinking that as we need to find the **largest** palindrome, we should simply start testing with `a x b` = `999 * 999`, decrease `b` until `b = a`, whereupon we decrease `a` and reset `b` to `999`. Then, when we find a palindrome, we're done:

- 999 x 999
- 998 x 999, 998 x 998
- 997 x 999, 997 x 998, 997 x 997
- 996 x 999, 996 x 998, 996 x 997, 996 x 996
- 995 x 999... and so on...

But this doesn't work, because we don't get results in decreasing order of their **product**:

```
Results from first batch of calculations

Investigating 999x999 998001
Investigating 998x999 997002
Investigating 998x998 996004
Investigating 997x999 996003
Investigating 997x998 995006
Investigating 997x997 994009
Investigating 996x999 995004 <--- this is larger than the result above! Won't work!
```

This got me thinking along another tack. Doing the calculations `a * b` in decreasing order of the **sum** of the two numbers (`a + b`) should work:

```
Results from first batch of calculations re-ordered
depending on their product  ------\/

Investigating 999x999 998001 --- 1998
Investigating 998x999 997002 --- 1997
Investigating 998x998 996004 --- 1996
Investigating 997x999 996003 --- 1996
Investigating 997x998 995006 --- 1995
Investigating 996x999 995004 --- 1995 <--- this calculation is now done before...
Investigating 997x997 994009 --- 1994      ...this one!
```

In the end, I ended up running through all calculations using numbers between 100 and 999, storing palindromes I found in an array. This was pretty quick way of finding all 1,239 palindrome results.

I then sorted the resulting array, storing its sorted contents in another array, and then looked at the largest result, which was the last item in the final sorted array.

## Potential Improvements

It would be good to figure out how to do the initial calculation of `a * b` in order of decreasing sum (`a + b`), so that when the first palindrome is found, we know it's the largest we're going to find.

Not yet wrapped my head around how to do this!
