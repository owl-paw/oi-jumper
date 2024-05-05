# oi-jumper

With this tool site, you are able to quickly jump to various Online Judge sites that are used in competitive programming. The site is built with base [Tailwind CSS](https://tailwindcss.com/) and deployed by [Vercel](https://vercel.com), with its repo being hosted on GitHub. You can visit the site [here](https://oi-jumper.eoin.blog).

It's also worth noting that this site is more of a practice project than a fully competent webapp. I learned to code webpages using Tailwind CSS and the CSS flexbox environment during the development of this site. If you also happen to be a greenhand in web development or don't know your way around flexbox, I highly recommend checking out [the flexbox tutorial by Josh W. Comeau](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/).

## Instruction on the Usage

There are 2 main features implemented on this site. One is to quickly open a link to the targeted CP problem on your selected online judge, which inspired the naming of this project, and the other is to quickly search for a problem on your selected online judge. There are some nuances that you might encounter during the use of this site.

### Problem Jumping

"Jumping" refers to the first feature described above. Within the upper input field that you'll see on the webpage, enter the numeral or alphabetical ID of the targeted problem, for instance, P1000 for 洛谷, 1000A for Codeforces and such. This mechanism is achieved by piecing together the problem ID with the URL of the targeted online judge. 9 online judges are currently supported.

To best ensure the validity of the formed URL, an additional check is performed before the URL is sent to the browser. However, for the sake of speed and simplicity, the check is simply carried out with basic Regular Expressions, allowing some invalid inputs to be combined into the formed URL. This might be refined in future development, but there are no plans to support stricter boundary checking as of now. If necessary, you can view the regular expressions set for supported online judges in the `script.js` file located in the `assets` directory.

### Problem Searching

Within the lower input field, enter a search term that'll bring you to the search page of the online judge to view specific search results. Due to CORS policy of browsers and concerns over decreased performance, the mechanism is, again, implemented by combining the search term and URL.

It's worth mentioning that, due to the fact that on-site problem searching is not currently supported on Codeforces or AtCoder, Google Search is used instead, meaning the search term is combined with Google Search URLs and specified to search for cached entries only on the online judges' websites. This may result in search results including blogs or other publicly posted data instead of problems. Please bear with that.

If not empty, search terms you entered will not be additionally checked for validity, as any input can possibly be a valid search term.

## Contribution Guide

I'd be surprised if anybody actually pulls a single request or even files a single issue.

File an issue if there are other online judges or other features that you want the site to support, and that are within the range of acceptability on this project. Or if you are kind and free enough, pull a request to code your expectations directly!
