class ProjectCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = `:host{display:block;margin:1rem;background:var(--card-bg,#1a1a1a);border:1px solid var(--primary-color,#a6c39f);border-radius:8px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,.2)}.card{padding:1rem;font-family:var(--font-family,'Poppins',Arial,sans-serif)}h2{margin:0;color:var(--primary-color,#a6c39f)}img{width:100%;display:block;border-radius:4px;object-fit:cover}p{color:var(--text-color,#eaeaea)}a{color:var(--accent-color,#88a68c);font-weight:bold}`;
    const card = document.createElement('article'); card.className = 'card';
    const title = document.createElement('h2'); title.textContent = this.getAttribute('title') || 'Untitled Project';
    const image = document.createElement('img'); image.src = this.getAttribute('img-src') || 'assets/images/coding_monkeys.jpg'; image.alt = this.getAttribute('img-alt') || 'Project image';
    const description = document.createElement('p'); description.textContent = this.getAttribute('description') || 'No description provided.';
    const link = document.createElement('a'); link.textContent = 'Learn More'; link.href = this.getAttribute('link') || 'projects.html'; link.rel = 'noopener';
    card.append(title, image, description, link); this.shadowRoot.replaceChildren(style, card);
  }
}
customElements.define('project-card', ProjectCard);
