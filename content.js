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

let last_language = '';

(function () {

  function clickContinueButton() {
    const buttons = document.querySelectorAll(".btn");
  
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
  
      // Find the polygons in each button
      const polygons = button.querySelectorAll('polygon');
  
      // Check if the button has the desired polygons
      const hasDesiredPolygons = Array.from(polygons).some(polygon => {
        const points = polygon.getAttribute('points');
        return (
          points === '11 19 2 12 11 5 11 19' ||
          points === '22 19 13 12 22 5 22 19'
        );
      });
  
      if (hasDesiredPolygons) {
        button.click();
        break;
      }
  
      // Condition to find SVG with specific class
      const svgElement = button.querySelector("svg.-rotate-180");
      if (svgElement) {
        button.click();
        break;
      }

      if (button.innerText.includes("Continue generating") ||
        button.innerText.includes("Continue") ||
        button.innerText.includes(">>")) {
          button.click();
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
      const existingButton = codeBlocks[i].nextElementSibling;
      // If a "Save to File" button already exists for this block, update its text
      if (existingButton && existingButton.classList.contains('save-to-file-button')) {
        const language = codeBlocks[i].querySelector('span').textContent;
        if (language != last_language) {
          last_language = language;
          existingButton.innerHTML = `
      <div class="flex w-full gap-2 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
      Download as a <b>${language}</b> File
    </div>`;
        }

        continue;
      }



      try {
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
    Download as a <b>${language}</b> File
  </div>`;

        button.style.display = 'block'; // Display the button as a block element (takes full width)

        // Use flexbox to center the button horizontally
        button.style.marginLeft = 'auto';
        button.style.marginRight = 'auto';

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

      } catch (error) {
        continue;
      }


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
  });

})();
