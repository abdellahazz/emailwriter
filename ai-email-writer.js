document.addEventListener('DOMContentLoaded', function () {
    const editorContent = document.getElementById('editor-content');
    const recipientInput = document.getElementById('recipient-input');
    const senderInput = document.getElementById('sender-input');
    const improveButton = document.getElementById('improve-button');
    const timeSavedElement = document.getElementById('time-saved');
    const errorMessageElement = document.getElementById('error-message');
    const loadingScreen = document.querySelector('.loading-screen');

    // Get option buttons
    const optionButtons = document.querySelectorAll('.option-button');

    // Get language, tone, and size dropdowns
    const languageDropdown = document.getElementById('languageDropdown');
    const toneDropdown = document.getElementById('toneDropdown');
    const sizeDropdown = document.getElementById('sizeDropdown');

    // Track selected values
    let selectedOption = 'rewrite'; // Default option
    let selectedLanguage = 'xx'; // Default language
    let selectedTone = 'Professional'; // Default tone
    let selectedSize = 'Medium'; // Default size

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
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    selectedLanguageElement.textContent = getLanguageDisplayText('xx', isMobileDevice);
    selectedToneElement.textContent = 'Professional';
    selectedSizeElement.textContent = getDisplayText('Medium', isMobileDevice);

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

    // Function to get appropriate display text based on device
    function getDisplayText(size, isMobile) {
        const sizeMap = {
            'Very Short': isMobile ? 'VS' : 'Very Short',
            'Short': isMobile ? 'S' : 'Short',
            'Medium': isMobile ? 'M' : 'Medium',
            'Detailed': isMobile ? 'L' : 'Long'
        };
        return sizeMap[size] || size;
    }

    // Function to get appropriate language display text based on device
    function getLanguageDisplayText(lang, isMobile) {
        const languageMap = {
            'xx': isMobile ? 'A' : 'Auto',
            'en': isMobile ? 'EN' : 'English',
            'en-gb': isMobile ? 'EN' : 'English (UK)',
            'en-us': isMobile ? 'EN' : 'English (US)',
            'de': isMobile ? 'DE' : 'German',
            'de-ch': isMobile ? 'DE' : 'German (Swiss)',
            'fr': isMobile ? 'FR' : 'French',
            'it': isMobile ? 'IT' : 'Italian',
            'es': isMobile ? 'ES' : 'Spanish',
            'es-la': isMobile ? 'ES' : 'Spanish (Latin America)',
            'es-es': isMobile ? 'ES' : 'Spanish (Spain)',
            'ms': isMobile ? 'MS' : 'Malay',
            'pt': isMobile ? 'PT' : 'Portuguese',
            'pt-br': isMobile ? 'PT' : 'Portuguese (Brazil)',
            'pt-pt': isMobile ? 'PT' : 'Portuguese (Portugal)',
            'sv': isMobile ? 'SV' : 'Swedish',
            'tr': isMobile ? 'TR' : 'Turkish',
            'nl': isMobile ? 'NL' : 'Dutch',
            'is': isMobile ? 'IS' : 'Icelandic',
            'da': isMobile ? 'DA' : 'Danish',
            'fi': isMobile ? 'FI' : 'Finnish',
            'el': isMobile ? 'EL' : 'Greek',
            'hu': isMobile ? 'HU' : 'Hungarian',
            'pl': isMobile ? 'PL' : 'Polish'
        };
        return languageMap[lang] || lang;
    }

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function () {
            selectedLanguage = this.getAttribute('data-value');

            // Update active state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Check if mobile device
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Update the selected language display
            selectedLanguageElement.textContent = getLanguageDisplayText(selectedLanguage, isMobileDevice);
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

            // Check if mobile device
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Update the selected size display
            selectedSizeElement.textContent = getDisplayText(selectedSize, isMobileDevice);
        });
    });

    // Initial setup for selected options
    document.addEventListener('DOMContentLoaded', function() {
        if (selectedLanguageElement) {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            selectedLanguageElement.textContent = getLanguageDisplayText(selectedLanguageElement.textContent, isMobileDevice);
        }
        if (selectedSizeElement) {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            selectedSizeElement.textContent = getDisplayText(selectedSizeElement.textContent, isMobileDevice);
        }
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

    // Handle copy button
    const copyButton = document.querySelector('button[title="Copy to Clipboard"]');
    let copiedText = document.querySelector('.copied-text');

    // Function to get formatted text without HTML tags
    function getFormattedText() {
        // Get the inner HTML content with formatting
        let content = editorContent.innerHTML;
        
        // For plain text with formatting cues (optional)
        let plainText = content
            .replace(/<\/?b>/g, '**') // Replace bold tags with **
            .replace(/<\/?i>/g, '*') // Replace italic tags with *
            .replace(/<\/?u>/g, '_') // Replace underline tags with _
            .replace(/<\/?strike>/g, '~') // Replace strike tags with ~
            .replace(/<\/?div>/g, '\n\n') // Replace div tags with paragraph breaks
            .replace(/<\/?li>/g, '\n• ') // Replace list items with bullet points
            .replace(/<\/?ol>/g, '\n') // Replace ordered list tags
            .replace(/<\/?ul>/g, '\n') // Replace unordered list tags
            .replace(/<\/?br>/g, '\n') // Replace line breaks
            .replace(/<\/?[pP]>/g, '\n\n'); // Replace paragraph tags

        // Handle links by extracting the text and URL for plain text
        plainText = plainText.replace(/<a\s+href\s*=\s*["'](.*?)["'](.*?)>(.*?)<\/a>/g, '$3 ($1)');

        // Remove any remaining HTML tags from plain text
        plainText = plainText.replace(/<\/?[^>]+(>|$)/g, '');

        // For HTML format, we'll use the original content
        return {
            html: content,
            plainText: plainText
        };
    }

    copyButton.addEventListener('click', function () {
        const formattedText = getFormattedText();
        
        // Create a Blob with HTML content
        const htmlBlob = new Blob([formattedText.html], { type: 'text/html' });
        const plainBlob = new Blob([formattedText.plainText], { type: 'text/plain' });

        // Create a clipboard item with both HTML and plain text
        const clipboardItem = new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': plainBlob
        });

        // Write to clipboard
        navigator.clipboard.write([clipboardItem])
            .then(function () {
                copiedText.style.display = 'block';
                setTimeout(function () {
                    copiedText.style.display = 'none';
                }, 1000);
            })
            .catch(function (err) {
                console.error('Could not copy text:', err);
            });
    });

    // Improve button click event
    improveButton.addEventListener('click', function () {
        const recipientName = recipientInput.value.trim();
        const senderName = senderInput.value.trim();
        let emailBody = editorContent.innerHTML.trim();

        // If the editor is empty, use the placeholder text
        if (!emailBody) {
            emailBody = editorContent.getAttribute('data-placeholder');
        }

        // Clear the time saved message
        timeSavedElement.textContent = '';

        // Show loading screen and hide placeholder
        loadingScreen.classList.add('show');
        editorContent.classList.add('hide-placeholder');

        // Clear the editor content
        editorContent.innerHTML = '';

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
            sender: senderName,
            recipients_line: recipientName,
            stream: true,
            language: selectedLanguage,
            tone: selectedTone,
            output_length: selectedSize,
            draft_id: crypto.randomUUID(),
            prompt_input: emailBody
        };

        console.log('Request Data:', requestData);

        // Set start time
        const startTime = new Date();

        // Make API call to backend endpoint
        fetch('https://app.maestrolabs.com/emails/website/improve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.maestrolabs.com/some-page.html'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error('Response Status:', response.status);
                        console.error('Response Text:', text);
                        if (text.includes('Request was throttled')) {
                            errorMessageElement.innerHTML = 'You&apos;ve used all 5 free requests for today. To continue, install it on <a href="https://appsource.microsoft.com/en-us/product/office/WA200005168?mktcmpid=homepage&src=website" target="_blank" style="color: blue; text-decoration: underline;">Outlook</a> or <a href="https://chromewebstore.google.com/detail/mailmaestro-gmail-ai-assi/hjdkljkgenkplcgeecgjjgijpipnneai?pli=1&utm_source=website&utm_medium=organic&utm_campaign=homepage" target="_blank" style="color: blue; text-decoration: underline;">Gmail</a> and enjoy a 14-day free trial with extra features.';
                            errorMessageElement.style.display = 'block';
                        } else {
                            throw new Error(`Server responded with ${response.status}: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .then(data => {
                // Hide loading screen and show placeholder again
                loadingScreen.classList.remove('show');
                editorContent.classList.remove('hide-placeholder');

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
                                setTimeout(displayNextWord, 50);
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
                                    const savedSeconds = Math.floor(seconds * 44.83);
                                    const savedMinutes = Math.floor(savedSeconds / 60);
                                    const remainingSavedSeconds = savedSeconds % 60;

                                    // Display the time saved message
                                    timeSavedElement.innerHTML = `<strong>Written in ${seconds} secs</strong> and saved <span class="text-success">${savedMinutes} min</span> and <span class="text-success">${remainingSavedSeconds} sec</span> of your time.`;
                                } else {
                                    setTimeout(displayNextLine, 50);
                                }
                            }
                        }

                        displayNextWord();
                    }
                }

                displayNextLine();
            })
            .catch(error => {
                // Hide loading screen and show placeholder again
                loadingScreen.classList.remove('show');
                editorContent.classList.remove('hide-placeholder');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                improveButton.textContent = 'Improve →';
                improveButton.disabled = false;
            });
    });
});
