(function () {
  function clickContinueButton() {
    const buttons = document.querySelectorAll(".btn");

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerText.includes("Continue generating") ||
        buttons[i].innerText.includes("Continue") ||
        buttons[i].innerText.includes(">>")) {
        buttons[i].click();
        break;
      }

      // Condition to find SVG with specific class
      const svgElement = buttons[i].querySelector("svg.h-4.w-4.-rotate-180");
      if (svgElement) {
        buttons[i].click();
        break;
      }
    }
  }

  setInterval(clickContinueButton, 1000);
})();
