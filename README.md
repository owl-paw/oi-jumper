# OI Jumper

The tool that allows you to efficiently jump to any CP problem on various platforms.

## Usage

Head to the website of this tool: [oi-jumper.vercel.app](https://oi-jumper.vercel.app). In case this is your first visit to the site, note that the default language is Simplified Chinese, and you might want to view the site in English by clicking on the language switcher on the bottom. Also, for certain security-oriented browsers (e.g. Safari and Firefox), you might have to explicitly allow the site to send pop-ups so that the requested webpage won't be blocked from opening. We promise that pop-ups in this site are only sent in response to actions requested by the user.

Select the CP platform in which your requested programming problem is hosted[^1]. Then type in the problem ID, or a search term that'll be fed into the platform's search engine[^2]. Then click the corresponding button or slam <kbd>Enter</kbd> to **JUMP** to your destination.

[^1]: If you can't find the platform you need, it's welcomed to open an issue or submit a pull request.
[^2]: For platforms that don't support in-site searching, we'll instead use plain old Google or Bing (depending on the chosen language), but specify the `site` tag to filter the results.

## Contributing

OI Jumper is a static site built using Tailwind and daisyUI. This is my first attempt at using a web framework to develop projects, and I feel very good about the combo of these two.

If you encounter any trouble when using this tool, or that you would like to add something to make the site better, it's always welcomed and appreciated to open issues and create pull requests. I'll make time to review and respond, but sadly there's no guarantee on my availability since I still got school studies to work on.

## Catchphrase Hunting

Well, in case you have any spare time, I'm glad to tell you that I've put something interesting in this project.

Every now and then I'll set a secret catchphrase that I've come up with (it's definitely something **not uncommon** that you can find on the Internet or somewhere else). Enter the catchphrase in the Problem ID input field, and if it's correct, the site will allow you to submit the answer even if the catchphrase doesn't match the input format for the currently selected CP platform. Submit the catchphrase and you'll be directed to Bilibili or YouTube (depending on the chosen language) and intentionally rickrolled.

Unless explicitly mentioned, catchphrases may only contain lower-case unaccented latin letters and numbers. The current catchphrase, hashed with SHA-256, is `816280b1928a963b53a78bfe4aea8275a07972b0bc9dd05e65448e3a57cb8ae1`.
