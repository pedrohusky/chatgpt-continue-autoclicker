const languageExtensions = {
  'javascript': '.js',
  'python': '.py',
  'java': '.java',
  'c': '.c',
  'cpp': '.cpp',
  'php': '.php',
  'ruby': '.rb',
  'swift': '.swift',
  'go': '.go',
  'rust': '.rs',
  'shell': '.sh',
  'typescript': '.ts',
  'csharp': '.cs',
  'kotlin': '.kt',
  'scala': '.scala',
  'groovy': '.groovy',
  'perl': '.pl',
  'lua': '.lua',
  'r': '.R',
  'matlab': '.m',
  'html': '.html',
  'css': '.css',
  'json': '.json',
  'xml': '.xml',
  'bash': '.sh',
  'sql': '.sql',
  'markdown': '.md',
  'text': '.txt',
  'yaml': '.yaml',
  'dockerfile': 'Dockerfile',
  'powershell': '.ps1',
  'batch': '.bat',
  'vb': '.vb',
  'fsharp': '.fs',
  'haskell': '.hs',
  'julia': '.jl',
  'objective-c': '.m',
  'fortran': '.f90',
  'prolog': '.pl',
  'vba': '.vba',
  'cobol': '.cbl',
  'lisp': '.lisp',
  'scheme': '.scm',
  'assembly': '.asm'
};

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

  // Function to create a download of the text
  function download(filename, text) {
    // Split the text by new line character
    var lines = text.replace("javascriptCopy code", "").split('\n');

    // Join the remaining lines back together
    var filteredText = lines.join('\n');

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filteredText));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  // Function to add a "Save to File" button
  function addSaveToFileButton() {
    // Query for the code blocks
    const codeBlocks = document.querySelectorAll('pre');

    // Iterate over the code blocks
    for (let i = 0; i < codeBlocks.length; i++) {
      // If a "Save to File" button already exists for this block, skip it
      if (codeBlocks[i].nextElementSibling && codeBlocks[i].nextElementSibling.classList.contains('save-to-file-button')) continue;



      const firstSpan = codeBlocks[i].querySelector('span');

      // Get the programming language of the code block
      const language = firstSpan.textContent;



      // Create the "Save to File" button
      const button = document.createElement('button');
      button.className = 'btn relative btn-neutral whitespace-nowrap -z-0 border-0 md:border save-to-file-button';
      button.innerHTML = `
    <div class="flex w-full gap-2 items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
    </svg>
    Save as a <b>${language}</b> File
  </div>`;
      button.style.width = '99%'; // Add this line
      button.style.display = 'block'; // And this line
      button.style.marginLeft = '3px';
      button.style.marginBottom = '3px';

      // When the button is clicked
      button.addEventListener('click', function () {


        // Ask the user for the filename
        let filename = prompt('Enter the name for the ' + language + ' file');

        // If the user didn't press Cancel
        if (filename !== null) {
          // Clone the pre element
          const clonedPre = codeBlocks[i].cloneNode(true);

          // Get all button elements from the clone and remove them
          const buttons = clonedPre.querySelectorAll('button');
          buttons.forEach(button => button.parentNode.removeChild(button));
          // Get the first span element from the clone and remove it
          const firstSpan = clonedPre.querySelector('span');

          // Get the programming language of the code block
          const language = firstSpan.textContent;

          let extension = ''


          if (filename.includes(".")) {
            filename = filename.split('.')
            extension = '.' + filename[1]
            filename = filename[0]
          }

          // Remove the span
          if (firstSpan) firstSpan.parentNode.removeChild(firstSpan);

          extension = languageExtensions[language] || extension;

          const final_name = filename + extension

          // Now the text content should not include the text of any button or the first span
          const code = clonedPre.textContent;
          // Download the code as a text file
          download(final_name, code);
        }
      });



      // Add the button right below the pre element
      codeBlocks[i].parentElement.insertBefore(button, codeBlocks[i].nextElementSibling);
    }
  }



  // Load interval setting and start auto-clicking
  chrome.storage.sync.get(['interval'], function (result) {
    setInterval(clickContinueButton, result.interval || 1000);
  });

  // Load interval setting and start auto-clicking
  chrome.storage.sync.get(['showSaveButton'], function (result) {
    if (result.showSaveButton) {

      // Call the function once immediately, then again every second
      addSaveToFileButton();

      chrome.storage.sync.get(['interval'], function (result) {
        setInterval(addSaveToFileButton, result.interval || 1000);
      });
    }
    setInterval(clickContinueButton, result.interval || 1000);
  });

})();
