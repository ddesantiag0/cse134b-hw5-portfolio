class ProjectCard extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root for encapsulation
      this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
      this.render();
    }
    
    render() {
      // Retrieve attributes with fallback values
      const title = this.getAttribute('title') || 'Untitled Project';
      const imgSrc = this.getAttribute('img-src') || 'assets/images/default.jpg';
      const imgAlt = this.getAttribute('img-alt') || 'Project image';
      const description = this.getAttribute('description') || 'No description provided.';
      const link = this.getAttribute('link') || '#';
      
      // Render the card markup and styling inside the shadow DOM
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin: 1rem;
            background: var(--card-bg, #1A1A1A);
            border: 1px solid var(--primary-color, #A6C39F);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
          }
          :host(:hover) {
            transform: scale(1.02);
          }
          .card {
            padding: 1rem;
            font-family: var(--font-family, 'Poppins', Arial, sans-serif);
          }
          h2 {
            margin: 0;
            color: var(--primary-color, #A6C39F);
            font-size: 1.4rem;
          }
          picture, img {
            width: 100%;
            display: block;
            border-radius: 4px;
            object-fit: cover;
          }
          p {
            color: var(--text-color, #EAEAEA);
            margin: 0.5rem 0;
          }
          a {
            text-decoration: none;
            color: var(--accent-color, #88A68C);
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
        <div class="card">
          <h2>${title}</h2>
          <picture>
            <img src="${imgSrc}" alt="${imgAlt}">
          </picture>
          <p>${description}</p>
          <a href="${link}" rel="noopener">Learn More</a>
        </div>
      `;
    }
  }
  
  customElements.define('project-card', ProjectCard);
  