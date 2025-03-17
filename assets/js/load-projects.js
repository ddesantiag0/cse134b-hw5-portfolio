document.addEventListener("DOMContentLoaded", function () {
    const projectsList = document.getElementById("projects-list");
    const loadLocalBtn = document.getElementById("load-local");
    const loadRemoteBtn = document.getElementById("load-remote");
  
    // Helper: create a <project-card> from a project object
    function createProjectCard(project) {
      const card = document.createElement("project-card");
      card.setAttribute("title", project.title);
      card.setAttribute("img-src", project.imgSrc);
      card.setAttribute("img-alt", project.imgAlt);
      card.setAttribute("description", project.description);
      card.setAttribute("link", project.link);
      return card;
    }
  
    // Clears existing cards in the container
    function clearProjects() {
      projectsList.innerHTML = "";
    }
  
    // Load from localStorage
    function loadLocal() {
      clearProjects();
      const dataStr = localStorage.getItem("projectsData");
      if (!dataStr) {
        alert("No local projects data found in localStorage.");
        return;
      }
      try {
        const projects = JSON.parse(dataStr);
        projects.forEach(project => {
          const card = createProjectCard(project);
          projectsList.appendChild(card);
        });
      } catch (err) {
        console.error("Error parsing local projects data:", err);
        alert("Failed to parse local projects data.");
      }
    }
  
    // Load from remote JSON (jsonbin.io v3)
    function loadRemote() {
      clearProjects();
      const remoteURL = "https://api.jsonbin.io/v3/b/67d781548960c979a572fa5d";
  
      fetch(remoteURL)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(json => {
          // For jsonbin.io v3, the data array is in json.record
          const projects = json.record;
          projects.forEach(project => {
            const card = createProjectCard(project);
            projectsList.appendChild(card);
          });
        })
        .catch(err => {
          console.error("Error fetching remote projects data:", err);
          alert("Failed to load remote projects data.");
        });
    }
  
    // Attach event listeners
    loadLocalBtn?.addEventListener("click", loadLocal);
    loadRemoteBtn?.addEventListener("click", loadRemote);
  });
  