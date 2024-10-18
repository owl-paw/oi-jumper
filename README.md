# OI Jumper

The tool that efficiently directs you to any CP problem on various platforms at your request.

## Usage

Head to the website of this tool: [oi-jumper.vercel.app](https://oi-jumper.vercel.app). In case this is your first visit to the site, note that the default language is Simplified Chinese, and you might want to view the site in English by clicking on the language switcher on the bottom.

Select the CP platform in which your requested programming problem is hosted. Then type in the problem ID, or a search term that'll be fed into the platform's search engine. Then click the corresponding button or slam <kbd>Enter</kbd> to **JUMP** to your destination.

### Caveats

- If you can't find the platform your problem is on, it's more than welcome to submit an issue or create a pull request.
- Regarding the problem search feature: for platforms that don't support in-site searching, Google or Bing will instead be used with the `site` tag to filter the results. Please note that, the search engine to be used for the service depends on the site language selected by the user. Simplified Chinese users will be directed to Bing, whilst Google is opted for if English is selected, as access to Google is blocked in Mainland China. At the moment, this setup is preferred based on my personal preference, and the mechanism will get tweaked if related feedbacks are made.

## Contributing

OI Jumper is a static site built using Tailwind and daisyUI. This is my first attempt at using a web framework to develop projects, and I feel very good about the combo of these two.

If you encounter any trouble when using this tool, or that you would like to add something to make the site better, it's always welcome and revered to submit issues and create pull requests. I'll make time to review and respond, but sadly there's no guarantee on my availability since I still got school studies to work on.
