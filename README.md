# PMC Build Website

Construction consulting, project management, and owner representation — South Okanagan, BC.

Static site: no build step, no framework. Just HTML, CSS, and vanilla JS.

## Structure

```
index.html          Home
about.html           About Pat / PMC Build
services.html        8 service categories
projects.html         Case studies + completed work reference
process.html          7-step process
service-area.html     South Okanagan communities served
resources.html         FAQ / educational content
contact.html            Inquiry form (Formspree) + contact info
css/styles.css         Shared design system
js/main.js              Mobile nav
images/                 Site photography
robots.txt / sitemap.xml   SEO
```

## Deploying (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select this repo. Build command: none. Output directory: `/`.
4. Attach `pmcbuild.ca` and `www.pmcbuild.ca` under Custom Domains.
5. On the `pmcbuild.com` zone: add proxied A records for `@` and `www` pointing to `192.0.2.1`, then create a Redirect Rule forwarding all traffic to `https://www.pmcbuild.ca`.

## Contact form

The inquiry form on `contact.html` posts to Formspree (`https://formspree.io/f/mrenbzbe`). Submissions email directly to the address verified on that Formspree account. No backend required.

## Updating content

Every page is plain HTML — open the file, edit the text between the tags, save, commit, push. Cloudflare Pages auto-redeploys on push to `main`.
