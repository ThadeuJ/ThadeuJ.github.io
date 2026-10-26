document.addEventListener("DOMContentLoaded", () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    node.nodeValue = node.nodeValue.replaceAll("Angry Bird", "Flappy Bird");
  }
});
