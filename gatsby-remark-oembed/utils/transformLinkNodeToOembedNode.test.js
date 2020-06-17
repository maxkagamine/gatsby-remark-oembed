const transformLinkNodeToOembedNode = require("./transformLinkNodeToOembedNode");

describe("#transformLinkNodeToOembedNode", () => {
  const originalNode = {
    type: "link"
  };

  test("handles html oembeds", () => {
    const transformedNode = transformLinkNodeToOembedNode(originalNode, {
      author_name: "LevelUpTuts",
      author_url: "https://www.youtube.com/user/LevelUpTuts",
      height: 270,
      html:
        '<iframe width="480" height="270" src="https://www.youtube.com/embed/b2H7fWhQcdE?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
      provider_name: "YouTube",
      provider_url: "https://www.youtube.com/",
      thumbnail_height: 360,
      thumbnail_url: "https://i.ytimg.com/vi/b2H7fWhQcdE/hqdefault.jpg",
      thumbnail_width: 480,
      title: "GatsbyJS Tutorials #1 - Getting Started with Gatsby",
      type: "video",
      version: "1.0",
      width: 480
    });

    expect(transformedNode.type).toBe("html");
    expect(transformedNode.value).toBe(
      '<iframe width="480" height="270" src="https://www.youtube.com/embed/b2H7fWhQcdE?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    );
  });

  test("handles photo oembeds", () => {
    const transformedNode = transformLinkNodeToOembedNode(originalNode, {
      title: "Miku GIF - Find & Share on GIPHY",
      url: "https://media1.giphy.com/media/FKDbDiRdvs3WU/giphy.gif",
      height: 208,
      width: 250,
      author_name: "GIPHY",
      author_url: "https://giphy.com/",
      provider_name: "GIPHY",
      provider_url: "https://giphy.com/",
      type: "photo"
    });

    expect(transformedNode.type).toBe("html");
    expect(transformedNode.value.replace(/\s+/g, ' ').trim()).toBe(
      '<img src="https://media1.giphy.com/media/FKDbDiRdvs3WU/giphy.gif" class="gatsby-remark-oembed-photo" width="250" height="208" alt="Miku GIF - Find & Share on GIPHY"/>'
    );
  });
});
