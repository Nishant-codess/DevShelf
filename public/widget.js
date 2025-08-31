(function() {
  'use strict';
  
  // DevShelf Widget Script
  // Usage: <script src="https://devshelf-nishant.vercel.app/widget.js"></script>
  // <div class="devshelf-widget" data-showcase-id="USERNAME-TIMESTAMP"></div>
  
  function createDevShelfWidget(showcaseId, container) {
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'devshelf-widget-container';
    widgetContainer.style.cssText = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 100%;
      background: transparent;
    `;
    
    // Create loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="text-align: center; padding: 20px; color: #666;">
        <div style="width: 20px; height: 20px; border: 2px solid #38BDF8; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
        <span>Loading DevShelf...</span>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    widgetContainer.appendChild(loadingDiv);
    container.appendChild(widgetContainer);
    
    // Fetch showcase data
    fetch(`https://devshelf-nishant.vercel.app/api/showcase/${showcaseId}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        renderShowcase(data, widgetContainer);
      })
      .catch(error => {
        console.error('DevShelf Widget Error:', error);
        widgetContainer.innerHTML = `
          <div style="text-align: center; padding: 20px; color: #666; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="margin-bottom: 10px;">⚠️</div>
            <div>Showcase not found or unavailable</div>
          </div>
        `;
      });
  }
  
  function renderShowcase(data, container) {
    const { user, repositories } = data;
    
    container.innerHTML = `
      <div class="devshelf-showcase" style="
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <!-- User Profile -->
        <div style="
          background: linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%);
          color: white;
          padding: 20px;
          text-align: center;
        ">
          <img src="${user.avatar_url}" alt="${user.name || user.login}" style="
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 3px solid white;
            margin-bottom: 10px;
          ">
          <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: 600;">
            ${user.name || user.login}
          </h3>
          <p style="margin: 0; opacity: 0.9; font-size: 14px;">@${user.login}</p>
          ${user.bio ? `<p style="margin: 10px 0 0 0; opacity: 0.8; font-size: 13px;">${user.bio}</p>` : ''}
        </div>
        
        <!-- Projects Grid -->
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #374151; text-align: center;">
            Featured Projects (${repositories.length})
          </h4>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
            ${repositories.map(repo => `
              <div style="
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 15px;
                transition: all 0.2s ease;
              " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" 
                 onmouseout="this.style.transform='none'; this.style.boxShadow='none'">
                
                <div style="margin-bottom: 10px;">
                  <h5 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600; color: #111827;">
                    ${repo.name}
                  </h5>
                  <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
                    ${repo.description || 'No description available'}
                  </p>
                </div>
                
                <!-- Tech Stack -->
                <div style="margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 5px;">
                  ${repo.language ? `
                    <span style="
                      background: rgba(56, 189, 248, 0.1);
                      color: #38BDF8;
                      padding: 2px 8px;
                      border-radius: 12px;
                      font-size: 11px;
                      font-weight: 500;
                    ">${repo.language}</span>
                  ` : ''}
                  ${repo.topics ? repo.topics.slice(0, 2).map(topic => `
                    <span style="
                      background: #f3f4f6;
                      color: #374151;
                      padding: 2px 8px;
                      border-radius: 12px;
                      font-size: 11px;
                    ">${topic}</span>
                  `).join('') : ''}
                </div>
                
                <!-- Stats -->
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 11px; color: #6b7280;">
                  <span>⭐ ${repo.stargazers_count}</span>
                  <span>🔀 ${repo.forks_count}</span>
                  <span>👁️ ${repo.watchers_count}</span>
                </div>
                
                <!-- Actions -->
                <div style="display: flex; gap: 8px;">
                  <a href="${repo.html_url}" target="_blank" style="
                    flex: 1;
                    background: #111827;
                    color: white;
                    text-decoration: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                    text-align: center;
                    transition: background 0.2s ease;
                  " onmouseover="this.style.background='#374151'" onmouseout="this.style.background='#111827'">
                    View on GitHub
                  </a>
                  ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" style="
                      background: #38BDF8;
                      color: white;
                      text-decoration: none;
                      padding: 6px 12px;
                      border-radius: 6px;
                      font-size: 12px;
                      font-weight: 500;
                      transition: background 0.2s ease;
                    " onmouseover="this.style.background='#0ea5e9'" onmouseout="this.style.background='#38BDF8'">
                      Demo
                    </a>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Powered by DevShelf -->
        <div style="
          background: #f9fafb;
          padding: 10px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        ">
          <p style="margin: 0; font-size: 11px; color: #6b7280;">
            Powered by 
            <a href="https://devshelf-nishant.vercel.app" target="_blank" style="
              color: #38BDF8;
              text-decoration: none;
              font-weight: 500;
            ">DevShelf</a>
          </p>
        </div>
      </div>
    `;
  }
  
  // Initialize widgets when DOM is ready
  function initWidgets() {
    const widgets = document.querySelectorAll('.devshelf-widget');
    widgets.forEach(widget => {
      const showcaseId = widget.getAttribute('data-showcase-id');
      if (showcaseId) {
        createDevShelfWidget(showcaseId, widget);
      }
    });
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
  
  // Also run when new content is added (for dynamic content)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1 && node.classList && node.classList.contains('devshelf-widget')) {
              const showcaseId = node.getAttribute('data-showcase-id');
              if (showcaseId) {
                createDevShelfWidget(showcaseId, node);
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
