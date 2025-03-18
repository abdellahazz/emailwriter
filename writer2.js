    <script>
document.addEventListener(&apos;DOMContentLoaded&apos;, function () {
    const editorContent = document.getElementById(&apos;editor-content&apos;);
    const recipientInput = document.getElementById(&apos;recipient-input&apos;);
    const senderInput = document.getElementById(&apos;sender-input&apos;);
    const improveButton = document.getElementById(&apos;improve-button&apos;);
    const timeSavedElement = document.getElementById(&apos;time-saved&apos;);
    const errorMessageElement = document.getElementById(&apos;error-message&apos;);

    // Get option buttons
    const optionButtons = document.querySelectorAll(&apos;.option-button&apos;);

    // Get language, tone, and size dropdowns
    const languageDropdown = document.getElementById(&apos;languageDropdown&apos;);
    const toneDropdown = document.getElementById(&apos;toneDropdown&apos;);
    const sizeDropdown = document.getElementById(&apos;sizeDropdown&apos;);

    // Track selected values
    let selectedOption = &apos;rewrite&apos;; // Default option
    let selectedLanguage = &apos;en&apos;; // Default language
    let selectedTone = &apos;Professional&apos;; // Default tone
    let selectedSize = &apos;Medium&apos;; // Default size

    // Get all dropdown options
    const languageOptions = document.querySelectorAll(&apos;#languageDropdown + .dropdown-menu .dropdown-item&apos;);
    const toneOptions = document.querySelectorAll(&apos;#toneDropdown + .dropdown-menu .dropdown-item&apos;);
    const sizeOptions = document.querySelectorAll(&apos;#sizeDropdown + .dropdown-menu .dropdown-item&apos;);

    // Get options containers
    const fixTyposOptions = document.getElementById(&apos;fix-typos-options&apos;);
    const polishOptions = document.getElementById(&apos;polish-options&apos;);
    const rewriteOptions = document.getElementById(&apos;rewrite-options&apos;);

    // Get the selected options elements
    const selectedLanguageElement = document.getElementById(&apos;selected-language&apos;);
    const selectedToneElement = document.getElementById(&apos;selected-tone&apos;);
    const selectedSizeElement = document.getElementById(&apos;selected-size&apos;);

    // Set initial active option
    document.querySelector(&apos;.option-button[data-option="rewrite"]&apos;).classList.add(&apos;active&apos;);
    rewriteOptions.classList.remove(&apos;d-none&apos;);
    selectedLanguageElement.textContent = &apos;EN&apos;;
    selectedToneElement.textContent = &apos;Professional&apos;;
    selectedSizeElement.textContent = &apos;M&apos;;

    // Handle option selection
    optionButtons.forEach(button => {
        button.addEventListener(&apos;click&apos;, function () {
            // Remove active class from all buttons
            optionButtons.forEach(btn => btn.classList.remove(&apos;active&apos;));
            this.classList.add(&apos;active&apos;);
            selectedOption = this.getAttribute(&apos;data-option&apos;);

            // Hide all options
            fixTyposOptions.classList.add(&apos;d-none&apos;);
            polishOptions.classList.add(&apos;d-none&apos;);
            rewriteOptions.classList.add(&apos;d-none&apos;);

            // Show the appropriate options based on the selected option
            if (selectedOption === &apos;fix-typos&apos;) {
                fixTyposOptions.classList.remove(&apos;d-none&apos;);
            } else if (selectedOption === &apos;polish&apos;) {
                polishOptions.classList.remove(&apos;d-none&apos;);
            } else if (selectedOption === &apos;rewrite&apos;) {
                rewriteOptions.classList.remove(&apos;d-none&apos;);
            }
        });
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener(&apos;click&apos;, function () {
            selectedLanguage = this.getAttribute(&apos;data-value&apos;);

            // Update active state
            languageOptions.forEach(opt => opt.classList.remove(&apos;active&apos;));
            this.classList.add(&apos;active&apos;);

            // Update the selected language display
            if (selectedLanguage === &apos;xx&apos;) {
                selectedLanguageElement.innerHTML = &apos;<img src="https://cdn.prod.website-files.com/66d1d32f08a233fad81d614e/67d4200ca1b8c8d4802a06b3_wand.and.stars.png" alt="Auto" class="language-image"&apos;;
            } else if (selectedLanguage === &apos;en&apos;) {
                selectedLanguageElement.textContent = &apos;EN&apos;;
            } else if (selectedLanguage === &apos;en-gb&apos;) {
                selectedLanguageElement.textContent = &apos;EN&apos;;
            } else if (selectedLanguage === &apos;en-us&apos;) {
                selectedLanguageElement.textContent = &apos;EN&apos;;
            } else if (selectedLanguage === &apos;de&apos;) {
                selectedLanguageElement.textContent = &apos;DE&apos;;
            } else if (selectedLanguage === &apos;de-ch&apos;) {
                selectedLanguageElement.textContent = &apos;DE&apos;;
            } else if (selectedLanguage === &apos;fr&apos;) {
                selectedLanguageElement.textContent = &apos;FR&apos;;
            } else if (selectedLanguage === &apos;it&apos;) {
                selectedLanguageElement.textContent = &apos;IT&apos;;
            } else if (selectedLanguage === &apos;es&apos;) {
                selectedLanguageElement.textContent = &apos;ES&apos;;
            } else if (selectedLanguage === &apos;es-la&apos;) {
                selectedLanguageElement.textContent = &apos;ES&apos;;
            } else if (selectedLanguage === &apos;es-es&apos;) {
                selectedLanguageElement.textContent = &apos;ES&apos;;
            } else if (selectedLanguage === &apos;ms&apos;) {
                selectedLanguageElement.textContent = &apos;MS&apos;;
            } else if (selectedLanguage === &apos;pt&apos;) {
                selectedLanguageElement.textContent = &apos;PT&apos;;
            } else if (selectedLanguage === &apos;pt-br&apos;) {
                selectedLanguageElement.textContent = &apos;PT&apos;;
            } else if (selectedLanguage === &apos;pt-pt&apos;) {
                selectedLanguageElement.textContent = &apos;PT&apos;;
            } else if (selectedLanguage === &apos;sv&apos;) {
                selectedLanguageElement.textContent = &apos;SV&apos;;
            } else if (selectedLanguage === &apos;tr&apos;) {
                selectedLanguageElement.textContent = &apos;TR&apos;;
            } else if (selectedLanguage === &apos;nl&apos;) {
                selectedLanguageElement.textContent = &apos;NL&apos;;
            } else if (selectedLanguage === &apos;is&apos;) {
                selectedLanguageElement.textContent = &apos;IS&apos;;
            } else if (selectedLanguage === &apos;da&apos;) {
                selectedLanguageElement.textContent = &apos;DA&apos;;
            } else if (selectedLanguage === &apos;fi&apos;) {
                selectedLanguageElement.textContent = &apos;FI&apos;;
            } else if (selectedLanguage === &apos;el&apos;) {
                selectedLanguageElement.textContent = &apos;EL&apos;;
            } else if (selectedLanguage === &apos;hu&apos;) {
                selectedLanguageElement.textContent = &apos;HU&apos;;
            } else if (selectedLanguage === &apos;pl&apos;) {
                selectedLanguageElement.textContent = &apos;PL&apos;;
            }
        });
    });

    // Handle tone selection
    toneOptions.forEach(option => {
        option.addEventListener(&apos;click&apos;, function () {
            selectedTone = this.getAttribute(&apos;data-value&apos;);

            // Update active state
            toneOptions.forEach(opt => opt.classList.remove(&apos;active&apos;));
            this.classList.add(&apos;active&apos;);

            // Update the selected tone display
            selectedToneElement.textContent = selectedTone;
        });
    });

    // Handle size selection
    sizeOptions.forEach(option => {
        option.addEventListener(&apos;click&apos;, function () {
            selectedSize = this.getAttribute(&apos;data-value&apos;);

            // Update active state
            sizeOptions.forEach(opt => opt.classList.remove(&apos;active&apos;));
            this.classList.add(&apos;active&apos;);

            // Update the selected size display
            if (selectedSize === &apos;Very Short&apos;) {
                selectedSizeElement.textContent = &apos;VS&apos;;
            } else if (selectedSize === &apos;Short&apos;) {
                selectedSizeElement.textContent = &apos;S&apos;;
            } else if (selectedSize === &apos;Medium&apos;) {
                selectedSizeElement.textContent = &apos;M&apos;;
            } else if (selectedSize === &apos;Detailed&apos;) {
                selectedSizeElement.textContent = &apos;L&apos;;
            }
        });
    });

    // Text editor buttons
    const editorButtons = document.querySelectorAll(&apos;.btn-editor&apos;);
    editorButtons.forEach(button => {
        button.addEventListener(&apos;click&apos;, function () {
            const command = this.getAttribute(&apos;data-command&apos;);

            if (command === &apos;createLink&apos;) {
                const url = prompt(&apos;Enter the link URL&apos;);
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, null);
            }

            // Toggle active state for applicable commands
            if ([&apos;bold&apos;, &apos;italic&apos;, &apos;underline&apos;, &apos;strikeThrough&apos;].includes(command)) {
                this.classList.toggle(&apos;active&apos;);
            }
        });
    });

    // Handle copy button
    const copyButton = document.querySelector(&apos;button[title="Copy to Clipboard"]&apos;);
    let copiedText = document.querySelector(&apos;.copied-text&apos;);

    // Function to get formatted text without HTML tags
    function getFormattedText() {
        let content = editorContent.innerHTML
            .replace(/<\/?b>/g, &apos;**&apos;) // Replace bold tags with **
            .replace(/<\/?i>/g, &apos;*&apos;) // Replace italic tags with *
            .replace(/<\/?u>/g, &apos;_&apos;) // Replace underline tags with _
            .replace(/<\/?strike>/g, &apos;~&apos;) // Replace strike tags with ~
            .replace(/<\/?div>/g, &apos;\n\n&apos;) // Replace div tags with paragraph breaks
            .replace(/<\/?li>/g, &apos;\n• &apos;) // Replace list items with bullet points
            .replace(/<\/?ol>/g, &apos;\n&apos;) // Replace ordered list tags
            .replace(/<\/?ul>/g, &apos;\n&apos;) // Replace unordered list tags
            .replace(/<\/?br>/g, &apos;\n&apos;) // Replace line breaks
            .replace(/<\/?[pP]>/g, &apos;\n\n&apos;); // Replace paragraph tags

        // Handle links by extracting the text and URL
        content = content.replace(/<a\s+href\s*=\s*["&apos;](.*?)["&apos;](.*?)>(.*?)<\/a>/g, &apos;$3 ($1)&apos;);

        // Remove any remaining HTML tags
        content = content.replace(/<\/?[^>]+(>|$)/g, &apos;&apos;);

        // Handle nested lists by indenting
        content = content.replace(/(\n• )(\n• )/g, &apos;\n  • $2&apos;);

        return content;
    }

    copyButton.addEventListener(&apos;click&apos;, function () {
        const formattedText = getFormattedText();
        navigator.clipboard.writeText(formattedText).then(function () {
            copiedText.style.display = &apos;block&apos;;
            setTimeout(function () {
                copiedText.style.display = &apos;none&apos;;
            }, 1000);
        }, function (err) {
            console.error(&apos;Could not copy text:&apos;, err);
        });
    });

    // Improve button click event
    improveButton.addEventListener(&apos;click&apos;, function () {
        const recipientName = recipientInput.value.trim();
        const senderName = senderInput.value.trim();
        let emailBody = editorContent.innerHTML.trim();

        // If the editor is empty, use the placeholder text
        if (!emailBody) {
            emailBody = editorContent.getAttribute(&apos;data-placeholder&apos;);
        }

        // Clear the time saved message
        timeSavedElement.textContent = &apos;&apos;;

        // Show loading state
        improveButton.textContent = &apos;Processing...&apos;;
        improveButton.disabled = true;

        // Map selected option to API kind
        const kindMap = {
            &apos;fix-typos&apos;: &apos;IMPROVE_TYPOS&apos;,
            &apos;polish&apos;: &apos;IMPROVE_POLISH&apos;,
            &apos;rewrite&apos;: &apos;IMPROVE_REWRITE&apos;
        };

        const kind = kindMap[selectedOption] || &apos;IMPROVE_REWRITE&apos;; // Default to rewrite

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

        console.log(&apos;Request Data:&apos;, requestData);

        // Set start time
        const startTime = new Date();

        // Make API call to backend endpoint
        fetch(&apos;https://app.maestrolabs.com/emails/website/improve&apos;, {
            method: &apos;POST&apos;,
            headers: {
                &apos;Content-Type&apos;: &apos;application/json&apos;,
                &apos;Origin&apos;: &apos;https://www.maestrolabs.com/some-page.html&apos;
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error(&apos;Response Status:&apos;, response.status);
                        console.error(&apos;Response Text:&apos;, text);
                        if (text.includes(&apos;Request was throttled&apos;)) {
                            errorMessageElement.innerHTML = &apos;Your token has expired. To get more emails and enjoy a 14-day free trial with more features, install it on <a href="https://appsource.microsoft.com/en-us/product/office/WA200005168?mktcmpid=-get-teamsmaestro-subscri&amp;src=website" target="_blank" style="color: blue; text-decoration: underline;">Outlook</a> or <a href="https://chromewebstore.google.com/detail/mailmaestro-gmail-ai-assi/hjdkljkgenkplcgeecgjjgijpipnneai?pli=1&amp;utm_source=website&amp;utm_medium=organic&amp;utm_campaign=-get-teamsmaestro-subscri" target="_blank" style="color: blue; text-decoration: underline;">Gmail</a>.&apos;;
                            errorMessageElement.style.display = &apos;block&apos;;
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
                const lines = improvedText.split(&apos;\n&apos;);
                let currentLineIndex = 0;

                function displayNextLine() {
                    if (currentLineIndex < lines.length) {
                        const line = lines[currentLineIndex];
                        const words = line.split(&apos; &apos;);
                        let currentWordIndex = 0;

                        function displayNextWord() {
                            if (currentWordIndex < words.length) {
                                const word = words[currentWordIndex];
                                const textNode = document.createTextNode(word + &apos; &apos;);
                                editorContent.appendChild(textNode);
                                currentWordIndex++;
                                setTimeout(displayNextWord, 50);
                            } else {
                                const lineBreak = document.createElement(&apos;br&apos;);
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

                editorContent.innerHTML = &apos;&apos;; // Clear the editor content
                displayNextLine();
            })
            .catch(error => {
                console.error(&apos;Error:&apos;, error);
            })
            .finally(() => {
                // Reset button state
                improveButton.textContent = &apos;Improve →&apos;;
                improveButton.disabled = false;
            });
    });
});
    </script>
