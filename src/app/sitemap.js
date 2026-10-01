export default function sitemap() {
 const base = "https://www.learnbuildhub.com";
 const pages = ["", "/learn", "/build", "/about", "/blogs", "/contact"];
 return pages.map((p) => ({
   url: base + p,
   lastModified: new Date(),
 }));
}
