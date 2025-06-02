<div class="w-100 text-center vapi-wrapper">
  <p class="h6">
    <div id="vapi-button-container" class="vapi-custom-container"></div>
    
    <script>
      var vapiInstance = null;
      const assistant = """; 
      const apiKey = "";
      
      // Configure button without position type of button can be pill or round
      const buttonConfig = {
        width: "150px",
        height: "150px",
        idle: {
          color: `rgb(93, 254, 202)`,
          type: "round",
          title: "Start Sales Call",
          subtitle: "",
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
        },
        loading: {
          color: `rgb(93, 124, 202)`,
          type: "round",
          title: "Connecting...",
          subtitle: "Please wait",
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
        },
        active: {
          color: `rgb(255, 0, 0)`,
          type: "round",
          title: "Call is in progress...",
          subtitle: "End the call.",
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
        },
        container: "#vapi-button-container"  // Use our custom container
      };

      (function (d, t) {
        var g = document.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src =
          "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        let userEmail = null;
            if (window.logged_in_user && window.logged_in_user.softr_user_email) {
                userEmail = window.logged_in_user.softr_user_email;
                console.log("Retrieved user email from Softr:", userEmail);
            } else {
                console.warn("User email not found or user not logged in on Softr. Using anonymous identifier.");
                userEmail = "anonymous@example.com"; // Fallback for unlogged users
            }

        g.onload = function () {
          vapiInstance = window.vapiSDK.run({
            apiKey: apiKey,
            assistant: assistant,
            config: buttonConfig,
            assistantOverrides: {
                variableValues: {
                    user_email: userEmail // Pass the email as a dynamic variable
                }
            },
          });
          
          // Use MutationObserver to ensure the button stays properly styled
          const observer = new MutationObserver((mutations) => {
            const vapiBtn = document.querySelector('.vapi-btn');
            if (vapiBtn) {
              resetButtonStyles(vapiBtn);
            }
          });
          
          // Start observing the document body for changes
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          
          // Initial check for the button
          setTimeout(() => {
            const vapiBtn = document.querySelector('.vapi-btn');
            if (vapiBtn) {
              resetButtonStyles(vapiBtn);
            }
          }, 500);
        };
      })(document, "script");
      
      // Function to reset button styles
      function resetButtonStyles(button) {
        // Move the button to our container if it's not there
        const container = document.getElementById('vapi-button-container');
        if (button.parentElement !== container) {
          container.appendChild(button);
        }
        
        // Reset positioning styles
        button.style.position = 'relative';
        button.style.top = 'auto';
        button.style.left = 'auto';
        button.style.right = 'auto';
        button.style.bottom = 'auto';
        button.style.transform = 'none';
        button.style.margin = '0 auto';
      }
    </script>
    
    <style>
      .vapi-wrapper {
        width: 100%;
        text-align: center;
      }
      
      .vapi-custom-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 120px;
        position: relative;
      }
      
      /* Ensure proper styling for the button */
      .vapi-btn {
        position: relative !important;
        transform: none !important;
        margin: 0 auto !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
      }
    </style>
  </p>
</div>