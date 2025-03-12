<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const editorContent = document.getElementById('editor-content');
    const recipientInput = document.getElementById('recipient-input');
    const senderInput = document.getElementById('sender-input');
    const improveButton = document.getElementById('improve-button');
    const timeSavedElement = document.getElementById('time-saved');
    const errorMessageElement = document.getElementById('error-message');

    // Get option buttons
    const optionButtons = document.querySelectorAll('.option-button');

    // Get language, tone, and size dropdowns
    const languageDropdown = document.getElementById('languageDropdown');
    const toneDropdown = document.getElementById('toneDropdown');
    const sizeDropdown = document.getElementById('sizeDropdown');

    // Track selected values
    let selectedOption = 'rewrite'; // Default option
    let selectedLanguage = 'en'; // Default language
    let selectedTone = 'Casual'; // Default tone
    let selectedSize = 'Short'; // Default size

    // Get all dropdown options
    const languageOptions = document.querySelectorAll('#languageDropdown + .dropdown-menu .dropdown-item');
    const toneOptions = document.querySelectorAll('#toneDropdown + .dropdown-menu .dropdown-item');
    const sizeOptions = document.querySelectorAll('#sizeDropdown + .dropdown-menu .dropdown-item');

    // Get options containers
    const fixTyposOptions = document.getElementById('fix-typos-options');
    const polishOptions = document.getElementById('polish-options');
    const rewriteOptions = document.getElementById('rewrite-options');

    // Get the selected options elements
    const selectedLanguageElement = document.getElementById('selected-language');
    const selectedToneElement = document.getElementById('selected-tone');
    const selectedSizeElement = document.getElementById('selected-size');

    // Set initial active option
    document.querySelector('.option-button[data-option="rewrite"]').classList.add('active');
    rewriteOptions.classList.remove('d-none');
    selectedLanguageElement.textContent = 'EN';
    selectedToneElement.textContent = 'Casual';
    selectedSizeElement.textContent = 'Short';

    // Handle option selection
    optionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            optionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedOption = this.getAttribute('data-option');

            // Hide all options
            fixTyposOptions.classList.add('d-none');
            polishOptions.classList.add('d-none');
            rewriteOptions.classList.add('d-none');

            // Show the appropriate options based on the selected option
            if (selectedOption === 'fix-typos') {
                fixTyposOptions.classList.remove('d-none');
            } else if (selectedOption === 'polish') {
                polishOptions.classList.remove('d-none');
            } else if (selectedOption === 'rewrite') {
                rewriteOptions.classList.remove('d-none');
            }
        });
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function () {
            selectedLanguage = this.getAttribute('data-value');

            // Update active state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Update the selected language display
            if (selectedLanguage === 'xx') {
                selectedLanguageElement.textContent = 'Auto';
            } else if (selectedLanguage === 'en') {
                selectedLanguageElement.textContent = 'EN';
            } else if (selectedLanguage === 'en-gb') {
                selectedLanguageElement.textContent = 'EN (GB)';
            } else if (selectedLanguage === 'en-us') {
                selectedLanguageElement.textContent = 'EN (US)';
            } else if (selectedLanguage === 'de') {
                selectedLanguageElement.textContent = 'DE';
            } else if (selectedLanguage === 'de-ch') {
                selectedLanguageElement.textContent = 'DE (CH)';
            } else if (selectedLanguage === 'fr') {
                selectedLanguageElement.textContent = 'FR';
            } else if (selectedLanguage === 'it') {
                selectedLanguageElement.textContent = 'IT';
            } else if (selectedLanguage === 'es') {
                selectedLanguageElement.textContent = 'ES';
            }
        });
    });

    // Handle tone selection
    toneOptions.forEach(option => {
        option.addEventListener('click', function () {
            selectedTone = this.getAttribute('data-value');

            // Update active state
            toneOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Update the selected tone display
            selectedToneElement.textContent = selectedTone;
        });
    });

    // Handle size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            selectedSize = this.getAttribute('data-value');

            // Update active state
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Update the selected size display
            if (selectedSize === 'auto') {
                selectedSizeElement.textContent = 'Auto';
            } else if (selectedSize === 'Very Short') {
                selectedSizeElement.textContent = 'Very Short ';
            } else if (selectedSize === 'Short') {
                selectedSizeElement.textContent = 'Short';
            } else if (selectedSize === 'Medium') {
                selectedSizeElement.textContent = 'Meduim';
            } else if (selectedSize === 'Detailed') {
                selectedSizeElement.textContent = 'Long';
            }
        });
    });

    // Text editor buttons
    const editorButtons = document.querySelectorAll('.btn-editor');
    editorButtons.forEach(button => {
        button.addEventListener('click', function () {
            const command = this.getAttribute('data-command');

            if (command === 'createLink') {
                const url = prompt('Enter the link URL');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, null);
            }

            // Toggle active state for applicable commands
            if (['bold', 'italic', 'underline', 'strikeThrough'].includes(command)) {
                this.classList.toggle('active');
            }
        });
    });

    // Track if the "Copy to Clipboard" button has been created
    let copyButton = null;
    let copiedText = null;

    // Improve button click event
    improveButton.addEventListener('click', function () {
        const recipientName = recipientInput.value.trim();
        const senderName = senderInput.value.trim();
        const emailBody = editorContent.innerHTML;

        // Clear the time saved message
        timeSavedElement.textContent = '';

        // Show loading state
        improveButton.textContent = 'Processing...';
        improveButton.disabled = true;

        // Map selected option to API kind
        const kindMap = {
            'fix-typos': 'IMPROVE_TYPOS',
            'polish': 'IMPROVE_POLISH',
            'rewrite': 'IMPROVE_REWRITE'
        };

        const kind = kindMap[selectedOption] || 'IMPROVE_REWRITE'; // Default to rewrite

        // Prepare data for API call
        const requestData = {
            kind: kind,
            sender: senderName, // Fixed sender name
            recipients_line: recipientName, // Recipient name
            stream: true, // Always true as per API
            language: selectedLanguage, // Selected language
            tone: selectedTone, // Selected tone
            output_length: selectedSize, // Selected size
            draft_id: crypto.randomUUID(), // Fixed draft ID
            prompt_input: emailBody // Email body as prompt input
        };

        console.log('Request Data:', requestData);

        // Set start time
        const startTime = new Date();

        // Make API call to backend endpoint
        fetch('https://app.maestrolabs.com/emails/website/improve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.maestrolabs.com/some-page.html' // Required header
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    // Log the response status and text for debugging
                    console.error('Response Status:', response.status);
                    return response.text().then(text => {
                        console.error('Response Text:', text);
                        if (text.includes("Request was throttled")) {
                            errorMessageElement.innerHTML = 'Your token was expired, to get more emails please <a href="https://maestrolabs.com/signup" target="_blank" style="color: blue; text-decoration: underline;">sign up for free</a>.';
                            errorMessageElement.style.display = "block";
                        } else {
                            throw new Error(`Server responded with ${response.status}: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .then(data => {
                // Update the editor with the improved text
                const improvedText = data.mail_body;
                const lines = improvedText.split('\n');
                let currentLineIndex = 0;

                function displayNextLine() {
                    if (currentLineIndex < lines.length) {
                        const line = lines[currentLineIndex];
                        const words = line.split(' ');
                        let currentWordIndex = 0;

                        function displayNextWord() {
                            if (currentWordIndex < words.length) {
                                const word = words[currentWordIndex];
                                const textNode = document.createTextNode(word + ' ');
                                editorContent.appendChild(textNode);
                                currentWordIndex++;
                                setTimeout(displayNextWord, 50); // Reduced delay to 50ms
                            } else {
                                const lineBreak = document.createElement('br');
                                editorContent.appendChild(lineBreak);
                                currentLineIndex++;

                                // If this is the last line, calculate time saved
                                if (currentLineIndex === lines.length) {
                                    const endTime = new Date();
                                    const timeDiff = endTime - startTime;
                                    const seconds = Math.floor(timeDiff / 1000);

                                    // Calculate saved time based on the observed ratio (44.83x)
                                    const savedSeconds = Math.floor(seconds * 44.83); // Total saved seconds
                                    const savedMinutes = Math.floor(savedSeconds / 60); // Convert to minutes
                                    const remainingSavedSeconds = savedSeconds % 60; // Remaining seconds

                                    // Display the time saved message
                                    timeSavedElement.innerHTML = `<strong>Written in ${seconds} secs</strong> and saved <span class="text-success">${savedMinutes} min</span> and <span class="text-primary">${remainingSavedSeconds} sec</span> of your time.`;
                                } else {
                                    setTimeout(displayNextLine, 50); // Reduced delay to 50ms
                                }
                            }
                        }

                        displayNextWord();
                    }
                }

                editorContent.innerHTML = ''; // Clear the editor content
                displayNextLine();

                // Add or update the "Copy to Clipboard" button
                if (!copyButton) {
                    copyButton = document.createElement('button');
                    copyButton.textContent = 'Copy to Clipboard';
                    copyButton.className = 'btn btn-purple';
                    const copyButtonContainer = document.createElement('div');
                    copyButtonContainer.className = 'copy-button-container';
                    copyButtonContainer.appendChild(copyButton);

                    // Create the "Copied!" text element
                    copiedText = document.createElement('div');
                    copiedText.className = 'copied-text';
                    copiedText.textContent = 'Copied!';
                    copiedText.style.display = 'none'; // Initially hidden
                    copyButtonContainer.appendChild(copiedText);

                    // Append the container to the editor content's parent node
                    editorContent.parentNode.appendChild(copyButtonContainer);
                }

                // Update the copy button functionality
                copyButton.onclick = function () {
                    navigator.clipboard.writeText(improvedText).then(function () {
                        copiedText.style.display = 'block'; // Show the "Copied!" text
                        setTimeout(function () {
                            copiedText.style.display = 'none'; // Hide the "Copied!" text after 1 second
                        }, 1000);
                    }, function (err) {
                        console.error('Could not copy text: ', err);
                    });
                };
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                improveButton.textContent = 'Improve →';
                improveButton.disabled = false;
            });
    });
});
</script>
